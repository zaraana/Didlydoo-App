const deleteEvent = async (eventId) => {
  const endpoint = `http://localhost:3000/api/events/${eventId}/`;
  const response = await fetch(endpoint, {
    method: "DELETE",
  });
};

export const toggleDeleteModal = (eventId) => {
  const body = document.querySelector("body");
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  const deleteModal = document.createElement("section");
  deleteModal.classList.add("delete-modal");
  deleteModal.innerHTML = `
  <div class="close-modal top"><img src="assets/images/close-button.svg" alt="Close Modal"></div>
  <p class="confirmation-text">Are you sure you want to delete this event?</p>
  <div class="delete-options">
    <input type="submit" name="yes" id="deleteConfirm" value="YES">
    <input type="submit" name="no" class="close-modal" value="NO">
  </div>
  `;
  body.appendChild(modalContainer);
  modalContainer.appendChild(deleteModal);
  const closeModalBtns = document.querySelectorAll(".close-modal");
  for (let closeModalBtn of closeModalBtns) {
    closeModalBtn.addEventListener("click", () => {
      modalContainer.remove();
    });
  }

  modalContainer.addEventListener("click", (e) => {
    if (e.target !== deleteModal) {
      modalContainer.remove();
    }
  });
  const deleteBtn = document.querySelector("#deleteConfirm");
  deleteBtn.addEventListener("click", () => {
    deleteEvent(eventId);
  });
};
