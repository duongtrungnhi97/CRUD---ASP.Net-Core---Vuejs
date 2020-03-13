import Vue from "vue";

import "./styles/quasar.sass";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import { Quasar, QDate } from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    QDate
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {},
  iconSet: iconSet
});
