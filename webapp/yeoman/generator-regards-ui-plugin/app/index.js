/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
      message: 'Your plugin name',
      default: this.appname, // Default to current folder name
    }, {
      type: 'list',
      name: 'type',
      required: true,
      message: 'What kind of plugin do you want to create?',
      choices: [{ name: 'UI Search form criteria', value: 'CRITERIA' }, { name: 'UI Catalog Service', value: 'SERVICE' }],
    }, {
      when: response => response.type === 'SERVICE',
      type: 'checkbox',
      name: 'applicationModes',
      required: true,
      message: 'Does service apply to one entity, many entities or both?',
      choices: [
        { name: 'One entity only', value: 'ONE' },
        { name: 'Many entities', value: 'MANY' },
      ],
    }, {
      type: 'input',
      name: 'description',
      required: true,
      message: 'Simple description of your plugin',
    }, {
      type: 'input',
      name: 'author',
      required: true,
      message: 'Plugin author name',
      default: 'CNES (https://cnes.fr)',
    }, {
      type: 'input',
      name: 'email',
      required: true,
      message: 'Plugin author email',
    }, {
      type: 'input',
      name: 'company',
      required: true,
      message: 'Plugin author company',
    }, {
      type: 'input',
      name: 'url',
      required: true,
      message: 'Plugin description page url',
    }, {
      type: 'input',
      name: 'licence',
      required: true,
      message: 'Plugin license page url',
      default: 'GPL-3.0',
    },
    ]).then((answers) => {
      this.answers = answers
    })
  }

  writing() {
    const pluginDirectory = this.answers.type === 'CRITERIA' ? 'criteria-plugin' : 'service-plugin'
    this.fs.copyTpl(
      this.templatePath(pluginDirectory),
      this.destinationPath(this.answers.name || 'example-plugin'),
      this.answers)
  }
}
