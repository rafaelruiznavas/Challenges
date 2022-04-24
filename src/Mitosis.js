import { distance, GAME_HEIGHT, GAME_WIDTH, random2D, randomArbitrary } from "./Globals.js"

class Cell{

    constructor(pos, radius, color){
        this.pos = pos ? {x: pos.x, y: pos.y} :    {x: randomArbitrary(0,GAME_WIDTH), y: randomArbitrary(0,GAME_HEIGHT)}
        this.r = radius || 20
        this.c = color || `rgba(${randomArbitrary(0,255)},0,${randomArbitrary(0,255)},0.3 )`
    }

    update(){
        const vel = random2D()
        this.pos.x += vel.x
        this.pos.y += vel.y
    }

    draw(context){
        context.beginPath()
        context.fillStyle = this.c
        context.arc(this.pos.x, this.pos.y, this.r ,0, 2 * Math.PI,false)
        context.fill()
    }

    clicked({x,y}){
        const d = distance(this.pos.x, this.pos.y, x, y)
        return d < this.r        
    }

    mitosis(){
        this.pos.x += randomArbitrary(-this.r,this.r)
        return new Cell(this.pos, this.r, this.c)
    }
    
}
export default class Mitosis{
    constructor(){
        this.cells = []
        this.cells.push(new Cell())
        this.cells.push(new Cell())
    }

    update(input){
        console.log('Cells', this.cells.length)
        for(let i= this.cells.length-1;i>=0;i--) {
            const c = this.cells[i]
            c.update();
            if(input.mousePressed && c.clicked(input.clickPos)){
                this.cells.push(c.mitosis())
                this.cells.push(c.mitosis())
                this.cells.splice(i,1)
                break;
            }
        }
    }

    draw(context){
        this.cells.forEach(c => c.draw(context))
    }
}