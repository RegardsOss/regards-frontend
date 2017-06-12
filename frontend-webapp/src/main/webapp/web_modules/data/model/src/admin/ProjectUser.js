import { MetadataArray } from './Metadata'

const ProjectUser = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    role: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    email: PropTypes.string,
    lastConnection: PropTypes.date,
    status: PropTypes.string,
    lastUpdate: PropTypes.date,
    metadata: MetadataArray,
  }),
})


export default ProjectUser
