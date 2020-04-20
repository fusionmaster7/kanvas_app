console.log("Working");
if (screen.width <= 768) {
  console.log("small screen");
} else {
  VANTA.GLOBE({
    el: ".back",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 0.1,
    backgroundColor: "#040d5a",
    color1: "#FA5DBB",
    color2: "#d4ffe5",
  });
}
