import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('<Counter />', () => {
    it('matches snapshot', () => {
        const utils = render(<Counter />);
        expect(utils.container).toMatchSnapshot();
    });

    it('has a count and two buttons', () => {
        const utils = render(<Counter />);

        utils.getByText('0');
        utils.getByText('+');
        utils.getByText('-');
    });

    it('onIncrease', () => {
        const utils = render(<Counter />);

        const count = utils.getByText('0');
        const plusButton = utils.getByText('+');

        fireEvent.click(plusButton);
        expect(count.textContent).toBe('1');
    });

    it('onDecrease', () => {
        const utils = render(<Counter />);

        const count = utils.getByText('0');
        const minusButton = utils.getByText('-');

        fireEvent.click(minusButton);
        expect(count.textContent).toBe('-1');
    });
});
