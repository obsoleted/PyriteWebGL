import THREE from 'three';
import CTM from './ctm.js';
import Api from '../../../actions/api.js';
/**
 * Loader for CTM encoded models generated by OpenCTM tools:
 *	http://openctm.sourceforge.net/
 *
 * Uses js-openctm library by Juan Mellado
 *	http://code.google.com/p/js-openctm/
 *
 * @author alteredq / http://alteredqualia.com/
 */

THREE.CTMLoader = function (showStatus) {
	                                        THREE.Loader.call(this, showStatus);
};

THREE.CTMLoader.prototype = Object.create(THREE.Loader.prototype);
THREE.CTMLoader.prototype.constructor = THREE.CTMLoader;

// Load CTMLoader compressed models
//	- parameters
//		- url (required)
//		- callback (required)
// 		- cache (boolean)

THREE.CTMLoader.prototype.load = function (url, callback, cache) {
	                                      const scope = this;

	                                        if (cache) {
		                                        THREE.CTMLoader.api.cachedGet(url, 'arraybuffer').then((response) => {
			                                      const binaryData = new Uint8Array(response);
			                                      const stream = new CTM.Stream(binaryData);
			                                      const ctmFile = new CTM.File(stream);

			                                        scope.createModel(ctmFile, callback);
		});
	}
	                                        else {
		                                        THREE.CTMLoader.api.get(url, 'arraybuffer').then((response) => {
			                                      const binaryData = new Uint8Array(response);
			                                      const stream = new CTM.Stream(binaryData);
			                                      const ctmFile = new CTM.File(stream);

			                                        scope.createModel(ctmFile, callback);
		});
	}
};

THREE.CTMLoader.toggleYZ = new THREE.Matrix4();
THREE.CTMLoader.toggleYZ.set(
    1, 0, 0, 0,
    0, 0, 1, 0,
    0, -1, 0, 0,
    0, 0, 0, 1
);


THREE.CTMLoader.api = new Api();

THREE.CTMLoader.prototype.createModel = function (file, callback) {
	                                    const Model = function () {
		                                        THREE.BufferGeometry.call(this);

		                                        this.materials = [];

		                                      let indices = file.body.indices,
			                                        positions = file.body.vertices,
			                                        normals = file.body.normals;

		                                      let uvs, colors;

		                                    const uvMaps = file.body.uvMaps;

		                                        if (uvMaps !== undefined && uvMaps.length > 0) {
			                                        uvs = uvMaps[0].uv;
		}

		                                    const attrMaps = file.body.attrMaps;

		                                        if (attrMaps !== undefined && attrMaps.length > 0 && attrMaps[0].name === 'Color') {
			                                        colors = attrMaps[0].attr;
		}

		                                        this.setIndex(new THREE.BufferAttribute(indices, 1));
		                                        this.addAttribute('position', new THREE.BufferAttribute(positions, 3));

		                                        if (normals !== undefined) {
			                                        this.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
		}

		                                        if (uvs !== undefined) {
			                                        this.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
		}

		                                        if (colors !== undefined) {
			                                        this.addAttribute('color', new THREE.BufferAttribute(colors, 4));
		}
	};

	                                        Model.prototype = Object.create(THREE.BufferGeometry.prototype);
	                                        Model.prototype.constructor = Model;

	                                    const geometry = new Model();

	                                        geometry.applyMatrix(THREE.CTMLoader.toggleYZ);

	// compute vertex normals if not present in the CTM model
	                                        if (geometry.attributes.normal === undefined) {
		                                        geometry.computeVertexNormals();
	}

	                                        callback(geometry);
};
