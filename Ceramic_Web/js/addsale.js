document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn-primary').addEventListener('click', addSale);
});

async function addSale() {
    // Obtén los valores de los campos de entrada
    let codSale = document.getElementById('input-cod').value.trim();
    let codCeramic = document.getElementById('input-cod-ceramic').value.trim();
    let payment = document.getElementById('input-payment').value.trim();
    let priceSale = document.getElementById('input-priceSale').value.trim();
    let quantitySold = document.getElementById('input-quantitySold').value.trim();

    // Verifica que priceSale y quantitySold sean valores numéricos
    if (isNaN(priceSale) || isNaN(quantitySold) || priceSale === "" || quantitySold === "") {
        alert("Debe ingresar valores correctos para el precio de venta y la cantidad vendida.");
        return;
    }

    // Crea el objeto saleData con los valores de los campos de entrada
    let saleData = {
        codSale: codSale,
        codCeramic: codCeramic,
        payment: payment,
        priceSale: parseFloat(priceSale),
        quantitySold: parseInt(quantitySold)
    };

    try {
        let ceramicExists = await checkCeramicExists(codCeramic);
        let salesExists = await checkSaleExists(codSale);
        if (salesExists) {
            alert('Ya existe una venta con este mismo ID');
        } else if (ceramicExists && !salesExists) {
            await createSale(saleData);
            alert("Se agregó el registro de la venta.");
            window.location.href = "./sales.html";
        }else if(!ceramicExists) {
            alert('No existe una ceramica con este codigo ');
        } 

    } catch (error) {
        console.error('Ocurrió el siguiente error: ', error);
        alert('Hubo un problema al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
}

async function checkCeramicExists(codCeramic) {
    try {
        let response = await fetch(`http://localhost:8080/Ceramic/rest/ManagementCeramic/getCeramicsByCode?code=${codCeramic}`);
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

async function checkSaleExists(codSale) {
    try {
        let response = await fetch(`http://localhost:8080/Ceramic/rest/ManagementSale/getSalesByCode?code=${codSale}`);
        if (response.status === 200) {
            return true; 
        } else if (response.status === 204) {
            return false; 
        } else {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error en la función checkCeramicExists: ', error);
        throw error;
    }
}

async function createSale(saleData) {
    try {
        let response = await fetch('http://localhost:8080/Ceramic/rest/ManagementSale/createSale', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleData)
        });

        if (!response.ok) {
            throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
        }
    } catch (error) {
        console.error('Error en la función createSale: ', error);
        throw error;
    }
}
