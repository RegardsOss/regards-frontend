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
import values from 'lodash/values'
import { browserHistory } from 'react-router'
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

  static extractStateFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    if (values(query).length > 0) {
      const {
        sessionOwner, session, providerId, from, to,
      } = query
      if (sessionOwner) {
        urlFilters.sessionOwner = sessionOwner
      }
      if (session) {
        urlFilters.session = session
      }
      if (providerId) {
        urlFilters.providerId = providerId
      }
      if (from) {
        urlFilters.lastUpdate.from = from.fromISOString()
      }
      if (to) {
        urlFilters.lastUpdate.to = to.fromISOString()
      }
    }
    return urlFilters
  }

  changeSessionFilter = (newValue) => {
    this.props.updateStateFromFeatureManagerFilters('session', newValue)
  }

  changeSourceFilter = (newValue) => {
    this.props.updateStateFromFeatureManagerFilters('sessionOwner', newValue)
  }

  changeProviderIdFilter = (event, text) => {
    this.props.updateStateFromFeatureManagerFilters('providerId', text)
  }

  changeFrom = (newValue) => {
    this.props.updateStateFromFeatureManagerFilters('from', newValue)
  }

  changeTo = (newValue) => {
    this.props.updateStateFromFeatureManagerFilters('to', newValue)
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
