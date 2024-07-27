function addSale() {
    // Obtén los valores de los campos de entrada
    let codSale = document.getElementById('input-cod').value;
    let codCeramic = document.getElementById('input-cod-ceramic').value;
    let payment = document.getElementById('input-payment').value;
    let priceSale = document.getElementById('input-priceSale').value;
    let quantitySold = document.getElementById('input-quantitySold').value;

    // Crea el objeto ceramicData con los valores de los campos de entrada
    let saleData = {
        codSale: codSale,
        codCeramic: codCeramic,
        payment: payment,
        priceSale: priceSale,
        quantitySold: quantitySold,
    };

    // Define la URL para la solicitud POST
    let url = 'http://localhost:8080/Ceramic/rest/ManagementSale/createSale';
    
    // Envía la solicitud POST al servidor con los datos de la cerámica
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
    })
    .then(response => {
        // Verifica si la respuesta del servidor es exitosa
        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Muestra un mensaje de confirmación al usuario
        alert("Se agregó el registro de la venta.");
        // Redirige al usuario al dashboard
        window.location.href = "./sales.html";
    })
    .catch(error => {
        // Muestra un mensaje de error en la consola
        console.error('Ocurrió el siguiente error: ', error);
    });
}

// Asocia la función 'addCeramic' al evento 'click' del botón
function createButton() {
    document.querySelector('.btn-primary').addEventListener('click', function(event) {
        // Llama a la función addCeramic cuando se hace clic en el botón
        addSale();
    });
}

// Llama a 'createButton' para configurar el evento cuando el DOM esté cargado
createButton();
