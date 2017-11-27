// JavaScript Document(
var board = document.getElementById("board");
var header = document.createElement("h1");
var info_header = document.createElement("h4");
var info_text = document.createElement("p");
var info_header2 = document.createElement("h4");
var info_text2 = document.createElement("p");
var matchTable = document.createElement("table");
var clickedTimesTitle = document.createElement("h3");
var clickedTimesText = document.createElement("p");
var gameStatus = document.createElement("p");
var restartButton = document.createElement("button");

board.className ="board";
matchTable.className = "table";

header.className = "game-title";
header.textContent ="Match Game";

info_header.textContent ="Rules";
info_header.className = "subtitle";

info_text.className = "subtitle-text";
info_text.textContent = "Click on the card to reveal the number on the other side. Click on a second card to try to "+"find a match to the first. If you succeed, the card will be removed from the play. If not, try again!";

info_header2.className="subtitle";
info_header2.textContent="How to win";

info_text2.className="subtitle-text";
info_text2.textContent="You win when all pairs have been found";

clickedTimesTitle.className= "click-title"
clickedTimesTitle.textContent = "Clicks";

clickedTimesText.className="click-text";
clickedTimesText.textContent=0;

gameStatus.className="game-status";
gameStatus.textContent="";


restartButton.className="btn-restart";
restartButton.textContent = "Restart Game";
restartButton.style.visibility="hidden";




var row,cell;
var numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
shuffle(numbers)
console.log("Numbers after shuffling="+numbers);

var index =0;
var countClick = 0;

for(var i =0;i<4;i++) {
	
    row = document.createElement("tr");
	matchTable.appendChild(row);
	
	for(var j=0;j<4;j++){
	    cell = document.createElement("td");
		cell.className = "cell";
		cell.style.backgroundColor = "#203F58";
	    cell.textContent=numbers[index++];
		cell.setAttribute("id",index);
        cell.style.color = "transparent";
	    matchTable.appendChild(cell); 
		
		
	}
}

board.appendChild(header);
board.appendChild(info_header);
board.appendChild(info_text);
board.appendChild(info_header2);
board.appendChild(info_text2);

board.appendChild(matchTable);
board.appendChild(clickedTimesTitle);
board.appendChild(clickedTimesText);
board.appendChild(gameStatus);
board.appendChild(restartButton);

var cells = document.querySelectorAll("td");

console.log("No of cells = "+cells.length);


var lastCell = null;
for(var i=0;i<cells.length;i++){
	cells[i].addEventListener("click", function(){
	
		var isValidClick = isArrayElementFound(numbers,this.textContent);
		
		if(isValidClick){
		if(lastCell == null){
		this.style['background-color'] ="#FE9849";
		this.style.color ="white";	
			
		console.log("last cell is null");
		lastCell = this;	
			
		} else {
			
			if(lastCell.getAttribute("id") == this.getAttribute("id")) {
			return;	
			}
			var currentCell = this;
			
			clickedTimesText.textContent = ++countClick;
			console.log("last cell id = "+lastCell.getAttribute("id"));
			if(lastCell.getAttribute("id") != currentCell.getAttribute("id")) {
			
			console.log("last cell is not null");
			console.log("current cell value="+currentCell.textContent+", last cell value "+lastCell.textContent);
			
			if(currentCell.textContent == lastCell.textContent) {
				console.log("cell matched..");
				
				 lastCell.style.backgroundColor = "#989898";
                 lastCell.style.color = "#CBCBCB";
	             this.style.backgroundColor = "#989898";
                 this.style.color = "#CBCBCB";
				 //remove element
				for(var i = numbers.length-1; i--;){
	            if (numbers[i] == currentCell.textContent) numbers.splice(i, 1);
                }
				
			} else {
				console.log("cell not matched");
		this.style.backgroundColor = "#e74c3c";
        this.style.color = "white";
	    
				setTimeout(callback,200,lastCell,currentCell);
	    		    
			}
			
			
			lastCell = null;
			}
		}
	}
		
		if(numbers.length == 1) {
			gameStatus.textContent="Game Completed";
			restartButton.style.visibility ="visible";
			
		}
		
	});
}


restartButton.onclick= function() {
	location.reload();
}


var callback = function(cell1,cell2) {
	console.log("Run after 5 sec lastCell="+cell1.textContent+", currentCell="+cell2);
	    cell1.style.backgroundColor = "#203F58";
        cell1.style.color = "transparent";
	    cell2.style.backgroundColor = "#203F58";
        cell2.style.color = "transparent";
}


function isArrayElementFound(array,x) {
	console.log("isElementPresent(array="+array+", x="+x+")");
	return (array.indexOf(parseInt(x))) > -1
}

//Fisher–Yates shuffle algorithm:
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

