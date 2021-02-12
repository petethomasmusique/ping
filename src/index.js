// TODO: if blocks arrive at the same time as each other - send out blocks in all directions!

// create board of size dependent on scale, with y axis offset by 1...e.g.
// a b c d
// b c d a
// c d a b
// d a b c

// barriers become part of squares

import Board from './js/Board'
import * as Tone from 'tone'
import './styles/index.scss'

let board = new Board(["d2", "a2", "d3", "a3", "c4", "e4", "f4", "g4", "a4", "c5", "e5"])
let audioIsRunning = false

document.addEventListener('keydown', async () => {
    if(audioIsRunning) return
	await Tone.start()
    audioIsRunning = true
	console.log('audio is ready')
})
document.addEventListener('keydown', function(e) {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) board.setCursor(e.key)
    if(['n', 's', 'e', 'w'].includes(e.key)) board.createBlock(e.key)
    if(['t', 'b', 'l', 'r'].includes(e.key)) board.createBarrier(e.key)
});

new Tone.Loop(time => {
    board.clearBoard()
    board.drawBlocks()
    board.playAndMoveBlocks(time)
    board.drawBoard()
}, "8n").start(0);

Tone.Transport.start();