const listOfProducts = document.getElementById('list-of-products');
const searchInput = document.getElementById('search-input');

const storageName = 'products';

drawProducts(StorageController.getAll(storageName))

function drawProducts(list){
    listOfProducts.innerHTML = "";
    list.forEach(product => {
        listOfProducts.innerHTML += Product.draw(product);
    });
}

searchInput.addEventListener('keyup', () => {
    if(searchInput.value == "")
        drawProducts(StorageController.getAll(storageName))
    else
        drawProducts(Search.findProducts(storageName,searchInput.value));
});
