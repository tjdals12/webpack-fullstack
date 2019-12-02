import React from 'react';
import { render } from '@testing-library/react';
import Profile from '../Profile';

describe('<Profile />', () => {
    it('matches snapshot', () => {
        const utils = render(<Profile name="Min" age="26" />);
        expect(utils.container).toMatchSnapshot();
    });

    it('has two text', () => {
        const utils = render(<Profile name="Min" age="26" />);

        utils.getByText('Min');
        utils.getByText('26');
    });
});
