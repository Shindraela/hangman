import React from 'react';
import PropTypes from 'prop-types';
import './Letter.css';

const Letter = ({ letter, index, disabled, onClick }) => (
  <button type="button" className="letter" index={index} disabled={disabled} onClick={() => onClick(letter, index)}>{letter}</button>
);

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Letter;
