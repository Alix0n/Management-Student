document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(){
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
document.getElementById('button-ceramics').addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './dashboard.html'; 
});
document.getElementById('button-borrow').addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './sales.html'; 

});

document.getElementById('button-users').addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './users.html'; 

});

function loadCeramics(){
    const content = document.getElementById('content');

const cardAdd = document.createElement('div');
cardAdd.className = 'card';

const cardBodyAdd = document.createElement('div');
cardBodyAdd.className = 'card-body';

const btnAdd = document.createElement('a');
btnAdd.className = 'btn btn-primary';
btnAdd.href = './addceramic.html';

const imgAdd = document.createElement('img');
imgAdd.src = 'resource/icons/añadir.png';

const lblAdd = document.createElement('h3');
lblAdd.textContent = '¡Puedes agregar nuevas cerámicas!';

const cardBodyDelete = document.createElement('div');
cardBodyDelete.className = 'card-body';

const btnDelete = document.createElement('a');
btnDelete.className = 'btn btn-danger';
btnDelete.href = './deleteceramic.html';

const imgDelete = document.createElement('img');
imgDelete.src = 'resource/icons/eliminar.png';

const lblDelete = document.createElement('h3');
lblDelete.textContent = '¡Puedes eliminar cerámicas!';

/** Se agrega el ícono el botón */
btnAdd.appendChild(imgAdd);
btnDelete.appendChild(imgDelete);

/** Se agrega botón y título al cuerpo de la carta */
cardBodyAdd.appendChild(btnAdd);
cardBodyAdd.appendChild(lblAdd);

cardBodyDelete.appendChild(btnDelete);
cardBodyDelete.appendChild(lblDelete);

cardAdd.appendChild(cardBodyAdd);
cardAdd.appendChild(cardBodyDelete);

content.appendChild(cardAdd);


    fetch('http://localhost:8080/Ceramic/rest/ManagementCeramic/getCeramics').then(response => response.json()).then((data)=> {
        const content = document.getElementById('content');
        data.forEach(ceramic=>{
            const card = document.createElement('div');
            card.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /*Seccioes para cada uno de los atributos */
            const title = document.createElement('h2');
            title.className = 'card-title';
            title.textContent = ceramic.code;

            const material = document.createElement('p');
            material.className = 'card-text';
            material.textContent = `Material: ${ceramic.material}`;

            const color = document.createElement('p');
            color.className = 'card-text';
            color.textContent = `Color: ${ceramic.color}`;

            const form = document.createElement('p');
            form.className = 'card-text';
            form.textContent = `Forma: ${ceramic.form}`;

            const acabado = document.createElement('p');
            acabado.className = 'card-text';
            acabado.textContent = `Acabado: ${ceramic.acabado}`;

            const price = document.createElement('p');
            price.className = 'card-text';
            price.textContent = `Precio: ${ceramic.price}`;

            const stock = document.createElement('p');
            stock.className = 'card-text';
            stock.textContent = `Stock: ${ceramic.stock}`;

            /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${ceramic.code}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-code', ceramic.code);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const ceramicCode = this.getAttribute('data-code');
                deleteCeramicById(ceramicCode);
            });

            /* Creación del botón de actualizar */
            const btnActualizar = document.createElement('a');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-update-${ceramic.code}`;
            btnActualizar.textContent = `Actualizar`;

            // Agregar event listener al botón
            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("ceramicData", JSON.stringify(ceramic));
                window.location.href = "./updateceramic.html";
            });

            /*Se agrega el componente al body   DE HIJOS A PADRES*/
            cardBody.appendChild(title);
            cardBody.appendChild(material);
            cardBody.appendChild(color);
            cardBody.appendChild(form);
            cardBody.appendChild(acabado); 
            cardBody.appendChild(price);
            cardBody.appendChild(stock);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnEliminar);

            /* Agregamos el botón eliminar */
            cardBody.appendChild(btnActualizar);
            

            card.appendChild(cardBody);

            content.appendChild(card);

        })
    })
    .catch(error => consoler.error('Error: ', error));

}

loadCeramics();

function cleanContent(){
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteCeramicById(code){
    let url = 'http://localhost:8080/Ceramic/rest/ManagementCeramic/deleteCeramic?code='+code;
    fetch(url, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Se eliminó el registro");
        cleanContent();
        loadCeramics();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}