/* eslint no-unused-vars: ["off", { "args": "none" }]*/

function Dictionary(overwrite) {
	                    this.overwrite = overwrite === true;
	                    const __k = [];
	                    const __v = [];

	                    this.put = function (key, value) {
		                    if (!this.overwrite || __k.indexOf(key) === -1) {
			                    __k.push(key);
			                    __v.push(value);
		}
	};

	                    this.get = function (key) {
		                    const idx = __k.indexOf(key);
		                    if (idx >= 0) {
			                    return __v[idx];
		}
		                    return null;
	};

	                    this.contains = function (key) {
		                    const result = this.get(key);

		                    if (result !== null)
			                    return true;
		                    else
			return false;
	};

	                    this.remove = function (key) {
		                    const i = __k.indexOf(key);
		                    if (i != -1) {
			                    __k.splice(i, 1);
			                    __v.splice(i, 1);
		}
	};

	                    this.clearAll = function (value) {
		                    for (let i = 0; i < __v.length; i++) {
			                    if (__v[i] == value) {
				                    __k.splice(i, 1);
				                    __v.splice(i, 1);
			}
		}
	};

	                    this.iterate = function (func) {
		                    for (let i = 0; i < __k.length; i++) {
			                    func(__k[i], __v[i]);
		}
	};

	                    this.length = function () {
		                    return __v.length;
	};
}
