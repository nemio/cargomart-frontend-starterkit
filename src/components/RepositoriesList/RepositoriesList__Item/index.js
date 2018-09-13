// @flow

import React from 'react';
import cn from 'classnames';
import {mdiStar, mdiSourceFork} from '@mdi/js';

import Avatar from 'components/Avatar';
import Tag from 'components/Tag';

import type {TRepository} from 'store/modules/entities/repositories/types';

import grid from 'styles/grid.less';
import helpers from 'styles/helpers.less';

import styles from './styles.less';

type Props = {|
  +item: TRepository,
  +className: ?string,
|};

export default class RepositoriesListItem extends React.PureComponent<Props> {
  render() {
    const {className, item} = this.props;

    return (
      <div className={cn(grid.row, styles.item, helpers['p+'], className)}>
        <a
          className={styles.link}
          href={item.svn_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.title}>{item.name}</div>
        </a>
        <div className={cn(styles.description, helpers['mv++'])}>
          {item.description}
        </div>
        <div className={cn(grid.row, styles.meta)}>
          <div className={cn(grid.col, grid.s12)}>
            <Tag withIcon icon={mdiStar}>
              {item.stargazers_count}
            </Tag>
            <Tag withIcon icon={mdiSourceFork}>
              {item.forks_count}
            </Tag>
            <div
              className={cn(styles.authors, helpers.p, helpers['float-right'])}
            >
              Owner: <Avatar imgUrl={item.owner.avatar_url} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
