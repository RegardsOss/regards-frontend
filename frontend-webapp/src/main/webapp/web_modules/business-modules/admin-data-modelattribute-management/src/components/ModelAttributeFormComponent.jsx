/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import keys from 'lodash/keys'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AttributeModel, Model, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import ContainerCard from './ContainerCard'
import ItemTypes from './ItemTypes'
import DraggableCard from './DraggableCard'
import AttributeModelComponent from './AttributeModelComponent'
import FragmentComponent from './FragmentComponent'
import ModelAttributeContainer from '../containers/ModelAttributeContainer'
import moduleStyles from '../styles/styles'

/**
 * Display edit and create attribute model form
 */
export class ModelAttributeFormComponent extends React.Component {

  static propTypes = {
    onCreateFragment: PropTypes.func.isRequired,
    onDeleteFragment: PropTypes.func.isRequired,
    onCreateAttributeModel: PropTypes.func.isRequired,
    onDeleteAttributeModel: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    currentModel: Model.isRequired,
    distributedAttrModels: PropTypes.shape({
      ATTR_REMAINING: PropTypes.shape({
        fragments: PropTypes.objectOf(PropTypes.arrayOf(AttributeModel)),
        attrs: PropTypes.arrayOf(AttributeModel),
      }),
      ATTR_ASSOCIATED: PropTypes.shape({
        fragments: PropTypes.objectOf(PropTypes.arrayOf(AttributeModel)),
        attrs: PropTypes.arrayOf(AttributeModel),
      }),
    }).isRequired,
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
    const { backUrl, distributedAttrModels, pluginConfigurationList, pluginMetaDataList } = this.props
    const style = moduleStyles(this.context.muiTheme)

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
                  <FragmentComponent
                    attributes={fragment}
                    type={ItemTypes.ATTR_ASSOCIATED}
                    pluginConfigurationList={pluginConfigurationList}
                    pluginMetaDataList={pluginMetaDataList}
                  />
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
                  <ModelAttributeContainer
                    attribute={attribute}
                    pluginConfigurationList={pluginConfigurationList}
                    pluginMetaDataList={pluginMetaDataList}
                  />
                </DraggableCard>
              ))}
            </ContainerCard>
          </div>
          <div className="col-sm-50">
            <ContainerCard
              acceptAttrType={ItemTypes.ATTR_REMAINING}
              title={this.context.intl.formatMessage({ id: 'modelattr.edit.remainingAttr' })}
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
        <Card style={style.cardEspaced}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'modelattr.form.action.back' })}
              mainButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}
export default DragDropContext(HTML5Backend)(ModelAttributeFormComponent)
