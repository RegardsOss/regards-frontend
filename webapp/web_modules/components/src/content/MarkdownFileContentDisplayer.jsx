/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

  static DEFAULT_MD_VIEWER_OPTIONS = {
    html: true,
    xhtmlOut: true,
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
          <ReactMarkdown
            source={source}
            options={MarkdownFileContentDisplayer.DEFAULT_MD_VIEWER_OPTIONS}
          />
        </div>
      </ScrollArea>
    )
  }
}

export default withModuleStyle(styles)(MarkdownFileContentDisplayer)
