import Ember from 'ember';
import createChangeset from 'ember-changeset-cp-validations';

const {
  Helper: { helper }
} = Ember;

export function changeset([ obj, fn ]) {
  return createChangeset(obj, fn);
}

export default helper(changeset);
