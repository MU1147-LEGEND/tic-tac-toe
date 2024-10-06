/* eslint-disable react/prop-types */
import './tic-tac-toe.css';
import '../../index.css';
import { useState } from 'react';

function Square({ value, handleClick }) {
    return (
        <button className={`square h-8 w-8`} onClick={handleClick}>{value}</button>
    );
}

export default function Board() {
    const [isNext, setNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [firstPlayer, setFirstPlayer] = useState("First Player");
    const [secPlayer, setSecPlayer] = useState("Second Player");
    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = `"${winner === "X" ? firstPlayer : secPlayer}" - is Winner`;
    } else {
        status = "Next Move : " + (isNext ? firstPlayer : secPlayer);
    }

    const playerNames = () => {
        setIsOpenModal(true);
    }
    const getFirstPlayer = (e) => {
        setFirstPlayer(e.target.value);
        setFirstValue(e.target.value);
    }
    const getSecondPlayer = (e) => {
        setSecPlayer(e.target.value)
        setSecondValue(e.target.value);

    }

    function handleClick(i) {
        const nextSquares = squares.slice();
        // checking the square if it is null or given value.
        if (nextSquares[i] || calculateWinner(squares)) {
            return;
        }
        // next move for opponent.
        if (isNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setNext(!isNext);

    }

    const resetPlay = () => {
        setSquares([]);
        setNext(true);
    }
    const closeModal = (e)=>{
        e.stopPropagation();
        setIsOpenModal(!isOpenModal);
    }

    return (


        <>{isOpenModal?
            (<div onClick={(e) => { closeModal(e) }} className="modal absolute h-screen flex items-center justify-center bg-gray-600/70 w-full">
                {/* animation design outsite modal */}
                <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
                {/* animation design outsite modal */}
                <div onClick={(e)=>{e.stopPropagation()}} className="playerName relative flex flex-col items-center gap-4 bg-slate-400 h-1/2 w-4/5 md:h-1/2 md:w-3/4 lg:w-1/3 px-8 md:px-20 rounded-xl pt-16">
                    <form className='flex flex-col justify-center items-center gap-4'>
                    <input onChange={(e) => { getFirstPlayer(e) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={firstValue} placeholder="First Player" />
                    <input onChange={(e) => { getSecondPlayer(e) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={secondValue} placeholder="Second Player" />

                    <div className="closeButton absolute bottom-8">
                        <button  onClick={(e) => { closeModal(e) }} className="button-86" role="button">Close</button>
                    </div>
                    </form>

                </div>
            </div>)
            :(

            //{/* gameboard */}
            <div className="container flex flex-col m-auto items-center justify-center h-screen">
                <p className='text-3xl mb-6 font-bold bg-gradient-to-l to-[#09ffea] from-[#fff700] bg-clip-text text-transparent capitalize'>{status}</p>
                <p className='animate-pulse bg-slate-300 mb-2 text-xl font-normal px-3 py-1 rounded-md capitalize'>{firstPlayer}: X, {secPlayer}: O</p>
                <div className="board-row">
                    <Square value={squares[0]} handleClick={() => { handleClick(0) }} />
                    <Square value={squares[1]} handleClick={() => { handleClick(1) }} />
                    <Square value={squares[2]} handleClick={() => { handleClick(2) }} />
                </div>
                <div className="board-row">
                    <Square value={squares[3]} handleClick={() => { handleClick(3) }} />
                    <Square value={squares[4]} handleClick={() => { handleClick(4) }} />
                    <Square value={squares[5]} handleClick={() => { handleClick(5) }} />
                </div>
                <div className="board-row">
                    <Square value={squares[6]} handleClick={() => { handleClick(6) }} />
                    <Square value={squares[7]} handleClick={() => { handleClick(7) }} />
                    <Square value={squares[8]} handleClick={() => { handleClick(8) }} />
                </div>
                <button onClick={resetPlay} className='group mt-6 bg-pink-500 py-2.5 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-500'>Restart <i className="fa-solid fa-arrow-rotate-left rotate-0 group-hover:-rotate-180 transition-transform duration-500"></i></button>
                <button onClick={playerNames} className='group mt-6 bg-pink-500 py-2.5 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-500'>Set Players Name </button>
            </div>
            )
        }
        </>

    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}