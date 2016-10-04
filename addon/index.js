import Ember from 'ember';

const {
  assert,
  typeOf
} = Ember;

export default function buildChangeset(model) {
  assert('Object does not contain any validations', typeOf(model.get('validations')) === 'instance');

  return {
    validationMap: model.get('validations.validatableAttributes').reduce((o, attr) => {
      o[attr] = true;
      return o;
    }, {}),

    validateFn: ({ key, newValue }) => {
      return model.validateAttribute(key, newValue).then(({ validations }) => {
        return validations.get('isTruelyValid') ? true : validations.get('message');
      });
    }
  };
}
