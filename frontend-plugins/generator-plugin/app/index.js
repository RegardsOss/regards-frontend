'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
	prompting: function() {
		console.log("START Prompting")

	  return this.prompt([{
	    type: 'input',
	    name: 'name',
	    message: 'Your project name',
	    //Defaults to the project's folder name if the input is skipped
	    default: 'regardsPlugin'
	  },
		{
	    type: 'input',
	    name: 'version',
	    message: 'Your project version',
	    //Defaults to the project's folder name if the input is skipped
	    default: '1.0.0'
	  },{
	    type: 'input',
	    name: 'description',
	    message: 'Your project description',
	    //Defaults to the project's folder name if the input is skipped
	    default: ''
	  },{
	    type: 'input',
	    name: 'author',
	    message: 'Your project author',
	    //Defaults to the project's folder name if the input is skipped
	    default: 'CNES'
	  }]).then(function (answers) {
			this.props = answers
    }.bind(this));
	},
	writing: function() {
		this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'), {
						name: this.props.name,
						version: this.props.version,
						description: this.props.description,
						author: this.props.author
				}
		);

		this.fs.copyTpl(
				this.templatePath('_webpack.config.js'),
				this.destinationPath('webpack.config.js'), {
						name: this.props.name
				}
		);

		this.fs.copy(
    	this.templatePath('common/RegardsPlugin.js'),
    	this.destinationPath('common/RegardsPlugin.js')
  	);
		this.fs.copy(
    	this.templatePath('css/plugin.css'),
    	this.destinationPath('css/plugin.css')
  	);
		this.fs.copy(
    	this.templatePath('main.js'),
    	this.destinationPath('main.js')
  	);

	},
	install : function(){
		this.installDependencies({
      bower: false,
      npm: true
    });
	},
	end: function(){
		console.log("Running compilation")
		this.spawnCommand('npm',['run','build'])
	}
});
