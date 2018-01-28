var output = document.getElementById('output');
var bAnswer = document.getElementsByClassName('btnAns');
var myObj = '',
  page = 0,
  crtAnswer = 0;
var myQueRep = [];
loadQuestions();

//event listeners
btnPre.onclick = function() {
  buildQuiz(page - 1)
};
btnNxt.onclick = function() {
  buildQuiz(page + 1)
};

function loadQuestions() {
  var a = new XMLHttpRequest();
  a.open("GET", "https://api.myjson.com/bins/12qsf", true);
  a.onreadystatechange = function() {
    if (a.readyState == 4) {
      myObj = JSON.parse(a.responseText);
      buildQuiz(0);
    }
  }
  a.send();
}

function hideshow() {
  if (myObj.length <= page) {
    document.getElementById('btnNxt').style.display = 'none';
  } else {
    document.getElementById('btnNxt').style.display = 'block';
  }

  if (0 >= page) {
    document.getElementById('btnPre').style.display = 'none';
  } else {
    document.getElementById('btnPre').style.display = 'block';
  }
}

function buildQuiz(pg) {
  console.log(page);
  console.log(myObj.length);
  page = pg;
  hideshow();
  if (page >= 0) {

    //If quiz is completed
    if (myObj.length < (page + 1)) {
      page = myObj.length;
      var holderHTML = '';

      var score = 0;
      var max=0,result,freq = 0;
      for(var i=0; i < myQueRep.length; i++){
          if(myQueRep[i]===myQueRep[i+1]){
              freq++;
          }
          else {
              freq=0;
          }
          if(freq>max){
              result = myQueRep[i];
              max = freq;
          }
      }
      console.log('hai');
      console.log(result);
      console.log('bye');

      if(result == 0) {
          holderHTML += 'you are freaking cool u answered a the most';
      } else if(result == 1)  {
          holderHTML += "answered 1 (b) the most"
      } else if(result ==2) {
          holderHTML += "answered 2 (c) the most"
      }


      output.innerHTML = holderHTML;

    } else {
      var myQuestion = myObj[page].question;
      var myCorrect = myObj[page].correct;
      crtAnswer = myObj[page].answers[myCorrect];
      var questionHolder = '';
      var yesCor = '';
      for (var i in myObj[page].answers) {
        var aClass = '';
        if (myObj[page].mySel == i) {
          aClass = ' selAnswer ';
        }
        if (i == myCorrect) {
          yesCor = '*';
        } else {
          yesCor = '';
        }
        questionHolder += '<div class="col-sm-6"><div class="btnAns ' + aClass + '" data-id="' + parseInt(i) + '">' + myObj[page].answers[i] + '</div></div>';

      }

      output.innerHTML = '<div class="myQ">' + myQuestion + ' </div>';
      output.innerHTML += questionHolder;

      for (var x = 0; x < bAnswer.length; x++) {
        bAnswer[x].addEventListener('click', myAnswer, false);
      }

      console.log(bAnswer);
    }
  }

}

function myAnswer() {
  var myResult = '';
  var iId = this.getAttribute("data-id");
  myObj[page].mySel = iId;

  //this.classList.toggle('selAnswer');
  if (this.innerText == crtAnswer) {
    myResult = "correct";
  } else {
    myResult = "incorrect";
  }
  myQueRep[page] = iId;
  for (var x = 0; x < bAnswer.length; x++) {
    if (iId == x) {
      bAnswer[x].classList.add("selAnswer");
    } else {
      bAnswer[x].classList.remove("selAnswer");
    }

  }
  console.log(myQueRep);
  /*
  for (var q = 0; q < output.children.length; q++) {
      console.log(output.children[q].children);
  }
  */

}
/*
var myData = '[{"question":"What color is an apple","answers":["Blue","Red","Purple"],"correct":1},{"question":"What Color is Grass","answers":["Green","Red","Purple"],"correct":0}]';
var myObj = JSON.parse(myData);
for (var i in myObj) {
    output.innerHTML += myObj[i].question + '? <br>';
}*/
