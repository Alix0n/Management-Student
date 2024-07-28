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


function loadSales(){
    const content = document.getElementById('content');

const cardAdd = document.createElement('div');
cardAdd.className = 'card';

const cardBodyAdd = document.createElement('div');
cardBodyAdd.className = 'card-body';

const btnAdd = document.createElement('a');
btnAdd.className = 'btn btn-primary';
btnAdd.href = './addsale.html';

const imgAdd = document.createElement('img');
imgAdd.src = 'resource/icons/añadir.png';

const lblAdd = document.createElement('h3');
lblAdd.textContent = '¡Añade una venta!';

const cardBodyDelete = document.createElement('div');
cardBodyDelete.className = 'card-body';

const btnDelete = document.createElement('a');
btnDelete.className = 'btn btn-danger';
btnDelete.href = './deletesale.html';

const imgDelete = document.createElement('img');
imgDelete.src = 'resource/icons/eliminar.png';

const lblDelete = document.createElement('h3');
lblDelete.textContent = '¡Eliminar venta!';

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


    fetch('http://localhost:8080/Ceramic/rest/ManagementSale/getSales').then(response => response.json()).then((data)=> {
        const content = document.getElementById('content');
        data.forEach(sale=>{
            const card = document.createElement('div');
            card.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /*Seccioes para cada uno de los atributos */
            const codSale = document.createElement('h2');
            codSale.className = 'card-title';
            codSale.textContent = sale.codSale;

            const codCeramic = document.createElement('p');
            codCeramic.className = 'card-text';
            codCeramic.textContent = `Ceramica: ${sale.codCeramic}`;

            const payment = document.createElement('p');
            payment.className = 'card-text';
            payment.textContent = `Metodo de Pago: ${sale.payment}`;

            const priceSale = document.createElement('p');
            priceSale.className = 'card-text';
            priceSale.textContent = `Precio de venta: ${sale.priceSale}`;

            const quantitySold = document.createElement('p');
            quantitySold.className = 'card-text';
            quantitySold.textContent = `Cantidad: ${sale.quantitySold}`;

            /* Creación de botones de eliminar */
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn-danger';
            btnEliminar.id = `btn-delete-${sale.codSale}`;
            btnEliminar.textContent = `Eliminar`;
            btnEliminar.setAttribute('data-code-sale', sale.codSale);

            // Agregar event listener al botón
            btnEliminar.addEventListener('click', function() {
                const codSale = this.getAttribute('data-code-sale');
                deleteSaleById(codSale);
            });

            /* Creación del botón de actualizar */
            const btnActualizar = document.createElement('a');
            btnActualizar.className = 'btn-success margin';
            btnActualizar.id = `btn-update-${sale.codSale}`;
            btnActualizar.textContent = `Actualizar`;

            // Agregar event listener al botón
            btnActualizar.addEventListener('click', function() {
                localStorage.setItem("saleData", JSON.stringify(sale));
                window.location.href = "./updatesale.html";
            });

            /*Se agrega el componente al body   DE HIJOS A PADRES*/
            cardBody.appendChild(codSale);
            cardBody.appendChild(codCeramic);
            cardBody.appendChild(payment);
            cardBody.appendChild(priceSale);
            cardBody.appendChild(quantitySold); 

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

loadSales();

function cleanContent(){
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteSaleById(codSale){
    let url = 'http://localhost:8080/Ceramic/rest/ManagementSale/deleteSale?codSale='+codSale;
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
        loadSales();
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}