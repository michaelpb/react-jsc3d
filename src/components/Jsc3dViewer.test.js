import React from 'react';
import ReactDOM from 'react-dom';
import Jsc3dViewer from './Jsc3dViewer';

global.requestAnimationFrme = function(callback) {
    setTimeout(callback, 0);
};

it('renders STL without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Jsc3dViewer sceneUrl={'/test-media/gear.stl'} />, div);
});

it('renders OBJ without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Jsc3dViewer sceneUrl={'/test-media/trumpet.obj'} />, div);
});

it('has a static method transformValue that transforms props', () => {
    expect(Jsc3dViewer.transformValue(true)).toEqual('on');
    expect(Jsc3dViewer.transformValue(false)).toEqual('off');
    expect(Jsc3dViewer.transformValue('value')).toEqual('value');
});
