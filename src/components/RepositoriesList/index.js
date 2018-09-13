// @flow

import React from 'react';

import type {TRepository} from 'store/modules/entities/repositories/types';
import RepositoriesListItem from './RepositoriesList__Item';

type Props = {|
  +items: TRepository[],
  +className: ?string,
|};

export default class RepositoriesList extends React.PureComponent<Props> {
  _renderItem = (item: TRepository) => {
    return <RepositoriesListItem key={item.id} item={item} />;
  };

  render() {
    const {className, items} = this.props;

    return <div className={className}>{items.map(this._renderItem)}</div>;
  }
}
