document.addEventListener('DOMContentLoaded', function() {
    const updateButton = document.getElementById('button-update');

    updateButton.addEventListener('click', function(event) {
        event.preventDefault();

        const nameUser = document.getElementById('input-code').value;
        const password = document.getElementById('input-password').value;

        if (!nameUser || !password) {
            alert('Por favor complete todos los campos.');
            return;
        }

        const user = {
            nameUser: nameUser,
            password: password
        };

        fetch('http://localhost:8080/Ceramic/rest/ManagementUser/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Usuario actualizado con éxito');
            window.location.href = './users.html';  // Redirigir a la página principal u otra página relevante
        })
        .catch(error => {
            console.error('Ocurrió el siguiente error con la operación: ', error);
        });
    });
});
