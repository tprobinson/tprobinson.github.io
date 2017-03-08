/*!
     * Aersia Player v0.1.6
     * This file is compiled using Grunt.
      */
    // function easeOutBounce(t, b, c, d) {
//     if ((t/=d) < (1/2.75)) {
// 		return c*(7.5625*t*t) + b;
// 	} else if (t < (2/2.75)) {
// 		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
// 	} else if (t < (2.5/2.75)) {
// 		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
// 	} else {
// 		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
// 	}
// }

function easeInOut(now, beginX,targetX, beginY,targetY ) {
	return ( -1 * Math.pow(((now - beginX) / targetX) - 1,2) + 1 )	// y = -x^2 + 1
		* (Math.abs(targetY-beginY));						// scaled up to the amount that we need to move.
}

function addEvent(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
}

function removeEvent(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.removeEventListener) {
        object.removeEventListener(type, callback, false);
    } else if (object.detachEvent) {
        object.detachEvent("on" + type, callback);
    } else {
        object["on"+type] = null;
    }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// http://stackoverflow.com/questions/12606245/detect-if-browser-is-running-on-an-android-or-ios-device
var isMobile = {
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

//Test for SVG support and polyfill if no. https://css-tricks.com/svg-sprites-use-better-icon-fonts/
/MSIE|Trident/.test(navigator.userAgent) && document.addEventListener('DOMContentLoaded', function () {
  [].forEach.call(document.querySelectorAll('svg'), function (svg) {
	var use = svg.querySelector('use');

	if (use) {
	  var object = document.createElement('object');
	  object.data = use.getAttribute('xlink:href');
	  object.className = svg.getAttribute('class');
	  svg.parentNode.replaceChild(object, svg);
	}
  });
});

//coderjoe: http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript
function zeroPad (num, numZeros) {
	if( num === 0 ) { return zeroPadNonLog(num,numZeros); }
    var an = Math.abs (num);
    var digitCount = 1 + Math.floor (Math.log (an) / Math.LN10);
    if (digitCount >= numZeros) {
        return num;
    }
    var zeroString = Math.pow (10, numZeros - digitCount).toString ().substr (1);
    return num < 0 ? '-' + zeroString + an : zeroString + an;
}
function zeroPadNonLog(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
}

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
// https://gist.github.com/O-Zone/7230245
(function (window) {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  },
  elem = document.createElement('div');

  for(var t in transitions){
    if(typeof elem.style[t] !== 'undefined'){
      window.transitionEnd = transitions[t];
      break;
    }
  }
})(window);

/*! npm.im/object-fit-images */
var objectFitImages=function(){"use strict";function t(t){for(var e,r=getComputedStyle(t).fontFamily,i={};null!==(e=c.exec(r));)i[e[1]]=e[2];return i}function e(e,i){if(!e[n].parsingSrcset){var s=t(e);if(s["object-fit"]=s["object-fit"]||"fill",!e[n].s){if("fill"===s["object-fit"])return;if(!e[n].skipTest&&l&&!s["object-position"])return}var c=e[n].ios7src||e.currentSrc||e.src;if(i)c=i;else if(e.srcset&&!u&&window.picturefill){var o=window.picturefill._;e[n].parsingSrcset=!0,e[o.ns]&&e[o.ns].evaled||o.fillImg(e,{reselect:!0}),e[o.ns].curSrc||(e[o.ns].supported=!1,o.fillImg(e,{reselect:!0})),delete e[n].parsingSrcset,c=e[o.ns].curSrc||c}if(e[n].s)e[n].s=c,i&&(e[n].srcAttr=i);else{e[n]={s:c,srcAttr:i||f.call(e,"src"),srcsetAttr:e.srcset},e.src=n;try{e.srcset&&(e.srcset="",Object.defineProperty(e,"srcset",{value:e[n].srcsetAttr})),r(e)}catch(t){e[n].ios7src=c}}e.style.backgroundImage='url("'+c+'")',e.style.backgroundPosition=s["object-position"]||"center",e.style.backgroundRepeat="no-repeat",/scale-down/.test(s["object-fit"])?(e[n].i||(e[n].i=new Image,e[n].i.src=c),function t(){return e[n].i.naturalWidth?void(e[n].i.naturalWidth>e.width||e[n].i.naturalHeight>e.height?e.style.backgroundSize="contain":e.style.backgroundSize="auto"):void setTimeout(t,100)}()):e.style.backgroundSize=s["object-fit"].replace("none","auto").replace("fill","100% 100%")}}function r(t){var r={get:function(){return t[n].s},set:function(r){return delete t[n].i,e(t,r),r}};Object.defineProperty(t,"src",r),Object.defineProperty(t,"currentSrc",{get:r.get})}function i(){a||(HTMLImageElement.prototype.getAttribute=function(t){return!this[n]||"src"!==t&&"srcset"!==t?f.call(this,t):this[n][t+"Attr"]},HTMLImageElement.prototype.setAttribute=function(t,e){!this[n]||"src"!==t&&"srcset"!==t?g.call(this,t,e):this["src"===t?"src":t+"Attr"]=String(e)})}function s(t,r){var i=!A&&!t;if(r=r||{},t=t||"img",a&&!r.skipTest)return!1;"string"==typeof t?t=document.querySelectorAll("img"):"length"in t||(t=[t]);for(var c=0;c<t.length;c++)t[c][n]=t[c][n]||r,e(t[c]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&s(t.target,{skipTest:r.skipTest})},!0),A=!0,t="img"),r.watchMQ&&window.addEventListener("resize",s.bind(null,t,{skipTest:r.skipTest}))}var n="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",c=/(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,o=new Image,l="object-fit"in o.style,a="object-position"in o.style,u="string"==typeof o.currentSrc,f=o.getAttribute,g=o.setAttribute,A=!1;return s.supportsObjectFit=l,s.supportsObjectPosition=a,i(),s}();
/*
	Copyright 2015 Axinom
	Copyright 2011-2013 Abdulla Abdurakhmanov
	Original sources are available at https://code.google.com/p/x2js/

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

// This fork is maintained at https://github.com/Axinom/x2js

/*
	Supported export methods:
	* AMD
	* <script> (window.X2JS)
	* Node.js

	Limitations:
	* Attribute namespace prefixes are not parsed as such.
	* Overall the serialization/deserializaton code is "best effort" and not foolproof.
*/

