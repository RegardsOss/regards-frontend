/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Gallery loading component, shown in footer
*/
class GalleryLoadingComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static styleLoadingGallery = {
    height: '45vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }


  render() {
    const { moduleTheme: { header }, intl: { formatMessage } } = this.context

    return (
      <div style={GalleryLoadingComponent.styleLoadingGallery}>
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
