function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsc3d from '../lib/jsc3d.js';
import './Jsc3dViewer.css';

var JSC3D_PROPS = ['SceneUrl', 'InitRotationX', 'InitRotationY', 'InitRotationZ', 'ModelColor', 'BackgroundColor1', 'BackgroundColor2', 'BackgroundImageUrl', 'Background', 'RenderMode', 'Definition', 'FaceCulling', 'MipMapping', 'CreaseAngle', 'SphereMapUrl', 'ProgressBar', 'Renderer', 'LocalBuffers'];

function lowerFirst(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

var dimensionPropType = PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]);

var MIN = -180;
var MAX = 180;
function degreesPropType(props, propName, componentName) {
    if (props[propName] < MIN || props[propName] > MAX) {
        return new Error(propName + ' invalid on ' + componentName);
    }
}

function colorPropType(props, propName, componentName) {
    var val = props[propName];
    if (!val.match || !val.match(/^#[a-f]{6}$/i)) {
        return new Error(propName + ' invalid on ' + componentName);
    }
}

var Jsc3dViewer = function (_Component) {
    _inherits(Jsc3dViewer, _Component);

    function Jsc3dViewer() {
        _classCallCheck(this, Jsc3dViewer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args)));

        _this.viewer = null;
        return _this;
    }

    Jsc3dViewer.prototype._setProps = function _setProps(props) {
        // Assign all props
        for (var _iterator = JSC3D_PROPS, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var paramName = _ref;

            var propName = lowerFirst(paramName);
            if (propName in props) {
                var value = Jsc3dViewer.transformValue(props[propName]);
                this.viewer.setParameter(paramName, value);
            }
        }

        // Ensure it fills max height if auto is specified
        var _wrapper = this.wrapper,
            clientWidth = _wrapper.clientWidth,
            clientHeight = _wrapper.clientHeight;
        var height = props.height,
            width = props.width,
            mouse = props.mouse;

        this.canvas.height = height === 'auto' ? clientHeight : height;
        this.canvas.width = width === 'auto' ? clientWidth : width;

        if (mouse === false) {
            this.viewer.enableDefaultInputHandler(false);
        } else {
            this.viewer.setMouseUsage(mouse);
            this.viewer.enableDefaultInputHandler(true);
        }
    };

    Jsc3dViewer.transformValue = function transformValue(value) {
        if (value === true) {
            return 'on';
        } else if (value === false) {
            return 'off';
        } else {
            return value;
        }
    };

    Jsc3dViewer.prototype.componentDidMount = function componentDidMount() {
        this.viewer = new jsc3d.Viewer(this.canvas);
        this._setProps(this.props);
        this.viewer.init();
    };

    Jsc3dViewer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {

        // Set new props
        this._setProps(nextProps);

        if (nextProps.sceneUrl !== this.props.sceneUrl) {
            // Entirely new URL, should re-init
            this.viewer.init();
        }
        return false;
    };

    Jsc3dViewer.prototype.componentWillUnmount = function componentWillUnmount() {
        // TODO
    };

    Jsc3dViewer.prototype.render = function render() {
        var _this2 = this;

        var style = {};
        return React.createElement(
            'div',
            { className: 'Jsc3dViewer', ref: function ref(div) {
                    _this2.wrapper = div;
                } },
            React.createElement('canvas', {
                ref: function ref(canvas) {
                    _this2.canvas = canvas;
                },
                style: style })
        );
    };

    return Jsc3dViewer;
}(Component);

Jsc3dViewer.propTypes = process.env.NODE_ENV !== "production" ? {
    sceneUrl: PropTypes.string.isRequired,
    height: dimensionPropType,
    width: dimensionPropType,
    initRotationX: degreesPropType,
    initRotationY: degreesPropType,
    initRotationZ: degreesPropType,
    modelColor: colorPropType,
    backgroundColor1: colorPropType,
    backgroundColor2: colorPropType,
    backgroundImageUrl: PropTypes.string,
    background: PropTypes.bool,
    renderMode: PropTypes.oneOf(['point', 'wireframe', 'flat', 'smooth', 'texture', 'textureflat', 'texturesmooth']),
    definition: PropTypes.oneOf(['low', 'high', 'standard']),

    faceCulling: PropTypes.bool,
    mipMapping: PropTypes.bool,
    creaseAngle: PropTypes.number,
    sphereMapUrl: PropTypes.string,
    progressBar: PropTypes.bool,
    renderer: PropTypes.oneOf(['webgl', '']),
    localBuffers: PropTypes.oneOf(['release', 'retain']),
    mouse: PropTypes.oneOf([false, 'rotate', 'zoom', 'pan'])
} : {};

Jsc3dViewer.defaultProps = {
    height: 'auto',
    width: 'auto',
    initRotationX: 45,
    initRotationY: -45,
    initRotationZ: -135,
    background: false,
    modelColor: '#ffffff',
    backgroundColor1: '#ffffff',
    backgroundColor2: '#ffffff',
    backgroundImageUrl: '',
    progressBar: false,
    renderMode: 'flat',
    renderer: 'webgl',
    definition: 'high',
    mouse: 'rotate'
};

export default Jsc3dViewer;