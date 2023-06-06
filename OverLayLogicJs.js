let noOfRows=10; // Number of rows
let noOfColumns=10; //Number of columns
let noOfCells=noOfRows*noOfColumns; //Number of cells altogether
let noOfCandies=10; // Number of bombs
let totalClicks=noOfCells-noOfCandies; //Total number of clicks needed to win
let actualClicks=0; // tracking actual number of clicks done by the player
let remainingClicks=totalClicks- actualClicks; // remaining clicks needed to win the game
let timerStatus=0; //timerStatus to determine when to start the game
let TotalTimeLimit=300; // Total time available to win the game
let seconds=TotalTimeLimit; // Timer which will be displayed on the webpage
let bombsToBeIdentified=noOfCandies; // Number of bombs to be identified and it will be displayed on the webpage
let flagstatus; //Required to know the status of the particular tile
let flagsArray=[]; // Array to save the flagged tile's ID
let flagsArray2=[]; //Array to save the values present in the tiles
let markedStatus; //Required to know the status of the particular tile
let isGameStarted=false;//required to know the status of the game
let phase1=Number(TotalTimeLimit*0.75);
let phase2=Number(TotalTimeLimit*0.5);
let phase3=Number(TotalTimeLimit*0.25);;

function loadTable() //First method to execute on loading the page
{    
    document.getElementById("timerId").innerText=TotalTimeLimit;
    document.getElementById("timerId").style.color="black";
    document.getElementById("showTotalTimeAlloted").innerText=TotalTimeLimit;
    document.getElementById("showTotalTimeAlloted").style.color="black";
    document.getElementById("allotedNumberOfBombs").innerText=noOfCandies;
    document.getElementById("allotedNumberOfBombs").style.color="black";
    hideNumbers(); //method will hide all the buttons.
    setTiles(); //method will set the candies in different buttons
    document.getElementById("bombsCount").innerText=noOfCandies;
}

function hideNumbers() //method to hide the numbers behind the tiles
{
    for(let i=1;i<=noOfCells;i++)
    {
        document.getElementById(i).style.color="grey"; //hiding the text on the button
        document.getElementById(i).style.backgroundColor="grey"; //hiding the text on the button
    }
}

function setTiles() //As of now the number of buttons is preset to 9 and will be modifier later
{
    for(let i=1;i<=noOfCells;i++)
    {
        document.getElementById(i).innerText="0"; //Update the text of button with "0". This will not visible untill button is clicked.
        document.getElementById(i).value=0; //Update the value inside the button to 0 before the start of the game.
        document.getElementById(i).innerText.fontStyle = "bold";
        document.getElementById(i).backgroundColor="grey";
    }
    addBombs(); //method will add given number of candies in random tiles
}

function addBombs() //Method to add bombs in random places
{
    let candiesArray=[]; //candiesArray variable will store the location of the candies. It will have "" as the first element for now.
    for(let i=0,j=1;candiesArray.length<=noOfCandies;i++)
    {
        let m=(Math.floor(Math.random() * noOfCells))+1; //Generate a random number ranging from 1 to 9
        if(!candiesArray.includes(m)) //add candy to candiesArray if and only if the number is not existing in the candiesArray
        {	
            candiesArray[j++]=m; //Add the candies at the given position and increment j
            document.getElementById(m).innerText="B"; //update innerText of the button to "B"
            document.getElementById(m).value="B"; //update the value of the button to "B"
            document.getElementById(m).style.backgroundColor="grey"; //update the color of the text to grey
            fetchNeighor(m); //This will check the neighbor buttons and update the value of that button if it doesn't contain candy
        }
    }
    candiesArray.shift(); //Remove the first element("") of the candiesArray which gets added to it upon creation.
}

function startGame() // This function will start the game by hiding the numbers and then setting the candies in a different buttons.
{
    checkTimerStatus(); // check the status of the time
    removeOverlay(); //remove the overlay before starting the game
}

