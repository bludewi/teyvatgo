/* ===========================
   ABOUT US: PACKAGE CAROUSEL
   =========================== */

const tripCard = document.getElementById('trip-card');

if (tripCard) {
  const trips = [
    {
      nation: 'mondstadt',
      heading: 'Mondstadt / MOND-01',
      price: '12,500 PHP per person',
      duration: '3 days / 2 nights',
      stops: 'Cider Lake, Windrise, Cathedral',
      image: 'images/mondstadt-hero.webp',
      alt: 'View of Mondstadt City across Cider Lake',
      link: 'mondstadt.html'
    },
    {
      nation: 'liyue',
      heading: 'Liyue / LIYUE-02',
      price: '15,000 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Liyue Harbor, Mt. Aocang, Wangshu Inn',
      image: 'images/liyue-hero.jpg',
      alt: 'Golden lanterns and cliffs of Liyue Harbor',
      link: 'liyue.html'
    },
    {
      nation: 'inazuma',
      heading: 'Inazuma / INAZ-03',
      price: '18,000 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Nakurami Grand Shrine, Ritou Trading Port, Tenshukaku',
      image: 'images/hero-inazuma.webp',
      alt: 'Sacred Sakura and purple torii gates in Inazuma',
      link: 'inazuma.html'
    },
    {
      nation: 'sumeru',
      heading: 'Sumeru / SUME-04',
      price: '14,000 PHP per person',
      duration: '3 days / 3 nights',
      stops: 'Sumeru City Academy, Gandharva Village, Caravan Ribat',
      image: 'images/hero-sumeru.webp',
      alt: 'Giant treehouse architecture of Sumeru City',
      link: 'sumeru.html'
    },
    {
      nation: 'fontaine',
      heading: 'Fontaine / FONT-05',
      price: '20,000 PHP per person',
      duration: '5 days / 4 nights',
      stops: 'Court of Fontaine, Opera Epiclese, Lucine Fountain',
      image: 'images/hero-fontaine.webp',
      alt: 'Elegant waterways and architecture of Fontaine',
      link: 'fontaine.html'
    },
    {
      nation: 'natlan',
      heading: 'Natlan / NATL-06',
      price: '16,500 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Tepecac Stadium, Children of the Echoes Canyon, People of the Springs',
      image: 'images/hero-natlan.webp',
      alt: 'Vibrant canyons and hot springs of Natlan',
      link: 'natlan.html'
    },
    {
      nation: 'snezhnaya',
      heading: 'Snezhnaya / SNEZ-07',
      price: '22,000 PHP per person',
      duration: '5 days / 4 nights',
      stops: 'Zapolyarny Palace Outskirts, Frost-bound Valleys, Glacial Outposts',
      image: 'images/hero-snezhnaya.png',
      alt: 'Snow-covered palaces and northern lights of Snezhnaya',
      link: 'snezhnaya.html'
    }
  ];

  let currentIndex = 0;

  const tripImg = document.getElementById('trip-img');
  const tripHeading = document.getElementById('trip-heading');
  const tripPrice = document.getElementById('trip-price');
  const tripDuration = document.getElementById('trip-duration');
  const tripStops = document.getElementById('trip-stops');
  const tripViewBtn = document.getElementById('trip-view-btn');
  const tripBookBtn = document.getElementById('trip-book-btn');
  const prevBtn = document.getElementById('prev-trip');
  const nextBtn = document.getElementById('next-trip');
  const dots = document.querySelectorAll('.trip-dot');
  const filterPills = document.querySelectorAll('.filter-pill');

  // Function 1: Update the visible package card content
  function renderTrip(index) {
    currentIndex = (index + trips.length) % trips.length;
    const trip = trips[currentIndex];

    tripImg.src = trip.image;
    tripImg.alt = trip.alt;
    tripHeading.textContent = trip.heading;
    tripPrice.textContent = trip.price;
    tripDuration.textContent = trip.duration;
    tripStops.textContent = trip.stops;
    tripViewBtn.href = trip.link;
    tripBookBtn.href = `${trip.link}#book`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Function 2: Move to previous package
  function showPrevTrip() {
    renderTrip(currentIndex - 1);
  }

  // Function 3: Move to next package
  function showNextTrip() {
    renderTrip(currentIndex + 1);
  }

  // Function 4: Filter packages using nation pills
  function filterTripsByNation(event) {
    const clickedPill = event.currentTarget;
    filterPills.forEach((btn) => btn.classList.remove('active'));
    clickedPill.classList.add('active');

    const nation = clickedPill.dataset.filter;
    if (nation === 'all') {
      renderTrip(0);
      return;
    }

    const matchedIndex = trips.findIndex((t) => t.nation === nation);
    if (matchedIndex !== -1) {
      renderTrip(matchedIndex);
    }
  }

  // Event Type 1: Previous and next button clicks move through the package carousel
  prevBtn.addEventListener('click', showPrevTrip);
  nextBtn.addEventListener('click', showNextTrip);

  // Dot clicks select a package directly by its position in the trips array
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      renderTrip(Number(dot.dataset.index));
    });
  });

  // Nation filter clicks update the active pill and render the matching package
  filterPills.forEach((pill) => {
    pill.addEventListener('click', filterTripsByNation);
  });
}

