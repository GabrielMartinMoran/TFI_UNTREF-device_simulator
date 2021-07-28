import { WebApiRepository } from './web-api-repository.js';

export class AuthRepository extends WebApiRepository {
    
    _controller = '/auth';

    async getUserData(userSecret) {
        return await this._get(`${this._controller}/get_data`, userSecret);
    }
}