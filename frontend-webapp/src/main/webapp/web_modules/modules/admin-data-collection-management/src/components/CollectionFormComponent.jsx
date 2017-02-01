/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Collection, Model, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'

/**
 * React component to list collections.
 */
export class CollectionFormComponent extends React.Component {

  static propTypes = {
    currentCollection: Collection,
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    modelList: React.PropTypes.objectOf(Model),
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    isDuplicating: React.PropTypes.bool,
    handleUpdateModel: React.PropTypes.func.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      isCreating: props.currentCollection === null || props.currentCollection === undefined,
      isDuplicating: props.isDuplicating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentCollection } = this.props
      const initialValues = {
        label: currentCollection.content.label,
        model: currentCollection.content.model.id,
      }
      this.props.initialize(initialValues)
    }
  }

  /**
   * Fetch new attribute model restriction when the Field type change
   * @param event
   * @param index
   * @param value
   * @param input
   */
  handleChange = (event, index, value, input) => {
    input.onChange(value)
    this.props.handleUpdateModel(value)
  }

  render() {
    const { modelList, modelAttributeList, submitting, invalid, backUrl } = this.props
    console.log(this.state.isCreating)
    const title = this.state.isCreating ? <FormattedMessage id="collection.create.title" /> :
      this.state.isDuplicating ?
        (<FormattedMessage
          id="collection.duplicate.title"
          values={{
            name: this.props.currentCollection.content.label,
          }}
        />) :
        (<FormattedMessage
          id="collection.edit.title"
          values={{
            name: this.props.currentCollection.content.label,
          }}
        />)
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
            subtitle={<FormattedMessage id="collection.form.subtitle" />}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="collection.form.label" />}
            />
            <Field
              name="model"
              fullWidth
              onSelect={this.handleChange}
              component={RenderSelectField}
              label={<FormattedMessage id="collection.form.model" />}
              disabled={!this.state.isCreating && !this.state.isDuplicating}
            >
              {map(modelList, (model, id) => (
                <MenuItem
                  value={model.content.id}
                  key={id}
                  primaryText={model.content.name}
                />
              ))}
            </Field>

            {map(modelAttributeList, (modelAttribute, id) => (
              <MenuItem
                value={modelAttribute.content.id}
                key={id}
                primaryText={modelAttribute.content.attribute.name}
              />
            ))}
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="collection.form.action.next" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="collection.form.action.cancel" />}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
  if (values.name) {
    if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
      errors.name = ErrorTypes.ALPHA_NUMERIC
    }
    if (values.name.length > 128) {
      errors.name = 'invalid.max_128_carac'
    }
  }
  return errors
}

export default reduxForm({
  form: 'collection-form',
  validate,
})(CollectionFormComponent)

