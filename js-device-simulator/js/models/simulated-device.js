import { User } from './user.js';

export class SimulatedDevice {
    _id = null;
    _name = null;
    _alias = null;
    _refVoltage = null;
    _refCurrent = null;
    _turnedOn = false;
    _user = null;
    _simulate = null;

    constructor(id, name, alias, refVoltage, refCurrent, user) {
        this._id = id;
        this._name = name;
        this._alias = alias;
        this._refVoltage = refVoltage;
        this._refCurrent = refCurrent;
        this._user = user;
        this._simulate = false;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getAlias() {
        return this._alias;
    }

    getRefVoltage() {
        return this._refVoltage;
    }

    getRefCurrent() {
        return this._refCurrent;
    }

    getUser() {
        return this._user;
    }


    setTurnedOn(status) {
        this._turnedOn = status;
    }

    getTurnedOn() {
        return this._turnedOn;
    }

    setSimulate(status) {
        this._simulate = status;
    }

    getSimulate() {
        return this._simulate;
    }

    static fromObject(obj) {
        const simulatedDevice = new SimulatedDevice();
        Object.assign(simulatedDevice, obj);
        if (simulatedDevice._user) simulatedDevice._user = User.fromObject(simulatedDevice._user);
        return simulatedDevice;
    }
}