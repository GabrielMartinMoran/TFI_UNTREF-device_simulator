export class ViewElement {

    render() {
        return `<style>${this._getElementCSS()}</style>${this._getElementHtml()}`;

    }

    drawIn(elementId) {
        try {
            document.getElementById(elementId).innerHTML = this.render();
        } catch (e) {
            //if (e instanceof TypeError) throw `Element ${elementId} not found in dom!`;
            throw e;
        }
    }

    _getElementCSS() {
        return /*css*/``;
    }

    _getElementHtml() {
        throw 'generateHtml not yet implemented!'
    }

}