function checkTimerStatus() //Method to check if the game needs to started or restarted
 {
     if(timerStatus==0) //if true, start the game
     {
         startTimer();
         timerStatus=1; //indicates the game just started
         document.getElementById("timerBtn").innerText="Reset Game";
         document.getElementById("timerBtn").style.fontStyle = "bold";
         isGameStarted=true;
     }
     else //if false, reset/restart the game
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

function fetchNeighor(m) //method to fetch the neighbour tiles for the given tile
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

function updateNeighbors() //arguments is the default variable accepting the arguments passed to it
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

function startTimer() //Method to start the timer
{
    myVar= setInterval(showSeconds, 1000);
}

 function stopTimer() //Method to stop the timer
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

function identifyClickedButton(event,id) //identify the clicked tile
{
    if(isGameStarted==true) //check if game is already started or not
    {
        if(event.button==0) // 0 indicated left click action
        {
            markedStatus=fetchFlagStatus(id); //Check if the current tile  is marked or not
            if(markedStatus==0) //0 indicates the tile is not clicked & not flagged
            {
                clickButton(Number(id)); //reveal the information in the tile
            }
            else
            {
                // Do nothing if the tile is already clicked
            }
        }
        else
        {
            if(bombsToBeIdentified>0)
            {
                flagstatus=getFlagStatus(Number(id)); 
                if(flagstatus==-1) //if the flag status is -1, the tile has not be flagged yet
                markFlag(Number(id)); //invoke the method to flag the tile
                else
                unMarkFlag(Number(id),flagstatus); //invoke the method to unmark the flag. flagstatus will hold the returned value                
            }
            else
            {
                markedStatus=fetchFlagStatus(id); //check if the current tile is marked or not
                if(markedStatus!=0)
                {
                    flagstatus=getFlagStatus(Number(id)); 
                    if(flagstatus==-1) //if the flag status is -1, the tile has not be flagged yet
                    markFlag(Number(id)); //invoke the method to flag the tile
                    else
                    unMarkFlag(Number(id),flagstatus); //invoke the method to unmark the flag. flagstatus will hold the returned value                
                }
                else
                {
                    //The tile cannot be clicked since 10 are already marked
                }
            }
        }
    }
}

function markFlag(id) //Method to flag the tile
{
    //Code to add the bomb icon to button
    let imgbox=document.createElement("img");
    imgbox.id="customBmb"+id;
    imgbox.src="images/MarkedBmb.png";
    document.getElementById(id).value="";
    document.getElementById(id).innerText="";
    imgbox.style.width="21px";
    imgbox.style.height="23px";
    document.getElementById(id).appendChild(imgbox);


    document.getElementById(id).style.color="white"; //Change the color to black to make innerText visible
    document.getElementById(id).style.background="white";
    bombsToBeIdentified--; //decrease the number of bombs to be identified
    document.getElementById("bombsCount").innerText=bombsToBeIdentified; //Update the webpage with the number of bombs to identified
}

function unMarkFlag(id,flagstatus) //Method to unflag the tile
{
    document.getElementById(id).removeChild(document.getElementById(id).firstChild);
    if(isNaN(flagstatus)) //It returns NaN value, hence we have to do this way
    {
        document.getElementById(id).innerText="B";
        document.getElementById(id).value="B";
    }
    else
    {
        document.getElementById(id).innerText=flagstatus; //change the innertext to flagstatus which was before flagging it to bomb
        document.getElementById(id).value=flagstatus;
    }

    document.getElementById(id).style.color="grey"; //change the background of the tile to while to make innerText invisible
    document.getElementById(id).style.background="grey";
    bombsToBeIdentified++; // increase the number of bombs to be identified
    document.getElementById("bombsCount").innerText=bombsToBeIdentified; //Update the webpage with the number of bombs to identified
}

function getFlagStatus(id) //Method to determine the flag status of the tile
{
    pos=Number(id); //pos will hold the id of the tile or converted number
    if(!flagsArray.includes(pos)) // if the flagsArray do not contain the pos in it, pos will be added to flagsArray
    {
        flagsArray[pos]=pos; // pos will be to flagsArray at the pos position
        flagsArray2[pos]=document.getElementById(id).value; // saving the value present at the pos to flagsArray2 to be retrieved later if required
        return -1; // return -1 to indicate the flags needs to be displayed on the tile
    }
    else
    {
        if(isNaN(Number(flagsArray2[id])))
        temp="B";
        else
        temp=Number(flagsArray2[id]); //fetching the element present at position id from flagsArray2 to temp
        flagsArray2[pos]=""; // empty contents at the pos position in the flagsArray2
        flagsArray[pos]=""; // empty contents at the pos position in the flagsArray
        return temp; //return the value to indicates the flags needs to be unmarked from the tile
    }
}

function clickButton(n) //method to perform click action on the tile
{
    if(document.getElementById(n).disabled==false) //check if the tile is clickable/enabled
    {
        document.getElementById(n).disabled=true; //disable the tile in order to make it non-clickable
        updateClicksCount(); //increment and decrement clicks done and needed

        if(document.getElementById(n).value!="B") //check value of the tile is not "B"
        {

            document.getElementById(n).style.backgroundColor="white"; //change the color of the text to black to make it visible
            changeTextColor(n);
            checkWinStatus();
            if(document.getElementById(n).value==0)
            {
                document.getElementById(n).style.color="white";
                document.getElementById(n).style.backgroundColor="white";
                revealNeighbourNumbers(n);
            }
        }
        else //indicates the game is over
        {
            //Code to add the bomb icon to the tile
            //document.getElementById(n).style.color="white"; //change the color of the text to black to make it visible
            document.getElementById(n).style.backgroundColor="white"; //change the background color of the tile to white
            document.getElementById(n).value="";
            document.getElementById(n).innerText="";
            let imgbox=document.createElement("img");
            imgbox.src="images/blastedImage.jpg";
            imgbox.style.width="25px";
            imgbox.style.height="25px";
            document.getElementById(n).appendChild(imgbox);
            
            revealAllNumbers();
            stopTimer();
            //alert("gameover");
            
            if(confirm("Game over!! Do you want to play again? or review the last game"))
            {
                resetGame();
            }
            else
            {
                isGameStarted=false;
            }            
        }
    }
    else
    {
    }
}

function showSeconds() // Method to display show seconds in the webpage
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
                isGameStarted=false;
            }
    }
    else
    {
        document.getElementById("timerId").innerText=--seconds;
        if(seconds>phase1)
        {
            document.getElementById("timerId").style.backgroundColor="green";
            document.getElementById("timerId").style.color="white";
        }
        else if(seconds>phase2)
        {
            document.getElementById("timerId").style.backgroundColor="orange";
            document.getElementById("timerId").style.color="white";
        }
        else if(seconds>phase3)
        {
            document.getElementById("timerId").style.backgroundColor="yellow";
            document.getElementById("timerId").style.color="black";
        }
        else
        {
            document.getElementById("timerId").style.backgroundColor="red";
            document.getElementById("timerId").style.color="white";
        }
    }
    
}

