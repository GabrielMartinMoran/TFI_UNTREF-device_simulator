import { roundToDecimal } from '../utils/math.js';
import { MEASURES_DECIMAL_PRESICION } from '../config.js';

export class Measure {

    _timestamp = null;
    _voltage = null;
    _current = null;

    constructor(timestamp, voltage, current) {
        this._timestamp = timestamp;
        this._voltage = voltage;
        this._current = current;
    }

    getTimestamp() {
        return this._timestamp;
    }

    getVoltage() {
        return this._voltage;
    }

    getCurrent() {
        return this._current;
    }

    getPower() {
        const power = this._voltage * this._current;
        return roundToDecimal(power, MEASURES_DECIMAL_PRESICION);
    }
}