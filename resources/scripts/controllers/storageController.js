class StorageController{
    static getAll(storageName){
        let obj = JSON.parse(localStorage.getItem(storageName));
        return obj == null ? [] : obj;
    }
    static getBySku(storageName,sku){
        let obj = this.getAll(storageName);
        return obj.find((p) => p.sku == sku);
    }
    static getBySkuTerm(storageName,sku){
        let obj = this.getAll(storageName);
        return obj.filter((p) => p.sku.toString().toLowerCase().includes(sku.toString().toLowerCase()));
    }
    static getByName(storageName,name){
        let obj = this.getAll(storageName);
        return obj.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
    }
    static getByDescription(storageName,description){
        let obj = this.getAll(storageName);
        return obj.filter((p) => p.description.toLowerCase().includes(description.toLowerCase()));
    }
    static save(storageName,obj){
        let list = [];
        list = this.getAll(storageName);
        if(list.filter((p) => p.sku == obj.sku).length == 0){
            list.push(obj);
            this.setStorage(storageName,list);
            return true;
        }
        return false;
    }
    static update(storageName,obj){
        let list = this.getAll(storageName);
        let index = list.findIndex((p) => p.sku == obj.sku);
        if(index){
            list[index] = obj;
            this.setStorage(storageName,list);
            return true;
        }
        return false;
    }
    static deleteBySku(storageName,sku){
        let list = this.getAll(storageName);
        let index = list.findIndex((p) => p.sku == sku);
        list.splice(index,1);
        this.setStorage(storageName,list);
    }
    static deleteAll(storageName){
        localStorage.removeItem(storageName);
    }

    static setStorage(storageName,obj){
        localStorage.setItem(storageName,JSON.stringify(obj));
    }
}