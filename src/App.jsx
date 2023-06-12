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

function App() {


  const updateBoard = (index)=>{
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)


    const newTurn = turn === turns.O ? turns.X : turns.O
    setTurn(newTurn)
  }

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(turns.X)


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
