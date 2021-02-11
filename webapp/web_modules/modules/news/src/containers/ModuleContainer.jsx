/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import NewsItemComponent from '../components/NewsItemComponent'

/**
 * Show the list of public visible projects
 */
class NewsListContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // newsList: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    // const { newsList } = this.props
    const { moduleTheme } = this.context
    const newsListfgdfj = [{
      pubDate: 'Thu, 22 Sep 2016 13:59:00 GMT',
      title: 'Vidéo du vendredi : Le mystère des rayons cosmiques',
      description: 'Lorem ipsum dolor sit amet, consecte, pellentesque lobortis odio.',
      link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
    }, {
      pubDate: 'Thu, 22 Sep 2016 13:59:00 GMT',
      title: 'Vidéo du vendredi : Le mystère des rayons cosmiques',
      description: 'Lorem ipsum dolor sit amet, consecte, pellentesque lobortis odio.',
      link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
    }, {
      pubDate: 'Thu, 22 Sep 2016 13:59:00 GMT',
      title: 'Vidéo du vendredi : Le mystère des rayons cosmiques',
      description: 'Lorem ipsum dolor sit amet, consecte, pellentesque lobortis odio.',
      link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
    }]
    return (
      <div className="row" style={moduleTheme.splitNews}>
        {map(newsListfgdfj, (news, id) => (
          <div
            key={id}
            className="col-sm-30"
          >
            <NewsItemComponent
              news={news}
            />
          </div>
        ))}
      </div>
    )
  }
}
export default NewsListContainer
