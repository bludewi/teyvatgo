<?php
require_once 'db.php';

// Handle self-submitting POST actions (Update & Delete)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action     = $_POST['action'] ?? '';
    $booking_id = (int)($_POST['booking_id'] ?? 0);

    // Ensure the booking belongs to the current user's session
    $allowedIds = $_SESSION['my_bookings'] ?? [];

    if ($booking_id > 0 && in_array($booking_id, $allowedIds, true)) {
        if ($action === 'update') {
            $new_date      = $_POST['travel_date'] ?? '';
            $new_travelers = (int)($_POST['travelers'] ?? 1);

            if ($new_date >= date('Y-m-d') && $new_travelers >= 1 && $new_travelers <= 20) {
                // Look up base price for this booking's package
                $rateStmt = $pdo->prepare("
                    SELECT p.base_price
                    FROM bookings b
                    JOIN packages p ON b.package_code = p.package_code
                    WHERE b.booking_id = :id
                ");
                $rateStmt->execute([':id' => $booking_id]);
                $pkg = $rateStmt->fetch();

                if ($pkg) {
                    $new_total = $pkg['base_price'] * $new_travelers;

                    $updateStmt = $pdo->prepare("
                        UPDATE bookings
                        SET travel_date = :travel_date, travelers = :travelers, total_price = :total_price
                        WHERE booking_id = :id
                    ");
                    $updateStmt->execute([
                        ':travel_date' => $new_date,
                        ':travelers'   => $new_travelers,
                        ':total_price' => $new_total,
                        ':id'          => $booking_id
                    ]);

                    $_SESSION['flash'] = ['type' => 'success', 'text' => "Reservation #{$booking_id} updated successfully."];
                }
            } else {
                $_SESSION['flash'] = ['type' => 'error', 'text' => 'Choose today or a future date and 1–20 travelers.'];
            }
        } elseif ($action === 'delete') {
            $deleteStmt = $pdo->prepare("DELETE FROM bookings WHERE booking_id = :id");
            $deleteStmt->execute([':id' => $booking_id]);

            // Remove deleted ID from $_SESSION
            $_SESSION['my_bookings'] = array_values(array_diff($allowedIds, [$booking_id]));
            $_SESSION['flash'] = ['type' => 'success', 'text' => "Reservation #{$booking_id} has been cancelled."];
        }
    }

    header('Location: bookings.php');
    exit;
}

// Fetch all active bookings stored in $_SESSION['my_bookings']
$reservations = [];
$sessionIds = $_SESSION['my_bookings'] ?? [];

if (!empty($sessionIds)) {
    $placeholders = implode(',', array_fill(0, count($sessionIds), '?'));
    $fetchStmt = $pdo->prepare("
        SELECT b.*, p.nation_name, p.duration, p.base_price
        FROM bookings b
        JOIN packages p ON b.package_code = p.package_code
        WHERE b.booking_id IN ($placeholders)
        ORDER BY b.created_at DESC
    ");
    $fetchStmt->execute($sessionIds);
    $reservations = $fetchStmt->fetchAll();
}

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Reservations | Teyvat Go</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Inter:wght@500;600;700;800&family=Roboto+Slab:wght@900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="header-wrapper">
    <header class="navbar">
      <a href="mondstadt.php" class="logo">
        <svg class="brand-icon" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="forward-icon" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#83aae8" />
              <stop offset="100%" stop-color="#0d3b73" />
            </linearGradient>
          </defs>
          <path d="M2 4.5C2 2.6 4.1 1.5 5.7 2.5L22.5 13C24 13.9 24 16.1 22.5 17L5.7 27.5C4.1 28.5 2 27.4 2 25.5V4.5Z" fill="url(#forward-icon)" />
          <path d="M18 4.5C18 2.6 20.1 1.5 21.7 2.5L38.5 13C40 13.9 40 16.1 38.5 17L21.7 27.5C20.1 28.5 18 27.4 18 25.5V4.5Z" fill="url(#forward-icon)" />
        </svg>
        <span class="brand-text">teyvat<span class="brand-highlight">go</span></span>
      </a>

      <nav class="nav-links">
        <details class="destination-menu">
          <summary>DESTINATIONS</summary>
          <div class="destination-dropdown">
            <a href="mondstadt.php">MONDSTADT</a>
            <a href="liyue.php">LIYUE</a>
            <a href="inazuma.php">INAZUMA</a>
            <a href="sumeru.php">SUMERU</a>
            <a href="fontaine.php">FONTAINE</a>
            <a href="natlan.php">NATLAN</a>
            <a href="snezhnaya.php">SNEZHNAYA</a>
          </div>
        </details>
        <a href="about.php">ABOUT US</a>
        <a href="bookings.php" aria-current="page">MY BOOKINGS</a>
        <a href="about.php#contact" class="btn-contact">CONTACT</a>
      </nav>
    </header>
  </div>

  <main style="max-width: 64rem; min-height: 55vh; margin: 3.5rem auto; padding: 0 1.5rem;">
    <h1 id="my-reservations" style="font-family: 'Fredoka', sans-serif; color: var(--color-primary); margin-bottom: 1.25rem;">
      MY RESERVATIONS
    </h1>

    <!-- Session Flash Notification Banner (XSS-Sanitized) -->
    <?php if ($flash && !empty($flash['reservation_created'])): ?>
      <div class="reservation-success-modal" role="dialog" aria-modal="true" aria-labelledby="reservation-success-heading" aria-describedby="reservation-success-message">
        <div class="reservation-success-content">
          <div class="reservation-success-heading">
            <svg class="reservation-success-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="21.5" stroke="currentColor" stroke-width="2" />
              <path d="m14 24 7 7 14-15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h2 id="reservation-success-heading">RESERVATION CONFIRMED!</h2>
          </div>
          <p id="reservation-success-message">Thank you for booking with TeyvatGo. We sent you an email with your trip details to your email address.</p>
          <div class="reservation-success-actions">
            <button type="button" class="reservation-success-close">Close</button>
          </div>
        </div>
      </div>
    <?php elseif ($flash): ?>
      <div style="padding: 1rem 1.25rem; border-radius: 0.5rem; margin-bottom: 1.5rem; font-weight: 700;
        background-color: <?= $flash['type'] === 'success' ? '#c7f8b6' : '#ffd4d4' ?>;
        color: <?= $flash['type'] === 'success' ? '#053264' : '#8a1111' ?>;">
        <?= htmlspecialchars($flash['text'], ENT_QUOTES, 'UTF-8') ?>
      </div>
    <?php endif; ?>

    <?php if (empty($reservations)): ?>
      <p style="margin-bottom: 1.5rem;">You have no active reservations in this session yet.</p>
      <a href="about.php#trips" class="btn-book" style="display: inline-block;">EXPLORE PACKAGES</a>
    <?php else: ?>
      <!-- Dynamic PHP Loop outputting sanitized database rows -->
      <?php foreach ($reservations as $row): ?>
        <article style="background: #f2f4f8; border-radius: 0.75rem; padding: 1.75rem; margin-bottom: 1.5rem; box-shadow: 0 6px 18px rgba(0,0,0,0.08);">
          <h2 style="font-family: 'Fredoka', sans-serif; color: var(--color-primary); margin-bottom: 0.5rem;">
            <?= htmlspecialchars($row['package_code'] . ' — ' . $row['nation_name'], ENT_QUOTES, 'UTF-8') ?>
          </h2>

          <p><strong>Lead Traveler:</strong> <?= htmlspecialchars($row['first_name'] . ' ' . $row['last_name'], ENT_QUOTES, 'UTF-8') ?></p>
          <p><strong>Email:</strong> <?= htmlspecialchars($row['email'], ENT_QUOTES, 'UTF-8') ?> | <strong>Phone:</strong> <?= htmlspecialchars($row['phone'], ENT_QUOTES, 'UTF-8') ?></p>
          <p><strong>Duration:</strong> <?= htmlspecialchars($row['duration'], ENT_QUOTES, 'UTF-8') ?></p>
          <p style="margin-bottom: 1rem;"><strong>Total Price:</strong> <?= htmlspecialchars(number_format((float)$row['total_price'], 2), ENT_QUOTES, 'UTF-8') ?> PHP</p>

          <!-- Self-Submitting POST Form to Update Reservation -->
          <form action="bookings.php" method="POST" style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; margin-bottom: 0.85rem;">
            <input type="hidden" name="action" value="update">
            <input type="hidden" name="booking_id" value="<?= (int)$row['booking_id'] ?>">

            <div>
              <label style="display: block; font-weight: 700; font-size: 0.85rem;">Travel Date</label>
              <input type="date" name="travel_date" min="<?= date('Y-m-d') ?>"
                value="<?= htmlspecialchars($row['travel_date'], ENT_QUOTES, 'UTF-8') ?>" required
                style="padding: 0.55rem; border: 1px solid #cbd5e1; border-radius: 0.4rem;">
            </div>

            <div>
              <label style="display: block; font-weight: 700; font-size: 0.85rem;">Travelers</label>
              <input type="number" name="travelers" min="1" max="20"
                value="<?= (int)$row['travelers'] ?>" required
                style="padding: 0.55rem; width: 5.5rem; border: 1px solid #cbd5e1; border-radius: 0.4rem;">
            </div>

            <button type="submit" class="btn-trip-view" style="border: none; cursor: pointer;">Update Booking</button>
          </form>

          <!-- Self-Submitting POST Form to Cancel/Delete Reservation -->
          <form action="bookings.php" method="POST">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="booking_id" value="<?= (int)$row['booking_id'] ?>">
            <button type="submit" style="background: #b42318; color: #fff; border: none; border-radius: 9999px; padding: 0.6rem 1.4rem; font-weight: 700; cursor: pointer;">
              Cancel Reservation
            </button>
          </form>
        </article>
      <?php endforeach; ?>
    <?php endif; ?>
  </main>

  <footer class="site-footer">
    <div class="footer-container">
      <!-- Column 1: Brand & Contact Info -->
      <div class="footer-brand-col">
        <a href="mondstadt.php" class="footer-logo">
          <svg class="footer-brand-icon" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="footer-forward-icon" x1="0" y1="0" x2="0" y2="30" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#83aae8" />
                <stop offset="100%" stop-color="#0d3b73" />
              </linearGradient>
            </defs>
            <path d="M2 4.5C2 2.6 4.1 1.5 5.7 2.5L22.5 13C24 13.9 24 16.1 22.5 17L5.7 27.5C4.1 28.5 2 27.4 2 25.5V4.5Z" fill="url(#footer-forward-icon)" />
            <path d="M18 4.5C18 2.6 20.1 1.5 21.7 2.5L38.5 13C40 13.9 40 16.1 38.5 17L21.7 27.5C20.1 28.5 18 27.4 18 25.5V4.5Z" fill="url(#footer-forward-icon)" />
          </svg>
          <span class="footer-brand-text">teyvat<span class="brand-highlight">go</span></span>
        </a>

        <div class="footer-contact">
          <p>Tel : 09451236789</p>
          <p>Email : teyvatgo@gmail.com</p>
          <p>Address : West Wind Boulevard, Knights<br>Quarter, Mondstadt City, Teyvat 1001</p>
        </div>
      </div>

      <!-- Column 2: Destinations -->
      <div class="footer-links-col">
        <h3>DESTINATIONS</h3>
        <ul>
          <li><a href="mondstadt.php">MONDSTADT</a></li>
          <li><a href="liyue.php">LIYUE</a></li>
          <li><a href="inazuma.php">INAZUMA</a></li>
          <li><a href="sumeru.php">SUMERU</a></li>
          <li><a href="fontaine.php">FONTAINE</a></li>
          <li><a href="natlan.php">NATLAN</a></li>
          <li><a href="snezhnaya.php">SNEZHNAYA</a></li>
        </ul>
      </div>

      <!-- Column 3: Company Links & Social Media -->
      <div class="footer-social-col">
        <ul class="footer-primary-links">
          <li><a href="about.php">ABOUT US</a></li>
          <li><a href="bookings.php">MY BOOKINGS</a></li>
          <li><a href="about.php#contact">CONTACT</a></li>
        </ul>

        <div class="footer-connect">
          <h3>CONNECT WITH US</h3>
          <div class="social-icons">
            <!-- Facebook -->
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Teyvat Go on Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Teyvat Go on Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <!-- TikTok -->
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="Teyvat Go on TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 All Rights Reserved | Teyvat Go</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>