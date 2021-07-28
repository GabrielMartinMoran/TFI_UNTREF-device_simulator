import { Index } from './index.js';
import { Router } from './router.js';

const router = new Router();
const index = new Index(); 


function onLoad() {
    index.drawIn('indexViewport');
    router.setUp();    
}

window.onload = () => {
    onLoad();
}
