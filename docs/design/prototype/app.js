// NewEra POS - prototype data and helpers
// All data is fake. Nothing is sent to a real system.

var REGISTER = "R03";         // register ID, first part of every transaction ID (AD-05)
var TAX_RATE = 0.21;          // rate returned by the Tax Calculator (fake)
var DEFAULT_TAX_RATE = 0.21;  // local default rate, used when the Tax Calculator is down (BR-02)

// product catalog (product descriptions)
var CATALOG = {
  "1001": { name: "Hammer 500 g", price: 12.90, rentable: false },
  "1002": { name: "Screwdriver set (6 pcs)", price: 18.50, rentable: false },
  "1003": { name: "Wood screws 4x40 (box 200)", price: 6.75, rentable: false },
  "1004": { name: "Measuring tape 5 m", price: 9.90, rentable: false },
  "1005": { name: "Work gloves", price: 4.20, rentable: false },
  "2001": { name: "Electric drill", price: 89.00, rentable: true, fee: 8.00, deposit: 50.00 },
  "2002": { name: "Pressure washer", price: 199.00, rentable: true, fee: 15.00, deposit: 100.00 },
  "2003": { name: "Ladder 3 m", price: 120.00, rentable: true, fee: 6.00, deposit: 40.00 }
};

// rentable items (one physical unit each, with serial number and status)
// heldBy: another register has a hold on the item in the store database (AD-05, UC3 ext. 7b)
var RENTAL_ITEMS = {
  "SN-2001-01": { product: "2001", status: "Available" },
  "SN-2001-02": { product: "2001", status: "Rented" },
  "SN-2002-01": { product: "2002", status: "Available", heldBy: "Register 01" },
  "SN-2002-05": { product: "2002", status: "Rented" },
  "SN-2003-01": { product: "2003", status: "Under maintenance" },
  "SN-2003-02": { product: "2003", status: "Available" },
  "SN-2003-03": { product: "2003", status: "Rented" }
};

// store managers known to the HR System (fake). Cashiers are in index.html.
var MANAGERS = { "E-2001": "Ana Torres" };

var TENDER_NAMES = { cash: "Cash", card: "Credit card", check: "Check" };

