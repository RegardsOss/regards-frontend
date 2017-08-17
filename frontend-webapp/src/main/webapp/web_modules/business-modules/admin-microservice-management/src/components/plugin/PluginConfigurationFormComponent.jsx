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
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { formValueSelector } from 'redux-form'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderDoubleLabelToggle, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { buildParameterList, buildDefaultParameterList, mapPluginParameterTypeToPluginParameter } from '../../model/plugin/utils'
import moduleStyles from '../../styles/styles'
import GenericPluginParameter from './parameter/GenericPluginParameter'

const { validRequiredString, validRequiredNumber } = ValidationHelpers

/**
 * Display edit and create fragment form
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationFormComponent extends React.Component {

  static propTypes = {
    currentPluginConfiguration: CommonShapes.PluginConfiguration,
    currentPluginMetaData: CommonShapes.PluginMetaData,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    formMode: PropTypes.oneOf(['create', 'edit', 'copy']),
    microserviceName: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    iconField: PropTypes.string,
  }

  static defaultProps = {
    formMode: 'create',
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.validateProps(props)
    this.state = {
      isCreating: props.formMode === 'create',
      isEditing: props.formMode === 'edit',
      isCopying: props.formMode === 'copy',
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * Perform custom validation on props
   *
   * @param props
   */
  validateProps = (props) => {
    /**
     * If both pluginConfiguration & pluginMetaData props are passed, check that pluginMetaData's pluginId attribute matches
     * pluginConfiguration's pluginId attribute.
     * In other words, we passed the correct PluginMetaData of the PluginConfiguration.
     */
    if (props.pluginConfiguration && props.pluginMetaData) {
      const pluginConfigurationsPluginId = props.pluginConfiguration.content.pluginId
      const pluginMetaDatasPluginId = props.pluginMetaData.content.pluginId
      if (pluginConfigurationsPluginId !== pluginMetaDatasPluginId) {
        throw new Error('pluginConfiguration\'s pluginId attribute should match passed pluginMetaData\'s pluginId attribute in PluginConfigurationFormComponent')
      }
    }
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    const { formMode, currentPluginMetaData, currentPluginConfiguration } = this.props
    let initialValues

    switch (formMode) {
      case 'edit':
        initialValues = Object.assign({}, currentPluginConfiguration && currentPluginConfiguration.content)
        initialValues.parameters = buildParameterList(initialValues.parameters, currentPluginMetaData.content.parameters)
        break
      case 'create':
        initialValues = {
          active: false,
          pluginId: currentPluginMetaData && currentPluginMetaData.content.pluginId,
          pluginClassName: currentPluginMetaData && currentPluginMetaData.content.pluginClassName,
          parameters: currentPluginMetaData && buildDefaultParameterList(currentPluginMetaData.content.parameters),
        }
        break
      case 'copy':
        // Deep copy pluginConfiguration
        initialValues = cloneDeep(currentPluginConfiguration.content)
        // In copy mode remove id of the duplicated pluginConfiguration
        delete initialValues.id
        // In copy mode remove id of each pluginParameters
        if (initialValues.parameters && initialValues.parameters.length > 0) {
          forEach(initialValues.parameters, (parameter, key) => { initialValues.parameters[key].id = undefined })
        }
        break
      default:
        break
    }

    // Load icon if any
    this.loadIcon(get(currentPluginConfiguration, 'content.iconUrl'), null)

    this.props.initialize(initialValues)
  }

  /**
   * Load icon from the form field iconUrl.
   * @param path
   */
  loadIcon = (path) => {
    const { iconField } = this.props
    if (iconField) {
      this.setState({
        loadedIcon: iconField,
      })
    } else if (path) {
      this.setState({
        loadedIcon: path,
      })
    }
  }

  /**
   * Render loaded icon see loadIcon method
   * @returns {*}
   */
  renderIcon = () => {
    const { currentPluginConfiguration } = this.props
    const { loadedIcon } = this.state
    if (loadedIcon) {
      return <img src={loadedIcon} alt="" width="75" height="75" />
    } else if (get(currentPluginConfiguration, 'content.iconUrl', null)) {
      return <img src={currentPluginConfiguration.content.iconUrl} alt="" width="75" height="75" />
    }
    return null
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const { currentPluginMetaData, currentPluginConfiguration, handleSubmit, submitting, invalid, backUrl, change, formMode } = this.props

    const styles = moduleStyles(this.context.muiTheme)

    const title = this.state.isEditing ?
      this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.edit.title' }, { name: currentPluginConfiguration.content.name }) :
      this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.create.title' })

    return (
      <form
        onSubmit={handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Card>
            <CardTitle
              title={title}
            />
            <CardText>
              <div>
                {this.renderIcon()}
              </div>
              <Field
                disabled
                name="pluginClassName"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.pluginClassName' })}
              />
              <Field
                name="label"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.label' })}
              />
              <Field
                name="version"
                fullWidth
                component={RenderTextField}
                type="text"
                validate={validRequiredString}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.version' })}
              />
              <Field
                name="priorityOrder"
                fullWidth
                component={RenderTextField}
                type="number"
                parse={val => parseFloat(val)}
                validate={validRequiredNumber}
                label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.priorityOrder' })}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <Field
                  name="iconUrl"
                  component={RenderTextField}
                  fullWidth
                  type="text"
                  label={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.icon' })}
                />
                <IconButton
                  tooltip="Display icon"
                  onTouchTap={this.loadIcon}
                >
                  <SearchIcon />
                </IconButton>
              </div>
              <Field
                name="active"
                component={RenderDoubleLabelToggle}
                type="boolean"
                leftLabel={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.inactive' })}
                rightLabel={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.active' })}
                style={styles.pluginConfiguration.form.toggle}
                defaultToggled={currentPluginConfiguration ? currentPluginConfiguration.content.active : true}
              />
            </CardText>
          </Card>

          <Card style={styles.pluginConfiguration.form.section}>
            <CardTitle title={this.context.intl.formatMessage({ id: 'microservice-management.plugin.parameter.list.title' })} />
            <CardText>
              {currentPluginMetaData ? currentPluginMetaData.content.parameters.map((pluginParameterType, index) => (
                <GenericPluginParameter
                  key={pluginParameterType.name}
                  microserviceName={this.props.microserviceName}
                  fieldKey={`parameters.${index}`}
                  pluginParameterType={pluginParameterType}
                  pluginParameter={mapPluginParameterTypeToPluginParameter(pluginParameterType, currentPluginConfiguration)}
                  pluginMetaData={currentPluginMetaData}
                  change={change}
                  mode={formMode}
                />)) : []}
            </CardText>
          </Card>

          <Card style={styles.pluginConfiguration.form.section}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={this.state.isEditing ?
                  this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.action.submit.save' }) :
                  this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.action.submit.add' })}
                mainButtonType="submit"
                isMainButtonDisabled={submitting || invalid}
                secondaryButtonLabel={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.form.action.cancel' })}
                secondaryButtonUrl={backUrl}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }
}

const selector = formValueSelector('plugin-configuration-form')
const mapStateToProps = state => ({
  iconField: selector(state, 'iconUrl'),
})
const ConnectedComponent = connect(mapStateToProps)(PluginConfigurationFormComponent)

export default reduxForm({
  form: 'plugin-configuration-form',
})(ConnectedComponent)

