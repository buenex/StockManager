//Encode a file to Base64
function fileToDataUrl(file, callback) {
    const reader = new FileReader();
    reader.onload = function() {
        const base64String = reader.result;
        callback(base64String);
    }
    reader.readAsDataURL(file);
}

//Decode a Base64 string to File
function dataUrlToFile(name,dataurl){
    var content = atob(getBinaryFile(dataurl));
    var byteArr = new Array(content.length);

    for (var i = 0; i < content.length; i++) {
      byteArr[i] = content.charCodeAt(i);
    }

    var mime = getMimeType(dataurl);
    var blob = new Blob([new Uint8Array(byteArr)], { type: mime });
    return  new File([blob], name+"."+getExtension(dataurl), { type: mime });    
}

//Encode a file to a blob
function fileToBlob(file){
    return new Blob([file]);
}

//Get mime type from a base64 string
function getMimeType(dataurl){
    return dataurl.match(/:(.*?);/)[1];
}

//Get extension type from a base64 string
function getExtension(dataurl){
    return dataurl.match(/\/\w+/i)[0].replace("/","");
}

//Get only dataUrl from a base64 string
function getBinaryFile(dataurl){
    return dataurl.split(",")[1];
}