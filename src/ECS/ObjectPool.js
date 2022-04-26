export class ObjectPool {
    constructor(T, initialSize){
        this.freeList = []
        this.count = 0
        this.T = T
        this.isObjectPool = true

        if(typeof initialSize !== "undefined"){
            this.expand(initialSize)
        }
    }

    acquire(){
        // aumentamos la lista en un 20% si nos hemos quedado sin espacio
        if(this.freeList.length <= 0){
            this.expand(Math.round(this.count * 0.2) + 1)
        }
        let item = this.freeList.pop()
        return item
    }
    release(item) {
        item.reset()
        this.freeList.push(item)
    }
    
    expand(count) {
        for(let n = 0; n < count; n++){
            let clone = new this.T()
            clone._pool = this
            this.freeList.push(clone)
        }
        this.count += count
    }

    totalSize() {
        return this.count
    }

    totalFree() {
        return this.freeList.length
    }

    totalUsed() {
        return this.count - this.freeList.length
    }
}