// Module definition pattern used is returnExports from https://github.com/umdjs/umd
(function (root, factory) {
	"use strict";

	/* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but only CommonJS-like
		// environments that support module.exports, like Node.
        module.exports = factory(require("xmldom").DOMParser);
    } else {
        // Browser globals (root is window)
        root.X2JS = factory();
	}
})(this, function (CustomDOMParser) {
	"use strict";

    // We return a constructor that can be used to make X2JS instances.
    return function X2JS(config) {
		var VERSION = "3.1.0";

		config = config || {};

		function initConfigDefaults() {
			// If set to "property" then <element>_asArray will be created
			// to allow you to access any element as an array (even if there is only one of it).
			config.arrayAccessForm = config.arrayAccessForm || "none";

			// If "text" then <empty></empty> will be transformed to "".
			// If "object" then <empty></empty> will be transformed to {}.
			config.emptyNodeForm = config.emptyNodeForm || "text";

			// Allows attribute values to be converted on the fly during parsing to objects.
			// 	"test": function(name, value) { return true; }
			//	"convert": function(name, value) { return parseFloat(value);
			// convert() will be called for every attribute where test() returns true
			// and the return value from convert() will replace the original value of the attribute.
			config.attributeConverters = config.attributeConverters || [];

			// Any elements that match the paths here will have their text parsed
			// as an XML datetime value (2011-11-12T13:00:00-07:00 style).
			// The path can be a plain string (parent.child1.child2),
			// a regex (/.*\.child2/) or function(elementPath).
			config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];

			// Any elements that match the paths listed here will be stored in JavaScript objects
			// as arrays even if there is only one of them. The path can be a plain string
			// (parent.child1.child2), a regex (/.*\.child2/) or function(elementName, elementPath).
			config.arrayAccessFormPaths = config.arrayAccessFormPaths || [];

			// If true, a toString function is generated to print nodes containing text or cdata.
			// Useful if you want to accept both plain text and CData as equivalent inputs.
			if (config.enableToStringFunc === undefined) {
				config.enableToStringFunc = true;
			}

			// If true, empty text tags are ignored for elements with child nodes.
			if (config.skipEmptyTextNodesForObj === undefined) {
				config.skipEmptyTextNodesForObj = true;
			}

			// If true, whitespace is trimmed from text nodes.
			if (config.stripWhitespaces === undefined) {
				config.stripWhitespaces = true;
			}

			// If true, double quotes are used in generated XML.
			if (config.useDoubleQuotes === undefined) {
				config.useDoubleQuotes = true;
			}

			// If true, the root element of the XML document is ignored when converting to objects.
			// The result will directly have the root element's children as its own properties.
			if (config.ignoreRoot === undefined) {
				config.ignoreRoot = false;
			}

			// Whether XML characters in text are escaped when reading/writing XML.
			if (config.escapeMode === undefined) {
				config.escapeMode = true;
			}

			// Prefix to use for properties that are created to represent XML attributes.
			if (config.attributePrefix === undefined) {
				config.attributePrefix = "_";
			}

			// If true, empty elements will created as self closing elements (<element />)
			// If false, empty elements will be created with start and end tags (<element></element>)
			if (config.selfClosingElements === undefined) {
				config.selfClosingElements = true;
			}

			// If this property defined as false and an XML element has CData node ONLY, it will be converted to text without additional property "__cdata"
			if (config.keepCData === undefined) {
				config.keepCData = false;
			}
		}

		function initRequiredPolyfills() {
			function pad(number) {
				var r = String(number);
				if (r.length === 1) {
					r = '0' + r;
				}
				return r;
			}
			// Hello IE8-
			if (typeof String.prototype.trim !== 'function') {
				String.prototype.trim = function trim() {
					return this.replace(/^\s+|^\n+|(\s|\n)+$/g, '');
				};
			}
			if (typeof Date.prototype.toISOString !== 'function') {
				// Implementation from http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
				Date.prototype.toISOString = function toISOString() {
					var MS_IN_S = 1000;

					return this.getUTCFullYear()
						+ '-' + pad(this.getUTCMonth() + 1)
						+ '-' + pad(this.getUTCDate())
						+ 'T' + pad(this.getUTCHours())
						+ ':' + pad(this.getUTCMinutes())
						+ ':' + pad(this.getUTCSeconds())
						+ '.' + String((this.getUTCMilliseconds() / MS_IN_S).toFixed(3)).slice(2, 5)
						+ 'Z';
				};
			}
		}

		initConfigDefaults();
		initRequiredPolyfills();

		var DOMNodeTypes = {
			"ELEMENT_NODE": 1,
			"TEXT_NODE": 3,
			"CDATA_SECTION_NODE": 4,
			"COMMENT_NODE": 8,
			"DOCUMENT_NODE": 9
		};

		function getDomNodeLocalName(domNode) {
			var localName = domNode.localName;
			if (localName == null) {
				// Yeah, this is IE!!
				localName = domNode.baseName;
			}
			if (localName == null || localName === "") {
				// ==="" is IE too
				localName = domNode.nodeName;
			}
			return localName;
		}

		function getDomNodeNamespacePrefix(node) {
			return node.prefix;
		}

		function escapeXmlChars(str) {
			if (typeof str === "string")
				return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
			else
				return str;
		}

		function unescapeXmlChars(str) {
			return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
		}

		function ensureProperArrayAccessForm(element, childName, elementPath) {
			switch (config.arrayAccessForm) {
				case "property":
					if (!(element[childName] instanceof Array))
						element[childName + "_asArray"] = [element[childName]];
					else
						element[childName + "_asArray"] = element[childName];
					break;
			}

			if (!(element[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
				var match = false;

				for (var i = 0; i < config.arrayAccessFormPaths.length; i++) {
					var arrayPath = config.arrayAccessFormPaths[i];
					if (typeof arrayPath === "string") {
						if (arrayPath === elementPath) {
							match = true;
							break;
						}
					} else if (arrayPath instanceof RegExp) {
						if (arrayPath.test(elementPath)) {
							match = true;
							break;
						}
					} else if (typeof arrayPath === "function") {
						if (arrayPath(childName, elementPath)) {
							match = true;
							break;
						}
					}
				}

				if (match)
					element[childName] = [element[childName]];
			}
		}

		function xmlDateTimeToDate(prop) {
			// Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
			// Improved to support full spec and optional parts
			var MINUTES_PER_HOUR = 60;

			var bits = prop.split(/[-T:+Z]/g);

			var d = new Date(bits[0], bits[1] - 1, bits[2]);
			var secondBits = bits[5].split("\.");
			d.setHours(bits[3], bits[4], secondBits[0]);
			if (secondBits.length > 1)
				d.setMilliseconds(secondBits[1]);

			// Get supplied time zone offset in minutes
			if (bits[6] && bits[7]) {
				var offsetMinutes = bits[6] * MINUTES_PER_HOUR + Number(bits[7]);
				var sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+';

				// Apply the sign
				offsetMinutes = 0 + (sign === '-' ? -1 * offsetMinutes : offsetMinutes);

				// Apply offset and local timezone
				d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset());
			} else if (prop.indexOf("Z", prop.length - 1) !== -1) {
				d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
			}

			// d is now a local time equivalent to the supplied time
			return d;
		}

		function convertToDateIfRequired(value, childName, fullPath) {
			if (config.datetimeAccessFormPaths.length > 0) {
				var pathWithoutTextNode = fullPath.split("\.#")[0];

				for (var i = 0; i < config.datetimeAccessFormPaths.length; i++) {
					var candidatePath = config.datetimeAccessFormPaths[i];
					if (typeof candidatePath === "string") {
						if (candidatePath === pathWithoutTextNode)
							return xmlDateTimeToDate(value);
					} else if (candidatePath instanceof RegExp) {
						if (candidatePath.test(pathWithoutTextNode))
							return xmlDateTimeToDate(value);
					} else if (typeof candidatePath === "function") {
						if (candidatePath(pathWithoutTextNode))
							return xmlDateTimeToDate(value);
					}
				}
			}

			return value;
		}

		function deserializeRootElementChildren(rootElement) {
			var result = {};
			var children = rootElement.childNodes;

			// Alternative for firstElementChild which is not supported in some environments
			for (var i = 0; i < children.length; i++) {
				var child = children.item(i);
				if (child.nodeType === DOMNodeTypes.ELEMENT_NODE) {
					var childName = getDomNodeLocalName(child);

					if (config.ignoreRoot)
						result = deserializeDomChildren(child, childName);
					else
						result[childName] = deserializeDomChildren(child, childName);
				}
			}

			return result;
		}

		function deserializeElementChildren(element, elementPath) {
			var result = {};
			result.__cnt = 0;

			var nodeChildren = element.childNodes;

			// Child nodes.
			for (var iChild = 0; iChild < nodeChildren.length; iChild++) {
				var child = nodeChildren.item(iChild);
				var childName = getDomNodeLocalName(child);

				if (child.nodeType === DOMNodeTypes.COMMENT_NODE)
					continue;

				result.__cnt++;

				// We deliberately do not accept everything falsey here because
				// elements that resolve to empty string should still be preserved.
				if (result[childName] == null) {
					result[childName] = deserializeDomChildren(child, elementPath + "." + childName);
					ensureProperArrayAccessForm(result, childName, elementPath + "." + childName);
				} else {
					if (!(result[childName] instanceof Array)) {
						result[childName] = [result[childName]];
						ensureProperArrayAccessForm(result, childName, elementPath + "." + childName);
					}

					result[childName][result[childName].length] = deserializeDomChildren(child, elementPath + "." + childName);
				}
			}

			// Attributes
			for (var iAttribute = 0; iAttribute < element.attributes.length; iAttribute++) {
				var attribute = element.attributes.item(iAttribute);
				result.__cnt++;

				var adjustedValue = attribute.value;
				for (var iConverter = 0; iConverter < config.attributeConverters.length; iConverter++) {
					var converter = config.attributeConverters[iConverter];
					if (converter.test.call(null, attribute.name, attribute.value))
						adjustedValue = converter.convert.call(null, attribute.name, attribute.value);
				}

				result[config.attributePrefix + attribute.name] = adjustedValue;
			}

			// Node namespace prefix
			var namespacePrefix = getDomNodeNamespacePrefix(element);
			if (namespacePrefix) {
				result.__cnt++;
				result.__prefix = namespacePrefix;
			}

			if (result["#text"]) {
				result.__text = result["#text"];

				if (result.__text instanceof Array) {
					result.__text = result.__text.join("\n");
				}

				if (config.escapeMode)
					result.__text = unescapeXmlChars(result.__text);

				if (config.stripWhitespaces)
					result.__text = result.__text.trim();

				delete result["#text"];

				if (config.arrayAccessForm === "property")
					delete result["#text_asArray"];

				result.__text = convertToDateIfRequired(result.__text, "#text", elementPath + ".#text");
			}

			if (result.hasOwnProperty('#cdata-section')) {
				result.__cdata = result["#cdata-section"];
				delete result["#cdata-section"];

				if (config.arrayAccessForm === "property")
					delete result["#cdata-section_asArray"];
			}

			if (result.__cnt === 1 && result.__text) {
				result = result.__text;
			} else if (result.__cnt === 0 && config.emptyNodeForm === "text") {
				result = '';
			} else if (result.__cnt > 1 && result.__text !== undefined && config.skipEmptyTextNodesForObj) {
				if (config.stripWhitespaces && result.__text === "" || result.__text.trim() === "") {
					delete result.__text;
				}
			}
			delete result.__cnt;
			
			if (!config.keepCData && (!result.hasOwnProperty('__text') && result.hasOwnProperty('__cdata'))) {
				return (result.__cdata ? result.__cdata : '');
			}

			if (config.enableToStringFunc && (result.__text || result.__cdata)) {
				result.toString = function toString() {
					return (this.__text ? this.__text : '') + (this.__cdata ? this.__cdata : '');
				};
			}

			return result;
		}

		function deserializeDomChildren(node, parentPath) {
			if (node.nodeType === DOMNodeTypes.DOCUMENT_NODE) {
				return deserializeRootElementChildren(node);
			} else if (node.nodeType === DOMNodeTypes.ELEMENT_NODE) {
				return deserializeElementChildren(node, parentPath);
			} else if (node.nodeType === DOMNodeTypes.TEXT_NODE || node.nodeType === DOMNodeTypes.CDATA_SECTION_NODE) {
				return node.nodeValue;
			} else {
				return null;
			}
		}

		function serializeStartTag(jsObject, elementName, attributeNames, selfClosing) {
			var resultStr = "<" + ((jsObject && jsObject.__prefix) ? (jsObject.__prefix + ":") : "") + elementName;

			if (attributeNames) {
				for (var i = 0; i < attributeNames.length; i++) {
					var attributeName = attributeNames[i];
					var attributeValue = jsObject[attributeName];

					if (config.escapeMode)
						attributeValue = escapeXmlChars(attributeValue);

					resultStr += " " + attributeName.substr(config.attributePrefix.length) + "=";

					if (config.useDoubleQuotes)
						resultStr += '"' + attributeValue + '"';
					else
						resultStr += "'" + attributeValue + "'";
				}
			}

			if (!selfClosing)
				resultStr += ">";
			else
				resultStr += " />";

			return resultStr;
		}

		function serializeEndTag(jsObject, elementName) {
			return "</" + ((jsObject && jsObject.__prefix) ? (jsObject.__prefix + ":") : "") + elementName + ">";
		}

		function endsWith(str, suffix) {
			return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}

		function isSpecialProperty(jsonObj, propertyName) {
			if ((config.arrayAccessForm === "property" && endsWith(propertyName.toString(), ("_asArray")))
				|| propertyName.toString().indexOf(config.attributePrefix) === 0
				|| propertyName.toString().indexOf("__") === 0
				|| (jsonObj[propertyName] instanceof Function))
				return true;
			else
				return false;
		}

		function getDataElementCount(jsObject) {
			var count = 0;

			if (jsObject instanceof Object) {
				for (var propertyName in jsObject) {
					if (isSpecialProperty(jsObject, propertyName))
						continue;

					count++;
				}
			}

			return count;
		}

		function getDataAttributeNames(jsObject) {
			var names = [];

			if (jsObject instanceof Object) {
				for (var attributeName in jsObject) {
					if (attributeName.toString().indexOf("__") === -1
						&& attributeName.toString().indexOf(config.attributePrefix) === 0) {
						names.push(attributeName);
					}
				}
			}

			return names;
		}

		function serializeComplexTextNodeContents(textNode) {
			var result = "";

			if (textNode.__cdata) {
				result += "<![CDATA[" + textNode.__cdata + "]]>";
			}

			if (textNode.__text) {
				if (config.escapeMode)
					result += escapeXmlChars(textNode.__text);
				else
					result += textNode.__text;
			}

			return result;
		}

		function serializeTextNodeContents(textNode) {
			var result = "";

			if (textNode instanceof Object) {
				result += serializeComplexTextNodeContents(textNode);
			} else if (textNode !== null) {
				if (config.escapeMode)
					result += escapeXmlChars(textNode);
				else
					result += textNode;
			}

			return result;
		}

		function serializeArray(elementArray, elementName, attributes) {
			var result = "";

			if (elementArray.length === 0) {
				result += serializeStartTag(elementArray, elementName, attributes, true);
			} else {
				for (var i = 0; i < elementArray.length; i++) {
					result += serializeJavaScriptObject(elementArray[i], elementName, getDataAttributeNames(elementArray[i]));
				}
			}

			return result;
		}

		function serializeJavaScriptObject(element, elementName, attributes) {
			var result = "";

			if ((element === undefined || element === null || element === '') && config.selfClosingElements) {
				result += serializeStartTag(element, elementName, attributes, true);
			} else if (typeof element === 'object') {
				if (Object.prototype.toString.call(element) === '[object Array]') {
					result += serializeArray(element, elementName, attributes);
				} else if (element instanceof Date) {
					result += serializeStartTag(element, elementName, attributes, false);
					result += element.toISOString();
					result += serializeEndTag(element, elementName);
				} else {
					var childElementCount = getDataElementCount(element);
					if (childElementCount > 0 || element.__text || element.__cdata) {
						result += serializeStartTag(element, elementName, attributes, false);
						result += serializeJavaScriptObjectChildren(element);
						result += serializeEndTag(element, elementName);
					} else if (config.selfClosingElements) {
						result += serializeStartTag(element, elementName, attributes, true);
					} else {
						result += serializeStartTag(element, elementName, attributes, false);
						result += serializeEndTag(element, elementName);
					}
				}
			} else {
				result += serializeStartTag(element, elementName, attributes, false);
				result += serializeTextNodeContents(element);
				result += serializeEndTag(element, elementName);
			}

			return result;
		}

		function serializeJavaScriptObjectChildren(jsObject) {
			var result = "";

			var elementCount = getDataElementCount(jsObject);

			if (elementCount > 0) {
				for (var elementName in jsObject) {
					if (isSpecialProperty(jsObject, elementName))
						continue;

					var element = jsObject[elementName];
					var attributes = getDataAttributeNames(element);

					result += serializeJavaScriptObject(element, elementName, attributes);
				}
			}

			result += serializeTextNodeContents(jsObject);

			return result;
		}

		function parseXml(xml) {
			if (xml === undefined) {
				return null;
			}

			if (typeof xml !== "string") {
				return null;
			}

			var parser = null;
			var domNode = null;

			if (CustomDOMParser) {
				// This branch is used for node.js, with the xmldom parser.
				parser = new CustomDOMParser();

				domNode = parser.parseFromString(xml, "text/xml");
			} else if (window && window.DOMParser) {
				parser = new window.DOMParser();
				var parsererrorNS = null;

				var isIEParser = window.ActiveXObject || "ActiveXObject" in window;

				// IE9+ now is here
				if (!isIEParser) {
					try {
						parsererrorNS = parser.parseFromString("INVALID", "text/xml").childNodes[0].namespaceURI;
					} catch (err) {
						parsererrorNS = null;
					}
				}

				try {
					domNode = parser.parseFromString(xml, "text/xml");
					if (parsererrorNS !== null && domNode.getElementsByTagNameNS(parsererrorNS, "parsererror").length > 0) {
						domNode = null;
					}
				} catch (err) {
					domNode = null;
				}
			} else {
				// IE :(
				if (xml.indexOf("<?") === 0) {
					xml = xml.substr(xml.indexOf("?>") + 2);
				}

				/* global ActiveXObject */
				domNode = new ActiveXObject("Microsoft.XMLDOM");
				domNode.async = "false";
				domNode.loadXML(xml);
			}

			return domNode;
		}

		this.asArray = function asArray(prop) {
			if (prop === undefined || prop === null) {
				return [];
			} else if (prop instanceof Array) {
				return prop;
			} else {
				return [prop];
			}
		};

		this.toXmlDateTime = function toXmlDateTime(dt) {
			if (dt instanceof Date) {
				return dt.toISOString();
			} else if (typeof (dt) === 'number') {
				return new Date(dt).toISOString();
			} else {
				return null;
			}
		};

		this.asDateTime = function asDateTime(prop) {
			if (typeof (prop) === "string") {
				return xmlDateTimeToDate(prop);
			} else {
				return prop;
			}
		};

		/*
			Internally the logic works in a cycle:
			DOM->JS - implemented by custom logic (deserialization).
			JS->XML - implemented by custom logic (serialization).
			XML->DOM - implemented by browser.
		*/

		// Transformns an XML string into DOM-tree
		this.xml2dom = function xml2dom(xml) {
			return parseXml(xml);
		};

		// Transforms a DOM tree to JavaScript objects.
		this.dom2js = function dom2js(domNode) {
			return deserializeDomChildren(domNode, null);
		};

		// Transforms JavaScript objects to a DOM tree.
		this.js2dom = function js2dom(jsObject) {
			var xml = this.js2xml(jsObject);
			return parseXml(xml);
		};

		// Transformns an XML string into JavaScript objects.
		this.xml2js = function xml2js(xml) {
			var domNode = parseXml(xml);
			if (domNode != null)
				return this.dom2js(domNode);
			else
				return null;
		};

		// Transforms JavaScript objects into an XML string.
		this.js2xml = function js2xml(jsObject) {
			return serializeJavaScriptObjectChildren(jsObject);
		};

		this.getVersion = function getVersion() {
			return VERSION;
		};
	};
});

