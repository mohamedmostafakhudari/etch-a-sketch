const startBtn = document.querySelector(".btn-start");
const eraseBtn = document.querySelector(".btn-erase");
const grid = document.querySelector(".drawing-grid");
const squares = document.querySelectorAll(".drawing-grid > .grid-item");
const toggle = document.querySelector(".toggle input");

let lightnessPercentage = 100;
let reverse = false;
let draw = false;
startBtn.addEventListener("click", () => {
	const gridSize = getGridSize();
	lightnessPercentage = 100;
	removeOldGrid();
	generateGrid(+gridSize);
});
eraseBtn.addEventListener("click", () => {
	const gridSize = window.getComputedStyle(grid).getPropertyValue("--number-of-cols");
	lightnessPercentage = 100;
	reverse = false;
	removeOldGrid();
	generateGrid(+gridSize);
});
grid.addEventListener("mouseover", (e) => {
	if (draw === false) return;
	const target = e.target.closest(".grid-item");
	const color = getRandomHSLColor();
	if (target && !target.classList.contains("colored")) {
		target.style.backgroundColor = color;
		target.classList.add("colored");
	}
});
toggle.addEventListener("change", () => {
	draw = !draw;
	updateToggleLabel();
});
function updateToggleLabel() {
	const toggleLabel = document.querySelector(".toggle-container label");
	const text = draw ? "Turn Off Drawing" : "Turn On Drawing";
	toggleLabel.textContent = text;
}
function getGridSize() {
	const gridSize = prompt("Enter grid size (max 100)");
	if (gridSize > 100) {
		throw new Error("Grid size must be less than 100");
	}
	if (typeof +gridSize !== "number") {
		throw new Error("Grid size must be a number");
	}
	if (!gridSize) {
		throw new Error("Grid size must not be empty");
	}
	return gridSize;
}
function generateGrid(size) {
	const numberOfSquares = size * size;
	setNumberOfColumns();
	for (let i = 0; i < numberOfSquares; i++) {
		const square = document.createElement("div");
		square.classList.add("grid-item");
		grid.appendChild(square);
	}
	function setNumberOfColumns() {
		grid.style.setProperty("--number-of-cols", size);
	}
}
function removeOldGrid() {
	grid.replaceChildren();
}
function randomNumberInARange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomHSLColor() {
	const hue = randomNumberInARange(0, 360);
	const saturation = randomNumberInARange(0, 100);
	const lightness = lightnessPercentage;
	if (lightnessPercentage >= 0 && !reverse) {
		lightnessPercentage -= 10;
	} else {
		lightnessPercentage += 10;
		reverse = lightnessPercentage >= 100 ? false : true;
	}
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
