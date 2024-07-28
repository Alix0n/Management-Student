document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn-primary').addEventListener('click', deleteSale);
});

async function deleteSale() {
    let codSale = document.getElementById('input-code').value.trim();
    let urlCheck = `http://localhost:8080/Ceramic/rest/ManagementSale/getSalesByCode?codSale=${encodeURIComponent(codSale)}`;
    let urlDelete = `http://localhost:8080/Ceramic/rest/ManagementSale/deleteSale?codSale=${encodeURIComponent(codSale)}`;

    try {
        // Verifica si la venta existe
        let checkResponse = await fetch(urlCheck, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (checkResponse.status === 200) {
            // La venta existe, procedemos a eliminarla
            let deleteResponse = await fetch(urlDelete, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (deleteResponse.status === 200) {
                alert("Se eliminó la venta.");
                window.location.href = "./sales.html";
            } else if (deleteResponse.status === 204) {
                // La venta no se encontró durante la eliminación
                alert('No se encontró una venta con este código para eliminar.');
            } else {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + deleteResponse.statusText);
            }
        } else if (checkResponse.status === 204) {
            // La venta no existe
            alert('No se encontró una venta con este código.');
        } else {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + checkResponse.statusText);
        }
    } catch (error) {
        console.error('Ocurrió el siguiente error: ', error);
        alert('Hubo un problema al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
}
