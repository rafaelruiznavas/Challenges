import { constrain, distance, GAME_HEIGHT, GAME_WIDTH, randomArbitrary } from "./Globals.js"

class Food {
    constructor(scl,color){
        this.scl = scl
        this.color = color
        this.pickLocation()
    }

    update(){

    }

    draw(context){
        context.beginPath()
        context.fillStyle = this.color
        context.rect(this.x,this.y,this.scl,this.scl)
        context.fill()
    }
    
    pickLocation() {
        var cols = Math.floor(GAME_WIDTH/this.scl)
        var rows = Math.floor(GAME_HEIGHT/this.scl)
        this.x = randomArbitrary(0, cols) * this.scl
        this.y = randomArbitrary(0, rows) * this.scl
    }
}

class Snake {
    constructor(scl=20){
        this.x = 0
        this.y = 0
        this.xSpeed = 1
        this.ySpeed = 0
        this.scl = scl
        this.fps = 20
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.total = 0
        this.tail = []
    }

    update(deltatime) {
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0

            if(this.total === this.tail.length){
                for(let i=0;i<this.tail.length-1;i++){
                    this.tail[i] = this.tail[i+1]
                }
            }
            this.tail[this.total-1] = {x: this.x, y: this.y}

            this.x = this.x + this.xSpeed * this.scl
            this.y = this.y + this.ySpeed * this.scl

            this.x = constrain(this.x, 0, GAME_WIDTH - this.scl)
            this.y = constrain(this.y, 0, GAME_HEIGHT - this.scl)
        }else{
            this.frameTimer += deltatime
        }
    }

    draw(context){

        context.beginPath()
        context.fillStyle = '#cccccc'
        context.strokeStyle = '#000'


        this.tail.forEach(b => {
            context.rect(b.x,b.y,this.scl,this.scl)
        })

        
        context.rect(this.x,this.y,this.scl,this.scl)
        context.fill()
        context.stroke()

    }

    dir(x,y){
        this.xSpeed = x
        this.ySpeed = y
    }

    eat(pos){
        const d = distance(this.x,this.y,pos.x,pos.y)
        if(d < 1){
            this.total++
            return true
        }
        return false
    }

    death() {
        this.tail.forEach(t => {
            const pos = t
            const d = distance(this.x, this.y, pos.x,pos.y)
            if(d < 1){
                this.total = 0
                this.tail = []
            }
        })
    }
}

export default class SnakeGame {
    constructor(){
        this.scl = 20
        this.snake = new Snake(this.scl)
        this.food = new Food(this.scl, '#ff0064')
    }

    update(input, deltatime){
        if(input.includes('ArrowUp')){
            this.snake.dir(0,-1)
        }else if(input.includes('ArrowDown')){
            this.snake.dir(0,1)
        }else if(input.includes('ArrowRight')){
            this.snake.dir(1,0)
        }else if(input.includes('ArrowLeft')){
            this.snake.dir(-1,0)
        }

        if(this.snake.eat(this.food)){
            console.log('comida')
            this.food.pickLocation()
        }
 
        this.snake.death()
        this.snake.update(deltatime)
    }

    draw(context){
        this.snake.draw(context)
        this.food.draw(context) 
    }
}