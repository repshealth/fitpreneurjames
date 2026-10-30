/**
 * FP 1-1 Consulting: application form -> Google Sheet
 * Paste this into Extensions > Apps Script on the "FitPreneurio Form Submission" sheet.
 */

var SHEET_ID = '1VXMKwRru_OaQxIh0TIxO6pbZi-YNYjlUdZtExvmKb38';
var SHEET_NAME = 'Sheet1';

// Column header -> form field name. Change the headers freely; keep the field names.
var COLUMNS = [
  ['Submitted At', null],
  ['Name', 'name'],
  ['Email / WhatsApp', 'contact'],
  ['Monthly Revenue', 'revenue'],
  ['Selling & Price', 'selling'],
  ['Biggest Blocker', 'blocker'],
  ['Paid Ads & Budget', 'ads'],
  ['Build With Me or Fully Handled', 'mode'],
  ['Page', 'page']
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};

    // Hidden spam trap: real people never fill this field in.
    if (p.website) return json({ ok: true });

    writeRow(p);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function writeRow(p) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[0]; }));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow(COLUMNS.map(function (c) {
    return c[1] ? clean(p[c[1]]) : new Date();
  }));
}

// Run this from the editor (select testWrite, click Run) to check the sheet connection.
function testWrite() {
  writeRow({
    name: 'TEST - delete me', contact: 'test@example.com', revenue: 'Under £5k/month',
    selling: 'Test', blocker: 'Test', ads: 'Test', mode: 'Test', page: 'Apps Script editor'
  });
}

// Lets you open the web app URL in a browser to check it's live.
function doGet() {
  return json({ ok: true, message: 'Form endpoint is live' });
}

// Trims input, caps length, and stops text being treated as a spreadsheet formula.
function clean(v) {
  v = String(v == null ? '' : v).trim().slice(0, 5000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
