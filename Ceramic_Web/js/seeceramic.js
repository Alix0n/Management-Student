document.addEventListener('DOMContentLoaded', function() {
    const queryForm = document.getElementById('queryCeramicForm');

    queryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const code = document.getElementById('query-code').value;
        fetchCeramicByCode(code);
    });
});

function fetchCeramicByCode(code) {
    const url = `http://localhost:8080/Ceramic/rest/ManagementCeramic/getCeramicsByCode?code=${code}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCeramic(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayCeramic(ceramic) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = ceramic.code;

    const material = document.createElement('p');
    material.className = 'card-text';
    material.textContent = `Material: ${ceramic.material}`;

    const color = document.createElement('p');
    color.className = 'card-text';
    color.textContent = `Color: ${ceramic.color}`;

    const form = document.createElement('p');
    form.className = 'card-text';
    form.textContent = `Forma: ${ceramic.form}`;

    const acabado = document.createElement('p');
    acabado.className = 'card-text';
    acabado.textContent = `Acabado: ${ceramic.acabado}`;

    const price = document.createElement('p');
    price.className = 'card-text';
    price.textContent = `Precio: ${ceramic.price}`;

    const stock = document.createElement('p');
    stock.className = 'card-text';
    stock.textContent = `Stock: ${ceramic.stock}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.setAttribute('data-code', ceramic.code); // Asegurarse de que el código se pase correctamente

    btnEliminar.addEventListener('click', function() {
        const ceramicCode = this.getAttribute('data-code');
        deleteCeramicById(ceramicCode);
    });

    const btnActualizar = document.createElement('button');
    btnActualizar.className = 'btn-success margin';
    btnActualizar.textContent = 'Actualizar';

    // Agregar event listener al botón
    btnActualizar.addEventListener('click', function() {
        localStorage.setItem("ceramicData", JSON.stringify(ceramic));
        window.location.href = "./updateceramic.html";
    });

    cardBody.appendChild(title);
    cardBody.appendChild(material);
    cardBody.appendChild(color);
    cardBody.appendChild(form);
    cardBody.appendChild(acabado);
    cardBody.appendChild(price);
    cardBody.appendChild(stock);
    cardBody.appendChild(btnEliminar);
    cardBody.appendChild(btnActualizar);

    card.appendChild(cardBody);
    resultContainer.appendChild(card);
}

function cleanContent() {
    const content = document.getElementById('result');
    content.innerHTML = "";
}

function deleteCeramicById(code) {
    let url = `http://localhost:8080/Ceramic/rest/ManagementCeramic/deleteCeramic?code=${code}`;
    
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
