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
      image: 'images/package-mondstadt.webp',
      alt: 'View of Mondstadt City across Cider Lake',
      link: 'mondstadt.html'
    },
    {
      nation: 'liyue',
      heading: 'Liyue / LIYU-01',
      price: '14,800 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Liyue Harbor, Wangshu Inn, Jueyun Karst',
      image: 'images/package-liyue.webp',
      alt: 'Golden lanterns and cliffs of Liyue Harbor',
      link: '#liyue'
    },
    {
      nation: 'inazuma',
      heading: 'Inazuma / INAZ-01',
      price: '16,500 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Inazuma City, Grand Narukami Shrine, Chinju Forest',
      image: 'images/package-inazuma.webp',
      alt: 'Sacred Sakura and purple torii gates in Inazuma',
      link: '#inazuma'
    },
    {
      nation: 'sumeru',
      heading: 'Sumeru / SUME-01',
      price: '15,900 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Sumeru City, Gandharva Ville, Port Ormos',
      image: 'images/package-sumeru.webp',
      alt: 'Giant treehouse architecture of Sumeru City',
      link: '#sumeru'
    },
    {
      nation: 'fontaine',
      heading: 'Fontaine / FONT-01',
      price: '20,000 PHP per person',
      duration: '5 days / 4 nights',
      stops: 'Court of Fontaine, Opera Epiclese, Lucine Fountain',
      image: 'images/package-fontaine.webp',
      alt: 'Elegant waterways and architecture of Fontaine',
      link: '#fontaine'
    },
    {
      nation: 'natlan',
      heading: 'Natlan / NATL-01',
      price: '17,200 PHP per person',
      duration: '4 days / 3 nights',
      stops: 'Stadium of the Sacred Flame, People of the Springs',
      image: 'images/package-natlan.webp',
      alt: 'Vibrant canyons and hot springs of Natlan',
      link: '#natlan'
    },
    {
      nation: 'snezhnaya',
      heading: 'Snezhnaya / SNEZ-01',
      price: '19,500 PHP per person',
      duration: '5 days / 4 nights',
      stops: 'Zapolyarny Palace, Frostwinter Harbor, Pine Ridge',
      image: 'images/package-snezhnaya.webp',
      alt: 'Snow-covered palaces and northern lights of Snezhnaya',
      link: '#snezhnaya'
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

  // Event Type 1: click
  prevBtn.addEventListener('click', showPrevTrip);
  nextBtn.addEventListener('click', showNextTrip);

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      renderTrip(Number(dot.dataset.index));
    });
  });

  filterPills.forEach((pill) => {
    pill.addEventListener('click', filterTripsByNation);
  });
}

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

// Event Types 2 & 3: mouseover and mouseout
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
  // Create visible status elements below email input and form
  const emailStatus = document.createElement('small');
  emailStatus.style.display = 'block';
  emailStatus.style.marginTop = '6px';
  emailStatus.style.fontWeight = '600';
  emailInput.insertAdjacentElement('afterend', emailStatus);

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
      emailStatus.textContent = '';
      emailInput.style.borderColor = '';
      return;
    }

    if (isValid) {
      emailStatus.textContent = 'Valid email address';
      emailStatus.style.color = '#1b7a3d';
      emailInput.style.borderColor = '#1b7a3d';
    } else {
      emailStatus.textContent = 'Please enter a valid email (e.g., traveler@gmail.com)';
      emailStatus.style.color = '#b42318';
      emailInput.style.borderColor = '#b42318';
    }
  }

  // Function 8: Display visible confirmation message on form submit
  function handleContactSubmit(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();
    const subject = document.getElementById('subject').value.trim();

    formFeedback.textContent = `Thank you, ${firstName}! Your message regarding "${subject}" has been sent to Teyvat Go.`;
    formFeedback.style.color = '#053264';

    contactForm.reset();
    emailStatus.textContent = '';
    emailInput.style.borderColor = '';
  }

  // Event Types 4 & 5: change and submit
  emailInput.addEventListener('change', validateEmailField);
  contactForm.addEventListener('submit', handleContactSubmit);
}