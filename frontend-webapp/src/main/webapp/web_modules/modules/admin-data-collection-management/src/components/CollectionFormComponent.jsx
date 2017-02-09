/**
 * LICENSE_PLACEHOLDER
 **/
import { map, forEach, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Collection, Model, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import CollectionStepperComponent from './CollectionStepperComponent'

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
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const isCreating = props.currentCollection === null || props.currentCollection === undefined
    this.state = {
      isCreating,
      isDuplicating: props.isDuplicating,
      isDisplayAttributeValue: !isCreating,
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getTitle = () => {
    let title
    if (this.state.isCreating) {
      title = <FormattedMessage id="collection.create.title" />
    } else if (this.state.isDuplicating) {
      title = (<FormattedMessage
        id="collection.duplicate.title"
        values={{
          name: this.props.currentCollection.content.label,
        }}
      />)
    } else {
      title = (<FormattedMessage
        id="collection.edit.title"
        values={{
          name: this.props.currentCollection.content.label,
        }}
      />)
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { currentCollection } = this.props
      const attributes = {}
      forEach(currentCollection.content.attributes, (attributeValueOrFragment, key) => {
        if (typeof attributeValueOrFragment === 'object') {
          // It's a fragment
          forEach(attributeValueOrFragment, (attribute, id) => {
            attributes[id] = attribute
          })
        } else {
          // This is an attribute
          attributes[key] = attributeValueOrFragment
        }
      })
      const initialValues = {
        label: currentCollection.content.label,
        model: currentCollection.content.model.id,
        attributes,
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
    this.setState({
      isDisplayAttributeValue: true,
    })
    input.onChange(value)
    this.props.handleUpdateModel(value)
  }

  render() {
    const { modelList, modelAttributeList, submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    return (
      <ReduxConnectedForm
        i18nMessagesDir="modules/admin-data-collection-management/src/i18n"
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={<FormattedMessage id="collection.form.subtitle" />}
          />
          <CollectionStepperComponent stepIndex={0} />
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
            <ShowableAtRender show={this.state.isDisplayAttributeValue}>
              <Table
                selectable={false}
              >
                <TableHeader
                  enableSelectAll={false}
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                >
                  <TableRow>
                    <TableHeaderColumn><FormattedMessage id="collection.form.table.fragment" /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage id="collection.form.table.label" /></TableHeaderColumn>
                    <TableHeaderColumn><FormattedMessage id="collection.form.table.value" /></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  preScanRows={false}
                  showRowHover
                >
                  {map(modelAttributeList, (modelAttribute, id) => (
                    <TableRow key={id}>
                      <TableRowColumn>{modelAttribute.content.attribute.fragment.name}</TableRowColumn>
                      <TableRowColumn>{modelAttribute.content.attribute.name}</TableRowColumn>
                      <TableRowColumn>
                        <ShowableAtRender show={modelAttribute.content.mode === 'GIVEN'}>
                          <Field
                            name={`attributes.${modelAttribute.content.attribute.name}`}
                            fullWidth
                            component={RenderTextField}
                            type="text"
                            label={<FormattedMessage id="collection.form.table.input" />}
                          />
                        </ShowableAtRender>
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="collection.form.action.next" />}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="collection.form.action.cancel" />}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </ReduxConnectedForm>
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
  if (!keys(values).length) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (values.label) {
    if (values.label.length > 128) {
      errors.label = 'invalid.max_128_carac'
    }
  } else {
    errors.label = ErrorTypes.REQUIRED
  }
  if (!values.model) {
    errors.model = ErrorTypes.REQUIRED
  }
  return errors
}

export default reduxForm({
  form: 'collection-form',
  validate,
})(CollectionFormComponent)

