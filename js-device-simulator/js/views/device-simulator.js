import { User } from '../models/user.js';
import { AuthRepository } from '../repositories/auth-repository.js';
import { SimulatedDeviceRepository } from '../repositories/simulated-device-repository.js';
import { UrlParamsGetter } from '../utils/url-params-getter.js';
import { ViewElement } from '../view-element.js';

export class DeviceSimulator extends ViewElement {

    _urlParamsGetter = null;
    _simulatedDeviceRepository = null;
    _authRepository = null;
    _smulatedDevice = null;
    _user = null;

    constructor() {
        super();
        this._urlParamsGetter = new UrlParamsGetter();
        this._simulatedDeviceRepository = new SimulatedDeviceRepository();
        this._authRepository = new AuthRepository();

        const urlParams = this._urlParamsGetter.getParamsFromExpression(['url', 'simulatedDeviceId']);

        this._smulatedDevice = this._simulatedDeviceRepository.get(urlParams.simulatedDeviceId);
        console.log(this._smulatedDevice);

        this._getUserData();
    }

    _getUserData() {
        this._authRepository.getUserData(this._smulatedDevice.getUserSecret()).then(res => {
            this._user = new User(res.username, res.email);
            console.log(this._user);
        }, err => {
            throw err.message;
        });
    }

    _getElementHtml() {
        return /*html*/`
        <h2>Device simulator</h2>
        `;
    }
}