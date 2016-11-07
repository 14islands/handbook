import {Component} from 'component-loader-js';
import scrollmonitor from 'scrollmonitor'
console.log("helloez");

export default class extends Component {
    constructor() {
      super(...arguments);
      this.bind(
                '_onEnterViewport'
      );
      this.Section = this.el;
      this.elementWatcher = scrollMonitor.create( this.Section, -200 );
      this.elementWatcher.enterViewport(this._onEnterViewport);
    }
    _onEnterViewport(){
      this.id = this.Section.getAttribute("id");
      //console.log( 'I have entered the viewport', this.id );
      this.publish('ACTION_HIGHLIGHT_CURRENT_SECTION', {id: this.id});
    }

    destroy() {
        super.destroy();
    }
}

