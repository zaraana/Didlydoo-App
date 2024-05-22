import { formatDate } from "./formatDate.js";
import { modifModal } from "./modifModal.js";
import { toggleDeleteModal } from "./deleteEvent.js";
// Fetches all existing events.
export const getEvents = async () => {
  const endpoint = "http://localhost:3000/api/events/";
  const response = await fetch(endpoint);
  const result = await response.json();

  // display the events to the page
  displayEvents(result);
};

const getAttendantsList = (dateList) => {
  let attendeesSet = new Set();
  for (let date of dateList) {
    date.attendees.forEach((attendee) => attendeesSet.add(attendee.name));
  }
  return [...attendeesSet];
};

const toggleDetails = (id) => {
  const div = document.querySelector(`#details_${id}`);
  const toggleDiv = document.querySelector(`#expend_${id}`);
  if (div.style.display === "none") {
    div.style.display = "flex";
    toggleDiv.innerHTML = `<img src="assets/images/less.svg" id="expend_${id}" alt="Hide details">Hide participants`;
  } else {
    div.style.display = "none";
    toggleDiv.innerHTML = `<img src="assets/images/more.svg" id="expend_${id}" alt="See details">View participants`;
  }
};

const displayEvents = (events) => {
  const container = document.querySelector(".events-container");
  container.innerHTML = "";
  for (let event of events) {
    const card = document.createElement("div");
    card.classList.add("card");
    const createdDate = formatDate(event.created_at);
    card.innerHTML = `
        <div class="card-title">
        <h3>${event.name}</h3>
        <div class="controls">
        <img src="assets/images/edit.svg" id="edit_${event.id}" class="edit-button" alt="edit event">  
        <img src="assets/images/delete.svg" id="delete_${event.id}" class="delete-button" alt="delete event">
        </div>
        </div>
        
        <div class="event-info">
            <span class="author">created by ${event.author}</span><span class="creation-date"> on ${createdDate}</span>
        </div>
        <p class="description">${event.description}</p>
        <div style="display: none;" class="attendance-table" id="details_${event.id}">
        </div>
        <div class="toggle-attendance" id="expend_${event.id}"><img id="expend_${event.id}" src="assets/images/more.svg" alt="View attendance">View participants</div>
    `;

    const attendeesList = getAttendantsList(event.dates);
    const attendeesDiv = document.createElement("div");
    attendeesDiv.classList.add("attendees-list");
    attendeesDiv.innerHTML += `<div class="participant">Participants</div>`;
    for (let participant of attendeesList) {
      attendeesDiv.innerHTML += `<div class="participant">${participant}</div>`;
    }
    container.appendChild(card);
    const attendanceTable = document.querySelector(`#details_${event.id}`);
    attendanceTable.appendChild(attendeesDiv);
    // // Creates dates entries
    for (let eventDate of event.dates) {
      const dateDiv = document.createElement("div");
      dateDiv.classList.add("date-attendance");
      dateDiv.innerHTML = `<span class="date">${eventDate.date}</span>`;
      attendanceTable.appendChild(dateDiv);
      const attendees = document.createElement("div");
      attendees.classList.add("attendees");
      for (let attendant of eventDate.attendees) {
        if (attendant.available === null) {
          attendees.innerHTML += `<div class="attendance">
          <img class="attendance" src="assets/images/question.svg" alt="no data">
          </div>`;
        } else if (!attendant.available) {
          attendees.innerHTML += `<div class="attendance">
          <img class="attendance" src="assets/images/cross.svg" alt="not attending">
          </div>`;
        } else {
          attendees.innerHTML += `<div class="attendance">
          <img class="attendance" src="assets/images/confirm.svg" alt="attending">
          </div>`;
        }
        dateDiv.appendChild(attendees);
      }
    }
  }
  const toggleButtons = document.querySelectorAll(".toggle-attendance");
  for (let toggleBtn of toggleButtons) {
    toggleBtn.addEventListener("click", (e) => {
      toggleDetails(e.target.id.split("_")[1]);
    });
  }
  const editButtons = document.querySelectorAll(".edit-button");
  for (let editBtn of editButtons) {
    editBtn.addEventListener("click", (e) => {
      modifModal(
        e.target.id.split("_")[1],
        events.filter((object) => object.id === e.target.id.split("_")[1])
      );
    });
  }
  const deleteButtons = document.querySelectorAll(".delete-button");
  for (let deleteBtn of deleteButtons) {
    deleteBtn.addEventListener("click", (e) => {
      toggleDeleteModal(e.target.id.split("_")[1]);
    });
  }
};
