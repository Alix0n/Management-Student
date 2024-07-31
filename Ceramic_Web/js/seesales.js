document.addEventListener('DOMContentLoaded', function() {
    const queryForm = document.getElementById('querySaleForm');

    queryForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío tradicional del formulario
        const codSale = document.getElementById('query-code').value;
        fetchSaleByCode(codSale);
    });
});

function fetchSaleByCode(codSale) {
    const url = `http://localhost:8080/Ceramic/rest/ManagementSale/getSalesByCode?codSale=${codSale}`;
    
    fetch(url)
        .then(response => {
            if (response.status === 204) {
                // Si el usuario no se encuentra, muestra una alerta
                alert('Venta no encontrada');
                cleanContent();
                return;
            }
            return response.json();
        })
        .then(response => response.json())
        .then(data => {
            displaySale(data);
        })
        .catch(error => console.error('Error:', error));
}

function displaySale(sale) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = sale.codSale;

    const codCeramic = document.createElement('p');
    codCeramic.className = 'card-text';
    codCeramic.textContent = `Código de Cerámica: ${sale.codCeramic}`;

    const payment = document.createElement('p');
    payment.className = 'card-text';
    payment.textContent = `Método de Pago: ${sale.payment}`;

    const priceSale = document.createElement('p');
    priceSale.className = 'card-text';
    priceSale.textContent = `Precio: ${sale.priceSale}`;

    const quantitySold = document.createElement('p');
    quantitySold.className = 'card-text';
    quantitySold.textContent = `Cantidad: ${sale.quantitySold}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.setAttribute('data-code', sale.codSale);

    btnEliminar.addEventListener('click', function() {
        const codSale = this.getAttribute('data-code');
        deleteSaleById(codSale);
    });

    const btnActualizar = document.createElement('button');
    btnActualizar.className = 'btn-success margin';
    btnActualizar.textContent = 'Actualizar';

    btnActualizar.addEventListener('click', function() {
        localStorage.setItem("saleData", JSON.stringify(sale));
        window.location.href = "./updatesale.html";
    });

    cardBody.appendChild(title);
    cardBody.appendChild(codCeramic);
    cardBody.appendChild(payment);
    cardBody.appendChild(priceSale);
    cardBody.appendChild(quantitySold);
    cardBody.appendChild(btnEliminar);
    cardBody.appendChild(btnActualizar);

    card.appendChild(cardBody);
    resultContainer.appendChild(card);
}

function cleanContent() {
    const content = document.getElementById('result');
    content.innerHTML = "";
}

function deleteSaleById(codSale) {
    let url = `http://localhost:8080/Ceramic/rest/ManagementSale/deleteSale?codSale=${codSale}`;
    
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
    })
    .catch(error => {
        console.error('Ocurrió el siguiente error con la operación: ', error);
    });
}
