const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fillMode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const reset = document.getElementById("jsReset");

const INITIAL_COLOR = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 10.0;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting(event) {
  painting = true;
  if (event.button === 1) {
    painting = false;
  }
  if (event.button === 2) {
    painting = false;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const lineSize = event.target.value;
  ctx.lineWidth = lineSize;
}

function handleFillClick(event) {
  if (filling === true) {
    filling = false;
    fillMode.innerText = "Fill";
  } else {
    filling = true;
    fillMode.innerText = "Paint";
  }
}

function handleFullFill(event) {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleRCP(event) {
  event.preventDefault();
}

function handleSaveClick(evnet) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Painting🎨";
  link.click();
}

function handleReset(event) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFullFill);
  canvas.addEventListener("contextmenu", handleRCP);
}

Array.from(colors).forEach((colors) =>
  colors.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (fillMode) {
  fillMode.addEventListener("click", handleFillClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (reset) {
  reset.addEventListener("click", handleReset);
}
