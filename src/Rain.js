import { GAME_HEIGHT, GAME_WIDTH, mapRange, randomArbitrary } from "./Globals.js"

class Drop {
    constructor(){
        this.x = randomArbitrary(0,GAME_WIDTH)
        this.y = randomArbitrary(-500,-50)
        this.z = randomArbitrary(0, 20)
        this.len = mapRange(this.z, 0, 20, 10,20)
        this.ySpeed = mapRange(this.z, 0, 20, 1, 20)
    }

    update(){
        this.y += this.ySpeed
        const grav = mapRange(this.z, 0, 20, 0, 0.2)
        this.ySpeed = this.ySpeed + grav
        if(this.y > GAME_HEIGHT){
            this.y = randomArbitrary(-200,-100)
            this.ySpeed = mapRange(this.z, 0, 20, -4, 10)
        }
    }

    draw(context){
        context.beginPath()
        context.lineWidth = mapRange(this.z, 0, 20, 1, 3)
        context.strokeStyle = "rgb(118,43,226)"
        context.moveTo(this.x, this.y)
        context.lineTo(this.x, this.y+this.len)
        context.stroke()
    }
}

export default class Rain{
    constructor(){
        this.numberDrops = 1000
        this.drops = []
        for(let i=0;i<100;i++){
            this.drops.push(new Drop())
        }
    }

    update(){
        this.drops.forEach(d => d.update())
    }

    draw(context){
        this.drops.forEach(d => d.draw(context))
    }
}