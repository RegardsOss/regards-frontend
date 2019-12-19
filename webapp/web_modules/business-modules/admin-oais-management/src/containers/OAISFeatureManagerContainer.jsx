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
import compose from 'lodash/fp/compose'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { browserHistory } from 'react-router'
import messages from '../i18n'
import styles from '../styles'
import OAISFeatureManagerComponent from '../components/OAISFeatureManagerComponent'

/**
 * OAIS Feature manager container.
 * @author Simon MILHAU
 */
class OAISFeatureManagerContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
  }

  onBack = (level) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/oais/featureManager`
    browserHistory.push(url)
  }

  render() {
    const { params } = this.props

    return (
      <OAISFeatureManagerComponent
        params={params}
        onBack={this.onBack}
      />
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles))(OAISFeatureManagerContainer)
