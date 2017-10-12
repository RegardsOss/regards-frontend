/**
* LICENSE_PLACEHOLDER
**/
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import Measure from 'react-measure'
import { MarkdownFileContentDisplayer, NoContentMessageInfo, IFrameURLContentDisplayer } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import LoadingDisplayerComponent from '../LoadingDisplayerComponent'

/**
* Description file component
*/
class DescriptionFileComponent extends React.Component {

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    // description file URL, when it should be accessed through URL
    descriptionFileURL: PropTypes.string,
    // Description file when it should be accessed by content
    descriptionFile: PropTypes.shape({
      entityId: PropTypes.string.isRequired, // IP ID
      contentType: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount = () => this.updateDisplayAreaStyle(0, 0)

  onSizeChanged = ({ width, height }) => this.updateDisplayAreaStyle(width, height)

  updateDisplayAreaStyle = (width, height) => this.setState({ displayAreaStyle: { width, height } })

  render() {
    const { loading, descriptionFileURL, descriptionFile } = this.props
    const { intl: { formatMessage } } = this.context
    const { rootStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.descriptionTab

    const { displayAreaStyle } = this.state
    return (
      <Measure onMeasure={this.onSizeChanged}>
        <div style={rootStyle}>
          {
            (function renderContent() {
              if (loading) {
                return <LoadingDisplayerComponent message={formatMessage({ id: 'entities.common.description.loading' })} />
              }

              if (descriptionFileURL) {
                // render iFrame
                return <IFrameURLContentDisplayer style={displayAreaStyle} contentURL={descriptionFileURL} />
              }
              if (descriptionFile) {
                // render MD
                return <MarkdownFileContentDisplayer heightToFit={displayAreaStyle.height} source={descriptionFile.content} />
              }
              // render no data (no need for child here)
              return (
                <NoContentMessageInfo
                  noContent
                  title={formatMessage({ id: 'entities.common.description.no.value.title' })}
                  message={formatMessage({ id: 'entities.common.description.no.value.message' })}
                  Icon={NoDataIcon}
                >
                  <div />
                </NoContentMessageInfo >)
            }())
          }
        </div>
      </Measure>
    )
  }
}
export default DescriptionFileComponent

