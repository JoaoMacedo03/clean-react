import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Should load with correct initial state', () => {
        cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('email')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('have.attr', 'readOnly')
        cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')

        cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('password')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('have.attr', 'readOnly')
        cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido')
        cy.getByTestId('email-label').should('have.attr', 'title', 'Valor inválido')

        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
        cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido')
        cy.getByTestId('password-label').should('have.attr', 'title', 'Valor inválido')

        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
        cy.getByTestId('email').should('not.have.attr', 'title')
        cy.getByTestId('email-label').should('not.have.attr', 'title')

        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
        cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
        cy.getByTestId('password').should('not.have.attr', 'title')
        cy.getByTestId('password-label').should('not.have.attr', 'title')

        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present invalid credentials error on 401', () => {
        cy.intercept({
            method: 'POST',
            url: /login/
        }, {
            statusCode: 401,
            body: {
                error: faker.random.words()
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
        cy.getByTestId('submit').click()
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('exist')
            .getByTestId('main-error').should('not.exist')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should present UnexpectedError on 400', () => {
        cy.intercept({
            method: 'POST',
            url: /login/
        }, {
            statusCode: 400,
            body: {
                error: faker.random.words()
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
        cy.getByTestId('submit').click()
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('exist')
            .getByTestId('main-error').should('not.exist')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('main-error').should('contain.text', 'Algo deu errado. Tente novamente em breve.')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should present save accessToken if valid credentials are provided', () => {
        cy.intercept({
            method: 'POST',
            url: /login/
        }, {
            statusCode: 200,
            body: {
                accessToken: faker.random.words()
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('not.exist')
        cy.url().should('eq', `${baseUrl}/`)
        cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
    })

    it('Should prevent multiple submits', () => {
        cy.intercept({
            method: 'POST',
            url: /login/
        }, {
            statusCode: 200,
            body: {
                accessToken: faker.random.words()
            }
        }).as('request')
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9))
        cy.getByTestId('submit').dblclick()
        cy.get('@request.all').should('have.length', 1)
    })

    it('Should present UnexpectedError if invalid data is returned', () => {
        cy.intercept({
            method: 'POST',
            url: /login/
        }, {
            statusCode: 200,
            body: {
                invalidProperty: faker.random.words()
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(9)).type('{enter}')
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('exist')
            .getByTestId('main-error').should('not.exist')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('main-error').should('contain.text', 'Algo deu errado. Tente novamente em breve.')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should not call submits if form is invalid', () => {
        cy.intercept({
            method: 'POST',
            url: /login/
        }, {
            statusCode: 200,
            body: {
                accessToken: faker.random.words()
            }
        }).as('request')
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        cy.get('@request.all').should('have.length', 0)
    })
})
