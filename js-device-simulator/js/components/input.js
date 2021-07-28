import { Pallete } from '../config.js';
import { ReactiveComponent } from './reactive-component.js';

export class Input extends ReactiveComponent {

    _type = null;
    _placeholder = null;

    constructor(name, type, placeholder, onChange=null) {
        super(onChange);
        this._name = name;
        this._type = type;
        this._placeholder = placeholder;
    }

    _getElementHtml() {
        return /*html*/ `
        <input type="${this._type}" id="${this._name}" class="textInput" name="${this._name}" placeholder="${this._placeholder}" onchange="${this._getChangeEventHandler()}">
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .textInput {
                padding: 0.5rem;
                border-radius: 2px;
                background-color: ${Pallete.ELEMENTS};
                color: ${Pallete.TEXT};
                border: 1px solid ${Pallete.TEXT_SHADOW};
            }

            .textInput::placeholder {
                color: ${Pallete.TEXT_SHADOW};
            }
        `;
    }

    _onValueChange() {
        const value = document.getElementById(this._name).value;
        this._onChange(value);
    }
}