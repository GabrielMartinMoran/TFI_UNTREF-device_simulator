import { Input } from '../components/input.js';
import { Button } from '../components/button.js';
import { Select } from '../components/select.js';
import { Component } from '../component.js';
import { DeviceConfigRepository } from '../repositories/device-config-repository.js';
import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';
import { SimulatedDevice } from '../models/simulated-device.js';
import { UUID4Generator } from '../utils/uuid4-generator.js';
import { AuthRepository } from '../repositories/auth-repository.js';
import { DeviceRepository } from '../repositories/device-repository.js';
import { User } from '../models/user.js';
import { RepositoriesFactory } from '../repositories/repositories-factory.js';

export class AddDevice extends Component {

    _deviceConfigRepository = null;
    _deviceRepository = null;
    _authRepository = null;
    _simulatedDeviceConfigRepository = null;
    _formData = null;

    constructor() {
        super();
        this._deviceConfigRepository = RepositoriesFactory.getInstance(DeviceConfigRepository);
        this._deviceRepository = RepositoriesFactory.getInstance(DeviceRepository);
        this._authRepository = RepositoriesFactory.getInstance(AuthRepository);
        this._simulatedDeviceConfigRepository = RepositoriesFactory.getInstance(SimulatedDeviceRepository);
        this._formData = {
            userSecret: null,
            device: null,
            deviceAlias: null,
        }
    }

    _getElementHtml() {
        return /*html*/`
        <h2>Agregar dispositivo</h2>
        <div id="addDeviceForm">
        ${new Input('userSecretInput', 'text', 'Token de usuario',
            (userSecret) => this._formData.userSecret = userSecret
        ).render()
            }
        ${new Select('deviceTypeSelect', 'Tipo de dispositivo',
                this._deviceConfigRepository.getAll(),
                (device) => device.name,
                (device) => {
                    this._formData.device = device;
                    const aliasElement = this.findComponent('deviceAliasInput');
                    if (!aliasElement.getValue()) aliasElement.setValue(device.name);
                }
            ).render()
            }
        ${new Input('deviceAliasInput', 'text', 'Alias del dispositivo',
                (alias) => this._formData.deviceAlias = alias
            ).render()
            }
        ${new Button('createDevice', 'primary', '+ Crear',
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

            #userSecretInput {
                grid-column: 1/3;
            }

            #createDevice {
                grid-column: 1/3;
            }
        `;
    }

    async _createDevice() {
        let createdDevice = null;
        try {
            createdDevice = await this._deviceRepository.create(this._formData.device.name, this._formData.userSecret);
        } catch (err) {
            console.error(err);
            alert('Ha ocurrido un error al tratar de crear el dispositivo');
            return;
        }
        let user = null;
        try {
            user = await this._authRepository.getUserData(this._formData.userSecret);
        } catch (err) {
            console.error(err);
            alert('Ha ocurrido un error al tratar de obtener la información del usuario');
            return;
        }

        const simulatedDevice = new SimulatedDevice(
            createdDevice.id,
            this._formData.device.name,
            this._formData.deviceAlias,
            this._formData.device.refVoltage,
            this._formData.device.refCurrent,
            new User(user.username, user.email, this._formData.userSecret)
        );
        this._simulatedDeviceConfigRepository.create(simulatedDevice);
        window.location = `#/devices`;
    }
}