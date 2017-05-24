const Account = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    lastName: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    status: PropTypes.string,
  }),
})

export default Account
