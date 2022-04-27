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
import Lorenz from "./Lorenz.js"
import ReactionDiffusion from "./ReactionDiffusion.js"
import FractalTrees from "./FractalTrees.js"


export class Game {
    constructor(canvas){
        this.context = canvas.getContext("2d")
        this.mapChallenges = new Map()
        canvas.width = GAME_WIDTH
        canvas.height= GAME_HEIGHT
        this.width = canvas.width
        this.height= canvas.height

        this.groundMargin = 40
        this.speed = 0
        this.maxSpeed = 3
        this.input = new InputHandler(canvas)
        
        this.mapChallenges.set('starField', new StarField('white'))
        this.mapChallenges.set('snakeGame', new SnakeGame())
        this.mapChallenges.set('rain', new Rain())
        this.mapChallenges.set('invader', new Invader())
        this.mapChallenges.set('mitosis', new Mitosis())
        this.mapChallenges.set('solarSystem', new SolarSystem())
        this.mapChallenges.set('maze', new Maze(40))
        this.mapChallenges.set('lorenz', new Lorenz())
        this.mapChallenges.set('reactiondiffusion', new ReactionDiffusion())
        this.mapChallenges.set('fractaltrees', new FractalTrees())

        this.selected = 'reactiondiffusion'
    }
    update(deltaTime){
        this.mapChallenges.get(this.selected).update(this.input, deltaTime)
    }
    draw(context){
        if(this.selected !== 'lorenz')
            context.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT)
        this.mapChallenges.get(this.selected).draw(context)
    }
}