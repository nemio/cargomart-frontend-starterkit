// @flow

import * as React from 'react';
import cn from 'classnames';
import {Form, Field, FormSpy} from 'react-final-form';
import Icon from '@mdi/react';
import {mdiMagnify} from '@mdi/js';

import logo from 'assets/icons/github-sign.svg';

import Header from 'components/Header';

import RepositoriesList from 'containers/RepositoriesList';

import grid from 'styles/grid.less';
import helpers from 'styles/helpers.less';

import styles from './styles.less';
import Collection from '../../components/Collection';

type Props = {};

class Root extends React.Component<Props> {
  languages = ['javascript', 'php', 'go', 'java', 'python'];
  state = {
    searchQuery: '',
    language: this.languages[0],
  };

  handleSubmit = () => {
    // Так и не понял почему это обязталеьная часть инициальзации
  };

  handleSearchOnChange = ({values: {search}}) => {
    this.setState({
      searchQuery: search,
    });
  };

  handleLanguageChange = item => {
    this.setState({
      language: item,
    });
  };

  render() {
    const {searchQuery, language} = this.state;

    return (
      <React.Fragment>
        <Header>
          <div className={cn(grid.col, grid.s2)}>
            <img
              className={cn(styles.logo, helpers.p, helpers['ml+'])}
              src={logo}
            />
          </div>
          <div className={cn(grid.col, grid.s8, styles.title)}>
            GitHub SE (Search Engine)
          </div>
          <div className={cn(grid.col, grid.s2, styles.title)}>&nbsp;</div>
        </Header>
        <div className={grid.container}>
          <div className={cn(grid.row, helpers['mv++'])}>
            <Form
              initialValues={{search: searchQuery}}
              onSubmit={this.handleSubmit}
              render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  <FormSpy
                    onChange={this.handleSearchOnChange}
                    subscription={{values: true}}
                  />
                  <div className={styles.search}>
                    <label>Search</label>
                    <span>
                      <Icon
                        className={styles.icon}
                        size={1}
                        path={mdiMagnify}
                      />
                    </span>
                    <Field
                      name="search"
                      component="input"
                      type="text"
                      placeholder="Search criteria, such as `name`, `auth`"
                    />
                  </div>
                </form>
              )}
            />
          </div>
          <div className={grid.row}>
            <div className={cn(grid.col, grid.s8)}>
              <RepositoriesList text={searchQuery} language={language} />
              &nbsp;
            </div>
            <div
              className={cn(
                grid.col,
                grid.s4,
                helpers['pl++'],
                helpers.pv,
                helpers['ph+']
              )}
            >
              <Collection
                selectedItem={language}
                items={this.languages}
                onClick={this.handleLanguageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Root;
