import { helper } from '@ember/component/helper';
import createChangeset from 'ember-changeset-cp-validations';

export function changeset([ obj, fn ]) {
  return createChangeset(obj, fn);
}

export default helper(changeset);
