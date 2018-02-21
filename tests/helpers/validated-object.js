import EmberObject from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

export const Validations = buildValidations({
  username: {
    description: 'Username',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 5,
        max: 15
      })
    ]
  },
  password: {
    description: 'Password',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 10
      })
    ]
  }
});

export default EmberObject.extend(Validations);
