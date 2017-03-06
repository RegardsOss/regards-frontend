/**
 * LICENSE_PLACEHOLDER
 **/
import { find, forEach, keys } from 'lodash'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Datasource, ModelAttribute } from '@regardsoss/model'
import { ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Tabs, Tab } from 'material-ui/Tabs'
import DatasourceStepperComponent from './DatasourceStepperComponent'
import ConnectionViewerComponent from './ConnectionViewerComponent'
import DatasourceFormMappingFromTableComponent from './DatasourceFormMappingFromTableComponent'
import DatasourceFormMappingCustomComponent from './DatasourceFormMappingCustomComponent'
import states from './FormMappingStates'

export class DatasourceFormMappingComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    isEditing: React.PropTypes.bool,
    handleBack: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onTableSelected: React.PropTypes.func.isRequired,
    tableList: React.PropTypes.objectOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      schema: React.PropTypes.string,
      pKey: React.PropTypes.string,
    })),
    tableAttributeList: React.PropTypes.objectOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      javaSqlType: React.PropTypes.string,
      isPrimaryKey: React.PropTypes.bool,
    })),
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    let tabValue = states.NONE
    if (props.isEditing) {
      if (props.currentDatasource.content.tableName) {
        tabValue = states.FROM_TABLE
      } else {
        tabValue = states.CUSTOM_FROM
      }
    } else {
      tabValue = states.NONE
    }
    const currentTableSelected = props.isEditing && tabValue === states.FROM_TABLE ? props.currentDatasource.content.tableName : ''
    this.state = {
      tabValue,
      currentTableSelected,
    }
  }

  componentDidMount() {
    const { tabValue, currentTableSelected } = this.state
    // Initialize forms inputs
    if (this.props.isEditing) {
      if (tabValue === states.FROM_TABLE) {
        const { currentDatasource, tableAttributeList } = this.props
        const attributes = {}
        forEach(currentDatasource.content.mapping.attributesMapping, (attributeMapping) => {
          // Check if the value provided by attributeMapping.nameDs exists in table attributes
          const existingTable = find(tableAttributeList, tableAttribute => tableAttribute.name === attributeMapping.nameDS)
          attributes[attributeMapping.name] = {
            pk: attributeMapping.isPrimaryKey,
            tableAttribute: existingTable ? attributeMapping.nameDS : '',
            sql: existingTable ? '' : attributeMapping.nameDS,
          }
        })
        const obj = {
          [tabValue]: {
            table: currentTableSelected,
            attributes,
          },
        }
        this.props.initialize(obj)
      } else {
        const { currentDatasource } = this.props
        const attributes = {}
        forEach(currentDatasource.content.mapping.attributesMapping, (attributeMapping) => {
          attributes[attributeMapping.name] = {
            pk: attributeMapping.isPrimaryKey,
            sql: attributeMapping.nameDS,
          }
        })
        const obj = {
          [tabValue]: {
            fromClause: currentDatasource.content.fromClause,
            attributes,
          },
        }
        this.props.initialize(obj)
      }
    }
  }

  handleTabChange = (value) => {
    const { tabValue } = this.state
    if (tabValue !== value) {
      // Reset the form
      const obj = tabValue === states.FROM_TABLE ? {
        [states.CUSTOM_FROM]: {
          fromClause: `FROM ...
WHERE ...`,
        },
      } : {}
      this.props.initialize(obj)
      // Update the view
      this.setState({
        tabValue: value,
      })
    }
  };

  handleTableSelected = (tableName) => {
    this.props.onTableSelected(tableName)
    const { tabValue } = this.state
    // Save the table name if we are in states.FROM_TABLE
    if (tabValue === states.FROM_TABLE) {
      this.setState({
        currentTableSelected: tableName,
      })
      const formValues = {
        table: tableName,
        attributes: {},
      }
      this.props.initialize({
        [tabValue]: formValues,
      })
    }
  }

  handleSave = (values) => {
    const { onSubmit, modelAttributeList, tableAttributeList } = this.props
    const { tabValue } = this.state
    const formValuesSubset = values[tabValue]
    onSubmit(formValuesSubset, modelAttributeList, tableAttributeList)
  }

  render() {
    const { handleBack, tableList, tableAttributeList, modelAttributeList, change, currentDatasource, isEditing, submitting, invalid } = this.props
    const { tabValue, currentTableSelected } = this.state
    const cardEspaced = {
      marginTop: '20px',
    }
    return (
      <form>
        <Card>
          <CardTitle
            title={<FormattedMessage id="datasource.form.mapping.title" />}
            subtitle={<FormattedMessage id="datasource.form.mapping.subtitle" />}
          />
          <DatasourceStepperComponent stepIndex={2} />
        </Card>
        <Tabs
          value={tabValue}
          onChange={this.handleTabChange}
          style={cardEspaced}
        >
          <Tab label={<FormattedMessage id="datasource.form.mapping.from_table" />} value={states.FROM_TABLE} >
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
          </Tab>
          <Tab label={<FormattedMessage id="datasource.form.mapping.custom_from" />} value={states.CUSTOM_FROM}>
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
                      currentDatasource={currentDatasource}
                      change={change}
                      isEditing={isEditing}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </Tab>
        </Tabs>
        <Card style={cardEspaced}>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="datasource.form.mapping.action.save" />}
              mainButtonTouchTap={this.props.handleSubmit(this.handleSave)}
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="datasource.form.mapping.action.cancel" />}
              secondaryButtonTouchTap={handleBack}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}


function validatePrimaryKeys(errors, values, state) {
  if (values[state].attributes) {
    // eslint-disable-next-line no-param-reassign
    errors[state].attributes = {}
    let hasAlreadyPk = false
    forEach(values[state].attributes, (attribute, key) => {
      if (attribute.pk) {
        if (hasAlreadyPk) {
          // eslint-disable-next-line no-param-reassign
          errors[state].attributes[key] = {}
          // eslint-disable-next-line no-param-reassign
          errors[state].attributes[key].pk = 'invalid.only_one_pk_allowed'
        } else {
          hasAlreadyPk = true
        }
      }
    })
    // A pk is required
    if (!hasAlreadyPk) {
      forEach(values[state].attributes, (attribute, key) => {
        // eslint-disable-next-line no-param-reassign
        errors[state].attributes[key] = {}
        // eslint-disable-next-line no-param-reassign
        errors[state].attributes[key].pk = 'invalid.one_pk_required'
      })
    }
  }
  return errors
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  let errors = {}
  if (!keys(values).length) {
    // XXX workaround for redux form bug initial validation:
    // Do not return anything when fields are not yet initialized (first render invalid state is wrong otherwise)...
    return errors
  }
  if (values[states.CUSTOM_FROM]) {
    errors[states.CUSTOM_FROM] = {}
    if (!values[states.CUSTOM_FROM].fromClause) {
      errors[states.CUSTOM_FROM].fromClause = ErrorTypes.REQUIRED
    }
    // eslint-disable-next-line no-param-reassign
    errors = validatePrimaryKeys(errors, values, states.CUSTOM_FROM)
  } else if (values[states.FROM_TABLE]) {
    errors[states.FROM_TABLE] = {}
    if (!values[states.FROM_TABLE].table) {
      errors[states.FROM_TABLE].table = ErrorTypes.REQUIRED
    }
    // eslint-disable-next-line no-param-reassign
    errors = validatePrimaryKeys(errors, values, states.FROM_TABLE)
  }
  return errors
}

export default reduxForm({
  form: 'datasource-mapping-form',
  validate,
})(DatasourceFormMappingComponent)