/* ===========================
   PACKAGE BOOKING MODAL
   =========================== */

// Defines the hero image and label used by each nation package in the reservation modal
const nationBookingData = {
  mondstadt: {
    name: 'MONDSTADT',
    code: 'MOND-01',
    image: 'images/mondstadt-hero.webp',
    price: 12500,
    duration: '3 days / 2 nights',
    stops: 'Cider Lake, Windrise, Cathedral'
  },
  liyue: {
    name: 'LIYUE',
    code: 'LIYUE-02',
    image: 'images/liyue-hero.jpg',
    price: 15000,
    duration: '4 days / 3 nights',
    stops: 'Liyue Harbor, Mt. Aocang, Wangshu Inn'
  },
  inazuma: {
    name: 'INAZUMA',
    code: 'INAZ-03',
    image: 'images/hero-inazuma.webp',
    price: 18000,
    duration: '4 days / 3 nights',
    stops: 'Nakurami Grand Shrine, Ritou Trading Port, Tenshukaku'
  },
  sumeru: {
    name: 'SUMERU',
    code: 'SUME-04',
    image: 'images/hero-sumeru.webp',
    price: 14000,
    duration: '3 days / 3 nights',
    stops: 'Sumeru City Academy, Gandharva Village, Caravan Ribat'
  },
  fontaine: {
    name: 'FONTAINE',
    code: 'FONT-05',
    image: 'images/hero-fontaine.webp',
    price: 20000,
    duration: '5 days / 4 nights',
    stops: 'Court of Fontaine, Opera Epiclese, Lucine Fountain'
  },
  natlan: {
    name: 'NATLAN',
    code: 'NATL-06',
    image: 'images/hero-natlan.webp',
    price: 16500,
    duration: '4 days / 3 nights',
    stops: 'Tepecac Stadium, Children of the Echoes Canyon, People of the Springs'
  },
  snezhnaya: {
    name: 'SNEZHNAYA',
    code: 'SNEZ-07',
    image: 'images/hero-snezhnaya.png',
    price: 22000,
    duration: '5 days / 4 nights',
    stops: 'Zapolyarny Palace Outskirts, Frost-bound Valleys, Glacial Outposts'
  }
};

