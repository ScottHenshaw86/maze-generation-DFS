// CHANGE DELAY TO SPEED UP OR SLOW DOWN THE ANIMATION
// FASTEST POSSIBLE = 0
const DELAY = 0; // milliseconds

const doIt = (numPerSide = 10, slowDown = null) => {
    maze.innerHTML = "";
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~ CREATE GRID ~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const cellSize = 750 / numPerSide + 2;
    const lineHeight = 54.4 * numPerSide ** -1.11; // calculated in Excel
    start.style.lineHeight = lineHeight + "rem";
    end.style.lineHeight = lineHeight + "rem";

    // GENERATE ROWS
    for (let row = 0; row < numPerSide; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        // GENERATE COLUMNS
        for (let col = 0; col < numPerSide; col++) {
            const colDiv = document.createElement("div");
            colDiv.classList.add("col");
            colDiv.dataset.x = col;
            colDiv.dataset.y = row;
            colDiv.style.width = cellSize + "px";
            colDiv.style.height = cellSize + "px";
            colDiv.style.fontSize = cellSize + "px";
            rowDiv.appendChild(colDiv);
        }
        maze.appendChild(rowDiv);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~ CREATE PATHS ~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    let current = maze.children[0].children[0];
    current.dataset.visited = true;
    current.style.backgroundColor = "transparent";
    const visitedCells = [current];
    let totalVisited = 1;
    let directions = ["N", "S", "E", "W"];

    const juggernaut = () => {
        if (totalVisited === numPerSide ** 2) {
            // FINISHED
            current.style.backgroundColor = "transparent";
            start.classList.remove("hidden");
            end.classList.remove("hidden");
            clearInterval(creator);
            generateBtn.classList.remove("hidden");
            return;
        }
        if (directions.length === 0) {
            // DEAD-END, START BACKTRACKING
            directions = ["N", "S", "E", "W"];
            const previous = visitedCells.pop();
            previous.style.backgroundColor = "transparent";
            previous.textContent = "";
            current = visitedCells[visitedCells.length - 1];
            current.style.backgroundColor = "green";
            return;
        }

        const randomIndex = Math.floor(Math.random() * directions.length);
        const direction = directions[randomIndex];
        directions.splice(randomIndex, 1);

        console.log(current);
        let newX = parseInt(current.dataset.x);
        let newY = parseInt(current.dataset.y);
        switch (direction) {
            case "N":
                newY--;
                current.textContent = "↑";
                break;
            case "S":
                newY++;
                current.textContent = "↓";
                break;
            case "E":
                newX++;
                current.textContent = "→";
                break;
            case "W":
                newX--;
                current.textContent = "←";
                break;
        }

        if (
            newX < 0 ||
            newY < 0 ||
            newX >= numPerSide ||
            newY >= numPerSide
        ) {
            // OUT OF BOUNDS
            return;
        }

        if ("visited" in maze.children[newY].children[newX].dataset) {
            // ALREADY VISITED
            return;
        }

        // ABLE TO MOVE IN CURRENT DIRECTION
        const next = maze.children[newY].children[newX];
        current.style.backgroundColor = "transparent";
        next.style.backgroundColor = "green";
        next.dataset.visited = true;
        visitedCells.push(next);
        totalVisited++;

        directions = ["N", "S", "E", "W"];

        switch (direction) {
            case "N":
                current.style.borderTop = "none";
                next.style.borderBottom = "none";
                directions.splice(directions.indexOf("S"), 1);
                break;
            case "S":
                current.style.borderBottom = "none";
                next.style.borderTop = "none";
                directions.splice(directions.indexOf("N"), 1);
                break;
            case "E":
                current.style.borderRight = "none";
                next.style.borderLeft = "none";
                directions.splice(directions.indexOf("W"), 1);
                break;
            case "W":
                current.style.borderLeft = "none";
                next.style.borderRight = "none";
                directions.splice(directions.indexOf("E"), 1);
                break;

        }

        current.textContent = "";
        current = next;

    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~ SET IT OFF ~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const delay = slowDown ?? 0;
    creator = setInterval(juggernaut, delay);
}

generateBtn.addEventListener('click', () => {
    start.classList.add("hidden");
    end.classList.add("hidden");
    generateBtn.classList.add("hidden");
    doIt(input.value, DELAY);
});

doIt(5, DELAY);