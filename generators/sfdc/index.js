'use strict';
const Generator = require('yeoman-generator');
const path = require('path');
const utils = require('../utils/utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    writing() {
        const props = Object.assign({}, this.options.baseProps, {
            root: 'div'
        });
        utils.determineBody(props, require('path').resolve('../generators/views/templates/')).then(body => {
            this.fs.copyTpl(
                this.templatePath('pages/customization.community.ejs'),
                this.destinationPath('pages/sfdc/community.page'), Object.assign({}, this.options.baseProps, {
                    body: body,
                    root: 'div'
                })
            );
        });
    }
}