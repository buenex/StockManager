const storageName = "products"
const dbName = "StockControl"
var platform = "none"

document.addEventListener("deviceready", function() {
    platform = cordova.platformId;

    console.log(`Running at: ${platform}`);
});