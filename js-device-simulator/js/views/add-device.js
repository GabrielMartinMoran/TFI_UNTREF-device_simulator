import { Input } from '../components/input.js';
import { Button } from '../components/button.js';
import { Select } from '../components/select.js';
import { ViewElement } from '../view-element.js';
import { DeviceRepository } from '../repositories/device-repository.js';
import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';
import { SimulatedDevice } from '../models/simulated-device.js';
import { UUID4Generator } from '../utils/uuid4-generator.js';

export class AddDevice extends ViewElement {

    _deviceRepository = null;
    _simulatedDeviceRepository = null;
    _formData = null;

    constructor() {
        super();
        this._deviceRepository = new DeviceRepository();
        this._simulatedDeviceRepository = new SimulatedDeviceRepository();
        this._formData = {
            userSecret: '',
            device: null
        }
    }

    _getElementHtml() {
        return /*html*/`
        <h2>Add device</h2>
        <div id="addDeviceForm">
        ${
            new Input('userSecretInput', 'text', 'Token de usuario',
                (userSecret) => this._formData.userSecret = userSecret
            ).render()
        }
        ${
            new Select('deviceTypeSelect', 'Tipo de dispositivo',
                this._deviceRepository.getAll(),
                (device) => device.name,
                (device) => this._formData.device = device
            ).render()
        }
        ${
            new Button('createDevice', 'primary', 'Crear',
                () => { this._createDevice() }
            ).render()
        }
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            #addDeviceForm {
                display: grid;
                grid-template-columns: 2fr 2fr;
                gap: 1rem;
            }

            #createDevice {
                grid-column: 1/3;
            }
        `;
    }

    _createDevice() {
        const simulatedDevice = new SimulatedDevice(
            UUID4Generator.generateId(),
            this._formData.device.name,
            this._formData.device.refVoltage,
            this._formData.device.refCurrent,
            this._formData.userSecret
        );
        this._simulatedDeviceRepository.create(simulatedDevice);
        console.log(simulatedDevice);
    }
}