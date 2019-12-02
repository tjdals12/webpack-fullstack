import React from 'react';
import PropTypes from 'prop-types';

export default function Profile({ name, age }) {
    return (
        <div>
            <p>{name}</p>
            <p>{age}</p>
        </div>
    );
}

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
};
