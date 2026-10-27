// NewEra POS - prototype data and helpers
// All data is fake. Nothing is sent to a real system.

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
var RENTAL_ITEMS = {
  "SN-2001-01": { product: "2001", status: "Available" },
  "SN-2001-02": { product: "2001", status: "Rented" },
  "SN-2002-01": { product: "2002", status: "Available" },
  "SN-2002-05": { product: "2002", status: "Rented" },
  "SN-2003-01": { product: "2003", status: "Under maintenance" }
};

function money(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

// the current transaction is kept in sessionStorage so it survives page changes
function loadTx() {
  try {
    var raw = sessionStorage.getItem("pos_tx");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveTx(tx) {
  try {
    sessionStorage.setItem("pos_tx", JSON.stringify(tx));
  } catch (e) {}
}

function clearTx() {
  try {
    sessionStorage.removeItem("pos_tx");
  } catch (e) {}
}

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

function taxOffline() {
  return getSetting("tax_offline", "no") === "yes";
}

// subtotal, tax, deposit and total of a transaction
function computeTotals(tx) {
  var subtotal = 0;
  tx.lines.forEach(function (l) {
    subtotal += l.price * l.qty;
  });
  var rate = taxOffline() ? DEFAULT_TAX_RATE : TAX_RATE;
  var tax = Math.round(subtotal * rate * 100) / 100;
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
  if (e.key === "Escape") closeScanner();
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
