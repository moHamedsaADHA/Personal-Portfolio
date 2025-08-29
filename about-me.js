// Snow sparkle burst effect on click/touch
function createSnowBurst(x, y) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const snow = document.createElement('span');
    snow.className = 'snow-burst';
    const angle = (2 * Math.PI * i) / count;
    const radius = 32 + Math.random() * 16;
    snow.style.left = `${x + Math.cos(angle) * radius}px`;
    snow.style.top = `${y + Math.sin(angle) * radius}px`;
    snow.innerHTML = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#glow)"><path d="M9 2 L9 16 M2 9 L16 9 M4.5 4.5 L13.5 13.5 M13.5 4.5 L4.5 13.5" stroke="#eaf6fb" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="9" r="2.5" fill="#fff"/></g><defs><filter id="glow" x="-6" y="-6" width="30" height="30"><feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#eaf6fb"/></filter></defs></svg>`;
    document.body.appendChild(snow);
    setTimeout(() => {
      snow.style.opacity = '0';
      snow.style.transform = 'scale(1.4)';
    }, 10);
    setTimeout(() => snow.remove(), 1200);
  }
}

document.addEventListener('click', function(e) {
  createSnowBurst(e.clientX, e.clientY);
});
document.addEventListener('touchstart', function(e) {
  const t = e.touches[0];
  createSnowBurst(t.clientX, t.clientY);
});
const modeToggle = document.getElementById("modeToggle");
const body = document.body;
function setTheme(mode) {
  if (mode === "dark") {
    body.classList.add("dark-mode");
    modeToggle.textContent = "Light Mode";
    modeToggle.classList.add("active");
  } else {
    body.classList.remove("dark-mode");
    modeToggle.textContent = "Dark Mode";
    modeToggle.classList.remove("active");
  }
}

// Initialize theme from localStorage
setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");

// Toggle theme on button click
modeToggle.addEventListener("click", function () {
  const isDark = !body.classList.contains("dark-mode");
  setTheme(isDark ? "dark" : "light");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Highlight active navbar link on scroll with smooth transitions
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar .nav-link[href^='#'], .navbar .projects-link[href^='#'], .navbar .navbar-brand[href^='#']");

function setActiveLinkStyle(link, isDark) {
  if (isDark) {
    link.style = 'background: #37ff00 !important; color: #111 !important; border-radius: 10px !important; box-shadow: 0 0 12px 2px #37ff0044 !important; border: none !important; outline: none !important;';
  } else {
    link.style = 'background: linear-gradient(90deg, #eaf6fb 70%, #00eaff 100%) !important; color: #0077b5 !important; border-radius: 14px !important; box-shadow: 0 0 16px 2px #00eaff44, 0 0 32px 8px #eaf6fb88 !important; border: 2px solid #00eaff !important; font-weight: bold !important; outline: 2px solid #eaf6fb !important; transition: all 0.3s ease !important;';
  }
}

function updateActiveSection() {
  const scrollPosition = window.scrollY + 80; // Add navbar height offset

  // Reset all links
  navLinks.forEach(link => {
    link.classList.remove("active");
    link.style = document.body.classList.contains("dark-mode") ? 
      'color: #fff !important; background: transparent !important;' :
      'color: #222 !important; background: transparent !important;';
  });

  // Find current section
  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
      const currentId = section.getAttribute("id");
      const activeLink = document.querySelector(`.navbar a[href="#${currentId}"]`);
      
      if (activeLink) {
        activeLink.classList.add("active");
        setActiveLinkStyle(activeLink, document.body.classList.contains("dark-mode"));
      }
      break;
    }
  }
}

// Update active section on scroll
window.addEventListener("scroll", updateActiveSection);

// Initial update
document.addEventListener("DOMContentLoaded", updateActiveSection);

