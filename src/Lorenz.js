export default class Lorenz{
    constructor(){
        this.x = 0
        this.y = 0
        this.z = 0
        this.a = 1
        this.b = 1
        this.c = 1
    }

    update(dt){
        const dx = (this.a * (this.y - this.x)) * dt
        const dy = (this.x * (this.b - this.z) - this.y) * dt
        const dz = (this.x * y - this.c * this.z) * dt
        this.x = this.x + dx
        this.y = this.y + dy
        this.z = this.z + dz
    }

    draw(context){
        
    }
}