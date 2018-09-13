// @flow

import {handleActions} from 'redux-actions';
import safeGet from 'lodash/get';

import {handleAsyncAction} from 'middlewares/async';

import {FETCH_REPOSITORIES} from './actions';
import {normalizeData} from './scheme';

import {Status} from '../types';
import {TStoreRepository} from './types';

const initState: TStoreRepository = {
  entitles: {},
  collections: {},
};

export default handleActions(
  {
    [FETCH_REPOSITORIES]: handleAsyncAction({
      started(
        state,
        {
          meta: {query},
        }
      ) {
        return {
          ...state,
          collections: {
            ...state.collections,
            [query]: {
              ...state.collections[query],
              status: state.collections[query]
                ? Status.UPDATING
                : Status.LOADING,
            },
          },
        };
      },
      succeeded(
        state,
        {
          meta: {query},
          payload,
        }
      ) {
        const data = normalizeData(payload.items);

        return {
          ...state,
          entitles: {
            ...state.entitles,
            ...data.byId,
          },
          collections: {
            ...state.collections,
            [query]: {
              ids: data.result,
              page: 0,
              status: Status.READY,
            },
          },
        };
      },
      failed(
        state,
        {
          meta: {query},
          payload,
        }
      ) {
        return {
          ...state,
          collections: {
            ...state.collections,
            [query]: {
              ids: [],
              error:
                safeGet(payload, 'response.data.errors.[0].message') ||
                safeGet(payload, 'response.data.message'),
              status: Status.ERROR,
            },
          },
        };
      },
    }),
  },
  initState
);
