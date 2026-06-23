<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

const DEFAULT_MAIL_TO = 'Emunetluna@gmail.com';
const RECAPTCHA_SECRET = '6Le8Sy8tAAAAAPhjb2yvn5qSdu2e65YR_nncFCC6';
const SITE_NAME = 'Luna Cottage';
const SITE_TAGLINE = 'Adult Family Home';
const SITE_OWNER = 'Fitsum Awoke, RN, BSN';
const SITE_ADDRESS = '10524 23rd Dr SE, Everett, WA 98208';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function readJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function field(string $key, array $data): string
{
    if (!isset($data[$key])) {
        return '';
    }

    return trim((string) $data[$key]);
}

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function verifyRecaptcha(string $token): bool
{
    if ($token === '') {
        return false;
    }

    $payload = http_build_query([
        'secret' => RECAPTCHA_SECRET,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 10,
        ],
    ]);

    $result = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    if ($result === false) {
        return false;
    }

    $json = json_decode($result, true);
    return is_array($json) && !empty($json['success']) && (($json['score'] ?? 1) >= 0.5);
}

function fieldRow(string $label, string $value, ?string $href = null): string
{
    $safeValue = escapeHtml($value);
    $content = $href
        ? '<a href="' . escapeHtml($href) . '" style="color:#58217a;font-weight:600;text-decoration:none;">' . $safeValue . '</a>'
        : $safeValue;

    return '
    <tr>
      <td style="padding:0 0 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid rgba(197,168,128,0.35);border-left:3px solid #c5a880;border-radius:12px;">
          <tr>
            <td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#58217a;margin-bottom:5px;">' . escapeHtml($label) . '</div>
              <div style="font-size:14px;line-height:1.55;color:#2d2d2d;font-weight:500;">' . $content . '</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>';
}

function metaItem(string $label, string $value, bool $full = false): string
{
  $colspan = $full ? ' colspan="2"' : '';
  $width = $full ? '' : ' width:50%;';

  return '
    <td' . $colspan . ' style="padding:0 0 10px;' . $width . '">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(46,20,71,0.04);border:1px solid rgba(46,20,71,0.08);border-radius:10px;">
        <tr>
          <td style="padding:11px 13px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:8px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a8885c;margin-bottom:3px;">' . escapeHtml($label) . '</div>
            <div style="font-size:11px;line-height:1.45;color:#5a5a5a;word-break:break-word;">' . escapeHtml($value) . '</div>
          </td>
        </tr>
      </table>
    </td>';
}

