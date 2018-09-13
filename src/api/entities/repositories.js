// @flow
import _transform from 'lodash/transform';

import request from '../request';

const defaultFetchParams = {
  text: '',
  language: 'javascript',
  sort: 'stars',
  order: 'desc',
};

const stringifyQuery = (params: TFetchParams = {}) =>
  _transform(
    params,
    (result, value, key) => {
      if (key === 'text') {
        value && result.push(value);
        return;
      }

      result.push(`${key}:${value}`);
    },
    []
  );

export const fetchRepositoriesApi = (params = {}) => {
  return request
    .get(`api/search/repositories`, {
      params: {
        q: stringifyQuery(params).join('+'),
        sort: params.sort || defaultFetchParams.sort,
        order: params.order || defaultFetchParams.order,
      },
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    })
    .then(response => response.data);
};

export type TFetchParams = {
  text: string,
  language: string,
  order: string,
  sort: string,
};
