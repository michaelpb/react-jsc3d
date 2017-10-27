import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsc3d from '../lib/jsc3d.js';
import './Jsc3dViewer.css';

const JSC3D_PROPS = [
    'SceneUrl',
    'InitRotationX',
    'InitRotationY',
    'InitRotationZ',
    'ModelColor',
    'BackgroundColor1',
    'BackgroundColor2',
    'BackgroundImageUrl',
    'Background',
    'RenderMode',
    'Definition',
    'FaceCulling',
    'MipMapping',
    'CreaseAngle',
    'SphereMapUrl',
    'ProgressBar',
    'Renderer',
    'LocalBuffers',
];

function lowerFirst(str) {
    return str.substr(0, 1).toLowerCase() + str.substr(1);
}

const dimensionPropType = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto']),
]);

const MIN = -180;
const MAX = 180;
function degreesPropType(props, propName, componentName) {
    if (props[propName] < MIN || props[propName] > MAX) {
        return new Error(`${propName} invalid on ${componentName}`);
    }
}

function colorPropType(props, propName, componentName) {
    const val = props[propName];
    if (!val.match || !val.match(/^#[a-f]{6}$/i)) {
        return new Error(`${propName} invalid on ${componentName}`);
    }
}

class Jsc3dViewer extends Component {
    constructor (...args) {
        super(...args);
        this.viewer = null;
    }

    _setProps(props) {
        // Assign all props
        for (const paramName of JSC3D_PROPS) {
            const propName = lowerFirst(paramName);
            if (propName in props) {
                const value = Jsc3dViewer.transformValue(props[propName]);
                this.viewer.setParameter(paramName, value);
            }
        }

        // Ensure it fills max height if auto is specified
        const { clientWidth, clientHeight } = this.wrapper;
        const { height, width, mouse } = props;
        this.canvas.height = height === 'auto' ? clientHeight : height;
        this.canvas.width = width === 'auto' ? clientWidth : width;

        if (mouse === false) {
            this.viewer.enableDefaultInputHandler(false);
        } else {
            this.viewer.setMouseUsage(mouse);
            this.viewer.enableDefaultInputHandler(true);
        }
    }

    static transformValue(value) {
        if (value === true) {
            return 'on';
        } else if (value === false) {
            return 'off';
        } else {
            return value;
        }
    }

    componentDidMount() {
        this.viewer = new jsc3d.Viewer(this.canvas);
        this._setProps(this.props);
        this.viewer.init();
    }

    shouldComponentUpdate(nextProps, nextState) {

        // Set new props
        this._setProps(nextProps);

        if (nextProps.sceneUrl !== this.props.sceneUrl) {
            // Entirely new URL, should re-init
            this.viewer.init();
        }
        return false;
    }

    componentWillUnmount() {
        // TODO
    }

    render() {
        const style = {};
        return (
            <div className="Jsc3dViewer" ref={(div) => { this.wrapper = div; }}>
                <canvas
                    ref={(canvas) => { this.canvas = canvas; }}
                    style={style}>
                </canvas>
            </div>
        );
    }
}

Jsc3dViewer.propTypes = {
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
    renderMode: PropTypes.oneOf( ['point', 'wireframe', 'flat', 'smooth',
        'texture', 'textureflat', 'texturesmooth']),
    definition: PropTypes.oneOf(['low', 'high', 'standard']),

    faceCulling: PropTypes.bool,
    mipMapping: PropTypes.bool,
    creaseAngle: PropTypes.number,
    sphereMapUrl: PropTypes.string,
    progressBar: PropTypes.bool,
    renderer: PropTypes.oneOf(['webgl', '']),
    localBuffers: PropTypes.oneOf(['release', 'retain']),
    mouse: PropTypes.oneOf([false, 'rotate', 'zoom', 'pan']),
};

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
    mouse: 'rotate',
};

export default Jsc3dViewer;
