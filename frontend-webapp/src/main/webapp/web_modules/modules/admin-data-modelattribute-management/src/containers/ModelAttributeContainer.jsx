/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { map } from 'lodash'
import Paper from 'material-ui/Paper'
import { connect } from '@regardsoss/redux'
import { AttributeModel, ModelAttribute } from '@regardsoss/model'
import ItemTypes from '../components/ItemTypes'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'
import ModelAttributeComponent from '../components/ModelAttributeComponent'
import ModelAttributeActions from '../model/ModelAttributeActions'

export class ModelAttributeContainer extends React.Component {
  static propTypes = {
    attribute: AttributeModel,
    // from mapStateToProps
    modelAttribute: ModelAttribute,
    // from mapDispatchToProps
    updateModelAttribute: React.PropTypes.func,
  }

  handleComputationUpdate = (newComputation) => {
    const updatedModelAttribute = Object.assign({}, this.props.modelAttribute.content, {
      mode: newComputation,
    })
    this.props.updateModelAttribute(this.props.modelAttribute.content.id, updatedModelAttribute, updatedModelAttribute.model.id)
  }

  render() {
    const { modelAttribute } = this.props
    if (modelAttribute) {
      return (
        <ModelAttributeComponent
          modelAttribute={modelAttribute}
          handleComputationUpdate={this.handleComputationUpdate}
        />
      )
    }
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelAttribute: ModelAttributeSelectors.getByAttributeModelId(state, ownProps.attribute.content.id),
})

const mapDispatchToProps = dispatch => ({
  updateModelAttribute: (id, values, modelId) => dispatch(ModelAttributeActions.updateEntity(id, values, dispatch, [modelId])),
})


export default connect(mapStateToProps, mapDispatchToProps)(ModelAttributeContainer)
