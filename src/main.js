import { Game } from "./Game.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./Globals.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext("2d")

    const game = new Game(canvas)
    let lastTime = 0

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})