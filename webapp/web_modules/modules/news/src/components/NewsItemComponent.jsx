/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { CardActionsComponent } from '@regardsoss/components'

const DATETIME_OPTIONS = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
}

/**
 * Displays a news item
 * @Léo Mieulet
 * @author Raphaël Mechali
 */
class NewsItemComponent extends React.Component { // TODO A degager dans news...
  static propTypes = {
    news: PropTypes.objectOf(PropTypes.string), // TODO <<< peut faire mieux en typage...
  }

  static TEXT_STYLE = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxHeight: '5.2em',
    lineHeight: '1.3em',
    textAlign: 'justify',
  }

  static TITLE_STYLE = {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }

  render() {
    const { news } = this.props
    const { intl: { formatDate } } = context
    const pubDate = formatDate(news.pubDate, DATETIME_OPTIONS)
    return (
      <Card>
        <CardTitle
          title={news.title}
          titleStyle={NewsItemComponent.TITLE_STYLE}
          subtitle={pubDate}
        />
        <CardText>
          <div style={NewsItemComponent.TEXT_STYLE}>
            {news.description}
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
}
export default NewsItemComponent
