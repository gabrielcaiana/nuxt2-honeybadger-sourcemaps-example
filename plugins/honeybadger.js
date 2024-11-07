import HoneybadgerVue from "@honeybadger-io/vue";
import Vue from "vue";

export default ({ app, $config }, inject) => {
  const config = {
    apiKey: $config.honeybadgerApiKey,
    environment: $config.honeybadgerEnvironment,
    revision: "main",
  };

  Vue.use(HoneybadgerVue, config);

  inject("honeybadger", HoneybadgerVue);
};
