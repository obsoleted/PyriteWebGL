/**
 * Micro Cache
 * - a micro library to handle a inmemory cache
 * - works in node and browser.
 *
 * @tags inmemory, keyvalue, cache, node, browser
*/
const MicroCache	= function () {
	                                    const _values	= {};
	                                      let _length = 0;
	                                        return {
		                                        get(key) { return _values[key];	},
		                                        contains(key) { return key in _values;	},
		                                        remove(key) { delete _values[key]; _length--;	},
		                                        set(key, value) {	if (!this.contains(key)) { _length++; } _values[key] = value; },
		                                        values() { return _values;	},
		                                        length() {
			                                        return _length;
		},
		                                        getSet(key, value) {
			                                        if (!this.contains(key)) {
				                                        this.set(key, typeof value == 'function' ? value() : value);
			}
			                                        return this.get(key);
		},
	};
};


// export in common js
if (typeof module !== 'undefined' && ('exports' in module)) {
	                                        module.exports	= MicroCache;
}
