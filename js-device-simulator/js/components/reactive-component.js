import { UUID4Generator } from '../utils/uuid4-generator.js';
import { ViewElement } from '../view-element.js';

export class ReactiveComponent extends ViewElement {

    _onChange = null;
    _function_name = null;

    constructor(onChange=null) {
        super();
        this._onChange = onChange;
        this._function_name = `change_${UUID4Generator.generateId().replaceAll('-', '_')}_function`;
        this._registerFunction();
    }

    _registerFunction() {
        window[this._function_name] = () => this._onValueChange();
    }

    _onValueChange() {
        throw '_onValueChange is not implemented!';
    }

    _getChangeEventHandler() {
        return `${this._function_name}()`;
    }


}