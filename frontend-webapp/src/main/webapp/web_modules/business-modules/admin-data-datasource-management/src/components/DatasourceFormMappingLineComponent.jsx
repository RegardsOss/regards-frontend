/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { ModelAttribute } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field } from '@regardsoss/form-utils'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import states from './FormMappingStates'

export class DatasourceFormMappingLineComponent extends React.Component {

  static propTypes = {
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    modelAttribute: ModelAttribute,
    isStaticAttribute: PropTypes.bool,
    onlyAdvancedConfiguration: PropTypes.bool,
    isEditingSQL: PropTypes.bool,
    change: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      // Only used when onlyAdvancedConfiguration === false
      showAdvanced: props.isEditingSQL || false,
      prefix: props.onlyAdvancedConfiguration ? states.CUSTOM_FROM : states.FROM_TABLE,
    }
  }

  showIfOptional = (value) => {
    if (value) {
      return (<FormattedMessage id="datasource.form.mapping.table.optional.true" />)
    }
    return (<FormattedMessage id="datasource.form.mapping.table.optional.false" />)
  }

  handleToggleAdvanced = () => {
    const { modelAttribute } = this.props
    const { showAdvanced, prefix } = this.state
    const fieldSuffix = showAdvanced ? 'sql' : 'tableAttribute'
    this.props.change(`${prefix}.attributes.${modelAttribute.content.attribute.name}.${fieldSuffix}`, '')
    this.setState({
      showAdvanced: !showAdvanced,
    })
  }

  renderInputs = () => {
    const { modelAttribute, tableAttributeList, onlyAdvancedConfiguration } = this.props
    const { showAdvanced, prefix } = this.state
    if (onlyAdvancedConfiguration) {
      return (<div>
        <Field
          name={`${prefix}.attributes.${modelAttribute.content.attribute.name}.sql`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="datasource.form.mapping.table.input" />}
          multiLine
        />
      </div>)
    }
    return (<div>
      <Checkbox
        label={<FormattedMessage id="datasource.form.mapping.table.showAdvancedConfiguration" />}
        checked={showAdvanced}
        onTouchTap={this.handleToggleAdvanced}
      />
      <ShowableAtRender
        show={showAdvanced}
      >
        <Field
          name={`${prefix}.attributes.${modelAttribute.content.attribute.name}.sql`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={<FormattedMessage id="datasource.form.mapping.table.input" />}
          multiLine
        />
      </ShowableAtRender>
      <ShowableAtRender
        show={!showAdvanced}
      >
        <Field
          name={`${prefix}.attributes.${modelAttribute.content.attribute.name}.tableAttribute`}
          fullWidth
          component={RenderSelectField}
          type="text"
          label={<FormattedMessage id="datasource.form.mapping.table.select" />}
        >
          {map(tableAttributeList, (tableAttribute, id) => (
            <MenuItem
              value={tableAttribute.name}
              key={tableAttribute.name}
              primaryText={`${tableAttribute.name}: ${tableAttribute.javaSqlType}`}
            />
          ))}
        </Field>
      </ShowableAtRender>
    </div>)
  }

  renderFragmentName = () => {
    const { isStaticAttribute, modelAttribute } = this.props
    if (!isStaticAttribute) {
      return (
        <div>
          <FormattedMessage id="datasource.form.mapping.table.fragment" />          : {modelAttribute.content.attribute.fragment.name}
          <br />
        </div>
      )
    }
    return null
  }


  renderType = () => {
    const { isStaticAttribute, modelAttribute } = this.props
    if (!isStaticAttribute) {
      return (
        <div>
          <FormattedMessage id="datasource.form.mapping.table.type" />          : {modelAttribute.content.attribute.type}
          <br />
        </div>
      )
    }
    return null
  }


  render() {
    const { modelAttribute } = this.props

    return (
      <TableRow>
        <TableRowColumn>
          {this.renderFragmentName()}
          <FormattedMessage id="datasource.form.mapping.table.attrName" />          : {modelAttribute.content.attribute.name}
          <br />
          {this.renderType()}
          {this.showIfOptional(modelAttribute.content.attribute.optional)}
        </TableRowColumn>
        <TableRowColumn>
          {this.renderInputs()}
        </TableRowColumn>
      </TableRow>
    )
  }
}


export default DatasourceFormMappingLineComponent
