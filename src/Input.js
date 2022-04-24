export class InputHandler {
    constructor(canvas){
        this.keys = []
        this.mousePressed = false
        this.clickPos = null
        window.addEventListener('keydown', e => {
            if((    e.code === 'ArrowDown' ||
                    e.code === 'ArrowUp' ||
                    e.code === 'ArrowRight' ||
                    e.code === 'ArrowLeft' ||
                    e.code === 'Enter' || 
                    e.code === 'Space' 
               ) && this.keys.indexOf(e.code) === -1){
                this.keys.push(e.code)
            }            
        })

        window.addEventListener('keyup', e => {
            if(    e.code === 'ArrowDown' ||
                    e.code === 'ArrowUp' ||
                    e.code === 'ArrowRight' ||
                    e.code === 'ArrowLeft' ||
                    e.code === 'Enter' ||
                    e.code === 'Space' 
               ){
                this.keys.splice(this.keys.indexOf(e.code), 1)
            }            
        })

        canvas.addEventListener("mousedown", e => {
            this.mousePressed = true
            this.clickPos = {x: e.offsetX, y: e.offsetY}
        })
        window.addEventListener("mouseup", e => {
            this.mousePressed = false
            this.clickPos = {x: e.offsetX, y: e.offsetY}
        })
    }
}