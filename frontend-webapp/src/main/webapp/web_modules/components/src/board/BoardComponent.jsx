/**
 * LICENSE_PLACEHOLDER
 **/
import { chain } from 'lodash'
import BoardItemShape from './BoardItemShape'
import BoardItemComponent from './BoardItemComponent'
import BaseBoardComponent from './BaseBoardComponent'

/**
 * Adapter to facilitate the use of the {@link BaseBoardComponent} by passing an array of parameters.
 *
 * @author Xavier-Alexandre Brochard
 */
class BoardComponent extends React.Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(BoardItemShape).isRequired,
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const boardItemComponents = chain(this.props.items)
      .filter(item => !item.advanced)
      // eslint-disable-next-line react/no-array-index-key
      .map((item, index) => <BoardItemComponent item={item} key={index} />)
      .value()

    const advancedBoardItemComponents = chain(this.props.items)
      .filter(item => item.advanced)
      // eslint-disable-next-line react/no-array-index-key
      .map((item, index) => <BoardItemComponent item={item} key={index} />)
      .value()

    return (
      <BaseBoardComponent
        boardItemComponents={boardItemComponents}
        advancedBoardItemComponents={advancedBoardItemComponents}
      />
    )
  }
}

export default BoardComponent
