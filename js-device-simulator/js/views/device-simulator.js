import { User } from '../models/user.js';
import { AuthRepository } from '../repositories/auth-repository.js';
import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';
import { UrlParamsGetter } from '../utils/url-params-getter.js';
import { Component } from '../component.js';
import { Checkbox } from '../components/checkbox.js';
import { EnergySensor } from '../models/energy-sensor.js';
import { Measure } from '../models/measure.js';
import { DeviceRepository } from '../repositories/device-repository.js';
import { RepositoriesFactory } from '../repositories/repositories-factory.js';
import { DeviceSimulatorWorker } from '../workers/device-simulator-worker.js';

export class DeviceSimulator extends Component {

    _DELAY_BETWEEN_MEASURES = 2000;//5000;

    _urlParamsGetter = null;
    _simulatedDeviceRepository = null;
    _deviceRepository = null;
    _simulatedDevice = null;
    _updateInterval = null;

    constructor() {
        super();
        this._urlParamsGetter = new UrlParamsGetter();
        this._simulatedDeviceRepository = RepositoriesFactory.getInstance(SimulatedDeviceRepository);
        this._deviceRepository = RepositoriesFactory.getInstance(DeviceRepository);

        const urlParams = this._urlParamsGetter.getParamsFromExpression(['url', 'simulatedDeviceId']);

        this._simulatedDevice = this._simulatedDeviceRepository.get(urlParams.simulatedDeviceId);

        this._updateInterval = setInterval(() => {
            this._updateScreen();
        }, DeviceSimulatorWorker.getDelayBetweenMeasures());
    }

    _onDestroy() {
        clearInterval(this._updateInterval);
    }

    _getElementHtml() {
        return /*html*/`
        <h2>Simulando ${this._simulatedDevice.getAlias()} (${this._simulatedDevice.getName()})</h2>
        <div class="listLabelGrid">
            ${new Checkbox('simulateDeviceChk', 'Simular', this._simulatedDevice.getSimulate(),
            (value) => {
                this._simulatedDevice.setSimulate(value);
                this._simulatedDeviceRepository.update(this._simulatedDevice);
            }).render()
            }
            ${new Checkbox('turnedOnDeviceChk', this._getTurnedOnChkLabel(), this._simulatedDevice.getTurnedOn(),
                (value) => {
                    this._simulatedDevice.setTurnedOn(value);
                    this.findComponent('turnedOnDeviceChk').setLabel(this._getTurnedOnChkLabel())
                    this._simulatedDeviceRepository.update(this._simulatedDevice);
                }).render()
            }
        </div>
        <h3>Información del usuario</h3>
        <div class="listLabelGrid">
            <label class="listLabel"><b>👤 Usuario: </b>${this._simulatedDevice.getUser().getUsername()}</label>
            <label class="listLabel"><b>📨 Email: </b>${this._simulatedDevice.getUser().getEmail()}</label>
        </div>

        <h3>Información del dispositivo</h3>
        <div class="listLabelGrid">
            <label class="listLabel"><b>⚡ Voltaje de referencia: </b>${this._simulatedDevice.getRefVoltage()}</label>
            <label class="listLabel"><b>📉 Corriente de referencia: </b>${this._simulatedDevice.getRefCurrent()}</label>
        </div>

        <h3>Simulación</h3>
        <div class="listLabelGrid">
            <label class="listLabel"><b>⚡ Voltaje: </b><span id="simulatedVoltage">???</span></label>
            <label class="listLabel"><b>📉 Corriente: </b><span id="simulatedCurrent">???</span></label>
            <label class="listLabel"><b>📈 Potencia: </b><span id="simulatedPower">???</span></label>
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            .listLabelGrid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }

            .listLabel {
                display: block;
                margin-bottom: 1rem;
            }
        `;
    }

    _getTurnedOnChkLabel() {
        return this._simulatedDevice.getTurnedOn() ? 'Encendido' : 'Apagado';
    }

    _updateScreen() {
        const measure = DeviceSimulatorWorker.getLastMeasureForDevice(this._simulatedDevice.getId());
        if (!measure) return;
        document.getElementById('simulatedVoltage').innerText = measure.getVoltage();
        document.getElementById('simulatedCurrent').innerText = measure.getCurrent();
        document.getElementById('simulatedPower').innerText = measure.getPower();
    }
}
