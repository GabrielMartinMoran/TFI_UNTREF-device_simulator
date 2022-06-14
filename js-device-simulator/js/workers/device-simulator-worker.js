import { EnergySensor } from '../models/energy-sensor.js';
import { Measure } from '../models/measure.js';
import { DeviceRepository } from '../repositories/device-repository.js';
import { RepositoriesFactory } from '../repositories/repositories-factory.js';
import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';

export class DeviceSimulatorWorker {
    
    _DELAY_BETWEEN_MEASURES = 2000;//5000;
    _simulatedDeviceRepository = null;
    _deviceRepository = null;
    _measureGenerationInterval = null;
    _simulatedDevices = [];
    _energySensor = null;

    static _lastMeasuresByDevice = {}

    constructor() {
        this._simulatedDeviceRepository = RepositoriesFactory.getInstance(SimulatedDeviceRepository);
        this._deviceRepository = RepositoriesFactory.getInstance(DeviceRepository);
        this._simulatedDeviceRepository.subscribe((simulatedDevices) => this.onDevicesChange(simulatedDevices));
    }
    
    start() {
        this._simulatedDevices = this._simulatedDeviceRepository.getAll();
        this._measureGenerationInterval = setInterval(async () => {
            await this._simulateDevices();
        }, this._DELAY_BETWEEN_MEASURES);
    }

    onDevicesChange(simulatedDevices) {
        this._simulatedDevices = simulatedDevices;
    }

    async _simulateDevices() {
        for (const simulatedDevice of this._simulatedDevices) {
            if (simulatedDevice.getSimulate() && simulatedDevice.getTurnedOn()) {
                await this._simulateEnergyMeasure(simulatedDevice)
            }
        }
    }

    async _simulateEnergyMeasure(simulatedDevice) {

        const energySensor = new EnergySensor(simulatedDevice.getRefVoltage(), simulatedDevice.getRefCurrent());

        const measure = new Measure(
            new Date().toISOString(),
            energySensor.getVoltage(),
            energySensor.getCurrent()
        )

        DeviceSimulatorWorker._lastMeasuresByDevice[simulatedDevice.getId()] = measure;

        try {
            await this._deviceRepository.addMeasure(simulatedDevice.getId(), measure, simulatedDevice.getUser().getSecret());
            // console.log(`Muestra enviada al servidor: ${simulatedDevice.getName()} | ${measure.getVoltage()} V | ${measure.getCurrent()} A`);
        } catch (error) {
            console.error('Ha ocurrido un error al enviar la muestra al servidor!', error);
        }
    }

    static getLastMeasureForDevice(deviceId) {
        return DeviceSimulatorWorker._lastMeasuresByDevice[deviceId];
    }

    static getDelayBetweenMeasures() {
        return DeviceSimulatorWorker._DELAY_BETWEEN_MEASURES;
    }
}