describe('iframe test', () => {
  it('visits the desired page', () => {
    cy.visit('http://the-internet.herokuapp.com/iframe');
  })
  // it can type a message into the iframe
  it('can type in the iframe', () => {
    cy.get('iframe[id="mce_0_ifr"]')
      .its('0.contentDocument').should('exist')
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
      .focus()
      .wait(500)
      .clear()
      .type('Cypress is pretty cool!')
      .should('have.text', 'Cypress is pretty cool!');

  })
  // it can format the text in an iframe
  it('can format text in the frame', () => {
    // add text to the iframe
    cy.get('iframe[id="mce_0_ifr"]')
      .its('0.contentDocument').should('exist')
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
      .focus()
      .type('{selectAll}');
    // modify the text
    cy.get('button').contains('Format').click();
    cy.get('[title="Fonts"]').click();
    cy.get('[title="Impact"]').click();
    // assert that the modification to text occured
    cy.get('iframe[id="mce_0_ifr"]')
      .its('0.contentDocument').should('exist')
      .its('body').should('not.be.undefined')
      .then(cy.wrap)
      .find('span')
      .should('have.attr', 'style')
      .then(style => {
        expect(style).to.equal('font-family: impact, sans-serif;');
      })
      
  })
})
