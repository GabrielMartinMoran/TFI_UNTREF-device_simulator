import { roundToDecimal, randomBetween } from '../utils/math.js';
import { MEASURES_DECIMAL_PRESICION } from '../config.js';

export class EnergySensor {
    _VOLTAGE_VARIATION_PERCENTAJE = 0.01
    _CURRENT_VARIATION_PERCENTAJE = 0.05
    _PRECISION = 3

    _refVoltage = null;
    _refCurrent = null;

    constructor(refVoltage, refCurrent) {
        this._refVoltage = refVoltage;
        this._refCurrent = refCurrent;
    }

    getVoltage() {
        return this._getNumberVariation(this._refVoltage, this._VOLTAGE_VARIATION_PERCENTAJE);
    }

    getCurrent() {
        return this._getNumberVariation(this._refCurrent, this._CURRENT_VARIATION_PERCENTAJE);
    }

    _getNumberVariation(referenceValue, variationPercentaje) {
        const variation = referenceValue + randomBetween(-variationPercentaje, variationPercentaje);
        return roundToDecimal(variation, MEASURES_DECIMAL_PRESICION);        
    }
}