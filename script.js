// 1. Dark / light mode (remembers your choice)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// 2. Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// 3. Typing effect in the hero
const roles = ["B.Tech CS Student", "C++ and Python Learner", "Video Editor and Animator", "Public Speaker"];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
if (reduceMotion) { typed.textContent = roles[0]; } else { type(); }

// 4. Highlight the current section in the menu
const sections = document.querySelectorAll("main section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  links.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// 5. Contact form validation
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");

function showError(id, message) {
  document.getElementById(id + "Error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", Boolean(message));
}

form.addEventListener("submit", event => {
  event.preventDefault();
  success.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name.length < 2) { showError("name", "Enter your name (at least 2 characters)."); valid = false; }
  else showError("name", "");

  if (!emailPattern.test(email)) { showError("email", "Enter a valid email, like name@example.com."); valid = false; }
  else showError("email", "");

  if (message.length < 10) { showError("message", "Write a message of at least 10 characters."); valid = false; }
  else showError("message", "");

  if (valid) {
    success.textContent = "Message sent. Thank you, " + name + "!";
    form.reset();
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
