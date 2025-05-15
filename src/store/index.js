/* store.js */
import { proxy } from 'valtio';

const state = proxy({
  // intro screen toggle
  intro: true,
  // form data from Home
  formData: { height: 180, weight: 80, build: 'athletic', tshirtText: '' },
  image: null,
  // decal textures
  logoDecal: './threejs.png',
  fullDecal: './circuit.png',
  isLogoTexture: true,
  isFullTexture: false,
  // text printing
  shirtText: '',
  showText: false,
  // color picker
  color: '#353934',
  
});

export default state;
