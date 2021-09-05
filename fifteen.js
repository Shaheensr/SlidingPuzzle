window.addEventListener("load", load);
var rows_columns = 4;
var empty_x = 3;
var empty_y = 3;

  function load() {
    drawPuzzle();
    document.getElementById("shufflebutton").onclick = shuffle;
  }

  function drawPuzzle() {
    var num = 1;
    for (var i = 0; i < rows_columns; i++) {
      for (var j = 0; j < rows_columns; j++) {
        var tile = document.createElement("div");
        tile.classList.add("puzzlepiece");
        tile.style.left = 100 * j + "px";
        tile.style.top = 100 * i + "px"; 
        tile.style.backgroundPosition = (0 - 100 * j) + "px" + " " + (0 - 100 * i) + "px";
        tile.setAttribute("id", "square" + "_" + j + "_" + i);
        tile.innerHTML = num++;
        tile.onmouseover = highlight;
        tile.onmouseout = unhighlight;
        tile.onclick = tileClick;
        if (i != 3 || j != 3) { 
          document.getElementById("puzzlearea").appendChild(tile);
        }
      }
    }
  }

  function validMove(tile) { 
    var neighbors = getNeighbors();
    if (neighbors.indexOf(tile.getAttribute("id")) != -1) {
      return true;
    } else {
      return false;
    }
  }

  function highlight() {
    if (validMove(this)) {
      this.classList.add("highlight");
    }
  }

  function unhighlight() {
    if (validMove(this)) {
      this.classList.remove("highlight");
    }
  }

  function tileClick(){
    moveTiles(this);
  }

  function moveTiles(tile) {
    var tempEX = empty_x;
    var tempEY = empty_y;
    if (validMove(tile)) {
      empty_x = parseInt(tile.style.left) / 100; 
      empty_y = parseInt(tile.style.top) / 100;
      tile.style.top = 100 * tempEY + "px";
      tile.style.left = 100 * tempEX + "px";
      tile.setAttribute("id", "square_" + tempEX + "_" + tempEY);
    }
  }

  function shuffle() {   
    for (var i = 0; i < 1000; i++) {
      var neighbors = getNeighbors();
      var rand = parseInt(Math.random() * neighbors.length);
      var tile = document.getElementById(neighbors[rand]);
      moveTiles(tile);
    }
  }

  function getNeighbors() {
    var up = "square_" + empty_x + "_" + (empty_y - 1);
    var down = "square_" + empty_x + "_" + (empty_y + 1);
    var left = "square_" + (empty_x - 1) + "_" + empty_y;
    var right = "square_" + (empty_x + 1) + "_" + empty_y;

    var tiles = [up, down, left, right];
    var realTiles = [];

    for (var i = 0; i < tiles.length; i++) {
      if (document.getElementById(tiles[i]) != null) {
        realTiles.push(tiles[i]);
      }
    }
    return realTiles;
  }
