document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(){
            menuLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
document.getElementById('button-ceramics').addEventListener('click', function(event){
    alert('¡Botón clickeado!');
});
document.getElementById('button-borrow').addEventListener('click', function(event){
    alert('¡Botón clickeado!');
});
function loadCeramics(){
    fetch('http://localhost:8080/Ceramic/rest/ManagementCeramic/getCeramics').then(response => response.json()).then((data)=> {
        const content = document.getElementById('content');
        data.forEach(ceramic=>{
            const card = document.createElement('div');
            card.className = 'card';

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            /*Seccioes para cada uno de los atributos */
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

            /*Se agrega el componente al body   DE HIJOS A PADRES*/
            cardBody.appendChild(title);
            cardBody.appendChild(material);
            cardBody.appendChild(color);
            cardBody.appendChild(form);
            cardBody.appendChild(acabado); 
            cardBody.appendChild(price);
            cardBody.appendChild(stock);
            

            card.appendChild(cardBody);

            content.appendChild(card);

        })
    })
    .catch(error => consoler.error('Error: ', error));

}

loadCeramics();