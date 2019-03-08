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
import { browserHistory } from 'react-router'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import messages from '../i18n'
import OSCrawlerConfigurationComponent from '../components/OSCrawlerConfigurationComponent'
import {
  descriptorActions,
} from '../clients/OpensearchDescriptorClient'

/**
 *Comment Here
 * @author Maxime Bouveron
 */
export class OSCrawlerConfigurationContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // descriptor(scope, url) {
      //   return descriptorSelectors().getResult(state)
      // },
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */

   state = {
     isLoading: false,
   }

  static propTypes = {
    onBack: PropTypes.func.isRequired,
    project: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      refresh: PropTypes.string,
      descriptor: PropTypes.string,
    }),
    // from mapStateToProps
    // from mapDispatchToProps
    getDescriptor: PropTypes.func.isRequired,
  }

  onSubmit = (fields) => {
    this.setState({
      isLoading: true,
    })
    this.props.getDescriptor(this.props.project, fields.descriptor)
      .then((descriptor) => {
        this.props.onSubmit(fields)
      })
  }

  render() {
    const { onBack } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={this.state.isLoading}
        >
          <OSCrawlerConfigurationComponent
            onBack={onBack}
            onSubmit={this.onSubmit}
            initialValues={this.props.initialValues}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getDescriptor: (scope, url) => dispatch(descriptorActions.getDescriptor(scope, url)),
})

export default connect(
  null,
  mapDispatchToProps,
)(OSCrawlerConfigurationContainer)
