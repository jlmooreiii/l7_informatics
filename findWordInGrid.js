/** 
Please complete the following javascript function in a separate file. Implement the most efficient
solution you can think of and include a few positive and negative examples to show your
function behaves properly:
1. Given a 2D array of characters grid and a string word, return true if word can be found
in grid or false otherwise. The word can be found if it can be constructed from letters
that are adjacent to each other horizontally or vertically on the grid.

Function findWord(grid, word) {
}
Example:
Input:
grid = [['x', 'c', 'a'],
        ['d', 'y', 't'],
        ['o', 'g', 'z']]
word = 'cat'
Output:
true
*/

/////////////////
// Main Method //
/////////////////
function findWord(grid, word) {
    // Let's define the bounds of our grid to get started
    // I want the heigth and length of the grid in terms of index for legibility
    let maxGridHeightIndex = grid.length - 1;
    let maxGridLengthIndex = grid[0].length - 1;
    let wordFound = false;

    // Now lets look to see where the first letter in our word is
    let y = 0
    while (y <= maxGridHeightIndex && wordFound == false) {
        let currentYCoord = y;
        if (grid[y].includes(word[0])) {
            // What we do if we find the first letter
            // Need to see which X Coord has the first letter
            let x = 0;
            while (x <= maxGridLengthIndex && wordFound == false) {
                let currentXCoord = x;
                // If we successfully find the first letter, we can search around for the other letters
                if (grid[currentYCoord][currentXCoord] == word[0]){
                    let wordIndex = 1;
                    let keepSearching = true;
                    while (wordIndex < word.length && keepSearching == true) {
                        // We need to generate the new coordinates to check
                        let [nextUpCoord, nextRightCoord, nextDownCoord, nextLeftCoord] = generateNextCoordinates(y=currentYCoord, x=currentXCoord, maxHeight=maxGridHeightIndex, maxLength=maxGridLengthIndex);
                        // Then we need to see if the next letter is at any of the new coordinates. If we, the current Y Coord and Ccurrent X Coord will be updated
                        let result = goToNextCoord(grid, word[wordIndex], nextUpCoord, nextRightCoord, nextDownCoord, nextLeftCoord);
                        // If the next letter is in none of the next coordinates, then stop search and move to next X Coord to check for first letter
                        if (result == false) {
                            keepSearching = false;
                        } // Else let the new current coordinate be updated and increment to the next letter to find
                        else {
                            currentYCoord = result[0];
                            currentXCoord = result[1];
                            wordIndex++;
                        } 
                    }
                    // If the while loop is exhausted, meaning that all the letters have been found, update the wordFound variable
                    if (wordIndex == word.length) {
                        wordFound = true;
                        return wordFound;
                    }
                }
                // Move the pointer to the next X Coord in the pointer's current Y Coord and try again
                x++;
            }
        } // Else, the first letter is not in the current Y coordinate, so move onto the next Y Coordinate and try again
        y++;
    } // If you have come to the end of the outter array, then return wordFound as false
    return wordFound;
}

//////////////////
// Method Calls // 
//////////////////
let grid1 = [['a', 'z', 'c'],
             ['b', 'a', 't'],
             ['c', 'a', 'b']];         
console.log(`Find word "cab" in grid1. The expected result is true. The found result is ${findWord(grid1, 'cab')}`);
console.log(`Find word "caz" in grid1. The expected result is false. The found result is ${findWord(grid1, 'caz')}`);
console.log("---------------");

let grid2 = [['z', 'z', 'z'],
             ['z', 'z', 'z'],
             ['z', 'z', 'z']];
console.log(`Find word "zzzzz" in grid2. The expected result is true. The found result is ${findWord(grid2, 'zzzzz')}`);
console.log(`Find word "aaa" in grid1. The expected result is false. The found result is ${findWord(grid2, 'aaa')}`);
console.log("---------------");

let grid3 = [['a', 'L', 'c', 't'],
             ['b', '7', 'I', 'a'],
             ['c', 'F', 'N', 'r'],
             ['c', 'O', 'R', 'r'],
             ['a', 'A', 'M', 't'],
             ['b', 'T', 'I', 'C'],
             ['c', 'a', 'b', 'S']];
console.log(`Find word "L7INFORMATICS" in grid3. The expected result is true. The found result is ${findWord(grid3, 'L7INFORMATICS')}`);
console.log(`Find word "hello" in grid1. The expected result is false. The found result is ${findWord(grid2, 'hello')}`);
console.log("---------------");






////////////////////
// Helper Methods //
////////////////////
function generateNextCoordinates(y, x, maxHeight, maxLength) {
    let nextUpCoord;
    let nextRightCoord;
    let nextDownCoord;
    let nextLeftCoord;

    // Getting nextUp
    if (y > 0) {
        nextUpCoord = [y-1, x];
    } else {
        nextUpCoord = null;
    }
    
    // Getting nextRightCoord
    if (x < maxLength) {
        nextRightCoord = [y, x+1];
    } else {
        nextRightCoord = null;
    }
    
    // Getting nextDownCoord
    if (y < maxHeight) {
        nextDownCoord = [y+1, x]; 
    } else {
        nextDownCoord = null;
    }

    // Getting nextLeftCoord
    if (x > 0) {
        nextLeftCoord = [y, x-1];
    } else {
        nextLeftCoord = null;
    }
    
    let newDirections = [nextUpCoord, nextRightCoord, nextDownCoord, nextLeftCoord];
    return newDirections;
}

function goToNextCoord(grid, letterToFind, nextUpCoord, nextRightCoord, nextDownCoord, nextLeftCoord ){
    // If the next letter is at the nextUpCoord
    let currentXCoord;
    let currentYCoord;
    // Check that the coordinate is not null
    if (nextUpCoord != null) {
        if (letterToFind == grid[nextUpCoord[0]][nextUpCoord[1]]) {
            currentYCoord = nextUpCoord[0];
            currentXCoord = nextUpCoord[1];
            return [currentYCoord, currentXCoord];
        }
    } // If the next letter is at the nextRightCoord
    if (nextRightCoord != null) {
        if (letterToFind == grid[nextRightCoord[0]][nextRightCoord[1]]) {
            currentYCoord = nextRightCoord[0];
            currentXCoord = nextRightCoord[1];
            return [currentYCoord, currentXCoord];
        }
    } // If the next letter is at the nextDownCoord 
    if (nextDownCoord != null) {
        if (letterToFind == grid[nextDownCoord[0]][nextDownCoord[1]]) {
            currentYCoord = nextDownCoord[0];
            currentXCoord = nextDownCoord[1];
            return [currentYCoord, currentXCoord];
        }
    } // If the next letter is at the nextLeftCoord
    if (nextLeftCoord != null) {
        if (letterToFind == grid[nextLeftCoord[0]][nextLeftCoord[1]]) {
            currentYCoord = nextLeftCoord[0];
            currentXCoord = nextLeftCoord[1];
            return [currentYCoord, currentXCoord];
        }
    }
    return false
}
