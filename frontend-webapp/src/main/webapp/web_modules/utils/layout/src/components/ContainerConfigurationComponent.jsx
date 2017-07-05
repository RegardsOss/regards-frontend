/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import join from 'lodash/join'
import split from 'lodash/split'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import {
  RenderTextField,
  RenderSelectField,
  Field,
  RenderCheckbox,
  reduxForm,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import ContainerShape from '../model/ContainerShape'
import ContainerTypes from '../default/ContainerTypes'

/**
 * REact container to edit a container configuration
 */
class ContainerConfigurationComponent extends React.Component {

  static propTypes = {
    container: ContainerShape,
    hideDynamicContentOption: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,

    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static buttonStyle = {
    marginTop: 20,
  }
  static checkboxStyle = {
    marginTop: 15,
  }

  state = {
    advanced: false,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  onAdvancedClick = () => {
    this.setState({
      advanced: !this.state.advanced,
    })
  }

  handleInitialize = () => {
    this.props.initialize({ ...this.props.container })
  }

  selectContainerType = (event, index, value, input) => {
    input.onChange(value)
  }

  renderDynamicContent = () => {
    if (!this.props.hideDynamicContentOption) {
      return (
        <Field
          name="dynamicContent"
          style={ContainerConfigurationComponent.checkboxStyle}
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'container.form.dynamicContent' })}
        />
      )
    }
    return null
  }

  render() {
    const { pristine, submitting } = this.props
    const iconToggleAdvanced = this.state.advanced ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Field
            name="id"
            fullWidth
            component={RenderTextField}
            type="text"
            disabled={this.props.container !== null}
            label={this.context.intl.formatMessage({ id: 'container.form.id' })}
          />
          <Field
            name="type"
            fullWidth
            component={RenderSelectField}
            type="text"
            onSelect={this.selectContainerType}
            label={this.context.intl.formatMessage({ id: 'container.form.type' })}
          >
            {map(ContainerTypes, (type, typeName) => (
              <MenuItem
                value={typeName}
                key={typeName}
                primaryText={typeName}
              />
            ))}
          </Field>
          {this.renderDynamicContent()}
          <ShowableAtRender
            show={this.state.advanced}
          >
            <Field
              name="classes"
              format={(values, name) => join(values, ',')}
              parse={(value, name) => split(value, ',')}
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'container.form.classes' })}
            />
            <Field
              name="styles"
              format={(values, name) => JSON.stringify(values)}
              parse={(values, name) => JSON.parse(values)}
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'container.form.styles' })}
            />
          </ShowableAtRender>
          <RaisedButton
            label={this.context.intl.formatMessage({ id: 'container.form.advanced.mode' })}
            primary
            icon={iconToggleAdvanced}
            onTouchTap={this.onAdvancedClick}
            style={ContainerConfigurationComponent.buttonStyle}
          />
          <CardActionsComponent
            mainButtonLabel={
              this.context.intl.formatMessage({
                id: this.props.container ? 'container.form.update.button' : 'container.form.submit.button',
              })
            }
            mainButtonType="submit"
            isMainButtonDisabled={pristine || submitting}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'container.form.cancel.button' })}
            secondaryButtonTouchTap={this.props.onCancel}
          />
        </div>
      </form>
    )
  }

}

ContainerConfigurationComponent.defaultProps = {
  hideDynamicContentOption: false,
}

function validate(values) {
  const errors = {}

  errors.id = ValidationHelpers.required(values.id)
  errors.type = ValidationHelpers.required(values.type)

  return errors
}

const UnconnectedContainerConfigurationComponent = ContainerConfigurationComponent
export {
  UnconnectedContainerConfigurationComponent,
}


export default reduxForm({
  form: 'edit-layout-container-form',
  validate,
})(ContainerConfigurationComponent)
