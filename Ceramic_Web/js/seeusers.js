document.addEventListener('DOMContentLoaded', function() {
    const queryForm = document.getElementById('queryUserForm');

    queryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const code = document.getElementById('query-code').value;
        fetchUserByCode(code);
    });
});

function fetchUserByCode(code) {
    const url = `http://localhost:8080/Ceramic/rest/ManagementUser/getUsersByCode?code=${code}`;
    
    fetch(url)
        .then(response => {
            if (response.status === 204) {
                // Si el usuario no se encuentra, muestra una alerta
                alert('Usuario no encontrado');
                cleanContent();
                return;
            }
            return response.json();
        })
        .then(response => response.json())
        .then(data => {
            displayUser(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayUser(user) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h2');
    title.className = 'card-title';
    title.textContent = user.code;

    const userImage = document.createElement('img');
    userImage.src = `resource/icons/${user.nameUser}.png`; // Asegúrate de que la imagen tenga el mismo nombre que el usuario
    userImage.className = 'user-image';

    const nameUser = document.createElement('p');
    nameUser.className = 'card-text';
    nameUser.textContent = `Nombre de Usuario: ${user.nameUser}`;

    const password = document.createElement('p');
    password.className = 'card-text';
    password.textContent = `Contraseña: ${user.password}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.setAttribute('data-code', user.code); // Asegurarse de que el código se pase correctamente

    btnEliminar.addEventListener('click', function() {
        const userCode = this.getAttribute('data-code');
        deleteUserById(userCode);
    });

    const btnActualizar = document.createElement('button');
    btnActualizar.className = 'btn-success margin';
    btnActualizar.textContent = 'Actualizar';

    // Agregar event listener al botón
    btnActualizar.addEventListener('click', function() {
        localStorage.setItem("userData", JSON.stringify(user));
        window.location.href = "./updateuser.html";
    });

    cardBody.appendChild(title);
    cardBody.appendChild(userImage);
    cardBody.appendChild(nameUser);
    cardBody.appendChild(password);
    cardBody.appendChild(btnEliminar);
    cardBody.appendChild(btnActualizar);

    card.appendChild(cardBody);
    resultContainer.appendChild(card);
}

function cleanContent() {
    const content = document.getElementById('result');
    content.innerHTML = "";
}

function deleteUserById(code) {
    let url = `http://localhost:8080/Ceramic/rest/ManagementUser/deleteUser?code=${code}`;
    
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
