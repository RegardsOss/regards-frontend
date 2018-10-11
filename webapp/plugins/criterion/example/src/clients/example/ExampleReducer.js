/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import ExampleActions from './ExampleActions'

/**
 * Some example reducer class: it uses actions information to compute its own next state in redux store (its works only on its subpart)
 * @author Raphaël Mechali
 */
class ExampleReducer {
  static DEFAULT_STATE = {
    todo: null, // initial state: nothing to do yet
  }

  /**
   * Constructor
   * @param {string} namespace related actions namespace (to handle only those ones)
   */
  constructor(namespace) {
    this.actions = new ExampleActions(namespace)
  }

  /**
   * Main reduction method: handle action and compute next state or ignore it and keep state unchanged
   * Note: This is a pure function, ie its result must never modify the incoming state parameter to build the new one
   * Note 2: when nothing changes, it is better to return state parameter value (otherwise, react component may redraw due
   * to references change)
   * @param {*} state this reducer previous state (if it was initialized)
   * @param {*} action action to handle or ignore
   * @return {*} next state
   */
  reduce(state = ExampleReducer.DEFAULT_STATE, action) { // Note: state = ... allows here to make sure state will always have a value
    switch (action.type) {
      case this.actions.DO_SOMETHING: // we should handle that action as it matches reducer namespace
      // we may add here more actions to handler....
        return {
          todo: action.todo, // this parameter is granted by ExampleActions, for the constant type DO_SOMETHING
        }
      default: // ignore those actions
        return state
    }
  }
}

// Redux sytem expects to receiver a function like (state, action) => nextState
// Therefore we export a closure here

/**
 * Builds the reduce function to be registered in redux
 * @param {string} namespace actions/reducer namespace
 * @return {Function} reduce closure function
 */
export default function getExampleReducer(namespace) {
  const reducer = new ExampleReducer(namespace)
  return (state, action) => reducer.reduce(state, action)
}
