var skuInput = document.getElementById('skuInput');
var nomeInput = document.getElementById('nomeInput');
var descricaoInput = document.getElementById('descricaoInput');
var estoqueInput = document.getElementById('estoqueInput');
var precoCustoinput = document.getElementById('precoCustoInput');
var precoVendaInput = document.getElementById('precoVendaInput');
var imageInput = document.getElementById('imageInput');
var excludeButton = document.getElementById('excludeButton');
var imageUrl = "";

var skuPreviewInput = document.getElementById('skuPreviewInput');
var nomePreviewInput = document.getElementById('nomePreviewInput');
var descricaoPreviewInput = document.getElementById('descricaoPreviewInput');
var estoquePreviewInput = document.getElementById('estoquePreviewInput');
var precoVendaPreviewInput = document.getElementById('precoVendaPreviewInput');
var imagePreviewInput = document.getElementById('imagePreviewInput');

var keyupFields = document.querySelectorAll(".keyup-field");
const url = document.URL;
const skuToEdit = getParameter(url);

var productPreview = new Product(0, "nome preview", "descricao de demonstracao", 5, "", "", 0.00, 0.00);

init(skuToEdit);
drawpreview();

imageInput.addEventListener("change", (event) => {
    updateProductView();
});

keyupFields.forEach((key) => {
    key.addEventListener("input", (event) => {
        updateProductView();
    })
});

function makeBlobImage() {
    productPreview.blob_image = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : "";
}

function drawpreview() {
    clearPreview()

    skuPreviewInput.innerHTML += productPreview.sku;
    nomePreviewInput.innerHTML += productPreview.name;
    descricaoPreviewInput.innerHTML += productPreview.description;
    estoquePreviewInput.innerHTML += productPreview.quantity;
    precoVendaPreviewInput.innerHTML += productPreview.sell_price;

    if(!productPreview.binary_image == "")
        imagePreviewInput.src = productPreview.blob_image;
    else
        imagePreviewInput.src = "../resources/images/image.png"
}

function clearPreview() {
    skuPreviewInput.innerHTML = "SKU: ";
    nomePreviewInput.innerHTML = "";
    descricaoPreviewInput.innerHTML = "";
    estoquePreviewInput.innerHTML = "Estoque: ";
    precoVendaPreviewInput.innerHTML = "R$ ";
    imagePreviewInput.src = "";
}

function clearFields() {
    skuInput.value = "";
    nomeInput.value = "";
    descricaoInput.value = "";
    estoqueInput.value = "0";
    precoCustoinput.value = "0.0";
    precoVendaInput.value = "0.0";
}

function updateProductView() {
    productPreview.sku = skuInput.value;
    productPreview.name = nomeInput.value;
    productPreview.description = descricaoInput.value;
    productPreview.quantity = new Number(estoqueInput.value);
    productPreview.coast_price = precoCustoinput.value
    productPreview.sell_price = precoVendaInput.value;
    makeBlobImage();
    if (imageInput.files.length > 0) {
        Utils.fileToDataUrl(imageInput.files[0], function (imageBinary) {
            productPreview.binary_image = imageBinary;
            drawpreview();
        })
    }
}

function saveClick() {
    try {
        if (toEdit(skuToEdit)) {
            if (StorageController.update(storageName, productPreview)) {
                alert("Registro atualizado com sucesso!");
            }
        }
        else {
            let message = validations();
            if (message != "") {
                alert(message)
            } else {
                if (StorageController.save(storageName, productPreview)) {
                    alert("Registro salvo com sucesso!");
                    clearPreview();
                    clearFields();
                }
            }
        }

    } catch (ex) {
        alert(ex);
    }
}

function validations() {
    let message = "";
    message += checkIfVoid(skuInput.value) ? "Sku deve ser preenchido! \n" : StorageController.getBySku(storageName, productPreview.sku) ? "Sku ja existente para outro produto! \n" : "";
    message += checkIfVoid(nomeInput.value) ? "Nome deve ser preenchido! \n" : "";
    message += checkIfVoid(descricaoInput.value) ? "Descricao deve ser preenchido! \n" : "";
    message += checkIfVoid(precoVendaInput.value) ? "Preco de venda deve ser preenchido! \n" : "";
    message += checkIfVoid(estoqueInput.value) ? "Estoque deve ser preenchido! \n" : "";

    return message;
}

function checkIfVoid(text) {
    return text == ""
}

function getParameter(url) {
    return url.split("=").length > 1 ? url.split("=")[1] : "";
}

function toEdit(sku) {
    return StorageController.getBySku(storageName, sku);
}

function init(sku) {
    if (toEdit(sku)) {
        var product = StorageController.getBySku(storageName, sku);
        excludeButton.disabled = false;
        productPreview = product != null ? product : productPreview;
        if (product) {
            skuInput.disabled = true;
            updateInit()
        }
    }
}

function updateInit() {
    skuInput.value = productPreview.sku;

    let fileList = new DataTransfer();
    if (productPreview.binary_image) {
        fileList.items.add(Utils.dataUrlToFile("image", productPreview.binary_image));
        imageInput.files = fileList.files;
    }
    makeBlobImage();

    nomeInput.value = productPreview.name;
    descricaoInput.value = productPreview.description;
    estoqueInput.value = productPreview.quantity.toString();
    precoVendaInput.value = productPreview.sell_price;
    precoCustoinput.value = productPreview.coast_price;
}
function excludeClick() {
    if (confirm(`Tem certeza que quer excluir o registro de sku: ${skuToEdit} ?`)) {
        StorageController.deleteBySku(storageName, skuToEdit);
        let goTo = url.split("?")[0]
        alert("Registro excluido com sucesso!")
        window.location.href = goTo;
    }
}