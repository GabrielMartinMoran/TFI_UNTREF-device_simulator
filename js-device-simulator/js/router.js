import { AddDevice } from './views/add-device.js';
import { DeviceSimulator } from './views/device-simulator.js';
import { Devices } from './views/devices.js';
import { Home } from './views/home.js';

export class Router {
    _default_route = 'home';

    _views = {
        'home': Home,
        'devices': Devices,
        'add-device': AddDevice,
        'device-simulator/<id>': DeviceSimulator
    }

    _getViewToShow

    renderRoute(viewName) {
        const viewInstance = new this._views[viewName]();
        viewInstance.drawIn('appViewport');
    }

    _shoudRenderView(viewPath, splittedRoute) {
        const splittedViewPath = viewPath.split('/');
        if (splittedRoute.length != splittedViewPath.length) return false;
        for (let i = 0; i < splittedViewPath.length; i++) {
            const pathPartBoundries = splittedViewPath[i].substr(0, 1) + splittedViewPath[i].substr(splittedViewPath[i].length - 1, 1);
            if (splittedViewPath[i] !== splittedRoute[i] && pathPartBoundries !== '<>') return false;
        }
        return true;
    }

    _getViewPathToRender(route) {
        const splittedRoute = route.split('/');
        for (const viewPath of Object.keys(this._views)) {
            if (this._shoudRenderView(viewPath, splittedRoute)) {
                return viewPath;
            }
        }
        return null;
    }

    _renderHash() {
        const route = window.location.hash.replace('#/', '');
        const viewPathToRender = this._getViewPathToRender(route)
        if (viewPathToRender) {
            this.renderRoute(viewPathToRender);
        } else {
            window.location.hash = `#/${this._default_route}`;
        }
    }

    setUp() {
        window.addEventListener('hashchange', () => {
            this._renderHash();
        })
        this._renderHash();
    }

}