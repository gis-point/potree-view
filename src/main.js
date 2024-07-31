import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

function loadScript(src) {
  var script = document.createElement("script");
  script.src = src;
  document.head.appendChild(script);
}

loadScript("/assets/potree/libs/jquery/jquery-3.1.1.min.js");
loadScript("/assets/potree/libs/spectrum/spectrum.js");
loadScript("/assets/potree/libs/jquery-ui/jquery-ui.min.js");
loadScript("/assets/potree/libs/other/BinaryHeap.js");
loadScript("/assets/potree/libs/tween/tween.min.js");
loadScript("/assets/potree/libs/d3/d3.js");
loadScript("/assets/potree/libs/proj4/proj4.js");
loadScript("/assets/potree/libs/openlayers3/ol.js");
loadScript("/assets/potree/libs/i18next/i18next.js");
loadScript("/assets/potree/libs/jstree/jstree.js");
loadScript("/assets/potree/build/potree/potree.js");
loadScript("/assets/potree/libs/plasio/js/laslaz.js");

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount("#app");

