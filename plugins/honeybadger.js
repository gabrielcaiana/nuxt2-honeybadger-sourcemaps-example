import HoneybadgerVue from "@honeybadger-io/vue";
import Vue from "vue";

export default ({ app, $config }, inject) => {
  const config = {
    apiKey: process.env.HONEYBADGER_API_KEY,
    environment: process.env.HONEYBADGER_ENVIRONMENT,
    revision: "main",
  };

  Vue.use(HoneybadgerVue, config);

  inject("honeybadger", HoneybadgerVue);
};
