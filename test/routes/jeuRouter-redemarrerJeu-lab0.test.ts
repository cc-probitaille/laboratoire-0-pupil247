// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: "Joueur1" });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: "Joueur2" });
  });

  it("devrait redémarrer le jeu", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    
    // Valider que l'opération est un succès
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
  });

  it('devrait supprimer tous les joueurs après redémarrage (postcondition)', async () => {
    // Vérifier qu'il n'y a plus de joueurs
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });

  it("devrait retourner 404 quand on essaie de jouer après redemarrerJeu()", async () => {
    await request.get('/api/v1/jeu/redemarrerJeu');
    
    const response = await request.get('/api/v1/jeu/jouer/Joueur4');
    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body.error).toInclude("n'existe pas");
    expect(response.body.error).toInclude("Joueur4");
  });

});
