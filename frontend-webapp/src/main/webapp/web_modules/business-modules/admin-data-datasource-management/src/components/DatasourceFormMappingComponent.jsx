/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import get from 'lodash/get'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { reduxForm } from 'redux-form'
import { DataManagementShapes } from '@regardsoss/shape'
import { ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatasourceStepperComponent from './DatasourceStepperComponent'
import ConnectionViewerComponent from './ConnectionViewerComponent'
import StaticAttributeList from './StaticAttributeList'
import DatasourceFormMappingFromTableComponent from './DatasourceFormMappingFromTableComponent'
import DatasourceFormMappingCustomComponent from './DatasourceFormMappingCustomComponent'
import states from './FormMappingStates'
import { findParam, IDBDatasourceParamsEnum } from '../IDBDatasourceParamsUtils'

export class DatasourceFormMappingComponent extends React.Component {
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

  constructor(props) {
    super(props)
    const currentTableSelected = props.isEditing && props.isSingleTable ? findParam(props.currentDatasource, IDBDatasourceParamsEnum.TABLE).value : ''
    this.state = {
      currentTableSelected,
    }
  }

  componentDidMount() {
    // Initialize forms inputs
    if (this.props.isEditing) {
      const { currentDatasource } = this.props
      const attributesMapping = get(findParam(currentDatasource, IDBDatasourceParamsEnum.MODEL), 'value.attributesMapping', [])
      if (this.props.isSingleTable) {
        const { tableAttributeList } = this.props
        const { currentTableSelected } = this.state
        const attributes = {}
        forEach(attributesMapping, (attributeMapping) => {
          // Check if the value provided by attributeMapping.nameDs exists in table attributes
          const existingTable = find(tableAttributeList, tableAttribute => tableAttribute.name === attributeMapping.nameDS)
          attributes[attributeMapping.name] = {
            tableAttribute: existingTable ? attributeMapping.nameDS : '',
            sql: existingTable ? '' : attributeMapping.nameDS,
          }
        })
        const obj = {
          [states.FROM_TABLE]: {
            table: currentTableSelected,
            attributes,
          },
        }
        this.props.initialize(obj)
      } else {
        const fromClause = get(findParam(currentDatasource, IDBDatasourceParamsEnum.FROM_CLAUSE), 'value')
        const attributes = {}
        forEach(attributesMapping, (attributeMapping) => {
          attributes[attributeMapping.name] = {
            sql: attributeMapping.nameDS,
          }
        })
        const obj = {
          [states.CUSTOM_FROM]: {
            fromClause,
            attributes,
          },
        }
        this.props.initialize(obj)
      }
    }
  }


  handleTableSelected = (tableName) => {
    this.props.onTableSelected(tableName)
    const { isSingleTable } = this.props
    // Save the table name if we are in single table configuration
    if (isSingleTable) {
      this.setState({
        currentTableSelected: tableName,
      })
      const formValues = {
        table: tableName,
        attributes: {},
      }
      this.props.initialize({
        [states.FROM_TABLE]: formValues,
      })
    }
  }

  handleSave = (values) => {
    const { onSubmit, modelAttributeList, tableAttributeList } = this.props
    let formValuesSubset
    if (this.props.isSingleTable) {
      formValuesSubset = values[states.FROM_TABLE]
    } else {
      formValuesSubset = values[states.CUSTOM_FROM]
    }
    const modelAttributeDynAndStaticList = {
      ...modelAttributeList,
      ...StaticAttributeList,
    }
    onSubmit(formValuesSubset, modelAttributeDynAndStaticList, tableAttributeList)
  }

  render() {
    const {
      isSingleTable, handleBack, tableList, tableAttributeList, modelAttributeList, change, currentDatasource, isEditing, submitting, invalid,
    } = this.props
    const { currentTableSelected } = this.state
    const cardEspaced = {
      marginTop: '20px',
    }
    return (
      <form>
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'datasource.form.mapping.title' })}
            subtitle={this.context.intl.formatMessage({ id: 'datasource.form.mapping.subtitle' })}
          />
          <DatasourceStepperComponent stepIndex={2} />
        </Card>
        <div style={cardEspaced} className="row">
          <ShowableAtRender
            show={isSingleTable}
          >
            <div>
              <div className="col-sm-30">
                <Card>
                  <ConnectionViewerComponent
                    tableAttributeList={tableAttributeList}
                    tableList={tableList}
                    onTableSelected={this.handleTableSelected}
                    initialTableOpen={currentTableSelected}
                    displayTableAsSelected
                  />
                </Card>
              </div>
              <div className="col-sm-68 col-sm-offset-2">
                <ShowableAtRender
                  show={currentTableSelected.length > 0}
                >
                  <Card>
                    <div>
                      <DatasourceFormMappingFromTableComponent
                        table={tableList[currentTableSelected]}
                        tableAttributeList={tableAttributeList}
                        modelAttributeList={modelAttributeList}
                        currentDatasource={currentDatasource}
                        change={change}
                        isEditing={isEditing}
                      />
                    </div>
                  </Card>
                </ShowableAtRender>
              </div>
            </div>
          </ShowableAtRender>
          <ShowableAtRender
            show={!isSingleTable}
          >
            <div className="row">
              <div className="col-sm-30">
                <Card>
                  <ConnectionViewerComponent
                    tableAttributeList={tableAttributeList}
                    tableList={tableList}
                    onTableSelected={this.handleTableSelected}
                    initialTableOpen={currentTableSelected}
                  />
                </Card>
              </div>
              <div className="col-sm-68 col-sm-offset-2">
                <Card>
                  <div>
                    <DatasourceFormMappingCustomComponent
                      table={tableList[currentTableSelected]}
                      tableAttributeList={tableAttributeList}
                      modelAttributeList={modelAttributeList}
                      change={change}
                      isEditing={isEditing}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </ShowableAtRender>
        </div>
        <Card style={cardEspaced}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.mapping.action.save' })}
              mainButtonTouchTap={this.props.handleSubmit(this.handleSave)}
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.form.mapping.action.cancel' })}
              secondaryButtonTouchTap={handleBack}
            />
          </CardActions>
        </Card>
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
})(DatasourceFormMappingComponent)
