let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_button");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");
let turnO = true; // playerX, playerO

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=> {
    box.addEventListener("click",() => {
        // console.log("box was cliked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (WINNER)=>{
    msg.innerText = `Congratulation, Winner  is ${WINNER}`;   
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    // Check winner first
    for (let pattern of winPatterns) {
        let a = boxes[pattern[0]].innerText;
        let b = boxes[pattern[1]].innerText;
        let c = boxes[pattern[2]].innerText;

        if (a && a === b && b === c) {
            showWinner(a);
            return; // EXIT FUNCTION COMPLETELY
        }
    }

    // Draw check only if NO winner
    let allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click",resetGame);
reset_btn.addEventListener("click",resetGame);