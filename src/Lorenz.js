import { GAME_HEIGHT, GAME_WIDTH } from "./Globals.js"

export default class Lorenz{
    constructor(){
        this.scale = 1
        this.x = 0.01
        this.y = 0
        this.z = 0
        this.a = 10
        this.b = 29
        this.c = 8/3
    }

    update(input,deltaTime){
        const dt = 0.01
        const dx = (this.a * (this.y - this.x)) * dt
        const dy = (this.x * (this.b - this.z) - this.y) * dt
        const dz = (this.x * this.y - this.c * this.z) * dt
        this.x = (this.x + dx) * this.scale
        this.y = (this.y + dy) * this.scale
        this.z = this.z + dz
    }

    draw(context){
        context.save()
        context.translate(GAME_WIDTH/2, GAME_HEIGHT/2)
        context.scale(4,4)
        context.fillStyle='#fff'
        context.fillRect(this.x,this.y,1,1)
        context.stroke()
        context.restore()
    }
}