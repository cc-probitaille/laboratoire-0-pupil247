import 'jest-extended';
import { JeuDeDes } from '../../src/core/jeuDeDes';

describe('JeuDeDesTest', () => {
  let jdd: JeuDeDes;
  beforeEach(async () => {
    jdd = new JeuDeDes();
  });

  it(`devrait n'avoir aucun joueur au début`, async () => {
    expect(jdd.joueurs).toEqual("[]")
  })

  it('devrait retourner une valeur entre 3 et 18', () => {
    for (let i = 0; i < 200; i++) {
      expect(jdd.brasser()).toBeWithin(3, 19);
    }
  })

  it('devrait retourner finalement toutes les valeurs entre 3 et 18', () => {
    const resultats = new Set();
    for (let i = 0; i < 2000; i++) {
      resultats.add(jdd.brasser())
    }
    expect(resultats.size).toBe(16);
    for (let i = 3; i < 19; i++) {
      expect(resultats.has(i)).toBeTrue();
    }
    // cas particuliers
    expect(resultats.has(1)).toBeFalsy();
    expect(resultats.has(19)).toBeFalsy();
  })

});
