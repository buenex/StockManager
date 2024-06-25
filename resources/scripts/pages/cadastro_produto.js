var skuInput = document.getElementById('skuInput');
var nomeInput = document.getElementById('nomeInput');
var descricaoInput = document.getElementById('descricaoInput');
var estoqueInput = document.getElementById('estoqueInput');
var precoCustoinput = document.getElementById('precoCustoinput');
var precoVendaInput = document.getElementById('precoVendaInput');
var imageInput = document.getElementById('imageInput');
var imageUrl = "";

var skuPreviewInput = document.getElementById('skuPreviewInput');
var nomePreviewInput = document.getElementById('nomePreviewInput');
var descricaoPreviewInput = document.getElementById('descricaoPreviewInput');
var estoquePreviewInput = document.getElementById('estoquePreviewInput');
var precoVendaPreviewInput = document.getElementById('precoVendaPreviewInput');
var imagePreviewInput = document.getElementById('imagePreviewInput');

var keyupFields = document.querySelectorAll(".keyup-field");

const storageName = 'products';

var productPreview = new Product(0,"nome preview","descricao de demonstracao",5,"","",0.00,0.00);

drawpreview();

imageInput.addEventListener("change",(event)=>{
    imageUrl = event.target.files.length > 0 ? URL.createObjectURL(event.target.files[0]) : "";
    updateProductView();
    drawpreview();
});

keyupFields.forEach((key)=>{
    key.addEventListener("keyup",(event)=>{
        updateProductView();
        drawpreview();
    })
});

function drawpreview(){
    clearPreview()

    skuPreviewInput.innerHTML += productPreview.sku;
    nomePreviewInput.innerHTML += productPreview.name;
    descricaoPreviewInput.innerHTML += productPreview.description;
    estoquePreviewInput.innerHTML += productPreview.quantity;
    precoVendaPreviewInput.innerHTML += productPreview.sell_price;

    imagePreviewInput.src = productPreview.blob_image ;
}

function clearPreview(){
    skuPreviewInput.innerHTML = "SKU: ";
    nomePreviewInput.innerHTML = "";
    descricaoPreviewInput.innerHTML = "";
    estoquePreviewInput.innerHTML =  "Estoque: ";
    precoVendaPreviewInput.innerHTML =  "R$ ";
    imagePreviewInput.src = "";
}

function updateProductView(){
    productPreview.sku = skuInput.value;
    productPreview.name = nomeInput.value;
    productPreview.description = descricaoInput.value;
    productPreview.quantity = estoqueInput.value;
    productPreview.sell_price = precoVendaInput.value;
    productPreview.blob_image = URL.createObjectURL(imageInput.files[0]);
    Utils.fileToDataUrl(imageInput.files[0],function (imageBinary){
        productPreview.binary_image = imageBinary;
    })
}

function saveClick(){
    try{
    let message = validations();
    message != "" ? alert(message) : StorageController.save(storageName,productPreview);
    alert("Registro salvo com sucesso!");
    }catch(ex){
        alert(ex);
    }
}

function validations(){
    let message = "";
    message += checkIfVoid(skuInput.value)?"Sku deve ser preenchido! \n":StorageController.getBySku(storageName,productPreview.sku) ? "Sku ja existente para outro produto! \n" : "";
    message += checkIfVoid(nomeInput.value)?"Nome deve ser preenchido! \n":"";
    message += checkIfVoid(descricaoInput.value)?"Descricao deve ser preenchido! \n":"";
    message += checkIfVoid(precoVendaInput.value)?"Preco de venda deve ser preenchido! \n":"";
    message += checkIfVoid(estoqueInput.value)?"Estoque deve ser preenchido! \n":"";

    return message;
}

function checkIfVoid(text){
    return text == ""
}