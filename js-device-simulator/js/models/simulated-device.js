export class SimulatedDevice {
    _id = null;
    _name = null;
    _refVoltage = null;
    _refCurrent = null;
    _userSecret = null;

    constructor(id, name, refVoltage, refCurrent, userSecret) {
        this._id = id;
        this._name = name;
        this._refVoltage = refVoltage;
        this._refCurrent = refCurrent;
        this._userSecret = userSecret;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getRefVoltage() {
        return this._refVoltage;
    }

    getRefCurrent() {
        return this._refCurrent;
    }

    getUserSecret() {
        return this._userSecret;
    }

    static fromObject(obj) {
        const simulatedDevice = new SimulatedDevice();
        Object.assign(simulatedDevice, obj);
        return simulatedDevice;
    }
}