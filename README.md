<p align="center">
  <img src="typedoc/favicon.ico" width="200">
</p>
<h1 align="center">mathue</h1>

[![Test](https://github.com/sueuegunn/mathue/actions/workflows/test.yaml/badge.svg?event=push)](https://github.com/sueuegunn/mathue/actions/workflows/test.yaml)
![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/sueuegunn/80c9611c9abb9cef2cd1a4064003cb5f/raw/badge.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/mathue?colorB=brightgreen)](https://www.npmjs.com/package/mathue)

**A high-performance TypeScript math library specially optimized for WebGL applications.**

Pronounced as **"Matthew"** ( mˈæθjuː ).

<br>

## 🔗 Links

* [Docs](https://sueuegunn.github.io/mathue/index.html)
* [npm](https://www.npmjs.com/package/mathue)

<br>

## 🚀 Why mathue?

Standard math libraries often create new objects for every calculation, causing Garbage Collection (GC) spikes that ruin the performance of real-time rendering loops (60fps+).

**mathue is designed to be "Zero-Allocation" by default.**

<br>

### Key Features

*   **⚡ Zero-Allocation Design**: Minimizes GC overhead by using **mutable operations** (in-place modification) and reusing **static internal temporaries** for complex calculations.
*   **🛠️ Flexible**: While optimized for mutation, every class implements `.clone()` and factory methods (e.g., `.identity()`, `.zero()`) for when you need immutable behavior.
*   **⛓️ Method Chaining**: All mutable methods return `this`, allowing for concise and readable code similar to modern engines.
*   **ts TypeScript First**: Built completely in TypeScript with full type definitions (`.d.ts`) included.
*   **🟢 Standalone**: No external dependencies.

<br>

## 📦 Installation

```bash
npm install mathue
```

<br>

## 📖 Usage

```ts
// Applies matrix to vector
import {Vector3, Matrix4, Quaternion} from 'mathue';

const v = new Vector3(1, 2, 3);

const axis = new Vector3(0, 0, 1);
const angle = Math.PI / 3;
const q = Quaternion.fromAxisAndAngle(axis, angle);

const m = Matrix4.identity();
m.setQuaternion(q);

v.applyMatrix4(m);
```

```ts
// Calculates model matrix
const position = new Vector3(1, 2, 3);
const rotation = Quaternion.identity();
const scale = new Vector3(2, 2, 2);

const model = Matrix4.identity();

model.setIdentity()
  .multiplyTranslation(position)
  .multiplyRotation(rotation)
  .multiplyScale(scale);
```

<br>

## 📚 API Overview

* Vector
  * Vector1
  * Vector2
  * Vector3
  * Vector4  
* Matrix (Column-major order, WebGL compatible)
  * Matrix3
  * Matrix4
* PolarCoordinate3
* Quaternion (For rotation without gimbal lock)

See the [Full Documentation](https://sueuegunn.github.io/mathue/index.html) for details.

<br>

## 📄 License

MIT License

<br>

## 📐 Logo

<p align="center">
  <img src="typedoc/favicon.ico" width="128">
</p>

The logo features **two upward vectors** arranged to form the letter "M".  
Conceptually, the right vector represents the left vector transformed by a Matrix or Quaternion.