// Creates the reusable booking modal once, then populates it for the clicked package
function createBookingModal() {
  const existingModal = document.getElementById('booking-modal');
  if (existingModal) return existingModal;

  const modal = document.createElement('div');
  modal.id = 'booking-modal';
  modal.className = 'booking-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'booking-modal-title');
  modal.innerHTML = `
    <div class="booking-modal-backdrop"></div>
    <div class="booking-modal-panel">
      <aside class="booking-modal-media">
        <img id="booking-modal-image" src="" alt="">
        <div class="booking-modal-summary">
          <h3 id="booking-modal-name"></h3>
          <p>Duration: <strong id="booking-modal-duration"></strong></p>
          <p>Your Stops: <strong id="booking-modal-stops"></strong></p>
        </div>
      </aside>

      <form class="booking-modal-form" id="booking-modal-form">
        <h2 id="booking-modal-title"></h2>

        <h3 class="booking-modal-section">YOUR DETAILS</h3>
        <div class="booking-modal-grid">
          <div class="booking-modal-field">
            <label for="booking-first-name">Lead Traveler First Name</label>
            <input id="booking-first-name" name="first_name" type="text" placeholder="Ex. Jane" required>
          </div>
          <div class="booking-modal-field">
            <label for="booking-last-name">Last Name</label>
            <input id="booking-last-name" name="last_name" type="text" placeholder="Ex. Smith" required>
          </div>
          <div class="booking-modal-field">
            <label for="booking-email">Confirmation Email</label>
            <input id="booking-email" name="email" type="email" placeholder="example@gmail.com" required>
          </div>
          <div class="booking-modal-field">
            <label for="booking-phone">Phone Number</label>
            <input id="booking-phone" name="phone" type="tel" placeholder="Ex. 0912345678" required>
          </div>
        </div>

        <h3 class="booking-modal-section">YOUR TRIP</h3>
        <div class="booking-modal-grid">
          <div class="booking-modal-field">
            <label for="booking-date">When would you like to travel?</label>
            <input id="booking-date" name="travel_date" type="date" required>
          </div>
          <div class="booking-modal-field">
            <label for="booking-travelers">How many travelers?</label>
            <input id="booking-travelers" name="travelers" type="number" min="1" value="1" required>
          </div>
        </div>

        <div class="booking-modal-total">
          <div>
            <strong>Estimated Total</strong>
            <span id="booking-modal-estimated"></span>
          </div>
          <strong id="booking-modal-total"></strong>
        </div>

        <label class="booking-modal-terms">
          <input id="booking-terms" name="terms" type="checkbox" required>
          <span>I agree to the booking terms and cancellation policy.</span>
        </label>

        <div class="booking-modal-actions">
          <button type="button" class="booking-modal-cancel">CANCEL</button>
          <button type="submit" class="booking-modal-confirm">CONFIRM RESERVATION</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const cancelBtn = modal.querySelector('.booking-modal-cancel');
  const backdrop = modal.querySelector('.booking-modal-backdrop');
  const form = modal.querySelector('#booking-modal-form');
  const travelersInput = modal.querySelector('#booking-travelers');

  // Cancel button and backdrop clicks close the modal
  cancelBtn.addEventListener('click', closeBookingModal);
  backdrop.addEventListener('click', closeBookingModal);

  // Escape key closes the modal while it is open
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeBookingModal();
    }
  });

  // Traveler count changes recalculate the estimated package total
  travelersInput.addEventListener('input', updateBookingTotal);

  const bookingDate = modal.querySelector('#booking-date');
  const bookingPhone = modal.querySelector('#booking-phone');
  const bookingFirstName = modal.querySelector('#booking-first-name');
  const bookingLastName = modal.querySelector('#booking-last-name');
  const bookingEmail = modal.querySelector('#booking-email');

  // Set today's date as the earliest selectable travel date
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');
  bookingDate.min = localToday;

  // Validate names when fields lose focus
  [bookingFirstName, bookingLastName].forEach((nameInput) => {
    nameInput.addEventListener('blur', () => {
      const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;
      nameInput.setCustomValidity(
        namePattern.test(nameInput.value.trim())
          ? ''
          : 'Please enter a valid name with at least 2 letters.'
      );
    });
  });

  // Validate email format when the field loses focus
  bookingEmail.addEventListener('blur', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    bookingEmail.setCustomValidity(
      emailPattern.test(bookingEmail.value.trim())
        ? ''
        : 'Please enter a valid email address.'
    );
  });

  // Accept 10 or 11 digits and reject letters or invalid phone lengths
  bookingPhone.addEventListener('blur', () => {
    const phoneDigits = bookingPhone.value.replace(/\D/g, '');
    const phonePattern = /^[0-9+\s()-]+$/;
    bookingPhone.setCustomValidity(
      phonePattern.test(bookingPhone.value.trim()) &&
      phoneDigits.length >= 10 &&
      phoneDigits.length <= 11
        ? ''
        : 'Please enter a valid 10 or 11 digit phone number.'
    );
  });

  // Reject past travel dates
  bookingDate.addEventListener('change', () => {
    bookingDate.setCustomValidity(
      bookingDate.value && bookingDate.value >= localToday
        ? ''
        : 'Please select today or a future travel date.'
    );
  });

  // Submission closes the booking form and immediately opens the reservation confirmation card
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = bookingPhone.value.replace(/\D/g, '');
    const phonePattern = /^[0-9+\s()-]+$/;
    let invalidField = null;

    // Revalidate names because submission must not rely only on blur events
    if (!namePattern.test(bookingFirstName.value.trim())) {
      bookingFirstName.setCustomValidity('Please enter a valid first name with at least 2 letters.');
      if (!invalidField) invalidField = bookingFirstName;
    } else {
      bookingFirstName.setCustomValidity('');
    }

    if (!namePattern.test(bookingLastName.value.trim())) {
      bookingLastName.setCustomValidity('Please enter a valid last name with at least 2 letters.');
      if (!invalidField) invalidField = bookingLastName;
    } else {
      bookingLastName.setCustomValidity('');
    }

    // Revalidate email, phone, and travel date before confirmation
    if (!emailPattern.test(bookingEmail.value.trim())) {
      bookingEmail.setCustomValidity('Please enter a valid email address.');
      if (!invalidField) invalidField = bookingEmail;
    } else {
      bookingEmail.setCustomValidity('');
    }

    if (!phonePattern.test(bookingPhone.value.trim()) || phoneDigits.length < 10 || phoneDigits.length > 11) {
      bookingPhone.setCustomValidity('Please enter a valid 10 or 11 digit phone number.');
      if (!invalidField) invalidField = bookingPhone;
    } else {
      bookingPhone.setCustomValidity('');
    }

    if (!bookingDate.value || bookingDate.value < localToday) {
      bookingDate.setCustomValidity('Please select today or a future travel date.');
      if (!invalidField) invalidField = bookingDate;
    } else {
      bookingDate.setCustomValidity('');
    }

    if (invalidField || !form.checkValidity()) {
      if (invalidField) invalidField.reportValidity();
      else form.reportValidity();
      return;
    }

    // Require a final user decision before confirming or cancelling the reservation
    const shouldConfirm = window.confirm(
      'Confirm this reservation request? Select OK to confirm or Cancel to keep editing.'
    );
    if (!shouldConfirm) {
      return;
    }

    closeBookingModal();
    openReservationConfirmation();
  });

  return modal;
}

// Displays the selected nation package in the reservation modal
function openBookingModal(nationKey) {
  const modal = createBookingModal();
  const data = nationBookingData[nationKey];
  if (!data) return;

  modal.querySelector('#booking-modal-form').reset();
  modal.querySelector('#booking-modal-image').src = data.image;
  modal.querySelector('#booking-modal-image').alt = `${data.name} destination`;
  modal.querySelector('#booking-modal-name').textContent = data.name;
  modal.querySelector('#booking-modal-duration').textContent = data.duration;
  modal.querySelector('#booking-modal-stops').textContent = data.stops;
  modal.querySelector('#booking-modal-title').textContent = `${data.code} / ${data.name}`;
  modal.dataset.price = String(data.price);
  modal.querySelector('#booking-modal-estimated').textContent = `${data.code} × 1`;
  modal.querySelector('#booking-modal-total').textContent = `${data.price.toLocaleString('en-US')} PHP`;
  modal.querySelector('#booking-travelers').value = '1';

  // Clear custom validity messages before showing the form again
  modal.querySelectorAll('input').forEach((input) => input.setCustomValidity(''));

  modal.classList.add('active');
  document.body.classList.add('booking-modal-open');
  modal.querySelector('#booking-first-name').focus();
}

// Calculates and updates the modal total based on traveler count
function updateBookingTotal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  const travelers = Math.max(1, Number(modal.querySelector('#booking-travelers').value) || 1);
  const price = Number(modal.dataset.price) || 0;
  const code = modal.querySelector('#booking-modal-title').textContent.split(' / ')[0];

  modal.querySelector('#booking-modal-estimated').textContent = `${code} × ${travelers}`;
  modal.querySelector('#booking-modal-total').textContent =
    `${(price * travelers).toLocaleString('en-US')} PHP`;
}

// Closes the modal and restores normal page scrolling
function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.classList.remove('booking-modal-open');
  modal.querySelector('#booking-modal-form').reset();
}

// Creates and displays the final reservation confirmation dialog
function openReservationConfirmation() {
  let confirmation = document.getElementById('reservation-confirmation');

  if (!confirmation) {
    confirmation = document.createElement('div');
    confirmation.id = 'reservation-confirmation';
    confirmation.className = 'reservation-confirmation';
    confirmation.setAttribute('role', 'dialog');
    confirmation.setAttribute('aria-modal', 'true');
    confirmation.setAttribute('aria-labelledby', 'reservation-confirmation-title');
    confirmation.innerHTML = `
      <div class="reservation-confirmation-backdrop"></div>
      <div class="reservation-confirmation-card">
        <div class="reservation-confirmation-heading">
          <svg class="reservation-confirmation-icon" viewBox="0 0 52 52" fill="none" aria-hidden="true">
            <circle cx="26" cy="26" r="24" stroke="currentColor" stroke-width="2.5"/>
            <path d="M15 27.5L23 35L38 18.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h2 id="reservation-confirmation-title">RESERVATION CONFIRMED!</h2>
        </div>
        <p>
          Thank you for booking with TeyvatGo. A confirmation email<br>
          with your trip details has been sent to your registered email<br>
          address.
        </p>
        <button type="button" class="reservation-confirmation-close">Close</button>
      </div>
    `;
    document.body.appendChild(confirmation);

    // The close button and backdrop dismiss the confirmation dialog
    confirmation.querySelector('.reservation-confirmation-close').addEventListener('click', closeReservationConfirmation);
    confirmation.querySelector('.reservation-confirmation-backdrop').addEventListener('click', closeReservationConfirmation);

    // Escape key also dismisses the confirmation dialog
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && confirmation.classList.contains('active')) {
        closeReservationConfirmation();
      }
    });
  }

  confirmation.classList.add('active');
  document.body.classList.add('reservation-confirmation-open');
  confirmation.querySelector('.reservation-confirmation-close').focus();
}

// Closes the final confirmation dialog and restores page scrolling
function closeReservationConfirmation() {
  const confirmation = document.getElementById('reservation-confirmation');
  if (!confirmation) return;

  confirmation.classList.remove('active');
  document.body.classList.remove('reservation-confirmation-open');
}

// Intercepts all package Book Now buttons and opens the matching reservation modal
document.querySelectorAll('.btn-trip-book, .btn-book').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    let nationKey = '';
    const buttonLink = button.getAttribute('href') || '';

    if (button.classList.contains('btn-trip-book')) {
      nationKey = buttonLink.split('/').pop().split('.')[0];
    } else {
      const pageName = window.location.pathname.split('/').pop().toLowerCase();
      nationKey = pageName.replace('.html', '');
    }

    openBookingModal(nationKey);
  });
});

/* ===========================
   ABOUT US: POLAROID HOVER
   =========================== */

const journeyFrames = document.querySelectorAll('.journey-frame');

// Function 5: Straighten and bring hovered Polaroid frame to front
function highlightJourneyFrame(event) {
  const frame = event.currentTarget;
  frame.style.transform = 'rotate(0deg) scale(1.04)';
  frame.style.zIndex = '10';
  frame.style.transition = 'transform 0.25s ease';
}

// Function 6: Restore default Polaroid tilt on mouse leave
function resetJourneyFrame(event) {
  const frame = event.currentTarget;
  frame.style.transform = '';
  frame.style.zIndex = '';
}

// Event Types 2 & 3: Mouseover straightens and lifts a frame; mouseout restores it
journeyFrames.forEach((frame) => {
  frame.addEventListener('mouseover', highlightJourneyFrame);
  frame.addEventListener('mouseout', resetJourneyFrame);
});

/* ===========================
   ABOUT US: CONTACT FORM
   =========================== */

const contactForm = document.querySelector('.contact-form');
const emailInput = document.getElementById('email');

if (contactForm && emailInput) {
  // Create the visible success message shown only after valid form submission
  const formFeedback = document.createElement('p');
  formFeedback.style.marginTop = '16px';
  formFeedback.style.fontWeight = '700';
  formFeedback.style.textAlign = 'center';
  contactForm.appendChild(formFeedback);

  // Function 7: Validate email format when user changes the field
  function validateEmailField() {
    const value = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!value) {
      emailInput.setCustomValidity('');
      return;
    }

    if (isValid) {
      emailInput.setCustomValidity('');
    } else {
      emailInput.setCustomValidity('Please enter a valid email address.');
    }
  }

  // Function 8: Display visible confirmation message on form submit
  function handleContactSubmit(event) {
    event.preventDefault();

    // Collect contact fields so invalid values can be reported before submission
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const subjectInput = document.getElementById('subject');
    const commentsInput = document.getElementById('comments');
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const subject = subjectInput.value.trim();
    const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,49}$/;

    let invalidField = null;

    // Validate first name and focus the field when its value is invalid
    if (!namePattern.test(firstName)) {
      firstNameInput.setCustomValidity('Please enter a valid first name with at least 2 letters.');
      invalidField = firstNameInput;
    } else {
      firstNameInput.setCustomValidity('');
    }

    // Validate last name and focus the field when its value is invalid
    if (!namePattern.test(lastName)) {
      lastNameInput.setCustomValidity('Please enter a valid last name with at least 2 letters.');
      if (!invalidField) invalidField = lastNameInput;
    } else {
      lastNameInput.setCustomValidity('');
    }

    // Re-run email validation so submission cannot bypass the change event
    validateEmailField();
    if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      emailInput.setCustomValidity('Please enter a valid email address.');
      if (!invalidField) invalidField = emailInput;
    } else {
      emailInput.setCustomValidity('');
    }

    // Subject and questions must contain a selected package and actual text
    if (!subject) {
      subjectInput.setCustomValidity('Please select a package.');
      if (!invalidField) invalidField = subjectInput;
    } else {
      subjectInput.setCustomValidity('');
    }

    if (!commentsInput.value.trim()) {
      commentsInput.setCustomValidity('Please enter your question.');
      if (!invalidField) invalidField = commentsInput;
    } else {
      commentsInput.setCustomValidity('');
    }

    // Stop submission and show the browser validation message for the first invalid field
    if (invalidField || !contactForm.checkValidity()) {
      if (invalidField) invalidField.reportValidity();
      else contactForm.reportValidity();
      return;
    }

    formFeedback.textContent = `Thank you, ${firstName}! Your message regarding "${subject}" has been sent to Teyvat Go.`;
    formFeedback.style.color = '#053264';

    contactForm.reset();
    emailInput.style.borderColor = '';
  }

  // Event Type 4: A change to the email field runs format validation
  emailInput.addEventListener('change', validateEmailField);
  // Event Type 5: Submission prevents navigation and displays a confirmation
  contactForm.addEventListener('submit', handleContactSubmit);
}