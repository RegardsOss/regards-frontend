import { storiesOf } from '@kadira/storybook'
import { withKnobs, select, object } from '@kadira/storybook-addon-knobs'
import { HomepageContainer } from '@regardsoss/portal/src/containers/HomepageContainer'
import NewsListContainer from '@regardsoss/portal/src/news/containers/NewsListContainer'
import ProjectListComponent from '@regardsoss/portal/src/projects/components/ProjectListComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

// Example: https://cnes.fr/fr/feed
const defaultNewsList = [{
  name: 'CDPP',
  projectId: 'azertyuio',
  description: "Viking was the first Swedish satellite. It was successfully launched from Kourou (French Guiana) by Ariane 1 on February 22, 1986. The satellite was placed into a final 817 km x 13,527 km polar orbit with an inclination of 98.8° and a period of 262 mn. This orbit thus allowed the spacecraft to spend 208 mn in the region between 4000 and 14000 km above the Earth's surface on the geomagnetic field lines leading down to the northern auroral zone. The satellite spinned at a rate of about 3 rpm with its spin axis perpendicular to the orbital plane (cartwheel mode).   The nominal life time of the satellite was 8 months ; it sent data for about 15 months, until May 1987. There is one data taking period per orbit ; its duration is up to 160 minutes.",
  isPublic: true,
  isAccessible: false,
  icon: 'http://lorempicsum.com/futurama/350/350/1',
}, {
  name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
  projectId: 'azertyuio',
  description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
  isPublic: true,
  isAccessible: false,
  icon: 'http://lorempicsum.com/simpsons/350/350/5',
}]

const defaultProjectList = [{
  pubDate: 'Thu, 22 Sep 2016 13:59:00 GMT',
  title: 'Vidéo du vendredi : Le mystère des rayons cosmiques',
  description: 'Lorem ipsum dolor sit amet, consecte, pellentesque lobortis odio.',
  link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
}, {
  title: 'News title',
  description: 'Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gonec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.',
  pubDate: 'Tue, 13 Sep 2016 09:45:00 GMT',
  link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
}, {
  title: 'Pollution spatiale : l’état d’urgence',
  description: 'L’heure de la rentrée littéraire a sonné ! En complément de la sélection officielle, Christophe Bonnal, expert senior au CNES, vient de faire paraître un ouvrage dans lequel il livre à la fois ses connaissances et son analyse sur la pollution spatiale. A découvrir.',
  pubDate: 'Thu, 15 Sep 2016 14:06:00 GMT',
  link: 'http://www.cnrs.fr/fr/science-direct/video/video.php#05/08/2016',
}]

storiesOf('Portal', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Project list', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/portal/src/i18n">
        <ProjectListComponent
          projects={defaultProjectList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('News list', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/portal/src/i18n">
        <NewsListContainer
          newsList={defaultNewsList}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('News + project list', () => {
    const themeName = addLocaleAndThemeSelectors()
    const newsList = object('News list', defaultNewsList)
    const projects = object('Project list', defaultProjectList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/portal/src/i18n">
        <HomepageContainer
          params=""
          newsList={newsList}
          projects={projects}
        />
      </ThemeAndLocaleDecorator>
    )
  })
