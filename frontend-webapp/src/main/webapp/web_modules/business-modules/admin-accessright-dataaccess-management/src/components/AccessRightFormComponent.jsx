/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import get from 'lodash/get'
import { CardActions, CardText } from 'material-ui/Card'
import { ShowableAtRender, CardActionsComponent, PluginConfigurationPickerComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, RenderSelectField, reduxForm, FormErrorMessage } from '@regardsoss/form-utils'
import { AccessRightContent, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import styles from '../styles/styles'
import AccessRightsEnum from './AccessRightsEnum'


/**
 * Display edit and create accessright form
 */
export class AccessRightFormComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    currentAccessRight: AccessRightContent,
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isDisplayAdvancedForm: false,
      isDisplayPluginConf: false,
      selectMetaDataAccessLevel: props.currentAccessRight && props.currentAccessRight.accessLevel ?
        props.currentAccessRight.accessLevel : AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * When the user select a plugin configuration, save that value into the form
   * @param value the pluginConfiguration id
   */
  onPluginConfigurationChange = (value) => {
    this.props.change('pluginConfiguration', value)
  }

  handleInitialize = () => {
    const { currentAccessRight } = this.props
    let defaultValues = {}
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
          level: AccessRightsEnum.QUALITY_LEVEL_ENUM.ACCEPTED,
          max: '10',
          min: '0',
        },
        access: AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS,
        dataAccess: AccessRightsEnum.DATA_ACCESS_ENUM.REFUSED,
      }
    }

    this.setState({
      selectMetaDataAccessLevel: defaultValues.access,
    })

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

  handleChangeMetaDataAccess = (event, index, value, input) => {
    this.setState({
      selectMetaDataAccessLevel: value,
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

  renderDataAccessLevel = () => {
    if (this.state.selectMetaDataAccessLevel !== AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS) {
      return null
    }
    return (
      <Field
        name="dataAccess"
        fullWidth
        component={RenderSelectField}
        label={this.context.intl.formatMessage({ id: 'accessright.form.data.accessLevel' })}
        onSelect={this.handleChangeDataAccess}
      >
        {map(AccessRightsEnum.DATA_ACCESS_ENUM, (value, key) => {
          const label = `accessright.form.data.accessLevel.${value}`
          return (
            <MenuItem
              value={value}
              key={key}
              primaryText={<FormattedMessage id={label} />}
            />
          )
        })}
      </Field>
    )
  }

  renderMetaDataAccessLevel = () => (
    <Field
      name="access"
      fullWidth
      component={RenderSelectField}
      label={this.context.intl.formatMessage({ id: 'accessright.form.meta.accessLevel' })}
      onSelect={this.handleChangeMetaDataAccess}
    >
      {map(AccessRightsEnum.METADATA_ACCESS_ENUM, (value, key) => {
        const label = `accessright.form.meta.accessLevel.${value}`
        return (
          <MenuItem
            value={value}
            key={key}
            primaryText={<FormattedMessage id={label} />}
          />
        )
      })}
    </Field>
  )

  renderQualityFilter = () => {
    const { isDisplayAdvancedForm } = this.state
    return (
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
              label={this.context.intl.formatMessage({ id: 'accessright.form.quality.min' })}
            />
          </div>
          <div className="col-sm-48 col-sm-offset-4">
            <Field
              name="quality.max"
              component={RenderTextField}
              type="number"
              fullWidth
              label={this.context.intl.formatMessage({ id: 'accessright.form.quality.max' })}
            />
          </div>
        </div>
        <Field
          name="quality.level"
          fullWidth
          component={RenderSelectField}
          label={this.context.intl.formatMessage({ id: 'accessright.form.quality.level' })}
        >
          {map(AccessRightsEnum.QUALITY_LEVEL_ENUM, (value, key) => {
            const label = `accessright.form.quality.level.${value}`
            return (
              <MenuItem
                value={value}
                key={key}
                primaryText={<FormattedMessage id={label} />}
              />
            )
          })}
        </Field>
      </ShowableAtRender>
    )
  }

  render() {
    const { submitting, invalid, pluginMetaDataList, pluginConfigurationList } = this.props
    const { isDisplayPluginConf } = this.state
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <div>
          <CardText>
            <FormErrorMessage>
              {this.props.errorMessage}
            </FormErrorMessage>
            {this.renderMetaDataAccessLevel()}
            {this.renderDataAccessLevel()}
            <ShowableAtRender show={isDisplayPluginConf}>
              <br />
              <br />
              <PluginConfigurationPickerComponent
                onChange={this.onPluginConfigurationChange}
                pluginMetaDataList={pluginMetaDataList}
                pluginConfigurationList={pluginConfigurationList}
                currentPluginConfiguration={get(this.props.currentAccessRight, 'dataAccessRight.pluginConfiguration', undefined)}
              />
            </ShowableAtRender>
            {this.renderQualityFilter()}
            {/** this.renderShowAdvancedButton()*/}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'accessright.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel="Cancel"
              secondaryButtonTouchTap={this.props.onCancel}
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
