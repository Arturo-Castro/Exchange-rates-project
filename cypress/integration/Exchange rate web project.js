/// <reference types="Cypress" />

const URL = '192.168.0.119:8080';

context('Exchange rate web', () => {
    before(() => {
        cy.visit(URL);
    });

    describe('Web content', () => {
        const NUMBER_OF_COUNTRIES = 20;
        const CURRENCY_NAME = ['US Dollar', 'Euro', 'Yen', 'British pound', 'Australian dollar', 'Canadian dollar', 'Swiss franc', 'Yuan', 'Hong Kong dollar', 'New Zealand dollar',
                                'Swedish krona', 'South Korean won', 'Singapore dollar', 'Norwegian krone', 'Mexican peso', 'Indian rupee', 'Russian ruble', 'South African rand',
                                'Argentine peso', 'Brazilian real'];
        const IMGS_SOURCES = ['./img/united-states-of-america-flag-xs.jpg', './img/europe-flag-xs.jpg', './img/japan-flag-xs.jpg', './img/united-kingdom-flag-xs.jpg',
                                './img/australia-flag-xs.jpg', './img/canada-flag-xs.jpg', './img/switzerland-flag-xs.jpg', './img/china-flag-xs.jpg',
                                './img/hongkong-flag-xs.jpg', './img/new-zealand-flag-xs.jpg', './img/sweden-flag-xs.jpg', './img/south-korea-flag-xs.jpg',
                                './img/singapore-flag-xs.jpg', './img/norway-flag-xs.jpg', './img/mexico-flag-xs.jpg', './img/india-flag-xs.jpg', './img/russia-flag-xs.jpg',
                                './img/south-africa-flag-xs.jpg', './img/argentina-flag-xs.jpg', './img/brazil-flag-xs.jpg'];

        it('Verifies number of countries', () => {
            cy.get('.container').find('.card').should('have.length', NUMBER_OF_COUNTRIES);
        });

        it('Verifies text for each country', () => {
            cy.get('.currency').then(currencies => {
                currencies.each(function(i, currency){
                    cy.wrap(currency).should('have.text', CURRENCY_NAME[i]);
                });
            });
        });

        it('Verifies flags sources', () => {
            cy.get('img').then(imgs => {
                imgs.each(function(i, img){
                    cy.wrap(img).should('have.attr', 'src', IMGS_SOURCES[i]);
                });
            });
        });
    });

    describe('Web functionality', () => {
        it('Verifies active cards', () => {
            cy.get('#ars').click();
            cy.get('#ars').should('have.class', 'active');
            cy.get('#ars input').should('be.visible');
            cy.get('#ars').find('.unit-conversion').should('be.empty');
            cy.get('#rub').find('.unit-conversion').should('have.text', '1 ARS = 0.706705 RUB');
            cy.reload();
            cy.get('#nzd').click();
            cy.get('#ars').should('not.have.class', 'active');
            cy.get('#ars input').should('not.exist');
            cy.get('#ars').find('.unit-conversion').should('have.text', '1 NZD = 72.0013 ARS');
        });

        it('Verifies cards input results', () => {
            cy.reload();
            cy.get('#ars').click();
            cy.get('#ars').find('input').type('100');
            cy.get('#usd .input-conversion').should('have.text', '1.00 USD');
            cy.get('#usd .unit-conversion').should('have.text', '1 ARS = 0.009957 USD');
            cy.reload();
            cy.get('#ars').click();
            cy.get('#ars').find('input').type('-5.3');
            cy.get('#sek .input-conversion').should('be.empty');
        });
    });
});