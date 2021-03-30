import * as Chess from 'chess.js'
import {BehaviorSubject} from 'rxjs'

// let stalemate = "k7/1R1RN3/p3p3/P3P2p/1PP4P/3K1PP1/8/8 b - h3 0 1";
// let checkmate = "r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4";

const chess = new Chess()
let timeLoss = false;
let resign = false;
let resignPlayer;
let drawAccepted = false;

export const gameSubject = new BehaviorSubject()

export function initGame() {
    updateGame()
}

export function resetGame() {
    timeLoss = false;
    resign = false;
    drawAccepted = false;
    chess.reset()
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
        console.log(from, to)
    }
}

function updateGame(pendingPromotion) {
    const isGameOver = chess.game_over() || timeLoss || drawAccepted || resign
    const turn = chess.turn()

    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: turn,
        result: isGameOver ? getGameResult() : null,
        timerActive: turn === 'w'
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
        return 'DRAW BY AGREEMENT'
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