function money(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

function parseAmount(s) {
  return parseFloat(String(s).replace(",", ".")) || 0;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// ---------- values kept between pages (sessionStorage) ----------

function getSetting(key, fallback) {
  try {
    var v = sessionStorage.getItem(key);
    if (v !== null) return v;
  } catch (e) {}
  return fallback;
}

function setSetting(key, value) {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {}
}

function getList(key) {
  try {
    var raw = sessionStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function setList(key, list) {
  setSetting(key, JSON.stringify(list));
}

function flag(key) {
  return getSetting(key, "no") === "yes";
}

function setFlag(key, on) {
  setSetting(key, on ? "yes" : "no");
}

function taxOffline() {
  return flag("tax_offline");
}

// the current transaction, so it survives page changes
function loadTx() {
  return getList("pos_tx");
}

function saveTx(tx) {
  setList("pos_tx", tx);
}

function clearTx() {
  try {
    sessionStorage.removeItem("pos_tx");
  } catch (e) {}
}

// transaction ID = receipt number: register ID, a dash and the counter of the register (AD-05)
function nextTxId() {
  var n = parseInt(getSetting("tx_counter", "153"), 10) + 1;
  setSetting("tx_counter", String(n));
  return REGISTER + "-" + ("000000" + n).slice(-6);
}

// cash of the session, for the expected cash when the session is closed (FR-62)
function recordCash(amount) {
  var cash = parseAmount(getSetting("session_cash", "0")) + amount;
  setSetting("session_cash", String(round2(cash)));
  setSetting("session_count", String(parseInt(getSetting("session_count", "0"), 10) + 1));
}

// card refunds still pending (UC2 and UC5 ext. 9b2b, FR-77)
function addPendingRefund(p) {
  var list = getList("pending_refunds") || [];
  list.push(p);
  setList("pending_refunds", list);
}

// subtotal, tax, deposit and total of a transaction
function computeTotals(tx) {
  if (tx.amountDue) {
    // rental return: rest of the late fee and its tax, already calculated (FR-73)
    return { subtotal: tx.amountDue, tax: 0, deposit: 0, total: tx.amountDue };
  }
  var subtotal = 0;
  tx.lines.forEach(function (l) {
    subtotal += l.price * l.qty;
  });
  var rate = taxOffline() ? DEFAULT_TAX_RATE : TAX_RATE;
  var tax = round2(subtotal * rate);
  var deposit = tx.deposit || 0;
  return {
    subtotal: subtotal,
    tax: tax,
    deposit: deposit,
    total: subtotal + tax + deposit
  };
}

// shows the cashier name, register and clock in the top bar
function fillTopbar() {
  var el = document.getElementById("cashier");
  if (el) el.textContent = "Cashier: " + getSetting("cashier", "Li Wei");

  var clock = document.getElementById("clock");
  if (clock) {
    var tick = function () {
      var d = new Date();
      clock.textContent = d.toLocaleDateString("en-GB") + "  " +
        d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    };
    tick();
    setInterval(tick, 30000);
  }
}

document.addEventListener("DOMContentLoaded", fillTopbar);

// ---------- D-01 manager approval (dialog) ----------
// Asks for the employee ID and the PIN of a store manager and, when needed, a reason.
// opts: { title, text, reason: true/false, extra: "label of an extra field" }
// onOk({ id, name, reason, extra }) is called when a store manager approves.
// Prototype: the PIN is not checked, but the role is (only E-2001 is a store manager).
function managerApproval(opts, onOk) {
  closeOverlay();

  var overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.className = "scan-overlay";
  overlay.innerHTML =
    "<div class='scan-box'>" +
      "<h2>" + opts.title + "</h2>" +
      (opts.text ? "<p>" + opts.text + "</p>" : "") +
      "<div id='d-error' class='msg msg-error hidden'></div>" +
      (opts.extra ? "<div class='field'><label for='d-extra'>" + opts.extra + "</label><input id='d-extra' type='text'></div>" : "") +
      "<div class='row'>" +
        "<div class='field'><label for='d-id'>Store manager ID</label><input id='d-id' type='text' placeholder='E-2001'></div>" +
        "<div class='field'><label for='d-pin'>PIN</label><input id='d-pin' type='password'></div>" +
      "</div>" +
      (opts.reason ? "<div class='field'><label for='d-reason'>Reason</label><input id='d-reason' type='text'></div>" : "") +
      "<div class='btn-group'>" +
        "<button class='btn btn-primary' id='d-ok'>Approve</button>" +
        "<button class='btn' id='d-cancel'>Cancel</button>" +
      "</div>" +
      "<p class='scan-hint'>Prototype: store manager E-2001 (Ana Torres), any PIN. E-1042 shows the refusal.</p>" +
    "</div>";
  document.body.appendChild(overlay);
  document.getElementById(opts.extra ? "d-extra" : "d-id").focus();

  document.getElementById("d-cancel").addEventListener("click", closeOverlay);
  document.getElementById("d-ok").addEventListener("click", function () {
    var id = document.getElementById("d-id").value.trim().toUpperCase();
    var pin = document.getElementById("d-pin").value;
    var reason = opts.reason ? document.getElementById("d-reason").value.trim() : "";
    var extra = opts.extra ? document.getElementById("d-extra").value.trim() : "";
    var err = document.getElementById("d-error");
    var problem = "";
    if (opts.extra && extra === "") problem = "Enter the " + opts.extra.toLowerCase() + ".";
    else if (!MANAGERS[id]) problem = (id || "This employee") + " is not an active store manager. Ask a store manager to approve.";
    else if (pin === "") problem = "Enter the PIN of the store manager.";
    else if (opts.reason && reason === "") problem = "Enter the reason.";
    if (problem) {
      err.textContent = problem;
      err.classList.remove("hidden");
      return;
    }
    closeOverlay();
    onOk({ id: id, name: MANAGERS[id], reason: reason, extra: extra });
  });
}

function closeOverlay() {
  var el = document.getElementById("overlay");
  if (el) el.parentNode.removeChild(el);
}

// ---------- barcode scanner (simulated) ----------
// Opens a scanner window. The prototype has no real camera: the cashier
// clicks one of the example barcodes to "scan" it.
// codes: [{ code: "1001", label: "Hammer 500 g" }, ...]
// onScan(code) is called with the scanned code.
function openScanner(title, codes, onScan) {
  closeScanner();

  var overlay = document.createElement("div");
  overlay.id = "scanner";
  overlay.className = "scan-overlay";

  var list = codes.map(function (c) {
    return "<button class='scan-code' data-code='" + c.code + "'>" +
      "<span class='bars'></span><strong>" + c.code + "</strong>" +
      (c.label ? "<small>" + c.label + "</small>" : "") + "</button>";
  }).join("");

  overlay.innerHTML =
    "<div class='scan-box'>" +
      "<h2>" + title + "</h2>" +
      "<div class='scan-view'><div class='scan-frame'><div class='scan-laser'></div></div>" +
        "<p id='scan-status'>Hold the barcode in front of the scanner</p></div>" +
      "<p class='scan-hint'>Prototype: click a barcode to simulate a scan.</p>" +
      "<div class='scan-codes'>" + list + "</div>" +
      "<button class='btn' id='scan-close'>Close</button>" +
    "</div>";

  document.body.appendChild(overlay);

  overlay.querySelectorAll(".scan-code").forEach(function (b) {
    b.addEventListener("click", function () {
      var code = b.getAttribute("data-code");
      document.getElementById("scan-status").textContent = "Scanned: " + code;
      overlay.querySelector(".scan-view").classList.add("scan-ok");
      beep();
      setTimeout(function () {
        closeScanner();
        onScan(code);
      }, 500);
    });
  });
  document.getElementById("scan-close").addEventListener("click", closeScanner);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeScanner();
  });
}

function closeScanner() {
  var el = document.getElementById("scanner");
  if (el) el.parentNode.removeChild(el);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeScanner();
    closeOverlay();
  }
});

// short beep, like a real scanner
function beep() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.frequency.value = 1800;
    gain.gain.value = 0.1;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {}
}
