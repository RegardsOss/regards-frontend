import { map } from 'lodash'
import { grey200 } from 'material-ui/styles/colors'
import ProjectComponent from '../components/ProjectComponent'
import { FormattedMessage } from 'react-intl'

/**
 * Show the list of users for the current project
 */
class ProjectListComponent extends React.Component {
  /**
   * @type {{projects: *, theme: *}}
   */
  static propTypes = {
    projects: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string)),
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { projects } = this.props
    const { muiTheme } = this.context
    const projectssdfsdf = []
    projectssdfsdf.push(
      {
        name: 'CDPP',
        projectId: 'azertyuio',
        description: "Viking was the first Swedish satellite. It was successfully launched from Kourou (French Guiana) by Ariane 1 on February 22, 1986. The satellite was placed into a final 817 km x 13,527 km polar orbit with an inclination of 98.8° and a period of 262 mn. This orbit thus allowed the spacecraft to spend 208 mn in the region between 4000 and 14000 km above the Earth's surface on the geomagnetic field lines leading down to the northern auroral zone. The satellite spinned at a rate of about 3 rpm with its spin axis perpendicular to the orbital plane (cartwheel mode).   The nominal life time of the satellite was 8 months ; it sent data for about 15 months, until May 1987. There is one data taking period per orbit ; its duration is up to 160 minutes.",
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/futurama/350/350/1',
      })
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )
    projectssdfsdf.push(
      {
        name: 'CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP - CDPP',
        projectId: 'azertyuio',
        description: 'There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        isAccessible: false,
        icon: 'http://lorempicsum.com/simpsons/350/350/5',
      },
    )

    const style = {
      betweenProjects: muiTheme.portalApp.homepage.betweenProjects,
      titleListProjects: {
        lineHeight: '60px',
        fontSize: '37px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: grey200,
        fontWeight: 300,
        letterSpacing: '6.3px',
        fontFamily: muiTheme.fontFamily,
        textDecoration: 'underline',
        marginTop: '40px',
        marginBottom: '30px',
      },
    }
    return (
      <div>
        <h1
          style={style.titleListProjects}
        >
          <FormattedMessage id="title" />
        </h1>
        {map(projectssdfsdf, (project, id) => (
          <div
            style={style.betweenProjects}
            key={id}
            className="col-md-70 col-md-offset-15"
          >
            <ProjectComponent
              project={project}
              isAccessible={id === 0}
            />
          </div>
        ))}
      </div>
    )
  }
}
export default ProjectListComponent

