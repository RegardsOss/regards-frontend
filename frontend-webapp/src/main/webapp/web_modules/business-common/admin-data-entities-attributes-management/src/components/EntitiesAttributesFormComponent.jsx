/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import EntitiesAttributeFormComponent from './EntitiesAttributeFormComponent'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributesFormComponent extends React.Component {

  static propTypes = {
    // TODO dataset or collection
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isDisplayAttributeValue: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { modelAttributeList, isDisplayAttributeValue } = this.props
    return (
      <ShowableAtRender show={isDisplayAttributeValue}>
        <Table
          selectable={false}
        >
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn><FormattedMessage id="dataset.form.table.fragmentAndLabel" /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage id="dataset.form.table.type" /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage id="dataset.form.table.value" /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            preScanRows={false}
            showRowHover
          >
            {map(modelAttributeList, (modelAttribute, id) => (
              <EntitiesAttributeFormComponent
                key={id}
                modelAttribute={modelAttribute}
              />
            ))}
          </TableBody>
        </Table>
      </ShowableAtRender>
    )
  }
}


export default EntitiesAttributesFormComponent
