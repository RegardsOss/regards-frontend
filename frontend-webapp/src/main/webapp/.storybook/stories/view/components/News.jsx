import { storiesOf } from '@kadira/storybook'
import { NewsItemComponent } from '@regardsoss/components'
import { withKnobs, select, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import withStore from '../../decorators/withStore'

storiesOf('Generic components - News', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('', () => {
    // Example: https://cnes.fr/fr/feed
    const news = object('News list', {
      pubDate: 'Thu, 22 Sep 2016 13:59:00 GMT',
      title: 'Vidéo du vendredi : Le mystère des rayons cosmiques',
      description: 'Lorem ipsum dolor sit amet, consecte, pellentesque lobortis odio.',
      link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
    })
    return (
      <NewsItemComponent
        news={news}
      />
    )
  })
