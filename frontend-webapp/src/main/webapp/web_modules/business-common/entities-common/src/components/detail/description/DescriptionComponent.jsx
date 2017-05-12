/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import NoDataIcon from 'material-ui/svg-icons/device/wallpaper'
import ReactMarkdown from 'react-markdown'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import { NoContentMessageInfo, IFrameURLContentDisplayer } from '@regardsoss/components'

/**
* Description view component
*/
class DescriptionViewComponent extends React.Component {

  static propTypes = {
    contentHeight: PropTypes.number.isRequired,
    // entity information API
    entityLabel: PropTypes.string,
    // description file URL, when it should be accessed through URL
    descriptionFileURL: PropTypes.string,
    // Description file when it should be accessed by content
    descriptionFile: PropTypes.shape({
      entityId: PropTypes.number.isRequired,
      contentType: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { entityLabel, descriptionFileURL, descriptionFile, contentHeight } = this.props
    const { moduleTheme: { markdownContainer, scrollArea } } = this.context
    return (
      <NoContentMessageInfo
        noContent={!descriptionFile && !descriptionFileURL}
        title={<FormattedMessage id="entities.common.description.no.value.title" />}
        message={<FormattedMessage
          id="entities.common.description.no.value.message"
          values={{ entityLabel }}
        />
        }
        Icon={NoDataIcon}
      >
        <div style={{ height: contentHeight }}>
          {
            // render content
            (() => {
              if (descriptionFileURL) {
                return <IFrameURLContentDisplayer contentURL={descriptionFileURL} />
              }
              if (descriptionFile) {
                return (
                  <ScrollArea
                    horizontal={false}
                    vertical
                    style={scrollArea.styles}
                  >
                    <div style={markdownContainer.styles}>
                      <ReactMarkdown source={descriptionFile.content} />
                    </div>
                  </ScrollArea>)
              }
              return <div />
            })()
          }
        </div>
      </NoContentMessageInfo >
    )
  }
}
export default DescriptionViewComponent
