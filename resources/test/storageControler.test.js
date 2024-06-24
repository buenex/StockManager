var storageName  = "teste";
StorageController.deleteAll(storageName);
    
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
    StorageController.save(storageName,obj1);
    StorageController.save(storageName,obj2);
    StorageController.save(storageName,obj3);
    console.log(StorageController.getAll(storageName));
}

function insertObjectThatAlreadyExists(){
    let result = StorageController.save(storageName,obj1);
    console.log(result);
}

function updateObject(){
    obj1.name = "name altered";
    StorageController.update(storageName,obj1);
    console.log(StorageController.getAll(storageName));
}
function getObjectBySku(){
    console.log(StorageController.getBySku(storageName,obj1.sku));
}

function getObjectsByContainsATerm(){
    console.log(StorageController.getByName(storageName,"altered"));
    console.log(StorageController.getByDescription(storageName,"cont"));
}
function deleteObject(){
    StorageController.deleteBySku(storageName,obj1.sku);
    console.log(StorageController.getAll(storageName));
}