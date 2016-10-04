/* jshint node: true */
'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-changeset-cp-validations',

  init: function() {
    if (this._super.init) { this._super.init.apply(this, arguments); }

    var checker = new VersionChecker(this);
    checker.for('ember-cp-validations', 'npm').assertAbove('3.0.0', 'ember-changeset-cp-validations requires ember-cp-validations v3.1.0 and above');
  }
};
