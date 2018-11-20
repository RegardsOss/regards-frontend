/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CardActions, CardText } from 'material-ui/Card'
import {
  ShowableAtRender, CardActionsComponent, FormErrorMessage,
} from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import {
  RenderTextField, Field, RenderSelectField, reduxForm,
} from '@regardsoss/form-utils'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderPluginField } from '@regardsoss/microservice-plugin-configurator'
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
    currentAccessRight: DataManagementShapes.AccessRightContent,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      isDisplayAdvancedForm: false,
      isDisplayPluginConf: false,
      isDisplayDOAccessPluginConf: false,
      selectMetaDataAccessLevel: props.currentAccessRight && props.currentAccessRight.accessLevel
        ? props.currentAccessRight.accessLevel : AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS,
    }
  }

  componentDidMount() {
    this.handleInitialize()
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
        dataAccessPlugin: currentAccessRight.dataAccessPlugin,
        checkAccessPlugin: currentAccessRight.dataAccessRight.pluginConfiguration,
      }
      const isCustomMetaAccess = (currentAccessRight.accessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.CUSTOM_ACCESS)
      const isCustomAccess = (currentAccessRight.dataAccessRight.dataAccessLevel === AccessRightsEnum.DATA_ACCESS_ENUM.CUSTOM_ACCESS)

      if (isCustomMetaAccess || isCustomAccess) {
        this.setState({
          isDisplayPluginConf: isCustomAccess,
          isDisplayDOAccessPluginConf: isCustomMetaAccess,
        })
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
    this.setState({
      isDisplayPluginConf: (value === AccessRightsEnum.DATA_ACCESS_ENUM.CUSTOM_ACCESS),
    })
    input.onChange(value)
  }

  handleChangeMetaDataAccess = (event, index, value, input) => {
    this.setState({
      selectMetaDataAccessLevel: value,
      isDisplayDOAccessPluginConf: (value === AccessRightsEnum.METADATA_ACCESS_ENUM.CUSTOM_ACCESS),
    })
    input.onChange(value)
  }

  renderShowAdvancedButton = () => {
    const computedStyles = styles(this.context.muiTheme)
    const { isDisplayAdvancedForm } = this.state
    const labelToggleAdvanced = isDisplayAdvancedForm
      ? <FormattedMessage id="accessright.form.action.advanced.hide" />
      : <FormattedMessage id="accessright.form.action.advanced.show" />
    const iconToggleAdvanced = isDisplayAdvancedForm
      ? <KeyboardArrowUp />
      : <KeyboardArrowDown />
    return (
      <div
        className={computedStyles.action.classes}
        style={computedStyles.action.styles}
      >
        <RaisedButton
          label={labelToggleAdvanced}
          icon={iconToggleAdvanced}
          onClick={this.handleToggleAdvanced}
        />
      </div>
    )
  }

  renderDataAccessLevel = () => {
    // Data access level is configurable only if metadata level is available for datas
    if (this.state.selectMetaDataAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS
      || this.state.selectMetaDataAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_ACCESS) {
      return null
    }
    return (
      <Field
        className="selenium-pick-dataAccess"
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
              className={`selenium-pick-dataAccess-${value}`}
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
      className="selenium-pick-metaDataAccessLevel"
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
            className={`selenium-pick-metaDataAccessLevel-${value}`}
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
        <FormattedMessage id="accessright.form.quality" />
        <br />
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
    const { submitting, invalid } = this.props
    const { isDisplayPluginConf, isDisplayDOAccessPluginConf } = this.state
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <div>
          <CardText>
            <FormErrorMessage>
              {this.props.errorMessage}
            </FormErrorMessage>
            {this.renderMetaDataAccessLevel()}
            <ShowableAtRender show={isDisplayDOAccessPluginConf}>
              <Field
                name="dataAccessPlugin"
                component={RenderPluginField}
                title={this.context.intl.formatMessage({ id: 'accessright.form.dataAccessPlugin.title' })}
                selectLabel={this.context.intl.formatMessage({ id: 'accessright.form.dataAccessPlugin.select.label' })}
                pluginType={DamDomain.PluginTypeEnum.DATA_OBJECT_ACCESS_FILTER}
                defaultPluginConfLabel="plop"
                microserviceName={STATIC_CONF.MSERVICES.DAM}
                hideDynamicParameterConf
                hideGlobalParameterConf
              />
            </ShowableAtRender>
            {this.renderDataAccessLevel()}
            <ShowableAtRender show={isDisplayPluginConf}>
              <br />
              <br />
              <Field
                name="checkAccessPlugin"
                component={RenderPluginField}
                title={this.context.intl.formatMessage({ id: 'accessright.form.checkDataAccessPlugin.title' })}
                selectLabel={this.context.intl.formatMessage({ id: 'accessright.form.checkDataAccessPlugin.select.label' })}
                pluginType={DamDomain.PluginTypeEnum.CHECK_DATA_ACCESS}
                defaultPluginConfLabel="plop"
                microserviceName={STATIC_CONF.MSERVICES.DAM}
                hideDynamicParameterConf
                hideGlobalParameterConf
              />
            </ShowableAtRender>
            {/**this.renderQualityFilter()*/}
            {/** this.renderShowAdvancedButton()*/}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'accessright.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'accessright.form.action.cancel' })}
              secondaryButtonClick={this.props.onCancel}
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
