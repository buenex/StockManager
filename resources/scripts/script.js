const listOfProducts = document.getElementById('list-of-products');
const searchInput = document.getElementById('search-input');

const storageName = 'products';

drawProducts()

function drawProducts(){
    listOfProducts.innerHTML = '';
    StorageController.getAll(storageName).forEach(product => {
        listOfProducts.innerHTML += Product.draw(product);
    });
}

searchInput.addEventListener('keyup', () => {
    //logic of search
    
});
