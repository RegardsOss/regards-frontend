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
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import NoContentIcon from 'mdi-material-ui/BookCancel'
import { NoContentComponent } from '@regardsoss/components'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { getSearchCatalogClient } from '../../../../../clients/SearchEntitiesClient'
/**
* Shows empty component
* @author Raphaël Mechali
* @author Sébastien Binda
*/
export class EmptyTableContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
    isFetching: PropTypes.bool,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { searchSelectors } = getSearchCatalogClient(tabType)
    return {
      isFetching: searchSelectors.isFetching(state),
    }
  }

  static mapDispatchToProps(dispatch) {
    return {}
  }

  render() {
    const { isFetching } = this.props
    const titleKey = isFetching ? 'results.loading.title' : 'results.no.content.title'
    const messageKey = isFetching ? 'results.loading.subtitle' : 'results.no.content.subtitle'
    const icon = isFetching ? SearchIcon : NoContentIcon
    return (
      <NoContentComponent
        titleKey={titleKey}
        messageKey={messageKey}
        Icon={icon}
      />)
  }
}
export default connect(EmptyTableContainer.mapStateToProps, EmptyTableContainer.mapDispatchToProps)(EmptyTableContainer)
