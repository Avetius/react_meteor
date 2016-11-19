import methodStubs from './configs/method_stubs';
//import actions from './actions';
import routes from './routes';
import actions from './actions';

export default {
  routes,
  actions,
  load(context) {
    methodStubs(context);
  }
};
