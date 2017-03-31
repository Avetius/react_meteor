import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds';
import basicSetup from './configs/basicSetup';
import slugURL from './configs/slugURL';

publications();
methods();
addInitialData({ redeploy: false });
basicSetup();
slugURL();
