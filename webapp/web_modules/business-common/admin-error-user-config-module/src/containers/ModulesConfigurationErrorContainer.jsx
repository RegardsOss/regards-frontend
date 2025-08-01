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
import compose from 'lodash/fp/compose'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { connect } from '@regardsoss/redux'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import { moduleActions, moduleSelectors } from '../clients/ModuleClient'
import ModulesConfigurationErrorComponent from '../components/ModulesConfigurationErrorComponent'
import ModuleConfErrorUtils from '../utils/ModuleConfErrorUtils'
import styles from '../styles'
import messages from '../i18n'

/**
 * @author Théo Lasserre
 */
export class ModulesConfigurationErrorContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    isFetchingAttributes: PropTypes.bool.isRequired,
    isFetchingModules: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: DataManagementShapes.AttributeModelList,
    // eslint-disable-next-line react/no-unused-prop-types
    modules: AccessShapes.ModuleList,
    // from mapDispatchToProps
    fetchModules: PropTypes.func.isRequired,
    fetchAttrModelList: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isFetchingAttributes: attributeModelSelectors.isFetching(state),
      isFetchingModules: moduleSelectors.isFetching(state),
      attributes: attributeModelSelectors.getList(state),
      modules: moduleSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchModules: () => dispatch(moduleActions.fetchPagedEntityList(0, 100, { applicationId: UIDomain.APPLICATIONS_ENUM.USER })),
      fetchAttrModelList: () => dispatch(attributeModelActions.fetchEntityList()),
    }
  }

  state = {
    errorConfContent: [],
    hasError: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() { this.onPropertiesUpdated({}, this.props) }

  /**
   * Lifecycle method: component did mount. Used here to log error when no module is found
   */
  componentDidMount() {
    this.fetchModulesAndAttributes()
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) { this.onPropertiesUpdated(this.props, nextProps) }

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, nextProps) => {
    if (!this.state.hasError && (oldProps.modules !== nextProps.modules || oldProps.attributes !== nextProps.attributes)) {
      this.setState({
        errorConfContent: ModuleConfErrorUtils.checkModulesConfiguration(nextProps.modules, nextProps.attributes),
      })
    }
  }

  fetchModulesAndAttributes = () => {
    const { fetchModules, fetchAttrModelList } = this.props
    Promise.all([fetchModules(), fetchAttrModelList()])
      .then((actionResult) => {
        if (actionResult[0].error || actionResult[1].error) {
          this.setState({
            hasError: true,
          })
        }
      })
  }

  render() {
    const { isFetchingAttributes, isFetchingModules } = this.props
    const { errorConfContent } = this.state
    return (
      <ModulesConfigurationErrorComponent
        isFetching={isFetchingAttributes || isFetchingModules}
        errorConfContent={errorConfContent}
        fetchModulesAndAttributes={this.fetchModulesAndAttributes}
      />
    )
  }
}
export default compose(
  withResourceDisplayControl,
  connect(ModulesConfigurationErrorContainer.mapStateToProps, ModulesConfigurationErrorContainer.mapDispatchToProps),
  withI18n(messages, true),
  withModuleStyle(styles))(ModulesConfigurationErrorContainer)
