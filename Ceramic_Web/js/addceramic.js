document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn-primary').addEventListener('click', addCeramic);
});

async function addCeramic() {
    // Obtén los valores de los campos de entrada
    let code = document.getElementById('input-code').value.trim();
    let material = document.getElementById('input-material').value.trim();
    let color = document.getElementById('input-color').value.trim();
    let form = document.getElementById('input-form').value.trim();
    let acabado = document.getElementById('input-acabado').value.trim();
    let price = document.getElementById('input-price').value.trim();
    let stock = document.getElementById('input-stock').value.trim();

    // Verifica que price y stock sean valores numéricos
    if (isNaN(price) || isNaN(stock) || price === "" || stock === "") {
        alert("Debe ingresar valores correctos para el precio y el stock.");
        return;
    }

    // Crea el objeto ceramicData con los valores de los campos de entrada
    let ceramicData = {
        code: code,
        material: material,
        color: color,
        form: form,
        acabado: acabado,
        price: parseFloat(price),
        stock: parseInt(stock)
    };

    try {
        let ceramicExists = await checkCeramicExists(code);
        if (ceramicExists) {
            alert('Una cerámica con este código ya existe.');
        } else {
            await createCeramic(ceramicData);
            alert("Se agregó el registro de la cerámica.");
            window.location.href = "./dashboard.html";
        }
    } catch (error) {
        console.error('Ocurrió el siguiente error: ', error);
        alert('Hubo un problema al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
}

async function checkCeramicExists(code) {
    try {
        let response = await fetch(`http://localhost:8080/Ceramic/rest/ManagementCeramic/getCeramicsByCode?code=${code}`);
        if (response.status === 200) {
            return true; // La cerámica existe
        } else if (response.status === 204) {
            return false; // La cerámica no existe
        } else {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error en la función checkCeramicExists: ', error);
        throw error;
    }
}

async function createCeramic(ceramicData) {
    try {
        let response = await fetch('http://localhost:8080/Ceramic/rest/ManagementCeramic/createCeramic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ceramicData)
        });

        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error en la función createCeramic: ', error);
        throw error;
    }
}
