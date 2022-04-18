import { GAME_HEIGHT, GAME_WIDTH } from "./Globals.js"
import { InputHandler } from "./Input.js"
import StarField from "./Starfield.js"
import MengerSponge from "./MengerSponge.js"
import SnakeGame from "./SnakeGame.js"
import Rain from "./Rain.js"


export class Game {
    constructor(width, height){
        this.width = width
        this.height = height
        this.groundMargin = 40
        this.speed = 0
        this.maxSpeed = 3
        this.input = new InputHandler()
        this.starField = new StarField('yellow')
        this.snakeGame = new SnakeGame()
        this.rain = new Rain()
    }
    update(deltaTime){
        this.starField.update(deltaTime)
        this.snakeGame.update(this.input.keys, deltaTime)        
        this.rain.update()
    }
    draw(context){
        //this.starField.draw(context)
        this.snakeGame.draw(context)
        this.rain.draw(context)
    }
}