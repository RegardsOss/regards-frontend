/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import Chip from 'material-ui/Chip'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { MeasureResultProvider } from '@regardsoss/display-control'
import { ScrollArea } from '@regardsoss/adapters'
import GroupTitleComponent from './GroupTitleComponent'
import { SearchCriteriaGroupRuntime } from '../../../../../shapes/search/SearchCriteriaGroupRuntime'
import CriterionWrapperContainer from '../../../../../containers/user/tabs/results/search/CriterionWrapperContainer'

/**
 * Displays criteria list, applying external style then showing each group and criterion in a wrapper that adapts parent callback
 * to simplified criteria API
 * @author Raphaël Mechali
 */
class CriteriaListComponent extends React.Component {
  static propTypes = {
    groups: PropTypes.arrayOf(SearchCriteriaGroupRuntime).isRequired,
    rootContextCriteria: PropTypes.arrayOf(UIShapes.BasicCriterion).isRequired,
    onUpdatePluginState: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedSearchHistory: PropTypes.object,
    onRemoveSelectedSearchHistory: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Render a chip when a search history element is selected.
   * Enable to reset to initial form   */
  renderSelectedSearchHistory = () => {
    const { selectedSearchHistory, onRemoveSelectedSearchHistory } = this.props
    const { moduleTheme: { user: { searchPane: { chipDivStyle, chipLabelColor, chipLabelStyle } } } } = this.context
    return !isEmpty(selectedSearchHistory.name)
      ? (
        <div style={chipDivStyle}>
          <Chip onRequestDelete={onRemoveSelectedSearchHistory} labelColor={chipLabelColor} labelStyle={chipLabelStyle}>
            { selectedSearchHistory.name }
          </Chip>
        </div>)
      : null
  }

  render() {
    const {
      groups, rootContextCriteria, onUpdatePluginState,
    } = this.props
    const { moduleTheme: { user: { searchPane: { criteria } } } } = this.context
    return (
      // Use measure results provider to compute scrollable content area style (width and height)
      <MeasureResultProvider style={criteria.container} targetPropertyName="style">
        {/* show criteria list in scrollable area */}
        <ScrollArea contentStyle={criteria.scrollableContent} vertical>
          {this.renderSelectedSearchHistory()}
          {/* show groups title and criteria in plugins render table (used as a layout) */}
          <table style={criteria.table}>
            <tbody>
              { /** Render each group title and criterion */
              groups.reduce((acc, group, groupIndex) => [
                ...acc,
                // Nota: using index as keys here is safe as list comes from configuration and is thus
                // immutable at runtime
                // eslint-disable-next-line react/no-array-index-key
                <GroupTitleComponent key={`group.title.${groupIndex}`} group={group} />,
                group.criteria.map((criterion, criterionIndex) => <CriterionWrapperContainer
                  key={criterion.pluginInstanceId}
                  groupIndex={groupIndex}
                  criterionIndex={criterionIndex}
                  criterion={criterion}
                  groups={groups}
                  rootContextCriteria={rootContextCriteria}
                  onUpdatePluginState={onUpdatePluginState}
                />),
              ], [])
            }
            </tbody>
          </table>
        </ScrollArea>
      </MeasureResultProvider>)
  }
}
export default CriteriaListComponent
