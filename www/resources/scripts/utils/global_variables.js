const storageName = "products"
const dbName = "StockControl"
var platform = "none"
var data;

document.addEventListener("deviceready", function() {
    platform = cordova.platformId;
    data = getDataByPlatform(platform);

    console.log(`Running at: ${platform}`);
});

function getDataByPlatform(platform){
    switch(platform){
        case "browser":
            return StorageController;
        case "android":
            //do sth
        case "ios":
            //do sth
        default:
            //do sth
    }
}