/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );

/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
//
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
//
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
//
// About: Known issues
//
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
//
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
//
// Also note that should a browser natively support the window.onhashchange
// event, but not report that it does, the fallback polling loop will be used.
//
// About: Release History
//
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.

  // Reused string.
  var str_hashchange = 'hashchange',

    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,

    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );

  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };

  // Method: jQuery.fn.hashchange
  //
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  //
  // Usage:
  //
  // > jQuery(window).hashchange( [ handler ] );
  //
  // Arguments:
  //
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  //
  // Returns:
  //
  //  (jQuery) The initial jQuery collection of elements.

  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };

  // Property: jQuery.fn.hashchange.delay
  //
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.

  // Property: jQuery.fn.hashchange.domain
  //
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  //
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  //
  // Usage:
  //
  // jQuery.fn.hashchange.domain = document.domain;

  // Property: jQuery.fn.hashchange.src
  //
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  //
  // Usage:
  //
  // jQuery.fn.hashchange.src = 'path/to/file.html';

  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */

  // Event: hashchange event
  //
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  //
  // Usage as described in <jQuery.fn.hashchange>:
  //
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // >
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  //
  // A more verbose usage that allows for event namespacing:
  //
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // >
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  //
  // Additional Notes:
  //
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.

  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {

    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }

      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },

    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }

      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }

  });

  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,

      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),

      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;

    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };

    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };

    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );

      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );

        $(window).trigger( str_hashchange );

      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }

      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };

    //// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    //// vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    //// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    //$.browser.msie && !supports_onhashchange && (function(){
      //// Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      //// when running in "IE7 compatibility" mode.

      //var iframe,
        //iframe_src;

      //// When the event is bound and polling starts in IE 6/7, create a hidden
      //// Iframe for history handling.
      //self.start = function(){
        //if ( !iframe ) {
          //iframe_src = $.fn[ str_hashchange ].src;
          //iframe_src = iframe_src && iframe_src + get_fragment();

          //// Create hidden Iframe. Attempt to make Iframe as hidden as possible
          //// by using techniques from http://www.paciellogroup.com/blog/?p=604.
          //iframe = $('<iframe tabindex="-1" title="empty"/>').hide()

            //// When Iframe has completely loaded, initialize the history and
            //// start polling.
            //.one( 'load', function(){
              //iframe_src || history_set( get_fragment() );
              //poll();
            //})

            //// Load Iframe src if specified, otherwise nothing.
            //.attr( 'src', iframe_src || 'javascript:0' )

            //// Append Iframe after the end of the body to prevent unnecessary
            //// initial page scrolling (yes, this works).
            //.insertAfter( 'body' )[0].contentWindow;

          //// Whenever `document.title` changes, update the Iframe's title to
          //// prettify the back/next history menu entries. Since IE sometimes
          //// errors with "Unspecified error" the very first time this is set
          //// (yes, very useful) wrap this with a try/catch block.
          //doc.onpropertychange = function(){
            //try {
              //if ( event.propertyName === 'title' ) {
                //iframe.document.title = doc.title;
              //}
            //} catch(e) {}
          //};

        //}
      //};

      //// Override the "stop" method since an IE6/7 Iframe was created. Even
      //// if there are no longer any bound event handlers, the polling loop
      //// is still necessary for back/next to work at all!
      //self.stop = fn_retval;

      //// Get history by looking at the hidden Iframe's location.hash.
      //history_get = function() {
        //return get_fragment( iframe.location.href );
      //};

      //// Set a new history item by opening and then closing the Iframe
      //// document, *then* setting its location.hash. If document.domain has
      //// been set, update that as well.
      //history_set = function( hash, history_hash ) {
        //var iframe_doc = iframe.document,
          //domain = $.fn[ str_hashchange ].domain;

        //if ( hash !== history_hash ) {
          //// Update Iframe with any initial `document.title` that might be set.
          //iframe_doc.title = doc.title;

          //// Opening the Iframe's document after it has been closed is what
          //// actually adds a history entry.
          //iframe_doc.open();

          //// Set document.domain for the Iframe document as well, if necessary.
          //domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );

          //iframe_doc.close();

          //// Update the Iframe's hash, for great justice.
          //iframe.location.hash = hash;
        //}
      //};

    //})();
    //// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //// ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    //// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    return self;
  })();

})(jQuery,this);

/*!
 * js-logger - http://github.com/jonnyreeves/js-logger
 * Jonny Reeves, http://jonnyreeves.co.uk/
 * js-logger may be freely distributed under the MIT license.
 */
