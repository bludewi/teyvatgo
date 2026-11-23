/* ===========================
   SHARED VALIDATION HELPERS
   =========================== */

// Function 1: Validate that a person's name contains at least 2 letters and no numbers/symbols
function isValidPersonName(name) {
  return /^[A-Za-zÀ-ÿ\s'-]{2,}$/.test(name.trim());
}

// Function 2: Validate standard email format (example@gmail.com)
function isValidEmailFormat(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Function 3: Validate Philippine mobile number format (10 or 11 digits starting with 09)
function isValidPhoneNumber(phone) {
  return /^09\d{8,9}$/.test(phone.trim());
}

// Function 4: Check that a YYYY-MM-DD date string is today or a future date
function isTodayOrFutureDate(dateString) {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateString.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day);
  return selectedDate >= today;
}

// Function 5: Apply error or valid border styling and error message to a form field
function setFieldValidationState(inputEl, errorEl, errorMessage) {
  if (!inputEl || !errorEl) return;

  if (errorMessage) {
    errorEl.textContent = errorMessage;
    inputEl.classList.add('input-invalid');
    inputEl.classList.remove('input-valid');
  } else {
    errorEl.textContent = '';
    inputEl.classList.remove('input-invalid');
    inputEl.classList.add('input-valid');
  }
}

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
      link: 'mondstadt.php'
    },
    {
      nation: 'liyue',
      heading: 'Liyue / LIYUE-02',
      price: '15,000 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Liyue Harbor, Mt. Aocang, Wangshu Inn',
      image: 'images/liyue-hero.jpg',
      alt: 'Golden lanterns and cliffs of Liyue Harbor',
      link: 'liyue.php'
    },
    {
      nation: 'inazuma',
      heading: 'Inazuma / INAZ-03',
      price: '18,000 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Nakurami Grand Shrine, Ritou Trading Port, Tenshukaku',
      image: 'images/hero-inazuma.webp',
      alt: 'Sacred Sakura and purple torii gates in Inazuma',
      link: 'inazuma.php'
    },
    {
      nation: 'sumeru',
      heading: 'Sumeru / SUME-04',
      price: '14,000 PHP per person',
      duration: '3 days / 3 nights',
      stops: 'Sumeru City Academy, Gandharva Village, Caravan Ribat',
      image: 'images/hero-sumeru.webp',
      alt: 'Giant treehouse architecture of Sumeru City',
      link: 'sumeru.php'
    },
    {
      nation: 'fontaine',
      heading: 'Fontaine / FONT-05',
      price: '20,000 PHP per person',
      duration: '5 days / 4 nights',
      stops: 'Court of Fontaine, Opera Epiclese, Lucine Fountain',
      image: 'images/hero-fontaine.webp',
      alt: 'Elegant waterways and architecture of Fontaine',
      link: 'fontaine.php'
    },
    {
      nation: 'natlan',
      heading: 'Natlan / NATL-06',
      price: '16,500 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Tepecac Stadium, Children of the Echoes Canyon, People of the Springs',
      image: 'images/hero-natlan.webp',
      alt: 'Vibrant canyons and hot springs of Natlan',
      link: 'natlan.php'
    },
    {
      nation: 'snezhnaya',
      heading: 'Snezhnaya / SNEZ-07',
      price: '22,000 PHP per person',
      duration: '5 days / 4 nights',
      stops: 'Zapolyarny Palace Outskirts, Frost-bound Valleys, Glacial Outposts',
      image: 'images/hero-snezhnaya.png',
      alt: 'Snow-covered palaces and northern lights of Snezhnaya',
      link: 'snezhnaya.php'
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

  // Function 6: Update the visible package card content and active pagination dot
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

    // Function 7: Highlight the pagination dot matching the active trip index
    dots.forEach(function updateDotState(dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // Function 8: Move to the previous package in the carousel
  function showPrevTrip() {
    renderTrip(currentIndex - 1);
  }

  // Function 9: Move to the next package in the carousel
  function showNextTrip() {
    renderTrip(currentIndex + 1);
  }

  // Function 10: Navigate directly to the slide corresponding to a clicked pagination dot
  function handleDotClick(event) {
    const targetIndex = Number(event.currentTarget.dataset.index);
    renderTrip(targetIndex);
  }

  // Function 11: Filter packages when a nation pill button is clicked
  function filterTripsByNation(event) {
    const clickedPill = event.currentTarget;

    // Function 12: Remove active highlight from all nation filter pills
    filterPills.forEach(function clearPillActive(btn) {
      btn.classList.remove('active');
    });
    clickedPill.classList.add('active');

    const nation = clickedPill.dataset.filter;
    if (nation === 'all') {
      renderTrip(0);
      return;
    }

    // Function 13: Locate the trip object matching the selected nation filter
    const matchedIndex = trips.findIndex(function matchNation(t) {
      return t.nation === nation;
    });

    if (matchedIndex !== -1) {
      renderTrip(matchedIndex);
    }
  }

  prevBtn.addEventListener('click', showPrevTrip);
  nextBtn.addEventListener('click', showNextTrip);

  // Function 14: Attach click listener to each pagination dot
  dots.forEach(function bindDotListener(dot) {
    dot.addEventListener('click', handleDotClick);
  });

  // Function 15: Attach click listener to each nation filter pill
  filterPills.forEach(function bindPillListener(pill) {
    pill.addEventListener('click', filterTripsByNation);
  });
}

/* ===========================
   ABOUT US: POLAROID HOVER
   =========================== */

const journeyFrames = document.querySelectorAll('.journey-frame');

// Function 16: Straighten and bring hovered Polaroid frame to the foreground
function highlightJourneyFrame(event) {
  const frame = event.currentTarget;
  frame.style.transform = 'rotate(0deg) scale(1.04)';
  frame.style.zIndex = '10';
  frame.style.transition = 'transform 0.25s ease';
}

// Function 17: Restore default Polaroid tilt when the cursor leaves
function resetJourneyFrame(event) {
  const frame = event.currentTarget;
  frame.style.transform = '';
  frame.style.zIndex = '';
}

// Function 18: Bind mouseover and mouseout events to each Polaroid frame
journeyFrames.forEach(function bindFrameHover(frame) {
  frame.addEventListener('mouseover', highlightJourneyFrame);
  frame.addEventListener('mouseout', resetJourneyFrame);
});

/* ===========================
   ABOUT US: INQUIRY FORM
   =========================== */

const contactForm = document.querySelector('.contact-form');
const inquirySuccessModal = document.querySelector('.inquiry-success-modal');

if (inquirySuccessModal) {
  const closeInquirySuccess = inquirySuccessModal.querySelector('.inquiry-success-close');

  function dismissInquirySuccess() {
    inquirySuccessModal.hidden = true;
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  closeInquirySuccess.addEventListener('click', dismissInquirySuccess);
  closeInquirySuccess.focus();
  document.addEventListener('keydown', function handleInquirySuccessEscape(event) {
    if (event.key === 'Escape') {
      dismissInquirySuccess();
    }
  });
}

if (contactForm) {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const commentsInput = document.getElementById('comments');

  // Function 19: Create and insert an error message element below an inquiry input
  function attachErrorElement(inputEl) {
    const err = document.createElement('small');
    err.className = 'field-error';
    inputEl.insertAdjacentElement('afterend', err);
    return err;
  }

  const firstNameError = attachErrorElement(firstNameInput);
  const lastNameError = attachErrorElement(lastNameInput);
  const emailError = attachErrorElement(emailInput);
  const subjectError = attachErrorElement(subjectInput);
  const commentsError = attachErrorElement(commentsInput);

  const formFeedback = document.createElement('p');
  formFeedback.style.marginTop = '16px';
  formFeedback.style.fontWeight = '700';
  formFeedback.style.textAlign = 'center';
  formFeedback.style.color = '#c7f8b6';
  contactForm.appendChild(formFeedback);

  // Function 20: Validate all inquiry form fields and return true only when all pass
  function validateInquiryForm() {
    let isFormValid = true;

    if (!isValidPersonName(firstNameInput.value)) {
      setFieldValidationState(firstNameInput, firstNameError, 'Enter a valid first name (letters only, min. 2 characters).');
      isFormValid = false;
    } else {
      setFieldValidationState(firstNameInput, firstNameError, '');
    }

    if (!isValidPersonName(lastNameInput.value)) {
      setFieldValidationState(lastNameInput, lastNameError, 'Enter a valid last name (letters only, min. 2 characters).');
      isFormValid = false;
    } else {
      setFieldValidationState(lastNameInput, lastNameError, '');
    }

    if (!isValidEmailFormat(emailInput.value)) {
      setFieldValidationState(emailInput, emailError, 'Please enter a valid email (e.g., example@gmail.com).');
      isFormValid = false;
    } else {
      setFieldValidationState(emailInput, emailError, '');
    }

    if (subjectInput.value.trim().length < 3) {
      setFieldValidationState(subjectInput, subjectError, 'Please enter a subject (at least 3 characters).');
      isFormValid = false;
    } else {
      setFieldValidationState(subjectInput, subjectError, '');
    }

    if (commentsInput.value.trim().length < 10) {
      setFieldValidationState(commentsInput, commentsError, 'Please enter at least 10 characters for your question.');
      isFormValid = false;
    } else {
      setFieldValidationState(commentsInput, commentsError, '');
    }

    return isFormValid;
  }

  // Function 21: Block invalid inquiry submissions or allow valid data to submit to inquire.php
  function handleContactSubmit(event) {
    if (!validateInquiryForm()) {
      event.preventDefault();
      formFeedback.textContent = 'Please fix the highlighted errors above before submitting.';
      formFeedback.style.color = '#ffd4d4';
    }
  }

  emailInput.addEventListener('change', validateInquiryForm);
  contactForm.addEventListener('submit', handleContactSubmit);
}

/* ===========================
   DESTINATION: BOOKING MODAL
   =========================== */

const bookingModal = document.getElementById('booking-modal');
const reservationSuccessModal = document.querySelector('.reservation-success-modal');

if (reservationSuccessModal) {
  const closeReservationSuccess = reservationSuccessModal.querySelector('.reservation-success-close');

  function dismissReservationSuccess() {
    reservationSuccessModal.hidden = true;
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  closeReservationSuccess.addEventListener('click', dismissReservationSuccess);
  closeReservationSuccess.focus();
  document.addEventListener('keydown', function handleReservationSuccessEscape(event) {
    if (event.key === 'Escape') {
      dismissReservationSuccess();
    }
  });
}

if (bookingModal) {
  const openBookBtns = document.querySelectorAll('.btn-book');
  const cancelModalBtn = document.getElementById('cancel-booking-modal');
  const bookingForm = document.getElementById('booking-form');

  const bookFirstNameInput = document.getElementById('book-first-name');
  const bookLastNameInput = document.getElementById('book-last-name');
  const bookEmailInput = document.getElementById('book-email');
  const bookPhoneInput = document.getElementById('book-phone');
  const bookDateInput = document.getElementById('book-date');
  const bookTravelersInput = document.getElementById('book-travelers');
  const bookTermsCheckbox = document.getElementById('book-terms');

  const basePriceInput = document.getElementById('base-price');
  const priceFormulaDisplay = document.getElementById('book-price-formula');
  const totalPriceDisplay = document.getElementById('book-total-price');

  const bookFirstNameError = document.getElementById('book-first-name-error');
  const bookLastNameError = document.getElementById('book-last-name-error');
  const bookEmailError = document.getElementById('book-email-error');
  const bookPhoneError = document.getElementById('book-phone-error');
  const bookDateError = document.getElementById('book-date-error');
  const bookTravelersError = document.getElementById('book-travelers-error');
  const bookTermsError = document.getElementById('book-terms-error');

  // Function 22: Restrict the travel date input so past dates cannot be picked
  function setMinimumBookingDate() {
    const todayISO = new Date().toISOString().split('T')[0];
    bookDateInput.min = todayISO;
  }

  // Function 23: Update the price formula ("12,500 PHP x N") and Estimated Total dynamically
  function updateBookingTotalPrice() {
    const basePrice = Number(basePriceInput.value) || 12500;
    const count = Math.max(1, Number(bookTravelersInput.value) || 1);
    const total = basePrice * count;

    priceFormulaDisplay.textContent = `${basePrice.toLocaleString('en-PH')} PHP x ${count}`;
    totalPriceDisplay.textContent = `${total.toLocaleString('en-PH')} PHP`;
  }

  // Function 24: Block wheel or touch scrolling inside the modal from moving the background page
  function preventBackgroundScroll(event) {
    if (bookingModal.hidden) return;

    const scrollablePanel = bookingModal.querySelector('.booking-modal-right');
    const isInsideScrollablePanel = scrollablePanel && scrollablePanel.contains(event.target);

    if (!isInsideScrollablePanel) {
      event.preventDefault();
      return;
    }

    const deltaY = event.deltaY || 0;
    const atTop = scrollablePanel.scrollTop <= 0 && deltaY < 0;
    const atBottom =
      scrollablePanel.scrollTop + scrollablePanel.clientHeight >= scrollablePanel.scrollHeight - 1 &&
      deltaY > 0;

    if (scrollablePanel.scrollHeight <= scrollablePanel.clientHeight || atTop || atBottom) {
      event.preventDefault();
    }
  }

  // Function 25: Open the booking modal and lock background page scrolling
  function openBookingModal(event) {
    if (event) event.preventDefault();
    setMinimumBookingDate();
    updateBookingTotalPrice();
    bookingModal.hidden = false;
    bookingModal.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    bookFirstNameInput.focus();
  }

  // Function 26: Close the booking modal and restore background page scrolling
  function closeBookingModal() {
    bookingModal.hidden = true;
    bookingModal.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }

  // Function 27: Close modal if the user clicks outside the modal card
  function handleBackdropClick(event) {
    if (event.target === bookingModal) {
      closeBookingModal();
    }
  }

  // Function 28: Close modal when the Escape key is pressed
  function handleEscapeKey(event) {
    if (event.key === 'Escape' && !bookingModal.hidden) {
      closeBookingModal();
    }
  }

  // Function 29: Validate all booking modal fields before submitting to the database
  function validateBookingForm() {
    let isValid = true;

    if (!isValidPersonName(bookFirstNameInput.value)) {
      setFieldValidationState(bookFirstNameInput, bookFirstNameError, 'Enter a valid first name (letters only).');
      isValid = false;
    } else {
      setFieldValidationState(bookFirstNameInput, bookFirstNameError, '');
    }

    if (!isValidPersonName(bookLastNameInput.value)) {
      setFieldValidationState(bookLastNameInput, bookLastNameError, 'Enter a valid last name (letters only).');
      isValid = false;
    } else {
      setFieldValidationState(bookLastNameInput, bookLastNameError, '');
    }

    if (!isValidEmailFormat(bookEmailInput.value)) {
      setFieldValidationState(bookEmailInput, bookEmailError, 'Enter a valid email (e.g., example@gmail.com).');
      isValid = false;
    } else {
      setFieldValidationState(bookEmailInput, bookEmailError, '');
    }

    if (!isValidPhoneNumber(bookPhoneInput.value)) {
      setFieldValidationState(bookPhoneInput, bookPhoneError, 'Enter a valid mobile number (e.g., 0912345678).');
      isValid = false;
    } else {
      setFieldValidationState(bookPhoneInput, bookPhoneError, '');
    }

    if (!isTodayOrFutureDate(bookDateInput.value)) {
      setFieldValidationState(bookDateInput, bookDateError, 'Please choose today or a future date.');
      isValid = false;
    } else {
      setFieldValidationState(bookDateInput, bookDateError, '');
    }

    const travelersCount = Number(bookTravelersInput.value);
    if (!Number.isInteger(travelersCount) || travelersCount < 1 || travelersCount > 20) {
      setFieldValidationState(bookTravelersInput, bookTravelersError, 'Enter 1 to 20 travelers.');
      isValid = false;
    } else {
      setFieldValidationState(bookTravelersInput, bookTravelersError, '');
    }

    if (!bookTermsCheckbox.checked) {
      bookTermsError.textContent = 'You must agree to the booking terms and cancellation policy.';
      isValid = false;
    } else {
      bookTermsError.textContent = '';
    }

    return isValid;
  }

  // Function 30: Prevent form submission to book.php if validation fails
  function handleBookingSubmit(event) {
    if (!validateBookingForm()) {
      event.preventDefault();
      return;
    }

    if (!window.confirm('Are you sure you want to confirm this reservation?')) {
      event.preventDefault();
    }
  }

  // Function 31: Attach click listener to every Book Now button on the page
  openBookBtns.forEach(function bindBookButton(btn) {
    btn.addEventListener('click', openBookingModal);
  });

  cancelModalBtn.addEventListener('click', closeBookingModal);
  bookingModal.addEventListener('click', handleBackdropClick);
  bookingModal.addEventListener('wheel', preventBackgroundScroll, { passive: false });
  bookingModal.addEventListener('touchmove', preventBackgroundScroll, { passive: false });
  document.addEventListener('keydown', handleEscapeKey);
  bookTravelersInput.addEventListener('input', updateBookingTotalPrice);
  bookingForm.addEventListener('submit', handleBookingSubmit);

  // Automatically open modal if redirected from about.php via mondstadt.php#book
  if (window.location.hash === '#book') {
    openBookingModal();
  }
}