import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    onIncrease = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                count: prevState.count + 1,
            };
        });
    };

    onDecrease = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                count: prevState.count - 1,
            };
        });
    };

    render() {
        const { count } = this.state;
        const { onIncrease, onDecrease } = this;

        return (
            <div>
                <p>{count}</p>
                <button type="button" onClick={() => onIncrease()}>
                    +
                </button>
                <button type="button" onClick={() => onDecrease()}>
                    -
                </button>
            </div>
        );
    }
}

export default Counter;
