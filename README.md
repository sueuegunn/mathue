<p align="center">
  <img src="typedoc/favicon.ico" width="200">
</p>
<h1 align="center">mathue</h1>

[![Test](https://github.com/sueuegunn/mathue/actions/workflows/test.yaml/badge.svg?event=push)](https://github.com/sueuegunn/mathue/actions/workflows/test.yaml)
![Coverage](https://img.shields.io/badge/dynamic/json?url=https://gist.githubusercontent.com/sueuegunn/80c9611c9abb9cef2cd1a4064003cb5f/raw/coverage-summary.json&query=$.total.lines.pct&suffix=%&label=Coverage&color=brightgreen)

### TypeScript math library

A library featuring Vector, Matrix and Quaternion classes, specially optimized for WebGL applications.

[Docs](https://sueuegunn.github.io/mathue/index.html)

### Usage

```ts
import {Vector3, Matrix4, Quaternion} from 'mathue';

const v = new Vector3(1, 2, 3);

const axis = new Vector3(0, 0, 1);
const radian = Math.PI / 3;
const q = Quaternion.fromAxisAndRadian(axis, radian);

const m = Matrix4.identity();
m.setQuaternion(q);

v.apply(m);
```