/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { ScrollArea } from '@regardsoss/adapters'
import ReactMarkdown from 'react-remarkable'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { UIDomain } from '@regardsoss/domain'
import '../styles/github-markdown-styles.css'
import { MeasureResultProvider } from '@regardsoss/display-control'
import styles from '../styles'

export class MarkdownFileContentDisplayer extends React.Component {
  static propTypes = {
    // source: content or URL
    source: PropTypes.string,
    // style to dimension / decorate the component (must keep display:block to avoid unexpected behaviors)
    style: PropTypes.objectOf(PropTypes.any),
    // MD viewer options
    options: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    style: {
      flexGrow: 1,
      flexShrink: 1,
    },
    options: MarkdownFileContentDisplayer.DEFAULT_MD_VIEWER_OPTIONS,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /** Default options for the viewer */
  static DEFAULT_MD_VIEWER_OPTIONS = {
    html: true,
    xhtmlOut: true,
  }

  static EXPANDABLE_BODY_LAYOUT_STYLES = {
    display: 'flex',
  }

  /**
   * Is supported content type for this component?
   * @param {string} contentType to test
   * @return {boolean} true if content type is supported, false otherwise
   */
  static isSupportedContentType(contentType) {
    return UIDomain.DisplayHelpers.isMarkdownMimeType(contentType)
  }

  render() {
    const { source, style, options } = this.props
    const { moduleTheme: { fileContent: { markdown: { scrollbarStyle, scrollableContent } } } } = this.context
    return (
      <MeasureResultProvider style={style} targetPropertyName="style">
        <ScrollArea
          contentStyle={scrollableContent} // content style (preserving display:'relative' style)
          verticalScrollbarStyle={scrollbarStyle}
          horizontal={false}
          vertical
        >
          {/* Markdown style injector */}
          <div className="markdown-body">
            {/* Markdown render */}
            <ReactMarkdown
              source={source}
              options={options}
            />
          </div>
        </ScrollArea>
      </MeasureResultProvider>
    )
  }
}

export default withModuleStyle(styles)(MarkdownFileContentDisplayer)
