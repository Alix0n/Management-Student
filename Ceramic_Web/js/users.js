document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(){
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });


    loadUsers();
});

document.getElementById('button-ceramics').addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './dashboard.html';
});
document.getElementById('button-borrow').addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './sales.html'; 

});

document.getElementById('button-users').addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = './users.html'; 

});

function loadUsers() {
    const content = document.getElementById('content');

    const cardAdd = document.createElement('div');
    cardAdd.className = 'card';

    const cardBodyAdd = document.createElement('div');
    cardBodyAdd.className = 'card-body';

    const btnAdd = document.createElement('a');
    btnAdd.className = 'btn btn-primary';
    btnAdd.href = './adduser.html';

    const imgAdd = document.createElement('img');
    imgAdd.src = 'resource/icons/añadir.png';

    const lblAdd = document.createElement('h3');
    lblAdd.textContent = '¡Añade una usuario!';

    btnAdd.appendChild(imgAdd);
    cardBodyAdd.appendChild(btnAdd);
    cardBodyAdd.appendChild(lblAdd);
    cardAdd.appendChild(cardBodyAdd);
    content.appendChild(cardAdd);

    fetch('http://localhost:8080/Ceramic/rest/ManagementUser/getUsers')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const nameUser = document.createElement('h2');
                nameUser.className = 'card-title';
                nameUser.textContent = user.nameUser;

                const userImage = document.createElement('img');
                userImage.src = `resource/icons/${user.nameUser}.png`; // Asegúrate de que la imagen tenga el mismo nombre que el usuario
                userImage.className = 'user-image';

                const password = document.createElement('input');
                password.type = 'password';
                password.className = 'card-text';
                password.value = user.password;
                password.readOnly = true;

                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-danger';
                btnEliminar.id = `btn-delete-${user.code}`;
                btnEliminar.textContent = `Eliminar`;
                btnEliminar.setAttribute('data-code', user.code);

                btnEliminar.addEventListener('click', function() {
                    const code = this.getAttribute('data-code');
                    deleteUserById(code);
                });

                const btnActualizar = document.createElement('a');
                btnActualizar.className = 'btn btn-success margin';
                btnActualizar.id = `btn-update-${user.nameUser}`;
                btnActualizar.textContent = `Actualizar`;

                btnActualizar.addEventListener('click', function() {
                    localStorage.setItem("userData", JSON.stringify(user));
                    window.location.href = "./updateuser.html";
                });

                cardBody.appendChild(nameUser);
                cardBody.appendChild(userImage); // Añadimos la imagen aquí
                cardBody.appendChild(password);
                cardBody.appendChild(btnEliminar);
                cardBody.appendChild(btnActualizar);
                card.appendChild(cardBody);
                content.appendChild(card);
            });
        })
        .catch(error => console.error('Error: ', error));
}

function cleanContent() {
    const content = document.getElementById('content');
    content.innerHTML = "";
}

function deleteUserById(code) {
    const url = `http://localhost:8080/Ceramic/rest/ManagementUser/deleteUser?code=${code}`;
    fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert("Se eliminó el usuario");
            cleanContent();
            loadUsers();
        })
        .catch(error => console.error('Ocurrió el siguiente error con la operación: ', error));
}
