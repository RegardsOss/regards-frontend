/**
 * LICENSE_PLACEHOLDER
 **/

import { ScrollArea } from '@regardsoss/adapters'
import ReactMarkdown from 'react-remarkable'
import './styles/github-markdown-styles.css'


class MarkdownFileContentDisplayer extends React.Component {

  static propTypes = {
    source: PropTypes.string.isRequired,
    // optionals, specifies the viewport height
    heightToFit: PropTypes.number,
  }

  static EXPANDABLE_BODY_LAYOUT_STYLES = {
    display: 'flex',
  }

  /** Scrollbar styles. XXX-V2 we'd need to correlate it with selected markdown styles, yet it is not possible! */
  static SCROLLBAR_STYLES = {
    background: '#0366d6',
    borderRadius: '3px',
    width: '6px',
  }

  render() {
    const { source, heightToFit } = this.props
    const scrollAreaStyle = { height: heightToFit } // undefined if none
    const scrollContentStyle = { ...MarkdownFileContentDisplayer.EXPANDABLE_BODY_LAYOUT_STYLES, minHeight: heightToFit } // undefined if none
    return (
      <ScrollArea
        style={scrollAreaStyle}
        contentStyle={scrollContentStyle}
        verticalScrollbarStyle={MarkdownFileContentDisplayer.SCROLLBAR_STYLES}
        horizontal={false}
        vertical
      >
        <div className="markdown-body">
          <ReactMarkdown source={source} />
        </div>
      </ScrollArea>
    )
  }
}

export default MarkdownFileContentDisplayer
