import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds';
import basicSetup from './configs/basicSetup';

publications();
methods();
addInitialData({ redeploy: false });
basicSetup();
