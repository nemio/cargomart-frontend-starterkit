// @flow

import * as React from 'react';
import cn from 'classnames';

import styles from './styles.less';

export type Props = {
  imgUrl: string,
};

class Avatar extends React.PureComponent<Props> {
  render() {
    const {imgUrl} = this.props;

    return (
      <div className={cn(styles.avatar)}>
        <img className={styles.img} src={imgUrl} />
      </div>
    );
  }
}

export default Avatar;
