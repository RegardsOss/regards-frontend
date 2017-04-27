export const InternalFragment = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
})

const Fragment = React.PropTypes.shape({
  content: InternalFragment.isRequired,
})

export default Fragment
