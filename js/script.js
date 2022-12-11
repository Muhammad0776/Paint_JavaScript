"use strict";

  // GLOBAL VARIABLES
  const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvasBtn = document.querySelector(".clear-canvas"),
    saveImageBtn = document.querySelector(".save-img");

  //   VARIABLES WITH DEFAULT VALUE
  let ctx = canvas.getContext("2d"),
    isDrawing = false,
    brushWidth = 5,
    selectedTool = "",
    selectedColor = "",
    prevMouseX,
    prevMouseY,
    snapShot;

  //   SET CANVAS BACKGROUND
  const setCanvasBg = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
  };

  //   SET CANVAS WIDTH AND HEIGHT
  window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBg();
  });

  // START DRAWING
  const startDrawing = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //   console.log(snapShot);
  };

  // STOP DRAWING
  const stopDrawing = () => {
    isDrawing = false;
  };

  // Draw Rectangle
  const drawRectangle = (e) => {
    // TERNARY OPERATOR
    !fillColor.checked
      ? ctx.strokeRect(
          e.offsetX,
          e.offsetY,
          prevMouseX - e.offsetX,
          prevMouseY - e.offsetY
        )
      : ctx.fillRect(
          e.offsetX,
          e.offsetY,
          prevMouseX - e.offsetX,
          prevMouseY - e.offsetY
        );
    // if(!fillColor.checked) {
    //     ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // } else {
    //     ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    // }
    // console.log(!fillColor.checked);
  };

  // Draw Circle
  const drawCircle = (e) => {
    ctx.beginPath();
    const radius =
      Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) +
      Math.pow(prevMouseY - e.offsetY, 2);
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    fillColor.checked ? ctx.fill() : ctx.stroke();
  };

  // Draw Triangle
  const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();
    fillColor.checked ? ctx.fill() : ctx.stroke();
  };

  // Line To and Stroke
  const changeStlye = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  // DRAWING
  const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapShot, 0, 0);

    switch (selectedTool) {
      case "brush":
        changeStlye(e);
        break;
      case "rectangle":
        drawRectangle(e);
        break;
      case "circle":
        drawCircle(e);
        break;
      case "triangle":
        drawTriangle(e);
        break;
      case "eraser":
        ctx.strokeStyle = "#fff";
        changeStlye(e);
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
      // console.log(`Selected tool ${selectedTool}`);
    });
  });

  // CHANGE SIZE SLIDER
  sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));

  // SET COLOR TO SHAPES
  colorBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelector(".options .selected").classList.remove("selected");
      btn.classList.add("selected");
      const bgColor = window
        .getComputedStyle(btn)
        .getPropertyValue("background-color");
      selectedColor = bgColor;
      // console.log(btn);
    });
  });

  // SET COLOR PICKER
  colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
  });

  // CLEAR CANVAS BUTTON
  clearCanvasBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBg();
  });

  // SAVE IMAGE BUTTON
  saveImageBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `Mukha-piant${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
  });

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", drawing);
  canvas.addEventListener("mouseup", stopDrawing);
