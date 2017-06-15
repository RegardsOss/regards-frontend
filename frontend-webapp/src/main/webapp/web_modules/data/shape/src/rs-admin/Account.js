/**
 * LICENSE_PLACEHOLDER
 **/
const Account = PropTypes.shape({
  content: PropTypes.shape({
    id: PropTypes.number,
    lastName: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    status: PropTypes.string,
  }),
})

const AccountList = PropTypes.objectOf(Account)


export default { Account, AccountList }
