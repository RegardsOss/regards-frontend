/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import forEach from 'lodash/forEach'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import join from 'lodash/join'
import split from 'lodash/split'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { ShowableAtRender } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  RenderTextField,
  RenderSelectField,
  RenderJsonCodeEditorField,
  Field,
  reduxForm,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import ShowHideAdvancedOptions from './ShowHideAdvancedOptions'
import DynamicContentField from './DynamicContentField'
import ContainerShape from '../model/ContainerShape'
import { ALL_CONTAINERS, STATIC_CONTAINERS } from '../default/ContainerTypes'

const classesFormat = (values, name) => join(values, ',')
const classesParse = (value, name) => split(value, ',')

/**
 * React container to edit a container configuration
 */
class ContainerConfigurationComponent extends React.Component {
  static propTypes = {
    container: ContainerShape,
    hideDynamicContentOption: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    open: PropTypes.bool,

    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static defaultProps = {
    hideDynamicContentOption: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Initial container values when editing a new container
   */
  static INITIAL_CONTAINER_VALUES = {
    id: '',
    type: null,
    classes: [],
    styles: {},
  }

  static SELECT_FIELD_STYLES = { marginBottom: '12px' }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  static onPropertiesUpdated(oldProps, newProps) {
    const { change, container, open } = newProps
    // Detect form opening
    if (!isEqual(oldProps.open, open) && open) {
      // for each form initial field, set value from edited container, or default to initial value
      forEach(ContainerConfigurationComponent.INITIAL_CONTAINER_VALUES,
        (initialValue, key) => change(key, container ? container[key] : initialValue))
    }
  }

  static selectContainerType(event, index, value, input) {
    input.onChange(value)
  }

  state = {
    advanced: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => ContainerConfigurationComponent.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => ContainerConfigurationComponent.onPropertiesUpdated(this.props, nextProps)

  onAdvancedClick = () => this.setState({
    advanced: !this.state.advanced,
  })

  validatedJSON = (value, allValues, props, name) => {
    if (value == null || value === undefined) {
      return this.context.intl.formatMessage({ id: 'container.configuration.edit.styles.error.json.format' })
    }
    try {
      JSON.stringify(value)
      return undefined
    } catch (e) {
      return this.context.intl.formatMessage({ id: 'container.configuration.edit.styles.error.json.format' })
    }
  }

  render() {
    const {
      hideDynamicContentOption, pristine, submitting, invalid, container, handleSubmit, onSubmit, onCancel, open,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const { advanced } = this.state

    const containerModel = container && ALL_CONTAINERS[container.type]
    // dynamic options (layout and main container) are available for non root container (ie new ones or inUserApp marked layouts)
    const hasDynamicOptions = !container || containerModel.inUserApp

    return (
      <Dialog
        title={formatMessage({ id: 'container.configuration.edit.dialog.title' })}
        modal={false}
        open={open}
        actions={
          <>
            <FlatButton
              key="cancel"
              onClick={onCancel}
              label={formatMessage({ id: 'container.form.cancel.button' })}
            />
            <RaisedButton
              key="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={pristine || submitting || invalid}
              label={formatMessage({ id: container ? 'container.form.update.button' : 'container.form.submit.button' })}
            />
          </>
        }
        onRequestClose={onCancel}
        autoDetectWindowHeight
        autoScrollBodyContent
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Field
              name="id"
              fullWidth
              component={RenderTextField}
              type="text"
              disabled={container !== null}
              label={formatMessage({ id: 'container.form.id' })}
              validate={ValidationHelpers.required}
            />
            {hasDynamicOptions // available for new elements and
              ? <Field
                  name="type"
                  fullWidth
                  component={RenderSelectField}
                  type="text"
                  onSelect={ContainerConfigurationComponent.selectContainerType}
                  label={formatMessage({ id: 'container.form.type' })}
                  validate={ValidationHelpers.required}
                  style={ContainerConfigurationComponent.SELECT_FIELD_STYLES}
              >
                { /** Show option (remove container types used for root container) */
                  map(
                    hideDynamicContentOption ? STATIC_CONTAINERS : ALL_CONTAINERS,
                    (containerOption, containerKey) => containerOption.inUserApp
                      ? <MenuItem value={containerKey} key={containerKey} primaryText={formatMessage({ id: containerOption.i18nKey })} />
                      : null)
                }
              </Field> : null}
            {!this.props.hideDynamicContentOption && hasDynamicOptions
              ? <DynamicContentField change={this.props.change} />
              : null}
            <ShowHideAdvancedOptions advanced={advanced} onClick={this.onAdvancedClick} />
            <ShowableAtRender
              show={advanced}
            >
              <Field
                name="classes"
                format={classesFormat}
                parse={classesParse}
                fullWidth
                component={RenderTextField}
                type="text"
                label={formatMessage({ id: 'container.form.classes' })}
              />
              <Field
                name="styles"
                fullWidth
                validate={this.validatedJSON}
                component={RenderJsonCodeEditorField}
                label={formatMessage({ id: 'container.form.styles' })}
              />
            </ShowableAtRender>
          </div>
        </form>
      </Dialog>
    )
  }
}

const UnconnectedContainerConfigurationComponent = ContainerConfigurationComponent
export { UnconnectedContainerConfigurationComponent }

export default reduxForm({
  form: 'edit-layout-container-form',
})(ContainerConfigurationComponent)
