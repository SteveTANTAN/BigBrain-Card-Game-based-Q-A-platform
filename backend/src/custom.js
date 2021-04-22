/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  return question;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  var anser = [];
  const questionChoice = question.answers
  const questiontype = question.Multi
  const questionanswer = question.correctAnswer

  questionChoice.map((item, idx) => {
    if (questiontype === 'true') {
      questionanswer.map((ans) => {
        if (ans.value === item) {
          anser.push(idx);
        }
        console.log(ans.value)
        return ans;
      })
    } else {
      if (questionanswer.value === item) {
        anser.push(idx);
      }
    }
    return item;
  })
  return anser // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  var anser = [];
  const questionChoice = question.answers
  questionChoice.map((item, idx) => {
    anser.push(idx);
    return item;
  })
  return anser;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return 10;
};
