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
import IconButton from 'material-ui/IconButton'
import ExpandIcon from 'mdi-material-ui/ChevronDown'
import CollapseIcon from 'mdi-material-ui/ChevronUp'
import { themeContextType } from '@regardsoss/theme'
import TreeTableRow from './TreeTableRow'

/**
* Component to expand / collapse a tree table row
* @author Raphaël Mechali
*/
class ExpandCollapseComponent extends React.Component {
  static propTypes = {
    // row model
    rowModel: PropTypes.instanceOf(TreeTableRow).isRequired,
    // toggles expanded / collapsed callback state: (row: TreeTableRow) => ()
    onToggleExpanded: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Callback: on toggle expanded
   */
  onToggleExpanded = () => {
    const { rowModel, onToggleExpanded } = this.props
    onToggleExpanded(rowModel)
  }

  render() {
    const { rowModel } = this.props
    const { moduleTheme: { expandButton, expandIcon } } = this.context
    return (
      <IconButton
        style={expandButton.style}
        iconStyle={expandIcon.style}
        onClick={this.onToggleExpanded}
      >
        {
          rowModel.expanded ? <CollapseIcon /> : <ExpandIcon />
        }
      </IconButton>
    )
  }
}

export default ExpandCollapseComponent
