let noOfRows=10; // Number of rows
let noOfColumns=10; //Number of columns
let noOfCells=noOfRows*noOfColumns; //Number of cells altogether
let noOfCandies=10; // Number of bombs
let totalClicks=noOfCells-noOfCandies; //Total number of clicks needed to win
let actualClicks=0; // tracking actual number of clicks done by the player
let remainingClicks=totalClicks- actualClicks; // remaining clicks needed to win the game
let timerStatus=0; //timerStatus to determine when to start the game
let TotalTimeLimit=299; // Total time available to win the game
let seconds=TotalTimeLimit; // Timer which will be displayed on the webpage
let bombsToBeIdentified=noOfCandies; // Number of bombs to be identified and it will be displayed on the webpage
let flagstatus; //Required to know the status of the particular tile
let flagsArray=[]; // Array to save the flagged tile's ID
let flagsArray2=[]; //Array to save the values present in the tiles

//First method to execute on loading the page
function loadTable()
{
    hideNumbers(); //method will hide all the buttons.
    setTiles(); //method will set the candies in different buttons
    document.getElementById("bombsCount").innerText=noOfCandies;
}

function hideNumbers()
{
    for(let i=1;i<=noOfCells;i++)
    {
        document.getElementById(i).style.fontStyle = "bold";
        document.getElementById(i).style.color="white"; //hiding the text on the button

    }
}

//As of now the number of buttons is preset to 9 and will be modifier later
function setTiles()
{
    for(let i=1;i<=noOfCells;i++)
    {
        document.getElementById(i).innerText="0"; //Update the text of button with "0". This will not visible untill button is clicked.
        document.getElementById(i).value=0; //Update the value inside the button to 0 before the start of the game.
        document.getElementById(i).innerText.fontStyle = "bold";
    }
    addBombs(); //method will add 3 candies in random buttons
}

//Method to add bombs in random places
function addBombs()
{
    let candiesArray=[]; //candiesArray variable will store the location of the candies. It will have "" as the first element for now.
    for(let i=0,j=1;candiesArray.length<=noOfCandies;i++)
    {
        let m=(Math.floor(Math.random() * noOfCells))+1; //Generate a random number ranging from 1 to 9
        //console.log("i= "+i+" m= "+m+ " type: "+ typeof(m)); //This will be printed in console screen
        if(!candiesArray.includes(m)) //add candy to candiesArray if and only if the number is not existing in the candiesArray
        {	
            candiesArray[j++]=m; //Add the candies at the given position and increment j
            document.getElementById(m).innerText="B"; //update innerText of the button to "B"
            document.getElementById(m).value="B"; //update the value of the button to "B"
            document.getElementById(m).style.color="white"; //update the color of the text to white
            fetchNeighor(m); //This will check the neighbor buttons and update the value of that button if it doesn't contain candy
        }
    }
    candiesArray.shift(); //Remove the first element("") of the candiesArray which gets added to it upon creation.
}


// This function will start the game by hiding the numbers and then setting the candies in a different buttons.
function startGame()
{
    checkTimerStatus(); // check the status of the time
    //document.getElementById("playMatrix").style.display="block"; //displaying the table with the tiles
    //document.getElementById("playMatrix").border="2"; // settings the size of the border of the table to 2
    removeOverlay();
}

//Method to check if the game needs to started or restarted
function checkTimerStatus()
 {
     if(timerStatus==0) //if true, start the game
     {
         startTimer();
         timerStatus=1;
         document.getElementById("timerBtn").innerText="Reset Game";
         document.getElementById("timerBtn").style.fontStyle = "bold";
     }
     else
     {
         document.getElementById("timerBtn").innerText="Start Game";
         resetGame();
     }
 }


//Method to update the values in the tiles
// 1 2 3
// 4 5 6
// 7 8 9
// for the given number consider it being in the position of 5 and calculate the neighbours according

// for number 1 tile, when considered as being in centered, the neighbours are 6, 8 and 9th tile.
// for number 2= 4,6,7,8,9
// for number 3= 2,5,6
// for number 4= 2,3,6,8,9
// for number 6= 1,2,4,7,8
// for number 7= 2,3,6
// for number 8= 4,6,7,8,9
// for number 9= 1,2,4


