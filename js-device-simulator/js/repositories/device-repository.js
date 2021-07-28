import { DEVICES } from "../data/devices.js";

export class DeviceRepository {
    
    _devices = [];
    
    constructor() {
        this._loadDevices();
    }

    _loadDevices() {
        // Slice to clone array
        this._devices = DEVICES.slice();
    }

    getAll() {
        return this._devices;
    }

    get(id) {
        return this._devices.find(x => x.id === id);
    }
}