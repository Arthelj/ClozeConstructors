

var BasicCard = require('./basic.js');

var ClozeCard = require('./cloze.js');

var inquirer = require('inquirer');

var fs = require ('fs');

var addFlashCard = function(){
	inquirer.prompt([{
	    name: "addCard",
	    type: "rawlist",
	    message: "What kind of flashcard do you want?",
	    choices: ["Basic Flashcard", "Cloze Flashcard"]
	  }]).then(function(answer) {
	    // based on their answer, either call the bid or the post functions
	    if (answer.addCard === "Basic Flashcard") {
	    	 inquirer.prompt([{
                name: 'front',
                message: 'What is the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log('answer the question ya dink.');
                        return false;
                    } else {
                        return true;
                    }
                }
          
      },
        {
          	name: 'back',
          	message: "What is the answer?",
          	validate: function(input) {
    				if (input === "") {
    					console.log('who would use that to study. give me an answer');
      				return false;
    				} 
            else {
    				return true;
  			    }
        }
        }]).then(function(answer){
          var newBasicCard = new BasicCard(answer.front, answer.back);
          newBasicCard.create();
          start();
        });
      } else if (answer.addCard === 'Cloze Flashcard') {
        inquirer.prompt([{
          name: 'text',
          message: "What is the full text?",
          validate: function(input){
            if(input === ""){
              console.log("dude stop being dumb af. gimme da text");
              return false;
            }
            else {
              return true;
            }
          }

          },
          {
            name: 'cloze',
            message: 'What is the close portion?',
            validate: function(input){
              if (input === ''){
                console.log('gimme da cloze bruh');
                return false;
              }
              else {
                return true;
              }
            
            }
        }]).then(function(answer){
          var text = answer.text;
          var cloze = answer.cloze;
          if (text.includes(cloze)){
            var newClozeCard = new ClozeCard (text, cloze);
            newClozeCard.create();
            start();
          }
          else {
            console.log('sry homie, aint nothing to see here');
          }

        });
      }
  });
};


var start = function() {
  inquirer.prompt({
    name: "questUser",
    type: "rawlist",
    message: "Would you like to [Add a Flashcard]?",
    choices: ["Add a Flashcard", "I'm to smart for Flashcards"]
  }).then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.questUser === "Add a Flashcard") {
      addFlashCard();
    }
    else if (answer.questUser === "I'm to smart for Flashcards") {
      console.log("Well then good for you!!!!")
    }
  });
};


start();










































