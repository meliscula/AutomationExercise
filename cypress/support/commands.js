// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.

//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Get element by data-qa attribute
Cypress.Commands.add('getTestData', (dataSelector) => {
    return cy.get(`[data-qa="${dataSelector}"]`)
})

// Get element by ID
Cypress.Commands.add('getById', (id) => {
    return cy.get(`#${id}`)
})

// Get element by class
Cypress.Commands.add('getByClass', (className) => {
    return cy.get(`.${className}`)
})

// Get element by custom attribute
Cypress.Commands.add('getByAttribute', (attribute, value) => {
    return cy.get(`[${attribute}="${value}"]`)
})

// Get element by href
Cypress.Commands.add('getByHref', (href) => {
    return cy.get(`a[href="${href}"]`)
})

// Get element containing text
Cypress.Commands.add('getByText', (text) => {
    return cy.contains(text)
})


// Get element by form action
Cypress.Commands.add('getByFormAction', (action) => {
    return cy.get(`form[action="${action}"]`)
})

Cypress.Commands.add('getNavLink', (text) => {
    return cy.get('li a').contains(text)
})

// Get element by tag and class combination
Cypress.Commands.add('getByTagAndClass', (tag, className) => {
    return cy.get(`${tag}[class="${className}"]`)
})
// Get element by name attribute
Cypress.Commands.add('getByName', (name) => {
    return cy.get(`[name="${name}"]`)
})
//search randomly for a product by name
Cypress.Commands.add('getRandomProduct', () => {
    return cy.fixture('loginData').then((data) => {
        const { names: products } = data.products;
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    });
})
// Generate a unique valid email
Cypress.Commands.add('generateEmail', (type = 'unique') => {
    const emailTypes = {
        unique: () => `test.${Date.now()}@example.com`
    };
    return emailTypes[type]() || emailTypes.unique();
})

const invalidEmailTypes = {
    noAt: 'testexample.com',
    noDomain: 'test@',
    noUsername: '@example.com',
    specialChars: 'test!#$%@example.com',
    spaces: 'test user@example.com',
    multipleDots: 'test@example..com',
    multipleAt: 'test@@example.com',
    invalidTLD: 'test@example.c'
};

Cypress.Commands.add('generateInvalidEmail', (type = 'random') => {
    if (type === 'random') {
        const types = Object.keys(invalidEmailTypes);
        type = types[Math.floor(Math.random() * types.length)];
    }
    
    if (!invalidEmailTypes[type]) {
        throw new Error(`Invalid email type: ${type}. Available types: ${Object.keys(invalidEmailTypes).join(', ')}`);
    }
    
    return invalidEmailTypes[type];
})