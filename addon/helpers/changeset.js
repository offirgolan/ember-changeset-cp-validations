import Ember from 'ember';
import buildChangeset from 'ember-changeset-cp-validations';
import Changeset from 'ember-changeset';

const {
  Helper: { helper }
} = Ember;

export function changeset([ obj, fn ]) {
  let { validateFn, validationMap } = buildChangeset(obj);
  return new Changeset(obj, fn || validateFn, validationMap);
}

export default helper(changeset);
