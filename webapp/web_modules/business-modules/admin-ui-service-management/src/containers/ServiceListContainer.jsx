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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import { AccessDomain } from '@regardsoss/domain'
import { uiPluginDefinitionSelectors, uiPluginDefinitionActions } from '../clients/UIPluginDefinitionClient'
import ServiceListComponent from '../components/ServiceListComponent'
import messages from '../i18n'
import styles from '../styles'

/**
 * Displays the list of plugin service
 *
 * @author Léo Mieulet
 */
export class ServiceListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    uiPluginDefinitionList: AccessShapes.UIPluginDefinitionList,
    // from mapDispatchToProps
    fetchUIPluginDefinitionList: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    uiPluginDefinitionList: uiPluginDefinitionSelectors.getList(state),
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchUIPluginDefinitionList: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(
      0, 100, {},
      { type: AccessDomain.UI_PLUGIN_INFO_TYPES_ENUM.SERVICE },
    )),
  })

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchUIPluginDefinitionList())
      .then((actionResult) => {
        if (!actionResult.error) {
          this.setState({
            isLoading: false,
          })
        }
      })
  }

  handleBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/board`
    browserHistory.push(url)
  }

  handleOpen = (uiPluginServiceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/service/${uiPluginServiceId}/list`
    browserHistory.push(url)
  }

  handleCreate = (uiPluginServiceId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/service/${uiPluginServiceId}/create`
    browserHistory.push(url)
  }

  render() {
    const { uiPluginDefinitionList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            <ServiceListComponent
              uiPluginDefinitionList={uiPluginDefinitionList}
              handleOpen={this.handleOpen}
              handleCreate={this.handleCreate}
              handleBack={this.handleBack}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(ServiceListContainer.mapStateToProps, ServiceListContainer.mapDispatchToProps)(ServiceListContainer)
