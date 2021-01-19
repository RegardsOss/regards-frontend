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
import { withModuleStyle } from '@regardsoss/theme'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import messages from '../../i18n'
import OSCrawlerConfigurationComponent, { OSCrawlerMainConfiguration } from '../../components/opensearch/crawler/OSCrawlerConfigurationComponent'
import { descriptorActions } from '../../clients/OpensearchDescriptorClient'
import styles from '../../styles'

/**
 * Container for OpenSearch crawler main configuration component
 * @author Maxime Bouveron
 */
export class OSCrawlerConfigurationContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { project }) {
    return {
      fetchDescriptor: (url) => dispatch(descriptorActions.getDescriptor(project, url)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    project: PropTypes.string.isRequired, // used in mapDispatchToProps
    initialValues: OSCrawlerMainConfiguration.isRequired,
    isEditing: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from mapDispatchToProps
    fetchDescriptor: PropTypes.func.isRequired,
  }

  state = {
    isLoading: false,
  }

  /**
   * On user submission
   * @param {*} fields fields as edited by user (never invalid, respects OSCrawlerConfigurationComponent.MainConfiguration)
   */
  onSubmit = (fields) => {
    const { fetchDescriptor, onSubmit } = this.props
    // whenever user commits, make sure descriptor has been fetched (for edition case, where asyncValidation will not occur)
    fetchDescriptor(fields.opensearchDescriptorURL).then((result) => onSubmit(fields))
  }

  render() {
    const {
      onBack, isEditing, initialValues, fetchDescriptor,
    } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={this.state.isLoading}
        >
          <OSCrawlerConfigurationComponent
            isEditing={isEditing}
            initialValues={initialValues}
            fetchDescriptor={fetchDescriptor}
            onBack={onBack}
            onSubmit={this.onSubmit}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default compose(
  connect(null, OSCrawlerConfigurationContainer.mapDispatchToProps),
  withModuleStyle(styles))(OSCrawlerConfigurationContainer)
