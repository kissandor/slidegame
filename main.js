let rownumber = 5;
let gridNumber = Math.pow(rownumber, 2);
let numberOfMoves = 0;

//function to create the grid system
function createGrid(columns) {
  let gridContainer = document.querySelector(".grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${rownumber}, 60px)`;
  addNumbersToNumber(gridNumber);

  for (let i = 0; i < columns; i++) {
    createElement(numbers[i], i + 1);
  }
}

//function to remove the grid
let removeGrid = () => {
  let grids = document.querySelectorAll(".grid-item");
  for (let grid of grids) {
    grid.remove();
  }
};

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

//Nnumbers array, first element of the array is an empty string.These numbers are displayed on each squares
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
  console.log(id);
  let neighbors = isEmptyCellMyNeighbors(id);
  console.log(neighbors);
  /*console.log(gridNumber);
  console.log(rownumber); */

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
  // neightburs = [left, right, top, bottom square]
  let neighbors = [id - 1, id + 1, id - rownumber, id + rownumber];
  for (let i = 0; i < neighbors.length; i++) {
    if (neighbors[i] < 1 || neighbors[i] > gridNumber) {
      console.log(neighbors[i]);
      neighbors[i] = null;
    }
  }
  //no neighbour on the right
  if (id % rownumber == 0) {
    neighbors[1] = null;
  }
  //no neighbour on the left
  if (id % rownumber == 1) {
    neighbors[0] = null;
  }
  return neighbors;
};

createGrid(gridNumber);

//restart the game
let shuffleBtn = document.querySelectorAll("button");
for (let btn of shuffleBtn) {
  btn.addEventListener("click", () => {
    resteNumberOfMoves();
    removeGrid();
    rownumber = parseInt(btn.id);
    gridNumber = Math.pow(rownumber, 2);
    createGrid(gridNumber);
  });
}

//reset Number of moves variable
let resteNumberOfMoves = () => {
  numberOfMoves = 0;
  document.querySelector("span").innerHTML = numberOfMoves;
};
