/*
  For this to work, a volatile option in cp-validations must be created.
  This will put all CPs in a no-cache mode and will disregard any dependent keys

  buildValidations({
    username: validator: ('presence', true);
  }, {
    volatile: true
  })
*/

export default function validate(model) {
  return ({ key, newValue }) => {
    return model.validateAttribute(key, newValue).then(({ validations }) => {
      return validations.get('isTruelyValid') ? true : validations.get('message');
    });
  };
}
