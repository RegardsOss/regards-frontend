/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain, IngestDomain } from '@regardsoss/domain'
import { TableSelectionModes } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import ActionHistory from 'mdi-material-ui/History'
import { filtersActions } from '../../clients/FiltersClient'
/**
* Detail option cell for the infinite table used to display the contents of an aip
 * @author Simon MILHAU
*/
class AIPHistoryOptionContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      updateFiltersStore: (filtersValues) => dispatch(filtersActions.updateFiltersStore(filtersValues)),
    }
  }

  static propTypes = {
    entity: IngestShapes.AIPEntity,
    updateFiltersStore: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  onClick = () => {
    const { updateFiltersStore, entity } = this.props
    updateFiltersStore({
      [IngestDomain.AIP_FILTER_PARAMS.PROVIDER_IDS]: {
        [CommonDomain.REQUEST_PARAMETERS.VALUES]: [entity.content.providerId],
        [CommonDomain.REQUEST_PARAMETERS.MODE]: TableSelectionModes.INCLUDE,
      },
    })
  }

  render() {
    const { intl: { formatMessage } } = this.context

    return (
      <div>
        <IconButton
          onClick={this.onClick}
          title={formatMessage({ id: 'oais.packages.tooltip.history' })}
        >
          <ActionHistory />
        </IconButton>
      </div>
    )
  }
}
export default connect(null, AIPHistoryOptionContainer.mapDispatchToProps)(AIPHistoryOptionContainer)
