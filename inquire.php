<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: about.php#contact');
    exit;
}

$first_name = trim($_POST['first_name'] ?? '');
$last_name  = trim($_POST['last_name'] ?? '');
$email      = trim($_POST['email'] ?? '');
$subject    = trim($_POST['subject'] ?? '');
$comments   = trim($_POST['comments'] ?? '');

if (
    !preg_match("/^[A-Za-zÀ-ÿ\s'-]{2,}$/", $first_name) ||
    !preg_match("/^[A-Za-zÀ-ÿ\s'-]{2,}$/", $last_name) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    mb_strlen($subject) < 3 ||
    mb_strlen($comments) < 10
) {
    $_SESSION['flash'] = ['type' => 'error', 'text' => 'Please fix the errors in your inquiry form before submitting.'];
    header('Location: about.php#contact');
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO inquiries (first_name, last_name, email, subject, comments)
    VALUES (:first_name, :last_name, :email, :subject, :comments)
");

$stmt->execute([
    ':first_name' => $first_name,
    ':last_name'  => $last_name,
    ':email'      => $email,
    ':subject'    => $subject,
    ':comments'   => $comments
]);

$_SESSION['flash'] = [
    'type' => 'success',
    'text' => "Thank you, {$first_name}! Your inquiry regarding \"{$subject}\" has been sent to Teyvat Go."
];

header('Location: about.php#contact');
exit;
?>