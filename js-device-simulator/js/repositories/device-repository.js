import { WebApiRepository } from './web-api-repository.js';

export class DeviceRepository extends WebApiRepository {

    _controller = '/devices';

    async create(deviceName, userSecret) {
        return await this._post(`${this._controller}/create`, {
            'name': deviceName
        }, userSecret);
    }

    async addMeasure(deviceId, measure, userSecret) {
        return await this._post(`${this._controller}/add_measure/${deviceId}`, {
            'timestamp': measure.getTimestamp(),
            'voltage': measure.getVoltage(),
            'current': measure.getCurrent()
        }, userSecret);
    }
}