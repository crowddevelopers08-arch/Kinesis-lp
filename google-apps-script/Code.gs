/* ============================================================
   Kinesis Pain Speciality Centre - Google Apps Script

   Accepts payloads from `app/api/lead/route.ts`:
     {
       type,            // "lead" | "feedback"
       sheetTab,        // "Kinesis Leads" | "Kinesis Feedback"
       timestamp, name, phone, email,
       concern,         // lead only  (Knee Pain / Back Pain / Shoulder Pain / Other)
       message, rating, // feedback only
       form,            // hero | footer-cta | feedback-page
       source, pageUrl,
       utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid
     }

   Rows are written by header name instead of fixed column position so the
   tabs can tolerate extra manual columns (e.g. "Status", "Notes") without
   breaking submissions.

   SETUP
   1. Open the Google Sheet > Extensions > Apps Script, paste this file.
   2. Run `authorize` once, then `setupSheets` (accept the permissions prompt).
   3. Deploy > New deployment > Web app
        Execute as: Me   |   Who has access: Anyone
   4. Copy the /exec URL into GOOGLE_SHEETS_WEBHOOK_URL (Vercel / .env.local).
   5. After any code change: Deploy > Manage deployments > Edit > New version.
   ============================================================ */

var LEAD_TAB = 'Kinesis Leads';
var FEEDBACK_TAB = 'Kinesis Feedback';

var LEAD_HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Pain Concern', 'Form', 'Source', 'Page URL',
  'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'FBCLID'
];
var LEAD_WIDTHS = [170, 170, 130, 220, 150, 120, 160, 300, 130, 130, 180, 150, 150, 200, 200];

var FEEDBACK_HEADERS = ['Timestamp', 'Name', 'Phone', 'Email', 'Rating', 'Feedback', 'Page URL'];
var FEEDBACK_WIDTHS = [170, 170, 130, 220, 80, 420, 300];

var LEAD_HEADER_COLOR = '#4A1D4F';      // plum
var FEEDBACK_HEADER_COLOR = '#7A4A80';  // lighter plum

var TAB_CONFIG = {};
TAB_CONFIG[LEAD_TAB] = { headers: LEAD_HEADERS, widths: LEAD_WIDTHS, color: LEAD_HEADER_COLOR };
TAB_CONFIG[FEEDBACK_TAB] = { headers: FEEDBACK_HEADERS, widths: FEEDBACK_WIDTHS, color: FEEDBACK_HEADER_COLOR };

function authorize() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorized: ' + ss.getName());
}

function doGet() {
  return _json({ status: 'Kinesis Pain Speciality Centre API is live' });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return _json({ error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);
    var ts = data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Only ever write to the two known tabs, whatever the client sends.
    var isFeedback = data.type === 'feedback' || data.sheetTab === FEEDBACK_TAB;
    var sheetTab = isFeedback ? FEEDBACK_TAB : LEAD_TAB;

    // Serialise writes so simultaneous submissions don't style each other's rows.
    lock.waitLock(20000);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSheet(ss, sheetTab);
    var row = isFeedback ? appendFeedbackRow(sheet, data, ts) : appendLeadRow(sheet, data, ts);

    return _json({ success: true, tab: sheetTab, row: row });
  } catch (err) {
    return _json({ error: err.toString() });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(TAB_CONFIG).forEach(function (tab) {
    if (!ss.getSheetByName(tab)) {
      createSheet(ss, tab);
      Logger.log('Created: ' + tab);
    } else {
      Logger.log('OK: ' + tab);
    }
  });

  Logger.log('setupSheets complete.');
}

/** Run from the editor to check the sheet side without the website. */
function testLead() {
  var res = doPost({ postData: { contents: JSON.stringify({
    type: 'lead', name: 'Test Lead', phone: '9876543210', email: 'test@example.com',
    concern: 'Knee Pain', form: 'hero', source: 'Kinesis Pain LP',
    pageUrl: 'https://example.com/?utm_source=test', utm_source: 'test'
  }) } });
  Logger.log(res.getContent());
}

function testFeedback() {
  var res = doPost({ postData: { contents: JSON.stringify({
    type: 'feedback', name: 'Test Patient', phone: '9876543210', email: '',
    rating: '3', message: 'Waiting time was long.', pageUrl: 'https://example.com/feedback'
  }) } });
  Logger.log(res.getContent());
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function _styleHeader(sheet, colCount, bgColor) {
  sheet.getRange(1, 1, 1, colCount)
    .setBackground(bgColor || LEAD_HEADER_COLOR)
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42);
}

function styleRow(sheet, rowIndex, colCount) {
  var row = sheet.getRange(rowIndex, 1, 1, colCount);
  row.setBackground(rowIndex % 2 === 0 ? '#f7f3f8' : '#ffffff')
    .setFontColor('#1f1623')
    .setFontSize(10)
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('left');
  sheet.setRowHeight(rowIndex, 36);
  row.setBorder(false, false, true, false, false, false, '#e6dcea', SpreadsheetApp.BorderStyle.SOLID);
}

function _setWidths(sheet, widths) {
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });
}

