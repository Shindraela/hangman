import React from 'react';
import Letter from './Letter';
import Word from './Word';
import './App.css';
import './Letter.css';

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const WORDS = ['ARTICHOKE','EGGPLANT','ASPARAGUS','CHICKPEAS','PEANUTS','PEAS','BROCCOFLOWER','BROCCOLI','CABBAGE','CAULIFLOWER','CELERY','ENDIVE','FIDDLEHEADS','FRISEE','FENNEL','KALE','SPINACH','ANISE','BASIL','CARAWAY','BASIL','CORIANDER','CHAMOMILE','OREGANO','PARSLEY','ROSEMARY'];

class App extends React.Component {
  state = {
    letters: ALPHABET,
    word: this.generateWord(),
    currentLetter: [],
    matchedLettersIndices: [],
    isButtonDisabled: [],
    currentIndex: 0,
    counter: 0,
    numberOfLetters: 0
  };

  // Arrow fx for binding
  handleLetterClick = (letter, index) => {
    this.setState({ currentLetter: [letter], currentIndex: [index] });

    this.handleNewLetter(letter, index);
  }

  resetGame = () => {
    this.setState({
      letters: ALPHABET,
      word: this.generateWord(),
      currentLetter: [],
      matchedLettersIndices: [],
      isButtonDisabled: [],
      currentIndex: 0,
      counter: 0,
      numberOfLetters: 0
    });
  }

  countInArray(array, letter) {
    return array.filter(item => item === letter).length;
  }

  handleNewLetter(letter, index) {
    const { word, matchedLettersIndices, numberOfLetters, isButtonDisabled, counter } = this.state;
    const matched = word.includes(letter);
    const newLetter = word.includes(letter) ? letter : "";
    const twoLetters = this.countInArray(word, letter);
    const newCounter = counter + 1;
    const newNumber = twoLetters > 1 ? numberOfLetters + twoLetters : numberOfLetters + 1;
    const indexButton = [];
    indexButton.push(index);

    if(matched) {
      this.setState({
        currentLetter: newLetter,
        matchedLettersIndices: [...matchedLettersIndices, ...newLetter],
        numberOfLetters: newNumber
      });
    } else {
      this.setState({
        counter: newCounter
      });
    }

    this.setState({
      isButtonDisabled: [...isButtonDisabled, ...indexButton]
    });

  }

  generateWord() {
    const words = WORDS;
    const word = words[Math.floor(Math.random() * words.length)];
    const result = word.split('');

    return result;
  }

  getFeedbackForWord(letter) {
    const { matchedLettersIndices } = this.state;
    const indexMatched = matchedLettersIndices.includes(letter);
    return indexMatched ? 'visible' : 'hidden';
  }

  render() {
    const { letters, word, numberOfLetters, isButtonDisabled, counter } = this.state;
    const success = numberOfLetters === word.length;
    const failure = counter === 7;

    return (
      <div>
        <div className="word">
          {word.map((letter, index) => (
            <Word
              letter={letter}
              key={index}
              feedback={this.getFeedbackForWord(letter)}
            />
          ))}
        </div>

        {letters.map((letter, index) => (
          <Letter
            letter={letter}
            key={index}
            index={index}
            disabled={isButtonDisabled.includes(index) || (counter === 7 || success) ? true : false}
            onClick={this.handleLetterClick}
          />
        ))}

        {success && <div>You've won !</div>}
        {failure && <div>You've lost ! The word was : {word}</div>}
        {(success || failure) && <button type="button" onClick={this.resetGame}>Restart</button>}
      </div>
    );
  }
}

export default App;
