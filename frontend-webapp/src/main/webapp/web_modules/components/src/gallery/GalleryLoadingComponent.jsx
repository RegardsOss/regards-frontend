/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Table loader component, shown in table sub header area
*/
class GalleryLoadingComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context
    return (
      <div>
        <CircularProgress
          size={header.loading.size}
          thickness={header.loading.thickness}
          color={header.loading.color}
        />{formatMessage({ id: 'table.loading.message' })}
      </div>
    )
  }
}
export default GalleryLoadingComponent
