import {Component} from 'component-loader-js';
import gsap from 'gsap';

export default class extends Component {
    constructor() {
      super(...arguments);
      this.bind(
                '_onOpenMenu',
                '_onCloseMenu',
                '_onEnterCurrentSection',
                '_onMenuLinkClick'
      );
      this.isOpen = false;
      const morphEl = this.el.querySelector('.Shape');
      const s = Snap(morphEl.querySelector('svg') );
      this.path = s.select( 'path' );
      this.initialPath = this.path.attr('d');
      this.steps = morphEl.getAttribute( 'data-morph-open' ).split(';');
      this.stepsTotal = this.steps.length;
      this.isAnimating = false;
      this.subscribe('ACTION_OPEN_MENU', this._onOpenMenu);
      this.subscribe('ACTION_HIGHLIGHT_CURRENT_SECTION', this._onEnterCurrentSection);

      const closebtn = this.el.querySelector('.Menu-buttonClose');
      closebtn.addEventListener('click', this._onCloseMenu);

      const link = this.el.getElementsByClassName('Menu-button');
      for (var i=0; i<link.length; i++){
          link[i].addEventListener('click', this._onMenuLinkClick);
      }
    }

    _onOpenMenu(){
      const bodyEl = document.body;
      if( this.isAnimating ) return false;
      this.isAnimating = true;
      bodyEl.classList.add("is-showing");
      // animate path
      const pos = 0;
      const nextStep = (pos) => {
        if( pos > this.stepsTotal - 1 ) {
          this.isAnimating = false;
          return;
        }
        this.path.animate( { 'path' : this.steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, () => { nextStep(pos); } );
        pos++;
      };
      nextStep(pos);
      this.isOpen = !this.isOpen;
    }

    _onCloseMenu(){
      this.isOpen = true;
      document.querySelector('.is-showing').classList.remove("is-showing");
      // animate path
      setTimeout( () => {
        // reset path
        this.path.attr( 'd', this.initialPath );
        this.isAnimating = false;
      }, 300 );
    }

    _onEnterCurrentSection(data){
      const idString = data.id;
      const activeLink = this.el.querySelector('.active');
      if(activeLink){
        activeLink.classList.remove("active");
      }
      const currentLink = document.querySelector("button[id='Button-"+idString+"']");
      currentLink.classList.add("active");
    }

    _onMenuLinkClick(event){
      event.preventDefault()
      this.scrollToSection(event.target.id);
    }

    scrollToSection(id){
      const sectionId = id.replace("Button-", "");
      const top = document.getElementById(sectionId).offsetTop;
      TweenLite.to(window, 1, {scrollTo:{y: top, offsetY:70}});
      if (Modernizr.mq('(max-width: 992px)')) {
        this._onCloseMenu();
      }
    }

    destroy() {
        super.destroy();
        this.unsubscribe('ACTION_OPEN_MENU', this._onOpenMenu);
    }
}

