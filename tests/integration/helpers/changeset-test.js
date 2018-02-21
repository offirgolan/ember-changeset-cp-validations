import EmberObject from '@ember/object';
import { changeset } from 'dummy/helpers/changeset';
import { module, test } from 'qunit';
import ValidatedObject from '../../helpers/validated-object';
import { setupRenderingTest } from 'ember-qunit';

let model;

module('Integration | Helper | changeset', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    model = ValidatedObject.extend(this.owner.ownerInjection()).create();
  });

  test('it works', function(assert) {
    let cs = changeset([ model ]);
    assert.ok(cs && cs instanceof EmberObject);
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
});
