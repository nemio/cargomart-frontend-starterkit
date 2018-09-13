// @flow

import * as React from 'react';
import cn from 'classnames';

import helpers from 'styles/helpers.less';

import styles from './styles.less';

export const PanelType = {
  ERROR: 'error',
  INFO: 'info',
};

export type Props = {
  type: PanelType,
  children: React.Node,
};

class Panel extends React.PureComponent<Props> {
  render() {
    return (
      <div className={cn(styles.panel, helpers.p, styles[this.props.type])}>
        {this.props.children}
      </div>
    );
  }
}

export default Panel;
