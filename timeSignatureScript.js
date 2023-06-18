var score = 0;
var totalTries = 0;
var accuracy = 0;
var currentChoice = "0n";
var currentQuestion= "0n";
var currentAnswer = "0n";
var answerState = "reset";
// vexflow constants
const { Renderer, Stave } = Vex.Flow;
var clef = "treble";
// variables for user
var userGroup;
var userStave;
var userDiv;
var userContext;
// variables for question
var questionGroup;
var questionStave;
var questionDiv;
var questionContext;
// key signature and corresponding answer
const answerKey = {
  "C Major": "0n",
  "G Major": "1s",
  "D Major": "2s",
  "A Major": "3s",
  "E Major": "4s",
  "B Major": "5s",
  "F# Major": "6s",
  "C# Major": "7s",
  "F Major": "1f",
  "B♭ Major": "2f",
  "E♭ Major": "3f",
  "A♭ Major": "4f",
  "D♭ Major": "5f",
  "G♭ Major": "6f",
  "C♭ Major": "7f",
  "A minor": "0n",
  "E minor": "1s",
  "B minor": "2s",
  "F# minor": "3s",
  "C# minor": "4s",
  "G# minor": "5s",
  "D# minor": "6s",
  "A# minor": "7s",
  "D minor": "1f",
  "G minor": "2f",
  "C minor": "3f",
  "F minor": "4f",
  "B♭ minor": "5f",
  "E♭ minor": "6f",
  "A♭ minor": "7f",
};

const keyToVex = {
  "0n": "C",
  "1s": "G",
  "2s": "D",
  "3s": "A",
  "4s": "E",
  "5s": "B",
  "6s": "F#",
  "7s": "C#",
  "1f": "F",
  "2f": "Bb",
  "3f": "Eb",
  "4f": "Ab",
  "5f": "Db",
  "6f": "Gb",
  "7f": "Cb",
};

window.onload = function () {
  renderQuestionAnsRenderer();
  renderUserRenderer();
  randomQuestion();
};

function selectKeySig(clicked_id) {
  console.log(clicked_id);
  // document.getElementById("selected").src = "KeySigImg/" + clicked_id + ".png";
  renderUserKeySignature(keyToVex[clicked_id]);
  // renderKeySignature(keyToVex[clicked_id],userContext,userGroup,userStave);
  currentChoice = clicked_id;
}

function changeClef(change_clef) {
  console.log(change_clef);
  clef = change_clef
  //rerender answer
  renderAnswerKeySignature(keyToVex[currentAnswer]);
  //rerender current select
  console.log(`currentChoice: ${currentChoice}`);
  renderUserKeySignature(keyToVex[currentChoice]);
}

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

// function renderKeySignature(keySig, context, stave, group) {
//   // delete old staff
//   context.svg.removeChild(group);
//   // create new staff
//   group = context.openGroup();
//   stave.setClef("clef");
//   stave.setKeySignature(keySig);
//   // Connect it to the rendering context and draw!
//   stave.setContext(context).draw();
//   context.closeGroup();
// }

function renderKeySignature(keySig, context, group, stave) {
  // delete old staff
  context.svg.removeChild(group);
  // create new staff
  group = context.openGroup();
  stave.setClef(clef);
  stave.setKeySignature(keySig);
  // Connect it to the rendering context and draw!
  stave.setContext(context).draw();
  context.closeGroup();
}

function renderUserKeySignature(keySig) {
  // delete old staff
  userContext.svg.removeChild(userGroup);
  // create new staff
  userGroup = userContext.openGroup();
  userStave.setClef(clef);
  userStave.setKeySignature(keySig);
  // Connect it to the rendering context and draw!
  userStave.setContext(userContext).draw();
  userContext.closeGroup();
}
function renderAnswerKeySignature(keySig) {
  // delete old staff
  questionContext.svg.removeChild(questionGroup);
  // create new staff
  questionGroup = questionContext.openGroup();
  questionStave.setClef(clef);
  questionStave.setKeySignature(keySig);
  // Connect it to the rendering context and draw!
  questionStave.setContext(questionContext).draw();
  questionContext.closeGroup();
}


function renderQuestionAnsRenderer() {
  questionDiv = document.getElementById("answer");
  questionRenderer = new Renderer(questionDiv, Renderer.Backends.SVG);
  // Configure the rendering context.
  questionRenderer.resize(240, 160);
  questionContext = questionRenderer.getContext();
  // group is used so that you can delete the last used staff else it will be stacked
  questionGroup = questionContext.openGroup();
  // Create a stave of width 400 at position 10, 40 on the canvas.
  questionStave = new Stave(10, 40, 240, { left_bar: false });
  questionStave.setClef(clef);
  questionStave.setContext(questionContext).draw();
  questionContext.closeGroup();
}

function renderUserRenderer() {
  userDiv = document.getElementById("selected");
  userRenderer = new Renderer(userDiv, Renderer.Backends.SVG);
  // Configure the rendering context.
  userRenderer.resize(240, 160);
  userContext = userRenderer.getContext();
  // group is used so that you can delete the last used staff else it will be stacked
  userGroup = userContext.openGroup();
  // Create a stave of width 400 at position 10, 40 on the canvas.
  userStave = new Stave(10, 40, 240, { left_bar: false });
  userStave.setClef(clef);
  userStave.setContext(userContext).draw();
  userContext.closeGroup();
}
