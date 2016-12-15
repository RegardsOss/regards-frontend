const NOT_TESTED = Symbol('The connection has not been tested yet')
const PENDING = Symbol('The connection is being established')
const SUCCESS = Symbol('The connection has successfuly been established')
const WARNING = Symbol('The connection could be established but errors occured')
const ERROR = Symbol('The connection could not be established')

export default { NOT_TESTED, PENDING, SUCCESS, WARNING, ERROR }