(function (global) {
	"use strict";

	// Top level module for the global, static logger instance.
	var Logger = { };

	// For those that are at home that are keeping score.
	Logger.VERSION = "1.3.0";

	// Function which handles all incoming log messages.
	var logHandler;

	// Map of ContextualLogger instances by name; used by Logger.get() to return the same named instance.
	var contextualLoggersByNameMap = {};

	// Polyfill for ES5's Function.bind.
	var bind = function(scope, func) {
		return function() {
			return func.apply(scope, arguments);
		};
	};

	// Super exciting object merger-matron 9000 adding another 100 bytes to your download.
	var merge = function () {
		var args = arguments, target = args[0], key, i;
		for (i = 1; i < args.length; i++) {
			for (key in args[i]) {
				if (!(key in target) && args[i].hasOwnProperty(key)) {
					target[key] = args[i][key];
				}
			}
		}
		return target;
	};

	// Helper to define a logging level object; helps with optimisation.
	var defineLogLevel = function(value, name) {
		return { value: value, name: name };
	};

	// Predefined logging levels.
	Logger.DEBUG = defineLogLevel(1, 'DEBUG');
	Logger.INFO = defineLogLevel(2, 'INFO');
	Logger.TIME = defineLogLevel(3, 'TIME');
	Logger.WARN = defineLogLevel(4, 'WARN');
	Logger.ERROR = defineLogLevel(8, 'ERROR');
	Logger.OFF = defineLogLevel(99, 'OFF');

	// Inner class which performs the bulk of the work; ContextualLogger instances can be configured independently
	// of each other.
	var ContextualLogger = function(defaultContext) {
		this.context = defaultContext;
		this.setLevel(defaultContext.filterLevel);
		this.log = this.info;  // Convenience alias.
	};

	ContextualLogger.prototype = {
		// Changes the current logging level for the logging instance.
		setLevel: function (newLevel) {
			// Ensure the supplied Level object looks valid.
			if (newLevel && "value" in newLevel) {
				this.context.filterLevel = newLevel;
			}
		},

		// Is the logger configured to output messages at the supplied level?
		enabledFor: function (lvl) {
			var filterLevel = this.context.filterLevel;
			return lvl.value >= filterLevel.value;
		},

		debug: function () {
			this.invoke(Logger.DEBUG, arguments);
		},

		info: function () {
			this.invoke(Logger.INFO, arguments);
		},

		warn: function () {
			this.invoke(Logger.WARN, arguments);
		},

		error: function () {
			this.invoke(Logger.ERROR, arguments);
		},

		time: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'start' ]);
			}
		},

		timeEnd: function (label) {
			if (typeof label === 'string' && label.length > 0) {
				this.invoke(Logger.TIME, [ label, 'end' ]);
			}
		},

		// Invokes the logger callback if it's not being filtered.
		invoke: function (level, msgArgs) {
			if (logHandler && this.enabledFor(level)) {
				logHandler(msgArgs, merge({ level: level }, this.context));
			}
		}
	};

	// Protected instance which all calls to the to level `Logger` module will be routed through.
	var globalLogger = new ContextualLogger({ filterLevel: Logger.OFF });

	// Configure the global Logger instance.
	(function() {
		// Shortcut for optimisers.
		var L = Logger;

		L.enabledFor = bind(globalLogger, globalLogger.enabledFor);
		L.debug = bind(globalLogger, globalLogger.debug);
		L.time = bind(globalLogger, globalLogger.time);
		L.timeEnd = bind(globalLogger, globalLogger.timeEnd);
		L.info = bind(globalLogger, globalLogger.info);
		L.warn = bind(globalLogger, globalLogger.warn);
		L.error = bind(globalLogger, globalLogger.error);

		// Don't forget the convenience alias!
		L.log = L.info;
	}());

	// Set the global logging handler.  The supplied function should expect two arguments, the first being an arguments
	// object with the supplied log messages and the second being a context object which contains a hash of stateful
	// parameters which the logging function can consume.
	Logger.setHandler = function (func) {
		logHandler = func;
	};

	// Sets the global logging filter level which applies to *all* previously registered, and future Logger instances.
	// (note that named loggers (retrieved via `Logger.get`) can be configured independently if required).
	Logger.setLevel = function(level) {
		// Set the globalLogger's level.
		globalLogger.setLevel(level);

		// Apply this level to all registered contextual loggers.
		for (var key in contextualLoggersByNameMap) {
			if (contextualLoggersByNameMap.hasOwnProperty(key)) {
				contextualLoggersByNameMap[key].setLevel(level);
			}
		}
	};

	// Retrieve a ContextualLogger instance.  Note that named loggers automatically inherit the global logger's level,
	// default context and log handler.
	Logger.get = function (name) {
		// All logger instances are cached so they can be configured ahead of use.
		return contextualLoggersByNameMap[name] ||
			(contextualLoggersByNameMap[name] = new ContextualLogger(merge({ name: name }, globalLogger.context)));
	};

	// CreateDefaultHandler returns a handler function which can be passed to `Logger.setHandler()` which will
	// write to the window's console object (if present); the optional options object can be used to customise the
	// formatter used to format each log message.
	Logger.createDefaultHandler = function (options) {
		options = options || {};

		options.formatter = options.formatter || function defaultMessageFormatter(messages, context) {
			// Prepend the logger's name to the log message for easy identification.
			if (context.name) {
				messages.unshift("[" + context.name + "]");
			}
		};

		// Map of timestamps by timer labels used to track `#time` and `#timeEnd()` invocations in environments
		// that don't offer a native console method.
		var timerStartTimeByLabelMap = {};

		// Support for IE8+ (and other, slightly more sane environments)
		var invokeConsoleMethod = function (hdlr, messages) {
			Function.prototype.apply.call(hdlr, console, messages);
		};

		// Check for the presence of a logger.
		if (typeof console === "undefined") {
			return function () { /* no console */ };
		}

		return function(messages, context) {
			// Convert arguments object to Array.
			messages = Array.prototype.slice.call(messages);

			var hdlr = console.log;
			var timerLabel;

			if (context.level === Logger.TIME) {
				timerLabel = (context.name ? '[' + context.name + '] ' : '') + messages[0];

				if (messages[1] === 'start') {
					if (console.time) {
						console.time(timerLabel);
					}
					else {
						timerStartTimeByLabelMap[timerLabel] = new Date().getTime();
					}
				}
				else {
					if (console.timeEnd) {
						console.timeEnd(timerLabel);
					}
					else {
						invokeConsoleMethod(hdlr, [ timerLabel + ': ' +
							(new Date().getTime() - timerStartTimeByLabelMap[timerLabel]) + 'ms' ]);
					}
				}
			}
			else {
				// Delegate through to custom warn/error loggers if present on the console.
				if (context.level === Logger.WARN && console.warn) {
					hdlr = console.warn;
				} else if (context.level === Logger.ERROR && console.error) {
					hdlr = console.error;
				} else if (context.level === Logger.INFO && console.info) {
					hdlr = console.info;
				}

				options.formatter(messages, context);
				invokeConsoleMethod(hdlr, messages);
			}
		};
	};

	// Configure and example a Default implementation which writes to the `window.console` (if present).  The
	// `options` hash can be used to configure the default logLevel and provide a custom message formatter.
	Logger.useDefaults = function(options) {
		Logger.setLevel(options && options.defaultLevel || Logger.DEBUG);
		Logger.setHandler(Logger.createDefaultHandler(options));
	};

	// Export to popular environments boilerplate.
	if (typeof define === 'function' && define.amd) {
		define(Logger);
	}
	else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Logger;
	}
	else {
		Logger._prevLogger = global.Logger;

		Logger.noConflict = function () {
			global.Logger = Logger._prevLogger;
			return Logger;
		};

		global.Logger = Logger;
	}
}(this));

;(function(window){

  var
    // Is Modernizr defined on the global scope
    Modernizr = typeof Modernizr !== "undefined" ? Modernizr : false,

    // Always expect both kinds of event
    buttonPressedEvent = 'touchstart click',

    // List of all animation/transition properties
    // with its animationEnd/transitionEnd event
    animationEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },

    transitionEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'OTransition' : 'oTransitionEnd',
      'msTransition' : 'MSTransitionEnd',
      'transition' : 'transitionend'
    },

    Effeckt = function() {
      this.init();
    };

  // Current version.
  Effeckt.version = '0.0.1';

  // Initialization method
  Effeckt.prototype.init = function() {
    this.buttonPressedEvent = buttonPressedEvent;

    //event trigger after animation/transition end.
    this.transitionEndEventName = Modernizr ? transitionEndEventNames[Modernizr.prefixed('transition')] : getTransitionEndEventNames();
    this.animationEndEventName  = Modernizr ? animationEndEventNames[Modernizr.prefixed('animation')] : getAnimationEndEventNames();
    this.transitionAnimationEndEvent = this.animationEndEventName + ' ' + this.transitionEndEventName;
  };

  Effeckt.prototype.getViewportHeight = function() {

    var docElement = document.documentElement,
      client = docElement['clientHeight'],
      inner = window['innerHeight'];

    if( client < inner )
      return inner;
    else
      return client;
  };

  // Get all the properties for transition/animation end
  function getTransitionEndEventNames() {
    return _getEndEventNames( transitionEndEventNames );
  }

  function getAnimationEndEventNames() {
    return _getEndEventNames( animationEndEventNames );
  }

  function _getEndEventNames(obj) {
    var events = [];

    for ( var eventName in obj ) {
      events.push( obj[ eventName ] );
    }

    return events.join(' ');
  }

  // Creates a Effeckt object.
  window.Effeckt = new Effeckt();

})(this);

/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 *
 * Rewritten for effeckts project
 *
 * Licensed under the MIT license
 */
