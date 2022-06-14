import { Component } from '../component.js';
import { UUID4Generator } from '../utils/uuid4-generator.js';
import { Pallete } from '../config.js';

export class Button extends Component {

    _name = null;
    _type = null;
    _child = null;
    _onClick = null;
    _function_name = null;

    constructor(name, type, child, onClick) {
        super();
        this._id = name;
        this._name = name;
        this._type = type;
        this._child = child;
        this._onClick = onClick;
        this._function_name = `btn_${this.name}_${UUID4Generator.generateId().replaceAll('-', '_')}_function`;
        this._registerFunction();
    }

    _registerFunction() {
        window[this._function_name] = this._onClick;
    }

    _renderChild() {
        return this._child instanceof Component ? this._child.render() : this._child;
    }

    _getElementHtml() {
        return /*html*/ `
        <button type="button" id="${this._id}" name="${this._name}" class="btn" onClick="${this._function_name}()">${this._renderChild()}</button>
        `;
    }

    _getElementCSS() {
        return /*css*/ `
            .btn {
                background-color: ${Pallete.PRIMARY};
                border-radius:2px;
                border: 1px solid ${Pallete.PRIMARY};
                display:inline-block;
                cursor:pointer;
                font-weight:bold;
                padding: 0.5rem 1rem;
                color: ${Pallete.TEXT};
            }

            .btn:hover {
                -webkit-filter: brightness(85%);
                -webkit-transition: all 0.5s ease;
                -moz-transition: all 0.5s ease;
                -o-transition: all 0.5s ease;
                -ms-transition: all 0.5s ease;
                transition: all 0.5s ease;
            }

            .btn:active {
                -webkit-filter: brightness(50%);
                -webkit-transition: all 0.1s ease;
                -moz-transition: all 0.1s ease;
                -o-transition: all 0.1s ease;
                -ms-transition: all 0.1s ease;
                transition: all 0.1s ease;
            }
        `;
    }
}