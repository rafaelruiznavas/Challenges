import { clamp, constrain, GAME_HEIGHT, GAME_WIDTH, randomArbitrary } from "./Globals.js"

export default class ReactionDiffusion{
    constructor(){
        this.pixels = []
        this.grid = []
        this.next = []
        this.dA = 1.0
        this.dB = 0.5
        this.presets = [
            { feed: 0.037, kill: 0.06},
            { feed: 0.03, kill: 0.062},
            { feed: 0.025, kill: 0.06},
            { feed: 0.078, kill: 0.061},
            { feed: 0.029, kill: 0.057},
            { feed: 0.039, kill: 0.058},
            { feed: 0.026, kill: 0.051},
            { feed: 0.034, kill: 0.056},
            { feed: 0.014, kill: 0.054},
            { feed: 0.018, kill: 0.051},
            { feed: 0.014, kill: 0.045},
            { feed: 0.062, kill: 0.06093}
        ]
        this.indexPreset = randomArbitrary(0, this.presets.length)
        this.feed = this.presets[this.indexPreset].feed
        this.k = this.presets[this.indexPreset].kill
        for(let x = 0;x<GAME_WIDTH;x++){
            this.grid[x] = []
            this.next[x] = []
            for(let y = 0;y<GAME_HEIGHT;y++){
                this.grid[x][y] = { a: 1, b: 0}
                this.next[x][y] = { a: 1, b: 0}
            }
        }

        for(let i= GAME_WIDTH/2-50;i<GAME_WIDTH/2+50;i++){
            for(let j= GAME_HEIGHT/2-50;j<GAME_HEIGHT/2+50;j++){
                this.grid[i][j].b = 1
            }
        }
    }

    changePreset(val){
        this.indexPreset = clamp(this.indexPreset + val, 0, this.presets.length)
        this.feed = this.presets[this.indexPreset].feed
        this.k = this.presets[this.indexPreset].kill
    }

    update(input, deltaTime){
        const dt = 1
        if(input.mousePressed){
            this.grid[input.clickPos.x][input.clickPos.y].b = 1
        }
        if(input.keys.includes('ArrowUp')){
            this.changePreset(-1)
        }else if(input.keys.includes('ArrowDown')){
            this.changePreset(1)
        }
        for(let x = 1;x<GAME_WIDTH-1;x++){
            for(let y = 1;y<GAME_HEIGHT-1;y++){
                const a = this.grid[x][y].a
                const b = this.grid[x][y].b
                this.next[x][y].a = a + 
                    ((this.dA * this.laplaceA(x,y)) -
                    (a * b * b) + 
                    (this.feed * (1 - a))) * dt 
                this.next[x][y].b = b +
                    ((this.dB * this.laplaceB(x,y)) +
                    (a * b * b) - 
                    ((this.k + this.feed) * b)) * dt

                this.next[x][y].a = constrain(this.next[x][y].a, 0, 1)
                this.next[x][y].b = constrain(this.next[x][y].b, 0, 1)
            }
        }        
    }

    draw(context){
        this.loadPixels(context)
        for(let x = 0;x<GAME_WIDTH;x++){
            for(let y = 0;y<GAME_HEIGHT;y++){
                const pix = (x + y * GAME_WIDTH) * 4
                const a = this.next[x][y].a
                const b = this.next[x][y].b
                const c = constrain(Math.floor((a-b)*255), 0,255)
                
                this.pixels.data[pix + 0] = c
                this.pixels.data[pix + 1] = c
                this.pixels.data[pix + 2] = c
                this.pixels.data[pix + 3] = 255
            }
        }
        this.updatePixels(context)
        this.swap()
    }

    loadPixels(context){
        this.pixels = context.getImageData(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    updatePixels(context){
        context.putImageData(this.pixels, 0, 0);
    }

    swap(){
        let temp = this.grid
        this.grid = this.next
        this.next = temp
    }

    laplaceA(x,y){
        let sumA = 0
        sumA += this.grid[x][y].a * -1
        sumA += this.grid[x-1][y].a * 0.2
        sumA += this.grid[x+1][y].a * 0.2
        sumA += this.grid[x][y-1].a * 0.2
        sumA += this.grid[x][y+1].a * 0.2
        sumA += this.grid[x-1][y-1].a * 0.05
        sumA += this.grid[x+1][y-1].a * 0.05
        sumA += this.grid[x+1][y+1].a * 0.05
        sumA += this.grid[x-1][y+1].a * 0.05
        return sumA
    }

    laplaceB(x,y){
        let sumB = 0
        sumB += this.grid[x][y].b * -1
        sumB += this.grid[x-1][y].b * 0.2
        sumB += this.grid[x+1][y].b * 0.2
        sumB += this.grid[x][y-1].b * 0.2
        sumB += this.grid[x][y+1].b * 0.2
        sumB += this.grid[x-1][y-1].b * 0.05
        sumB += this.grid[x+1][y-1].b * 0.05
        sumB += this.grid[x+1][y+1].b * 0.05
        sumB += this.grid[x-1][y+1].b * 0.05
        return sumB
    }
}