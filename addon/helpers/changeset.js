import Ember from 'ember';
import validate from 'ember-changeset-cp-validations';
import { changeset as _changeset } from 'ember-changeset/helpers/changeset';

const {
  Helper: { helper }
} = Ember;

export function changeset([ obj, fn ], ...args) {
  return _changeset([ obj, fn || validate(obj) ], ...args);
}

export default helper(changeset);
