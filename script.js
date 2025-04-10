const colorPicker = document.getElementById("colorPicker");
const previewBox = document.getElementById("previewBox");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");
const hslValue = document.getElementById("hslValue");
const copiedMsg = document.getElementById("copiedMsg");
const copyButtons = document.querySelectorAll(".copy-btn");

colorPicker.addEventListener("input", () => {
  const color = colorPicker.value;
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  hexValue.textContent = color;
  rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  hslValue.textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  previewBox.style.backgroundColor = color;
  previewBox.style.color = hsl.l > 50 ? '#000' : '#fff';
});

copyButtons.forEach(button => {
  button.addEventListener("click", () => {
    let text;
    switch (button.dataset.type) {
      case "hex":
        text = hexValue.textContent;
        break;
      case "rgb":
        text = rgbValue.textContent;
        break;
      case "hsl":
        text = hslValue.textContent;
        break;
    }

    navigator.clipboard.writeText(text).then(() => {
      copiedMsg.classList.remove("hidden");
      setTimeout(() => copiedMsg.classList.add("hidden"), 1500);
    });
  });
});

function hexToRgb(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
