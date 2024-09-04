import { render } from "solid-js/web";
import 'virtual:uno.css';
import "./global.css";
import App from "./App";


 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,CustomEase)
  // gsap code here!
 });
 

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
    );
}

render(() => <App />, root);
