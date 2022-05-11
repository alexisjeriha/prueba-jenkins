/// <reference types="cypress" />

declare namespace Cypress {
      interface Chainable {
          /**
           * @description Redirects you to a web page
           * @param URL Web page Address
           * @example
           * cy
           *   .visitURL('www.google.com')
           */
        visitURL(URL)
      }
    }
  