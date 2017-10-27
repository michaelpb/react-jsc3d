# React JSC3D

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

React.js component that wraps [JSC3D, a CPU ray tracer for STL and OBJ
files](https://github.com/xxv/jsc3d/tree/master/jsc3d).

Originally built for [OmniConverter - a stateless microservice framework that
creates on-the-fly thumbs and previews of a zillion different
filetypes](http://omnic.michaelb.org/).

![Example screenshot](https://github.com/michaelpb/react-jsc3d/raw/master/public/test-media/example_screenshot.jpg)

# Usage

Install:

```
npm install --save react-jsc3d
```

Use as you would any other React component:

```jsx
import React, { Component } from 'react';
import Jsc3dViewer from 'react-jsc3d';
class Example extends Component {
    render() {
        return (
            <Jsc3dViewer sceneUrl={'/some/path/to/mesh.stl'} />
        );
    }
}
```

# Properties

With the exception of height, width, and mouse, all the props relate directly
to original JSC3D options. Available parameters are, with their original
description from the JSC3D source code:

* **sceneUrl**: *(REQUIRED)* URL string that describes where to load the scene
* **initRotationX**: initial rotation angle around x-axis for the whole scene,
  default to `45`
* **initRotationY**: initial rotation angle around y-axis for the whole scene,
  default to `-45`
* **initRotationZ**: initial rotation angle around z-axis for the whole scene,
  default to `-135`
* **creaseAngle**: an angle to control the shading smoothness between faces.
  Two adjacent faces will be shaded with discontinuity at the edge if the angle
  between their normals exceeds this value. Not used by default
* **modelColor**: fallback color for all meshes, default to `#ffffff`
* **backgroundColor1**: color at the top of the background, default to
  '#ffffff'
* **backgroundColor2**: color at the bottom of the background, default to
  '#ffffff'
* **backgroundImageUrl**: URL string that describes where to load the image
  used for background, default to ''
* **background**: turn on/off rendering of background. If this is
  set to `false`, the background area will be transparent. Default to `false`
* **renderMode**: render mode, default to 'flat'. Available options: `'point',
  'wireframe', 'flat', 'smooth', 'texture', 'textureflat', 'texturesmooth'`
* **faceCulling**: turn on/off back-face culling for all meshes, default to
  `true`
* **definition**: quality level of rendering, default to `"high"`
* **mipMapping**: turn on/off mip-mapping, default to `false`
* **sphereMapUrl**: URL string that describes where to load the image used for
  sphere mapping, default to ''
* **progressBar**: turn on/off the progress bar when loading, default to
  `false`.
* **renderer**: set to 'webgl' to enable WebGL for rendering, default to `'webgl'`.

---

* **mouse**: mouse behavior. Set to `false` to be non-interactive.  Available:
  `false, 'rotate', 'zoom', 'pan'`  (defaults to `'rotate'`)

* **height**: canvas height. Set to `'auto'` to attempt to fill container
  (default).

* **width**: canvas width. Set to `'auto'` to attempt to fill container
  (default).

# Contribution

* [Contribution code of conduct.](CONDUCT.md)

* Like the original JSC3D, react-jsc3d licensed under MIT.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
