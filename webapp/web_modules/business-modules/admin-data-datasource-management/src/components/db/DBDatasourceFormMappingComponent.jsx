/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import includes from 'lodash/includes'
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { ScrollHelper } from '@regardsoss/scroll'
import { DataManagementShapes } from '@regardsoss/shape'
import { ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender, PositionedDialog } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { IDBDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import DBDatasourceStepperComponent from './DBDatasourceStepperComponent'
import ConnectionViewerComponent from '../ConnectionViewerComponent'
import StaticAttributeListDB from '../../domain/db/StaticAttributeListDB'
import DynamicAttributeListDB from '../../domain/db/DynamicAttributeListDB'
import { PARAMETER_ATTRIBUTE_KEY_ENUM } from '../../domain/db/ParameterAttributeKeyEnum'
import DBDatasourceFormMappingFromTableComponent from './DBDatasourceFormMappingFromTableComponent'
import AspirationModeComponent, { ASPIRATION_MODE_ENUM, SELECTED_PLUGIN_PARAMETER_ENUM } from './AspirationModeComponent'
import DBDatasourceFormMappingCustomComponent from './DBDatasourceFormMappingCustomComponent'
import states from '../../domain/db/FormMappingStates'

const { findParam } = PluginConfParamsUtils

export class DBDatasourceFormMappingComponent extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    isEditing: PropTypes.bool,
    isSingleTable: PropTypes.bool,
    handleBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTableSelected: PropTypes.func.isRequired,
    tableList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      schema: PropTypes.string,
      pKey: PropTypes.string,
    })),
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentTableSelected: {
      fullname: '', // ex: schema.table
      name: '', // ex: table
    },
    selectedAspirationMode: ASPIRATION_MODE_ENUM.NONE,
    confirmDialog: {
      open: false,
      submitCallback: null,
      message: '',
    },
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    const {
      isEditing, isSingleTable, initialize, currentDatasource,
    } = this.props
    // Initialize forms inputs
    if (isEditing) {
      const attributesMapping = get(findParam(currentDatasource, IDBDatasourceParamsEnum.MAPPING), 'value', [])
      // Manage uniqueId attribute.
      // if uniqueId parameter is not set in currentDatasource then whe need to have checkbox checked.
      const uniqueIdAttribute = findParam(currentDatasource, PARAMETER_ATTRIBUTE_KEY_ENUM.UNIQUE_ID)
      let attributes = {}
      if (!uniqueIdAttribute) {
        attributes = {
          [PARAMETER_ATTRIBUTE_KEY_ENUM.UNIQUE_ID]: true,
        }
      }
      let newState = { ...this.state }
      if (isSingleTable) {
        const { tableAttributeList } = this.props
        forEach(attributesMapping, (attributeMapping) => {
          // Check if the value provided by attributeMapping.nameDs exists in table attributes
          const existingTable = find(tableAttributeList, (tableAttribute) => tableAttribute.name === attributeMapping.nameDS)
          attributes[attributeMapping.name] = {
            tableAttribute: existingTable ? attributeMapping.nameDS : '',
            sql: existingTable ? '' : attributeMapping.nameDS,
          }
        })
        // Initialise state
        const tableFullName = findParam(currentDatasource, IDBDatasourceParamsEnum.TABLE).value || ''
        newState = {
          ...newState,
          currentTableSelected: {
            fullname: tableFullName,
            name: includes(tableFullName, '.') ? tableFullName.split('.')[1] : tableFullName,
          },
          selectedAspirationMode: this.getSelectedAspirationMode(attributesMapping),
        }
        const obj = {
          [states.FROM_TABLE]: {
            table: tableFullName,
            attributes,
          },
        }
        initialize(obj)
      } else {
        const fromClause = get(findParam(currentDatasource, IDBDatasourceParamsEnum.FROM_CLAUSE), 'value')
        forEach(attributesMapping, (attributeMapping) => {
          attributes[attributeMapping.name] = {
            sql: attributeMapping.nameDS,
          }
        })
        // Initialise state
        newState = {
          ...newState,
          selectedAspirationMode: this.getSelectedAspirationMode(attributesMapping),
        }
        const obj = {
          [states.CUSTOM_FROM]: {
            fromClause,
            attributes,
          },
        }
        initialize(obj)
      }
      this.setState(newState)
    }
  }

  getSelectedAspirationMode = (attributesMapping) => {
    let selectedAspirationMode = ASPIRATION_MODE_ENUM.NONE
    forEach(attributesMapping, (attributeMapping) => {
      if (attributeMapping.name === SELECTED_PLUGIN_PARAMETER_ENUM[ASPIRATION_MODE_ENUM.BY_DATE]) {
        selectedAspirationMode = ASPIRATION_MODE_ENUM.BY_DATE
      } else if (attributeMapping.name === SELECTED_PLUGIN_PARAMETER_ENUM[ASPIRATION_MODE_ENUM.BY_ID]) {
        selectedAspirationMode = ASPIRATION_MODE_ENUM.BY_ID
      }
    })
    return selectedAspirationMode
  }

  /**
   * Concat schema name to table name
   * @param {*} tableName : ex : table1
   * @returns ex : schema1.table1
   */
  getTableFullName = (tableName) => {
    const { tableList } = this.props
    const tableFound = find(tableList, (table) => table.name === tableName)
    const tableFoundSchema = get(tableFound, 'schema', '')
    const tableFullName = [tableFoundSchema, tableName].filter((c) => !!c).join('.')
    return tableFullName
  }

  handleTableSelected = (tableName) => {
    this.props.onTableSelected(tableName)
    const { isSingleTable } = this.props
    // Save the table name if we are in single table configuration
    if (isSingleTable) {
      const tableFullName = this.getTableFullName(tableName)
      this.setState({
        currentTableSelected: {
          fullname: tableFullName,
          name: tableName,
        },
      })
      const formValues = {
        table: tableFullName,
        attributes: {},
      }
      this.props.initialize({
        [states.FROM_TABLE]: formValues,
      })
    }
  }

  handleSave = (values, e, reduxProps) => {
    const { onSubmit, modelAttributeList, isSingleTable } = this.props
    const { intl: { formatMessage } } = this.context
    const registeredFieldsKeys = keys(reduxProps.registeredFields).toString()
    let formValuesSubset
    if (isSingleTable) {
      formValuesSubset = values[states.FROM_TABLE]
    } else {
      formValuesSubset = values[states.CUSTOM_FROM]
    }

    // Filter values with registered fields. Only registered fields values are sent to backend.
    const formAttributes = get(formValuesSubset, 'attributes')
    const filtertedFormValuesSubset = {
      ...formValuesSubset,
      attributes: formAttributes ? reduce(formAttributes, (acc, value, key) => {
        if (includes(registeredFieldsKeys, key)) {
          return {
            ...acc,
            [key]: value,
          }
        }
        return acc
      }, {}) : null,
    }

    // Display a warning dialog if :
    // - no selected aspiration mode
    // - selected apiration mode but field values are empty
    let selectedAspirationMode = ASPIRATION_MODE_ENUM.NONE
    if (includes(registeredFieldsKeys, SELECTED_PLUGIN_PARAMETER_ENUM[ASPIRATION_MODE_ENUM.BY_DATE])) {
      selectedAspirationMode = ASPIRATION_MODE_ENUM.BY_DATE
    } else if (includes(registeredFieldsKeys, SELECTED_PLUGIN_PARAMETER_ENUM[ASPIRATION_MODE_ENUM.BY_ID])) {
      selectedAspirationMode = ASPIRATION_MODE_ENUM.BY_ID
    }
    const fieldValues = get(filtertedFormValuesSubset, `attributes.${SELECTED_PLUGIN_PARAMETER_ENUM[selectedAspirationMode]}`)
    const noValues = !(get(fieldValues, 'tableAttribute')) && !(get(fieldValues, 'sql'))

    const modelAttributeDynAndStaticList = {
      ...modelAttributeList,
      ...DynamicAttributeListDB,
      ...StaticAttributeListDB,
    }
    // Save submit call back to be used by dialog confirm action
    const onSubmitCallback = () => onSubmit(filtertedFormValuesSubset, modelAttributeDynAndStaticList)

    if (selectedAspirationMode === ASPIRATION_MODE_ENUM.NONE || noValues) {
      const message = selectedAspirationMode === ASPIRATION_MODE_ENUM.NONE ? formatMessage({ id: 'datasource.form.mapping.dialog.message.no.aspiration' }) : formatMessage({ id: 'datasource.form.mapping.dialog.message.no.aspiration.value' })
      this.openDialog(onSubmitCallback, message)
    } else {
      onSubmitCallback()
    }
  }

  openDialog = (submitCallback, message) => {
    const { confirmDialog: { open } } = this.state
    this.setState({
      confirmDialog: {
        open: !open,
        submitCallback,
        message,
      },
    })
  }

  closeDialog = () => {
    this.setState({
      confirmDialog: {
        open: false,
        submitCallback: null,
        message: '',
      },
    }, () => ScrollHelper.scrollTo(0, 200))
  }

  renderConfirmDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { confirmDialog: { open, message, submitCallback } } = this.state
    if (open) {
      return (
        <PositionedDialog
          title={formatMessage({ id: 'datasource.form.mapping.dialog.title' })}
          actions={<>
            <FlatButton
              key="cancel"
              id="confirm.dialog.cancel"
              label={formatMessage({ id: 'datasource.form.mapping.dialog.action.close' })}
              onClick={this.closeDialog}
            />
            <FlatButton
              key="confirm"
              id="confirm.dialog.confirm"
              label={formatMessage({ id: 'datasource.form.mapping.dialog.action.confirm' })}
              onClick={submitCallback}
            />
          </>}
          modal
          open
          dialogWidthPercent={40}
          dialogHeightPercent={1}
        >
          <div>
            {message}
          </div>
        </PositionedDialog>
      )
    }
    return null
  }

  render() {
    const {
      isSingleTable, handleBack, tableList, tableAttributeList, modelAttributeList, change, currentDatasource, isEditing, submitting, invalid,
    } = this.props
    const { currentTableSelected, selectedAspirationMode } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        db: {
          formMapping: {
            mainDivStyle, connextionViewerDivStyle, dbFormDivStyle, aspirationModeCardStyle, cardActionsDivStyle,
          },
        },
      },
    } = this.context

    return (
      <form>
        <Card>
          <CardTitle
            title={formatMessage({ id: 'datasource.form.mapping.title' })}
            subtitle={formatMessage({ id: 'datasource.form.mapping.subtitle' })}
          />
          <DBDatasourceStepperComponent stepIndex={2} />
        </Card>
        <div style={mainDivStyle}>
          <div style={connextionViewerDivStyle}>
            <Card>
              <ConnectionViewerComponent
                tableAttributeList={tableAttributeList}
                tableList={tableList}
                onTableSelected={this.handleTableSelected}
                initialTableOpen={isSingleTable ? currentTableSelected.name : null}
                displayTableAsSelected={isSingleTable}
              />
            </Card>
          </div>
          <div style={dbFormDivStyle}>
            <ShowableAtRender
              show={(isSingleTable && currentTableSelected.name.length > 0) || !isSingleTable}
            >
              <Card style={aspirationModeCardStyle}>
                <AspirationModeComponent
                  tableAttributeList={tableAttributeList}
                  currentDatasource={currentDatasource}
                  change={change}
                  isEditing={isEditing}
                  onlyAdvancedConfiguration={!isSingleTable}
                  selectedAspirationMode={selectedAspirationMode}
                />
              </Card>
            </ShowableAtRender>
            <ShowableAtRender
              show={isSingleTable && currentTableSelected.name.length > 0}
            >
              <Card>
                <DBDatasourceFormMappingFromTableComponent
                  table={tableList[currentTableSelected.name]}
                  tableAttributeList={tableAttributeList}
                  modelAttributeList={modelAttributeList}
                  currentDatasource={currentDatasource}
                  change={change}
                  isEditing={isEditing}
                />
              </Card>
            </ShowableAtRender>
            <ShowableAtRender
              show={!isSingleTable}
            >
              <Card>
                <DBDatasourceFormMappingCustomComponent
                  tableAttributeList={tableAttributeList}
                  modelAttributeList={modelAttributeList}
                  change={change}
                  isEditing={isEditing}
                />
              </Card>
            </ShowableAtRender>
          </div>
        </div>
        <Card style={cardActionsDivStyle}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'datasource.form.mapping.action.save' })}
              mainButtonClick={this.props.handleSubmit(this.handleSave)}
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={formatMessage({ id: 'datasource.form.mapping.action.cancel' })}
              secondaryButtonClick={handleBack}
            />
          </CardActions>
        </Card>
        {this.renderConfirmDialog()}
      </form>
    )
  }
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
  if (!keys(values).length) {
    // Workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (values[states.CUSTOM_FROM]) {
    errors[states.CUSTOM_FROM] = {}
    if (!values[states.CUSTOM_FROM].fromClause) {
      errors[states.CUSTOM_FROM].fromClause = ErrorTypes.REQUIRED
    }
  } else if (values[states.FROM_TABLE]) {
    errors[states.FROM_TABLE] = {}
    if (!values[states.FROM_TABLE].table) {
      errors[states.FROM_TABLE].table = ErrorTypes.REQUIRED
    }
  }
  return errors
}

export default reduxForm({
  form: 'datasource-mapping-form',
  validate,
})(DBDatasourceFormMappingComponent)
