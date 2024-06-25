
class Utils {
    //Encode a file to Base64
    static fileToDataUrl(file, callback) {
        const reader = new FileReader();
        reader.onload = function () {
            const base64String = reader.result;
            callback(base64String);
        }
        reader.readAsDataURL(file);
    }

    //Decode a Base64 string to File
    static dataUrlToFile(name, dataurl) {
        let content = atob(this.getBinaryFile(dataurl));
        let byteArr = new Array(content.length);

        for (let i = 0; i < content.length; i++) {
            byteArr[i] = content.charCodeAt(i);
        }

        let mime = this.getMimeType(dataurl);
        let blob = new Blob([new Uint8Array(byteArr)], { type: mime });
        return new File([blob], name + "." + this.getExtension(dataurl), { type: mime });
    }

    //Encode a file to a blob
    static fileToBlob(file) {
        return new Blob([file]);
    }

    //Get mime type from a base64 string
    static getMimeType(dataurl) {
        return dataurl.match(/:(.*?);/)[1];
    }

    //Get extension type from a base64 string
    static getExtension(dataurl) {
        return dataurl.match(/\/\w+/i)[0].replace("/", "");
    }

    //Get only dataUrl from a base64 string
    static getBinaryFile(dataurl) {
        return dataurl.split(",")[1];
    }
}