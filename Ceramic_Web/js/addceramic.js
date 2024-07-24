function addCeramic() {
    // Obtén los valores de los campos de entrada
    let code = document.getElementById('input-code').value;
    let material = document.getElementById('input-material').value;
    let color = document.getElementById('input-color').value;
    let form = document.getElementById('input-form').value;
    let acabado = document.getElementById('input-acabado').value;
    let price = document.getElementById('input-price').value;
    let stock = document.getElementById('input-stock').value;

    // Crea el objeto ceramicData con los valores de los campos de entrada
    let ceramicData = {
        code: code,
        material: material,
        color: color,
        form: form,
        acabado: acabado,
        price: price,
        stock: stock
    };

    // Define la URL para la solicitud POST
    let url = 'http://localhost:8080/Ceramic/rest/ManagementCeramic/createCeramic';
    
    // Envía la solicitud POST al servidor con los datos de la cerámica
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ceramicData)
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
        alert("Se agregó el registro de la cerámica.");
        // Redirige al usuario al dashboard
        window.location.href = "./dashboard.html";
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
        addCeramic();
    });
}

// Llama a 'createButton' para configurar el evento cuando el DOM esté cargado
createButton();