//method to fetch the neighbour tiles for the given tile
function fetchNeighor(m)
{
    num1=m-11; // diagonally top left tile (1)
    num2=m-10; //  top tile (2)
    num3=m-9; // diagonally right tile (3)
    num4=m-1; // left tile (4)
    num5=m-0; //actual tile (5)
    num6=m+1; // right tile (6)
    num7=m+9; // diagonally down left tile (7)
    num8=m+10; // down tile (8)
    num9=m+11; // diagonally down right tile
    
        if(m==1) // 1 is the top left tile in 10*10 table
        {
            updateNeighbors(num6,num8,num9);
            
        }
        else if(m==10) // 10 is the top right tile in 10*10 table
        {
            updateNeighbors(num4,num7,num8);
            
        }
        else if(m==91) // 91 is the bottom left tile in 10*10 table
        {
            updateNeighbors(num2,num3,num6);
            
        }
        else if(m==100) // 100 is the bottom right tile in 10*10 table
        {
            updateNeighbors(num1,num2,num4);
            
        }
        else if(m>1 && m<10) // tiles from 2 to 9 in the top row except 1st and 10th tile
        {
            updateNeighbors(num4,num6,num7,num8,num9);
            
        }
        else if(m%10==1 && m!=1 && m!=91) // tiles from the 1st column in the bottom row except 1st and 91st tile
        {
            updateNeighbors(num2,num3,num6,num8,num9);
            
        }
        else if(m%10==0 && m !=10 && m!=100) // tiles from the last column in the bottom row except 10th and 100th tile
        {
            updateNeighbors(num1,num2,num4,num7,num8);
            
        }
        else if(m>91 && m<100) // tiles from 92 to 99 in the bottom row except 92nd and 99th tile
        {
            updateNeighbors(num1,num2,num3,num4,num6);
        }
        else // if the tile is neither from the above places then it will somewhere in the middle which qualifies to be in 5th pos as per 3*3 table
        {
            updateNeighbors(num1,num2,num3,num4,num6,num7,num8,num9);
        }
}

//arguments is the default variable accepting the arguments passed to it
function updateNeighbors()
{
    for(let i=0;i<arguments.length;i++)
        {
                if(document.getElementById(arguments[i]).value!="B") // check if the tile does not contains "B" as its value
                {
                    let cell=Number(document.getElementById(arguments[i]).value); //get the value present in the tile
                    let newValue= cell+1; //increment and save to another variable
                    document.getElementById(arguments[i]).value=newValue; // update tile value to updated value
                    document.getElementById(arguments[i]).innerText=newValue; //update innerText value to updated value
                    document.getElementById(arguments[i]).style.textAlign="center"; //align the text to center
                }
        }
}

//Method to start the timer
function startTimer()
{
    myVar= setInterval(showSeconds, 1000);
}

 //Method to stop the timer
 function stopTimer()
 {
     if(timerStatus==1)
     {
         clearTimeout(myVar);
         document.getElementById("timerBtn").innerText="Play Again";
         //timerStatus=0;
         seconds=TotalTimeLimit;
     }
 }


//Method to identify the click of the button
// 0 = left click on the mouse
// 2 = right click on the mouse
// if the left button is clicked, the method to click the tile will invoked
// if the right button is clicked, then method to determine the flagstatus of the tile is invoked
function identifyClickedButton(event,id)
{
    if(event.button==0)
    {
        clickButton(Number(id)); 
    }
    else
    {
        flagstatus=getFlagStatus(Number(id)); 
        if(flagstatus==-1) //if the flag status is -1, the tile has not be flagged yet
        markFlag(Number(id)); //invoke the method to flag the tile
        else
        unMarkFlag(Number(id),flagstatus); //invoke the method to unmark the flag. flagstatus will hold the returned value
    }
}

