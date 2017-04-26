/**
 * LICENSE_PLACEHOLDER
 **/
import { values, map } from 'lodash'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { FieldArray } from 'redux-form'
import Divider from 'material-ui/Divider'
import { reduxForm, RenderTextField, Field } from '@regardsoss/form-utils'
import { CardActionsComponent, ChipList } from '@regardsoss/components'
import { AttributeModel, AttributesRegroupementConfiguration } from '@regardsoss/model'

/**
 * Component to display an attributes regroupement form.
 * @author Sébastien binda
 */
class AttributeRegroupementFormComponent extends React.Component {

  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    attributesRegrp: AttributesRegroupementConfiguration,
    validateLabel: React.PropTypes.func.isRequired,
    // Available Attributes for configuration
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
  }

  componentDidMount() {
    if (this.props.attributesRegrp) {
      this.props.initialize(this.props.attributesRegrp)
    }
  }

  addAttribute = (attribute, fields) => {
    fields.push(attribute.content.id)
  }

  removeAttribute = (attribute, fields) => {
    const attributes = fields.getAll()
    let index = null
    for (let i = 0; i < attributes.length; i += 1) {
      if (attributes[i] === attribute.content.id) {
        index = i
        break
      }
    }
    if (index !== null) {
      fields.remove(index)
    }
  }

  renderAttributes = ({ fields, meta: { error } }) => {
    let attributes = fields.getAll()
    if (!fields.getAll()) {
      attributes = []
    } else {
      attributes = map(fields.getAll(), (attributeId) => {
        if (this.props.selectableAttributes[attributeId]) {
          return this.props.selectableAttributes[attributeId]
        }
        return null
      })
    }

    return (
      <div style={{ marginTop: 15 }}>
        <ChipList
          availableEntities={values(this.props.selectableAttributes)}
          selectedEntities={attributes}
          onAddEntity={entity => this.addAttribute(entity, fields)}
          onRemoveEntity={entity => this.removeAttribute(entity, fields)}
          getEntityLabel={entity => entity.content.name}
          uniqValues
        />
      </div>
    )
  }


  render() {
    const { pristine, submitting, invalid, error } = this.props
    let title = <FormattedMessage id="form.attributes.regroupement.form.title" />
    let saveButton = <FormattedMessage id="form.attributes.regroupement.form.save" />
    if (this.props.attributesRegrp) {
      title = (<FormattedMessage
        id="form.attributes.regroupement.form.title.update" values={{ name: this.props.attributesRegrp.label }}
      />)
      saveButton = <FormattedMessage id="form.attributes.regroupement.form.update" />
    }

    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <Divider />
            <div style={{ marginTop: 10 }}>
              <FormattedHTMLMessage id="form.attributes.regroupement.description" />
            </div>
            {error && <strong>{error}</strong>}
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              disabled={this.props.attributesRegrp !== null}
              label={<FormattedMessage id="form.attributes.regroupement.form.label" />}
              validate={this.props.validateLabel}
            />
            <FieldArray name={'attributes'} component={this.renderAttributes} />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={saveButton}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="form.attributes.regroupement.form.cancel" />}
              secondaryButtonTouchTap={this.props.onClose}
            />
          </CardActions>
        </Card>
      </form>
    )
  }

}

function validate(formValues) {
  const errors = {}
  if (!formValues || !formValues.label || formValues.label.length === 0) {
    errors.label = 'Label is required'
  }
  return errors
}

const UnconnectedAttributeRegroupementFormComponent = AttributeRegroupementFormComponent
export {
  UnconnectedAttributeRegroupementFormComponent,
}

export default reduxForm({
  form: 'search-form-attr-grp-form',
  validate,
})(AttributeRegroupementFormComponent)
