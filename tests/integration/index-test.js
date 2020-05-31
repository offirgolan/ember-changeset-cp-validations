import {
  default as createChangeset,
  buildChangeset
} from 'ember-changeset-cp-validations';
import { module, test } from 'qunit';
import ValidatedObject from '../helpers/validated-object';
import { setupRenderingTest } from 'ember-qunit';

let model;

module('Integration | Index', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    model = ValidatedObject.extend(this.owner.ownerInjection()).create();
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

  test('buildChangeset returns null when passed an empty model', function(assert) {
    assert.deepEqual(buildChangeset(null), null);
    assert.deepEqual(buildChangeset(undefined), null);
    assert.deepEqual(buildChangeset(), null);
  });
});
