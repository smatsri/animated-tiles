function createRow(colors) {
  const container = document.querySelector(".container");

  const col = document.createElement("div");
  col.classList.add("col");
  container.appendChild(col);

  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    var colorVariable = "--color" + (i + 1);
    col.style.setProperty(colorVariable, color);

    const box = document.createElement("div");
    box.classList.add("box");
    var backgroundColor = "--color" + (i + 1);
    box.style.backgroundColor = "var(" + backgroundColor + ")";
    col.appendChild(box);
  }
}

function toColor([r, g, b]) {
  if (!r) return null;
  return `rgb(${r},${g},${b})`;
}

function setup(data) {
  for (let i = 0; i < data.length; i++) {
    const colors = data[i].map(toColor).filter((a) => a);
    createRow(colors);
  }
}

function animate() {
  const colsList = document.querySelectorAll(".col");
  const cols = Array.from(colsList);

  let intId = setInterval(shiftRight, 80);

  document.body.addEventListener("click", () => {
    if (intId) {
      clearInterval(intId);
      intId = null;
    } else {
      intId = setInterval(shiftRight, 100);
    }
  });

  function shiftRight() {
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];
      const nextCol = cols[i - 1] || cols[cols.length - 1];

      const t = col.style.cssText;
      col.style.cssText = nextCol.style.cssText;
      nextCol.style.cssText = t;
    }
  }
}

async function run() {
  const url = "drawing40x40.json";

  const res = await fetch(url);
  const data = await res.json();

  setup(data);
  animate();
}

run();
