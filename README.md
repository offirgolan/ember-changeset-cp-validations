# Ember Changeset CP Validations

[![Build Status](https://travis-ci.org/offirgolan/ember-changeset-cp-validations.svg)](https://travis-ci.org/offirgolan/ember-changeset-cp-validations)
[![npm version](https://badge.fury.io/js/ember-changeset-cp-validations.svg)](http://badge.fury.io/js/ember-changeset-cp-validations)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-changeset-cp-validations/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-changeset-cp-validations)
[![Test Coverage](https://codeclimate.com/github/offirgolan/ember-changeset-cp-validations/badges/coverage.svg)](https://codeclimate.com/github/offirgolan/ember-changeset-cp-validations/coverage)
[![Dependency Status](https://david-dm.org/offirgolan/ember-changeset-cp-validations.svg)](https://david-dm.org/offirgolan/ember-changeset-cp-validations)

Ember CP Validations support for Ember Changeset

## Requirements

- [ember-cp-validations](https://github.com/offirgolan/ember-cp-validations) v3.1.0 or above
- [ember-changeset](https://github.com/poteto/ember-changeset)

## Installation

```
ember install ember-changeset-cp-validations
```

## Helpful Links

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-changeset-cp-validations/issues).

## Usage

### The Template Helper

This addon updates the `changeset` helper by creating a changeset instance via the [`createChangeset`](#using-createchangeset).

```hbs
{{dummy-form
    changeset=(changeset user)
    submit=(action "submit")
    rollback=(action "rollback")
}}
```

Passing a custom action as a second argument to the `changeset` helper is supported but make
sure to call the passed `validate` method to run the necessary validations.

```hbs
{{dummy-form
    changeset=(changeset user (action "customValidate"))
    submit=(action "submit")
    rollback=(action "rollback")
}}
```

```js
import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    customValidate({ key, newValue, oldValue, changes }, validate) {
      // do some custom stuff

      return validate(...arguments);
    }
  }
});
```

### Creating a Changeset

There are 2 ways to create a changset programmatically.

#### Using createChangeset

`createChangeset` is a no fuss way of quickly creating a new changeset instance.
It will return a new changeset instance that is setup for the passed model and its validations.

```js
import Ember from 'ember';
import createChangeset from 'ember-changeset-cp-validations';

const { Component } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);

    let model = get(this, 'model');
    this.changeset = createChangeset(model);
  }
});
```

#### Using buildChangeset

`buildChangeset` allows you more freedom with creating the changeset instance.
It will return a hash that includes the `validateFn` and `validationMap` required to
support the validations for the passed model.

```js
import Ember from 'ember';
import { buildChangeset } from 'ember-changeset-cp-validations';

const { Component } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);

    let model = get(this, 'model');
    let { validateFn, validationMap } = buildChangeset(model);
    this.changeset = new Changeset(model, validateFn, validationMap);
  }
});
```

### Disable CP Validations Dependents

When changes get applied to the actual model, validations will be re-triggered since the dependents of the CPs
have changed. As of ember-cp-validations __v3.1.0__, to disable this, you may put all or selective attribute CPs in a
volatile state via the [volatile option](http://offirgolan.github.io/ember-cp-validations/docs/modules/Common%20Options.html#volatile).

```js
const Validations = buildValidations({
  username: {
    description: 'Username',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 5,
        max: 15
      })
    ]
  },

  password: {
    description: 'Password',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 10,
        volatile: false
      })
    ]
  }
}, {
  volatile: true
});
```
