/**
 * LICENSE_PLACEHOLDER
 **/
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
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
    items: PropTypes.arrayOf(BoardItemShape).isRequired,
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const boardItemComponents = flow(
      fpfilter(item => !item.advanced),
      // eslint-disable-next-line react/no-array-index-key
      fpmap.convert({ cap: false })((item, index) => <BoardItemComponent item={item} key={index} />),
    )(this.props.items)

    const advancedBoardItemComponents = flow(
      fpfilter(item => item.advanced),
      // eslint-disable-next-line react/no-array-index-key
      fpmap.convert({ cap: false })((item, index) => <BoardItemComponent item={item} key={index} />),
    )(this.props.items)

    return (
      <BaseBoardComponent
        boardItemComponents={boardItemComponents}
        advancedBoardItemComponents={advancedBoardItemComponents}
      />
    )
  }
}

export default BoardComponent
