// @flow

import keyBy from 'lodash/keyBy'

export const normalizeData = (externalData) => ({
  byId: keyBy(externalData, 'id'),
  result: externalData.map(({id}) => id),
});
