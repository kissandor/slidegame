let gridNumber = 25;
let numberOfMoves = 0;
//function to create the grid system
function createGrid(columns) {
  addNumbersToNumber(gridNumber);
  for (let i = 0; i < columns; i++) {
    createElement(numbers[i], i + 1);
  }
}

//function to create a square
let createElement = function (innerHtml, id) {
  let square = document.createElement("div");
  square.classList.add("grid-item");
  square.innerHTML = innerHtml;
  square.setAttribute("id", id);
  square.addEventListener("click", moveNumber);
  let parent = document.querySelector("#slideContainer");
  parent.appendChild(square);
};

//function to add numbers to the squares
let numbers = [];
let addNumbersToNumber = (number) => {
  numbers[0] = "";
  for (let i = 1; i < number; i++) {
    numbers[i] = i;
  }
  shuffleArray(numbers);
};
//function to shuffle the numbers in the numbers[]
let shuffleArray = (numbers) => {
  numbers.sort(() => Math.random() - 0.5);
};

//move numbesr
let moveNumber = () => {
  let id = parseInt(event.srcElement.id);
  let neighbors = isEmptyCellMyNeighbors(id);
  let empty = findEmptyCell();
  for (let neighbor of neighbors) {
    if (neighbor == empty) {
      document.getElementById(empty).innerHTML = document.getElementById(
        id
      ).innerHTML;
      document.getElementById(id).innerHTML = "";
      numberOfMoves++;
    }
  }
  document.querySelector("span").innerHTML = numberOfMoves;
};

//function to find the empty cel
let findEmptyCell = () => {
  let emptyCellId = "";
  for (i = 1; i <= gridNumber; i++) {
    let emptyCell = document.getElementById(i);
    if (emptyCell.innerHTML === "") {
      emptyCellId = parseInt(emptyCell.id);
    }
  }
  return emptyCellId;
};

//function to check if the clicked and the empty cells are neighbors or not
let isEmptyCellMyNeighbors = (id) => {
  let neighbors = [id - 1, id + 1, id - 5, id + 5];
  for (let i = 0; i < neighbors.length; i++) {
    if (neighbors[i] < 1 || neighbors[i] > gridNumber) {
      neighbors[i] = null;
    }
  }
  if (id % 5 == 0) {
    neighbors[1] = null;
  }
  //need to fix this
  if (id == 6 || id == 11 || id == 16 || id == 21) {
    neighbors[0] = null;
  }

  return neighbors;
};

createGrid(gridNumber);

//restart the game by shuffling the numbers
let shuffleBtn = document.querySelector("#shuffle");
shuffleBtn.addEventListener("click", () => {
  resteNumberOfMoves();
  shuffleArray(numbers);
  let cellValues = document.querySelectorAll("div.grid-item");
  for (let i = 0; i < cellValues.length; i++) {
    cellValues[i].innerHTML = numbers[i];
    console.log(cellValues[i].innerHTML);
  }
});

//reset Number of moves variable
let resteNumberOfMoves = () => {
  numberOfMoves = 0;
  document.querySelector("span").innerHTML = numberOfMoves;
};
