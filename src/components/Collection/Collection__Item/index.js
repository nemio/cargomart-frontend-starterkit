// @flow

import * as React from 'react';
import cn from 'classnames';

import helpers from 'styles/helpers.less';

import styles from './styles.less';

export type Props = {
  item: string,
  isActive: boolean,
  onClick(item: string): void,
};

class CollectionItem extends React.PureComponent<Props> {
  handleClick = () => {
    const {onClick, item} = this.props;

    onClick(item);
  };

  render() {
    const {item, isActive} = this.props;

    return (
      <div
        className={cn(styles.item, helpers.pv, helpers['ph+'], helpers.mt, {
          [styles.active]: isActive,
        })}
        onClick={this.handleClick}
      >
        {item}
      </div>
    );
  }
}

export default CollectionItem;