var Tabs = {

  tabsWrapClass:  '.effeckt-tabs-wrap',
  tabsClass:      '.effeckt-tabs a.effeckt-tab',
  tabContentClass:'.effeckt-tab-content',

  init: function() {

    this.initComponent();
    this.bindUIActions();

  },

  initComponent: function() {

    //keep a reference to this (Tabs) object.
    var self = this;

    $(this.tabsWrapClass).each(function(){

      var $el             = $(this);
      var effect          = $el.data('effeckt-type');
      var tabContents     = $el.find(self.tabContentClass);
      var firstTabContent = tabContents.first();
      var tabs            = $el.find(self.tabsClass);

      tabs.removeClass('active').first().addClass('active');
      tabContents.not(':eq(0)').addClass('effeckt-hide');

      firstTabContent.addClass('effeckt-show');
      tabContents.parent().height(firstTabContent[0].clientHeight);

    });

  },

  bindUIActions: function() {

    //keep a reference to this (Tabs) object.
    var self = this;

    $(this.tabsClass).on( Effeckt.buttonPressedEvent, function(e) {
      e.preventDefault();
      self.showTab(this);
    });

  },

  showTab: function(el) {

    var tab         = $(el);
    var tabsWrap    = tab.parents(this.tabsWrapClass);
    var tabs        = tabsWrap.find(this.tabsClass);
    var tabContents = tabsWrap.find(this.tabContentClass);
    var effect      = tabsWrap.data('effeckt-type');

    //set active to this current clicked tab
    tabs.removeClass('active');
    tab.addClass('active');

    var tabID = tab.data('tab-id');
    var tabContent = tabContents.filter(tabID);

    tabContents.removeClass('effeckt-show').addClass('effeckt-hide');
    tabContent.addClass('effeckt-show');

    //add parent height, just because of position: absolute;
    tabContents.parent().height(tabContent[0].clientHeight);
  }

};

Tabs.init();

/*!
 * clipboard.js v1.6.0
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Clipboard = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (element.matches(selector)) return element;
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],2:[function(require,module,exports){
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":1}],3:[function(require,module,exports){
/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};

},{}],4:[function(require,module,exports){
var is = require('./is');
var delegate = require('delegate');

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;

},{"./is":3,"delegate":2}],5:[function(require,module,exports){
function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;

},{}],6:[function(require,module,exports){
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}],7:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'select'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */
        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        _createClass(ClipboardAction, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = options.action;
                this.emitter = options.emitter;
                this.target = options.target;
                this.text = options.text;
                this.trigger = options.trigger;

                this.selectedText = '';
            }
        }, {
            key: 'initSelection',
            value: function initSelection() {
                if (this.text) {
                    this.selectFake();
                } else if (this.target) {
                    this.selectTarget();
                }
            }
        }, {
            key: 'selectFake',
            value: function selectFake() {
                var _this = this;

                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

                this.removeFake();

                this.fakeHandlerCallback = function () {
                    return _this.removeFake();
                };
                this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

                this.fakeElem = document.createElement('textarea');
                // Prevent zooming on iOS
                this.fakeElem.style.fontSize = '12pt';
                // Reset box model
                this.fakeElem.style.border = '0';
                this.fakeElem.style.padding = '0';
                this.fakeElem.style.margin = '0';
                // Move element out of screen horizontally
                this.fakeElem.style.position = 'absolute';
                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
                // Move element to the same position vertically
                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                this.fakeElem.style.top = yPosition + 'px';

                this.fakeElem.setAttribute('readonly', '');
                this.fakeElem.value = this.text;

                document.body.appendChild(this.fakeElem);

                this.selectedText = (0, _select2.default)(this.fakeElem);
                this.copyText();
            }
        }, {
            key: 'removeFake',
            value: function removeFake() {
                if (this.fakeHandler) {
                    document.body.removeEventListener('click', this.fakeHandlerCallback);
                    this.fakeHandler = null;
                    this.fakeHandlerCallback = null;
                }

                if (this.fakeElem) {
                    document.body.removeChild(this.fakeElem);
                    this.fakeElem = null;
                }
            }
        }, {
            key: 'selectTarget',
            value: function selectTarget() {
                this.selectedText = (0, _select2.default)(this.target);
                this.copyText();
            }
        }, {
            key: 'copyText',
            value: function copyText() {
                var succeeded = void 0;

                try {
                    succeeded = document.execCommand(this.action);
                } catch (err) {
                    succeeded = false;
                }

                this.handleResult(succeeded);
            }
        }, {
            key: 'handleResult',
            value: function handleResult(succeeded) {
                this.emitter.emit(succeeded ? 'success' : 'error', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        }, {
            key: 'clearSelection',
            value: function clearSelection() {
                if (this.target) {
                    this.target.blur();
                }

                window.getSelection().removeAllRanges();
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.removeFake();
            }
        }, {
            key: 'action',
            set: function set() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});

},{"select":5}],8:[function(require,module,exports){
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', './clipboard-action', 'tiny-emitter', 'good-listener'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */
        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        _createClass(Clipboard, [{
            key: 'resolveOptions',
            value: function resolveOptions() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
            }
        }, {
            key: 'listenClick',
            value: function listenClick(trigger) {
                var _this2 = this;

                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                    return _this2.onClick(e);
                });
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                var trigger = e.delegateTarget || e.currentTarget;

                if (this.clipboardAction) {
                    this.clipboardAction = null;
                }

                this.clipboardAction = new _clipboardAction2.default({
                    action: this.action(trigger),
                    target: this.target(trigger),
                    text: this.text(trigger),
                    trigger: trigger,
                    emitter: this
                });
            }
        }, {
            key: 'defaultAction',
            value: function defaultAction(trigger) {
                return getAttributeValue('action', trigger);
            }
        }, {
            key: 'defaultTarget',
            value: function defaultTarget(trigger) {
                var selector = getAttributeValue('target', trigger);

                if (selector) {
                    return document.querySelector(selector);
                }
            }
        }, {
            key: 'defaultText',
            value: function defaultText(trigger) {
                return getAttributeValue('text', trigger);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                this.listener.destroy();

                if (this.clipboardAction) {
                    this.clipboardAction.destroy();
                    this.clipboardAction = null;
                }
            }
        }], [{
            key: 'isSupported',
            value: function isSupported() {
                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];

                var actions = typeof action === 'string' ? [action] : action;
                var support = !!document.queryCommandSupported;

                actions.forEach(function (action) {
                    support = support && !!document.queryCommandSupported(action);
                });

                return support;
            }
        }]);

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});

},{"./clipboard-action":7,"good-listener":4,"tiny-emitter":6}]},{},[8])(8)
});
/*!
 * JavaScript Cookie v2.0.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		var _OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = _OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				value = encodeURIComponent(String(value));
				value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
					attributes.path    && '; path=' + attributes.path,
					attributes.domain  && '; domain=' + attributes.domain,
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var name = parts[0].replace(rdecode, decodeURIComponent);
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.get = api.set = api;
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init();
}));

/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//
var global = this,
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    if (nodecrypto) { return tostring(nodecrypto.randomBytes(width)); }
    var out = new Uint8Array(width);
    (global.crypto || global.msCrypto).getRandomValues(out);
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

'use strict';

/**
 * jsOnlyLightbox 0.5.5
 * Copyright © 2014 Felix Hagspiel - http://jslightbox.felixhagspiel.de
 *
 * @license MIT
 * - Free for use in both personal and commercial projects
 */
