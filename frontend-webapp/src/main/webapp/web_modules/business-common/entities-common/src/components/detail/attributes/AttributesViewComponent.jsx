/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { i18nContextType } from '@regardsoss/i18n'
import NoDataIcon from 'material-ui/svg-icons/device/widgets'
import { NoContentMessageInfo } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import TagsViewComponent from '../tags/TagsViewComponent'

/**
 * Attributes view component
 */
class AttributesViewComponent extends React.Component {

  static propTypes = {
    contentHeight: PropTypes.number.isRequired,
    // entity information API
    entityLabel: PropTypes.string,
    // entity attributes, empty array allowed
    attributes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      renderer: PropTypes.func.isRequired,
      renderValue: PropTypes.any,
    })).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    // Callback to run a new search with given tag
    onSearchTag: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { entityLabel, attributes, contentHeight } = this.props
    const { muiTheme } = this.context
    return (
      <NoContentMessageInfo
        noContent={!attributes.length}
        title={this.context.intl.formatMessage({ id: 'entities.common.attributes.no.value.title' })}
        message={<FormattedMessage
          id="entities.common.attributes.no.value.message"
          values={{ entityLabel }}
        />
        }
        Icon={NoDataIcon}
      >
        <Table
          fixedHeader
          selectable={false}
          height={`${contentHeight - muiTheme.tableHeaderColumn.height}px`}

        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn><FormattedMessage id="entities.common.attributes.column.label" /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage id="entities.common.attributes.column.value" /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={false}
            stripedRows={false}
          >
            {attributes.map(({ id, label, renderer: Renderer, renderValue }) => (
              <TableRow key={id}>
                <TableRowColumn>{label}</TableRowColumn>
                <TableRowColumn>{
                  renderValue ?
                    (<Renderer attributes={renderValue} />) :
                    (<FormattedMessage id="entities.common.attribute.cell.no.value" />)
                }</TableRowColumn>
              </TableRow>
            ))}
            <TableRow>
              <TableRowColumn
                colSpan="2"
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <TagsViewComponent
                  tags={this.props.tags}
                  onSearchTag={this.props.onSearchTag}
                />
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </NoContentMessageInfo>)
  }
}
export default AttributesViewComponent
