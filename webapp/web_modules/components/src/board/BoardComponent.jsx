/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
    items: PropTypes.arrayOf(BoardItemShape),
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const boardItemComponents = flow(
      fpfilter((item) => !item.advanced),
      fpmap((item) => <BoardItemComponent item={item} key={item.title} />),
    )(this.props.items)

    const advancedBoardItemComponents = flow(
      fpfilter((item) => item.advanced),
      fpmap((item) => <BoardItemComponent item={item} key={item.title} />),
    )(this.props.items)

    const advancedBoardDependencies = flow(
      fpfilter((item) => item.advanced),
      fpmap((item) => item.actions),
      fpflatten,
      fpmap((item) => item.hateoasDependencies),
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
