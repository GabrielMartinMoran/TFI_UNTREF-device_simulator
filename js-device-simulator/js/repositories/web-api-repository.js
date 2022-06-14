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
        if(response.ok) return await response.json();
        throw await response.json();
    }

    async _post(endpoint, body, authToken = null) {
        const headers = { 'Content-Type': 'application/json' };
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        const response = await fetch(`${WEB_API_URL}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers
        });
        if(response.ok) return await response.json();
        throw await response.json();
    }

}