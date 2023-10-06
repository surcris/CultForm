describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/authUser/connexion')
    cy.get('[type="text"]').type('niel@gmail.com')
    cy.get('[type="password"]').type('1234567')
    cy.get('.btn').click()
    cy.wait(1000)
    cy.get('.btn-nouveau').click()
    cy.get('input').type('vreee')
    cy.wait(1000)
    cy.get('.btn-createPerso').click();
    cy.wait(1000)
    cy.get('.persoinfo-container-bg > :nth-child(3)').should('be.visible');
    cy.then(() => {
      cy.get('.persoinfo-container-bg > :nth-child(3)').then((element) => {
        if (element.text().includes('Pseudo déjà utiliser') || element.text().includes('Personnage maximum attein')) {
          cy.log('Arrêt du test car la condition est remplie.');
          cy.pause(); 
        } 
      });
    });
  })
});
