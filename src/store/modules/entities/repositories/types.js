// @flow

import { Status } from '../types';

export type TRepository = {
  author: string;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  currentPeriodStars: number
}

export type TStoreRepository = {
  entitles: {
    [id: number]: TRepository,
  },
  collections: {
    [key: string]: {
      ids: number[],
      status: Status,
      page: ?number,
      error: ?string,
    }
  },
}
