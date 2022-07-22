module.exports = function (mode) {
  switch (mode) {
    case 'prod':
      return 'production'
    case 'dev':
      return 'development'
    case 'test':
    case 'coverage':
      return 'test'
    default:
      throw new Error('Unexpected mode')
  }
}