//Method to flag the tile
function markFlag(id)
{
    document.getElementById(id).innerText="B"; //Change the innerText to "B" to indicate as a flag
    document.getElementById(id).style.color="black"; //Change the color to black to make innerText visible
    bombsToBeIdentified--; //decrease the number of bombs to be identified
    document.getElementById("bombsCount").innerText=bombsToBeIdentified; //Update the webpage with the number of bombs to identified
}

//Method to unflag the tile
function unMarkFlag(id,flagstatus)
{
    document.getElementById(id).innerText=flagstatus; //change the innerText to flagstatus which was before flagging it to bomb
    document.getElementById(id).style.color="white"; //change the background of the tile to while to make innerText invisible
    bombsToBeIdentified++; // increase the number of bombs to be identified
    document.getElementById("bombsCount").innerText=bombsToBeIdentified; //Update the webpage with the number of bombs to identified
}

//Method to determine the flag status of the tile
function getFlagStatus(id)
{
    pos=Number(id); //pos will hold the id of the tile
    if(!flagsArray.includes(pos)) // if the flagsArray do not contain the pos in it, pos will be added to flagsArray
    {
        flagsArray[pos]=pos; // pos will be to flagsArray at the pos position
        flagsArray2[pos]=document.getElementById(id).value; // saving the value present at the pos to flagsArray2 to be retrieved later if required
        return -1; // return -1 to indicate the flags needs to be displayed on the tile
    }
    else
    {
        temp=Number(flagsArray2[id]); //fetching the element present at position id from flagsArray2 to temp
        flagsArray2[pos]=""; // empty contents at the pos position in the flagsArray2
        flagsArray[pos]=""; // empty contents at the pos position in the flagsArray
        return temp; //return the value to indicates the flags needs to be unmarked from the tile
    }
}

//method to perform click action on the tile
function clickButton(n)
{
    if(document.getElementById(n).disabled==false) //check if the tile is clickable/enabled
    {
        document.getElementById(n).disabled=true; //disable the tile in order to make it non-clickable
        updateClicksCount(); //increment and decrement clicks done and needed
        changeTextColor(n); // change color of the picked tile

        if(document.getElementById(n).value!="B") //check value of the tile is not "B"
        {
            document.getElementById(n).style.color="black"; //change the color of the text to black to make it visible
            changeTextColor(n);
            checkWinStatus();
            if(document.getElementById(n).value==0)
            {
                document.getElementById(n).style.color="white";
                revealNeighbourNumbers(n);
            }
        }
        else
        {
            //document.getElementById(n).style.color="white"; //change the color of the text to black to make it visible
            revealAllNumbers();
            stopTimer();
            //alert("gameover");
            
            if(confirm("Game over!! Do you want to play again? or review the last game"))
            {
                resetGame();
            }
            else
            {

            }
            
        }
    }
    else
    {
    }
}

// Method to display show seconds in the webpage
function showSeconds()
{
    if(seconds<=0)
    {
        stopTimer(); // stop the timer 
        revealAllNumbers(); //reveal all the tiles
        document.getElementById("timerBtn").innerText="Play again"; // Change the text on the button
        
        //Check with player if he/she wants to play again or review last played game
        if(confirm("Game over!! Do you want to play again? or review the last game"))
            {
                resetGame();
            }
            else
            {
                document.getElementById("timerId").innerText=0; //Show remaining seconds in screen
            }
    }
    else
    document.getElementById("timerId").innerText=seconds--;
}

// Method to reveal the neighbour tiles
function revealNeighbourNumbers(n)
{

    num1=Number(n)-11;
    num2=Number(n)-10;
    num3=Number(n)-9;
    num4=Number(n)-1;
    num5=Number(n)-0;
    num6=Number(n)+1;
    num7=Number(n)+9;
    num8=Number(n)+10;
    num9=Number(n)+11;

    if(n==1)
    {
        displayNumber(num6,num8,num9);
    }
    else if(n==10)
    {
        displayNumber(num4,num7,num8);
    }
    else if(n==91)
    {
        displayNumber(num2,num3,num6);				
    }
    else if(n==100)
    {
        displayNumber(num1,num2,num4);				
    }
    else if(n>1 && n<10)
    {
        displayNumber(num4,num6,num7,num8,num9);
    }
    else if(n%10==1 && n !=1 && n!=91)
    {
        displayNumber(num2,num3,num6,num8,num9);
        
    }
    else if(n%10==0 && n !=10 && n!=100)
    {
        displayNumber(num1,num2,num4,num7,num8);
        
    }
    else if(n>91 && n<100)
    {
        displayNumber(num1,num2,num3,num4,num6);
    }
    else
    {
        displayNumber(num1,num2,num3,num4,num6,num7,num8,num9);
    }			
}

