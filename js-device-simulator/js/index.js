import { AppMenu } from './app-menu.js';
import { Component } from './component.js';
import { Pallete } from './config.js';

export class Index extends Component {

    _appMenu = null;

    constructor() {
        super();
        this._appMenu = new AppMenu();
    }    

    _getElementHtml() {
        return /*html*/`
        <div id="appGrid">
            <div class="container" id="appMenu">
                ${this._appMenu.render()}
            </div>
            <div class="container" id="appBody">
                <div class="container" id="appViewport"></div>
            </div>
        </div>
        `;
    }

    _getElementCSS() {
        return /*css*/`
            #appGrid {
                display: grid;
                grid-template-columns: 1fr 4fr;
                height: 100%;
            }

            #appMenu {
                background-color: ${Pallete.ELEMENTS};
            }

            #appBody {
                background-color: ${Pallete.BACKGROUND};
                display: flex;
            }

            #appViewport {                
                background-color: ${Pallete.ELEMENTS};
                flex: 1;
            }


            body {
                margin: 0;
                color: ${Pallete.TEXT};
                font-family: Arial, sans-serif
            }
            
            a {
                color: ${Pallete.TEXT_SHADOW};
                text-decoration: none;
            }
            
            a:hover {
                color: ${Pallete.TEXT};
            }
            
            .container {
                padding: 1rem;
            }
        `;
    }

}