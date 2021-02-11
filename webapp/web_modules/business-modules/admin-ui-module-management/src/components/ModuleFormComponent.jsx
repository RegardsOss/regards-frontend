/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import filter from 'lodash/filter'
import merge from 'lodash/merge'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RadioButton from 'material-ui/RadioButton'
import { formValueSelector } from 'redux-form'
import { AccessDomain, UIDomain, DamDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { connect } from '@regardsoss/redux'
import { CardActionsComponent } from '@regardsoss/components'
import {
  RenderTextField, RenderSelectField, Field, RenderCheckbox, RenderRadio, ValidationHelpers, reduxForm,
  ErrorTypes,
} from '@regardsoss/form-utils'
import { AccessShapes } from '@regardsoss/shape'
import DynamicModuleFormComponent from './DynamicModuleFormComponent'

/**
 * React component to display and configure a given module
 * @author Sébastien binda
 */
class ModuleFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string,
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
      // eslint-disable-next-line react/forbid-prop-types
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

  /** Initial state */
  state = (() => {
    let dynamicContainerSelected
    const moduleSelected = this.props.adminForm.isEditing || this.props.adminForm.isDuplicating
    if (moduleSelected) {
      dynamicContainerSelected = find(
        this.props.containers,
        (container) => container.id === this.props.module.container && container.dynamicContent,
      )
    }
    return {
      moduleSelected,
      dynamicContainerSelected,
      module: this.props.module,
    }
  })()

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const initializeModule = {
      applicationId: this.props.applicationId,
      active: false,
      page: {
        home: false,
      },
      ...this.state.module,
    }
    this.props.initialize(initializeModule)
  }

  selectContainer = (event, index, containerId, input) => {
    const container = find(this.props.containers, (cont) => cont.id === containerId)
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
  renderStaticModuleConfiguration = () => {
    const { intl: { formatMessage }, moduleTheme: { form } } = this.context
    return (
      <div>
        <Field
          name="type"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectModuleType}
          label={formatMessage({ id: 'module.form.name' })}
          disabled={!this.props.adminForm.isCreating}
          validate={ValidationHelpers.required}
        >
          {map(this.props.availableModuleTypes, (module, id) => (
            <MenuItem
              value={module}
              key={id}
              primaryText={module}
            />
          ))}
        </Field>
        <Field
          name="description"
          fullWidth
          component={RenderTextField}
          type="text"
          label={formatMessage({ id: 'module.form.description' })}
          validate={ValidationHelpers.required}
        />
        <Field
          style={form.containerFieldStyle}
          name="container"
          fullWidth
          component={RenderSelectField}
          type="text"
          onSelect={this.selectContainer}
          label={formatMessage({ id: 'module.form.container' })}
          validate={ValidationHelpers.required}
        >
          {map(this.props.containers, (container) => (
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
          label={formatMessage({ id: 'module.form.active' })}
        />
      </div>
    )
  }

  /**
   * Renders page configuration part, when module is dynamic
   */
  renderModulePageConfiguration = () => {
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        {/* is default page? */}
        <Field
          name="page.home"
          component={RenderCheckbox}
          label={formatMessage({ id: 'module.form.page.home' })}
        />
        {/* icon mode and value */}
        <Field
          name="page.iconType"
          component={RenderRadio}
          defaultSelected={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT}
        >
          <RadioButton
            value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE}
            label={formatMessage({ id: 'module.form.page.icon.none' })}
          />
          <RadioButton
            value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT}
            label={formatMessage({ id: 'module.form.page.icon.default' })}
          />
          <RadioButton
            value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM}
            label={formatMessage({ id: 'module.form.page.icon.custom' })}
          />
        </Field>
        {/* page custom icon */}
        <Field
          name="page.customIconURL"
          disabled={this.props.currentPageIconType !== AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM}
          component={RenderTextField}
          fullWidth
          type="text"
          label={formatMessage({ id: 'module.form.page.custom.icon.url' })}
          validate={this.validateCustomIcon}
        />
        {/* page english title */}
        <Field
          name="page.title.en"
          component={RenderTextField}
          fullWidth
          type="text"
          label={formatMessage({ id: 'module.form.page.title.en' })}
          validate={ValidationHelpers.required}
        />
        {/* page french title */}
        <Field
          name="page.title.fr"
          component={RenderTextField}
          fullWidth
          type="text"
          label={formatMessage({ id: 'module.form.page.title.fr' })}
          validate={ValidationHelpers.required}
        />
      </div>
    )
  }

  /** Renders dynamic module configuration part */
  renderDynamicModuleConfiguration = () => {
    const { dynamicContainerSelected } = this.state
    const { adminForm } = this.props
    if (!get(adminForm, 'form')) {
      return null
    }
    const childAdminForm = {
      ...adminForm,
      isPage: !!dynamicContainerSelected,
    }
    return (
      <DynamicModuleFormComponent
        project={this.props.project}
        appName={this.props.applicationId}
        adminForm={childAdminForm}
        module={this.state.module}
      />)
  }

  render() {
    const {
      pristine, submitting, handleSubmit, onSubmit, onBack, invalid,
    } = this.props
    const { dynamicContainerSelected, moduleSelected } = this.state
    const { isDuplicating, isCreating } = this.props.adminForm
    const { intl: { formatMessage }, moduleTheme: { form } } = this.context

    let title = 'module.form.title.update'
    if (isDuplicating) {
      title = 'module.form.title.duplicate'
    } else if (isCreating) {
      title = 'module.form.title.create'
    }

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {/* 1. render common modules configuration */}
          <Card>
            <CardTitle
              title={formatMessage({ id: title })}
              style={form.cardTitleLessSpaced}
            />
            <CardText id="staticFields" style={form.cardContentLessSpaced}>
              {this.renderStaticModuleConfiguration(form)}
            </CardText>
          </Card>

          {/* 2. render dynamic modules page configuration */
            dynamicContainerSelected ? (
              <Card style={form.cardEspaced}>
                <CardTitle
                  style={form.cardTitleLessSpaced}
                  title={formatMessage({ id: 'module.form.page.settings.title' })}
                />
                <CardText id="pageFields" style={form.cardContentLessSpaced}>
                  {this.renderModulePageConfiguration(form)}
                </CardText>
              </Card>) : null
          }

          {/* 3. render specific dynamic module configuration */
            moduleSelected ? (
              <Card style={form.cardEspaced}>
                <CardTitle
                  style={form.cardTitleLessSpaced}
                  title={formatMessage({ id: 'module.form.module.settings.title' })}
                />
                <CardText id="dynamicFields">
                  {this.renderDynamicModuleConfiguration()}
                </CardText>
              </Card>) : null
          }

          {/* 4. render buttons */}
          <Card style={form.cardEspaced}>
            <CardActions>
              <CardActionsComponent
                mainButtonLabel={formatMessage({ id: isCreating ? 'module.form.submit.button' : 'module.form.update.button' })}
                mainButtonType="submit"
                isMainButtonDisabled={pristine || submitting || invalid}
                secondaryButtonLabel={formatMessage({ id: 'module.form.cancel.button' })}
                secondaryButtonClick={onBack}
              />
            </CardActions>
          </Card>
        </div>
      </form>
    )
  }
}

function validate(fieldValues) {
  let errors = {}
  const initialMapViewMode = get(fieldValues, 'conf.viewsGroups.DATA.views.MAP.initialViewMode')
  const layers = get(fieldValues, 'conf.viewsGroups.DATA.views.MAP.layers')
  if (initialMapViewMode && layers) {
    const layersModes = map(filter(layers, (layer) => layer.background), (layer) => layer.layerViewMode)
    if (!layersModes.includes(initialMapViewMode)) {
      errors = {
        conf: {
          viewsGroups: {
            [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
              views: {
                [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
                  initialViewMode: ErrorTypes.INVALID_CONFIGURATION,
                },
              },
            },
          },
        },
      }
    }
  }

  return errors
}

const UnconnectedModuleFormComponent = ModuleFormComponent
export { UnconnectedModuleFormComponent }

// create form
const formName = 'edit-module-form'
const form = reduxForm({
  form: formName,
  validate,
})(ModuleFormComponent)
// apply selector: page icon type
const selector = formValueSelector(formName)
export default connect((state) => ({ currentPageIconType: selector(state, 'page.iconType') }))(form)
