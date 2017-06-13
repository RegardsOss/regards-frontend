export const FragmentContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
})

const Fragment = PropTypes.shape({
  content: FragmentContent.isRequired,
})

const FragmentList = PropTypes.objectOf(Fragment)

export default {
  Fragment,
  FragmentContent,
  FragmentList,
}