/* exported Lightbox */
function Lightbox() {

  /**
   * Constants
   */
  var _const_name = 'jslghtbx';
  var _const_class_prefix = _const_name;
  var _const_id_prefix = _const_name;
  var _const_dataattr = 'data-' + _const_name;
  /**
   * Private vars
   */
  var CTX = this,
    isIE8 = false,
    isIE9 = false,
    body = document.getElementsByTagName('body')[0],
    template = '<div class="' + _const_name + '-contentwrapper" id="' + _const_name + '-contentwrapper" ></div>',
    imgRatio = false, // ratio of current image
    currGroup = false, // current group
    currThumbnail = false, // first clicked thumbnail
    currImage = {}, // currently shown image
    currImages = [], // images belonging to current group
    isOpen = false, // check if box is open
    animationEl, // reference to animation-element
    animationInt, // animation-interval
    animationChildren = [], // childs to animate
    animationTimeout, // timeout until animation starts
  // controls
    nextBtn = false,
    prevBtn = false,
  // resize-vars
    maxWidth,
    maxHeight,
    newImgWidth,
    newImgHeight;

  /*
   *   Public attributes
   */
  CTX.opt = {};
  CTX.box = false;
  CTX.wrapper = false;
  CTX.thumbnails = [];

  /**
   * Private methods
   */

  /**
   * Get correct height in IE8
   * @return {number}
   */
  function getHeight() {
    return window.innerHeight || document.documentElement.offsetHeight;
  }

  /**
   * Get correct width in IE8
   * @return {number}
   */
  function getWidth() {
    return window.innerWidth || document.documentElement.offsetWidth;
  }

  /**
   * Adds eventlisteners cross browser
   * @param {Object}   el       The element which gets the listener
   * @param {String}   e        The event type
   * @param {Function} callback The action to execute on event
   * @param {Boolean}  capture      The capture mode
   */
  function addEvent(el, e, callback, capture) {
    if (el.addEventListener) {
      el.addEventListener(e, callback, capture || false);
    } else if (el.attachEvent) {
      el.attachEvent('on' + e, callback);
    }
  }

  /**
   * Checks if element has a specific class
   * @param  {Object}  el        [description]
   * @param  {String}  className [description]
   * @return {Boolean}           [description]
   */
  function hasClass(el, className) {
    if (!el || !className) {
      return;
    }
    return (new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className));
  }

  /**
   * Removes class from element
   * @param  {Object} el
   * @param  {String} className
   * @return {Object}
   */
  function removeClass(el, className) {
    if (!el || !className) {
      return;
    }
    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)'), '');
    return el;
  }

  /**
   * Adds class to element
   * @param  {Object} el
   * @param  {String} className
   * @return {Object}
   */
  function addClass(el, className) {
    if (!el || !className) {
      return;
    }
    if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
    return el;
  }

  /**
   * Checks if obj is set
   * @param  {Object} obj
   * @return {Boolean}
   */
  function isset(obj) {
    return typeof obj !== 'undefined';

  }

  /**
   * Get attribute value cross-browser. Returns the attribute as string if found,
   * otherwise returns false
   * @param  {Object} obj
   * @param  {String} attr
   * @return {boolean || string}
   */
  function getAttr(obj, attr) {
    if (!obj || !isset(obj)) {
      return false;
    }
    var ret;
    if (obj.getAttribute) {
      ret = obj.getAttribute(attr);
    }
    else if (obj.getAttributeNode) {
      ret = obj.getAttributeNode(attr).value;
    }
    if (isset(ret) && ret !== '') {
      return ret;
    }
    return false;
  }

  /**
   * Checks if element has attribute cross-browser
   * @param  {Object}  obj
   * @param  {String}  attr
   * @return {Boolean}
   */
  function hasAttr(obj, attr) {
    if (!obj || !isset(obj)) {
      return false;
    }
    var ret;
    if (obj.getAttribute) {
      ret = obj.getAttribute(attr);
    }
    else if (obj.getAttributeNode) {
      ret = obj.getAttributeNode(attr).value;
    }
    return typeof ret === 'string';

  }

  /**
   * Adds clickhandlers to thumbnails
   * @param  {Object} i
   */
  function clckHlpr(i) {
    addEvent(i, 'click', function (e) {
      stopPropagation(e);
      preventDefault(e);
      currGroup = getAttr(i, _const_dataattr + '-group') || false;
      currThumbnail = i;
      openBox(i, false, false, false);
    }, false);
  }

  /**
   * Stop event propagation cross browser
   * @param  {Object} e
   */
  function stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    else {
      e.returnValue = false;
    }
  }

  /**
   * Prevent default cross browser
   * @param  {Object} e
   */
  function preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    else {
      e.returnValue = false;
    }
  }


  /**
   * Get thumbnails by group
   * @param  {String} group
   * @return {Object}       Array containing the thumbnails
   */
  function getByGroup(group) {
    var arr = [];
    for (var i = 0; i < CTX.thumbnails.length; i++) {
      if (getAttr(CTX.thumbnails[i], _const_dataattr + '-group') === group) {
        arr.push(CTX.thumbnails[i]);
      }
    }
    return arr;
  }

  /**
   * Get the position of thumbnail in group-array
   * @param  {Object} thumbnail
   * @param  {String} group
   * @return {number}
   */
  function getPos(thumbnail, group) {
    var arr = getByGroup(group);
    for (var i = 0; i < arr.length; i++) {
      // compare elements
      if (getAttr(thumbnail, 'src') === getAttr(arr[i], 'src') &&
        getAttr(thumbnail, _const_dataattr + '-index') === getAttr(arr[i], _const_dataattr + '-index') &&
        getAttr(thumbnail, _const_dataattr) === getAttr(arr[i], _const_dataattr)) {

        return i;
      }
    }
  }

  /**
   * Preloads next and prev images
   */
  function preload() {
    if (!currGroup) {
      return;
    }
    var prev = new Image();
    var next = new Image();
    var pos = getPos(currThumbnail, currGroup);
    if (pos === (currImages.length - 1)) {
      // last image in group, preload first image and the one before
      prev.src = getAttr(currImages[currImages.length - 1], _const_dataattr) || currImages[currImages.length - 1].src;
      next.src = getAttr(currImages[0].src, _const_dataattr) || currImages[0].src;
    } else if (pos === 0) {
      // first image in group, preload last image and the next one
      prev.src = getAttr(currImages[currImages.length - 1], _const_dataattr) || currImages[currImages.length - 1].src;
      next.src = getAttr(currImages[1], _const_dataattr) || currImages[1].src;
    } else {
      // in between, preload prev & next image
      prev.src = getAttr(currImages[pos - 1], _const_dataattr) || currImages[pos - 1].src;
      next.src = getAttr(currImages[pos + 1], _const_dataattr) || currImages[pos + 1].src;
    }
  }

  /**
   * Starts the loading animation
   */
  function startAnimation() {
    if (isIE8) {
      return;
    }
    // stop any already running animations
    stopAnimation();
    var fnc = function () {
      addClass(CTX.box, _const_class_prefix + '-loading');
      if (!isIE9 && typeof CTX.opt.loadingAnimation === 'number') {
        var index = 0;
        animationInt = setInterval(function () {
          addClass(animationChildren[index], _const_class_prefix + '-active');
          setTimeout(function () {
            removeClass(animationChildren[index], _const_class_prefix + '-active');
          }, CTX.opt.loadingAnimation);
          index = index >= animationChildren.length ? 0 : index += 1;
        }, CTX.opt.loadingAnimation);
      }
    };
    // set timeout to not show loading animation on fast connections
    animationTimeout = setTimeout(fnc, 500);
  }

  /**
   * Stops the animation
   */
  function stopAnimation() {
    if (isIE8) {
      return;
    }
    // hide animation-element
    removeClass(CTX.box, _const_class_prefix + '-loading');
    // stop animation
    if (!isIE9 && typeof CTX.opt.loadingAnimation !== 'string' && CTX.opt.loadingAnimation) {
      clearInterval(animationInt);
      // do not use animationChildren.length here due to IE8/9 bugs
      for (var i = 0; i < animationChildren.length; i++) {
        removeClass(animationChildren[i], _const_class_prefix + '-active');
      }
    }
  }

  /**
   * Initializes the control arrows
   */
  function initControls() {
    if (!nextBtn) {
      // create & append next-btn
      nextBtn = document.createElement('span');
      addClass(nextBtn, _const_class_prefix + '-next');

      // add custom images
      if (CTX.opt.nextImg) {
        var nextBtnImg = document.createElement('img');
        nextBtnImg.setAttribute('src', CTX.opt.nextImg);
        nextBtn.appendChild(nextBtnImg);
      } else {
        addClass(nextBtn, _const_class_prefix + '-no-img');
      }
      addEvent(nextBtn, 'click', function (e) {
        stopPropagation(e); // prevent closing of lightbox
        CTX.next();
      }, false);
      CTX.box.appendChild(nextBtn);
    }
    addClass(nextBtn, _const_class_prefix + '-active');
    if (!prevBtn) {
      // create & append next-btn
      prevBtn = document.createElement('span');
      addClass(prevBtn, _const_class_prefix + '-prev');

      // add custom images
      if (CTX.opt.prevImg) {
        var prevBtnImg = document.createElement('img');
        prevBtnImg.setAttribute('src', CTX.opt.prevImg);
        prevBtn.appendChild(prevBtnImg);
      } else {
        addClass(prevBtn, _const_class_prefix + '-no-img');
      }
      addEvent(prevBtn, 'click', function (e) {
        stopPropagation(e); // prevent closing of lightbox
        CTX.prev();
      }, false);
      CTX.box.appendChild(prevBtn);
    }
    addClass(prevBtn, _const_class_prefix + '-active');
  }

  /**
   * Moves controls to correct position
   */
  function repositionControls() {
    if (CTX.opt.responsive && nextBtn && prevBtn) {
      var btnTop = (getHeight() / 2) - (nextBtn.offsetHeight / 2);
      nextBtn.style.top = btnTop + 'px';
      prevBtn.style.top = btnTop + 'px';
    }
  }

  /**
   * Sets options and defaults
   * @param {Object} opt
   */
  function setOpt(opt) {
    // set options
    if (!opt) {
      opt = {};
    }

    /**
     * Sets the passed value per default to true if not given
     * @param {Object || String || Number || Boolean || ...} val
     * @returns {Boolean}
     */
    function setTrueDef(val) {
      return typeof val === 'boolean' ? val : true;
    }

    CTX.opt = {
      // options
      boxId: opt.boxId || false,
      controls: setTrueDef(opt.controls),
      dimensions: setTrueDef(opt.dimensions),
      captions: setTrueDef(opt.captions),
      prevImg: typeof opt.prevImg === 'string' ? opt.prevImg : false,
      nextImg: typeof opt.nextImg === 'string' ? opt.nextImg : false,
      hideCloseBtn: opt.hideCloseBtn || false,
      closeOnClick: typeof opt.closeOnClick === 'boolean' ? opt.closeOnClick : true,
      loadingAnimation: opt.loadingAnimation === undefined ? true : opt.loadingAnimation,
      animElCount: opt.animElCount || 4,
      preload: setTrueDef(opt.preload),
      carousel: setTrueDef(opt.carousel),
      animation: typeof opt.animation === 'number' || opt.animation === false ? opt.animation : 400,
      nextOnClick: setTrueDef(opt.nextOnClick),
      responsive: setTrueDef(opt.responsive),
      maxImgSize: opt.maxImgSize || 0.8,
      keyControls: setTrueDef(opt.keyControls),
      hideOverflow: opt.hideOverflow || true,
      // callbacks
      onopen: opt.onopen || false,
      onclose: opt.onclose || false,
      onload: opt.onload || false,
      onresize: opt.onresize || false,
      onloaderror: opt.onloaderror || false
    };

    // load box in custom element
    if (CTX.opt.boxId) {
      CTX.box = document.getElementById(CTX.opt.boxId);
      // set class if missing
      var classes = CTX.box.getAttribute('class');
      if (classes.search(_const_class_prefix + ' ') < 0) {
        CTX.box.setAttribute('class', classes + ' ' + _const_class_prefix);
      }
    }
    // create box element if no ID is given and element is not there
    else if (!CTX.box) {
      // check if there already exists a jslghtbx-div
      var newEl = document.getElementById(_const_id_prefix);
      if (!newEl) {
        newEl = document.createElement('div');
      }
      newEl.setAttribute('id', _const_id_prefix);
      newEl.setAttribute('class', _const_class_prefix);
      CTX.box = newEl;
      body.appendChild(CTX.box);
    }
    CTX.box.innerHTML = template;
    if (isIE8) {
      addClass(CTX.box, _const_class_prefix + '-ie8');
    }
    CTX.wrapper = document.getElementById(_const_id_prefix + '-contentwrapper');

    // init regular closebutton
    if (!CTX.opt.hideCloseBtn) {
      var closeBtn = document.createElement('span');
      closeBtn.setAttribute('id', _const_id_prefix + '-close');
      closeBtn.setAttribute('class', _const_class_prefix + '-close');
      closeBtn.innerHTML = 'X';
      CTX.box.appendChild(closeBtn);
      addEvent(closeBtn, 'click', function (e) {
        stopPropagation(e);
        CTX.close();
      }, false);
    }

    // close lightbox on background-click by default / if true
    if (!isIE8 && CTX.opt.closeOnClick) {
      addEvent(CTX.box, 'click', function (e) {
        stopPropagation(e);
        CTX.close();
      }, false);
    }

    // set loading animation
    if (typeof CTX.opt.loadingAnimation === 'string') {
      // set loading GIF
      animationEl = document.createElement('img');
      animationEl.setAttribute('src', CTX.opt.loadingAnimation);
      addClass(animationEl, _const_class_prefix + '-loading-animation');
      CTX.box.appendChild(animationEl);
    } else if (CTX.opt.loadingAnimation) {
      // set default animation time
      CTX.opt.loadingAnimation = typeof CTX.opt.loadingAnimation === 'number' ? CTX.opt.loadingAnimation : 200;
      // create animation elements
      animationEl = document.createElement('div');
      addClass(animationEl, _const_class_prefix + '-loading-animation');
      var i = 0;
      while (i < CTX.opt.animElCount) {
        animationChildren.push(animationEl.appendChild(document.createElement('span')));
        i++;
      }
      CTX.box.appendChild(animationEl);
    }

    // add resize-eventhandlers
    if (CTX.opt.responsive) {
      addEvent(window, 'resize', function () {
        CTX.resize();
      }, false);
      addClass(CTX.box, _const_class_prefix + '-nooverflow'); // hide scrollbars on prev/next
    }
    else {
      removeClass(CTX.box, _const_class_prefix + '-nooverflow');
    }

    // add keyboard event handlers
    if (CTX.opt.keyControls) {
      addEvent(document, 'keydown', function (e) {
        if (isOpen) {
          stopPropagation(e); // prevent closing of lightbox
          if (e.keyCode === 39) {
            // show next img on right cursor
            CTX.next();
          } else if (e.keyCode === 37) {
            // show prev img on left cursor
            CTX.prev();
          } else if (e.keyCode === 27) {
            // close lightbox on ESC
            CTX.close();
          }
        }
      }, false);
    }
  }

  /**
   * Opens the lightbox. Either @param el and @param group must be given,
   * but not both together!
   * @param  {Object || String}   el      an image element or a link to an image
   * @param  {String}   group       the name of an image group
   * @param  {Function} cb          A private callback
   * @param  {Object} event
   */
  function openBox(el, group, cb, event) {
    if (!el && !group) {
      return false;
    }
    // save images from group
    currGroup = group || currGroup || getAttr(el, _const_dataattr + '-group');
    if (currGroup) {
      currImages = getByGroup(currGroup);
      if (typeof el === 'boolean' && !el) {
        // el is set to false, load first image of group
        el = currImages[0];
      }
    }

    // create new img-element
    currImage.img = new Image();

    // set el as current thumbnail
    currThumbnail = el;

    // get correct image-source
    var src;
    if (typeof el === 'string') {
      // string with img-src given
      src = el;
    }
    else if (getAttr(el, _const_dataattr)) {
      // image-source given
      src = getAttr(el, _const_dataattr);
    }
    else {
      // no image-source given
      src = getAttr(el, 'src');
    }
    // clear old image ratio for proper resize-values
    imgRatio = false;

    // add init-class on opening, but not at prev/next
    if (!isOpen) {
      if (typeof CTX.opt.animation === 'number') {
        addClass(currImage.img, _const_class_prefix + '-animate-transition ' + _const_class_prefix + '-animate-init');
      }
      isOpen = true;

      // execute open callback
      if (CTX.opt.onopen) {
        CTX.opt.onopen(currImage);
      }
    }

    // hide overflow by default / if set
    if (!CTX.opt || !isset(CTX.opt.hideOverflow) || CTX.opt.hideOverflow) {
      body.setAttribute('style', 'overflow: hidden');
    }

    CTX.box.setAttribute('style', 'padding-top: 0');
    CTX.wrapper.innerHTML = '';
    CTX.wrapper.appendChild(currImage.img);
    // set animation class
    if (CTX.opt.animation) {
      addClass(CTX.wrapper, _const_class_prefix + '-animate');
    }
    // set caption
    var captionText = getAttr(el, _const_dataattr + '-caption');
    if (captionText && CTX.opt.captions) {
      var caption = document.createElement('p');
      caption.setAttribute('class', _const_class_prefix + '-caption');
      caption.innerHTML = captionText;
      CTX.wrapper.appendChild(caption);
    }

    addClass(CTX.box, _const_class_prefix + '-active');

    // show wrapper early to avoid bug where dimensions are not
    // correct in IE8
    if (isIE8) {
      addClass(CTX.wrapper, _const_class_prefix + '-active');
    }
    if (CTX.opt.controls && currImages.length > 1) {
      initControls();
      repositionControls();
    }

    /**
     * Onerror-handler for the image
     */
    currImage.img.onerror = function (imageErrorEvent) {
      if (CTX.opt.onloaderror) {
        // if `event` is false, error happened on opening the box
        imageErrorEvent._happenedWhile = event ? event : false;
        CTX.opt.onloaderror(imageErrorEvent);
      }
    };
    /**
     * Onload-handler for the image
     */
    currImage.img.onload = function () {
      // store original width here
      currImage.originalWidth = this.naturalWidth || this.width;
      currImage.originalHeight = this.naturalHeight || this.height;
      // use dummyimage for correct dimension calculating in older IE
      if (isIE8 || isIE9) {
        var dummyImg = new Image();
        dummyImg.setAttribute('src', src);
        currImage.originalWidth = dummyImg.width;
        currImage.originalHeight = dummyImg.height;
      }
      // interval to check if image is ready to show
      var checkClassInt = setInterval(function () {
        if (hasClass(CTX.box, _const_class_prefix + '-active')) {
          addClass(CTX.wrapper, _const_class_prefix + '-wrapper-active');
          // set animation
          if (typeof CTX.opt.animation === 'number') {
            addClass(currImage.img, _const_class_prefix + '-animate-transition');
          }
          if (cb) {
            cb();
          }
          // stop Animation
          stopAnimation();
          // clear animation timeout
          clearTimeout(animationTimeout);
          // preload previous and next image
          if (CTX.opt.preload) {
            preload();
          }
          // set clickhandler on image to show next image
          if (CTX.opt.nextOnClick) {
            // add cursor pointer
            addClass(currImage.img, _const_class_prefix + '-next-on-click');
            addEvent(currImage.img, 'click', function (e) {
              stopPropagation(e);
              CTX.next();
            }, false);
          }
          // execute onload callback
          if (CTX.opt.onload) {
            CTX.opt.onload(event);
          }
          // stop current interval
          clearInterval(checkClassInt);
          // resize the image
          CTX.resize();
        }
      }, 10);
    };

    // set src
    currImage.img.setAttribute('src', src);

    // start loading animation
    startAnimation();
  }

  /*
   *   Public methods
   */

  /**
   * Init-function, must be called once
   * @param  {Object} opt Custom options
   */
  CTX.load = function (opt) {
    // check for IE8
    if (navigator.appVersion.indexOf('MSIE 8') > 0) {
      isIE8 = true;
    }

    // check for IE9
    if (navigator.appVersion.indexOf('MSIE 9') > 0) {
      isIE9 = true;
    }

    // set options
    setOpt(opt);

    // Find all elements with `data-jslghtbx` attribute & add clickhandlers
    var arr = document.querySelectorAll('[' + _const_dataattr + ']');
    for (var i = 0; i < arr.length; i++) {
      if (hasAttr(arr[i], _const_dataattr)) {
        // set index to get proper position in getPos()
        arr[i].setAttribute(_const_dataattr + '-index', i);
        CTX.thumbnails.push(arr[i]);
        clckHlpr(arr[i]);
      }
    }

  };

  /**
   * Public caller for openBox()
   * @param  {Object || string} el  Image element or a link
   * @param  {String} group
   */
  CTX.open = function (el, group) {
    // if image and group are given, set group to false
    // to prevent errors
    if (el && group) {
      group = false;
    }
    openBox(el, group, false, false);
  };

  /**
   * Calculates the new image size and resizes it
   */
  CTX.resize = function () {
    if (!currImage.img) {
      return;
    }
    maxWidth = getWidth();
    maxHeight = getHeight();
    var boxWidth = CTX.box.offsetWidth;
    var boxHeight = CTX.box.offsetHeight;
    if (!imgRatio && currImage.img && currImage.img.offsetWidth && currImage.img.offsetHeight) {
      imgRatio = currImage.img.offsetWidth / currImage.img.offsetHeight;
    }

    // Height of image is too big to fit in viewport
    if (Math.floor(boxWidth / imgRatio) > boxHeight) {
      newImgWidth = boxHeight * imgRatio;
      newImgHeight = boxHeight;
    }
    // Width of image is too big to fit in viewport
    else {
      newImgWidth = boxWidth;
      newImgHeight = boxWidth / imgRatio;
    }
    // decrease size with modifier
    newImgWidth = Math.floor(newImgWidth * CTX.opt.maxImgSize);
    newImgHeight = Math.floor(newImgHeight * CTX.opt.maxImgSize);

    // check if image exceeds maximum size
    if (CTX.opt.dimensions && newImgHeight > currImage.originalHeight ||
      CTX.opt.dimensions && newImgWidth > currImage.originalWidth) {
      newImgHeight = currImage.originalHeight;
      newImgWidth = currImage.originalWidth;
    }
    currImage.img.setAttribute('width', newImgWidth);
    currImage.img.setAttribute('height', newImgHeight);
    currImage.img.setAttribute('style', 'margin-top:' + ((getHeight() - newImgHeight) / 2) + 'px');

    // reposition controls after timeout
    setTimeout(repositionControls, 200);

    // execute resize callback
    if (CTX.opt.onresize) {
      CTX.opt.onresize(currImage);
    }
  };

  /**
   * Loads the next image
   */
  CTX.next = function () {
    if (!currGroup) {
      return;
    }
    // get position of next image
    var pos = getPos(currThumbnail, currGroup) + 1;
    if (currImages[pos]) {
      currThumbnail = currImages[pos];
    }
    else if (CTX.opt.carousel) {
      currThumbnail = currImages[0];
    }
    else {
      return;
    }
    if (typeof CTX.opt.animation === 'number') {
      removeClass(currImage.img, _const_class_prefix + '-animating-next');
      setTimeout(function () {
        var cb = function () {
          setTimeout(function () {
            addClass(currImage.img, _const_class_prefix + '-animating-next');
          }, CTX.opt.animation / 2);
        };
        openBox(currThumbnail, false, cb, 'next');
      }, CTX.opt.animation / 2);
    }
    else {
      openBox(currThumbnail, false, false, 'next');
    }
  };

  /**
   * Loads the prev image
   */
  CTX.prev = function () {
    if (!currGroup) {
      return;
    }
    // get position of prev image
    var pos = getPos(currThumbnail, currGroup) - 1;
    if (currImages[pos]) {
      currThumbnail = currImages[pos];
    }
    else if (CTX.opt.carousel) {
      currThumbnail = currImages[currImages.length - 1];
    }
    else {
      return;
    }
    // animation stuff
    if (typeof CTX.opt.animation === 'number') {
      removeClass(currImage.img, _const_class_prefix + '-animating-prev');
      setTimeout(function () {
        var cb = function () {
          setTimeout(function () {
            addClass(currImage.img, _const_class_prefix + '-animating-next');
          }, CTX.opt.animation / 2);
        };
        openBox(currThumbnail, false, cb, 'prev');
      }, CTX.opt.animation / 2);
    }
    else {
      openBox(currThumbnail, false, false, 'prev');
    }
  };

  /**
   * Closes the box
   */
  CTX.close = function () {
    // restore Defaults
    currGroup = false;
    currThumbnail = false;
    var _currImage = currImage;
    currImage = {};
    currImages = [];
    isOpen = false;
    removeClass(CTX.box, _const_class_prefix + '-active');
    removeClass(CTX.wrapper, _const_class_prefix + '-wrapper-active');
    removeClass(nextBtn, _const_class_prefix + '-active');
    removeClass(prevBtn, _const_class_prefix + '-active');
    CTX.box.setAttribute('style', 'padding-top: 0px');

    // stop animtation
    stopAnimation();

    // Hide Lightbox if iE8
    if (isIE8) {
      CTX.box.setAttribute('style', 'display: none');
    }

    // show overflow by default / if set
    if (!CTX.opt || !isset(CTX.opt.hideOverflow) || CTX.opt.hideOverflow) {
      body.setAttribute('style', 'overflow: auto');
    }

    // execute close callback
    if (CTX.opt.onclose) {
      CTX.opt.onclose(_currImage);
    }
  };
}


