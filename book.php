<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: mondstadt.php');
    exit;
}

$package_code = trim($_POST['package_code'] ?? '');
$first_name   = trim($_POST['first_name'] ?? '');
$last_name    = trim($_POST['last_name'] ?? '');
$email        = trim($_POST['email'] ?? '');
$phone        = trim($_POST['phone'] ?? '');
$travel_date  = $_POST['travel_date'] ?? '';
$travelers    = (int)($_POST['travelers'] ?? 1);
$agree_terms  = isset($_POST['agree_terms']);

// Server-side validation
if (
    !preg_match("/^[A-Za-zÀ-ÿ\s'-]{2,}$/", $first_name) ||
    !preg_match("/^[A-Za-zÀ-ÿ\s'-]{2,}$/", $last_name) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    !preg_match("/^09\d{8,9}$/", $phone) ||
    $travel_date < date('Y-m-d') ||
    $travelers < 1 || $travelers > 20 ||
    !$agree_terms
) {
    $_SESSION['flash'] = ['type' => 'error', 'text' => 'Invalid booking details. Please check all required fields.'];
    header('Location: ' . strtok($_SERVER['HTTP_REFERER'] ?? 'mondstadt.php', '#'));
    exit;
}

// Fetch official package price using a prepared statement
$pkgStmt = $pdo->prepare("SELECT nation_name, base_price FROM packages WHERE package_code = :code");
$pkgStmt->execute([':code' => $package_code]);
$package = $pkgStmt->fetch();

if (!$package) {
    $_SESSION['flash'] = ['type' => 'error', 'text' => 'Selected travel package does not exist.'];
    header('Location: mondstadt.php');
    exit;
}

$total_price = $package['base_price'] * $travelers;

// Insert booking using a prepared statement
$stmt = $pdo->prepare("
    INSERT INTO bookings (package_code, first_name, last_name, email, phone, travel_date, travelers, total_price)
    VALUES (:package_code, :first_name, :last_name, :email, :phone, :travel_date, :travelers, :total_price)
");

$stmt->execute([
    ':package_code' => $package_code,
    ':first_name'   => $first_name,
    ':last_name'    => $last_name,
    ':email'        => $email,
    ':phone'        => $phone,
    ':travel_date'  => $travel_date,
    ':travelers'    => $travelers,
    ':total_price'  => $total_price
]);

// Track the new booking ID in $_SESSION so the user can view/edit/cancel it in bookings.php
$newBookingId = (int)$pdo->lastInsertId();
$_SESSION['my_bookings'][] = $newBookingId;

$_SESSION['flash'] = [
    'type' => 'success',
    'text' => "Reservation #{$newBookingId} confirmed for {$first_name} {$last_name} ({$package['nation_name']}) on {$travel_date}!",
    'reservation_created' => true
];

header('Location: bookings.php');
exit;
?>