import { GAME_HEIGHT, GAME_WIDTH, mapRange, randomArbitrary } from "./Globals.js"

class Star {
    constructor(color) {
        this.x = randomArbitrary(-GAME_WIDTH/2, GAME_WIDTH/2)
        this.y = randomArbitrary(-GAME_HEIGHT/2, GAME_HEIGHT/2)
        this.z = randomArbitrary(0,GAME_WIDTH/2)
        this.pz = this.z
        this.color = color
    }

    update(deltaTime){
        this.z= this.z - 10;
        if(this.z < 1){
            this.z = GAME_WIDTH/2
            this.x = randomArbitrary(-GAME_WIDTH/2, GAME_WIDTH/2)
            this.y = randomArbitrary(-GAME_HEIGHT/2, GAME_HEIGHT/2)    
            this.pz = this.z
        }
    }

    draw(context){
        const sx = mapRange(this.x/this.z, 0, 1, 0, GAME_WIDTH)
        const sy = mapRange(this.y/this.z, 0, 1, 0, GAME_HEIGHT)
        const r = Math.floor(mapRange(this.z, 0,GAME_WIDTH/2, 8, 0))
        const px = mapRange(this.x/this.pz, 0, 1, 0, GAME_WIDTH)
        const py = mapRange(this.y/this.pz, 0, 1, 0, GAME_HEIGHT)

        context.beginPath()
        context.arc(sx, sy, r,0, 2 * Math.PI,false)
        context.fillStyle = this.color
        context.strokeStyle = this.color
        context.fill()
        context.moveTo(px, py)
        context.lineTo(sx, sy)
        context.stroke()

        
    }
}

export default class StarField {
    constructor(color='white') {
        this.stars = []
        for(let i=0;i < 400;i++){
            this.stars.push(new Star(color))
        }
    }
    update(deltaTime){
        this.stars.forEach(star => {
            star.update(deltaTime)
        });
    }

    draw(context){
        context.save()
        context.translate(GAME_WIDTH/2, GAME_HEIGHT/2)
        this.stars.forEach(star => {
            star.draw(context)
        });
        context.restore()
    }
}