import React from 'react';
import PropTypes from 'prop-types';
import './Letter.css';

const HIDDEN_SYMBOL = '_';

const Word = ({ letter, feedback }) => (
  <div className={`word ${feedback}`}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : letter}
    </span>
  </div>
);

Word.propTypes = {
  letter: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'hidden',
    'visible',
  ]).isRequired
}

export default Word;
