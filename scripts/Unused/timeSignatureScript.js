





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
// variables for answers
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
window.onload = function () {
  renderTest();
};

function selectChoice(clicked_id) {
  console.log(clicked_id);
  // document.getElementById("selected").src = "KeySigImg/" + clicked_id + ".png";
  document.getElementById("selected").innerHTML = clicked_id;
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

function renderTest(){
  testDiv = document.getElementById("test");
  testRenderer = new Renderer(testDiv, Renderer.Backends.SVG);
  // Configure the rendering context.
  testRenderer.resize(40, 160);
  var testContext = testRenderer.getContext();
  // group is used so that you can delete the last used staff else it will be stacked
  var testGroup = testContext.openGroup();
  var testStave = new Stave(10, 40, 40, { left_bar: false, right_bar:false });
  testStave.addTimeSignature("4/4")
  testStave.setContext(testContext).draw();
  testContext.closeGroup();
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
