// @flow

import * as React from 'react';
import cn from 'classnames';
import {Icon} from '@mdi/react';

import helpers from 'styles/helpers.less';
import styles from './styles.less';

export type Props = {
  withIcon: boolean,
  icon: string,
  children: React.Node,
};

class Tag extends React.PureComponent<Props> {
  render() {
    const {children, withIcon, icon} = this.props;

    return (
      <div className={cn(styles.tag, helpers.p)}>
        {withIcon && <Icon path={icon} />}
        {children}
      </div>
    );
  }
}

export default Tag;
