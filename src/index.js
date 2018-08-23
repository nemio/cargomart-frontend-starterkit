// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button';

type Props = {};

class App extends React.Component<Props> {
  render() {
    return <div>Hello Word <Button>Click me</Button></div>;
  }
}

const domContainer = document.getElementById('root');
if (domContainer) {
  ReactDOM.render(<App />, domContainer);
}
