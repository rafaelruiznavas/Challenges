import { GAME_HEIGHT, GAME_WIDTH } from "./Globals.js"
import { InputHandler } from "./Input.js"
import StarField from "./Starfield.js"
import MengerSponge from "./MengerSponge.js"
import SnakeGame from "./SnakeGame.js"
import Rain from "./Rain.js"
import Invader from "./Invader.js"
import Mitosis from "./Mitosis.js"
import SolarSystem from "./SolarSystem.js"
import { Maze } from "./Maze.js"


export class Game {
    constructor(canvas){
        this.context = canvas.getContext("2d")
        canvas.width = GAME_WIDTH
        canvas.height= GAME_HEIGHT

        this.groundMargin = 40
        this.speed = 0
        this.maxSpeed = 3
        this.input = new InputHandler(canvas)
        
        this.starField = new StarField('yellow')
        this.snakeGame = new SnakeGame()
        this.rain = new Rain()
        this.invader = new Invader()
        this.mitosis = new Mitosis()
        this.solarSystem = new SolarSystem()
        this.maze = new Maze(GAME_WIDTH/160)
    }
    update(deltaTime){
        this.starField.update(deltaTime)
        //this.snakeGame.update(this.input.keys, deltaTime)        
        //this.rain.update()
        //this.invader.update(this.input.keys, deltaTime)
        //this.mitosis.update(this.input)
        //this.solarSystem.update()
        this.maze.update()
    }
    draw(context){
        this.starField.draw(context)
        //this.snakeGame.draw(context)
        //this.rain.draw(context)
        //this.invader.draw(context)
        //this.mitosis.draw(context)
        //this.solarSystem.draw(context)
        this.maze.draw(context)
    }
}