// Method to reveal to all the tiles
function revealAllNumbers()
{
    for(let i=1;i<=noOfCells;i++)
    {
        document.getElementById(i).disabled="true";
        if(document.getElementById(i).value=="B")
        {
            //document.getElementById(i).style.backgroundColor="red";
            document.getElementById(i).value="";
            document.getElementById(i).innerText="";
            let imgbox=document.createElement("img");
            imgbox.src="images/bmb6.png";
            imgbox.style.width="20px";
            imgbox.style.height="20px";
            document.getElementById(i).appendChild(imgbox);
            
            if(actualClicks>=90)
            {
                document.getElementById(i).style.color="black";
            }
        }
        else
        {
            if(document.getElementById(i).innerText=="B")
            {
                if(document.getElementById(i).value!="B")
                {
                    document.getElementById(i).style.backgroundColor="black";
                }
                else
                {
                }
            }
            else
            {
                changeTextColor(i);
            }
        }
    }
}

// Display the number of the given tile
function displayNumber()
{
    for(let i=0;(i<arguments.length && arguments.length>0);i++)
    {
        if(document.getElementById(arguments[i]).disabled==false)
        {
            if(document.getElementById(arguments[i]).value!="B")
            {
                actualClicks++;
                remainingClicks--;
                
                document.getElementById(arguments[i]).disabled=true;
                if(document.getElementById(arguments[i]).value==0)
                {
                    document.getElementById(arguments[i]).style.color="white";
                    revealNeighbourNumbers(arguments[i]);
                }
                else
                {
                    changeTextColor(arguments[i]);
                }
                //console.log("actual count: from display method: "+	actualClicks);
                checkWinStatus();						
            }
        }
        else
        {
        }
    }		
}

// Method to check with win status by verifying number of actual clicks
function checkWinStatus()
{
    if(actualClicks>=90) // check if the actual click is more than 90, then its a win!!
    {
        timerStatus=1;
        stopTimer();
        revealAllNumbers();
        document.getElementById("timerBtn").innerText="Play Again";
        if(confirm("You Win!! Want to play again?" ))
        {
            resetGame();
        }
        else
        {

        }
        //alert("You win!!!");
    }
}

// Change the text color of the clicked tile if it has a number inside it
function changeTextColor(cellText)
{
    switch(Number(document.getElementById(cellText).value))
    {
        case 1: document.getElementById(cellText).style.color = "blue";
        break;
        case 2: document.getElementById(cellText).style.color = "green";
        break;
        case 3: document.getElementById(cellText).style.color = "brown";
        break;
        case 4: document.getElementById(cellText).style.color = "orange";
        break;
        case 5: document.getElementById(cellText).style.color = "purple";
        break;
        case 6: document.getElementById(cellText).style.color = "lightred";
        break;
        case 7: document.getElementById(cellText).style.color = "darkorange";
        break;
        case 8: document.getElementById(cellText).style.color = "darkblue";
        break;
    }

}

//Method to increment and decrement clicks count
function updateClicksCount()
{
    actualClicks++; //increment the clicks done by the player
    remainingClicks--; //decrement the number of clicks required
}

//Event listener to track mouse events
document.addEventListener('DOMContentLoaded', function()
{
    //add the right click listener to the box		
    for(let i=1;i<=100;i++)
    {
        let box = document.getElementById(i);
        box.addEventListener('contextmenu', showmenu);
    }
});
function showmenu(ev){
    //stop the real right click menu
    ev.preventDefault(); 			
}

//reset the game
function resetGame()
{
    location.reload(); //reloads the page
}

function removeOverlay()
{
    document.getElementById("overlayDiv").style.display="none";
}