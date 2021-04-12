import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'

// let stalemate = "k7/1R1RN3/p3p3/P3P2p/1PP4P/3K1PP1/8/8 b - h3 0 1";
// let checkmate = "r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4";

// instantiate Chess object and boolean variables
const chess = new Chess()
let timeLoss = false;
let resign = false;
let resignPlayer;
let drawAccepted = false;
let reset = false;
var boardState;

// create BehaviorSubject observable
export const gameSubject = new BehaviorSubject()

// initializes the game
export function initGame() {
    updateGame()
}

// reset the game
export function resetGame() {
    timeLoss = false;
    resign = false;
    drawAccepted = false;
    chess.reset()
    reset = false
    updateGame()
}

// call a game timeout
export function timeout() {
    timeLoss = true
    updateGame()
}

// draw the game
export function drawGame() {
    drawAccepted = true;
    updateGame();
}

// resign the game
export function resignGame(player) {
    resignPlayer = player
    resign = true;
    updateGame();
}

// handle a chess move
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

// move chess piece 
export function move(from, to, promotion) {
    let tempMove = { from, to }
    if (promotion) {
        tempMove.promotion = promotion
    }
    const legalMove = chess.move(tempMove)

    if (legalMove) {
        updateGame()
        console.log(from, to)
    }
}

// update the game with potential pawn promotion
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
        resetTimer: reset
    }
    gameSubject.next(newGame)
}

// get the result of the game
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
