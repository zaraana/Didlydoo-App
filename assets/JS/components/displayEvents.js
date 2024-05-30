import { formatDate } from "./formatDate.js";
import { modifModal } from "./modifModal.js";
import { toggleDeleteModal } from "./deleteEvent.js";
import { toggleAttendanceModal } from "./attendantsManager.js";
// Fetches all existing events.
export const getEvents = async () => {
  const endpoint = "http://localhost:3000/api/events/";
  const response = await fetch(endpoint);
  const result = await response.json();

  // display the events to the page
  //  crea una funzione ke cn tab x vedere result
  displayEvents(result);
};

// x aggiungere presenze
const getAttendantsList = (dateList) => {
  // set x display nome persona + edit
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

const findPopularDates = (datesArr) => {
  // Stores the count of attendees for each event Date :
  let attendancePerDate = [];
  for (let date of datesArr) {
    let attendeesCount = 0;
    for (let attendant of date.attendees) {
      if (attendant.available) {
        attendeesCount++;
      }
    }
    attendancePerDate.push({ date: date.date, attendees: attendeesCount });
  }
  const maxAttendees = Math.max(
    ...attendancePerDate.map((event) => event.attendees)
  );
  const popularDates = attendancePerDate.filter(
    (event) => event.attendees === maxAttendees
  );
  return popularDates;
};

const displayEvents = (events) => {
  // console.log(events); x vedere cm a ripreso i dati
  const container = document.querySelector(".events-container");
  container.innerHTML = "";
  for (let event of events) {
    const popularDates = findPopularDates(event.dates);
    const card = document.createElement("div");
    card.classList.add("card");
    const createdDate = formatDate(event.created_at);
    card.innerHTML = `
        <div class="card-title">
        <h3>${event.name}</h3>
        <div class="controls">
        <img src="assets/images/edit.svg" title="Edit Event" id="edit_${event.id}" class="edit-button" alt="edit event">  
        <img src="assets/images/delete.svg" title="Delete Event" id="delete_${event.id}" class="delete-button" alt="delete event">
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
    attendeesDiv.innerHTML += `<div class="participant col-title">Participants</div>`;
    for (let participant of attendeesList) {
      attendeesDiv.innerHTML += `<div class="participant"><img src="assets/images/edit-attendance.svg" alt="Edit attendance" title="change attendance"  id="edit-attendance_${participant}_${event.id}" class="edit-participation">${participant}</div>`;
    }
    container.appendChild(card);
    const attendanceTable = document.querySelector(`#details_${event.id}`);
    attendanceTable.appendChild(attendeesDiv);
    // // Creates dates entries
    for (let eventDate of event.dates) {
      let formattedDate = formatDate(eventDate.date);
      let day;
      let month;
      let year;
      let dateElems = formattedDate.split(" ");
      day = dateElems[1];
      month = dateElems[2];
      year = dateElems[3];
      const dateDiv = document.createElement("div");
      // Checks if the date is one of those with most attendees to style accordingly
      let obj = popularDates.find((o) => o.date === eventDate.date);
      if (obj) {
        dateDiv.classList.add("popular");
      }

      dateDiv.classList.add("date-attendance");
      dateDiv.innerHTML = `<span class="date col-title"><span>${day}</span><span>${month}</span><span>${year}</span></span>`;
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
          <img src="assets/images/cross.svg" class="not-attending" alt="not attending">
          </div>`;
        } else {
          attendees.innerHTML += `<div class="attendance">
          <img src="assets/images/confirm.svg" class="attending" alt="attending">
          </div>`;
        }
        dateDiv.appendChild(attendees);
      }
    }
    const attendBtn = document.createElement("div");
    attendBtn.classList.add("sign-up");
    attendBtn.innerHTML = `<button class="attend-button" type="submit" id="sign-up_${event.id}">Attend</button>`;
    attendeesDiv.appendChild(attendBtn);
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
        // make sure that the object am gonna modify is the one am clicking on
      );
    });
  }
  const deleteButtons = document.querySelectorAll(".delete-button");
  for (let deleteBtn of deleteButtons) {
    deleteBtn.addEventListener("click", (e) => {
      toggleDeleteModal(e.target.id.split("_")[1]);
    });
  }
  const signUpBtns = document.querySelectorAll(".attend-button");
  for (let signUpBtn of signUpBtns) {
    signUpBtn.addEventListener("click", (e) => {
      toggleAttendanceModal(e.target.id.split("_")[1], "add");
    });
  }
  const editAttendanceBtns = document.querySelectorAll(".edit-participation");
  for (let editAttendance of editAttendanceBtns) {
    editAttendance.addEventListener("click", (e) => {
      toggleAttendanceModal(
        `${e.target.id.split("_")[1]}_${e.target.id.split("_")[2]}`,
        "edit"
      );
    });
  }
};
