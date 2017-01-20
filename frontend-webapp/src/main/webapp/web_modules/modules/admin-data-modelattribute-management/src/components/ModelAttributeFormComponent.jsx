/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { AttributeModel, Model, ModelAttribute, Fragment } from '@regardsoss/model'
import { map, keys } from 'lodash'
import Paper from 'material-ui/Paper'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import ContainerCard from './ContainerCard'
import ItemTypes from './ItemTypes'
import DraggableCard from './DraggableCard'
import AttributeModelComponent from './AttributeModelComponent'
import FragmentComponent from './FragmentComponent'
import ModelAttributeContainer from '../containers/ModelAttributeContainer'

/**
 * Display edit and create attribute model form
 */
export class ModelAttributeFormComponent extends React.Component {

  static propTypes = {
    onCreateFragment: React.PropTypes.func.isRequired,
    onDeleteFragment: React.PropTypes.func.isRequired,
    onCreateAttributeModel: React.PropTypes.func.isRequired,
    onDeleteAttributeModel: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    currentModel: Model.isRequired,
    distributedAttrModels: React.PropTypes.shape({
      ATTR_REMAINING: React.PropTypes.shape({
        fragments: React.PropTypes.objectOf(React.PropTypes.arrayOf(AttributeModel)),
        attrs: React.PropTypes.arrayOf(AttributeModel),
      }),
      ATTR_ASSOCIATED: React.PropTypes.shape({
        fragments: React.PropTypes.objectOf(React.PropTypes.arrayOf(AttributeModel)),
        attrs: React.PropTypes.arrayOf(AttributeModel),
      }),
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  onDrop = (entityDroppedTo, isFragment, entity) => {
    if (isFragment) {
      const fragment = entity[keys(entity)[0]].content.fragment
      if (entityDroppedTo === ItemTypes.ATTR_ASSOCIATED) {
        // Add a new fragment to the model
        this.props.onCreateFragment(fragment)
      } else {
        // Remove the fragment from the model
        this.props.onDeleteFragment(fragment)
      }
    } else if (entityDroppedTo === ItemTypes.ATTR_ASSOCIATED) {
        // Add a new modelAttribute to the model
      this.props.onCreateAttributeModel(entity)
    } else {
        // Remove the modelAttribute from the model
      this.props.onDeleteAttributeModel(entity)
    }
  }

  /**
   * return react component
   * @returns {XML}
   */
  render() {
    const { backUrl, distributedAttrModels } = this.props
    const style = this.context.muiTheme.layout.cardEspaced
    return (
      <div>
        <Card>
          <CardTitle
            title={<FormattedMessage
              id="modelattr.edit.title"
              values={{
                name: this.props.currentModel.content.name,
              }}
            />}
          />
        </Card>

        <div className="row">
          <div className="col-sm-50">
            <ContainerCard
              acceptAttrType={ItemTypes.ATTR_ASSOCIATED}
              title={<FormattedMessage id="modelattr.edit.modelname" values={{ name: this.props.currentModel.content.name }} />}
              onChange={this.onDrop}
            >
              {map(distributedAttrModels.ATTR_ASSOCIATED.fragments, (fragment, id) => (
                <DraggableCard
                  shadow={2}
                  value={fragment}
                  key={`fragment-${id}`}
                  isFragment
                  draggableToContainerType={ItemTypes.ATTR_REMAINING}
                >
                  <FragmentComponent attributes={fragment} type={ItemTypes.ATTR_ASSOCIATED} />
                </DraggableCard>
              ))}
              {map(distributedAttrModels.ATTR_ASSOCIATED.attrs, (attribute, id) => (
                <DraggableCard
                  shadow={2}
                  value={attribute}
                  key={`attribute-${id}`}
                  isFragment={false}
                  draggableToContainerType={ItemTypes.ATTR_REMAINING}
                >
                  <ModelAttributeContainer attribute={attribute} />
                </DraggableCard>
              ))}
            </ContainerCard>
          </div>
          <div className="col-sm-50">
            <ContainerCard
              acceptAttrType={ItemTypes.ATTR_REMAINING}
              title={<FormattedMessage id="modelattr.edit.remainingAttr" />}
              onChange={this.onDrop}
            >
              {map(distributedAttrModels.ATTR_REMAINING.fragments, (fragment, id) => (
                <DraggableCard
                  shadow={2}
                  value={fragment}
                  key={`fragment-${id}`}
                  isFragment
                  draggableToContainerType={ItemTypes.ATTR_ASSOCIATED}
                >
                  <FragmentComponent attributes={fragment} type={ItemTypes.ATTR_REMAINING} />
                </DraggableCard>
              ))}
              {map(distributedAttrModels.ATTR_REMAINING.attrs, (attribute, id) => (
                <DraggableCard
                  shadow={2}
                  value={attribute}
                  key={`attribute-${id}`}
                  isFragment={false}
                  draggableToContainerType={ItemTypes.ATTR_ASSOCIATED}
                >
                  <AttributeModelComponent attribute={attribute} type={ItemTypes.ATTR_REMAINING} />
                </DraggableCard>
              ))}
            </ContainerCard>
          </div>
        </div>
        <Card style={style}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="modelattr.form.action.back" />}
              mainButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}
export default DragDropContext(HTML5Backend)(ModelAttributeFormComponent)