function buildInquiryEmailHtml(array $payload): string
{
    $phoneDigits = preg_replace('/[^\d+]/', '', $payload['phone']) ?? '';
    $safeName = escapeHtml($payload['fullName']);
    $safeMessage = nl2br(escapeHtml($payload['message']));
    $callButton = $phoneDigits !== ''
        ? '<td style="padding-right:10px;padding-bottom:10px;"><a href="tel:' . escapeHtml($phoneDigits) . '" style="display:inline-block;padding:9px 16px;border-radius:999px;background:#ffffff;color:#2e1447;border:1px solid rgba(46,20,71,0.15);font-size:11px;font-weight:600;text-decoration:none;">Call visitor</a></td>'
        : '';

    return '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Luna Cottage inquiry</title>
</head>
<body style="margin:0;padding:24px 12px;background:#e2dbd0;font-family:Arial,Helvetica,sans-serif;color:#2d2d2d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#faf7f2;border-radius:20px;overflow:hidden;border:1px solid rgba(197,168,128,0.35);box-shadow:0 20px 50px -24px rgba(45,45,45,0.28);">
          <tr>
            <td style="padding:28px 24px 32px;background:#faf7f2;border:1px solid rgba(197,168,128,0.25);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:22px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:48px;height:48px;border-radius:50%;border:1.5px solid #c5a880;text-align:center;vertical-align:middle;font-family:Georgia,\'Times New Roman\',serif;font-size:22px;font-weight:700;color:#c5a880;background:rgba(46,20,71,0.04);">L</td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <div style="font-family:Georgia,\'Times New Roman\',serif;font-size:22px;font-weight:700;color:#2e1447;line-height:1.1;">' . escapeHtml(SITE_NAME) . '</div>
                          <div style="margin-top:3px;font-size:9px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#c5a880;">' . escapeHtml(SITE_TAGLINE) . '</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#2e1447,#58217a);border:1px solid rgba(197,168,128,0.45);border-radius:14px;">
                      <tr>
                        <td style="padding:14px 16px;color:#faf7f2;font-family:Arial,Helvetica,sans-serif;">
                          <div style="font-family:Georgia,\'Times New Roman\',serif;font-size:18px;font-weight:700;line-height:1.2;">New website inquiry</div>
                          <div style="margin-top:4px;font-size:12px;line-height:1.5;color:rgba(250,247,242,0.82);">A visitor submitted the contact form. Reply directly to their email or call the number below.</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px;font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#c5a880;">Visitor details</td>
                </tr>
                <tr>
                  <td style="padding-bottom:18px;font-family:Georgia,\'Times New Roman\',serif;font-size:24px;font-weight:700;color:#2e1447;">' . $safeName . '</td>
                </tr>
                ' . fieldRow('Full Name', $payload['fullName']) . '
                ' . fieldRow('Phone Number', $payload['phone'], $phoneDigits !== '' ? 'tel:' . $phoneDigits : null) . '
                ' . fieldRow('Email Address', $payload['email'], 'mailto:' . $payload['email']) . '
                ' . fieldRow('I am a', $payload['role']) . '
                <tr>
                  <td style="padding:8px 0 18px;font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#c5a880;">Message</td>
                </tr>
                <tr>
                  <td style="padding-bottom:22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(197,168,128,0.1);border:1px solid rgba(197,168,128,0.28);border-radius:12px;">
                      <tr>
                        <td style="padding:18px;font-family:Georgia,\'Times New Roman\',serif;font-size:14px;line-height:1.65;color:#2d2d2d;font-style:italic;">' . $safeMessage . '</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>' . metaItem('Submitted at', $payload['submittedAt'], true) . '</tr>
                      <tr>' . metaItem('Page URL', $payload['pageUrl'], true) . '</tr>
                      <tr>' . metaItem('Referrer', $payload['referrer']) . metaItem('Browser language', $payload['language']) . '</tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:24px;border-top:1px solid rgba(197,168,128,0.35);">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:10px;padding-bottom:10px;">
                          <a href="mailto:' . escapeHtml($payload['email']) . '" style="display:inline-block;padding:9px 16px;border-radius:999px;background:#2e1447;color:#faf7f2;font-size:11px;font-weight:600;text-decoration:none;">Reply by email</a>
                        </td>
                        ' . $callButton . '
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;border-top:1px solid rgba(197,168,128,0.35);text-align:center;font-size:10px;line-height:1.6;color:rgba(45,45,45,0.5);">
                    <strong style="color:#2e1447;">' . escapeHtml(SITE_NAME) . ' ' . escapeHtml(SITE_TAGLINE) . '</strong><br />
                    ' . escapeHtml(SITE_ADDRESS) . ' · Owner: ' . escapeHtml(SITE_OWNER) . '
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>';
}

$data = readJsonBody();

if (field('botcheck', $data) !== '') {
    respond(200, ['ok' => true]);
}

$fullName = field('fullName', $data);
$phone = field('phone', $data);
$email = field('email', $data);
$role = field('role', $data);
$message = field('message', $data);

if ($fullName === '' || $phone === '' || $email === '' || $role === '' || $message === '') {
    respond(422, ['ok' => false, 'error' => 'Please fill in all required fields.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Please enter a valid email address.']);
}

$recaptchaToken = field('recaptchaToken', $data);
if (!verifyRecaptcha($recaptchaToken)) {
    respond(403, ['ok' => false, 'error' => 'reCAPTCHA verification failed. Please try again.']);
}

$payload = [
    'fullName' => $fullName,
    'phone' => $phone,
    'email' => $email,
    'role' => $role,
    'message' => $message,
    'submittedAt' => field('submittedAt', $data) ?: gmdate('D, d M Y H:i:s') . ' UTC',
    'pageUrl' => field('pageUrl', $data) ?: 'Unknown',
    'referrer' => field('referrer', $data) ?: 'Direct visit',
    'language' => field('language', $data) ?: 'Unknown',
];

$mailTo = DEFAULT_MAIL_TO;
$subject = 'New Luna Cottage inquiry from ' . $fullName;
$html = buildInquiryEmailHtml($payload);

$fromDomain = $_SERVER['HTTP_HOST'] ?? 'lunacottageafh.com';
$fromDomain = preg_replace('/[^a-zA-Z0-9.-]/', '', $fromDomain) ?: 'lunacottageafh.com';

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . SITE_NAME . ' <noreply@' . $fromDomain . '>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($mailTo, $subject, $html, implode("\r\n", $headers));

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'We could not send your message right now. Please call or email us directly.']);
}

respond(200, ['ok' => true]);
