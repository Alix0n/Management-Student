document.addEventListener('DOMContentLoaded', function() {
    async function addUser() {
        // Obtén los valores de los campos de entrada
        const code = document.getElementById('input-code').value.trim();
        const nameUser = document.getElementById('input-name').value.trim();
        const password = document.getElementById('input-password').value.trim();

        // Verifica que los campos no estén vacíos
        if (!code || !nameUser || !password) {
            alert('Por favor complete todos los campos.');
            return;
        }

        // Crea el objeto userData con los valores de los campos de entrada
        const userData = {
            code: code,
            nameUser: nameUser,
            password: password
        };

        try {
            // Verifica si el usuario ya existe
            let userExists = await checkUserExists(code);
            if (userExists) {
                alert('Un usuario con este código ya existe.');
            } else {
                // Define la URL para la solicitud POST
                const url = 'http://localhost:8080/Ceramic/rest/ManagementUser/createUser';
                
                // Envía la solicitud POST al servidor con los datos del usuario
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                // Verifica si la respuesta del servidor es exitosa
                if (!response.ok) {
                    throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
                }

                // Muestra un mensaje de confirmación al usuario
                alert("Se agregó el registro del usuario.");
                // Redirige al usuario al dashboard
                window.location.href = "./users.html";
            }
        } catch (error) {
            // Muestra un mensaje de error en la consola
            console.error('Ocurrió el siguiente error: ', error);
            alert('Hubo un problema al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    // Función para verificar si el usuario ya existe
    async function checkUserExists(code) {
        const urlCheck = `http://localhost:8080/Ceramic/rest/ManagementUser/getUsersByUser?code=${encodeURIComponent(code)}`;

        try {
            let response = await fetch(urlCheck, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                return true; // El usuario existe
            } else if (response.status === 204) {
                return false; // El usuario no existe
            } else {
                throw new Error('Ocurrió un error en la respuesta del servidor: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error en la función checkUserExists: ', error);
            throw error;
        }
    }

    // Asocia la función 'addUser' al evento 'click' del botón
    document.getElementById('button-create').addEventListener('click', function(event) {
        // Llama a la función addUser cuando se hace clic en el botón
        addUser();
    });
});
