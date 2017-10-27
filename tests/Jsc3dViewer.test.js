import React from 'react';
import expect from 'expect';
import ReactDOM from 'react-dom';
import {render, unmountComponentAtNode} from 'react-dom'
import Jsc3dViewer from 'src/';

describe('Jsc3dViewer', () => {
    let node;

    beforeEach(() => {
        node = document.createElement('div');
    })

    afterEach(() => {
        unmountComponentAtNode(node);
    })

    it('renders STL without crashing', () => {
        render(<Jsc3dViewer
            sceneUrl={'/demo/public/test-media/gear.stl'}
            progressBar={true} />, node, () => {
            expect(node.innerHTML).toContain('canvas')
        });
    });

    /*
    it('renders OBJ without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Jsc3dViewer sceneUrl={'/test-media/trumpet.obj'} />, div);
    });
    */

    it('has a static method transformValue that transforms props', () => {
        expect(Jsc3dViewer.transformValue(true)).toEqual('on');
        expect(Jsc3dViewer.transformValue(false)).toEqual('off');
        expect(Jsc3dViewer.transformValue('value')).toEqual('value');
    });
});
