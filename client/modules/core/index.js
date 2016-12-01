import methodStubs from './configs/method_stubs';
import i18nSetup from './configs/i18n-setup';
import routes from './routes';
import actions from './actions';

export default {
  routes,
  actions,
  load(context) {
    methodStubs(context);
  },
  load() {
    i18nSetup()
  }
};
