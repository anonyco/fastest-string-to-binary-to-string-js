// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name default.js
// ==/ClosureCompiler==

!function(){
    "use-strict";
    var testingArray=[0], incSize=1;
    try {
		// test the max chunksize String.fromCharCode can work with
        while (incSize <= 0x10000){
            testingArray.length = incSize*2;
            String.fromCharCode.apply(null, testingArray);
            incSize *= 2;
        }
    } catch(e) {}
	console.log(incSize)
    testingArray.length = 0; // clean up memory
  	/**@nocollapse*/
    window.decodeArray16 = function(Uint16ArrayCodes){
        var res = "", i = 0, length = Uint16ArrayCodes.length;
        while (i < length){
            res += String.fromCharCode.apply(null, Uint16ArrayCodes.slice(i, (i+=incSize)));
        }
        return res;
    }
    /**@nocollapse*/
    window.encodeString16 = function(Uint16String){
          var res = new Uint16Array(Uint16String.length), i = Uint16String.length;
          while (i--){
        res[i] = Uint16String.charCodeAt(i);
          }
          return res;
    }
}();
