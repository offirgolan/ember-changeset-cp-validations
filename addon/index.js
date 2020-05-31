import { assert } from '@ember/debug';
import { typeOf } from '@ember/utils';
import Changeset from 'ember-changeset';

export function buildChangeset(model) {
  if (!model) {
    return null;
  }
  assert('Object does not contain any validations', typeOf(model.get('validations')) === 'instance');

  return {
    validationMap: model.get('validations.validatableAttributes').reduce((o, attr) => {
      o[attr] = true;
      return o;
    }, {}),

    validateFn: ({ key, newValue }) => {
      return model.validateAttribute(key, newValue).then(({ validations }) => {
        return validations.get('isValid') ? true : validations.get('message');
      });
    }
  };
}

export default function createChangeset(model, fn) {
  let { validateFn, validationMap } = buildChangeset(model);
  let _fn;

  if (fn && typeof fn === 'function') {
    _fn = function() {
      return fn(...arguments, validateFn);
    };
  }

  return new Changeset(model, _fn || validateFn, validationMap);
}
