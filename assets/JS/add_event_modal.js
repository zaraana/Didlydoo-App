const event_modal = document.getElementById('addEvent_modal');
const addEvent_button = document.getElementById('add-event');

export function add_event(){

    addEvent_button.addEventListener('click',event=>{

        if (event_modal.style.display === 'none' || event_modal.style.display === '' ) {
            event_modal.style.display = "flex";
        }else{
            event_modal.style.display = "none";
        }
    
    })

}
