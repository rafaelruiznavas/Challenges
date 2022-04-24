import { GAME_WIDTH, GAME_HEIGHT, randomArbitrary } from "./Globals.js"

class Cell{
    constructor(i,j,w){
        this.i = i
        this.j = j
        this.w = w
        this.walls = [true,true,true,true]
        this.visited = false
    }

    draw(context){
        const x = this.i * this.w
        const y = this.j * this.w

        context.beginPath()
        if(this.walls[0]){
            context.moveTo(x,y)
            context.lineTo(x+this.w, y)
        }
        if(this.walls[1]){
            context.moveTo(x+this.w, y)
            context.lineTo(x+this.w, y+this.w)
        }
        if(this.walls[2]){
            context.moveTo(x+this.w, y+this.w)
            context.lineTo(x,        y + this.w)
        }
        if(this.walls[3]){
            context.moveTo(x,        y + this.w)
            context.lineTo(x,        y)
        }

        context.fillStyle = '#cc00cccc'
        context.strokeStyle = "white"
        context.stroke()
        if(this.visited){
            
            context.rect(x,y,this.w,this.w)
            context.fill()
        }        
    }

    highlight(context) {
        const x = this.i * this.w
        const y = this.j * this.w
        context.beginPath()
        context.fillStyle = '#00cc00cc'
        context.rect(x,y,this.w,this.w)
        context.fill()
    }
}

export class Maze{
    constructor(w){
        this.w = w
        this.cols = Math.floor(GAME_WIDTH/this.w)
        this.rows = Math.floor(GAME_HEIGHT/this.w)
        this.grid = []
        this.stack = []

        for(let j=0;j<this.rows;j++){
            for(let i =0;i<this.cols;i++){
                let cell = new Cell(i,j,w)
                this.grid.push(cell)
            }
        }
        this.current = this.grid[0]
    }

    update(){
        this.current.visited = true
        let next = this.checkNeighbors(this.current)
        if(next){
            // STEP 1
            next.visited = true
            // STEP 2
            this.stack.push(this.current)
            // STEP 3
            this.removeWalls(this.current, next)

            // STEP 4
            this.current = next
        }else if(this.stack.length > 0){
            this.current = this.stack.pop()
        }
    }

    draw(context){
        this.grid.forEach(c => c.draw(context))
        this.current.highlight(context)
    }

    index(i,j){
        if(i< 0 || j< 0 || i > this.cols-1 || j > this.rows-1)
            return -1
        return i + j * this.cols
    }

    checkNeighbors(cell){
        let neighbors = []
        let top    = this.grid[this.index(cell.i, cell.j-1)]
        let right  = this.grid[this.index(cell.i+1, cell.j)]
        let bottom = this.grid[this.index(cell.i, cell.j+1)]
        let left   = this.grid[this.index(cell.i-1, cell.j)]

        if(top && !top.visited){
            neighbors.push(top)
        }
        if(right && !right.visited){
            neighbors.push(right)
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom)
        }
        if(left && !left.visited){
            neighbors.push(left)
        }

        if(neighbors.length > 0){
            let r = randomArbitrary(0, neighbors.length)
            return neighbors[r]
        }
        return undefined
    }

    removeWalls(a,b){
        let x = a.i - b.i
        if(x === 1){
            a.walls[3] = false
            b.walls[1] = false
        }else if(x === -1){
            a.walls[1] = false
            b.walls[3] = false
        }

        let y = a.j - b.j
        if(y === 1){
            a.walls[0] = false
            b.walls[2] = false
        }else if(y === -1){
            a.walls[2] = false
            b.walls[0] = false
        }
    }
}