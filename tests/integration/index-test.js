import { default as createChangeset, buildChangeset } from 'ember-changeset-cp-validations';
import { moduleFor, test } from 'ember-qunit';
import ValidatedObject from '../helpers/validated-object';
import getOwner from 'ember-getowner-polyfill';

let model;

moduleFor('helper:changeset', 'Integration | Index', {
  integration: true,

  beforeEach() {
    model = ValidatedObject.extend(getOwner(this).ownerInjection()).create();
  }
});

test('buildChangeset works', function(assert) {
  let { validateFn, validationMap } = buildChangeset(model);

  assert.equal(typeof validateFn, 'function');
  assert.equal(typeof validationMap, 'object');
});

test('buildChangeset correctly generates the validation map', function(assert) {
  let { validationMap } = buildChangeset(model);

  assert.deepEqual(validationMap, { username: true, password: true });
});

test('buildChangeset correctly generates the validate fn', function(assert) {
  let done = assert.async();
  let { validateFn } = buildChangeset(model);

  validateFn({ key: 'username', newValue: 'og' }).then((message) => {
    assert.equal(message, 'Username is too short (minimum is 5 characters)');
    done();
  });
});

test('createChangeset correctly wraps a passed in fn', function(assert) {
  assert.expect(1);

  let fn = (o, validate) => assert.equal(typeof validate, 'function');
  let cs = createChangeset(model, fn);

  cs.set('username', 'Offir');
});

