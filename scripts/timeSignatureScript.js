var score = 0;
var totalTries = 0;
var accuracy = 0;

// states
var answerState = "reset";
var currentChoice = ""



function randomQuestion() {
  document.getElementById("answer").style.display = "none";
  const questionLst = Object.keys(answerKey);
  currentQuestion = questionLst[Math.floor(Math.random() * questionLst.length)];
  // sets the question text
  document.getElementById("question").innerHTML = currentQuestion;
  // sets the correct answer image to id answer
  currentAnswer = answerKey[currentQuestion];
  console.log(`current answer: ${currentAnswer}`);
  // document.getElementById("answer").src =
  //   "KeySigImg/" + answerKey[currentQuestion] + ".png";
  renderAnswerKeySignature(keyToVex[currentAnswer]);
  // renderKeySignature(keyToVex[currentAnswer],questionContext,questionGroup,questionStave);
  answerState = "reset";
}

function nextRound() {
  // check answerState
  if (answerState == "shown") {
    totalTries += 1;
    randomQuestion();
  } else if (answerState == "reset") {
    // check if answer is correct and update score and tries
    if (currentChoice == currentAnswer) {
      score += 1;
      totalTries += 1;
      randomQuestion();
    } else {
      totalTries += 1;
    }
  } else {
    randomQuestion();
  }
  // update score
  document.getElementById("roundNum").innerHTML = `${score}/${totalTries}`;
  // reset submit button
  document.getElementById("submit").innerHTML = "submit";
}

function showAnswer() {
  document.getElementById("answer").style.display = "inline-block";
  // change submit to next question
  document.getElementById("submit").innerHTML = "Next";
  answerState = "shown";
}
