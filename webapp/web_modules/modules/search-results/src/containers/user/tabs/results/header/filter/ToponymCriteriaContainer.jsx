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
import find from 'lodash/find'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { CatalogDomain } from '@regardsoss/domain'
import { UIShapes, AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { getToponymLabel, getToponymCopyright } from '@regardsoss/toponym-common'
import { i18nContextType } from '@regardsoss/i18n'
import { toponymSelectors } from '../../../../../../clients/ToponymClient'
import ToponymCriteriaComponent from '../../../../../../components/user/tabs/results/header/filter/ToponymCriteriaComponent'

/**
 * Toponym criterion container (provides toponym infos required by ToponymCriterion component)
 * @author Théo Lasserre
 */
export class ToponymCriteriaContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    toponymCriteria: PropTypes.arrayOf(UIShapes.BasicCriterion).isRequired,
    onUnselectToponymCriteria: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    toponymList: AccessShapes.ToponymList,
    currentLocale: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      toponymList: toponymSelectors.getList(state),
      currentLocale: state.common.i18n.locale,
    }
  }

  state = {
    selectedToponym: undefined,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const nextState = { ...this.state }
    const {
      toponymList: oldToponymList, toponymCriteria: oldToponymCriteria,
    } = oldProps
    const {
      toponymList, toponymCriteria,
    } = newProps
    if (!isEqual(oldToponymCriteria, toponymCriteria) || !isEqual(oldToponymList, toponymList)) {
      const toponymBusinessId = get(toponymCriteria, `[0]requestParameters.${CatalogDomain.CatalogSearchQueryHelper.TOPONYM_PARAMETER_NAME}`)
      const toponym = find(toponymList, (topo) => topo.content.businessId === toponymBusinessId)
      nextState.selectedToponym = toponym
    }
    // update state on change
    if (!isEqual(nextState, this.state)) {
      this.setState(nextState)
    }
  }

  render() {
    const { onUnselectToponymCriteria, currentLocale } = this.props
    const { selectedToponym } = this.state
    const { intl: { formatMessage } } = this.context
    const selectedToponymLabel = selectedToponym
      ? formatMessage({ id: 'search.filter.search.toponym.label' }, {
        toponymLabel: getToponymLabel(selectedToponym, currentLocale),
        toponymCopyrights: getToponymCopyright(selectedToponym),
      })
      : formatMessage({ id: 'search.filter.search.toponym.label.not.found' })
    return (
      <ToponymCriteriaComponent
        label={selectedToponymLabel}
        onUnselectToponymCriteria={onUnselectToponymCriteria}
      />)
  }
}
export default connect(
  ToponymCriteriaContainer.mapStateToProps)(ToponymCriteriaContainer)
