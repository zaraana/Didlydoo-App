import { modifEvent } from "./patch_event.js";
import { affiche_dateListe } from "./afficheModalDateList.js";

export function modifModal(id, prefill) {
  const modifName = document.getElementById("modif_name");
  const modifAuthor = document.getElementById("modif_author");
  const modifDescription = document.getElementById("modif_description");
  const add_dateButton = document.getElementById("add_dateButton");
  const add_datesInput = document.getElementById("add_newDate");
  const div_addedDate = document.getElementById("dates_added");
  const fond_modal = document.querySelector("#fond-modal");

  const modal = document.getElementById("modifyEvent");
  if (modal.style.display === "" || modal.style.display === "none") {
    modal.style.display = "flex";
    fond_modal.classList.add("modal-container");
  } else {
    modal.style.display = "none";
    fond_modal.classList.remove("modal-container");
  }

  fond_modal.addEventListener("click", (e) => {
    if (e.target === fond_modal) {
      fond_modal.classList.remove("modal-container");
      modal.style.display = "none";
    }
  });

  // prefill stuff
  modifName.value = prefill[0].name;
  modifAuthor.value = prefill[0].author;
  modifDescription.value = prefill[0].description;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  add_datesInput.setAttribute("min", formattedDate);

  let tab_newDate = [];

  add_dateButton.addEventListener("click", (event) => {
    if (add_datesInput !== "") {
      tab_newDate.push(add_datesInput.value);

      affiche_dateListe(tab_newDate, div_addedDate);

      add_datesInput.value = "";
    }
  });

  modifEvent(id, tab_newDate);
}
