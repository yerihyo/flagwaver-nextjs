import * as THREE from 'three';

import { Side } from '../../constants';
import Flagpole from './Flagpole';
import { createPoleGeometryTypeI } from './utils/FlagpoleGeometryHelpers';

const zAxis = new THREE.Vector3(0, 0, 1);

/**
 * @class OutriggerFlagpole
 */
export default class OutriggerFlagpole extends Flagpole {
    constructor(options) {
        super(options);

        this.top.applyAxisAngle(zAxis, Math.PI * 7 / 4);
    }

    buildGeometry(options) {
        const geometry = createPoleGeometryTypeI(options);

        geometry.rotateZ(Math.PI * 7 / 4);

        return geometry;
    }

    addFlag(flag) {
        flag.unpin();
        flag.pin({ edges: [Side.LEFT] });
        flag.setLengthConstraints(Side.LEFT);
        flag.object.position.add(this.top);
        flag.object.rotateZ(Math.PI * 7 / 4);
    }
}
