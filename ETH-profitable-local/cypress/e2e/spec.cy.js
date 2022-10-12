
context('testing page', () => {
  beforeEach(('visit home'), () => {
    cy.visit('/');
  })

  describe('check nav value', () => {
    it('should render page', () => {
      // cy.url().should('include', 'index.html')
      cy.get('nav').find('h2').should('contain.text', 'DASHBOARD')
      cy.get('.today').should('not.have.value', false)
      cy.get('.time').should('not.be.be.empty', true)
      cy.get('.dis').should('exist')
      cy.get('nav').find('img').should('have.class', 'dis')
    })
  })

  describe('check value first row', () => {

    it('should render 1st col', () => {
      cy.get('.card-con').find('h4').should('contain.text', 'Etherium')
      cy.get('.card-header').find('div').should('have.class', 'in-btc')
      cy.get('.card-header').find('div').should('have.class', 'eth-price')
      cy.get('.card-con').find('img').eq(1).should('exist')
    })

    it('should render 2nd col', () => {
      cy.get('.card-con').find('h4').should('contain.text', 'Profit')
      cy.get('.card-header').find('div').should('have.class', 'eth-price')
      cy.get('.card-header').find('.profit-today').invoke('text').should('have.length.gt', 17)
      cy.get('.card-header').find('.profit-weekly').invoke('text').should('have.length.gt', 17)
      cy.get('.card-con').find('img').eq(2).should('exist')
    })

    it('should render 3rd col', () => {
      cy.get('.card-con').find('h4').should('contain.text', 'Rig')
      cy.get('.card-header-3').find('div').eq(1).invoke('text').should('have.length.gt', 11)
      cy.get('.card-header-3').find('div').eq(2).invoke('text').should('have.length.gt', 9)
      cy.get('.card-header-3').find('div').eq(3).invoke('text').should('have.length.gt', 7)
      cy.get('.card-con').find('img').eq(3).should('exist')
    })


    it('should render col3 row1', () => {
      cy.get('.card-con').find('h4').should('contain.text', 'Rig')
      cy.get('.card-header-3').find('div').eq(1).invoke('text').should('have.length.gt', 11)
      cy.get('.card-header-3').find('div').eq(2).invoke('text').should('have.length.gt', 9)
      cy.get('.card-header-3').find('div').eq(3).invoke('text').should('have.length.gt', 7)
      cy.get('.card-con').find('img').eq(3).should('exist')
    })

    it('should input row1 col1', async () => {
      cy.get('.imgHashrate').click()
      cy.get('.hashrate').type('11111111').type('{enter}')
      cy.wait(3000)
      cy.get('.imgkw').click()
      cy.get('.kwinp').type('0.22').type('{enter}')
      cy.wait(3000)
      cy.get('.imgPow').click()
      cy.get('.inpPow').type('400').type('{enter}')
    })


  })

  describe('check value second row', () => {
    it('should render 2row col1', () => {
      cy.get('.one').find('h4').should('contain.text', 'Check interval for ETH profitablity')
      cy.get('.timer').should('exist')
      cy.get('#time').select('Now')
      cy.get('#time').select('1 hour')
      cy.get('#time').select('12 hours')
      cy.get('#time').select('24 hours')
    })

    it('should render 2row col2', () => {
      cy.get('.note').find('h3').should('contain.text', 'Note')
      cy.get('.timer').should('exist')
      cy.get('ul').find('li').eq(0).should('contain.text', 'ENTER')
      cy.get('ul').find('li').eq(1).should('contain.text', 'power')
      cy.get('ul').find('li').eq(2).should('contain.text', 'electric')
      cy.get('ul').find('li').eq(1).should("not.have.attr", "href", "#undefined")

      cy.get('#time').select('Now')
      cy.get('#time').select('1 hour')
      cy.get('#time').select('12 hours')
      cy.get('#time').select('24 hours')
    })
  })


})
