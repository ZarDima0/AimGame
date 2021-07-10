const start = document.getElementById("start");

const screen = document.querySelectorAll(".screen");
const timeButton = document.querySelector("#list-button");
const timeEl = document.getElementById("time");
const board = document.querySelector(".screen__board");
const result = document.querySelector(".screen__result");
const resultScore = document.querySelector(".result__span");
const button = document.getElementById("newButton");

console.log(button);
let time = 0;
let score = 0;
let name;

// start to game
start.addEventListener("click", (e) => {
  e.preventDefault();
  screen[0].style.display = "none";
  screen[1].style.display = "flex";
});

// choose time
const handlerTimeButton = (event) => {
  if (event.target.classList.contains("screen__time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screen[1].style.display = "none";
    screen[2].style.display = "flex";
    startGame();
    result.style.display = "none";
  }
};
timeButton.addEventListener("click", handlerTimeButton);

// end to game
const gameOver = () => {
  const circleRemove = document.querySelector(".circle");
  result.style.display = "block";
  resultScore.textContent = score;
  circleRemove.remove();
};

// create circle
const createRandomCircle = () => {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  circle.classList.add("circle");
  board.append(circle);

  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

// hendler circle
board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});
const startGame = () => {
  createRandomCircle();
  const timeInterval = time * 100;
  const interval = setInterval(() => {
    if (time == 0) {
      gameOver();
      clearInterval(interval);
    } else {
      let current = --time;
      if (current < 10) {
        current = `0${time}`;
      }
      timeEl.innerHTML = `00:${current}`;
    }
  }, timeInterval);
  timeEl.innerHTML = `00:${time}`;
};

button.addEventListener("click", () => {
  time = 0;
  score = 0;
  result.style.display = "none";
  screen[2].style.display = "none";
  screen[1].style.display = "flex";
});
// Сохранение результат
const saveResult = document.querySelector(".save");
const buttonSave = document.querySelector(".screen__result__save");
const buttonBlock = document.querySelector(".result_button");
let form = document.getElementById("form");
const resultList = document.getElementById("rating");
const tbody = document.querySelector(".list__item");
const Input = document.querySelector(".name");

resultList.addEventListener("click", () => {
  goToRatingPage(3);
});

function goToRatingPage(page) {
  for (let i = 0; i < screen.length; i++) {
    screen[i].style.display = "none";
  }
  screen[page].style.display = "flex";
}
buttonSave.addEventListener("click", () => {
  buttonBlock.style.display = "none";
  saveResult.style.display = "flex";
});
let userObj = {};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (Input.value === "") {
    Input.classList.toggle("input_err");
  } else {
    goToRatingPage(3);
    let run = writeResultToTable();
    run();
    score = 0;
  }
});
function writeResultToTable(e) {
  let listOfResult = [];
  let nameInput = Input.value;
  let userObj = { user: nameInput, number: score };
  console.log(userObj);
  listOfResult.push(userObj);
  return function addResult() {
    let data = new FormData();
    data.append("data", JSON.stringify(userObj));
    let promise = fetch("./vender/get.php", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        tbody.innerHTML = data;
      });
  };
}
const buttonRatingPage = document.querySelector(".screen__button");

buttonRatingPage.addEventListener("click", (e) => {
  if (e.target.id == "main") {
    goToRatingPage(0);
  } else if (e.target.id == "newGame") {
    goToRatingPage(1);
  }
});
