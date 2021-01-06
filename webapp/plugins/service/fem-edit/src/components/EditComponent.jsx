/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import reject from 'lodash/reject'
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import size from 'lodash/size'
import map from 'lodash/map'
import without from 'lodash/without'
import concat from 'lodash/concat'
import { DataManagementShapes } from '@regardsoss/shape'
import RaisedButton from 'material-ui/RaisedButton'
import MinusIcon from 'mdi-material-ui/Minus'
import AddIcon from 'mdi-material-ui/Plus'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { EntitiesAttributesFormContainer } from '@regardsoss/admin-data-entities-attributes-management'
import { getFullQualifiedAttributeName } from '@regardsoss/domain/dam'
import { ShowableAtRender } from '@regardsoss/components'
import withForm from '../containers/withForm'
import AttributeSelectorComponent from './AttributeSelectorComponent'

/**
 * Main fem-edit plugin container
 * @author C-S
 */
export class EditComponent extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    attributeModelList: DataManagementShapes.AttributeModelArray,
    entitiesCount: PropTypes.number.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    autofill: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access through this.context
    ...i18nContextType,
  }

  static attributeModelToModelAttribute(attributeModelList) {
    const result = {}
    forEach(attributeModelList, (attributeModel, i) => {
      result[i] = {
        content: {
          id: i,
          attribute: {
            ...attributeModel.content,
            // Force optional, as we do not force the user to set a value for each property
            optional: true,
          },
          model: {
            id: -1,
            name: 'Model',
            description: 'Model description',
            type: 'DATA',
          },
        },
        links: attributeModel.links,
      }
    },
    )
    return result
  }

  state = {
    modelAttributeList: {},
    modelAttributeSelected: [],
    hasSelectedAttributes: false,
    hasSelectedAllAttributes: false,
  }

  /**
   * Lifecycle hook: create attribute list
   */
  componentDidMount = () => {
    const { attributeModelList } = this.props
    const { modelAttributeSelected } = this.state
    this.computeModelAttributes(attributeModelList, modelAttributeSelected)
  }

  /**
   * Lifecycle hook: update attribute list
   * @param {*} nextProps
   */
  UNSAFE_componentWillReceiveProps = ({ attributeModelList: nextAttributeModelList }) => {
    const { attributeModelList } = this.props
    const { modelAttributeSelected } = this.state
    if (attributeModelList !== nextAttributeModelList && nextAttributeModelList) { // refetch on parent change, if showable
      this.computeModelAttributes(nextAttributeModelList, modelAttributeSelected)
    }
  }

  /**
   *
   * @param attributeModelList
   */
  computeModelAttributes = (attributeModelList, modelAttributeSelected) => {
    if (!isEmpty(attributeModelList)) {
      const modelAttributeList = EditComponent.attributeModelToModelAttribute(this.getMappableAttributes(attributeModelList, modelAttributeSelected))
      const hasSelectedAttributes = size(modelAttributeSelected) > 0
      const hasSelectedAllAttributes = size(modelAttributeSelected) === size(attributeModelList)
      this.setState({
        modelAttributeList,
        modelAttributeSelected,
        hasSelectedAttributes,
        hasSelectedAllAttributes,
      })
    }
  }

  /**
   * Returns all attributes except the one :
   *  - not alterable
   *  - not inside modelAttributeSelected
   */
  getMappableAttributes = (attributeModelList, modelAttributeSelected) => {
    const a = reject(attributeModelList, (modelAttribute) => (
      !modelAttribute.content.alterable || !modelAttributeSelected.includes(modelAttribute.content.id)
    ))
    return a
  }

  onDeselect = (attributeModel) => {
    const { modelAttributeSelected } = this.state
    const { attributeModelList, autofill } = this.props

    const nextModelAttributeSelected = without(modelAttributeSelected, attributeModel.content.id)
    this.computeModelAttributes(attributeModelList, nextModelAttributeSelected)

    // Clear the field
    // https://github.com/redux-form/redux-form/issues/2325#issuecomment-487162582
    autofill(`properties.${attributeModel.content.fragment.name}.${attributeModel.content.name}`, undefined)
  }

  onSelect = (attributeModel) => {
    const { modelAttributeSelected } = this.state
    const { attributeModelList } = this.props

    const nextModelAttributeSelected = concat(modelAttributeSelected, [attributeModel.content.id])
    this.computeModelAttributes(attributeModelList, nextModelAttributeSelected)
  }

  renderAvailableAttributes = () => {
    const { modelAttributeSelected } = this.state
    const attributeModelList = filter(this.props.attributeModelList, (attributeModel) => (
      !modelAttributeSelected.includes(attributeModel.content.id)
    ))
    return this.renderAttributes(attributeModelList, <AddIcon />, this.onSelect)
  }

  renderSelectedAttributes = () => {
    const { modelAttributeSelected } = this.state
    const attributeModelList = filter(this.props.attributeModelList, (attributeModel) => (
      modelAttributeSelected.includes(attributeModel.content.id)
    ))
    return this.renderAttributes(attributeModelList, <MinusIcon />, this.onDeselect)
  }

  renderAttributes =(attributeModelList, icon, onClick) => (
    map(attributeModelList, (attributeModel) => (
      <AttributeSelectorComponent
        label={getFullQualifiedAttributeName(attributeModel.content)}
        attributeModel={attributeModel}
        onClick={onClick}
        // node to show as filter icon
        icon={icon}
      />
    ))
  )

  render() {
    const { intl: { formatMessage }, moduleTheme } = this.context
    const {
      entitiesCount, onCancel, submitting, invalid,
    } = this.props
    const { modelAttributeList, hasSelectedAttributes, hasSelectedAllAttributes } = this.state
    const hasNoAttributes = isEmpty(modelAttributeList)
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div style={moduleTheme.body}>
          <div style={moduleTheme.contentWrapper}>
            <div style={moduleTheme.attributesWrapper}>
              <ShowableAtRender show={!hasSelectedAllAttributes}>
                {formatMessage({ id: 'plugin.list.editable' }, { nbElement: entitiesCount })}
                <div style={moduleTheme.attributesChipsWrapper}>
                  {this.renderAvailableAttributes()}
                </div>
              </ShowableAtRender>
              <ShowableAtRender show={hasSelectedAttributes}>
                {formatMessage({ id: 'plugin.list.editing' }, { nbElement: entitiesCount })}
                <div style={moduleTheme.attributesChipsWrapper}>
                  {this.renderSelectedAttributes()}
                </div>
              </ShowableAtRender>
            </div>
            <div style={moduleTheme.tableWrapper}>
              <EntitiesAttributesFormContainer
                isDisplayAttributeValue={hasSelectedAttributes}
                modelAttributeList={modelAttributeList}
                isEditing={false} // ignore this, we only pass alterable attrs
              />
            </div>
            <ShowableAtRender show={hasSelectedAttributes || hasNoAttributes}>
              <ShowableAtRender show={hasSelectedAttributes}>
                {formatMessage({ id: 'plugin.message' }, { nbElement: entitiesCount })}
                {formatMessage({ id: 'plugin.async.info' })}
                {formatMessage({ id: 'plugin.question' })}
              </ShowableAtRender>
              <ShowableAtRender show={hasNoAttributes}>
                {formatMessage({ id: 'plugin.error.no.attribute' }, { nbElement: entitiesCount })}
              </ShowableAtRender>
              <div style={moduleTheme.buttonsWrapper}>
                <RaisedButton
                  label={formatMessage({ id: 'plugin.cancel' })}
                  onClick={onCancel}
                />
                <RaisedButton
                  label={formatMessage({ id: 'plugin.valid' })}
                  primary
                  type="submit"
                  disabled={submitting || invalid || !hasSelectedAttributes}
                />
              </div>
            </ShowableAtRender>
          </div>
        </div>
      </form>
    )
  }
}

// redux form
export default withForm(EditComponent)
