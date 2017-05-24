export const InternalFragment = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
})

const Fragment = PropTypes.shape({
  content: InternalFragment.isRequired,
})

export default Fragment
