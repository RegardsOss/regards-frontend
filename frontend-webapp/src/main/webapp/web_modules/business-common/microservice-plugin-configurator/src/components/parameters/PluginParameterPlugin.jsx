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
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Delete from 'material-ui/svg-icons/action/delete'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { pluginMetaDataSelectors } from '../../clients/PluginMetadataClient'
import { buildMenuItemPrimaryText, getFieldName } from './util'
import moduleStyles from '../../styles/styles'
import {
  pluginConfigurationActions,
} from '../../clients/PluginConfigurationClient'

const { required, string } = ValidationHelpers

/**
 * Component displaying a menu allowing to pick a plugin configuration for the passed plugin paramater.
 * Connected to redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterPlugin extends React.Component {

  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginParameter: CommonShapes.PluginParameterContent.isRequired,
    pluginMetaData: CommonShapes.PluginMetaData,
    change: PropTypes.func, // Callback provided by redux-form in order to manually change a field value
    mode: PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
    reduxFormfieldNamePrefix: PropTypes.string,
    // form mapStateToProps
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    pluginConfigurationList: CommonShapes.PluginConfigurationArray,
    pluginParameterType: CommonShapes.PluginParameterType.isRequired,
    fetchPluginConfigurationList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mode: 'view',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
      openMenu: false,
      value: props.pluginParameter && props.pluginParameter.value,
    }
  }

  componentDidMount() {
    const { pluginParameterType, fetchPluginConfigurationList, microserviceName } = this.props

    if (pluginParameterType.type) {
      Promise.resolve(fetchPluginConfigurationList(pluginParameterType.type, microserviceName)).then(
        () => {
          const selectedPluginConfiguration = find(this.props.pluginConfigurationList, el => el.content.id === get(this.props.pluginParameter, 'pluginConfiguration.id'))
          if (selectedPluginConfiguration) {
            this.setState({
              selectedPluginConfiguration,
            })
          }
        },
      )
    }
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    })
  }

  handleChange = (value) => {
    const { reduxFormfieldNamePrefix, pluginConfigurationList, change, pluginMetaData, pluginParameter: { name } } = this.props
    this.setState({
      value,
      selectedPluginConfiguration: find(pluginConfigurationList, el => el.content.id === value),
    })
    change(getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.value'), value ? value.toString() : null)
  }

  render() {
    const { reduxFormfieldNamePrefix, pluginParameter: { name, defaultValue, optional }, pluginMetaDataList, pluginConfigurationList, mode, pluginMetaData } = this.props
    const { openMenu, selectedPluginConfiguration } = this.state
    const { muiTheme, intl } = this.context
    const isView = mode === 'view'
    const styles = moduleStyles(muiTheme)
    const validators = [string]
    if (!optional) {
      validators.push(required)
    }
    const label = name + (optional ? '*' : '')

    return (
      <div style={styles.pluginParameter.wrapper}>
        <Subheader style={styles.pluginParameter.label}>{label}</Subheader>
        <ShowableAtRender show={isView}>
          <span>{selectedPluginConfiguration ? selectedPluginConfiguration.content.label : ''}</span>
        </ShowableAtRender>
        <ShowableAtRender show={!isView}>
          <div>
            <RaisedButton
              label={selectedPluginConfiguration ? selectedPluginConfiguration.content.label : intl.formatMessage({ id: 'microservice-management.plugin.parameter.plugin.choose' })}
              onTouchTap={this.handleOpenMenu}
              style={styles.pluginParameter.pluginButton}
            />
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              open={openMenu}
              onRequestChange={this.handleOnRequestChange}
              desktop
              autoWidth
              style={styles.pluginParameter.iconMenu}
            >
              {map(pluginMetaDataList, (pmd) => {
                const pluginConfigurationListForThisPluginMetaData = filter(pluginConfigurationList, pc => pc.content.pluginId === pmd.content.pluginId)
                const pluginConfigurationListIsEmpty = isEmpty(pluginConfigurationListForThisPluginMetaData)
                return (
                  <MenuItem
                    key={pmd.content.pluginId}
                    primaryText={buildMenuItemPrimaryText(pmd.content.pluginId, pmd.content.version)}
                    rightIcon={<ArrowDropRight />}
                    disabled={pluginConfigurationListIsEmpty}
                    menuItems={
                      map(pluginConfigurationListForThisPluginMetaData, pc =>
                        (<MenuItem
                          key={pc.content.id}
                          primaryText={buildMenuItemPrimaryText(pc.content.label, pc.content.version)}
                          onTouchTap={() => this.handleChange(pc.content.id)}
                          checked={pc.content.id === this.state.value}
                        />))
                    }
                  />
                )
              })}
              <Divider />
              <MenuItem
                key={'none'}
                primaryText={intl.formatMessage({ id: 'microservice-management.plugin.parameter.plugin.empty.menu.item' })}
                onTouchTap={() => this.handleChange(undefined)}
                rightIcon={<Delete />}
              />
            </IconMenu>
            <Field
              style={styles.pluginParameter.field}
              name={getFieldName(reduxFormfieldNamePrefix, name, pluginMetaData, '.value')}
              component={RenderTextField}
              type={'text'}
              label={label}
              defaultValue={defaultValue}
              validate={validators}
            />
          </div>
        </ShowableAtRender>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: (pluginType, microserviceName) =>
    dispatch(pluginConfigurationActions.fetchEntityList({ microserviceName }, { pluginType })),
})

const mapStateToProps = (state, ownProps) => ({
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
  pluginConfigurationList: pluginMetaDataSelectors.getListActiveAndSorted(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginParameterPlugin)
