// @flow

import _at from 'lodash/at';

import type {TGlobalStore} from 'store/types';

import type {TRepository} from './types';
import {Status} from '../types';

export function selectRepositoriesByQuery(
  state: TGlobalStore,
  query: string
): TRepository[] {
  const repositories = state.repositories.collections[query];

  return (
    (repositories && _at(state.repositories.entitles, repositories.ids)) ||
    []
  ).filter(Boolean);
}

export function selectStatus(state: TGlobalStore, query: string): Status {
  const repositories = state.repositories.collections[query];

  return repositories && repositories.status;
}

export function selectError(state: TGlobalStore, query: string): Status {
  const repositories = state.repositories.collections[query];

  return repositories && repositories.error;
}
