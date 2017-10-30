/**
 * LICENSE_PLACEHOLDER
 **/

import { ScrollArea } from '@regardsoss/adapters'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import ReactMarkdown from 'react-remarkable'
import './styles/github-markdown-styles.css'
import styles from './styles'

export class MarkdownFileContentDisplayer extends React.Component {

  static propTypes = {
    source: PropTypes.string.isRequired,
    // optionals, specifies the viewport height
    heightToFit: PropTypes.number,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static EXPANDABLE_BODY_LAYOUT_STYLES = {
    display: 'flex',
  }

  render() {
    const { source, heightToFit } = this.props
    const scrollAreaStyle = { height: heightToFit } // undefined if none
    const scrollContentStyle = { ...MarkdownFileContentDisplayer.EXPANDABLE_BODY_LAYOUT_STYLES, minHeight: heightToFit } // undefined if none
    const { moduleTheme: { markdown: { scrollbarStyle } } } = this.context
    return (
      <ScrollArea
        style={scrollAreaStyle}
        contentStyle={scrollContentStyle}
        verticalScrollbarStyle={scrollbarStyle}
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

export default withModuleStyle(styles)(MarkdownFileContentDisplayer)
