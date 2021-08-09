// importamos la funcion que vamos a testear
import { registerUser } from '../src/firebase/fireBase-function.js';

describe('registerUser', () => {
  it('debería ser una función', () => {
    expect(typeof registerUser).toBe('function');
  });
});
