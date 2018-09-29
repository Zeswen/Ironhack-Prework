var allCoordinates = [];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function getRandomCoordinates() {
    var newCoordinates = {
        x: getRandomInt(0, 10),
        y: getRandomInt(0, 10),
    };

    var repeatedCoordinates = allCoordinates.filter((element) => (
        element.x === newCoordinates.x &&
        element.y === newCoordinates.y
    ));
    if (repeatedCoordinates.length) {
        return getRandomCoordinates();
    } else {
        allCoordinates.push(newCoordinates);
        return newCoordinates;
    }
}
var rover1 = {
    direction: "N",
    travelLog: [],
    ...getRandomCoordinates(),
}

var rover2 = {
    direction: "N",
    travelLog: [],
    ...getRandomCoordinates(),
}

var allObstacles = {};

function generateObstacles() {
    for (var i = 0; i < getRandomInt(1, 3); i++) {
        allObstacles["obstacles" + i] = getRandomCoordinates();
    }
}

generateObstacles();

function turnLeft(receivedRover) {
    switch (receivedRover.direction) {
        case "N":
            receivedRover.direction = "W";
            console.log("The received rover is now facing West.");
            break;
        case "W":
            receivedRover.direction = "S";
            console.log("The received rover is now facing South.");
            break;
        case "S":
            receivedRover.direction = "E";
            console.log("The received rover is now facing East.");
            break;
        case "E":
            receivedRover.direction = "N";
            console.log("The received rover is now facing North.");
            break;
        default:
            console.log("The received rover's direction is not recognized.");
    }
}

function turnRight(receivedRover) {
    switch (receivedRover.direction) {
        case "N":
            receivedRover.direction = "E";
            console.log("The received rover is now facing East.");
            break;
        case "E":
            receivedRover.direction = "S";
            console.log("The received rover is now facing South.");
            break;
        case "S":
            receivedRover.direction = "W";
            console.log("The received rover is now facing West.");
            break;
        case "W":
            receivedRover.direction = "N";
            console.log("The received rover is now facing North.");
            break;
        default:
            console.log("The received rover's direction is not recognized.");
    }
}

function checkCollision(coordinates) {
    for (var obstacle in allObstacles) {
        if (
            allObstacles[obstacle].x === coordinates.x &&
            allObstacles[obstacle].y === coordinates.y
        ) {
            return false;
        } else if (coordinates.x < 0 || coordinates.x > 10 || coordinates.y < 0 || coordinates.y > 10) {
            return false;
        } else {
            return true;
        }
    }
}

//I'm sorry for the messy code from here but I couldn't do any better :sad:

function moveForward(receivedRover) {
    if (receivedRover.direction === "N") {
        var tempCoords = {
            x: receivedRover.x,
            y: receivedRover.y - 1,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.y -= 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else if (receivedRover.direction === "E") {
        var tempCoords = {
            x: receivedRover.x + 1,
            y: receivedRover.y,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.x += 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else if (receivedRover.direction === "S") {
        var tempCoords = {
            x: receivedRover.x,
            y: receivedRover.y + 1,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.y += 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else if (receivedRover.direction === "W") {
        var tempCoords = {
            x: receivedRover.x - 1,
            y: receivedRover.y,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.x -= 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else {
        console.log("The received rover couldn't move!")
    }
    console.log(`The received rover is now on (${receivedRover.x}, ${receivedRover.y})`);
}

function moveBackward(receivedRover) {
    if (receivedRover.direction === "N") {
        var tempCoords = {
            x: receivedRover.x,
            y: receivedRover.y + 1,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.y += 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else if (receivedRover.direction === "E") {
        var tempCoords = {
            x: receivedRover.x - 1,
            y: receivedRover.y,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.x -= 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else if (receivedRover.direction === "S") {
        var tempCoords = {
            x: receivedRover.x,
            y: receivedRover.y - 1,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.y -= 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else if (receivedRover.direction === "W") {
        var tempCoords = {
            x: receivedRover.x + 1,
            y: receivedRover.y,
        };
        if (checkCollision(tempCoords)) {
            receivedRover.x += 1;
        } else {
            console.log(`The received rover couldn't move! There is an obstacle or the rover would be out of bounds.`)
        }
    } else {
        console.log("The received rover couldn't move! Its direction is unrecognized.")
    }
    console.log(`The received rover is now on (${receivedRover.x}, ${receivedRover.y})`);
}

function travelLog(receivedRover) {
    receivedRover.travelLog.push({
        direction: receivedRover.direction,
        x: receivedRover.x,
        y: receivedRover.y,
    })
}

function commands(actions, receivedRover) {
    for (var i = 0; i < actions.length; i++) {
        if (actions[i] === "f") {
            moveForward(receivedRover);
        } else if (actions[i] === "r") {
            turnRight(receivedRover);
        } else if (actions[i] === "b") {
            moveBackward(receivedRover);
        } else if (actions[i] === "l") {
            turnLeft(receivedRover);
        } else {
            console.log("The introduced command was not recognized. The avaliable commands are: f(orward), r(ight), l(eft) and b(ackward)")
        }
        travelLog(receivedRover);
    };
    console.log("The received Rover's travel log is:");
    console.log(receivedRover.travelLog);
    return "The movement sequence have been executed.";
}

//Window onload:

window.onload = function() {
    var arr = document.getElementsByTagName("button");
    for (i = 0; i < arr.length; i++) {
        arr[i].addEventListener("click", function() {
            document.getElementById("p1Direction").innerHTML = `Direction: ${rover1.direction}`
            document.getElementById("p1Position").innerHTML = `Position: (${rover1.x}, ${rover1.y})`
            document.getElementById("p2Direction").innerHTML = `Direction: ${rover2.direction}`
            document.getElementById("p2Position").innerHTML = `Position: (${rover2.x}, ${rover2.y})`
        });
    }
}

//Instructions

console.log(`Welcome to my Mars Rover! Type the avaliable commands: "f"(orward), "r"(ight), "l"(eft) and "b"(ackward) plus the rover you want to move: rover1 or rover2 to move :D Be aware of the obstacles and the 10x10 grid!`);
console.log(`Example: commands("ffrbblf", rover1)`); //Could have added a random number of rovers or something like that but it would be a mess to move around 😓.
console.log(`Your rover1 spawned on (${rover1.x}, ${rover1.y}) facing ${rover1.direction} and you rover2 spawned on (${rover2.x}, ${rover2.y}) facing ${rover2.direction}.`);
console.log(`The obstacles spawned on:`);
console.log(allObstacles);