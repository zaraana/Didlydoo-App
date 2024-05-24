import { getEvent } from "./getEvent.js";
import { formatDate } from "./formatDate.js";
import { sanitizeInput } from "./sanitizeInput.js";

const postAttendant = async (eventId, body, method) => {
  const url = `http://localhost:3000/api/events/${eventId}/attend`;
  body = JSON.stringify(body);

  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok " + response.statusText);
  }
  const result = await response.json();
};

export const toggleAttendanceModal = async (Id, action) => {
  let eventId = Id;
  let participantName;
  if (action === "edit") {
    [participantName, eventId] = eventId.split("_");
  }
  let eventDetails = await getEvent(eventId);
  eventDetails = eventDetails.dates;
  const body = document.querySelector("body");
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  const attendModal = document.createElement("section");
  attendModal.classList.add("delete-modal");
  attendModal.innerHTML = `
    <div class="top"><img class="close-modal" src="assets/images/close-button.svg" alt="Close Modal"></div>`;
  if (!participantName) {
    attendModal.innerHTML += `
    <div class="name-input">
        <label for="name">Your name</label>
        <input name="name" type="text" maxlength="15" id="nameInput" placeholder="Name" required>
    </div>
    `;
  } else {
    attendModal.innerHTML += `<div class="name-input">
    ${participantName}, when are you available?
    </div>`;
  }
  attendModal.innerHTML += ` <div class="dates"></div>
    <button id="add-attendant" type="submit">Submit</button>`;
  body.appendChild(modalContainer);
  modalContainer.appendChild(attendModal);
  const datesDiv = document.querySelector(".dates");
  for (let session of eventDetails) {
    datesDiv.innerHTML += `
    <span><span>${formatDate(session.date)}</span>
    <select name="session" id="${session.date}">
        <option value="Available">Available</option>
        <option value="Not Available">Not available</option>
    </select></span>`;
  }
  const closeModalBtns = document.querySelectorAll(".close-modal");
  for (let closeModalBtn of closeModalBtns) {
    closeModalBtn.addEventListener("click", () => {
      modalContainer.remove();
    });
  }
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.remove();
    }
  });
  const addAttendant = document.querySelector("#add-attendant");
  addAttendant.addEventListener("click", (e) => {
    const nameInput = document.querySelector("#nameInput");
    let attendantName;
    if (action === "edit") {
      attendantName = participantName;
    } else {
      attendantName = sanitizeInput(nameInput.value.trim());
    }
    if (!attendantName) {
      alert("please fill out your name.");
    } else {
      let selectedOptions = [];
      for (let session of eventDetails) {
        let date = session.date;
        let selectElement = document.getElementById(date);
        let attendanceValue = sanitizeInput(selectElement.value);
        if (attendanceValue === "Available") {
          attendanceValue = true;
        } else {
          attendanceValue = false;
        }
        selectedOptions.push({ date: date, available: attendanceValue });
      }
      console.log(selectedOptions);
      let params = {
        name: attendantName,
        dates: selectedOptions,
      };
      if (action === "edit") {
        postAttendant(eventId, params, "PATCH");
      } else {
        postAttendant(eventId, params, "POST");
      }
    }
  });
  // Buggy but is supposed to allow to close modal when clicking outside of it.
  // modalContainer.addEventListener("click", (e) => {
  //   if (e.target !== attendModal) {
  //     modalContainer.remove();
  //   }
  // });
};
