document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('button-update');

    updateButton.addEventListener('click', function(event) {
        event.preventDefault();

        const code = document.getElementById('input-code').value;
        const material = document.getElementById('input-material').value;
        const color = document.getElementById('input-color').value;
        const form = document.getElementById('input-form').value;
        const acabado = document.getElementById('input-acabado').value;
        const price = document.getElementById('input-price').value;
        const stock = document.getElementById('input-stock').value;

        if (!code || !material || !color || !form || !acabado || !price || !stock) {
            alert('Por favor complete todos los campos.');
            return;
        }

       // Validar que price y stock sean valores numéricos
       if (isNaN(price) || isNaN(stock) || price.trim() === "" || stock.trim() === "") {
        alert("Debe ingresar valores correctos para el precio y el stock.");
        return;
        }

        const ceramic = {
        code: code,
        material: material,
        color: color,
        form: form,
        acabado: acabado,
        price: parseFloat(price),
        stock: parseInt(stock)
    };

        fetch('http://localhost:8080/Ceramic/rest/ManagementCeramic/updateCeramic', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ceramic)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Cerámica actualizada con éxito');
            window.location.href = './dashboard.html';  // Redirigir a la página principal u otra página relevante
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
    });
});