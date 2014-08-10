/*! getCurrAbsPath - v - 2014-08-06
* fsjohnhuang.cnblogs.com
* Copyright (c) 2014 fsjohnhuang; Licensed , ,  */
/*!
 * referrence:
 * http://www.cnblogs.com/rubylouvre/archive/2010/04/06/1705817.html
 * http://www.xuebuyuan.com/165233.html
 */
;(function(exports){
	var doc = exports.document,
		a = {},
		rExtractUri = /(?:http|https|file):\/\/.*?\/.+?.js/,
		isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
	exports.getCurrAbsPath = function(){
		// FF,Chrome
		if (doc.currentScript){
			return doc.currentScript.src;
		}

		var stack;
		try{
			a.b();
		}
		catch(e){
			stack = e.stack || e.stacktrace || e.fileName || e.sourceURL;
		}
		// IE10
		if (stack){
			var absPath = rExtractUri.exec(stack)[0];
			if (absPath){
				return absPath;
			}
		}

		// IE5-9
		for(var scripts = doc.scripts,
			i = scripts.length - 1,
			script; script = scripts[i--];){
			if (script.readyState === 'interactive'){
				// if less than ie 8, must get abs path by getAttribute(src, 4)
				return isLtIE8 ? script.getAttribute('src', 4) : script.src;
			}
		}
	};
}(window));