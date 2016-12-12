/**
 * @author Léo Mieulet
 */
import BasicListReducers from '../list/BasicListReducers'

/**
 *  Handle reduction for paegable entity lists
 */
class BasicPaegableReducer extends BasicListReducers {

  constructor(options, basicListActionInstance) {
    super(options, basicListActionInstance)
  }

}

export default BasicPaegableReducer
