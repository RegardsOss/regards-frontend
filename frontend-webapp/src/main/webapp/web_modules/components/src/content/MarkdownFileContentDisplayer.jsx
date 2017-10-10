/**
 * LICENSE_PLACEHOLDER
 **/

import ReactMarkdown from 'react-remarkable'
import './styles/github-markdown-styles.css'

class MarkdownFileContentDisplayer extends React.Component {

  static propTypes = {
    source: PropTypes.string.isRequired,
  }

  render() {

    return (
      <div className="markdown-body">
        <ReactMarkdown source={this.props.source} />
      </div>
    )
  }
}

export default MarkdownFileContentDisplayer