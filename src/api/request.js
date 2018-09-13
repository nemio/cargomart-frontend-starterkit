import axios from 'axios';

import {defaultHeaders} from './defaults';

export default axios.create({
  timeout: 4000,
  headers: {
    ...defaultHeaders,
  },
});
