/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { i18nSelectors } from '@regardsoss/i18n'
import { adminModuleActions, adminModuleSelectors } from '../../clients/ModulesListClient'
import { adminLayoutActions, adminLayoutSelectors } from '../../clients/LayoutListClient'
import DynamicModulesProviderContainer from '../common/DynamicModulesProviderContainer'
import ModuleFormComponent from '../../components/admin/ModuleFormComponent'

/**
 * Admin root container for menu module
 * @author Sébastien binda
 */
export class AdminContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { appName }) {
    const userAppId = 'user'
    return {
      fetchLayout: () => dispatch(adminLayoutActions.fetchEntity(userAppId)),
      fetchModules: () => dispatch(adminModuleActions.fetchPagedEntityList(0, null, { applicationId: userAppId }, { sort: 'id,ASC' })),
    }
  }

  static propTypes = {
    project: PropTypes.string,
    // default module properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // from map state to props
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
    // from map dispatch to props
    fetchLayout: PropTypes.func.isRequired,
    fetchModules: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle method component did mount. Used here to fetch layout and modules data (not fetched in common redux store by admin application)
   */
  componentDidMount = () => {
    // fetch initial data as admin app doesn't fetch the layout and modules data in common store parts
    const { fetchLayout, fetchModules } = this.props
    fetchLayout()
    fetchModules()
  }

  render() {
    const {
      appName, project, adminForm, locale,
    } = this.props
    return (
      <DynamicModulesProviderContainer
        moduleSelectors={adminModuleSelectors}
        layoutSelectors={adminLayoutSelectors}
        keepOnlyActive={false}
      >
        <ModuleFormComponent
          appName={appName}
          project={project}
          adminForm={adminForm}
          locale={locale}
        />
      </DynamicModulesProviderContainer>)
  }
}

export default connect(
  AdminContainer.mapStateToProps,
  AdminContainer.mapDispatchToProps)(AdminContainer)
