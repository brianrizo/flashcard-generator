var inquirer = require("inquirer"); //inquirer package
var correct = 0;
var incorrect = 0;
var currentQuestion = 0;
var newQuestions = [];
//array of questions
var questions = [
    {
        full: "The Amazon is the world's longest river",
        cloze: "Amazon"
    },
    {
        full: "The Pacific is the world's largest ocean",
        cloze: "Pacific"
    },
    {
        full: "Greenland is the world's largest island",
        cloze: "Greenland"
    },
    {
        full: "Wilhelm Wundt is known as the Father of Psychology",
        cloze: "Wilhelm Wundt"
    },
    {
        full: "The sport of Baseball is known as America's pastime",
        cloze: "Baseball"
    },
    {
        full: "Abraham Lincoln was the 16th president of the USA",
        cloze: "Abraham Lincoln"
    },
    {
        full: "James Naismith was the founder of the sport of basketball",
        cloze: "James Naismith"
    },
    {
        full: "The movie IT is based on the best selling book authored by Stephen King",
        cloze: "Stephen King"
    },
    {
        full: "Alaska is the largest state in the USA",
        cloze: "Alaska"
    },
    {
        full: "Jupiter is the largest planet in our solar system",
        cloze: "Jupiter"
    }
];

//constructor that takes in two parameters,
    //the front of the flash card
    //the back of the flash card
function BasicCard(front, back){
    if(this instanceof BasicCard){
        this.front = front;
        this.back = back;
    }else{
        return new BasicCard(front, back);
    }
}//END BASIC CARD CONSTRUCTOR WITH SAFE CONSTRUCTOR

//constructor that takes in two parameters
    //full text of question
    //cloze which replaces the answer with ____
function ClozeCard(text, cloze) {
    if(this instanceof ClozeCard) {
        this.text = text;
        this.cloze = cloze;
        this.partial = text.replace(cloze, "__________");
    }else{
        return new ClozeCard(text, cloze);
    }
}//END CLOZE CARD CONSTRUCTOR WITH SAFE CONSTRUCTOR

//loops through questions array to get the text and partial answer and store them into a new empty array
for(var i = 0; i < questions.length; i++){
    var getCl = ClozeCard(questions[i].full, questions[i].cloze);
    newQuestions.push(getCl);
}//end for loop

//Begin quiz
beginQuiz();


//function with quiz logic
function beginQuiz() {
    inquirer.prompt([
        {
            type: "input",
            message: newQuestions[currentQuestion].partial + "\nFill in the blank: ",
            name: "user"
        }
    ]).then(function (answers) {
        if (answers.user.toLowerCase() === newQuestions[currentQuestion].cloze.toLowerCase()) {
            console.log("YES! You are correct!");
            correct++; //keep track of correct guesses
        } else {
            console.log("Nice try but you are incorrect!");
            incorrect++; //keep track of incorrect guesses
            //show correct answer
            console.log("The correct answer is: " + newQuestions[currentQuestion].cloze);
            console.log("************************************************");
        }

        //go to next question
        if (currentQuestion < newQuestions.length - 1) {
            currentQuestion++; //go to next question if true
            beginQuiz(); //run the function again
        } else {
            console.log("Your quiz has been graded!...time to see your results");
            console.log("Correct Answers: " + correct);
            console.log("Incorrect Answers: " + incorrect);

            //ask the user to play gain
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to take the quiz again?',
                    name: 'playAgain'
                }
            ]).then(function (answers) {
                if (answers.playAgain) {
                    // Reset the game
                    currentQuestion = 0;
                    correct = 0;
                    incorrect = 0;

                    //run the function
                    beginQuiz();
                } else {
                    // Exit the game
                    console.log('Thanks for playing! Until next time...');
                }//END ELSE
            });//END PROMPT INQUIRER
        }//END ELSE
    });//END OUTER INQUIRER
}//END FUNCTION
