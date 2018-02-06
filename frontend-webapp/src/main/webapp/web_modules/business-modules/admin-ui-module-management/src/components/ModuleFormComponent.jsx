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
import find from 'lodash/find'
import map from 'lodash/map'
import merge from 'lodash/merge'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RadioButton from 'material-ui/RadioButton'
import { formValueSelector } from 'redux-form'
import { AccessDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, RenderRadio, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { AccessShapes } from '@regardsoss/shape'
import DynamicModuleFormComponent from './DynamicModuleFormComponent'
import Styles from '../styles/styles'

import values from 'lodash/values'
import { SVGURLIcon } from '@regardsoss/components'
import { modulesManager } from '@regardsoss/modules'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ModuleFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    module: AccessShapes.Module,
    availableModuleTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    containers: PropTypes.arrayOf(AccessShapes.ContainerContent),
    onSubmit: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    applicationId: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      // Current module configuration. Values from the redux-form
      form: PropTypes.object,
    }),
    // from reduxForm
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    // from redux selector
    currentPageIconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    module: {
      active: false,
      conf: {},
    },
  }

  constructor(props) {
    super(props)
    let dynamicContainerSelected
    const moduleSelected = props.adminForm.isEditing || props.adminForm.isDuplicating
    if (moduleSelected) {
      dynamicContainerSelected = find(
        this.props.containers,
        container => container.id === this.props.module.container && container.dynamicContent,
      )
    }
    this.state = {
      moduleSelected,
      dynamicContainerSelected,
      module: this.props.module,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const initializeModule = Object.assign(
      {},
      {
        applicationId: this.props.applicationId,
        active: false,
        defaultDynamicModule: false,
      }, this.state.module,
    )
    this.props.initialize(initializeModule)
  }

  selectContainer = (event, index, containerId, input) => {
    const container = find(this.props.containers, cont => cont.id === containerId)
    input.onChange(containerId)
    this.setState({
      dynamicContainerSelected: container.dynamicContent,
    })
  }

  selectModuleType = (event, index, value, input) => {
    input.onChange(value)
    this.setState({
      moduleSelected: true,
      module: merge({}, this.state.module, { type: value }),
    })
  }

  /**
   * Validates custom icon URL
   */
  validateCustomIcon = (textURL, values) => {
    if (values.pageIconType === AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM) {
      // when in custom icon type, that field is required
      return ValidationHelpers.required(textURL) || ValidationHelpers.url(textURL)
    }
    return undefined // no error in any other case
  }

  /**
   * Renders static module configuration part
   */
  renderStaticModuleConfiguration = (style) => {
    const containerFieldStyle = { marginBottom: 15 }
    return (
      <div>
        <Field
          name="type"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectModuleType}
          label={this.context.intl.formatMessage({ id: 'module.form.name' })}
          disabled={!this.props.adminForm.isCreating}
          validate={ValidationHelpers.required}
        >
          {map(this.props.availableModuleTypes, (module, id) => (
            <MenuItem
              value={module}
              key={id}
              primaryText={module}
            />
          ))
          }
        </Field>
        <Field
          name="description"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'module.form.description' })}
          validate={ValidationHelpers.required}
        />
        <Field
          style={containerFieldStyle}
          name="container"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectContainer}
          label={this.context.intl.formatMessage({ id: 'module.form.container' })}
          validate={ValidationHelpers.required}
        >
          {map(this.props.containers, container => (
            <MenuItem
              value={container.id}
              key={container.id}
              primaryText={container.dynamicContent ? `${container.id} (dynamic)` : container.id}
            />
          ))}
        </Field>
        <Field
          name="active"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'module.form.active' })}
        />
      </div>
    )
  }

  /**
   * Renders page configuration part, when module is dynamic
   */
  renderModulePageConfiguration = () => (
    <div>
      {/* is default page? */}
      <Field
        name="defaultDynamicModule"
        component={RenderCheckbox}
        label={this.context.intl.formatMessage({ id: 'module.form.isDefault' })}
      />
      {/* icon mode and value */}
      <Field
        name="pageIconType"
        component={RenderRadio}
        defaultSelected={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT}
      >
        <RadioButton
          value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE}
          label={this.context.intl.formatMessage({ id: 'module.form.page.icon.none' })}
        />
        <RadioButton
          value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT}
          label={this.context.intl.formatMessage({ id: 'module.form.page.icon.default' })}
        />
        <RadioButton
          value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM}
          label={this.context.intl.formatMessage({ id: 'module.form.page.icon.custom' })}
        />
      </Field>
      {/* page custom icon */}
      <Field
        name="pageCustomIconURL"
        disabled={this.props.currentPageIconType !== AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM}
        component={RenderTextField}
        fullWidth
        type="text"
        label={this.context.intl.formatMessage({ id: 'module.form.page.custom.icon.url' })}
        validate={this.validateCustomIcon}
      />
      {/* page english title */}
      <Field
        name="pageTitleEN"
        component={RenderTextField}
        fullWidth
        type="text"
        label={this.context.intl.formatMessage({ id: 'module.form.page.title.en' })}
        validate={ValidationHelpers.required}
      />
      {/* page french title */}
      <Field
        name="pageTitleFR"
        component={RenderTextField}
        fullWidth
        type="text"
        label={this.context.intl.formatMessage({ id: 'module.form.page.title.fr' })}
        validate={ValidationHelpers.required}
      />
    </div>
  )

  /** Renders dynamic module configuration part */
  renderDynamicModuleConfiguration = (style) => {
    if (this.state.moduleSelected) {
      return (<DynamicModuleFormComponent
        project={this.props.project}
        appName={this.props.applicationId}
        adminForm={this.props.adminForm}
        module={this.state.module}
        styles={style.cardEspaced}
      />)
    }
    return null
  }

  render() {
    const { pristine, submitting, invalid } = this.props
    const style = Styles(this.context.muiTheme)
    const { isDuplicating, isCreating } = this.props.adminForm

    let title = 'module.form.title.update'
    if (isDuplicating) {
      title = 'module.form.title.duplicate'
    } else if (isCreating) {
      title = 'module.form.title.create'
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          {/* 1. render common modules configuration */}
          <Card>
            <CardTitle
              title={this.context.intl.formatMessage({ id: title }, { name: this.state.module.name })}
              style={style.cardTitleLessSpaced}
            />
            <CardText id="staticFields" style={style.cardContentLessSpaced}>
              {this.renderStaticModuleConfiguration(style)}
            </CardText>
          </Card>

          {/* 2. render dynamic modules page configuration */
            this.state.dynamicContainerSelected ? (
              <Card style={style.cardEspaced}>
                <CardTitle
                  style={style.cardTitleLessSpaced}
                  title={this.context.intl.formatMessage({ id: 'module.form.page.settings.title' }, { name: this.state.module.name })}
                />
                <CardText id="pageFields" style={style.cardContentLessSpaced}>
                  {this.renderModulePageConfiguration(style)}
                </CardText>
              </Card>) : null
          }

          {/* 3. render specific dynamic module configuration */}
          {this.renderDynamicModuleConfiguration(style)}

          {/* 4. render buttons */}
          <Card style={style.cardEspaced}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={this.context.intl.formatMessage({ id: isCreating ? 'module.form.submit.button' : 'module.form.update.button' })}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting || invalid}
                secondaryButtonLabel={this.context.intl.formatMessage({ id: 'module.form.cancel.button' })}
                secondaryButtonClick={this.props.onBack}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }
}

const UnconnectedModuleFormComponent = ModuleFormComponent
export {
  UnconnectedModuleFormComponent,
}

// create form
const formName = 'edit-module-form'
const form = reduxForm({ form: formName })(ModuleFormComponent)
// apply selector: page icon type
const selector = formValueSelector(formName)
export default connect(state => ({ currentPageIconType: selector(state, 'pageIconType') }))(form)
