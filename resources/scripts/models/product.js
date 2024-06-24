class Product{
    constructor(sku,name,description,quantity,blob_image,coast_price,sell_price){
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.blob_image = blob_image;
        this.coast_price = coast_price;
        this.sell_price = sell_price;
        this.margin_price = sell_price - coast_price;
    }

    static draw(product){
        return `<div class="col" id="${product.sku}">
        <div class="card bg-light" style="width: 18rem;">
            <img class="w-75 h-75 p-2 rounded mx-auto border-0" src="${product.blob_image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}.</p>
              <h5 class="card-text">R$ ${product.sell_price}</53>
              <h5 class="card-text">Estoque: ${product.quantity}</h5>
              <div class="row">
                <div class="col w-100">
                    <i class="bi bi-plus-circle btn btn-danger w-100"></i>
                </div>
                <div class="col w-100">
                    <i class="bi bi-dash-circle btn btn-success w-100"></i>
                </div>
              </div>
            </div>
        </div>
    </div>`
    }
}