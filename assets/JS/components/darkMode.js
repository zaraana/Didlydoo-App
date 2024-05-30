// darkMode.js

// Utility functions to save and retrieve data from localStorage!!

export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get(key, defaultValue) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

export function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("modeIcon");

  const darkMode = get("darkMode", false);
  // console.log("Toggling dark mode. Current mode:", darkMode);

  if (darkMode) {
    body.classList.remove("darkMode");
    icon.src = "assets/images/moon.svg";
    // console.log("Switching to light mode. Icon set to moon.");
  } else {
    body.classList.add("darkMode");
    icon.src = "assets/images/sun.svg";
    // console.log("Switching to dark mode. Icon set to sun.");
  }

  set("darkMode", !darkMode);
}

export function initializeDarkMode() {
  const body = document.body;
  const icon = document.getElementById("modeIcon");
  const toggleButton = document.getElementById("toggleDarkMode");

  const darkMode = get("darkMode", false);
  // console.log("Initializing dark mode. Current mode:", darkMode);

  if (darkMode) {
    body.classList.add("darkMode");
    icon.src = "assets/images/sun.svg";
    // console.log("Dark mode is on. Icon set to sun.");
  } else {
    body.classList.remove("darkMode");
    icon.src = "assets/images/moon.svg";
    // console.log("Dark mode is off. Icon set to moon.");
  }

  toggleButton.addEventListener("click", toggleDarkMode);
}