function _addFilter(sheet, colCount) {
  try {
    if (!sheet.getFilter()) sheet.getRange(1, 1, 1, colCount).createFilter();
  } catch (err) {
    Logger.log('Filter skipped on ' + sheet.getName() + ': ' + err);
  }
}

function _appendByHeaders(sheet, valueMap, defaultHeaders, headerColor) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(defaultHeaders);
    _styleHeader(sheet, defaultHeaders.length, headerColor);
    sheet.setFrozenRows(1);
  }

  var lastCol = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
    return String(h).trim();
  });

  var row = headers.map(function (h) {
    return Object.prototype.hasOwnProperty.call(valueMap, h) ? valueMap[h] : '';
  });

  var nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, lastCol).setValues([row]);
  styleRow(sheet, nextRow, lastCol);

  return { row: nextRow, headers: headers };
}

function _centerColumns(sheet, headers, rowIndex, names) {
  names.forEach(function (name) {
    var idx = headers.indexOf(name);
    if (idx !== -1) sheet.getRange(rowIndex, idx + 1).setHorizontalAlignment('center');
  });
}

function _clean(v) {
  var s = v == null ? '' : String(v).trim();
  // Guard against spreadsheet formula injection from form input.
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function createSheet(ss, tabName) {
  var cfg = TAB_CONFIG[tabName];
  var sheet = ss.insertSheet(tabName);
  sheet.appendRow(cfg.headers);
  _styleHeader(sheet, cfg.headers.length, cfg.color);
  _setWidths(sheet, cfg.widths);
  sheet.setFrozenRows(1);
  _addFilter(sheet, cfg.headers.length);
  return sheet;
}

function getOrCreateSheet(ss, tabName) {
  return ss.getSheetByName(tabName) || createSheet(ss, tabName);
}

function appendLeadRow(sheet, data, ts) {
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': _clean(data.name),
    'Phone': _clean(data.phone),
    'Email': _clean(data.email),
    'Pain Concern': _clean(data.concern) || 'Not specified',
    'Form': _clean(data.form),
    'Source': _clean(data.source),
    'Page URL': _clean(data.pageUrl),
    'UTM Source': _clean(data.utm_source),
    'UTM Medium': _clean(data.utm_medium),
    'UTM Campaign': _clean(data.utm_campaign),
    'UTM Term': _clean(data.utm_term),
    'UTM Content': _clean(data.utm_content),
    'GCLID': _clean(data.gclid),
    'FBCLID': _clean(data.fbclid)
  }, LEAD_HEADERS, LEAD_HEADER_COLOR);

  _centerColumns(sheet, result.headers, result.row, ['Phone', 'Pain Concern', 'Form']);
  return result.row;
}

function appendFeedbackRow(sheet, data, ts) {
  var result = _appendByHeaders(sheet, {
    'Timestamp': ts,
    'Name': _clean(data.name),
    'Phone': _clean(data.phone),
    'Email': _clean(data.email),
    'Rating': _clean(data.rating),
    'Feedback': _clean(data.message),
    'Page URL': _clean(data.pageUrl)
  }, FEEDBACK_HEADERS, FEEDBACK_HEADER_COLOR);

  var idx = result.headers.indexOf('Feedback');
  if (idx !== -1) sheet.getRange(result.row, idx + 1).setWrap(true);
  _centerColumns(sheet, result.headers, result.row, ['Phone', 'Rating']);
  return result.row;
}
