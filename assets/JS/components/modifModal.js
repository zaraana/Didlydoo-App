import { modifEvent } from "./patch_event.js";
export function modifModal(id,prefill){

    const modifName = document.getElementById('modif_name');
    const modifAuthor = document.getElementById('modif_author');
    const modifDescription =document.getElementById('modif_description');

    const modal=document.getElementById('modifyEvent');
    if(modal.style.display ==='' || modal.style.display === 'none'){
        modal.style.display='flex';
    }else{
        modal.style.display ='none'
    }

    console.log(prefill[0].name)
    modifName.value=prefill[0].name;
    modifAuthor.value=prefill[0].author;
    modifDescription.value=prefill[0].description;
    

    modifEvent(id);

}