function revealNeighbourNumbers(n) // Method to reveal the neighbour tiles
{
    //Determine the neighbouring tiles
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

function revealAllNumbers() // Method to reveal to all the tiles
{
    for(let i=1;i<=noOfCells;i++)
    {
        document.getElementById(i).disabled="true";
        if(document.getElementById(i).value=="B")
        {
            document.getElementById(i).style.backgroundColor="white";
            document.getElementById(i).value="";
            document.getElementById(i).innerText="";
            let imgbox=document.createElement("img");
            imgbox.src="images/ActualBmb.png";
            imgbox.style.width="20px";
            imgbox.style.height="20px";
            document.getElementById(i).appendChild(imgbox);
            
            if(actualClicks>=90)
            {
                document.getElementById(i).style.color="black";

            }
        }
        //if the tile has no bomb but it is flagged
        else if(document.getElementById(i).innerText=="" && document.getElementById(i).value=="" && (!isNaN(Number(flagsArray2[i]))))
        {
            document.getElementById(i).removeChild(document.getElementById(i).firstChild);
            document.getElementById(i).style.backgroundColor="black";
            document.getElementById(i).innerText="X";
        }
        else
        {
            if(document.getElementById(i).innerText=="B")
            {
                if(document.getElementById(i).value!="B")
                {
                    //We need not change any background for the tile containing bomb
                    document.getElementById(i).style.background="black";
                }
                else
                {
                    //Not possible though
                }
            }
            else
            {
                // Do nothing for the tiles which are not clicked yet
            }
        }
    }
}

// Display the number of the given tile
function displayNumber()  //this function accepts and use dynamic array
{
    for(let i=0;(i<arguments.length && arguments.length>0);i++)
    {
        if(document.getElementById(arguments[i]).disabled==false)
        {
            if(document.getElementById(arguments[i]).value!="B" && document.getElementById(arguments[i]).value!="")
            {
                actualClicks++;
                remainingClicks--;
                
                document.getElementById(arguments[i]).disabled=true;
                if(document.getElementById(arguments[i]).value==0)
                {
                    document.getElementById(arguments[i]).style.color="white";
                    document.getElementById(arguments[i]).style.background="white";
                    revealNeighbourNumbers(arguments[i]);
                }
                else
                {
                    document.getElementById(arguments[i]).style.background="white";
                    changeTextColor(arguments[i]);
                }
                checkWinStatus();						
            }
        }
        else
        {
        }
    }		
}

function checkWinStatus() // Method to check with win status by verifying number of actual clicks
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
            isGameStarted=false;
        }
        //alert("You win!!!");
    }
}

function changeTextColor(cellText) // Change the text color of the clicked tile if it has a number inside it
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

function updateClicksCount() //Method to increment and decrement clicks count
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

function resetGame() //reset the game
{
    isGameStarted=false; //set the game status as false/completed
    location.reload(); //reloads the page
}

function removeOverlay() //remove the overlay upon starting the game
{
    document.getElementById("overlayDiv").style.display="none";
}

function fetchFlagStatus(id) //check if the tile is marked or not before clicking it
{
    pos=Number(id); //pos will hold the id of the tile or converted number
    if(flagsArray.includes(pos))
    {
        return -1; //indicates the tile is already marked and we cannot click it
    }
    else
    {
        return 0; //indicates the tile is not marked and we are good to click it
    }
}