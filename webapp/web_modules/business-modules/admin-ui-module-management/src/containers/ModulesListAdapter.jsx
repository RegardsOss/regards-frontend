/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import ModulesListContainer from './ModulesListContainer'
import { moduleInstanceActions, moduleInstanceSelectors } from '../clients/ModuleInstanceClient'
import { moduleActions, moduleSelectors } from '../clients/ModuleClient'

/**
 * Router for all modules container to use instance client or project client. (rs-access-project or rs-access-instance).
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
export class ModulesListAdapter extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
    }),
    // Set by mapStateToProps
    isInstance: PropTypes.bool,
    // Set by mapDispatchToProps
    fetchModules: PropTypes.func,
    fetchInstanceModules: PropTypes.func,
    updateModule: PropTypes.func,
    updateInstanceModule: PropTypes.func,
    deleteModule: PropTypes.func,
    deleteInstanceModule: PropTypes.func,
  }

  // passes the information down to its children
  getChildProps() {
    let props = {}
    if (this.props.isInstance) {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors: moduleInstanceSelectors,
        fetchModules: this.props.fetchInstanceModules,
        updateModule: this.props.updateInstanceModule,
        deleteModule: this.props.deleteInstanceModule,
      }
    } else {
      props = {
        params: this.props.params,
        isInstance: this.props.isInstance,
        moduleSelectors,
        fetchModules: this.props.fetchModules,
        updateModule: this.props.updateModule,
        deleteModule: this.props.deleteModule,
      }
    }
    return props
  }

  render() {
    return (<ModulesListContainer {...this.getChildProps()} />)
  }
}

/**
 * Converts the module into server module: needs page.title to be a JSON string
 * @param {Module} module module to convert, respects Module shape
 * @return module as expected by server (page.title is JSON)
 */
const convertToServerModule = (module) => ({
  ...module,
  page: module.page ? ({
    ...module.page,
    title: JSON.stringify(module.page.title),
  }) : null,
})

const mapStateToProps = (state, ownProps) => ({
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchModules: (applicationId, moduleId) => dispatch(moduleActions.fetchPagedEntityList(0, 1000, { applicationId }, { sort: 'id,asc' })),
  fetchInstanceModules: (applicationId, moduleId) => dispatch(moduleInstanceActions.fetchPagedEntityList(0, 100, { applicationId }, { sort: 'id,asc' })),
  updateModule: (applicationId, module) => dispatch(moduleActions.updateEntity(module.id, convertToServerModule(module), { applicationId })),
  updateInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.updateEntity(module.id, convertToServerModule(module), { applicationId })),
  deleteModule: (applicationId, module) => dispatch(moduleActions.deleteEntity(module.id, { applicationId })),
  deleteInstanceModule: (applicationId, module) => dispatch(moduleInstanceActions.deleteEntity(module.id, { applicationId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModulesListAdapter)
