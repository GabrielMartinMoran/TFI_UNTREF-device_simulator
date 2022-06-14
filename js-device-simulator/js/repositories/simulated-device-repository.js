import { SimulatedDevice } from '../models/simulated-device.js';

export class SimulatedDeviceRepository {

    _storage_key = 'simulatedDevices';
    _subscribedCallbacks = [];

    _getStorageContent() {
        const strData = localStorage.getItem(this._storage_key);
        if (!strData) return [];
        return JSON.parse(strData);
    }

    _setStorageContent(models) {
        localStorage.setItem(this._storage_key, JSON.stringify(models));
    }

    getAll() {
        const records = this._getStorageContent();
        const models = [];
        for (const record of records) {
            models.push(SimulatedDevice.fromObject(record));
        }
        return models;
    }

    get(id) {
        const models = this.getAll();
        return models.find(x => x.getId() === id);
    }

    create(simulatedDevice) {
        const models = this.getAll();
        models.push(simulatedDevice);
        this._setStorageContent(models);
        this.notifySubscribers(models);
    }

    update(simuatedDevice) {
        const models = this.getAll();
        const found = models.find(x => x.getId() === simuatedDevice.getId())
        if (!found) throw `Simulated device with id '${simuatedDevice.getId()}' was not found!'`;
        models[models.indexOf(found)] = simuatedDevice;
        this._setStorageContent(models);
        this.notifySubscribers(models);
    }

    subscribe(callback) {
        this._subscribedCallbacks.push(callback);
    }

    notifySubscribers(simulatedDevices) {
        for (const callback of this._subscribedCallbacks) {
            callback(simulatedDevices);
        }
    }
}