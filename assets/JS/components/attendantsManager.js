import { getEvent } from "./getEvent.js";

const postAttendant = async (eventId, body) => {
  const url = `http://localhost:3000/api/events/${eventId}/attend`;
  body = JSON.stringify(body);

  let options = {
    method: "POST",
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

export const toggleAttendanceModal = async (eventId) => {
  let eventDetails = await getEvent(eventId);
  eventDetails = eventDetails.dates;
  const body = document.querySelector("body");
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  const attendModal = document.createElement("section");
  attendModal.classList.add("delete-modal");
  attendModal.innerHTML = `
    <div class="close-modal top"><img src="assets/images/close-button.svg" alt="Close Modal"></div>
    <div class="name-input">
        <label for="name">Your name</label>
        <input name="name" type="text" maxlength="15" id="nameInput" placeholder="Name" required>
    </div>
    <div class="dates"></div>
    <button id="add-attendant" type="submit">Submit</button>
  `;
  body.appendChild(modalContainer);
  modalContainer.appendChild(attendModal);
  const datesDiv = document.querySelector(".dates");
  for (let session of eventDetails) {
    datesDiv.innerHTML += `
    ${session.date}
    <select name="session" id="${session.date}">
        <option value="Available">Available</option>
        <option value="Not Available">Not available</option>
    </select><br>`;
  }
  const closeModalBtns = document.querySelectorAll(".close-modal");
  for (let closeModalBtn of closeModalBtns) {
    closeModalBtn.addEventListener("click", () => {
      modalContainer.remove();
    });
  }
  const addAttendant = document.querySelector("#add-attendant");
  addAttendant.addEventListener("click", (e) => {
    const nameInput = document.querySelector("#nameInput");
    const attendantName = nameInput.value;
    if (!attendantName) {
      alert("please fill out your name.");
    } else {
      let selectedOptions = [];
      for (let session of eventDetails) {
        let date = session.date;
        let selectElement = document.getElementById(date);
        let attendanceValue = selectElement.value;
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
      postAttendant(eventId, params);
    }
  });

  // modalContainer.addEventListener("click", (e) => {
  //   if (e.target !== attendModal) {
  //     modalContainer.remove();
  //   }
  // });
};
