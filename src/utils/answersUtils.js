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
  let correct = 0;
  let wrong = 0;

  for (let i = 0; i < maxLength; i++) {
    if (correctAnswers[i] !== answers[i]) {
      differences.push({questionIndex: i, correct: correctAnswers[i], answered: answers[i]});
      wrong++;
    } else {
      differences.push({questionIndex: i, correct: correctAnswers[i], answered: correctAnswers[i]});
      correct++;
    }
  }

  return {differences, correct, wrong};
}

module.exports = { arraysAreEqual, arrayDifferences };