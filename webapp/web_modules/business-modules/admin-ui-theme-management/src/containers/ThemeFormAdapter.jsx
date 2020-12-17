/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { connect } from '@regardsoss/redux'
import { ThemeActions, ThemeInstanceActions, ThemeSelectors } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import ThemeFormContainer from './ThemeFormContainer'

/**
 * Adapt functions depending if we are on instance or project
 * @author Léo Mieulet
 */
export class ThemeFormAdapter extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      themeId: PropTypes.string,
      mode: PropTypes.string,
    }),

    // Set by mapStateToProps
    isInstance: PropTypes.bool,
    currentTheme: AccessShapes.Theme,
    themeList: AccessShapes.ThemeList,

    // Set by mapDispatchToProps
    fetchTheme: PropTypes.func.isRequired,
    fetchThemeInstance: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired,
    updateInstanceTheme: PropTypes.func.isRequired,
    createTheme: PropTypes.func.isRequired,
    createInstanceTheme: PropTypes.func.isRequired,
  }

  UNSAFE_componentWillMount() {
    const { themeId, mode } = this.props.params
    this.setState({
      isCreating: isNil(themeId),
      isEditing: !isNil(themeId) && mode === 'edit',
      isDuplicating: !isNil(themeId) && mode === 'duplicate',
    })
  }

  getBackUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/theme/list'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/theme/list`
  }

  render() {
    const {
      currentTheme, themeList, isInstance,
      createInstanceTheme, createTheme,
      updateInstanceTheme, updateTheme,
      fetchThemeInstance, fetchTheme,
    } = this.props
    const { isCreating, isEditing, isDuplicating } = this.state

    return (
      <ThemeFormContainer
        backUrl={this.getBackUrl()}
        isCreating={isCreating}
        isEditing={isEditing}
        isDuplicating={isDuplicating}
        currentTheme={currentTheme}
        themeList={themeList}
        createTheme={isInstance ? createInstanceTheme : createTheme}
        updateTheme={isInstance ? updateInstanceTheme : updateTheme}
        fetchTheme={isInstance ? fetchThemeInstance : fetchTheme}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeList: ThemeSelectors.getList(state),
  currentTheme: ThemeSelectors.getById(state, ownProps.params.themeId),
  isFetching: ThemeSelectors.isFetching(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTheme: () => dispatch(ThemeActions.fetchEntity(ownProps.params.themeId)),
  fetchThemeInstance: () => dispatch(ThemeInstanceActions.fetchEntity(ownProps.params.themeId)),
  updateTheme: (theme) => dispatch(ThemeActions.updateEntity(theme.id, theme)),
  updateInstanceTheme: (theme) => dispatch(ThemeInstanceActions.updateEntity(theme.id, theme)),
  createTheme: (theme) => dispatch(ThemeActions.createEntity(theme)),
  createInstanceTheme: (theme) => dispatch(ThemeInstanceActions.createEntity(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeFormAdapter)
