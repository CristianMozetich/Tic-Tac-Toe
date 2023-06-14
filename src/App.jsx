import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'



const turns = {
  X: '*',
  O: '°'
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


  const [board, setBoard] = useState(Array(9).fill(null))

  const [winner, setWinner] = useState()

  const [turn, setTurn] = useState(turns.X)

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(turns.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard)=>{
    return newBoard.every((Square)=> Square !== null )
  }

  const updateBoard = (index)=>{
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
      if (newWinner){
      confetti()
      setWinner(newWinner)
      console.log('El ganador es', newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }


    const newTurn = turn === turns.O ? turns.X : turns.O
    setTurn(newTurn)
  }




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
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index)=>{
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {square}
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


      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Ganó: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>

  )
}

export default App
