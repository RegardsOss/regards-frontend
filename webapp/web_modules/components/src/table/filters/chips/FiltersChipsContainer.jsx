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
import compose from 'lodash/fp/compose'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { BasicSelector } from '@regardsoss/store-utils'
import { FiltersActions } from '@regardsoss/components'
import FiltersChipsComponent from './FiltersChipsComponent'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * @author Théo Lasserre
 */
export class FiltersChipsContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    filtersActions: PropTypes.instanceOf(FiltersActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    filtersSelectors: PropTypes.instanceOf(BasicSelector).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    filtersI18n: PropTypes.object,
    // from mapDispatchToProps
    updateFiltersStore: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/forbid-prop-types
    filters: PropTypes.object,
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { filtersActions }) {
    return {
      updateFiltersStore: (filtersValues) => dispatch(filtersActions.updateFiltersStore(filtersValues)),
    }
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { filtersSelectors }) {
    return {
      filters: filtersSelectors.getFilters(state),
    }
  }

  render() {
    const {
      filters, updateFiltersStore, filtersI18n,
    } = this.props
    return (
      <FiltersChipsComponent
        filters={filters}
        updateFiltersStore={updateFiltersStore}
        filtersI18n={filtersI18n}
      />
    )
  }
}
export default compose(
  connect(FiltersChipsContainer.mapStateToProps, FiltersChipsContainer.mapDispatchToProps),
  withI18n(messages, true), withModuleStyle(styles))(FiltersChipsContainer)
