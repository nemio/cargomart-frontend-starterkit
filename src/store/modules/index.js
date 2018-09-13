// @flow

import {combineReducers} from 'redux';

import repositories from './entities/repositories/reducer';

export default combineReducers({
  repositories,
});
