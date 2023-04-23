const squares = document.querySelectorAll(".sub_container")
const score = document.querySelector(".score")
const winner = document.getElementById("winner")
const story = document.getElementById('story')
const board=document.getElementById('board')
const container = document.getElementById('container')
const audio = document.querySelector('audio')
const duel=document.getElementById('duel')
const son = document.getElementById('son')
const containerScore =document.getElementById('score')
const values = ['rock', 'paper', 'scissors']
audio.volume=0.3


window.onload=()=>{
    container.style.display='none'
    containerScore.style.display='none'
    runText()

}


son.onclick=()=>{
    son.classList.toggle('play')
    if (son.classList[0]=='play') {
        audio.play()
        son.innerText='🔊'
    } else {
        audio.pause()
        son.innerText='🔇'
        
    }
}




let text = "You are lost in the forest of darkness..."

function runText() { setInterval(first,150)}

let index=0
let repeat=0
function first(){
    
    story.innerText = text.slice(0, index)
    index++
    if (index ==text.length+1 && repeat==0) {
        index=0
        repeat =1
        text = "The only way out is to defeat the demon guardian..."
    }else if (index==51) {
        duel.style.display='none'
        container.style.display='flex'
        containerScore.style.display='flex'
    }
    
}


const getComputerChoice = ()=>{
    let random=Math.floor(Math.random() * (values.length -1))
    let robotChoice = values[random]
    return robotChoice
}

let user_score = 0
let robot_score = 0

const playRound= (user, robot) =>{
    if(user == robot){
        winner.innerText=`Your ${user} attack is equal to darkness ${robot} attack`
    }else if (user == "rock" && robot == "scissors") {
        user_score++
        winner.innerText=`Your ${user} attack beats darkness ${robot} attack`
    } else if (user == "paper" && robot == "rock") {
        user_score++
        winner.innerText=`Your ${user} attack beats darkness ${robot} attack`
    }else if (user == "cissor" && robot == "paper"){
        user_score++
        winner.innerText=`Your ${user} attack beats darkness ${robot} attack`
    } else if (user == robot){
        user_score++
        winner.innerText=`Your ${user} attack beats darkness ${robot} attack`
    }else{
        robot_score++
        winner.innerText=`darkness ${robot} attack beats your ${user}`
    }
    
    return  'robot', robot_score, 'user', user_score
}

const playAgain=()=>{
    squares.forEach(square =>{
        square.setAttribute("disabled", true)
        square.style.filter=`blur(${10}px)`
    })
    let playBtn = document.createElement('div')
    playBtn.id='playBtn'
    let text = document.createTextNode('Play again?')
    playBtn.appendChild(text)
    score.innerHTML=""
    score.appendChild(playBtn)
    const replay=document.getElementById('playBtn')

    replay.onclick=()=>{
        newParty()
    }
}

function play() {
    squares.forEach(square => {
        
        square.addEventListener('click', ()=>{
            
            let computerSelection = getComputerChoice()
            let playerSelection= square.value
            playRound(playerSelection, computerSelection)
            score.innerText = `User ${user_score} : ${robot_score} Robot`
            if (user_score >=5 || robot_score >=5) {
                if (user_score > robot_score) {
                    winner.innerText = 'You Win!! Congratilations'
                    user_score=0
                    robot_score=0
                    playAgain()
                } else {
                    
                    winner.innerText = 'You LOOOOOOOOOSE!!!!'
                    user_score=0
                    robot_score=0
                    playAgain()
                }
            }
        })
    });
    
 
}
function newParty() {
    squares.forEach(square =>{
        square.removeAttribute("disabled", true)
        square.style.filter=`blur(${0}px)`
    })
    score.removeChild(playBtn)
}



const game=()=>{
   play()
}

game()