var score = 0;
var totalTries = 0;
var currentChoice;
var currentQuestion;
var currentAnswer;
var answerState = "reset";

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
}

window.onload = function() {
    randomQuestion();
    // vex flow example
    console.log("VexFlow Build:", Vex.Flow.BUILD);

    const { Factory } = Vex.Flow;

    const factory = new Factory({
        renderer: { elementId: "test-vexflow", width: 500, height: 200 },
    });
    const score = factory.EasyScore();
    factory
        .System()
        .addStave({
            voices: [score.voice(score.notes("C#5/q, B4, A4, G#4", { stem: "up" })), score.voice(score.notes("C#4/h, C#4", { stem: "down" }))],
        })
        .addClef("treble")
        .addTimeSignature("4/4");
    factory.draw();
}

function selectKeySig(clicked_id){
    console.log(clicked_id);
    document.getElementById("selected").src = "KeySigImg/" + clicked_id + ".png";
    currentChoice = clicked_id;
}

function randomQuestion(){
    document.getElementById("answer").style.display = "none";
    const questionLst = Object.keys(answerKey);
    currentQuestion = questionLst[Math.floor(Math.random() * questionLst.length)];
    // sets the question text
    document.getElementById("question").innerHTML = currentQuestion;
    // sets the correct answer image to id answer
    currentAnswer = answerKey[currentQuestion];
    document.getElementById("answer").src = "KeySigImg/" + answerKey[currentQuestion] + ".png";
    answerState = "reset"
}

function nextRound(){
    // check answerState
    if (answerState == "shown"){
        totalTries +=1;
        randomQuestion();
    } else if (answerState == "reset"){
        // check if answer is correct and update score and tries
        if (currentChoice == currentAnswer){
            score += 1;
            totalTries +=1;
            randomQuestion();
        } else {
            totalTries +=1;
        }
    } else {
        randomQuestion();
    }
    // update score
    document.getElementById("roundNum").innerHTML = `${score}/${totalTries}`;
    // reset submit button
    document.getElementById("submit").innerHTML = "submit";
}

function showAnswer(){
    document.getElementById("answer").style.display = "inline-block";
    // change submit to next question
    document.getElementById("submit").innerHTML = "Next";
    answerState = "shown";
}

