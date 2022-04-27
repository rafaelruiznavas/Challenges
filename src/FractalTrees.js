import { clamp, GAME_HEIGHT, GAME_WIDTH, random } from "./Globals.js"

export default class FractalTrees{
    constructor(){
        this.angle = random(0,Math.PI)
    }

    update(input, deltaTime){
        if(input.mousePressed){
            this.angle += 0.1
        }            
    }

    draw(context){
        context.save()
        context.strokeStyle = '#fff'
        context.translate(GAME_WIDTH/2, GAME_HEIGHT/1.5)
        this.branch(context,100)
        context.restore()
    }

    branch(context,len){
        context.beginPath()
        context.moveTo(0,0)
        context.lineTo(0, -len)
        context.stroke()

        if(len > 4){
            context.save()
            context.translate(0, -len)
            context.save()
            context.rotate(this.angle)
            this.branch(context, len * 0.67)
            context.restore()

            context.save()
            context.rotate(-this.angle)
            this.branch(context, len * 0.67)
            context.restore()
            context.restore()
        }
    }
}