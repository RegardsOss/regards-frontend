/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Datasource, ModelAttribute } from '@regardsoss/model'
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

export class DatasourceFormMappingComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
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
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
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
    const currentTableSelected = props.isEditing && props.isSingleTable ? props.currentDatasource.content.tableName : ''
    this.state = {
      currentTableSelected,
    }
  }

  componentDidMount() {
    const { currentTableSelected } = this.state
    // Initialize forms inputs
    if (this.props.isEditing) {
      if (this.props.isSingleTable) {
        const { currentDatasource, tableAttributeList } = this.props
        const attributes = {}
        forEach(currentDatasource.content.mapping.attributesMapping, (attributeMapping) => {
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
        const { currentDatasource } = this.props
        const attributes = {}
        forEach(currentDatasource.content.mapping.attributesMapping, (attributeMapping) => {
          attributes[attributeMapping.name] = {
            sql: attributeMapping.nameDS,
          }
        })
        const obj = {
          [states.CUSTOM_FROM]: {
            fromClause: currentDatasource.content.fromClause,
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
    const { isSingleTable, handleBack, tableList, tableAttributeList, modelAttributeList, change, currentDatasource, isEditing, submitting, invalid } = this.props
    const { currentTableSelected } = this.state
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
                      currentDatasource={currentDatasource}
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


/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) {
  const errors = {}
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
