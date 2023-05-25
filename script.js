// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Create Grid ~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const numPerSide = 10;
const cellSize = 750 / numPerSide;
const lineHeight = 54.4 * numPerSide ** -1.11; // calculated in Excel
document.body.style.lineHeight = lineHeight + "rem";

// generate rows
for (let row = 0; row < numPerSide; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    // generate colums
    for (let col = 0; col < numPerSide; col++) {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");
        colDiv.dataset.x = col;
        colDiv.dataset.y = row;
        colDiv.style.width = cellSize + "px";
        colDiv.style.height = cellSize + "px";
        rowDiv.appendChild(colDiv);
    }
    maze.appendChild(rowDiv);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~ Create Paths ~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const juggernaut = () => {

}