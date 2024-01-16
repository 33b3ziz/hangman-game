// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get array from letters
let lettersArray = Array.from(letters);

// Select letters container
let lettersContainer = document.querySelector(".letters");

// Generate letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  // create letter text node
  let theLetter = document.createTextNode(letter);

  // append the letter to span
  span.appendChild(theLetter);

  // add class on span
  span.className = "letter-box";

  //append span to the letters container
  lettersContainer.appendChild(span);
});

// onject of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "python",
    "mysql",
  ],
  movies: [
    "Prestige",
    "Parasite",
    "Interstellar",
    "Inception",
    "Memento",
    "Up",
    "Coco",
    "Whiplash",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random property
let allKeys = Object.keys(words);

// random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// category
let randomProbName = allKeys[randomPropNumber];
// category words
let randomProbValue = words[randomProbName];

// random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomProbValue.length);
// the chosen word
let randomValueValue = randomProbValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomProbName;

// select letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);

// create spans depend on word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let span = document.createElement("span");

  // if letter is space
  if (letter === " ") {
    // add class to the span
    span.className = "has-space";
  }
  //append span to the letters guess container
  lettersGuessContainer.appendChild(span);
});

// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts
let wrongAttempts = 0;

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// handle clicking on letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get clicked letter
    let clicked = e.target.innerHTML.toLowerCase();

    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    // console.log(lettersAndSpace); // the chosen word

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equals to one of the chosen word letters
      if (clicked === wordLetter) {
        // set status to correct
        theStatus = true;

        // loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = clicked;
          }
        });
      }
    });

    // outside loop

    // if letter is wrong
    if (theStatus !== true) {
      // increase wrong attempts
      wrongAttempts++;

      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
    }
  }
});

// End game function
const endGame = function () {
  // create popup
  let div = document.createElement("div");

  // create text
  divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );

  // append text to div
  div.appendChild(divText);

  // add class on div
  div.className = "popup";

  // append to the body
  document.body.appendChild(div);
};
