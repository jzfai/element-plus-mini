import VPApp from "./components/vp-app.vue";
export default VPApp;

import VPDemo from "./components/vp-demo.vue";
export const globals = [["Demo", VPDemo]];

//input css
import "./styles/css-vars.scss";
import "./styles/app.scss";

export { default as NotFound } from "./components/vp-not-found.vue";
