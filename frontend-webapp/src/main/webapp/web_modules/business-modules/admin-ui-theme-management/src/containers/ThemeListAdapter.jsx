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
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { ThemeActions, ThemeInstanceActions, ThemeSelectors, getCurrentTheme } from '@regardsoss/theme'
import { AccessShapes } from '@regardsoss/shape'
import ThemeListContainer from './ThemeListContainer'

/**
 * Adapt functions depending if we are on instance or project
 * @author Léo Mieulet
 */
export class ThemeListAdapter extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),

    // Set by mapStateToProps
    isInstance: PropTypes.bool,
    themeList: AccessShapes.ThemeList,

    // Set by mapDispatchToProps
    fetchThemeList: PropTypes.func,
    fetchThemeInstanceList: PropTypes.func,
    deleteTheme: PropTypes.func,
    deleteInstanceTheme: PropTypes.func,
  }

  getCreateUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/theme/create'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/theme/create`
  }

  getBackUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/board'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/board`
  }

  handleEdit = (themeId) => {
    if (this.props.isInstance) {
      const url = `/admin/ui/theme/${themeId}/edit`
      browserHistory.push(url)
    }
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/theme/${themeId}/edit`
    browserHistory.push(url)
  }


  render() {
    const deleteTheme = this.props.isInstance ? this.props.deleteInstanceTheme : this.props.deleteTheme
    const fetchThemeList = this.props.isInstance ? this.props.fetchThemeInstanceList : this.props.fetchThemeList

    return (
      <ThemeListContainer
        themeList={this.props.themeList}
        backUrl={this.getBackUrl()}
        createUrl={this.getCreateUrl()}
        handleEdit={this.handleEdit}
        deleteTheme={deleteTheme}
        fetchThemeList={fetchThemeList}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeList: ThemeSelectors.getList(state),
  currentTheme: getCurrentTheme(state),
  isFetching: ThemeSelectors.isFetching(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = dispatch => ({
  fetchThemeList: () => dispatch(ThemeActions.fetchPagedEntityList(0, 100)),
  fetchThemeInstanceList: () => dispatch(ThemeInstanceActions.fetchPagedEntityList(0, 100)),
  deleteTheme: themeId => dispatch(ThemeActions.deleteEntity(themeId)),
  deleteInstanceTheme: themeId => dispatch(ThemeInstanceActions.deleteEntity(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeListAdapter)
