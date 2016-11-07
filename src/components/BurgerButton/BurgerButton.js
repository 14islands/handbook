import {Component} from 'component-loader-js';

export default class extends Component {

    constructor() {
        super(...arguments);
        this.openbtn = this.el.querySelector('.Menu-buttonOpen');
        this.openbtn.addEventListener('click', () => {
            this.publish('ACTION_OPEN_MENU');
        });
    }
    destroy() {
        super.destroy();
    }
}
