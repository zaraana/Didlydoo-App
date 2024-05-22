export function affiche_dateListe(tab,div_container){
   
    div_container.innerHTML='';
    tab.forEach((element,index) => {

        const div = document.createElement('div');
            
        const p_date = document.createElement('p');
        p_date.textContent=element;

        const supp = document.createElement('button');
        supp.textContent='X';

        div.appendChild(p_date);
        div.appendChild(supp);

        supp.addEventListener('click', event => {

            tab.splice(index,1);
            affiche_dateListe(tab,div_container);

        });

        div_container.appendChild(div);

    });

}