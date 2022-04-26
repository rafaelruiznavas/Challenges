import { ObjectPool } from 'ObjectPool.js'

export class ComponentManager {
    constructor(){
        this.components = []
        this._componentsMap = {}

        this._componentPool = {}
        this.numComponents = {}
        this.nextComponentId = 0
    }

    hasComponent(component){
        return this.components.indexOf(component) !== -1
    }

    registerComponent(component, objectPool) {
        if(this.hasComponent(component)){
            console.warn(`Component type '${component.getName()}' ya está registrado`)
            return
        }
        
        const schema = component.schema
        if(!schema) {
            throw new Error(`Component "${component.getName()}" no tiene propiedad schema`)
        }

        for(const propName in schema){
            const prop = schema[propName]
            if(!prop.type){
                throw new Error(`Schema invalido para el componente "${component.getName()}". Falta tipo para la propiedad "${propName}"`)
            }
        }
        component._typeId = this.nextComponentId++
        this.components.push(component)
        this._componentsMap[component._typeId] = component
        this.numComponents[component._typeId] = 0

        if(objectPool === undefined){
            objectPool = new ObjectPool(component)
        }else if(objectPool === false){
            objectPool = undefined
        }

        this._componentPool[ComponentManager._typeId] = objectPool
    }

    componentAddedToEntity(component){
        this.numComponents[component._typeId]++
    }

    componentRemovedFromEntity(Component) {
        this.numComponents[component._typeId]--
    }

    getComponentsPool(component) {
        return this._componentPool[component._typeId]
    }
}
