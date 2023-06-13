import { useState } from 'react'
import './App.css'



const turns = {
  X: 'x',
  O: 'o'
}



const Square = ({children, isSelected, updateBoard, index}) =>{
const className = `square ${isSelected ? 'is-selected' : ''}`


const handleClick = ()=>{
    updateBoard(index)
  }

  

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function App() {


  const updateBoard = (index)=>{
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
      console.log(newWinner)
    }


    const newTurn = turn === turns.O ? turns.X : turns.O
    setTurn(newTurn)
  }

  const [board, setBoard] = useState(Array(9).fill(null))

  const [winner, setWinner] = useState()

  const [turn, setTurn] = useState(turns.X)

  const checkWinner = (boardToCheck)=>{
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      
      if (
        boardToCheck [a] &&
        boardToCheck [a] === boardToCheck [b] &&
        boardToCheck [a] === boardToCheck [c]
      ) {
        return boardToCheck[a];
      }
    }

    return null
  }

  return (
    <main className='board'>
      <h1>Ta-Te-Ti</h1>
      <section className='game'>
        {
          board.map((_, index)=>{
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {board[index]}
             </Square> 

            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === turns.X}>
          {turns.X}
        </Square>
        <Square isSelected={turn === turns.O}>
          {turns.O}
        </Square>
      </section>
    </main>

  )
}

export default App
