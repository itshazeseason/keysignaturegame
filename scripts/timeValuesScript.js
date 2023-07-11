const noteNameLst = ['semibreve', 'minim', 'crotchet', 'quaver']
const noteToGlyph = {
  semibreve :'𝅝',
  minim: '𝅗𝅥',
  crotchet: '𝅘𝅥',
  quaver: '𝅘𝅥𝅮'
}
var ansLst1; 
var ansLst2;
const noteToCount = {
  semibreve: "4",
  minim: "2",
  crotchet: "1",
  quaver: "1/2"
}

window.onload = function () {
  generateQuestion();
  generateQuestion2();
};

function toggleNoteTable(){
  const noteTable = document.getElementById('noteTable'); 
  if (noteTable.style.display == "none"){
    noteTable.style.display ="block";
  } else {
    noteTable.style.display="none";
  }
}
// generate question notes
// shuffle function
const shuffle = (input) => { 
  var array = [].concat(input);
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 
  
function generateQuestion(){
  // setup
  // document.getElementById('again').style.display = "none";
  // document.getElementById('submit1').style.display = "block";
  // 1) shuffle list
  ansLst1 = shuffle(noteNameLst);
  // clear inputs
  for (let i = 0; i < ansLst1.length; i++) {
    // reset game 1
    document.getElementById(`game1ans${i+1}`).value = '';
    changeIcon('game1',i+1,'reset');
  }
  // 2) set the questionid
  for (let i = 0; i < ansLst1.length; i++) {
    document.getElementById(`game1question${i+1}`).innerHTML = noteToGlyph[ansLst1[i]];
    changeIcon('game1',i+1,'reset');
  }
}

function generateQuestion2(){
  // setup
  // document.getElementById('again').style.display = "none";
  // document.getElementById('submit1').style.display = "block";
  // 1) shuffle list
  ansLst2 = shuffle(shuffle(noteNameLst));
  // clear inputs
  for (let i = 0; i < ansLst2.length; i++) {
    // reset game 1
    document.getElementById(`game2ans${i+1}`).value = '';
    changeIcon('game2',i+1,'reset');
  }
  // 2) set the questionid
  for (let i = 0; i < ansLst2.length; i++) {
    document.getElementById(`game2question${i+1}`).innerHTML = noteToGlyph[ansLst2[i]];
    changeIcon('game2',i+1,'reset');
  }
}



function submitAns(){
  console.log("submitting game 1")
  console.log(ansLst1);
  console.log(noteNameLst);
  // check each input against ans
  const checkLst = [];
  for (let i = 0; i < ansLst1.length; i++) {
    // check ans input value is same
    if  ( document.getElementById(`game1ans${i+1}`).value == noteToCount[ansLst1[i]]){
      checkLst.push(true);
      changeIcon('game1',i+1, 'correct');
    } else {
      checkLst.push(false);
      changeIcon('game1',i+1, 'wrong');
    }
  }
  if (!checkLst.includes(false)){
    // document.getElementById('again').style.display = "block";
    document.getElementById('submit1').style.display = "none";
    document.getElementById('game2').style.display = 'flex';
  }
  
}
function submitAns2(){
  // check each input against ans
  const checkLst = [];
  for (let i = 0; i < ansLst2.length; i++) {
    // check ans input value is same
    if  ( (document.getElementById(`game2ans${i+1}`).value).toLowerCase() == ansLst2[i]){
      checkLst.push(true);
      changeIcon('game2',i+1, 'correct');
    } else {
      checkLst.push(false);
      changeIcon('game2',i+1, 'wrong');
    }
  }
  if (!checkLst.includes(false)){
    // document.getElementById('again').style.display = "block";
    document.getElementById('submit2').style.display = "none";
  }
  
}

function changeIcon(game, questionIndex, state){
  if (state == "correct"){
    document.getElementById(`${game}iconRight${questionIndex}`).style.display = "block";
    document.getElementById(`${game}iconWrong${questionIndex}`).style.display = "none";
  } else if (state=="wrong"){
      document.getElementById(`${game}iconRight${questionIndex}`).style.display = "none";
      document.getElementById(`${game}iconWrong${questionIndex}`).style.display = "block";
  } else {
    document.getElementById(`${game}iconRight${questionIndex}`).style.display = "none";
    document.getElementById(`${game}iconWrong${questionIndex}`).style.display = "none";
  }

}