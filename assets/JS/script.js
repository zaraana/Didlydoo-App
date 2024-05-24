
import { getEvents } from "./components/displayEvents.js";
import { add_event } from "./components/add_event_modal.js";
import { initializeDarkMode } from './components/darkMode.js';


add_event();
getEvents();

document.addEventListener("DOMContentLoaded", initializeDarkMode);