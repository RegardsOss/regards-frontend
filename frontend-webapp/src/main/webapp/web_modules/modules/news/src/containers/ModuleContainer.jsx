/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { NewsItemComponent } from '@regardsoss/components'

/**
 * Show the list of public visible projects
 */
class NewsListContainer extends React.Component {
  static propTypes = {
    newsList: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  render() {
    // const { newsList } = this.props
    const { muiTheme } = this.context
    const styleBetweenNews = muiTheme.portalApp.modules.homepage.splitNews
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
      <div className="row" style={styleBetweenNews}>
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

