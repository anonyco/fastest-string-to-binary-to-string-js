!function(){
	"use-strict";
	var testingArray=[0], incSize=1;
	var getCharFromInt = String.fromCharCode;
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
	var decodeArray16 = window.decodeArray16 = function(Uint16ArrayCodes){
		var res = "", i = 0, length = Uint16ArrayCodes.length;
		while (i < length){
			res += String.fromCharCode.apply(null, Uint16ArrayCodes.slice(i, (i+=incSize)));
		}
		return res;
	}
	var encodeString16 = window.encodeString16 = function(Uint16String){
		var res = new Uint16Array(Uint16String.length), i = Uint16String.length;
		while (i--){
			res[i] = Uint16String.charCodeAt(i);
		}
		return res;
	}
	/** @nocollapse */
	var string16 = {
		arrayToString: decodeArray16,
		stringToArray: encodeString16,
		encode64: function(Uint16String){
			return btoa(decodeArray16(new Uint8Array((new Uint16Array(encodeString16(Uint16String))).buffer)));
		},
		decode64: function(Uint16String){
			return decodeArray16(new Uint16Array((new Uint8Array(encodeString16(atob(Uint16String)))).buffer));
		},	
	// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
	// This work is free. You can redistribute it and/or modify it
	// under the terms of the WTFPL, Version 2
	// For more information see LICENSE.txt or http://www.wtfpl.net/
	//
	// For more information, the home page:
	// http://pieroxy.net/blog/pages/lz-string/testing.html
	//
	// LZ-based compression algorithm, version 1.4.4
		compress: function (uncompressed) {
			if (!uncompressed) return "";
			var bitsPerChar = 16,
				i, value,
				context_dictionary=Object.create(null),
				context_dictionaryToCreate=Object.create(null),
				context_c="",
				context_wc="",
				context_w="",
				context_enlargeIn= 2, // Compensate for the first entry which should not count
				context_dictSize= 3,
				context_numBits= 2,
				context_data=[],
				context_data_val=0,
				context_data_position=0,
				ii;

			for (ii = 0; ii < uncompressed.length; ii += 1) {
				context_c = uncompressed.charAt(ii);
				if (context_dictionary[context_c] === undefined) {
					context_dictionary[context_c] = context_dictSize++;
					context_dictionaryToCreate[context_c] = true;
				}

				context_wc = context_w + context_c;
				if (context_dictionary[context_wc] !== undefined) {
					context_w = context_wc;
				} else {
					if (context_dictionaryToCreate[context_w] !== undefined) {
						if (context_w.charCodeAt(0)<256) {
							for (i=0 ; i<context_numBits ; i++) {
								context_data_val = (context_data_val << 1);
								if (context_data_position == bitsPerChar-1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
							}
							value = context_w.charCodeAt(0);
							for (i=0 ; i<8 ; i++) {
								context_data_val = (context_data_val << 1) | (value&1);
								if (context_data_position == bitsPerChar-1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
								value = value >> 1;
							}
						} else {
							value = 1;
							for (i=0 ; i<context_numBits ; i++) {
								context_data_val = (context_data_val << 1) | value;
								if (context_data_position ==bitsPerChar-1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
								value = 0;
							}
							value = context_w.charCodeAt(0);
							for (i=0 ; i<16 ; i++) {
								context_data_val = (context_data_val << 1) | (value&1);
								if (context_data_position == bitsPerChar-1) {
									context_data_position = 0;
									context_data.push(getCharFromInt(context_data_val));
									context_data_val = 0;
								} else {
									context_data_position++;
								}
								value = value >> 1;
							}
						}
						context_enlargeIn--;
						if (context_enlargeIn == 0) {
							context_enlargeIn = 2<<context_numBits;//Math.pow(2, context_numBits);
							context_numBits++;
						}
						delete context_dictionaryToCreate[context_w];
					} else {
						value = context_dictionary[context_w];
						for (i=0 ; i<context_numBits ; i++) {
							context_data_val = (context_data_val << 1) | (value&1);
							if (context_data_position == bitsPerChar-1) {
								context_data_position = 0;
								context_data.push(getCharFromInt(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = value >> 1;
						}


					}
					context_enlargeIn--;
					if (context_enlargeIn == 0) {
						context_enlargeIn = 1<<context_numBits;//Math.pow(2, context_numBits);
						context_numBits++;
					}
					// Add wc to the dictionary.
					context_dictionary[context_wc] = context_dictSize++;
					context_w = String(context_c);
				}
			}

			// Output the code for w.
			if (context_w !== "") {
				if (context_dictionaryToCreate[context_w] !== undefined) {
					if (context_w.charCodeAt(0)<256) {
						for (i=0 ; i<context_numBits ; i++) {
							context_data_val = (context_data_val << 1);
							if (context_data_position == bitsPerChar-1) {
								context_data_position = 0;
								context_data.push(getCharFromInt(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
						}
						value = context_w.charCodeAt(0);
						for (i=0 ; i<8 ; i++) {
							context_data_val = (context_data_val << 1) | (value&1);
							if (context_data_position == bitsPerChar-1) {
								context_data_position = 0;
								context_data.push(getCharFromInt(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = value >> 1;
						}
					} else {
						value = 1;
						for (i=0 ; i<context_numBits ; i++) {
							context_data_val = (context_data_val << 1) | value;
							if (context_data_position == bitsPerChar-1) {
								context_data_position = 0;
								context_data.push(getCharFromInt(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = 0;
						}
						value = context_w.charCodeAt(0);
						for (i=0 ; i<16 ; i++) {
							context_data_val = (context_data_val << 1) | (value&1);
							if (context_data_position == bitsPerChar-1) {
								context_data_position = 0;
								context_data.push(getCharFromInt(context_data_val));
								context_data_val = 0;
							} else {
								context_data_position++;
							}
							value = value >> 1;
						}
					}
					context_enlargeIn--;
					if (context_enlargeIn == 0) {
						context_enlargeIn = 1<<context_numBits;//Math.pow(2, context_numBits);
						context_numBits++;
					}
					delete context_dictionaryToCreate[context_w];
				} else {
					value = context_dictionary[context_w];
					for (i=0 ; i<context_numBits ; i++) {
						context_data_val = (context_data_val << 1) | (value&1);
						if (context_data_position == bitsPerChar-1) {
							context_data_position = 0;
							context_data.push(getCharFromInt(context_data_val));
							context_data_val = 0;
						} else {
							context_data_position++;
						}
						value = value >> 1;
					}


				}
				context_enlargeIn--;
				if (context_enlargeIn == 0) {
					context_enlargeIn = 1<<context_numBits;//Math.pow(2, context_numBits-1);
					context_numBits++;
				}
			}

			// Mark the end of the stream
			value = 2;
			for (i=0 ; i<context_numBits ; i++) {
				context_data_val = (context_data_val << 1) | (value&1);
				if (context_data_position == bitsPerChar-1) {
					context_data_position = 0;
					context_data.push(getCharFromInt(context_data_val));
					context_data_val = 0;
				} else {
					context_data_position++;
				}
				value = value >> 1;
			}

			// Flush the last char
			while (true) {
				context_data_val = (context_data_val << 1);
				if (context_data_position == bitsPerChar-1) {
					context_data.push(getCharFromInt(context_data_val));
					break;
				}
				else context_data_position++;
			}
			return context_data.join('');
		},
		decompress: function (compressed) {
			if (!compressed) return "";
			var length = compressed.length,
				resetValue = 32768,
				dictionary = [],
				next,
				enlargeIn = 4,
				dictSize = 4,
				numBits = 3,
				entry = "",
				result = [],
				i,
				w,
				bits, resb, maxpower, power,
				c,
				data_val = compressed.charCodeAt(0),
				data_position = resetValue,
				data_index = 1;
			//data = {val:compressed.charCodeAt(0), position:resetValue, index:1};

			for (i = 0; i < 3; i += 1) {
				dictionary[i] = i;
			}

			bits = 0;
			maxpower = 4;//Math.pow(2,2);
			power = 1;
			while (power !== maxpower) {
				resb = data_val & data_position;
				data_position >>= 1;
				if (data_position == 0) {
					data_position = resetValue;
					data_val = compressed.charCodeAt(data_index++);
				}
				bits |= (resb>0 ? 1 : 0) * power;
				power <<= 1;
			}

			switch (next = bits) {
				case 0:
					bits = 0;
					maxpower = 256;//Math.pow(2,8);
					power=1;
					while (power!=maxpower) {
						resb = data_val & data_position;
						data_position >>= 1;
						if (data_position == 0) {
							data_position = resetValue;
							data_val = compressed.charCodeAt(data_index++);
						}
						bits |= (resb>0 ? 1 : 0) * power;
						power <<= 1;
					}
					c = getCharFromInt(bits);
					break;
				case 1:
					bits = 0;
					maxpower = 65536;//Math.pow(2,16);
					power=1;
					while (power!=maxpower) {
						resb = data_val & data_position;
						data_position >>= 1;
						if (data_position == 0) {
							data_position = resetValue;
							data_val = compressed.charCodeAt(data_index++);
						}
						bits |= (resb>0 ? 1 : 0) * power;
						power <<= 1;
					}
					c = getCharFromInt(bits);
					break;
				case 2:
					return "";
			}
			dictionary[3] = c;
			w = c;
			result.push(c);
			while (true) {
				if (data_index > length) {
					return "";
				}

				bits = 0;
				maxpower = 1<<numBits;//Math.pow(2, numBits);
				power=1;
				while (power!=maxpower) {
					resb = data_val & data_position;
					data_position >>= 1;
					if (data_position == 0) {
						data_position = resetValue;
						data_val = compressed.charCodeAt(data_index++);
					}
					bits |= (resb>0 ? 1 : 0) * power;
					power <<= 1;
				}

				switch (c = bits) {
					case 0:
						bits = 0;
						maxpower = 256;//Math.pow(2,8);
						power=1;
						while (power!=maxpower) {
							resb = data_val & data_position;
							data_position >>= 1;
							if (data_position == 0) {
								data_position = resetValue;
								data_val = compressed.charCodeAt(data_index++);
							}
							bits |= (resb>0 ? 1 : 0) * power;
							power <<= 1;
						}

						dictionary[dictSize++] = getCharFromInt(bits);
						c = dictSize-1;
						enlargeIn--;
						break;
					case 1:
						bits = 0;
						maxpower = 65536;//Math.pow(2,16);
						power=1;
						while (power!=maxpower) {
							resb = data_val & data_position;
							data_position >>= 1;
							if (data_position == 0) {
								data_position = resetValue;
								data_val = compressed.charCodeAt(data_index++);
							}
							bits |= (resb>0 ? 1 : 0) * power;
							power <<= 1;
						}
						dictionary[dictSize++] = getCharFromInt(bits);
						c = dictSize-1;
						enlargeIn--;
						break;
					case 2:
						return result.join('');
				}

				if (enlargeIn == 0) {
					enlargeIn = 1<<numBits;//Math.pow(2, numBits);
					numBits++;
				}

				if (dictionary[c]) {
					entry = dictionary[c];
				} else {
					if (c === dictSize) {
						entry = w + w.charAt(0);
					} else {
						return null;
					}
				}
				result.push(entry);

				// Add w+entry[0] to the dictionary.
				dictionary[dictSize++] = w + entry.charAt(0);
				enlargeIn--;

				w = entry;

				if (enlargeIn == 0) {
					enlargeIn = 1<<numBits;//Math.pow(2, numBits);
					numBits++;
				}

			}
		}
	};
	window.string16 = string16;
}();
