import * as React from 'react';
import {shallow} from 'enzyme';

import Button from './Button';

describe('Button', () => {
  it('snapshot test', () => {
    expect(shallow(<Button/>)).toMatchSnapshot();
  });
});
