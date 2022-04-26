export default class QueryManager {
    constructor(world){
        this._world = world

        // Busquedas indexadas por un unico identificador para los componentes que tenga
        this._queries = {}
    }

    onEntityRemoved(entity) {
        for(let queryName in this._queries){
            let query = this._queries[queryName]
            if(entity.queries.indexOf(query) !== -1){
                query.removeEntity(entity)
            }
        }
    }

    /**
     * Callback para cuando un componente se agrega a una entidad
     * @param {*} entity La entidad que va a tener el nuevo componente
     * @param {*} component Componente a agregar a la entidad
     */
    onEntityComponentAdded(entity, component){
        // @todo usar bitmask para comprobar componetnes
        // Comprobar cada busqueda indexada para ver si necesitamos agregar esta entidad a la lista
        for(var queryName in this._queries){
            var query = this._queries[queryName]

            if(!!~query.notComponents.indexOf(component) && ~query.entities.indexOf(entity)){
                query.removeEntity(entity)
                continue
            }
            
            // Agregamos la entidad solamente si:
            // El componente esta en la busqueda
            // y la entidad  tiene todos los componentes de la busqueda
            // y la entidad no está aun en la busqueda
            if(!~query.components.indexOf(component) || !query.match(entity) || ~query.entities.indexOf(entity)) continue;
            query.addEntity(entity)
        }
    }

    /**
     * Callback para cuando un componente se borra de una entidad
     * @param {*} entity 
     * @param {*} component 
     */
    onEntityComponentRemoved(entity, component) {

    }
}

/*
 export default class QueryManager {
    onEntityComponentAdded(entity, Component) {  
      for (var queryName in this._queries) {
        var query = this._queries[queryName];  
        if (!!~query.NotComponents.indexOf(Component) && ~query.entities.indexOf(entity)) {query.removeEntity(entity);          continue;        }  
        if (          !~query.Components.indexOf(Component) ||           !query.match(entity) ||           ~query.entities.indexOf(entity)        )          continue;  
        query.addEntity(entity);
      }
    }
  
    /**
     * Callback when a component is removed from an entity
     * @param {Entity} entity Entity to remove the component from
     * @param {Component} Component Component to remove from the entity
     */
    onEntityComponentRemoved(entity, Component) {
      for (var queryName in this._queries) {
        var query = this._queries[queryName];
  
        if (
          !!~query.NotComponents.indexOf(Component) &&
          !~query.entities.indexOf(entity) &&
          query.match(entity)
        ) {
          query.addEntity(entity);
          continue;
        }
  
        if (
          !!~query.Components.indexOf(Component) &&
          !!~query.entities.indexOf(entity) &&
          !query.match(entity)
        ) {
          query.removeEntity(entity);
          continue;
        }
      }
    }
  
    /**
     * Get a query for the specified components
     * @param {Component} Components Components that the query should have
     */
    getQuery(Components) {
      var key = queryKey(Components);
      var query = this._queries[key];
      if (!query) {
        this._queries[key] = query = new Query(Components, this._world);
      }
      return query;
    }
  
    /**
     * Return some stats from this class
     */
    stats() {
      var stats = {};
      for (var queryName in this._queries) {
        stats[queryName] = this._queries[queryName].stats();
      }
      return stats;
    }
  }

*/