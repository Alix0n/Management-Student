function deleteSale() {
    let code = document.getElementById('input-code').value;
    let url = 'http://localhost:8080/Ceramic/rest/ManagementSale/deleteSale?codSale=' + encodeURIComponent(codSale);

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
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
        alert("Se elimino la venta.");
        // Redirige al usuario al dashboard
        window.location.href = "./sales.html";
    })
    .catch(error => {
        // Muestra un mensaje de error en la consola
        console.error('Ocurrió el siguiente error: ', error);
    });
}

// Asocia la función 'deleteCeramic' al evento 'click' del botón
function createButton() {
    document.querySelector('.btn-primary').addEventListener('click', function(event) {
        deleteSale();
    });
}

document.addEventListener('DOMContentLoaded', createButton);
