import { rotate } from "./Globals.js"

export default class Branch{
    constructor(start, end){
        this.start = start
        this.end = end
        this.finished = false
    }

    draw(context){
        context.beginPath()
        context.moveTo(this.start.x,this.start.y)
        context.lineTo(this.end.x, this.end.y)
        context.stroke()
    }

    growBranch(ang){
        this.finished = true
        const dir = rotate({
            x: (this.end.x - this.start.x) * 0.67,
            y: (this.end.y - this.start.y) * 0.67
        }, ang)
        const newEnd = {
            x: this.end.x + dir.x,
            y: this.end.y + dir.y
        }

        const b = new Branch(this.end, newEnd)
        return b
    }
}