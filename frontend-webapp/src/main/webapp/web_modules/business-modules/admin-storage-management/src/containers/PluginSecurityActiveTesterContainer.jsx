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
import size from 'lodash/size'
import filter from 'lodash/filter'
import { connect } from '@regardsoss/redux'
import { CardTitle } from 'material-ui/Card'
import IssueIcon from 'mdi-material-ui/CloseCircle'
import OkIcon from 'mdi-material-ui/CheckCircle'
import { i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { pluginConfigurationSelectors, pluginConfigurationActions } from '../clients/PluginConfigurationClient'

const MICROSERVICE = STATIC_CONF.MSERVICES.STORAGE
/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @author Sébastien Binda
 */
export class PluginMetaDataListContainer extends React.Component {
  static propTypes = {
    pluginConfList: CommonShapes.PluginConfigurationList,
    fetchPluginConfList: PropTypes.function,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }
  static iconStyle = {
    width: '100',
    height: '100',
  }
  static wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
  }
  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { fetchPluginConfList } = this.props
    fetchPluginConfList('fr.cnes.regards.modules.storage.domain.plugin.ISecurityDelegation').then((actionResults) => {
      this.setState({
        isLoading: false,
      })
      return actionResults
    })
  }

  getView = () => {
    const { pluginConfList } = this.props
    const { intl, muiTheme } = this.context

    const {
      'forms-extension:validation': { validColor, errorColor },
    } = muiTheme
    const pluginConfActiveList = filter(pluginConfList, pluginConf => pluginConf.content.active)
    let icon
    let title
    let subtitle
    switch (size(pluginConfActiveList)) {
      case 0:
        icon = (<IssueIcon style={PluginMetaDataListContainer.iconStyle} color={errorColor} />)
        title = intl.formatMessage({ id: 'storage.security.no.plugin.title' })
        subtitle = intl.formatMessage({ id: 'storage.security.no.plugin.subtitle' })
        break
      case 1:
        icon = (<OkIcon style={PluginMetaDataListContainer.iconStyle} color={validColor} />)
        title = intl.formatMessage({ id: 'storage.security.plugin.defined.title' })
        subtitle = intl.formatMessage({ id: 'storage.security.plugin.defined.subtitle' })
        break
      // More than 1 plugin
      default:
        icon = (<IssueIcon style={PluginMetaDataListContainer.iconStyle} color={errorColor} />)
        title = intl.formatMessage({ id: 'storage.security.too.many.plugin.title' })
        subtitle = intl.formatMessage({ id: 'storage.security.too.many.plugin.subtitle' })
        break
    }

    return (
      <div style={PluginMetaDataListContainer.wrapperStyle}>

        {icon}
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
      </div>
    )
  }

  render() {
    const { isLoading } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={isLoading}
      >
        {this.getView}
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginConfList: pluginConfigurationSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfList: pluginType => dispatch(pluginConfigurationActions.fetchEntityList({ microserviceName: MICROSERVICE }, { pluginType })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
