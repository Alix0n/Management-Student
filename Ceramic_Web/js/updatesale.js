document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('button-update');

    updateButton.addEventListener('click', function(event) {
        event.preventDefault();

        const codSale = document.getElementById('input-code').value;
        const codCeramic = document.getElementById('input-codCeramic').value;
        const payment = document.getElementById('input-payment').value;
        const priceSale = document.getElementById('input-priceSale').value;
        const quantitySold = document.getElementById('input-quantitySold').value;

        if (!codSale || !codCeramic || !payment || !priceSale || !quantitySold ) {
            alert('Por favor complete todos los campos.');
            return;
        }

        const sale = {
            codSale: codSale,
            codCeramic: codCeramic,
            payment: payment,
            priceSale: priceSale,
            quantitySold: quantitySold
        };

        fetch('http://localhost:8080/Ceramic/rest/ManagementSale/updateSale', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sale)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Venta actualizada con éxito');
            window.location.href = './sales.html';  // Redirigir a la página principal u otra página relevante
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
    });
});
