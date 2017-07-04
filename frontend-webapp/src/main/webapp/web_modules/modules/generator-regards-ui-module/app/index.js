/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Yeoman generator to create REGARDS UI plugins.
 * @author Sébastien Binda
 */
const Generator = require('yeoman-generator')

module.exports = class extends Generator {

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      required: true,
      message: 'Your module name',
      default: this.appname, // Default to current folder name
    }, {
      type: 'input',
      name: 'description',
      required: true,
      message: 'Simple description of your module',
    }, {
      type: 'input',
      name: 'author',
      required: true,
      message: 'Module author name',
    }, {
      type: 'input',
      name: 'company',
      required: true,
      message: 'Module author company',
    }, {
      type: 'input',
      name: 'licence',
      required: true,
      message: 'Module description page url',
      default: 'GPL-V3',
    },
    ]).then((answers) => {
      this.answers = answers
    })
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('module'),
      this.destinationPath(this.answers.name),
      this.answers)
  }

}
