var storageNameTest  = "teste";
StorageController.deleteAll(storageNameTest);
    
var obj1 = {sku:1234,name:"name teste",  description:"description teste"};
var obj2 = {sku:2345,name:"name teste 2",description:"description teste 2 cont"};
var obj3 = {sku:3456,name:"name teste 3",description:"description teste 3 cont"};

insertObjects();
insertObjectThatAlreadyExists();
updateObject();
getObjectBySku();
getObjectsByContainsATerm();
deleteObject();

function insertObjects(){
    StorageController.save(storageNameTest,obj1);
    StorageController.save(storageNameTest,obj2);
    StorageController.save(storageNameTest,obj3);
    console.log(StorageController.getAll(storageNameTest));
}

function insertObjectThatAlreadyExists(){
    let result = StorageController.save(storageNameTest,obj1);
    console.log(result);
}

function updateObject(){
    obj1.name = "name altered";
    StorageController.update(storageNameTest,obj1);
    console.log(StorageController.getAll(storageNameTest));
}
function getObjectBySku(){
    console.log(StorageController.getBySku(storageNameTest,obj1.sku));
}

function getObjectsByContainsATerm(){
    console.log(StorageController.getByName(storageNameTest,"altered"));
    console.log(StorageController.getByDescription(storageNameTest,"cont"));
}
function deleteObject(){
    StorageController.deleteBySku(storageNameTest,obj1.sku);
    console.log(StorageController.getAll(storageNameTest));
}