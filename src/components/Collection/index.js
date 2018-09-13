// @flow

import * as React from 'react';
import cn from 'classnames';

import helpers from 'styles/helpers.less';

import styles from './styles.less';
import CollectionItem from './Collection__Item';

export type Props = {
  items: string[],
  selectedItem: string,
  onClick(item: string): void,
};

class Collection extends React.PureComponent<Props> {
  render() {
    const {items, selectedItem, onClick} = this.props;

    return (
      <div className={cn(styles.collection, helpers.pv, helpers['ph+'])}>
        {items.map(item => (
          <CollectionItem
            key={item}
            item={item}
            isActive={selectedItem === item}
            onClick={onClick}
          />
        ))}
      </div>
    );
  }
}

export default Collection;
