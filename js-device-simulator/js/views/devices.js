import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';
import { ViewElement } from '../view-element.js';

export class Devices extends ViewElement {

    _simulatedDeviceRepository = null;

    constructor() {
        super();
        this._simulatedDeviceRepository = new SimulatedDeviceRepository();
    }

    _getElementHtml() {
        const devices = this._simulatedDeviceRepository.getAll();
        let devicesList = '';
        for (const device of devices) {
            devicesList += `<a href="#/device-simulator/${device.getId()}">${device.getName()}</a><br>`;
        }
        return /*html*/`
        <h2>Devices</h2>
        ${devicesList}
        `;
    }
}