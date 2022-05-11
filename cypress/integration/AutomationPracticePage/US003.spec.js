/// <reference types="cypress" />

//#region Modules
import user from '../../fixtures/user.json'
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
import { CreateAnAccountPage } from "../../page-objects/CreateAnAccountPage";

//#endregion

//#region 
// Test suite
describe("User Story 003 - Create Account. Personal Information Area", () => {

    const mainPage = new MainPage()
    const authPage = new AuthenticationPage()
    const createAccountPage = new CreateAnAccountPage()

    beforeEach(() => {

        cy.intercept('POST', '/index.php').as('authentication')
        authPage.navigate()
        authPage.createAccount(user.valid.email)
        cy.wait('@authentication').its('response.statusCode').should('eq', 200)
        createAccountPage.heading().should('have.text', 'Create an account')
    })

    describe("Loading", () => {
        it("Verify 'Personal Information' area elements", () => {

            createAccountPage.personalInformation.title().should('exist').and('have.text', 'Your personal information')
            createAccountPage.personalInformation.gender.title().should('exist')
                .should('contain.text', 'Title')
            createAccountPage.personalInformation.gender.lblMr().should('exist')
                .should('contain.text', 'Mr.')
            createAccountPage.personalInformation.gender.rdoMr().should('exist').and('not.be.checked')
            createAccountPage.personalInformation.gender.lblMrs().should('exist')
                .should('contain.text', 'Mrs.')
            createAccountPage.personalInformation.gender.rdoMrs().should('exist').and('not.be.checked')
            createAccountPage.personalInformation.lblFirstName().should('exist')
                .should('contain.text', 'First name')
            createAccountPage.personalInformation.txtFirstName().should('exist').and('have.value', '')
            createAccountPage.personalInformation.lblLastName().should('exist')
                .should('contain.text', 'Last name')
            createAccountPage.personalInformation.txtLastName().should('exist').and('have.value', '')
            createAccountPage.personalInformation.lblEmail().should('exist')
                .should('contain.text', 'Email')
            createAccountPage.personalInformation.txtEmail().should('exist').and('have.value', user.valid.email)
            // Validar contenido email
            createAccountPage.personalInformation.lblPassword().should('exist')
                .should('contain.text', 'Password')
            createAccountPage.personalInformation.txtPassword().should('exist').and('have.value', '')
            createAccountPage.personalInformation.legendPassword().should('have.text', '(Five characters minimum)')
            createAccountPage.personalInformation.dateOfBirth.title().should('exist')
                .should('contain.text', 'Date of Birth')
            createAccountPage.personalInformation.dateOfBirth.ddlDay().should('exist').and('have.value', '')
            createAccountPage.personalInformation.dateOfBirth.ddlMonth().should('exist').and('have.value', '')
            createAccountPage.personalInformation.dateOfBirth.ddlYear().should('exist').and('have.value', '')
            createAccountPage.personalInformation.lblNewsletter().should('exist').and('not.be.checked')
                .should('contain.text', 'Sign up for our newsletter!')
            createAccountPage.personalInformation.chkNewsletter().should('not.be.checked').and('exist')
            createAccountPage.personalInformation.lblOptin().should('exist')
                .should('contain.text', 'Receive special offers from our partners!')
            createAccountPage.personalInformation.chkOptin().should('exist')
        })
    })

    describe("First Name field validations", () => {

        // BUG
        it("Verify inline First Name field validations by entering a value with invalid length. ", () => {
            createAccountPage.personalInformation.enterFirstName(user.invalidLenght.firstName)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtFirstName().parent().should('have.class', 'form-error')
        })

        it("Verify inline First Name field validations by entering a value with invalid format. ", () => {
            createAccountPage.personalInformation.enterFirstName(user.invalidFormat.firstName)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtFirstName().parent().should('have.class', 'form-error')
        })


        it("Verify inline First Name field validations by entering a value that meets all the criteria. ", () => {
            createAccountPage.personalInformation.enterFirstName(user.valid.firstName)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtFirstName().parent().should('have.class', 'form-ok')
        })

        it("Verify First Name field validation when registering by leaving the field empty. ", () => {
            createAccountPage.personalInformation.txtFirstName().clear()
            createAccountPage.submit()
            createAccountPage.errorMessage('firstname is required.').should('exist')
        })

        it("Verify First Name field validation when registering by entering a value with invalid length.", () => {
            createAccountPage.personalInformation.enterFirstName(user.invalidLenght.firstName)
            createAccountPage.submit()
            createAccountPage.errorMessage('firstname is too long. Maximum length: 32').should('exist')
        })

        it("Verify First Name field validation when registering by entering a value with invalid format.", () => {
            createAccountPage.personalInformation.enterFirstName(user.invalidFormat.firstName)
            createAccountPage.submit()
            createAccountPage.errorMessage('firstname is invalid').should('exist')
        })

    })

    describe("Last Name field validations", () => {

        // BUG
        it("Verify inline Last Name field validations by entering a value with invalid length. ", () => {
            createAccountPage.personalInformation.enterLastName(user.invalidLenght.lastName)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtLastName().parent().should('have.class', 'form-error')
        })

        it("Verify inline Last Name field validations by entering a value with invalid format. ", () => {
            createAccountPage.personalInformation.enterLastName(user.invalidFormat.lastName)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtLastName().parent().should('have.class', 'form-error')
        })

        it("Verify inline Last Name field validations by entering a value that meets all the criteria. ", () => {
            createAccountPage.personalInformation.enterLastName(user.valid.lastName)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtLastName().parent().should('have.class', 'form-ok')
        })

        it("Verify Last Name field validation when registering by leaving the field empty. ", () => {
            createAccountPage.personalInformation.txtLastName().clear()
            createAccountPage.submit()
            createAccountPage.errorMessage('lastname is required.').should('exist')
        })

        it("Verify Last Name field validation when registering by entering a value with invalid length.", () => {
            createAccountPage.personalInformation.enterLastName(user.invalidLenght.lastName)
            createAccountPage.submit()
            createAccountPage.errorMessage('lastname is too long. Maximum length: 32').should('exist')
        })

        it("Verify Last Name field validation when registering by entering a value with invalid format.", () => {
            createAccountPage.personalInformation.enterLastName(user.invalidFormat.lastName)
            createAccountPage.submit()
            createAccountPage.errorMessage('lastname is invalid').should('exist')
        })


    })

    describe("Password field validations", () => {

        beforeEach(() => {

        })

        it("Verify inline Password field validations by entering a value with invalid length. ", () => {
            createAccountPage.personalInformation.enterPassword(user.invalidLenght.password)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtPassword().parent().should('have.class', 'form-error')
        })
        
        it("Verify inline Password field validations by entering a value that meets all the criteria. ", () => {
            createAccountPage.personalInformation.enterPassword(user.valid.password)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtPassword().parent().should('have.class', 'form-ok')
        })

        it("Verify Password field validation when registering by leaving the field empty. ", () => {
            createAccountPage.personalInformation.txtPassword().clear()
            createAccountPage.submit()
            createAccountPage.errorMessage('passwd is required.').should('exist')
        })

    })

    describe("Email field validations", () => {

        beforeEach(() => {
            createAccountPage.personalInformation.txtEmail().clear()
        })

        it("Verify inline Email field validations by entering a value with invalid format. ", () => {
            createAccountPage.personalInformation.enterLastName(user.invalidFormat.email)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtLastName().parent().should('have.class', 'form-error')
        })

        it("Verify inline Email field validations by entering a value that meets all the criteria. ", () => {
            createAccountPage.personalInformation.enterEmail(user.valid.email)
            createAccountPage.clickOutsideElement()
            createAccountPage.personalInformation.txtEmail().parent().should('have.class', 'form-ok')
        })

        it("Verify Email field validation when registering by leaving the field empty. ", () => {
            createAccountPage.submit()
            createAccountPage.errorMessage('email is required.').should('exist')
        })

        it("Verify Email field validation when registering by entering an existing value.", () => {
            createAccountPage.personalInformation.enterEmail(user.existing.email)
            createAccountPage.submit()
            createAccountPage.errorMessage('An account using this email address has already been registered').should('exist')
        })
    }),

        describe("Date of Birth dropdowns validations", () => {

            it("Verify Date of Birth dropdown validations when registering by entering invalid values.", () => {
                createAccountPage.personalInformation.enterBirthday('31', 'February', '2000') // No pude usar Fixtures IDKW
                createAccountPage.submit()
                createAccountPage.errorMessage('Invalid date of birth').should('exist')
            })

            // it("Verify day dropdown options", () => {
            //     createAccountPage.personalInformation.dateOfBirth.ddlDay().then(options => {
            //         for (let day = 0; day = 31; day++) {
            //             day => options.eq(day).contains(day)
            //         }
            //     })

            // })

            // it("Verify day dropdown options", () => {
            //     for (let day = 0; day < 35; day++) {
            //         createAccountPage.personalInformation.dateOfBirth.ddlDay().contains(day.toString())
            //             .should('exist')
            //     }
            // })

            // it("Verify month dropdown options", () => {
            //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            //     for (month of months) {
            //         createAccountPage.personalInformation.dateOfBirth.ddlMonth().contains(month)
            //             .should('exist')
            //     }
            // })

            // it("Verify year dropdown options", () => {

            //     const minYear = 1900
            //     const maxYear = 2022

            //     for (let year = maxYear; year >= minYear; year--) {
            //         createAccountPage.personalInformation.dateOfBirth.ddlYear().find('option').each((option, index, list) => {
            //             console.log(option)
                    
            //         })

            //     }
            // })

        }),


        describe("Required fields validation", () => {

            // TC quizas innecesario
            it("Verify validations when registering by leaving all fields empty.", () => {
                createAccountPage.personalInformation.clearAllRequired()
                createAccountPage.submit()
                createAccountPage.errorMessage('firstname is required.').should('exist')
                createAccountPage.errorMessage('lastname is required.').should('exist')
                createAccountPage.errorMessage('email is required.').should('exist')
                createAccountPage.errorMessage('passwd is required.').should('exist')
            })

            // No se que tan robusto sea
            it("Verify validations when registering by entering values that meet all criteria in all fields", () => {

                const firstName = user.valid.firstName
                const lastName = user.valid.lastName
                const email = user.valid.email
                const password = user.valid.password

                createAccountPage.personalInformation.enterAllRequired(firstName, lastName, email, password)
                createAccountPage.submit()
                createAccountPage.errorMessage('firstname').should('not.exist')
                createAccountPage.errorMessage('lastname').should('not.exist')
                createAccountPage.errorMessage('email').should('not.exist')
                createAccountPage.errorMessage('passwd').should('not.exist')
            })


        })
})


