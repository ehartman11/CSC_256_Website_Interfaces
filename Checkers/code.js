// Class representing the checker chips
class Chip {
    constructor(color, img, imgK, opponent, move, jump, kinged = false) {
        this.color = color;
        this.img = img;
        this.imgK = imgK;
        this.kinged = kinged;
        this.opponent = opponent;
        this.move = move;
        this.jump = jump;
    }

    // Get the appropriate image for the chip (regular or kinged)
    getImg() {
        // condition ? if true : if false
        return this.kinged ? this.imgK : this.img;
    }

    // promote the chip to king
    promoteKing() {
        this.kinged = true;
    }
}

// Class representing a tile on the checkerboard
class Tile {
    constructor(board, row, col, cell_type, chip = null) {
        this.board = board; // Reference to the board object to access its attributes and methods
        this.row = row;
        this.column = col;
        this.type = cell_type; // white or brown
        this.chip = chip; // Chip object occupying this tile (if any)
        this.elem = document.createElement('td'); // table data element
        this.img_elem = document.createElement('img'); // image element
        this.loadImg(); // Load the appropriate image for the tile 
        this.elem.appendChild(this.img_elem); // append the image to the table cell 
        this.elem.addEventListener('click', () => this.handleClick()); // add a click event listener
    }

    // Load the appropriate image for the tile (tile with chip or applicable tile color based on cell_type)
    loadImg() {
        if (this.chip) {
            this.img_elem.src = this.chip.getImg();
        } else if (this.type == 'white') {
            this.img_elem.src = 'white_tile.png';
        } else {
            this.img_elem.src = 'brown_tile.png';
        }
    }

    // Handle click events on the tile
    handleClick() {
        if (this.chip && !this.board.multiJump) {
            // check if there is a chip present and no multi-jump in progress
            if (this.chip.color == this.board.currentPlayer) {
                // check if the chip color matches the current player
                this.board.selectedTile = this; // select this tile
            }
        } else if (!this.chip && this.board.selectedTile && this.board.selectedTile.chip.color == this.board.currentPlayer) {
            // Check if the tile is empty and the selected tile has a chip of the current player
            if (this.validMove() && !this.board.multiJump) {
                // See if the proposed move is valid and ensure no multi-jump is in progress
                this.completeMove(); // complete the regular move
            } else if (this.validJump()) {
                // See if the propsed jump is valid
                this.completeMove(true); // complete the jump move 
            }
        } else {
            // if the move is invalid or another jump is available, inform the user
            if (this.board.multiJump) {
                alert('There is another jump available');
            } else {
                alert('This is not a valid move');
            }
        }
    }

    // check if the move is valid. This move is for displacement by 1 row and 1 column in either direction
    validMove() {
        // Check if the column difference is exactly 1 (valid diagonal move)
        if (Math.abs(this.board.selectedTile.column - this.column) == 1) {
            // If the chip is kinged, check if the row difference is exactly 1
            if (this.board.selectedTile.chip.kinged) {
                if (Math.abs(this.board.selectedTile.row - this.row) == 1) {
                    return true;
                }
            } else if (this.board.selectedTile.row + this.board.selectedTile.chip.move == this.row) {
                // For regular chips, check if the move is in the allowed direction
                return true;
            }
        }
        return false;
    }

    // check if the jump is valid, This move is for displacement by 2 rows and 2 columns in either direction
    validJump() {
        // Check if the column difference is exactly 2 (valid diagonal jump)
        if (Math.abs(this.board.selectedTile.column - this.column) == 2) {
            // Calculate the row and column of the middle tile
            const middleRow = (this.board.selectedTile.row + this.row) / 2;
            const middleCol = (this.board.selectedTile.column + this.column) / 2;
            const middleTile = this.board.tiles[`${middleRow},${middleCol}`];

            // Check if the chip is kinged
            if (this.board.selectedTile.chip.kinged) {
                // If kinged, check if the row difference is exactly 2 and the middle tile has an opponent's chip
                if (Math.abs(this.board.selectedTile.row - this.row) == 2 && middleTile && middleTile.chip && middleTile.chip.color == this.board.selectedTile.chip.opponent) {
                    return true; // Valid jump for kinged chip
                }
            } else {
                // For regular chips, check if the jump is in the allowed direction and the middle tile has an opponent's chip
                if ((this.board.selectedTile.row + this.board.selectedTile.chip.jump == this.row) && middleTile && middleTile.chip && middleTile.chip.color == this.board.selectedTile.chip.opponent) {
                    return true; // Valid jump for regular chip
                }
            }
        }
        return false;
    }


    checkForPotentialJump() {
        //check jump potential in multiple directions
        const checkDirection = (rowOffset, colOffset) => {
            const targetRow = this.row + rowOffset * 2;
            const targetCol = this.column + colOffset * 2;
            const middleRow = this.row + rowOffset;
            const middleCol = this.column + colOffset;

            // Ensure the target position is within the bounds of the board
            if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
                return false;
            }

            const targetTile = this.board.tiles[`${targetRow},${targetCol}`];
            const middleTile = this.board.tiles[`${middleRow},${middleCol}`];

            // Check if the target tile is empty and the middle tile has an opponent's chip
            if (!targetTile.chip && middleTile.chip && middleTile.chip.color === this.chip.opponent) {
                return true;
            }
            return false;
        };

