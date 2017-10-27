import React, {Component} from 'react';
import {render} from 'react-dom';

import './index.css';

import Jsc3dViewer from '../../src';

class Demo extends Component {
    render() {
        return (
            <div className="wrapper">
                <h1>react-jsc3d Demo</h1>
                <Jsc3dViewer
                    sceneUrl='test-media/trumpet.obj'
                />
            </div>
        );
    }
}

render(<Demo/>, document.querySelector('#demo'))
