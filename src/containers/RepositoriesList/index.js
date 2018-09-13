// @flow

import React from 'react';
import cn from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {stringify} from 'query-string';

import {mdiLoading} from '@mdi/js';
import {Icon} from '@mdi/react';

import RepositoriesList from 'components/RepositoriesList';
import Panel, {PanelType} from 'components/Panel';

import {fetchRepositories} from 'store/modules/entities/repositories/actionCreators';
import {
  selectError,
  selectRepositoriesByQuery,
  selectStatus,
} from 'store/modules/entities/repositories/selectors';
import type {TRepository} from 'store/modules/entities/repositories/types';
import {Status} from 'store/modules/entities/types';

type TStateProps = {
  items: TRepository[],
};

type TDispatchProps = {
  actions: actionCreators,
};

type TOwnProps = {
  text: string,
  language: string,
  className: ?string,
};

type TProps = TOwnProps | TStateProps | TDispatchProps;

const actionCreators = {
  fetchRepositories,
};

class RepositoriesListContainer extends React.PureComponent<TProps> {
  constructor(props: TProps) {
    super(props);

    const {actions, text, language} = props;

    actions.fetchRepositories({
      text,
      language,
    });
  }

  componentDidUpdate(prevProps: TProps) {
    if (
      this.props.text !== prevProps.text ||
      this.props.language !== prevProps.language
    ) {
      this.handleSearch();
    }
  }

  handleSearch = () => {
    const {actions, text, language} = this.props;

    actions.fetchRepositories({
      text,
      language,
    });
  };

  render() {
    const {className, items, status, error} = this.props;

    if (status === Status.ERROR) {
      return <Panel type={PanelType.ERROR}>{error}</Panel>;
    }

    if (status === Status.LOADING) {
      return (
        <Panel>
          <Icon size={3} path={mdiLoading} spin />
        </Panel>
      );
    }

    if (status !== Status.LOADING && !items.length) {
      return (
        <Panel type={PanelType.INFO}>
          Ничего не найдено. Попробуйте изменить запрос
        </Panel>
      );
    }

    return <RepositoriesList items={items} className={cn(className)} />;
  }
}

const mapStateToProps = (state, {language, text}: TOwnProps) => {
  const query = stringify({
    language,
    text,
  });

  return {
    items: selectRepositoriesByQuery(state, query),
    status: selectStatus(state, query),
    error: selectError(state, query),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoriesListContainer);
