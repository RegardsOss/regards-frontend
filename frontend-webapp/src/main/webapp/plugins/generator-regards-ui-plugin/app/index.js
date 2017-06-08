/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Yeoman generator to create REGARDS UI plugins.
 * @author Sébastien Binda
 */
var Generator = require('yeoman-generator')

module.exports = class extends Generator {

  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      required: true,
      message : 'Your plugin name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'list',
      name    : 'type',
      required: true,
      message : 'What kind of plugin do you want to create?',
      choices : [{name:"UI Search form criteria",value:"CRITERIA"},{name:"UI Catalog Service",value:"SERVICE"}]
    }, {
      when: function (response) {
        return response.type === 'SERVICE';
      },
      type    : 'list',
      name    : 'target',
      required: true,
      message : "Target entities of your Catalog Service",
      choices : [
        {name:"Service applies to dataset",value:"DATASET"},
        {name:"Service applies to a selection of datas",value:"DATAOBJECTS"},
        {name:"Service applies to a unique selected data",value:"DATAOBJECT"}
        ]
    },{
      type    : 'input',
      name    : 'description',
      required: true,
      message : "Simple description of your plugin"
    }, {
      type    : 'input',
      name    : 'author',
      required: true,
      message : "Plugin author name"
    }, {
      type    : 'input',
      name    : 'email',
      required: true,
      message : "Plugin author email"
    }, {
      type    : 'input',
      name    : 'company',
      required: true,
      message : "Plugin author company"
    }, {
      type    : 'input',
      name    : 'url',
      required: true,
      message : "Plugin description page url"
    }, {
      type    : 'input',
      name    : 'licence',
      required: true,
      message : "Plugin description page url",
      default : 'GPL-V3'
    }
    ]).then((answers) => {
      this.answers = answers
    })
  }

  writing() {
    const pluginDirectory = this.answers.type === 'CRITERIA' ? 'criteria-plugin' : 'service-plugin'
    this.fs.copyTpl(
      this.templatePath(pluginDirectory),
      this.destinationPath(`${this.answers.name}-regards-ui-plugin`),
      this.answers
    )
  }

}