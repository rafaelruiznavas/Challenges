export default class MengerSponge {
    constructor(x,y,size, color='white') {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
    }

    update(deltaTime){
    }

    draw(context){
        context.save()

        context.fillStyle = this.color
        context.rect(this.x,this.y,this.size,this.size)
        context.fill()

        context.restore()

    }
}