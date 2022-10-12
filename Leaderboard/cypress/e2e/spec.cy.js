
context('testing page render', () => {
  beforeEach(('visit home'), () => {
    cy.visit('/');
        cy.wait(3000)
  })

  describe('renderlah', () => {
    it('should render page', () => {
      cy.get('.p-2').find('h3').should('contain.text', 'Trending this week')
        cy.wait(3000)
      const allCard =[cy.get('.card')]
      allCard.forEach((card) => {
        card.get('img').should('be.visible')
        cy.get('.number').should('be.visible')
        cy.get('.p-1').find('h3').should('be.visible')
        cy.get('.star-area').find('p').should('be.visible')
        cy.get('.stars-outer').should('be.visible')
        cy.get('.stars-inner').should('be.visible')
        cy.get('.voter').should('be.visible')
        cy.get('.tag').eq(1).should('be.visible')

      })
    })
  })

})
