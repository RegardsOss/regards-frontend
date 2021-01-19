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
import Toggle from 'material-ui/Toggle'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'

/**
* Toggles dataset details visible / hidden
* @author Raphaël Mechali
*/
class ToggleDatasetDetails extends React.Component {
  static propTypes = {
    datasetAttributesVisible: PropTypes.bool.isRequired, // are dataset attributes currently visible
    areDatasetAttributesAvailable: PropTypes.bool.isRequired, // are dataset attributes available
    onSetDatasetAttributesVisible: PropTypes.func.isRequired, // (bool) => void
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  toggleDatasetAttributesVisible = (evt, isChecked) => {
    const { onSetDatasetAttributesVisible } = this.props
    onSetDatasetAttributesVisible(isChecked)
  }

  render() {
    const { datasetAttributesVisible, areDatasetAttributesAvailable } = this.props
    const { moduleTheme: { user: { toggle } } } = this.context
    return (
      <ShowableAtRender show={areDatasetAttributesAvailable}>
        <Toggle
          toggled={datasetAttributesVisible}
          style={toggle}
          label={this.context.intl.formatMessage({ id: 'search.graph.show.details' })}
          onToggle={this.toggleDatasetAttributesVisible}
        />
      </ShowableAtRender>

    )
  }
}
export default ToggleDatasetDetails
