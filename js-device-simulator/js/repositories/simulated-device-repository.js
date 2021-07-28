import { SimulatedDevice } from '../models/simulated-device.js';

export class SimulatedDeviceRepository {

    _storage_key = 'simulatedDevices';

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
    }
}