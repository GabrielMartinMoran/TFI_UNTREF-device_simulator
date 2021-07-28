import { ViewElement } from './view-element.js';

export class AppMenu extends ViewElement {
    _elementId = 'appMenu';

    _getElementHtml() {
        return /*html*/`
        <h2>App menu</h2>
        <ul>
            <li><a href="#/home">Inicio</a></li>
            <li><a href="#/add-device">Agregar dispositivo</a></li>
            <li><a href="#/devices">Dispositivos</a></li>
            <li><a href="#/device-simulator">Simulador (Quitar del menu)</a></li>
        </ul>
        `;
    }
}