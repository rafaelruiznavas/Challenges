import { distance, GAME_HEIGHT, GAME_WIDTH, randomArbitrary } from "./Globals.js";

class Drop {
    constructor(x,y){
        this.x = x
        this.y = y
        this.r = 4
        this.toDelete = false
    }

    update(){
        this.y -= 10
        if(this.y < 0){
            this.evaporate()
        }
    }

    draw(context){
        context.beginPath()
        context.fillStyle = 'rgb(150,0,255)'
        context.arc(this.x, this.y, this.r ,0, 2 * Math.PI,false)
        context.fill()
    }

    hits(enemy){
        const d = distance(this.x, this.y, enemy.x, enemy.y)
        return d < this.r + enemy.r
    }

    evaporate(){
        this.toDelete = true
    }
}

class Flower {
    constructor(x,y){
        this.x = x
        this.y = y
        this.r = 30
        this.dirX = 1
        this.dirY = 0
    }

    update(){
        this.x += this.dirX
        this.y += this.dirY
    }

    draw(context) {
        context.beginPath()
        context.fillStyle = 'rgb(255,0,200)'
        context.arc(this.x, this.y, this.r,0, 2 * Math.PI,false)
        context.fill()
    }

    grow() {
        this.r = this.r + .5
    }

    shiftDown(){
        this.dirX *= -1
        this.y += this.r
    }
}

class Ship{
    constructor(){
        this.x = GAME_WIDTH / 2
        this.y = GAME_HEIGHT - 20
    }

    update(input, deltaTime){
        if(input.includes('ArrowRight')){
            this.move(1)
        }else if(input.includes('ArrowLeft')){
            this.move(-1)
        }
    }

    draw(context) {
        context.beginPath()
        context.fillStyle = '#fff'
        context.rect(this.x,this.y,20,20)
        context.fill()
    }

    move(dir){
        this.x += dir
    }
}

export default class Invader{
    constructor(){
        this.ship = new Ship()
        this.drops = []
        this.flowers = []
        for(let i =0;i<9;i++){
            this.flowers[i] = new Flower(i * 80+80, 60)
        }
        
    }

    update(input, deltaTime){
        if(input.includes('Space')){
            this.drops.push(new Drop(this.ship.x+10, this.ship.y))
        }
        this.drops.forEach(d => {
            d.update(deltaTime)
            this.flowers.forEach(f => {
                if(d.hits(f)){
                    f.grow()
                    d.evaporate()
                }
            })
        })
        this.drops = this.drops.filter(d=>!d.toDelete)

        this.flowers.forEach(f => f.update())
        if(this.flowers.some(f => (f.x > GAME_WIDTH || f.x < 0))) {
            this.flowers.forEach(f => f.shiftDown())
        }
        this.ship.update(input, deltaTime)
        console.log(this.drops)
    }

    draw(context){
        this.ship.draw(context)
        this.drops.forEach(d => d.draw(context))
        this.flowers.forEach(f => f.draw(context))
    }
}