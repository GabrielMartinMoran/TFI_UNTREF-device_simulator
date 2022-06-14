import { Component } from './component.js';
import { Pallete } from './config.js';

export class AppMenu extends Component {
    _elementId = 'appMenu';

    _getElementHtml() {
        return /*html*/`
        <h2>Simulador de dispositivos</h2>
        <a href="#/home" class="menuItem">Inicio</a>
        <a href="#/add-device" class="menuItem">Agregar dispositivo</a>
        <a href="#/devices" class="menuItem">Dispositivos</a>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            .menuItem {
                display: block;
                margin-bottom: 1rem;
            }
        `;
    }
}