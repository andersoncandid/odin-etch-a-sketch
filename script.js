const grid = document.querySelector(".container");
const squareWidth = grid.clientWidth;

function getRandomNumber(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateRandomRgbColor() {
  switch (getRandomNumber(2)) {
    case 0:
      return "red";
    case 1:
      return "green";
    case 2:
      return "blue";
  }
}

function createGrid(maxColumns, squareWidth) {
  const squareSide = squareWidth / maxColumns;

  // Create a grid columns
  for (let i = 0; i < maxColumns; i++) {
    const column = document.createElement("div");
    column.classList.add("gridColumn");

    // Create grid elements and calculate their size
    for (let i = 0; i < maxColumns; i++) {
      const element = document.createElement("div");
      element.classList.add("gridElement");
      element.style.width = squareSide + "px";
      element.style.height = squareSide + "px";
      column.appendChild(element);
    }
    grid.appendChild(column);
  }
}

let opacityCounter = 1;

// Change color on hover
function changeColor(event) {
  let target = event.target;
  if (target.className === "gridElement") {
    target.style.backgroundColor = generateRandomRgbColor();
    target.style.opacity = opacityCounter / 10;
  }

  // Progressive darkening effect counter
  if (opacityCounter > 10) {
    opacityCounter = 1;
  } else {
    opacityCounter++;
  }
}

// Create a grid with 16 squares on startup
createGrid(16, squareWidth);
grid.addEventListener("mouseover", changeColor);

// Button to add a new grid
const btn = document.querySelector("#btn");

btn.addEventListener("click", (event) => {
  let userInput = parseInt(
    prompt("Number of squares per side for the new grid:"),
  );

  // Validate the user input
  try {
    if (Number.isNaN(userInput))
      throw "Invalid input, please enter a valer number of squares.";
  } catch (err) {
    alert(err);
    return;
  }

  // Max grid size: 100x100
  if (userInput > 100) {
    userInput = 100;
  }

  // Clean the DOM and event listeners
  grid.removeEventListener("mouseover", changeColor);
  grid.replaceChildren();

  // Create a new grid
  createGrid(userInput, squareWidth);
  grid.addEventListener("mouseover", changeColor);
});
