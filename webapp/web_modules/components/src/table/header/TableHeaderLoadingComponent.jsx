/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import TableHeaderContentBox from './TableHeaderContentBox'
import TableHeaderText from './TableHeaderText'

/**
* Table loader component, shown in table sub header area
*/
class TableHeaderLoadingComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context
    return (
      <TableHeaderContentBox>
        <CircularProgress
          size={header.loading.size}
          thickness={header.loading.thickness}
          color={header.loading.color}
        />
        <TableHeaderText
          text={formatMessage({ id: 'table.loading.message' })}
        />
      </TableHeaderContentBox>
    )
  }
}
export default TableHeaderLoadingComponent
