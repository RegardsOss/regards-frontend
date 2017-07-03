/**
 * LICENSE_PLACEHOLDER
 **/
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
import fpflatten from 'lodash/fp/flatten'
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
      fpmap(item => <BoardItemComponent item={item} key={item.title} />),
    )(this.props.items)

    const advancedBoardItemComponents = flow(
      fpfilter(item => item.advanced),
      fpmap(item => <BoardItemComponent item={item} key={item.title} />),
    )(this.props.items)

    const advancedBoardDependencies = flow(
      fpfilter(item => item.advanced),
      fpmap(item => item.actions),
      fpflatten,
      fpmap(item => item.hateoasDependencies),
      fpflatten,
    )(this.props.items)

    return (
      <BaseBoardComponent
        boardItemComponents={boardItemComponents}
        advancedBoardItemComponents={advancedBoardItemComponents}
        advancedBoardDependencies={advancedBoardDependencies}
      />
    )
  }
}

export default BoardComponent
