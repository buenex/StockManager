const listOfProducts = document.getElementById('list-of-products');
const searchInput = document.getElementById('search-input');

fixProducts()

drawProducts(StorageController.getAll(storageName))

function drawProducts(list) {
    listOfProducts.innerHTML = "";
    list.forEach(product => {
        if(product.binary_image == "")
            product.binary_image = "./resources/images/image.png";
        listOfProducts.innerHTML += Product.draw(product);
    });
}

function editProduct(sku) {
    window.location.href = `./pages/cadastro_produto.html?sku=${sku}`;
}

searchInput.addEventListener('keyup', () => {
    if (searchInput.value == "")
        drawProducts(StorageController.getAll(storageName))
    else
        drawProducts(Search.findProducts(storageName, searchInput.value));
});

function changeStock(sku, quantity) {
    try {
        let product = StorageController.getBySku(storageName, sku);
        let updatedNumber = new Number(product.quantity) + quantity;
        
        if (updatedNumber >= 0) {
            product.quantity = updatedNumber;
            StorageController.update(storageName, product);
            drawProducts(StorageController.getAll(storageName))
        }
    } catch (ex) {
        console.log(ex);
    }
}

function fixProducts(){
    let list = StorageController.getAll(storageName);
    list.forEach(product => {
        if(product.binary_image == null){
            product.binary_image = "";
            StorageController.update(storageName,product);
        }
    });
}