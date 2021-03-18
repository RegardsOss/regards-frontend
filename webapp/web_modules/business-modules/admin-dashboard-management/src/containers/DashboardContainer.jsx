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
import { connect } from '@regardsoss/redux'
import compose from 'lodash/fp/compose'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import {
  Card, CardText, CardTitle,
} from 'material-ui/Card'
import { SourcesContainer } from './SourcesContainer'
import messages from '../i18n'
import styles from '../styles'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class DashboardContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
  // from mapStateToProps
  // from mapDispatchToProps
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {}
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/board`
  }

  onSourceSelected = () => { }

  onSessionSelected = () => { }

  render() {
    const { params: { project } } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'dashboard.title' })}
        />
        <CardActionsComponent
          mainButtonLabel={formatMessage({ id: 'dashboard.refresh' })}
          mainButtonType="submit"
        />
        <CardText>
          <SourcesContainer
            project={project}
            onSourceSelected={this.onSourceSelected}
          />
          <SessionsContainer
            project={project}
            onSessionSelected={this.onSessionSelected}
          />
        </CardText>
        <CardActionsComponent
          mainButtonLabel={formatMessage({ id: 'dashboard.back' })}
          mainButtonType="submit"
          mainButtonClick={this.getBackURL}
        />
      </Card>
    )
  }
}

export default compose(
  connect(DashboardContainer.mapStateToProps, DashboardContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(DashboardContainer)
