import URL from '../common/URL'

const Project = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    icon: URL,
    license: URL,
    isDeleted: PropTypes.bool,
    isPublic: PropTypes.bool,
    name: PropTypes.string,
  }),
})

export default Project
