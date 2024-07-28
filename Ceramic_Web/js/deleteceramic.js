document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn-primary').addEventListener('click', deleteCeramic);
});

async function deleteCeramic() {
    let code = document.getElementById('input-code').value.trim();
    let url = 'http://localhost:8080/Ceramic/rest/ManagementCeramic/deleteCeramic?code=' + encodeURIComponent(code);

    try {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica si la respuesta del servidor es exitosa
        if (response.status === 200) {
            // Muestra un mensaje de confirmación al usuario
            alert("Se eliminó la cerámica.");
            // Redirige al usuario al dashboard
            window.location.href = "./dashboard.html";
        } else if (response.status === 204) {
            // Si la respuesta es 404, significa que la cerámica no existe
            alert('No se encontró una cerámica con este código.');
        } else {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
    } catch (error) {
        // Muestra un mensaje de error en la consola
        console.error('Ocurrió el siguiente error: ', error);
        alert('Hubo un problema al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
}
