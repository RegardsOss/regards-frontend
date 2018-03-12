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
import isNil from 'lodash/isNil'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
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
    }),

    // Set by mapStateToProps
    isInstance: PropTypes.bool,
    currentTheme: AccessShapes.Theme,

    // Set by mapDispatchToProps
    fetchTheme: PropTypes.func,
    fetchThemeInstance: PropTypes.func,
    updateTheme: PropTypes.func,
    updateInstanceTheme: PropTypes.func,
    createTheme: PropTypes.func,
    createInstanceTheme: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: isNil(props.params.themeId),
    }
  }

  getBackUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/theme/list'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/theme/list`
  }

  render() {
    const createTheme = this.props.isInstance ? this.props.createInstanceTheme : this.props.createTheme
    const updateTheme = this.props.isInstance ? this.props.updateInstanceTheme : this.props.updateTheme
    const fetchTheme = this.props.isInstance ? this.props.fetchThemeInstance : this.props.fetchTheme

    return (
      <ThemeFormContainer
        backUrl={this.getBackUrl()}
        isCreating={this.state.isCreating}
        currentTheme={this.props.currentTheme}

        createTheme={createTheme}
        updateTheme={updateTheme}
        fetchTheme={fetchTheme}
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
  updateTheme: theme => dispatch(ThemeActions.updateEntity(theme.id, theme)),
  updateInstanceTheme: theme => dispatch(ThemeInstanceActions.updateEntity(theme.id, theme)),
  createTheme: theme => dispatch(ThemeActions.createEntity(theme)),
  createInstanceTheme: theme => dispatch(ThemeInstanceActions.createEntity(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeFormAdapter)
