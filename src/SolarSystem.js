import { GAME_WIDTH, GAME_HEIGHT, randomArbitrary, random } from "./Globals.js"

class Planet{
    constructor(radius, distance, orbitSpeed = random(0.05,0.1)){
        this.radius = radius
        this.theta = Math.random() * Math.PI * 2
        this.distance = distance
        this.planets = []
        this.orbitSpeed = orbitSpeed
    }

    update(){
        this.theta += this.orbitSpeed
        this.planets.forEach(p => p.update())
    }

    draw(context){
        context.save()
        context.rotate(this.theta)
        context.translate(this.distance, 0)
        context.beginPath()
        context.fillStyle = '#fffc'
        context.arc(0, 0, this.radius ,0, 2 * Math.PI,false)
        context.fill()
        context.restore()
        this.planets.forEach(p => p.draw(context))
    }

    spawnMoons(total, level){
        for(let i=0;i<total;i++){
            let r = this.radius/(level*1.2)
            let d = randomArbitrary(50,150)
            let o = random(-0.1, 0.1)
            this.planets.push(new Planet(r,d/level, o))
            if(level < 4){
                let num = randomArbitrary(0,4)
                this.planets[i].spawnMoons(num, level+1)
            }                
        }
    }
}

export default class SolarSystem{
    constructor(){
        this.sun = new Planet(50, 0, 0)
        this.sun.spawnMoons(2, 1)
    }

    update(input, deltaTime){
        this.sun.update()
    }

    draw(context){
        context.save()
        context.translate(GAME_WIDTH/2, GAME_HEIGHT/2)
        this.sun.draw(context)
        context.restore()
    }
}