/**
 * LICENSE_PLACEHOLDER
 **/
import {values, map} from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { arrayInsert, FieldArray } from 'redux-form'
import { reduxForm, RenderTextField, Field } from '@regardsoss/form-utils'
import { CardActionsComponent, ChipList } from '@regardsoss/components'
import { AttributeModel } from '@regardsoss/model'
import AttributesRegroupementConfiguration from '../../../models/attributes/AttributesRegroupementConfiguration'

/**
 * Component to display an attributes regroupement form.
 * @author Sébastien binda
 */
class AttributeRegroupementFormComponent extends React.Component {

  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    attributesRegrp: AttributesRegroupementConfiguration,
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

  addAttribute = (attribute, fields) => {
    fields.push(attribute.content.id)
  }

  removeAttribute = (attribute, fields) => {
    const attributes = fields.getAll()
    let index=null
    for (let i=0;i<attributes.length;i++){
      if (attributes[i] === attribute.content.id){
        index = i
        break
      }
    }
    if (index !== null){
      fields.remove(index)
    }
  }

  renderAttributes = ({ fields, meta: { error } }) => {
    let attributes = fields.getAll()
    if (!fields.getAll()){
      attributes = []
    } else {
      attributes = map(fields.getAll(), attributeId => {
        if (this.props.selectableAttributes[attributeId]){
          return this.props.selectableAttributes[attributeId]
        } else {
          return null
        }
      })
    }

    return (
      <div style={{marginTop: 15}}>
      <ChipList
        availableEntities={values(this.props.selectableAttributes)}
        selectedEntities={attributes}
        onAddEntity={(entity) => this.addAttribute(entity, fields)}
        onRemoveEntity={(entity) => this.removeAttribute(entity, fields)}
        getEntityLabel={(entity) => entity.content.name}
        uniqValues={true}
      />
      </div>
    )
  }


  render() {
    const { pristine, submitting, invalid, error } = this.props
    let associatedAttributes = []
    if (this.props.attributesRegrp){
      associatedAttributes = this.props.attributesRegrp.attributes
    }
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={<FormattedMessage
              id="form.attributes.regroupement.form.title"
            />}
          />
          <CardText>
            {error && <strong>{error}</strong>}
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              disabled={this.props.attributesRegrp !== null}
              label={<FormattedMessage id="form.attributes.regroupement.form.label" />}
            />
            <FieldArray name={'attributes'} component={this.renderAttributes}/>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="form.attributes.regroupement.form.save" />}
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

function validate(values) {
  const errors = {}
  if (!values || !values.label || values.label.length === 0) {
    errors.label = 'Label is required'
  }
  return errors
}

export default reduxForm({
  form: 'search-form-attr-grp-form',
  validate,
})(AttributeRegroupementFormComponent)
