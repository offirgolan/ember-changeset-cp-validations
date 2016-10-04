import Ember from 'ember';
import { changeset } from 'dummy/helpers/changeset';
import { moduleFor, test } from 'ember-qunit';
import ValidatedObject from '../../helpers/validated-object';
import getOwner from 'ember-getowner-polyfill';

let model;

moduleFor('helper:changeset', 'Integration | Helper | changeset', {
  integration: true,

  beforeEach() {
    model = ValidatedObject.extend(getOwner(this).ownerInjection()).create();
  }
});

test('it works', function(assert) {
  let cs = changeset([ model ]);
  assert.ok(cs && cs instanceof Ember.Object);
});

test('it respects custom function', function(assert) {
  assert.expect(1);

  let fn = () => {
    assert.ok(true);
    return true;
  };
  let cs = changeset([ model, fn ]);

  cs.set('foo', 'bar');
});

test('it validates', function(assert) {
  let done = assert.async();
  let cs = changeset([ model ]);

  cs.validate().then(() => {
    assert.equal(cs.get('error.username.validation'), 'Username can\'t be blank');
    assert.equal(cs.get('error.password.validation'), 'Password can\'t be blank');
    done();
  });
});
