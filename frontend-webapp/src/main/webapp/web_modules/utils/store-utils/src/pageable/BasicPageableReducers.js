/**
 * @author Léo Mieulet
 */
import BasicListReducers from '../list/BasicListReducers'

/**
 *  Handle reduction for pageable entity lists
 */
class BasicPageableReducer extends BasicListReducers {

  constructor(options, basicListActionInstance) {
    super(options, basicListActionInstance)
  }

}

export default BasicPageableReducer
