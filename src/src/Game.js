import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'
import {socket, mySocketId } from './Connections/socket'

// let stalemate = "k7/1R1RN3/p3p3/P3P2p/1PP4P/3K1PP1/8/8 b - h3 0 1";
// let checkmate = "r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4";

const chess = new Chess()
let timeLoss = false;
let resign = false;
let resignPlayer;
let drawAccepted = false;
let reset = false;
let roomname;

export const gameSubject = new BehaviorSubject()

export function initGame(r) {
    roomname = r;
    updateGame()
}

export function resetGame() {
    timeLoss = false;
    resign = false;
    drawAccepted = false;
    chess.reset()
    reset = false
    updateGame()
}

export function timeout() {
    timeLoss = true
    updateGame()
}

export function drawGame() {
    drawAccepted = true;
    updateGame();
}

export function resignGame(player) {
    resignPlayer = player
    resign = true;
    updateGame();
}

export function handleMove(from, to) {
    if (timeLoss || drawAccepted || resign) {
        return;
    }
    const promotions = chess.moves({ verbose: true }).filter(m => m.promotion)
    console.table(promotions)
    if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
        const pendingPromotion = { from, to, color: promotions[0].color }
        updateGame(pendingPromotion)
    }
    const { pendingPromotion } = gameSubject.getValue()

    if (!pendingPromotion) {
        move(from, to)
    }
}

export function move(from, to, promotion) {
    let tempMove = { from, to }
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)

    if (legalMove) {
        updateGame()
        const turn = chess.turn()
        socket.emit("new move",{
            nextPlayerColorToMove: turn === 'w' ? 'w' : 'b',
            playerColorThatJustMoved: turn === 'w' ? 'b' : 'w',
            finalPosition: to,
            boardState: chess.board(),
            roomname: roomname
        });
        console.log(from, to)
    }
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over() || timeLoss || drawAccepted || resign
    const turn = chess.turn()
    console.log(isGameOver);
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: turn,
        result: isGameOver ? getGameResult() : null,
        timerActive: turn === 'w',
        resetTimer: reset,
        roomName: roomname
    }
    gameSubject.next(newGame)
}
function getGameResult() {
    console.log(chess.fen())
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `CHECKMATE - WINNER - ${winner}`
    } else if (timeLoss) {
        const winner = chess.turn() === "w" ? 'BLACK' : 'WHITE'
        return `TIMEOUT - WINNER - ${winner}`
    } else if (resign) {
        const winner = resignPlayer === "w" ? 'BLACK' : 'WHITE'
        return `RESIGNATION - WINNER - ${winner}`
    } else if (drawAccepted) {
        return 'DRAW'
    } else if (chess.in_draw()) {
        let reason = '50 - MOVES - RULE'
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = "INSUFFICIENT MATERIAL"
        }
        return `DRAW - ${reason}`
    } else {
        return 'UNKNOWN REASON'
    }
}
