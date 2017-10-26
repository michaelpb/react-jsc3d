import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Jsc3dViewer from './components/Jsc3dViewer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Jsc3dViewer sceneUrl={'/test-media/trumpet.obj'} />,
    document.getElementById('root'),
);
registerServiceWorker();
