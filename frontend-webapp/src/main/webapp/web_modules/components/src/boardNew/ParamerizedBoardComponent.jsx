/**
 * LICENSE_PLACEHOLDER
 **/
import { chain } from 'lodash'
import BoardItemShape from './BoardItemShape'
import ParameterizedBoardItemComponent from './ParameterizedBoardItemComponent'
import BoardComponent from './BoardComponent'

/**
 * Adapter to facilitate the use of the {@link BoardComponent} by passing an array of parameters.
 * 
 * @author Xavier-Alexandre Brochard
 */
class ParameterizedBoardComponent extends React.Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(BoardItemShape).isRequired,
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const boardItemComponents = chain(this.props.items)
      .filter(item => !item.advanced)
      .map((item, index) => <ParameterizedBoardItemComponent item={item} key={index} />)
      .value()

    const advancedBoardItemComponents = chain(this.props.items)
      .filter(item => item.advanced)
      .map((item, index) => <ParameterizedBoardItemComponent item={item} key={index} />)
      .value()

    return (
      <BoardComponent
        boardItemComponents={boardItemComponents}
        advancedBoardItemComponents={advancedBoardItemComponents} />
    )
  }
}

export default ParameterizedBoardComponent
