export default class NiveauDomaineRang {
    domaine;
    constructor() {
        
        this.domaine = 
        [{
            nom: 'Mortel',
            niveaux: [
              { nom: 'Student', valeur: 9 },
              { nom: 'Disciple', valeur: 9 },
              { nom: 'Expert', valeur: 9 },
              { nom: 'True Expert', valeur: 9 },
              { nom: 'Master', valeur: 9 },
              { nom: 'True Master', valeur: 9 },
              { nom: 'Saint', valeur: 9 },
              { nom: 'Superior Saint', valeur: 9 },
              { nom: 'Supreme Saint', valeur: 9 },
              { nom: 'Empereur', valeur: 10 },
              { nom: 'Supreme Empereur', valeur: 10 },
              { nom: 'Divine Empereur', valeur: 10 }
            ]
          },
          {
            nom: 'Immortel',
            niveaux: [
              { nom: 'Celeste body rafinement', valeur: 12 },
              { nom: 'Celeste essence formation', valeur: 12 },
              { nom: 'Celeste soul fusion', valeur: 12 },
              { nom: 'Celeste nature harmonization', valeur: 12 },
              { nom: 'Celeste immortality', valeur: 12 }
            ]
          },
          {
            nom: 'Dieu',
            niveaux: [
              { nom: 'Supreme God', valeur: 3 },
              { nom: 'God Monarch', valeur: 3 },
              { nom: 'God King', valeur: 300 }
            ]
          }];
              
    }

}