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
import { fieldArrayFieldsPropTypes } from 'redux-form'
import identity from 'lodash/identity'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableLayout, TableHeaderLine, TableHeaderContentBox, TableHeaderText,
  InfiniteTableContainer, TableColumnBuilder, NoContentComponent,
} from '@regardsoss/components'
import UnselectDocumentModelOptionComponent from './UnselectDocumentModelOptionComponent'
import SelectDocumentModelOptionComponent from './SelectDocumentModelOptionComponent'

/**
 * Field array component to select / unselect document models from data models
 * @author Raphaël Mechali
 */
class DocumentModelsFieldArrayComponent extends React.Component {
  static propTypes = {
    dataModelNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** No data component for data models table */
  static NO_DATA_MODEL_COMPONENT = <NoContentComponent titleKey="ui.admin.settings.no.data.model.title" />

  /** No data component for document models table */
  static NO_DOCUMENT_MODEL_COMPONENT = <NoContentComponent
    titleKey="ui.admin.settings.no.document.model.title"
    messageKey="ui.admin.settings.no.document.model.message"
  />

  /**
   * Lifecycle method: component will mount. Used here to initialize columns lists
   */
  UNSAFE_componentWillMount() {
    this.dataModelColumns = [
      new TableColumnBuilder('name').valuesRenderCell([{ getValue: identity }]).build(), // render model name
      new TableColumnBuilder('options').optionsColumn([{ // add as document model option
        OptionConstructor: SelectDocumentModelOptionComponent,
        optionProps: { onSelectDocumentModel: this.onSelectDocumentModelOptionComponent },
      }]).fixedColumn(false).build(),
    ]
    this.documentModelColumns = [
      new TableColumnBuilder('options').optionsColumn([{ // remove from document models option
        OptionConstructor: UnselectDocumentModelOptionComponent,
        optionProps: { onUnselectDocumentModel: this.onUnselectDocumentModelOptionComponent },
      }]).fixedColumn(false).build(),
      new TableColumnBuilder('name').valuesRenderCell([{ getValue: identity }]).build(), // render model name
    ]
  }

  /**
   * Callback: user transeferred a datamodel into document models
   * @param {string} dataModelName -
   */
  onSelectDocumentModelOptionComponent = (dataModelName) => {
    const { fields } = this.props
    fields.push(dataModelName)
  }

  /**
   * Callback: user transeferred a datamodel into document models
   * @param {index} documentModelIndex -
   */
  onUnselectDocumentModelOptionComponent = (documentModelIndex) => {
    const { fields } = this.props
    fields.remove(documentModelIndex)
  }

  render() {
    const { dataModelNames, fields } = this.props
    const { intl: { formatMessage }, moduleTheme: { documentModels } } = this.context
    const documentModelNames = fields.getAll()
    const remainingDataModelNames = dataModelNames.filter((m) => !documentModelNames.includes(m))
    return (
      <div style={documentModels.root}>
        {/* 1 - Left table: data models */}
        <div style={documentModels.tableHolder}>
          <TableLayout>
            <TableHeaderLine>
              {/* 1.A - Header message */}
              <TableHeaderContentBox>
                <TableHeaderText text={formatMessage({ id: 'ui.admin.settings.data.models.header' }, { count: remainingDataModelNames.length })} />
              </TableHeaderContentBox>
            </TableHeaderLine>
            {/* 1.B - Table render */}
            <InfiniteTableContainer
              columns={this.dataModelColumns}
              entities={remainingDataModelNames}
              emptyComponent={DocumentModelsFieldArrayComponent.NO_DATA_MODEL_COMPONENT}
              displayColumnsHeader={false}
              minRowCount={documentModels.fitTableRowsCount}
              maxRowCount={documentModels.fitTableRowsCount}
            />
          </TableLayout>
        </div>
        {/* 2. Tables separator */}
        <div style={documentModels.separator} />
        {/* 3 - Right table: document models */}
        <div style={documentModels.tableHolder}>
          <TableLayout>
            <TableHeaderLine>
              {/* 3.A - Header message */}
              <TableHeaderContentBox>
                <TableHeaderText text={formatMessage({ id: 'ui.admin.settings.document.models.header' }, { count: documentModelNames.length })} />
              </TableHeaderContentBox>
            </TableHeaderLine>
            {/* 3.B - Table render */}
            <InfiniteTableContainer
              columns={this.documentModelColumns}
              entities={documentModelNames}
              emptyComponent={DocumentModelsFieldArrayComponent.NO_DOCUMENT_MODEL_COMPONENT}
              displayColumnsHeader={false}
              minRowCount={documentModels.fitTableRowsCount}
              maxRowCount={documentModels.fitTableRowsCount}
            />
          </TableLayout>
        </div>
      </div>
    )
  }
}
export default DocumentModelsFieldArrayComponent
