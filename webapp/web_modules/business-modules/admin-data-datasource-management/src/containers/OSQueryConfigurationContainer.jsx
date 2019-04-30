/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { I18nProvider } from '@regardsoss/i18n'
import messages from '../i18n'
import OSQueryConfigurationComponent from '../components/OSQueryConfigurationComponent'
import {
  descriptorSelectors,
} from '../clients/OpensearchDescriptorClient'

/**
 *Comment Here
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

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {}
  }

  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequierd,
    isEditing: PropTypes.bool,
    initialValues: PropTypes.obj, //TODO : Shape it up
    // from mapStateToProps
    descriptor: PropTypes.obj, // TODO: Shape it up
    // from mapDispatchToProps
  }

  onSubmit = (fields) => {
    const jsonWebservice = this.props.descriptor.url.find(e => e.type === 'application/json')
    const startPage = jsonWebservice.parameter.find(e => e.value === '{startPage}')
    const count = jsonWebservice.parameter.find(e => e.value === '{count}')
    const webserviceURL = jsonWebservice.template.split('?')[0]
    const pageIndexParam = startPage.name
    const startPageIndex = startPage.minInclusive
    this.props.onSubmit(fields, pageIndexParam, startPageIndex, count, webserviceURL)
  }

  render() {
    const {
      onBack, initialValues, isEditing, descriptor,
    } = this.props
    return (
      <I18nProvider messages={messages}>
        <OSQueryConfigurationComponent
          onBack={onBack}
          onSubmit={this.onSubmit}
          initialValues={initialValues}
          isEditing={isEditing}
          filters={descriptor.url.find(e => e.type === 'application/json')}
        />
      </I18nProvider>
    )
  }
}
export default connect(
  OSQueryConfigurationContainer.mapStateToProps,
  OSQueryConfigurationContainer.mapDispatchToProps,
)(OSQueryConfigurationContainer)
