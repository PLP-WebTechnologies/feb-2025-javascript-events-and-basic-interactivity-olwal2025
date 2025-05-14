// Event Handling for Navigation Tabs
document.getElementById("homeBtn").addEventListener("click", () => showSection("home"));
document.getElementById("galleryBtn").addEventListener("click", () => showSection("gallery"));
document.getElementById("contactBtn").addEventListener("click", () => showSection("contact"));

function showSection(id) {
  document.querySelectorAll("main section").forEach(section => {
    section.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

// Interactive: Change Button Color on Click
const buttons = document.querySelectorAll("nav button");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.style.backgroundColor = "");
    btn.style.backgroundColor = "#d2b48c";
  });
});

// Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = this.email.value;
  const password = this.password.value;

  if (!validateEmail(email)) {
    document.getElementById("formMessage").textContent = " Invalid email address.";
    return;
  }

  if (password.length < 8) {
    document.getElementById("formMessage").textContent = " Password must be at least 8 characters.";
    return;
  }

  document.getElementById("formMessage").textContent = " Message sent successfully!";
  this.reset();
});

function validateEmail(email) {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(email);
}

// Keypress Detection
document.addEventListener("keypress", (e) => {
  console.log("Key pressed:", e.key);
});

// Double Click on Header to Change Background
document.querySelector("header").addEventListener("dblclick", () => {
  document.body.style.backgroundColor = "#fff0e6";
});

// --- Form Validation ---
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const nameInput = contactForm.elements['name'];
const emailInput = contactForm.elements['email'];
const passwordInput = contactForm.elements['password'];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showValidation(input, isValid, message) {
  input.style.borderColor = isValid ? 'green' : 'red';
  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains('feedback')) {
    feedback = document.createElement('span');
    feedback.className = 'feedback';
    input.parentNode.insertBefore(feedback, input.nextSibling);
  }
  feedback.textContent = isValid ? '' : message;
  feedback.style.color = 'red';
}

nameInput.addEventListener('input', () => {
  showValidation(nameInput, nameInput.value.trim() !== '', 'Name is required.');
});

emailInput.addEventListener('input', () => {
  showValidation(emailInput, validateEmail(emailInput.value), 'Enter a valid email.');
});

passwordInput.addEventListener('input', () => {
  showValidation(passwordInput, passwordInput.value.length >= 8, 'Password must be at least 8 characters.');
});

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;
  if (nameInput.value.trim() === '') {
    showValidation(nameInput, false, 'Name is required.');
    valid = false;
  }
  if (!validateEmail(emailInput.value)) {
    showValidation(emailInput, false, 'Enter a valid email.');
    valid = false;
  }
  if (passwordInput.value.length < 8) {
    showValidation(passwordInput, false, 'Password must be at least 8 characters.');
    valid = false;
  }
  if (valid) {
    formMessage.textContent = 'Message sent!';
    formMessage.style.color = 'green';
    contactForm.reset();
    document.querySelectorAll('.feedback').forEach(fb => fb.textContent = '');
    [nameInput, emailInput, passwordInput].forEach(input => input.style.borderColor = '');
  } else {
    formMessage.textContent = 'Please fix errors above.';
    formMessage.style.color = 'red';
  }
});

// --- Gallery Slideshow ---
const gallerySection = document.getElementById('gallery');
const galleryDiv = gallerySection.querySelector('.gallery');
const imageUrls = [
  "https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg",
  "https://images.pexels.com/photos/1366913/pexels-photo-1366913.jpeg",
  "https://images.pexels.com/photos/1493219/pexels-photo-1493219.jpeg",
  "https://images.pexels.com/photos/60112/pexels-photo-60112.jpeg",
  "https://images.pexels.com/photos/1203309/pexels-photo-1203309.jpeg",
  "https://images.pexels.com/photos/159023/horses-meadow-animals-pasture-159023.jpeg",
  "https://images.pexels.com/photos/1547710/pexels-photo-1547710.jpeg"
];
let currentIndex = 0;

function showSlide(index) {
  galleryDiv.innerHTML = `
    <button id="prevSlide">&#8592;</button>
    <img src="${imageUrls[index]}" alt="Horse ${index + 1}" class="slideshow-img" />
    <button id="nextSlide">&#8594;</button>
  `;
  document.getElementById('prevSlide').onclick = () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    showSlide(currentIndex);
  };
  document.getElementById('nextSlide').onclick = () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    showSlide(currentIndex);
  };
}

// Only activate slideshow when gallery is shown
document.getElementById('galleryBtn').addEventListener('click', () => {
  showSlide(currentIndex);
});
