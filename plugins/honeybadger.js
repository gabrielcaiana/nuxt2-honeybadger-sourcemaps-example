import HoneybadgerVue from "@honeybadger-io/vue";
import Vue from "vue";

export default ({ app }, inject) => {
  const config = {
    apiKey: 'hbp_fSPoTgCIcmUtftpD59HxJOsNEzKDMh1YjrS0',
    environment: 'production',
  };

  Vue.use(HoneybadgerVue, config);

  inject("honeybadger", HoneybadgerVue);
};
