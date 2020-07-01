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
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import {
  ThemeActions, ThemeInstanceActions, ThemeSelectors,
} from '@regardsoss/theme'
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
    fetchThemeList: PropTypes.func.isRequired,
    fetchThemeInstanceList: PropTypes.func.isRequired,
    deleteTheme: PropTypes.func.isRequired,
    deleteInstanceTheme: PropTypes.func.isRequired,
  }

  getCreateUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/theme/create'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/theme/create`
  }

  /** @return {string} specific project URL or instance admin URL if on instance */
  getRootURL = () => {
    const { isInstance, params } = this.props
    return isInstance ? '/admin' : `/admin/${params.project}`
  }

  /** @return {string} back URL */
  getBackUrl = () => `${this.getRootURL()}/ui/board`

  /**
   * Browse to edition form
   * @param {*} themeId theme ID
   */
  handleEdit = (themeId) => browserHistory.push(`${this.getRootURL()}/ui/theme/${themeId}/edit`)

  /**
   * Browse to duplicate form
   * @param {*} themeId theme ID
   */
  handleDuplicate = (themeId) => browserHistory.push(`${this.getRootURL()}/ui/theme/${themeId}/duplicate`)

  render() {
    const deleteTheme = this.props.isInstance ? this.props.deleteInstanceTheme : this.props.deleteTheme
    const fetchThemeList = this.props.isInstance ? this.props.fetchThemeInstanceList : this.props.fetchThemeList

    return (
      <ThemeListContainer
        themeList={this.props.themeList}
        backUrl={this.getBackUrl()}
        createUrl={this.getCreateUrl()}
        handleEdit={this.handleEdit}
        handleDuplicate={this.handleDuplicate}
        deleteTheme={deleteTheme}
        fetchThemeList={fetchThemeList}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeList: ThemeSelectors.getList(state),
  isFetching: ThemeSelectors.isFetching(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchThemeList: () => dispatch(ThemeActions.fetchPagedEntityList(0, 100)),
  fetchThemeInstanceList: () => dispatch(ThemeInstanceActions.fetchPagedEntityList(0, 100)),
  deleteTheme: (themeId) => dispatch(ThemeActions.deleteEntity(themeId)),
  deleteInstanceTheme: (themeId) => dispatch(ThemeInstanceActions.deleteEntity(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeListAdapter)
