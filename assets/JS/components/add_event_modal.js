import { postEvent } from "./post_event.js";
import { affiche_dateListe } from "./afficheModalDateList.js";

const event_modal = document.getElementById('addEvent_modal');
const addEvent_button = document.getElementById('add-event');
const input_name = document.getElementById('event_name');
const input_author = document.getElementById('author');
const input_date = document.getElementById('dates');
const button_AddDate = document.getElementById('add_date');
const input_description = document.getElementById('description');
const submit_addEvent = document.getElementById('submit_addEvent');
const date_list =document.getElementById('liste_date');
const fond_modal = document.querySelector('#fond-modal');

export function add_event(){

    addEvent_button.addEventListener('click',event=>{

        if (event_modal.style.display === 'none' || event_modal.style.display === '' ) {
            event_modal.style.display = "flex";
            fond_modal.classList.add('modal-container');
        }else{
            event_modal.style.display = "none";
            fond_modal.classList.remove('modal-container') ;
        }
    
    })  

    fond_modal.addEventListener("click", (e) => {
        if (e.target === fond_modal) {
            fond_modal.classList.remove('modal-container') ;
          event_modal.style.display ='none'
        }
      });

    let tab=[];
    button_AddDate.addEventListener('click',event=>{

        //ajoute la date au tab
        if(input_date.value !==''){

            tab.push(input_date.value);
            input_date.value='';

            //affiche la list des date avc une fct pour supp
            affiche_dateListe(tab,date_list);

        }
        input_date.value='';
    })

    submit_addEvent.addEventListener('click',event=>{
        postEvent(input_name.value,input_author.value,tab,input_description.value);

        input_name.innerHTML='';
        input_author.innerHTML='';
        tab=[];
        input_description.innerHTML='';

    })

}
