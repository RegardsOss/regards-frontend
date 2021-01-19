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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { withModuleStyle } from '@regardsoss/theme'
import messages from '../../i18n'
import OSQueryConfigurationComponent, { OSQueryConfiguration } from '../../components/opensearch/query/OSQueryConfigurationComponent'
import { descriptorSelectors } from '../../clients/OpensearchDescriptorClient'
import styles from '../../styles'

/**
 * Container for OpenSearch crawler query configuration component
 * @author Maxime Bouveron
 */
export class OSQueryConfigurationContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      descriptor: descriptorSelectors.getResult(state),
    }
  }

  static propTypes = {
    initialValues: OSQueryConfiguration.isRequired,
    isEditing: PropTypes.bool,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from mapStateToProps
    descriptor: DataManagementShapes.OpenSearchDescriptor.isRequired,
    // from mapDispatchToProps
  }

  onSubmit = (fields) => {
    const { descriptor, onSubmit } = this.props
    const jsonWebservice = descriptor.url.find((e) => e.type === 'application/json')
    const startPage = jsonWebservice.parameter.find((e) => e.value === '{startPage}')
    const count = jsonWebservice.parameter.find((e) => e.value === '{count}')
    const webserviceURL = jsonWebservice.template.split('?')[0]
    const pageIndexParam = startPage.name
    const startPageIndex = startPage.minInclusive
    onSubmit(fields, pageIndexParam, startPageIndex, count, webserviceURL)
  }

  render() {
    const {
      onBack, initialValues, isEditing, descriptor,
    } = this.props
    return (
      <I18nProvider messages={messages}>
        <OSQueryConfigurationComponent
          initialValues={initialValues}
          isEditing={isEditing}
          urlDescriptor={descriptor.url.find((e) => e.type === 'application/json')}
          onBack={onBack}
          onSubmit={this.onSubmit}
        />
      </I18nProvider>
    )
  }
}
export default compose(
  connect(OSQueryConfigurationContainer.mapStateToProps),
  withModuleStyle(styles))(OSQueryConfigurationContainer)
