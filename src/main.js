import webfontloader from 'webfontloader'
import ComponentLoader, {Component} from 'component-loader-js';
import BurgerButton from './components/BurgerButton/BurgerButton.js';
import Menu from './components/Menu/Menu.js';
import ScrollWatcher from './components/ScrollWatcher/ScrollWatcher.js';
const componentLoader = new ComponentLoader({
  BurgerButton,
  Menu,
  ScrollWatcher
});
componentLoader.scan();

console.log('hello javascript')

// Wait for webfont to finish loading custom font
// webfontloader.load({
//   custom: {
//     families: ['My Custom Font']
//   },
//   active: () => {
//     console.log('Custom font is now loaded')
//   }
// })
