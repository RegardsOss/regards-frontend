/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { CardActionsComponent, HelpMessageComponent, ShowableAtRender } from '@regardsoss/components'
import map from 'lodash/map'
import keys from 'lodash/keys'
import size from 'lodash/size'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  Table, TableBody, TableRow, TableRowColumn,
} from 'material-ui/Table'
import { DataManagementShapes } from '@regardsoss/shape'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import ContainerCard from './ContainerCard'
import ItemTypes from './ItemTypes'
import DraggableCard from './DraggableCard'
import AttributeModelComponent from './AttributeModelComponent'
import FragmentComponent from './FragmentComponent'
import ModelAttributeContainer from '../containers/ModelAttributeContainer'
import moduleStyles from '../styles/styles'

const AttributeAndFragmentPartition = PropTypes.shape({
  fragments: PropTypes.objectOf(DataManagementShapes.AttributeModelArray),
  attrs: DataManagementShapes.AttributeModelArray,
})

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
    currentModel: DataManagementShapes.Model.isRequired,
    distributedAttrModels: PropTypes.shape({
      ATTR_REMAINING: AttributeAndFragmentPartition,
      ATTR_ASSOCIATED: AttributeAndFragmentPartition,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onDrop = (entityDroppedTo, isFragment, entity) => {
    if (isFragment) {
      const { fragment } = entity[keys(entity)[0]].content
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
    const style = moduleStyles(this.context.muiTheme)

    return (
      <div>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'modelattr.edit.title' }, { name: this.props.currentModel.content.name })}
          />
          <CardText>
            <HelpMessageComponent
              message={this.context.intl.formatMessage({ id: 'modelattr.edit.description' })}
            />
          </CardText>
        </Card>

        <div style={style.twoColumnsSameHeight}>
          <div>
            <ContainerCard
              acceptAttrType={ItemTypes.ATTR_ASSOCIATED}
              title={this.context.intl.formatMessage({ id: 'modelattr.edit.modelname' }, { name: this.props.currentModel.content.name })}
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
                  />
                </DraggableCard>
              ))}

              <ShowableAtRender
                show={size(distributedAttrModels.ATTR_ASSOCIATED.fragments) === 0 && size(distributedAttrModels.ATTR_ASSOCIATED.attrs) === 0}
              >
                <Table
                  selectable={false}
                >
                  <TableBody
                    displayRowCheckbox={false}
                    preScanRows={false}
                    showRowHover={false}
                  >
                    <TableRow>
                      <TableRowColumn>
                        {this.context.intl.formatMessage({ id: 'modelattr.edit.noAttrLink' })}
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
                </Table>
              </ShowableAtRender>
            </ContainerCard>
          </div>
          <div>
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
