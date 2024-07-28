document.addEventListener('DOMContentLoaded', function() {
    function addUser() {
        // Obtén los valores de los campos de entrada
        const nameUser = document.getElementById('input-cod').value;
        const password = document.getElementById('input-password').value;

        // Verifica que los campos no estén vacíos
        if (!nameUser || !password) {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Crea el objeto userData con los valores de los campos de entrada
        const userData = {
            nameUser: nameUser,
            password: password
        };

        // Define la URL para la solicitud POST
        const url = 'http://localhost:8080/Ceramic/rest/ManagementUser/createUser';
        
        // Envía la solicitud POST al servidor con los datos del usuario
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            // Verifica si la respuesta del servidor es exitosa
            if (!response.ok) {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Muestra un mensaje de confirmación al usuario
            alert("Se agregó el registro del usuario.");
            // Redirige al usuario al dashboard
            window.location.href = "./users.html";
        })
        .catch(error => {
            // Muestra un mensaje de error en la consola
            console.error('Ocurrió el siguiente error: ', error);
        });
    }

    // Asocia la función 'addUser' al evento 'click' del botón
    document.getElementById('button-create').addEventListener('click', function(event) {
        // Llama a la función addUser cuando se hace clic en el botón
        addUser();
    });
});
