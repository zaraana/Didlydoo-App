export function modifEvent(id){

    const name = document.getElementById('name').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
  
    const updates = {
      name: name,
      author: author,
      description: description
    };
  
    updateEvent(id, updates)
      .then(updatedEvent => {
        console.log(updatedEvent);
        alert('Event updated successfully!');
      })
      .catch(error => console.error(error));
  
  async function updateEvent(id, updates) {
    const response = await fetch(`http://localhost:3000/api/events/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update the event');
    }
  
    return response.json();
    }
}