        // Define possible move offsets for both regular and kinged chips
        const offsets = [
            [this.chip.move, 1],
            [this.chip.move, -1],
        ];

        // If the chip is kinged, add the opposite directions
        if (this.chip.kinged) {
            offsets.push([-this.chip.move, 1], [-this.chip.move, -1]);
        }

        // Check all defined directions for potential jumps
        this.board.multiJump = offsets.some(offset => checkDirection(offset[0], offset[1]));
    }

    completeMove(jump = false) {
        this.setChip(this.board.selectedTile.chip); // Place the chip on the new tile
        this.board.selectedTile.removeChip(); // Remove the chip from the original tile
        if (jump) {
            // If the move is a jump
            const middleTile = this.board.tiles[`${(this.board.selectedTile.row + this.row) / 2},${(this.board.selectedTile.column + this.column) / 2}`];
            this.board.removeChip(middleTile.chip); // Remove the jumped chip
            middleTile.removeChip(); // Clear the middle tile
            this.board.selectedTile = this; // Set the current tile as the selected tile
            this.checkForPotentialJump(); // Check for additional jumps
        }
        if (!this.board.multiJump) {
            // If no additional jumps are available, switch player
            this.board.switchPlayer();
        }
    }

    // Set the chip on the tile
    setChip(chip) {
        this.chip = chip;
        // Promote to king if the chip reaches the opposite end of the board
        if ((this.chip.color == 'black' && this.row == 0) || (this.chip.color == 'white' && this.row == 7)) {
            this.chip.promoteKing();
        }
        this.loadImg(); // Load the appropriate image for the tile
    }

    // Remove the chip from the tile
    removeChip() {
        this.chip = null;
        this.loadImg(); // Load the appropriate image for the tile
    }
}

// Class representing the checkerboard
class Board {
    constructor(x, y) {
        this.x = x; // Number of rows
        this.y = y; // Number of columns
        this.selectedTile = null; // Currently selected tile
        this.currentPlayer = 'white'; // Current player ('white' or 'black')
        this.tiles = {}; // Dictionary to store tile references
        this.whiteChips = []; // Array to store white chips
        this.blackChips = []; // Array to store black chips
        this.createBoard(x, y); // Create the checkerboard
        this.multiJump = false; // Boolean to track multi-jump moves
    }

    // Create the checkerboard
    createBoard(x, y) {
        const table = document.getElementById('checkerBoard');
        table.innerHTML = ''; // Clear the existing board
        for (let i = 0; i < x; i++) {
            const Row = document.createElement('tr'); // Create a new row
            for (let j = 0; j < y; j++) {
                let cell;
                if ((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)) {
                    cell = new Tile(this, i, j, 'white'); // Create a white tile
                } else {
                    if (i === 0 || i === 1 || i === 2) {
                        let chip = new Chip('white', 'white_chip.png', 'white_chip_king.png', 'black', 1, 2);
                        this.whiteChips.push(chip); // Add the chip to the whiteChips array
                        cell = new Tile(this, i, j, 'brown', chip); // Create a brown tile with a white chip
                    } else if (i === 5 || i === 6 || i === 7) {
                        let chip = new Chip('black', 'black_chip.png', 'black_chip_king.png', 'white', -1, -2);
                        this.blackChips.push(chip); // Add the chip to the blackChips array
                        cell = new Tile(this, i, j, 'brown', chip); // Create a brown tile with a black chip
                    } else {
                        cell = new Tile(this, i, j, 'brown'); // Create a brown tile without a chip
                    }
                }
                this.tiles[`${i},${j}`] = cell; // Store the tile reference
                Row.appendChild(cell.elem); // Add the tile to the row
            }
            table.appendChild(Row); // Add the row to the table
        }
    }

    // Switch the current player
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white'; // Switch between 'white' and 'black'
        this.updateCurrentPlayerDisplay(); // Update the display
        this.selectedTile = null; // Clear the selected tile
    }

    // Update the display to show the current player
    updateCurrentPlayerDisplay() {
        const currentPlayerElement = document.getElementById('currentPlayer');
        currentPlayerElement.textContent = `Current Player: ${this.currentPlayer}`; // Display the current player
    }

    // Remove a chip from the board
    removeChip(chip) {
        if (chip.color === 'white') {
            const index = this.whiteChips.indexOf(chip);
            if (index > -1) {
                this.whiteChips.splice(index, 1); // Remove the chip from the whiteChips array
            }
        } else if (chip.color === 'black') {
            const index = this.blackChips.indexOf(chip);
            if (index > -1) {
                this.blackChips.splice(index, 1); // Remove the chip from the blackChips array
            }
        }
        this.checkForWin(); // Check if the game is won
    }

    // Check if a player has won the game and restart the game
    checkForWin() {
        if (this.whiteChips.length === 0) {
            if (confirm('Black Wins!\nPlay Again?')) {
                startGame(); 
            }
        } else if (this.blackChips.length === 0) {
            if (confirm('White Wins!\nPlay Again?')) {
                startGame(); 
            }
        }
    }
}

// Function to start the game
const startGame = () => {
    const board = new Board(8, 8); // Create a new board with 8 rows and 8 columns
};

// Start the game initially
startGame();