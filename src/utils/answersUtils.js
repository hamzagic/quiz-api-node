const arraysAreEqual = (correctAnswers, answers) => {
  if(correctAnswers.length !== answers.length) {
    return false;
  } 
  for (let i=0; i < correctAnswers.length; i++) {
    if(correctAnswers[i] !== answers[i]) {
      return false;
    }
  }
  return true;
}

const arrayDifferences = (correctAnswers, answers) => {
  const differences = [];
  const maxLength = correctAnswers.length;

  for (let i = 0; i < maxLength; i++) {
    if (correctAnswers[i] !== answers[i]) {
      differences.push({questionIndex: i, correct: correctAnswers[i], answered: answers[i]});
    }
  }

  return differences;
}

module.exports = { arraysAreEqual, arrayDifferences };