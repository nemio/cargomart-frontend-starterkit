// @flow

import * as React from 'react';
import classNames from 'classnames/bind';

import style from './Button.less';

const cx = classNames.bind(style);

export type Props = {|
  +className?: string,
  +children?: React.Node,
|};

class Button extends React.PureComponent<Props> {
  render() {
    return (
      <button className={cx('Button', this.props.className)}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
