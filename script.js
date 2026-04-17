// Create 16x16 grid of square divs
const grid = document.querySelector(".container");
const fixedSquareWidth = grid.clientWidth;

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

// Create grid on startup with 16 squares
createGrid(16);

// New grid button
const btn = document.querySelector("#btn");

btn.addEventListener("click", (event) => {
  const userInput = parseInt(
    prompt("Number of squares per side for the new grid:"),
  );

  // Valid input
  try {
    if (Number.isNaN(userInput))
      throw "Invalid input, please enter a valer number of squares.";
  } catch (err) {
    alert(err);
    return;
  }

  createGrid(userInput);
});

// Change color on hover
grid.addEventListener("mouseover", (event) => {
  let target = event.target;
  if (target.className === "gridElement") {
    target.style.backgroundColor = "blue";
  }
});
