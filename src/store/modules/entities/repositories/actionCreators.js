// @flow

import {stringify} from 'query-string';

import {fetchRepositoriesApi} from 'api/entities/repositories';

import {FETCH_REPOSITORIES} from './actions';

export function fetchRepositories(params) {
  return {
    type: FETCH_REPOSITORIES,
    meta: {
      query: stringify(params),
    },
    payload: fetchRepositoriesApi(params),
  };
}
