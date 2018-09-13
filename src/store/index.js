import {configureStore} from './config';
import reducers from './modules';

export default configureStore(reducers);
