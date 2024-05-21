import { formatDate } from "./formatDate.js";

export const getEvents = async () => {
  const endpoint = "http://localhost:3000/api/events/";
  const response = await fetch(endpoint);
  const result = await response.json();

  displayEvents(result);
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
        <h3>${event.name}</h3>
        <button id="edit_${event.id}" class="edit-button">Edit</button>
        <div class="event-info">
            <span class="author">by ${event.author}</span><span class="creation-date"> on ${createdDate}</span>
        </div>
        <p class="description">${event.description}</p>
    `;
    const datesDiv = document.createElement("div");
    for (let eventDate of event.dates) {
      datesDiv.innerHTML += `
        <div class="date">
        ${eventDate.date}
        </div>`;
    }
    card.appendChild(datesDiv);
    container.appendChild(card);
  }
  const editButtons = document.querySelectorAll(".edit-button");
};
