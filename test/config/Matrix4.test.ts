import { mat4 } from "gl-matrix";
import { describe, it } from "vitest";
import {Matrix4} from '../../src/Matrix4';
import { Vector3 } from "../../src/Vector3";

describe('Matrix4', () => {
  it('', () => {
    // const m = mat4.fromValues(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
    // mat4.multiplyScalar(m, m, 2);
    // mat4.scale(m, m, [2, 3, 4]);
    // console.log(m);
    // console.log('l0:', (m as Float32Array).slice(0, 4));
    // console.log('l1:', (m as Float32Array).slice(4, 8));
    // console.log('l2:', (m as Float32Array).slice(8, 12));
    // console.log('l3:', (m as Float32Array).slice(12, 16));

    // const n = Matrix4.identity();
    // n.setValues(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
    // n.multiplyScalar(2);
    // n.scale(new Vector3(2, 3, 4));
    // console.log(n);
    // console.log('l0:', (n as Float32Array).slice(0, 4));
    // console.log('l1:', (n as Float32Array).slice(4, 8));
    // console.log('l2:', (n as Float32Array).slice(8, 12));
    // console.log('l3:', (n as Float32Array).slice(12, 16));

    const m = mat4.fromValues(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
    mat4.multiply(m, m, m);
    console.log(m);
    console.log('l0:', (m as Float32Array).slice(0, 4));
    console.log('l1:', (m as Float32Array).slice(4, 8));
    console.log('l2:', (m as Float32Array).slice(8, 12));
    console.log('l3:', (m as Float32Array).slice(12, 16));

    const n = Matrix4.identity();
    n.setValues(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
    n.multiply(n);
    console.log(n);
  });
});