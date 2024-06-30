class Product{
    constructor(sku,name,description,quantity,blob_image,binary_image,coast_price,sell_price){
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.blob_image = blob_image;
        this.binary_image = binary_image;
        this.coast_price = coast_price;
        this.sell_price = sell_price;
        this.margin_price = sell_price - coast_price;
    }

    static draw(product){
        return `<div class="col py-2" id="${product.sku}">
            <div class="card bg-light h-100" style="width: 18rem;">
                <div class="row">
                    <div class="col"><h5>SKU:${product.sku}</h5></div>
                    <div class="col-lg-2"><a onclick=editProduct(${product.sku}) ><i class="bi bi-pencil-square"></i></a></div>
                </div>
                <img class="w-75 h-auto p-2 rounded mx-auto border-0" src="${product.binary_image}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}.</p>
                <h5 class="card-text">R$ ${product.sell_price}</h5>
                <h5 class="card-text">Estoque: ${product.quantity}</h5>
                <div class="row">
                    <div class="col w-100">
                        <i class="bi bi-dash-circle btn btn-danger w-100" onclick="changeStock(${product.sku}, -1)"></i>
                    </div>
                    <div class="col w-100">
                        <i class="bi bi-plus-circle btn btn-success w-100" onclick="changeStock(${product.sku}, 1)"></i>
                    </div>
                </div>
                </div>
            </div>
        </div>`
    }
}