/* perfect-scrollbar v0.6.10 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ps = require('../main');

if (typeof define === 'function' && define.amd) {
  // AMD
  define(ps);
} else {
  // Add to a global object.
  window.PerfectScrollbar = ps;
  if (typeof window.Ps === 'undefined') {
    window.Ps = ps;
  }
}

},{"../main":7}],2:[function(require,module,exports){
'use strict';

function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return Array.prototype.slice.apply(element.classList);
  } else {
    return element.className.split(' ');
  }
};

},{}],3:[function(require,module,exports){
'use strict';

var DOM = {};

DOM.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;

},{}],4:[function(require,module,exports){
'use strict';

var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;

},{}],5:[function(require,module,exports){
'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

},{}],6:[function(require,module,exports){
'use strict';

var cls = require('./class');
var dom = require('./dom');

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

var clone = exports.clone = function (obj) {
  if (obj === null) {
    return null;
  } else if (obj.constructor === Array) {
    return obj.map(clone);
  } else if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = clone(original);
  for (var key in source) {
    result[key] = clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};

},{"./class":2,"./dom":3}],7:[function(require,module,exports){
'use strict';

var destroy = require('./plugin/destroy');
var initialize = require('./plugin/initialize');
var update = require('./plugin/update');

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};

},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(require,module,exports){
'use strict';

module.exports = {
  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  stopPropagationOnClick: true,
  suppressScrollX: false,
  suppressScrollY: false,
  swipePropagation: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
  theme: 'default'
};

},{}],9:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};

},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  if (i.settings.stopPropagationOnClick) {
    i.event.bind(i.scrollbarY, 'click', stopPropagation);
  }
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var halfOfScrollbarLength = _.toInt(i.scrollbarYHeight / 2);
    var positionTop = i.railYRatio * (e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top - halfOfScrollbarLength);
    var maxPositionTop = i.railYRatio * (i.railYHeight - i.scrollbarYHeight);
    var positionRatio = positionTop / maxPositionTop;

    if (positionRatio < 0) {
      positionRatio = 0;
    } else if (positionRatio > 1) {
      positionRatio = 1;
    }

    updateScroll(element, 'top', (i.contentHeight - i.containerHeight) * positionRatio);
    updateGeometry(element);

    e.stopPropagation();
  });

  if (i.settings.stopPropagationOnClick) {
    i.event.bind(i.scrollbarX, 'click', stopPropagation);
  }
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var halfOfScrollbarLength = _.toInt(i.scrollbarXWidth / 2);
    var positionLeft = i.railXRatio * (e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left - halfOfScrollbarLength);
    var maxPositionLeft = i.railXRatio * (i.railXWidth - i.scrollbarXWidth);
    var positionRatio = positionLeft / maxPositionLeft;

    if (positionRatio < 0) {
      positionRatio = 0;
    } else if (positionRatio > 1) {
      positionRatio = 1;
    }

    updateScroll(element, 'left', ((i.contentWidth - i.containerWidth) * positionRatio) - i.negativeScrollAdjustment);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};

},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};

},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if (e.isDefaultPrevented && e.isDefaultPrevented()) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      // go deeper if element is a webcomponent
      while (activeElement.shadowRoot) {
        activeElement = activeElement.shadowRoot.activeElement;
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      deltaX = -30;
      break;
    case 38: // up
      deltaY = 30;
      break;
    case 39: // right
      deltaX = 30;
      break;
    case 40: // down
      deltaY = -30;
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};

},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, .ps-child:hover');
    if (child) {
      if (child.tagName !== 'TEXTAREA' && !window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};

},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};

},{"../instances":18,"../update-geometry":19}],15:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};

},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  }

  if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};

},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');

// Handlers
var handlers = {
  'click-rail': require('./handler/click-rail'),
  'drag-scrollbar': require('./handler/drag-scrollbar'),
  'keyboard': require('./handler/keyboard'),
  'wheel': require('./handler/mouse-wheel'),
  'touch': require('./handler/touch'),
  'selection': require('./handler/selection')
};
var nativeScrollHandler = require('./handler/native-scroll');

module.exports = function (element, userSettings) {
  userSettings = typeof userSettings === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = _.extend(i.settings, userSettings);
  cls.add(element, 'ps-theme-' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};

},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var defaultSettings = require('./default-setting');
var dom = require('../lib/dom');
var EventManager = require('../lib/event-manager');
var guid = require('../lib/guid');

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = _.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    cls.add(element, 'ps-focus');
  }

  function blur() {
    cls.remove(element, 'ps-focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  if (typeof element.dataset === 'undefined') {
    return element.getAttribute('data-ps-id');
  } else {
    return element.dataset.psId;
  }
}

function setId(element, id) {
  if (typeof element.dataset === 'undefined') {
    element.setAttribute('data-ps-id', id);
  } else {
    element.dataset.psId = id;
  }
}

function removeId(element) {
  if (typeof element.dataset === 'undefined') {
    element.removeAttribute('data-ps-id');
  } else {
    delete element.dataset.psId;
  }
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};

},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateScroll = require('./update-scroll');

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    cls.add(element, 'ps-active-x');
  } else {
    cls.remove(element, 'ps-active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    cls.add(element, 'ps-active-y');
  } else {
    cls.remove(element, 'ps-active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};

},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(require,module,exports){
'use strict';

var instances = require('./instances');

var upEvent = document.createEvent('Event');
var downEvent = document.createEvent('Event');
var leftEvent = document.createEvent('Event');
var rightEvent = document.createEvent('Event');
var yEvent = document.createEvent('Event');
var xEvent = document.createEvent('Event');
var xStartEvent = document.createEvent('Event');
var xEndEvent = document.createEvent('Event');
var yStartEvent = document.createEvent('Event');
var yEndEvent = document.createEvent('Event');
var lastTop;
var lastLeft;

upEvent.initEvent('ps-scroll-up', true, true);
downEvent.initEvent('ps-scroll-down', true, true);
leftEvent.initEvent('ps-scroll-left', true, true);
rightEvent.initEvent('ps-scroll-right', true, true);
yEvent.initEvent('ps-scroll-y', true, true);
xEvent.initEvent('ps-scroll-x', true, true);
xStartEvent.initEvent('ps-x-reach-start', true, true);
xEndEvent.initEvent('ps-x-reach-end', true, true);
yStartEvent.initEvent('ps-y-reach-start', true, true);
yEndEvent.initEvent('ps-y-reach-end', true, true);

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(yStartEvent);
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(xStartEvent);
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    element.scrollTop = value = i.contentHeight - i.containerHeight; // don't allow scroll past container
    element.dispatchEvent(yEndEvent);
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    element.scrollLeft = value = i.contentWidth - i.containerWidth; // don't allow scroll past container
    element.dispatchEvent(xEndEvent);
  }

  if (!lastTop) {
    lastTop = element.scrollTop;
  }

  if (!lastLeft) {
    lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < lastTop) {
    element.dispatchEvent(upEvent);
  }

  if (axis === 'top' && value > lastTop) {
    element.dispatchEvent(downEvent);
  }

  if (axis === 'left' && value < lastLeft) {
    element.dispatchEvent(leftEvent);
  }

  if (axis === 'left' && value > lastLeft) {
    element.dispatchEvent(rightEvent);
  }

  if (axis === 'top') {
    element.scrollTop = lastTop = value;
    element.dispatchEvent(yEvent);
  }

  if (axis === 'left') {
    element.scrollLeft = lastLeft = value;
    element.dispatchEvent(xEvent);
  }

};

},{"./instances":18}],21:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');
var updateScroll = require('./update-scroll');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};

},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]);

// returns click as decimal (.77) of the total object's width
function clickPercent(e,obj) {
	return (e.pageX - obj.getBoundingClientRect().left) / obj.offsetWidth;
}

// Animation functions
function scrollToSmooth(el,targetScroll,duration) {
    // const   scrollHeight = window.scrollY,
	var beginScroll = el.scrollTop,
			beginTime = Date.now();

	Logger.get('animation').info('Beginning animation: '+beginTime+' '+beginScroll+' to '+targetScroll);
    requestAnimationFrame(step);
    function step () {
        setTimeout(function() {
					//Get our time diff to scale against.
					var now = Date.now();

					if ( now <= beginTime + duration) {
						//Queue the next frame ahead of time
						requestAnimationFrame(step);

						//This is probably overcomplicated, but this gets the amount we need to add to the initial scroll for our time
		        var mod = easeInOut( now, beginTime,duration, beginScroll,targetScroll );

						Logger.get("animation").debug('anim: '+ (now-beginTime) +' + '+mod);

						//Set the scroll absolutely
						if( beginScroll < targetScroll ) { el.scrollTop = beginScroll + mod; }
						else { el.scrollTop = beginScroll - mod; }

		      } else {
						//Final frame, don't schedule another.
						Logger.get("animation").debug('Ending animation: end:'+ (now > (beginTime + duration))+' s:'+el.scrollTop);

						el.scrollTop = targetScroll;
		      }
		  	}, 15 );
		}
}
