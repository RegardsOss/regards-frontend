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
import size from 'lodash/size'
import FlatButton from 'material-ui/FlatButton'
import AddManyIcon from 'mdi-material-ui/PlaylistPlus'
import AddOneIcon from 'mdi-material-ui/Plus'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableNoDataMessage,
} from '@regardsoss/components'
import AttributesRender from './AttributesRender'
import DeleteOption from './options/DeleteOption'
import EditOption from './options/EditOption'

/**
 * This component shows currently configured attribute list and edition options in a table
 * @author Raphaël Mechali
 */
class AttributeListTableComponent extends React.Component {
  static propTypes = {
    hintMessageKey: PropTypes.string.isRequired,
    attributesList: AccessShapes.AttributeListConfigurationModel,
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    allowAttributesGroups: PropTypes.bool.isRequired,
    allowLabel: PropTypes.bool.isRequired,

    // callbacks
    // on show add one item dialog: () => ()
    onAddOneItem: PropTypes.func.isRequired,
    // on show add many items dialog: () => ()
    onAddManyItems: PropTypes.func.isRequired,
    // on show edit dialog: (itemIndex:number) => ()
    onEdit: PropTypes.func.isRequired,
    // on show delete dialog: (itemIndex:number) => ()
    onDelete: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Builds table columns
   * @return {[*]} Table columns
   */
  buildColumns = () => {
    const {
      allowAttributesGroups, attributeModels, allowLabel, onEdit, onDelete,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - Direct label column (that renders attributes label) when label group functionality is disabled on columns
      new TableColumnBuilder('label').titleHeaderCell().visible(!allowAttributesGroups)
        .label(formatMessage({ id: 'attributes.configuration.label.simple.column' }))
        .rowCellDefinition({
          Constructor: AttributesRender,
          props: {
            attributeModels,
          },
        })
        .build(),
      // 2 - English label when label functionnality is enabled for columns
      new TableColumnBuilder('label.en').titleHeaderCell().visible(allowLabel)
        .propertyRenderCell('label.en')
        .label(formatMessage({ id: 'attributes.configuration.label.english.column' }))
        .build(),
      // 3 - French label when label functionnality is enabled for columns
      new TableColumnBuilder('label.fr').titleHeaderCell().visible(allowLabel)
        .propertyRenderCell('label.fr')
        .label(formatMessage({ id: 'attributes.configuration.label.french.column' }))
        .build(),
      // 4 - Attributes column, when groups are allowed
      new TableColumnBuilder('attributes').titleHeaderCell().visible(allowAttributesGroups)
        .label(formatMessage({ id: 'attributes.configuration.attributes.column' }))
        .rowCellDefinition({
          Constructor: AttributesRender,
          props: {
            attributeModels,
          },
        })
        .build(),
      // 5 - Options columns
      new TableColumnBuilder().optionsColumn([{
        // 1 - edit option
        OptionConstructor: EditOption,
        optionProps: { onEdit },
      }, {
        // 2 - delete option
        OptionConstructor: DeleteOption,
        optionProps: { onDelete },
      }]).build(),
    ]
  }

  render() {
    const {
      hintMessageKey, attributesList, attributeModels, onAddOneItem, onAddManyItems,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { tableContainer } } } = this.context
    return (
      <div style={tableContainer}>
        <TableLayout>
          <TableHeaderLine>
            {/* 1 - left spacer (unused) */}
            <div />
            {/* 2 - table options  */}
            <TableHeaderOptionsArea>
              <TableHeaderOptionGroup>
                {/* Add one element  */}
                <FlatButton
                  label={formatMessage({ id: 'attributes.configuration.add.one.item.label' })}
                  icon={<AddOneIcon />}
                  onClick={onAddOneItem}
                  disabled={!size(attributeModels)}
                />
                {/* Add many elements */}
                <FlatButton
                  label={formatMessage({ id: 'attributes.configuration.add.many.items.label' })}
                  icon={<AddManyIcon />}
                  onClick={onAddManyItems}
                  disabled={!size(attributeModels)}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          {/* 3. Table */}
          <InfiniteTableContainer
            columns={this.buildColumns()}
            emptyComponent={<TableNoDataMessage messageKey={hintMessageKey} />}
            entities={attributesList}
            minRowCount={0} // let the table grow and shrink with list elements count
            maxRowCount={Number.MAX_SAFE_INTEGER}
          />
        </TableLayout>
      </div>
    )
  }
}
export default AttributeListTableComponent
