const grid = document.querySelector(".container");
const fixedSquareWidth = grid.clientWidth;

// Set random RGB color for element
function randomColor() {
  const rng = Math.floor(Math.random() * (4 - 1) + 1);

  switch (rng) {
    case 1:
      return "red";
    case 2:
      return "green";
    case 3:
      return "blue";
  }
}

// Create a grid of square divs
function createGrid(squares) {
  const squareSide = fixedSquareWidth / squares;

  for (let i = 0; i < squares; i++) {
    const column = document.createElement("div");
    column.classList.add("gridColumn");

    for (let i = 0; i < squares; i++) {
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
function colorChange(event) {
  let target = event.target;
  if (target.className === "gridElement") {
    target.style.backgroundColor = randomColor();
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
createGrid(16);
grid.addEventListener("mouseover", colorChange);

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
  grid.removeEventListener("mouseover", colorChange);
  grid.replaceChildren();

  // Create a new grid
  createGrid(userInput);
  grid.addEventListener("mouseover", colorChange);
});
