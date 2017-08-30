'use strict';
const path = require('path');
const _ = require('lodash');
const Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.option('customer', {
            type: String,
            required: true,
            desc: 'Customer name'
        });
    }

    initializing() {
        this.props = {};
        this.props.project = this.options.project;
        this.props.projectSafeName = _.snakeCase(this.options.project);
    }

    writing() {
        const templateObj = { 
          projectSafeName : this.props.projectSafeName,
          capitalizeprojectSafeName : this.props.projectSafeName.replace(/\b\w/g, l => l.toUpperCase()),
        }

        this.fs.copyTpl(
          this.templatePath('**'),
          this.destinationPath('sfdc'), 
          templateObj
        );

        mkdirp.sync(this.destinationPath('sfdc/components'));
        mkdirp.sync(this.destinationPath('sfdc/pages'));
        mkdirp.sync(this.destinationPath('sfdc/aura'));
    }
}