﻿class CubeBounds {
    BoundingBox: THREE.BoundingBox;
    BoundingShere: THREE.BoundingSphere;
    BoundingBoxHelper: THREE.BoundingBoxHelper;
    Cube: PyriteCube;

    constructor(cube : PyriteCube) {
        this.BoundingBoxHelper = new THREE.BoundingBoxHelper(this.Cube.Obj);
    }

    intersects(ray : THREE.Ray): THREE.Intersection {

        if (this.BoundingBox.maxX != this.BoundingBox.minX &&
            this.BoundingBox.maxY != this.BoundingBox.minY &&
            this.BoundingBox.maxZ != this.BoundingBox.minZ) {
            
        }
        else if (this.BoundingShere.radius != 0) {

        }

        return null;
    }
} 