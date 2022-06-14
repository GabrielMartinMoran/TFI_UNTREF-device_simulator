import { Index } from './index.js';
import { Router } from './router.js';
import { DeviceSimulatorWorker } from './workers/device-simulator-worker.js';

const router = new Router();
const index = new Index();
const deviceSimulatorWorker = new DeviceSimulatorWorker();


const registerComponentUnloader = () => {
    window.registeredComponents = [];
    setInterval(() => {
        const componentsToRemove = [];
        for (const registeredComponent of window.registeredComponents) {
            if (!registeredComponent.isAlive()) componentsToRemove.push(registeredComponent);
        }
        for (const componentToRemove of componentsToRemove) {
            componentToRemove._onDestroy();
            window.registeredComponents.splice(window.registeredComponents.indexOf(componentToRemove, 1));
        }
    }, 100);
}


function onLoad() {
    registerComponentUnloader();
    index.drawIn('indexViewport');
    router.setUp();
    deviceSimulatorWorker.start();
}

window.onload = () => {
    onLoad();
}
