class Search{
    static findProducts(storageName,term){
        let skuList = StorageController.getBySkuTerm(storageName,term);
        let nameList = StorageController.getByName(storageName,term);
        let descriptionList = StorageController.getByDescription(storageName,term);

        let tempList = this.mergeArrays([skuList,nameList,descriptionList]);

        return tempList;
    }

    static mergeArrays = (arrays) => {
        const combinedArray = [].concat(...arrays);
        const uniqueArray = combinedArray.filter((item, index, self) =>
            index === self.findIndex((t) => t.sku === item.sku)
        );
        return uniqueArray;
    }
}