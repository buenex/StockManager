export class Product{
    constructor(sku,name,description,blob_image,coast_price,sell_price){
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.blob_image = blob_image;
        this.coast_price = coast_price;
        this.sell_price = sell_price;
        this.margin_price = sell_price - coast_price;
    }
}