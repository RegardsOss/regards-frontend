import URL from '../common/URL'

const Project = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: URL,
    licenseLink: URL,
    isDeleted: PropTypes.bool.isRequired,
    isPublic: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
  }),
})

export default Project
