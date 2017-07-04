/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Table loader component, shown in table sub header area
*/
class TableLoadingComponent extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context
    return (
      <div style={header.loading.styles}>
        <CircularProgress
          size={header.loading.progress.size}
          thickness={header.loading.progress.thickness}
          color={header.loading.progress.color}
        />
        <div style={header.text.styles}>
          {formatMessage({ id: 'table.loading.message' })}
        </div>
      </div>
    )
  }
}
export default TableLoadingComponent
