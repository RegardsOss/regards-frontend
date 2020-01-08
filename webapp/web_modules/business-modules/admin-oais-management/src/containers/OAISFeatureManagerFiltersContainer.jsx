/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import OAISCriterionShape from '../shapes/OAISCriterionShape'
import OAISFeatureManagerFiltersComponent from '../components/OAISFeatureManagerFiltersComponent'

/**
 * OAIS Feature manager filters container.
 * @author Simon MILHAU
 */
export class OAISFeatureManagerFiltersContainer extends React.Component {
  static propTypes = {
    updateStateFromFeatureManagerFilters: PropTypes.func.isRequired,
    featureManagerFilters: OAISCriterionShape,
  }

  changeSessionFilter = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      session: finalNewValue,
    })
  }

  changeSourceFilter = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      sessionOwner: finalNewValue,
    })
  }

  changeProviderIdFilter = (event, text) => {
    const finalNewValue = text
    this.props.updateStateFromFeatureManagerFilters({
      providerId: finalNewValue,
    })
  }

  changeFrom = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      lastUpdate: {
        from: finalNewValue,
      },
    })
  }

  changeTo = (newValue) => {
    const finalNewValue = newValue && newValue !== '' ? newValue : undefined
    this.props.updateStateFromFeatureManagerFilters({
      lastUpdate: {
        to: finalNewValue,
      },
    })
  }

  render() {
    const { featureManagerFilters } = this.props
    return (
      <OAISFeatureManagerFiltersComponent
        featureManagerFilters={featureManagerFilters}
        changeSessionFilter={this.changeSessionFilter}
        changeSourceFilter={this.changeSourceFilter}
        changeProviderIdFilter={this.changeProviderIdFilter}
        changeFrom={this.changeFrom}
        changeTo={this.changeTo}
      />
    )
  }
}

export default OAISFeatureManagerFiltersContainer
