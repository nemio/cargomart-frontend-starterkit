// @flow

import * as React from 'react';
import cn from 'classnames';

import grid from 'styles/grid.less';

import styles from './styles.less';
import helpers from 'styles/helpers.less';

export type Props = {|
  +children?: React.Node,
|};

class Header extends React.PureComponent<Props> {
  render() {
    return (
      <div className={cn(grid.row, styles.header, helpers['pv+'])}>
        {this.props.children}
      </div>
    );
  }
}

export default Header;
