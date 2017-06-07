/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'
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
import { PluginParameter, PluginMetaDataList, PluginConfiguration } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import PluginMetaDataSelectors from '../../../model/plugin/PluginMetaDataSelectors'
import PluginConfigurationSelectors from '../../../model/plugin/PluginConfigurationSelectors'
import { buildMenuItemPrimaryText, getFieldName } from './utils'
import moduleStyles from '../../../styles/styles'

const { required, string } = ValidationHelpers

/**
 * Component displaying a menu allowing to pick a plugin configuration for the passed plugin paramater.
 * Connected to redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterPlugin extends React.Component {

  static propTypes = {
    pluginParameter: PluginParameter.isRequired,
    pluginConfiguration: PluginConfiguration,
    change: PropTypes.func, // Callback provided by redux-form in order to manually change a field value
    mode: PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
    // form mapStateToProps
    pluginMetaDataList: PluginMetaDataList,
    pluginConfigurationList: PropTypes.arrayOf(PluginConfiguration),
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
      selectedPluginConfiguration: find(props.pluginConfigurationList, el => el.content.id === parseInt(props.pluginParameter.value, 10)),
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
    const { pluginConfigurationList, change, pluginConfiguration, pluginParameter: { name } } = this.props
    this.setState({
      value,
      selectedPluginConfiguration: find(pluginConfigurationList, el => el.content.id === value),
    })
    change(getFieldName(name, pluginConfiguration, '.value'), value ? value.toString() : null)
  }

  render() {
    const { pluginParameter: { name, defaultValue, optional }, pluginMetaDataList, pluginConfigurationList, mode, pluginConfiguration } = this.props
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
          <span>Couocu</span>
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
              {map(pluginMetaDataList, (pluginMetaData) => {
                const pluginConfigurationListForThisPluginMetaData = filter(pluginConfigurationList, pc => pc.content.pluginId === pluginMetaData.content.pluginId)
                const pluginConfigurationListIsEmpty = isEmpty(pluginConfigurationListForThisPluginMetaData)
                return (
                  <MenuItem
                    key={pluginMetaData.content.pluginId}
                    primaryText={buildMenuItemPrimaryText(pluginMetaData.content.pluginId, pluginMetaData.content.version)}
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
              name={getFieldName(name, pluginConfiguration, '.value')}
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

const mapStateToProps = (state, ownProps) => ({
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
  pluginConfigurationList: PluginConfigurationSelectors.getListActiveAndSorted(state),
})

export default connect(mapStateToProps)(PluginParameterPlugin)
