import { formatDate } from "./formatDate.js";
import { modifEvent } from "./patch_event.js";
// Fetches all existing events.
export const getEvents = async () => {
  const endpoint = "http://localhost:3000/api/events/";
  const response = await fetch(endpoint);
  const result = await response.json();

  // display the events to the page
  displayEvents(result);
};

const toggleAttendance = (event, destination) => {
  const attendanceTable = document.createElement("div");
  attendanceTable.classList.add("attendance-table");
  // Creates dates entries
  for (let eventDate of event.dates) {
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.innerHTML = `${eventDate.date}`;
    attendanceTable.appendChild(dateDiv);
    const attendees = document.createElement("div");
    attendees.classList.add("attendees");
    for (let attendant of eventDate.attendees) {
      if (attendant.available === null) {
        continue;
      } else {
        attendees.innerHTML += `<div class="attendee">
        ${attendant.name}
        </div>`;
      }
      dateDiv.appendChild(attendees);
    }
  }
  destination.appendChild(attendanceTable);
};

const displayEvents = (events) => {
  const container = document.querySelector(".events-container");
  container.innerHTML = "";
  for (let event of events) {
    console.log(event);
    const card = document.createElement("div");
    card.classList.add("card");
    const createdDate = formatDate(event.created_at);
    card.innerHTML = `
        <div class="controls"><h3>${event.name}</h3><img src="assets/edit.svg" id="edit_${event.id}" class="edit-button" alt="edit event"></div>
        
        <div class="event-info">
            <span class="author">created by ${event.author}</span><span class="creation-date"> on ${createdDate}</span>
        </div>
        <p class="description">${event.description}</p>
        <div class="expend" id="expend"><img src="assets/more.svg" alt="See attendance">See attendance</div>
    `;
    container.appendChild(card);
    toggleAttendance(event, card);

    const editButtons = document.querySelectorAll(".edit-button");
    for (let btn of editButtons) {
      btn.addEventListener("click", (e) => {
        modifEvent(e.target.id.split("_")[1]);
      });
    }
  }
};
