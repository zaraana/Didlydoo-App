export function modifEvent(id){
    
    const modifName = document.getElementById('modif_name');
    const modifAuthor = document.getElementById('modif_author');
    const modifDescription =document.getElementById('modif_description');
    const submitModif = document.getElementById('updateButton');

    submitModif.addEventListener('click',event=>{

        const updates = {
            name: modifName,
            author: modifAuthor,
            description: modifDescription
          };
        
          updateEvent(id, updates)
            .then(updatedEvent => {
              console.log(updatedEvent);
              alert('Event updated successfully!');
            })
            .catch(error => console.error(error));
        
        async function updateEvent(id, updates) {
          const response = await fetch(`http://localhost:3000/api/events/_${id}`, {
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

    })
    
}