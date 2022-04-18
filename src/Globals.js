export const GAME_WIDTH = 800
export const GAME_HEIGHT = 600
export const GROUND_MARGIN = 40
export const MAX_SPEED = 3

export const randomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

export const clamp = (number, min, max) => {
    return number < min ? min : number > max ? max : number
}

export const mapRange = (number, min_in, max_in, min_out, max_out) => {
    return (number - min_in) / (max_in - min_in) * (max_out - min_out) + min_out
    //return min_out + (max_out) * ((number - min_in) / (max_in - min_in))
    //const mapped = ((number - min_in) * (max_out - min_out)) / (max_in - min_in) + min_out
    //return clamp(mapped, min_out, max_out)
}

/**
 * Limita un numero entre un valor maximo y uno minimo
 * 
 * @param {Number} n 
 * @param {Number} low 
 * @param {Number} high 
 * @returns Number
 */
export const constrain = (n, low, high) => {
    return Math.max(Math.min(n, high), low)
}

/**
 * Calcula la distancia entre dos puntos
 * 
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 */
export const distance = (x1, y1, x2, y2) => {
    //return Math.hypot(x1,y1,x2,y2)
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}