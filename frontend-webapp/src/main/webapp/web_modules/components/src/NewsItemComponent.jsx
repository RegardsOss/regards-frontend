/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import CardActionsComponent from './cards/CardActionsComponent'

const DATETIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

/**
 * Show the list of users for the current project
 */
function NewsItemComponent(props) {
  const styleText = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxHeight: '5.2em',
    lineHeight: '1.3em',
    textAlign: 'justify',
  }
  const styleTitle = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

  }
  const { news } = props
  const { intl: { formatDate } } = this.context
  const pubDate = formatDate(news.pubDate, DATETIME_OPTIONS)
  return (
    <Card>
      <CardTitle
        title={news.title}
        titleStyle={styleTitle}
        subtitle={pubDate}
      />
      <CardText>
        <div style={styleText}>
          { news.description }
        </div>
      </CardText>
      <CardActions>
        <CardActionsComponent
          mainButtonLabel="See more"
          mainButtonUrl={news.link}
        />
      </CardActions>
    </Card>
  )
}
NewsItemComponent.propTypes = {
  news: PropTypes.objectOf(PropTypes.string),
}
export default NewsItemComponent

