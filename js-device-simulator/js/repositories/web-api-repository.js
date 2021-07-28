import { WEB_API_URL } from '../config.js';

export class WebApiRepository {

    async _get(endpoint, authToken = null) {
        const headers = { 'Content-Type': 'application/json' };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        const response = await fetch(`${WEB_API_URL}${endpoint}`, {
            method: 'GET',
            headers: headers
        });
        return await response.json();
    }

}