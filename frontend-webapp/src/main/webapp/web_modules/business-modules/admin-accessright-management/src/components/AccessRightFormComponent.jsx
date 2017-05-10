/**
 * LICENSE_PLACEHOLDER
 **/
import { CardActions, CardTitle, CardText } from 'material-ui/Card'
import { ShowableAtRender, CardActionsComponent, PluginConfigurationPickerComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderSelectField, reduxForm } from '@regardsoss/form-utils'
import { AccessRight, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import styles from '../styles/styles'


/**
 * Display edit and create accessright form
 */
export class AccessRightFormComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    currentAccessRight: AccessRight,
    pluginConfigurationList: React.PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: React.PropTypes.objectOf(PluginMetaData),
    nbSelectedDataset: React.PropTypes.number.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isDisplayAdvancedForm: false,
      isDisplayPluginConf: false,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * When the user select a plugin configuration, save that value into the form
   * @param value the pluginConfiguration id
   */
  onPluginConfigurationChange= (value) => {
    this.props.change('pluginConfiguration', value)
  }

  handleInitialize = () => {
    const { currentAccessRight } = this.props
    let defaultValues = { }
    if (currentAccessRight) {
      defaultValues = {
        quality: {
          level: currentAccessRight.qualityFilter.qualityLevel,
          max: currentAccessRight.qualityFilter.maxScore,
          min: currentAccessRight.qualityFilter.minScore,
        },
        access: currentAccessRight.accessLevel,
        dataAccess: currentAccessRight.dataAccessRight.dataAccessLevel,
      }
      // Show the plugin configuration picker when there is a value
      if (currentAccessRight.dataAccessRight.pluginConfiguration) {
        this.setState({
          isDisplayPluginConf: true,
        })
        // Save the value in the form
        defaultValues.pluginConfiguration = currentAccessRight.dataAccessRight.pluginConfiguration
      }
    } else {
      defaultValues = {
        quality: {
          level: 'ACCEPTED',
          max: '10',
          min: '0',
        },
        access: 'FULL_ACCESS',
        dataAccess: 'INHERITED_ACCESS',
      }
    }
    this.props.initialize(defaultValues)
  }

  handleToggleAdvanced = () => {
    const { isDisplayAdvancedForm } = this.state
    this.setState({
      isDisplayAdvancedForm: !isDisplayAdvancedForm,
    })
  }


  /**
   * Display the Plugin Configuraion picker when the user pick CustomAccess
   * Or remove the plugin configuration id from the form  when the user selects something else than CustomAccess
   * @param event
   * @param index
   * @param value
   * @param input
   */
  handleChangeDataAccess = (event, index, value, input) => {
    const { isDisplayPluginConf } = this.state
    const isCustomAccess = (value === 'CUSTOM_ACCESS')
    // Also reset inside the redux form if you switch from plugin to no plugin
    if (isDisplayPluginConf && !isCustomAccess) {
      this.onPluginConfigurationChange(null)
    }
    this.setState({
      isDisplayPluginConf: isCustomAccess,
    })
    input.onChange(value)
  }

  renderShowAdvancedButton = () => {
    const computedStyles = styles(this.context.muiTheme)
    const { isDisplayAdvancedForm } = this.state
    const labelToggleAdvanced = isDisplayAdvancedForm ?
      <FormattedMessage id="accessright.form.action.advanced.hide" /> :
      <FormattedMessage id="accessright.form.action.advanced.show" />
    const iconToggleAdvanced = isDisplayAdvancedForm ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />
    return (
      <div
        className={computedStyles.action.classes}
        style={computedStyles.action.styles}
      >
        <RaisedButton
          label={labelToggleAdvanced}
          icon={iconToggleAdvanced}
          onTouchTap={this.handleToggleAdvanced}
        />
      </div>
    )
  }

  render() {
    const { submitting, invalid, currentAccessRight, pluginMetaDataList, pluginConfigurationList, nbSelectedDataset } = this.props
    const { isDisplayPluginConf, isDisplayAdvancedForm } = this.state
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <div>
          <CardTitle
            title={<FormattedMessage id="accessright.form.title" />}
            subtitle={<FormattedMessage
              id="accessright.form.subtitle" values={{
                nbSelectedDataset,
              }}
            />}
          />
          <CardText>
            <Field
              name="access"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="accessright.form.accesslevel" />}
            >
              <MenuItem
                value="FULL_ACCESS"
                key="FULL_ACCESS"
                primaryText={<FormattedMessage id="accessright.form.accesslevel.FULL_ACCESS" />}
              />
              <MenuItem
                value="RESTRICTED_ACCESS"
                key="RESTRICTED_ACCESS"
                primaryText={<FormattedMessage id="accessright.form.accesslevel.RESTRICTED_ACCESS" />}
              />
              <MenuItem
                value="NO_ACCESS"
                key="NO_ACCESS"
                primaryText={<FormattedMessage id="accessright.form.accesslevel.NO_ACCESS" />}
              />
            </Field>
            <Field
              name="dataAccess"
              fullWidth
              component={RenderSelectField}
              label={<FormattedMessage id="accessright.form.dataAccessLevel" />}
              onSelect={this.handleChangeDataAccess}
            >
              <MenuItem
                value="NO_ACCESS"
                key="NO_ACCESS"
                primaryText={<FormattedMessage id="accessright.form.dataAccessLevel.NO_ACCESS" />}
              />
              <MenuItem
                value="INHERITED_ACCESS"
                key="INHERITED_ACCESS"
                primaryText={<FormattedMessage id="accessright.form.dataAccessLevel.INHERITED_ACCESS" />}
              />
              <MenuItem
                value="CUSTOM_ACCESS"
                key="CUSTOM_ACCESS"
                primaryText={<FormattedMessage id="accessright.form.dataAccessLevel.CUSTOM_ACCESS" />}
              />
            </Field>
            <ShowableAtRender show={isDisplayPluginConf}>
              <br />
              <br />
              <PluginConfigurationPickerComponent
                onChange={this.onPluginConfigurationChange}
                pluginMetaDataList={pluginMetaDataList}
                pluginConfigurationList={pluginConfigurationList}
                currentPluginConfiguration={currentAccessRight && currentAccessRight.dataAccessRight && currentAccessRight.dataAccessRight.pluginConfiguration && pluginConfigurationList[currentAccessRight.dataAccessRight.pluginConfiguration]}
              />
            </ShowableAtRender>
            <ShowableAtRender show={isDisplayAdvancedForm}>
              <hr />
              <FormattedMessage id="accessright.form.quality" /><br />
              <div className="row">
                <div className="col-sm-48">
                  <Field
                    name="quality.min"
                    component={RenderTextField}
                    type="number"
                    fullWidth
                    label={<FormattedMessage id="accessright.form.quality.min" />}
                  />
                </div>
                <div className="col-sm-48 col-sm-offset-4">
                  <Field
                    name="quality.max"
                    component={RenderTextField}
                    type="number"
                    fullWidth
                    label={<FormattedMessage id="accessright.form.quality.max" />}
                  />
                </div>
              </div>
              <Field
                name="quality.level"
                fullWidth
                component={RenderSelectField}
                label={<FormattedMessage id="accessright.form.quality.level" />}
              >
                <MenuItem
                  value="ACCEPTED"
                  key="ACCEPTED"
                  primaryText={<FormattedMessage id="accessright.form.quality.level.ACCEPTED" />}
                />
                <MenuItem
                  value="ACCEPTED_WITH_WARNINGS"
                  key="ACCEPTED_WITH_WARNINGS"
                  primaryText={<FormattedMessage id="accessright.form.quality.level.ACCEPTED_WITH_WARNINGS" />}
                />
                <MenuItem
                  value="REJECTED"
                  key="REJECTED"
                  primaryText={<FormattedMessage id="accessright.form.quality.level.REJECTED" />}
                />
              </Field>
            </ShowableAtRender>
            {this.renderShowAdvancedButton()}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="accessright.form.action.save" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
            />
          </CardActions>
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if (values.dataAccess && values.dataAccess === 'CUSTOM_ACCESS' && !values.pluginConfiguration) {
    errors.dataAccess = 'invalid.require_plugin_configuration'
  }
  if (values.quality && values.quality.min && parseInt(values.quality.min, 10) > parseInt(values.quality.max, 10)) {
    errors.quality = {}
    errors.quality.max = 'invalid.require_max_more_than_min'
  }
  return errors
}

export default reduxForm({
  form: 'access-right-form',
  validate,
})(AccessRightFormComponent)

