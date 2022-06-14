import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';
import { Component } from '../component.js';
import { RepositoriesFactory } from '../repositories/repositories-factory.js';

export class Devices extends Component {

    _simulatedDeviceConfigRepository = null;

    constructor() {
        super();
        this._simulatedDeviceConfigRepository = RepositoriesFactory.getInstance(SimulatedDeviceRepository);
    }

    _getElementHtml() {
        const devices = this._simulatedDeviceConfigRepository.getAll();
        let devicesList = '';
        for (const device of devices) {
            devicesList += `
            <div class="spacedDeviceLink">
            <a href="#/device-simulator/${device.getId()}">
            ${device.getTurnedOn() ? '🟢' : '🔴'} | 
            ${device.getTurnedOn() ? '💡' : '💤'} | 
            ${device.getAlias()} (${device.getName()})
            👤 ${device.getUser().getUsername()}
            </a>
            </div>`;
        }
        return /*html*/`
        <h2>Dispositivos</h2>
        ${devicesList}
        `;
    }

    _getElementCSS() {
        return /*css*/`
        .spacedDeviceLink {
            margin-bottom: 1rem;
        }
        `;
    }
}