"use strict";

// GLOBAL VARIABLES
const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color")

//   VARIABLES
let ctx = canvas.getContext("2d"),
  isDrawing = false,
  brushWidth = 5,
  selectedTool = "",
  prevMouseX,
  prevMouseY,
  snapShot;

//   SET CANVAS WIDTH AND HEIGHT
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// START DRAWING
const startDrawing = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)
  console.log(snapShot);
};

// STOP DRAWING
const stopDrawing = () => {
  isDrawing = false;
};

const drawRectangle = (e) => {
    // TERNARY OPERATOR
    !fillColor.checked ? ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY) : ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // if(!fillColor.checked) {
    //     ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // } else {
    //     ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // }
    // console.log(!fillColor.checked);
};

// DRAWING
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapShot, 0, 0)

  switch (selectedTool) {
    case "brush":
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    case "rectangle":
      drawRectangle(e);
      break;
    default:
      break;
  }
};

// TOOLS BTN AND SET TO VARIABLES SELECTED TOOLS
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(`Selected tool ${selectedTool}`);
  });
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
