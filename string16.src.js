!function(window){
	"use-strict";
	var testingArray=[0], incSize=1;
	var Uint16Array = window["Uint16Array"], Uint8Array = window["Uint8Array"], btoa = window["btoa"], atob = window["atob"];
	var getCharFromInt = window["String"]["fromCharCode"];
	var HTTPRequest = null, objectURL = "";
	var createObjectURL = window["URL"]["createObjectURL"], revokeObjectURL = window["URL"]["revokeObjectURL"];
	var FileReaderSync = window["FileReaderSync"] && new window["FileReaderSync"];
	try {
		// test the max chunksize String.fromCharCode can work with
	while (incSize <= 0x10000){
	    testingArray.length = incSize*2;
	    getCharFromInt.apply(null, testingArray);
	    incSize *= 2;
	}
	} catch(e) {}
	testingArray.length = 0; // clean up memory
	var decodeArray16 = function(Uint16ArrayCodes){
		var res = "", i = 0, length = Uint16ArrayCodes.length;
		while (i < length){
			res += getCharFromInt.apply(null, Uint16ArrayCodes.slice(i, (i+=incSize)));
		}
		return res;
	}
	var encodeString16 = function(Uint16String){
		var res = new Uint16Array(Uint16String.length), i = Uint16String.length;
		while (i--) res[i] = Uint16String.charCodeAt(i);
		return res;
	}
	function expandOut(x){
		var char=x.charCodeAt(0);
		return getCharFromInt(char&0xff) + getCharFromInt(char>>>8);
	}
	function contractIn(x){
		return getCharFromInt(x.charCodeAt(0) | (x.charCodeAt(1) << 8));
	}
	/** @nocollapse */
	window["string16"] = {
		"arrayToString": decodeArray16,
		"stringToArray": encodeString16,
		"encode64": function(Uint16String){
			return btoa(Uint16String.replace(/[^]/g, expandOut));
		},
		"decode64": function(Uint16String){
			return atob(Uint16String).replace(/[^][^]/g, contractIn);
		},
		"readBlobSync": function(blob, responseType, encoding){
			if (FileReaderSync) {
				if (!responseType || responseType === "text") return FileReaderSync["readAsText"](blob, encoding);
				if (responseType === "arrayBuffer") return FileReaderSync["readAsArrayBuffer"](blob);
				if (responseType === "dataurl") return FileReaderSync["readAsDataURL"](blob);
			}
			if (HTTPRequest === null) HTTPRequest = new XMLHttpRequest;
			objectURL = createObjectURL(blob);
			HTTPRequest.open("GET", objectURL, false);
			HTTPRequest["overrideMimeType"]("application/ocelot-stream" + (encoding?"; charset=" + encoding:""));
			if (responseType && responseType !== "dataurl") HTTPRequest["responseType"] = responseType;
			HTTPRequest.send();
			revokeObjectURL(objectURL);
			if (responseType === "dataurl") return atob(HTTPRequest["response"]);
			return HTTPRequest["response"];
		}
	};
}(typeof global === "undefined" ? self : global);
