const prompt = require("prompt-sync")({ sigint: true });
const chalk = require("chalk");

playShrugman();

function playShrugman() {
  const movieArr = ["The Godfather", "Braveheart", "The Lord of the Rings"];
  const booksArr = ["The Great Gatsby", "Pride and Prejudice"];
  let category = prompt(
    chalk.greenBright("choose the category that you want(movie/book): ")
  );
  let secretWords = "";
  if (category === "movie") {
    secretWords = movieArr[Math.floor(Math.random() * movieArr.length)];
  } else if (category === "book") {
    secretWords = booksArr[Math.floor(Math.random() * booksArr.length)];
  } else {
    console.log(
      chalk.greenBright("This category does not exist, choose correct category")
    );
    playShrugman();
  }

  let secretWordsUnderline = "";
  let secretWordsLower = secretWords.toLowerCase();
  const shrugman = "¯\\_(:/)_/¯";
  let shrugmanInProgress = "";

  for (let i = 0; i < secretWords.length; i++) {
    if (secretWords[i] === " ") {
      secretWordsUnderline += " ";
    } else {
      secretWordsUnderline += "_";
    }
  }
  console.log(chalk.greenBright(secretWordsUnderline));
  let playerGuess = prompt(chalk.greenBright("Guess letter: "));
  let counter = 0;
  while (
    secretWords !== secretWordsUnderline &&
    shrugmanInProgress.length < 10
  ) {
    let answer = "";
    if (!secretWordsLower.includes(playerGuess)) {
      shrugmanInProgress += shrugman[counter];
      counter++;
    } else {
      let updatedUnderline = "";
      for (let i = 0; i < secretWords.length; i++) {
        if (playerGuess === secretWordsLower[i]) {
          updatedUnderline += secretWords[i];
        } else {
          updatedUnderline += secretWordsUnderline[i];
        }
      }
      secretWordsUnderline = updatedUnderline;
    }
    if (secretWords === secretWordsUnderline) {
      console.clear();
      console.log("\n", chalk.greenBright(secretWordsUnderline));
      console.log("\nYou win!! ");
      answer = prompt(
        chalk.greenBright("Do you want play another round? (y/n): ")
      );
      if (answer === "y") {
        playShrugman();
      } else {
        break;
      }
    } else if (shrugmanInProgress.length === 10) {
      console.clear();
      console.log("\n", chalk.magentaBright(shrugmanInProgress), "\n");
      console.log("You lost :(");
      answer = prompt(
        chalk.greenBright("Do you want play another round? (y/n): ")
      );
      if (answer === "y") {
        playShrugman();
      }
    } else {
      console.clear();
      console.log("\n", chalk.greenBright(secretWordsUnderline));
      console.log("\n", chalk.magentaBright(shrugmanInProgress), "\n");
      playerGuess = prompt(chalk.greenBright("\nGuess letter: "));
    }
  }
}
