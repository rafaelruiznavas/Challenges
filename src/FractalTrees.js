import Branch from "./Branch.js"
import { GAME_HEIGHT, GAME_WIDTH, random, random2D } from "./Globals.js"

export default class FractalTrees{
    constructor(){
        this.angle = random(0,Math.PI)
        let a = { x: GAME_WIDTH/2, y: GAME_HEIGHT/1.1}
        let b = { x: GAME_WIDTH/2, y: (GAME_HEIGHT/1.1)-200}
        this.tree = []
        const root = new Branch(a,b)
        this.tree[0] = root
        this.leaves = []
        this.numBranch = 0
        this.fps = 1
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }

    update(input, deltaTime){
        // if(input.mousePressed){
        //     this.growTree()
        // }

        this.leaves.forEach(l => {
            if(l.y < GAME_HEIGHT){
                l.x += random2D().x
                l.y += 1
            }                
        })

        if(this.frameTimer > this.frameInterval){
            console.log('FRAME')
            this.frameTimer = 0
            this.growTree()
        }else{
            this.frameTimer += deltaTime
        }      

    }

    growTree(){
        if(this.numBranch > 6) return;

        for(let i=this.tree.length-1;i>=0;i--){
            if(!this.tree[i].finished){
                this.tree.push(this.tree[i].growBranch(Math.PI/4))
                this.tree.push(this.tree[i].growBranch(-Math.PI/4))
                this.tree[i].finished = true
            }
        }
        if(this.numBranch === 6){
            this.tree.filter(b => !b.finished)
            .forEach(b => {
                const leaf = {...b.end}
                this.leaves.push(leaf)
            })
        }
        this.numBranch++;
        console.log(this.numBranch)
    }

    draw(context){
        context.strokeStyle = '#fff'
        
        this.tree.forEach(b => b.draw(context))

        this.leaves.forEach(l => {
            context.beginPath()
            context.fillStyle = '#ff0000cc'
            context.arc(l.x, l.y, 5 ,0, 2 * Math.PI,false)
            context.fill()
        })
    }
}