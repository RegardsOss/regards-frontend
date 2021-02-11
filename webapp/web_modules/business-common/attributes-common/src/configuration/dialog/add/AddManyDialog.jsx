/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import SelectAllIcon from 'mdi-material-ui/CheckboxMarked'
import UnselectAllIcon from 'mdi-material-ui/CheckboxBlankOutline'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import { PositionedDialog } from '@regardsoss/components'
import AttributeSelectionComponent from './AttributeSelectionComponent'

/**
 * Add many elements at once dialog
 * @author Raphaël Mechali
 */
class AddManyDialog extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    initialSelectionModel: PropTypes.arrayOf(AttributeSelectionComponent.AttributeSelectionModel), // used in onPropertiesUpdated only
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { initialSelectionModel } = newProps
    if (oldProps.initialSelectionModel !== initialSelectionModel) {
      this.onSelectionModelChanged(initialSelectionModel ? [...initialSelectionModel] : [])
    }
  }

  /** Inner callback : selection model updated */
  onSelectionModelChanged = (selectionModel) => {
    this.setState({
      selectionModel,
      someSelected: selectionModel.some((attributeSelectionModel) => attributeSelectionModel.selected),
    })
  }

  /**
   * Callback: user clicked confirm option, propage event to parent
   */
  onConfirm = () => {
    const { onConfirm } = this.props
    const { selectionModel } = this.state
    onConfirm(selectionModel)
  }

  /**
   * Callback: user toggled selected state for attribute at index
   * @param {number} index attribute index
   */
  onToggleAttributeSelection = (index) => this.onSelectionModelChanged(
    this.state.selectionModel.map(({ attributeModel, selected }, listIndex) => ({
      attributeModel,
      selected: index === listIndex ? !selected : selected,
    })))

  /** Callback: user clicked unselect all button */
  onUnselectAll = () => this.onSelectionModelChanged(this.state.selectionModel.map(({ attributeModel }) => ({
    attributeModel,
    selected: false,
  })))

  /** Callback: user clicked select all button */
  onSelectAll = () => this.onSelectionModelChanged(this.state.selectionModel.map(({ attributeModel }) => ({
    attributeModel,
    selected: true,
  })))

  render() {
    const { onCancel } = this.props
    const { selectionModel, someSelected } = this.state
    const {
      intl: { formatMessage },
      moduleTheme: {
        configuration: {
          addManyDialog: {
            widthPercent,
            heightPercent,
            dialogBodyStyle,
            contentStyle,
            scrollableAreaStyle,
            actionsStyle,
          },
        },
      },
    } = this.context
    return (
      <PositionedDialog
        dialogWidthPercent={widthPercent}
        dialogHeightPercent={heightPercent}
        bodyStyle={dialogBodyStyle}
        title={formatMessage({ id: 'attribute.configuration.add.many.items.title' })}
        open={selectionModel.length > 0}
        modal
      >
        <div style={contentStyle}>
          <ScrollArea
            vertical
            style={scrollableAreaStyle}
          >
            { /** Show all attributes selectors */
              selectionModel.map((attributeSelectionModel, index) => (
                <AttributeSelectionComponent
                  key={attributeSelectionModel.attributeModel.content.jsonPath}
                  index={index}
                  attribute={attributeSelectionModel}
                  onToggleAttributeSelection={this.onToggleAttributeSelection}
                />
              ))
            }
          </ScrollArea>
        </div>
        <div style={actionsStyle}>
          {/* First group: select / unselect all */}
          <FlatButton
            icon={someSelected ? <UnselectAllIcon /> : <SelectAllIcon />}
            label={formatMessage({
              id: someSelected
                ? 'attribute.configuration.add.many.items.select.none.label'
                : 'attribute.configuration.add.many.items.select.all.label',
            })}
            onClick={someSelected ? this.onUnselectAll : this.onSelectAll}
          />
          {/* Second group: confirm cancel options */}
          <div>
            <FlatButton
              label={formatMessage({ id: 'attribute.configuration.cancel.edition' })}
              onClick={onCancel}
            />
            <FlatButton
              label={formatMessage({ id: 'attribute.configuration.confirm.edition' })}
              onClick={this.onConfirm}
              disabled={!someSelected}
            />
          </div>
        </div>
      </PositionedDialog>
    )
  }
}
export default AddManyDialog
