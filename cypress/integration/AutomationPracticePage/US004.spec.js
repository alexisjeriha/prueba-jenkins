/// <reference types="cypress" />

//#region Modules
import user from '../../fixtures/user.json'
import { MainPage } from "../../page-objects/MainPage"
import { AuthenticationPage } from "../../page-objects/AuthenticationPage";
import { CreateAnAccountPage } from "../../page-objects/CreateAnAccountPage";
import { MyAccountPage } from "../../page-objects/MyAccountPage";

//#endregion

describe("User Story 004 - Create Account. Your Address Area", () => {

    const mainPage = new MainPage();
    const authPage = new AuthenticationPage()
    const createAccountPage = new CreateAnAccountPage()
    const myAccountPage = new MyAccountPage()

    beforeEach(() => {

        cy.intercept('POST', '/index.php').as('authentication')
        authPage.navigate()
        authPage.createAccount(user.valid.email)
        cy.wait('@authentication').its('response.statusCode').should('eq', 200)
        createAccountPage.heading().should('have.text', 'Create an account')
    })

    describe("Loading", () => {

        it("Verify 'Your Address' area elements", () => {

            createAccountPage.yourAddress.title().should('exist').and('have.text', 'Your address')
            createAccountPage.yourAddress.lblFirstName().should('exist')
                .should('contain.text', 'First name')
            createAccountPage.yourAddress.txtFirstName().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblLastName().should('exist')
                .should('contain.text', 'Last name')
            createAccountPage.yourAddress.txtLastName().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblCompany().should('exist')
                .should('contain.text', 'Company')
            createAccountPage.yourAddress.txtCompany().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblAddress1().should('exist')
                .should('contain.text', 'Address')
            createAccountPage.yourAddress.txtAddress1().should('exist').and('have.value', '')
            createAccountPage.yourAddress.legendAddress1().should('have.text', 'Street address, P.O. Box, Company name, etc.')
            createAccountPage.yourAddress.lblAddress2().should('exist')
                .should('contain.text', 'Address (Line 2)')
            createAccountPage.yourAddress.txtAddress2().should('exist').and('have.value', '')
            createAccountPage.yourAddress.legendAddress2().should('have.text', 'Apartment, suite, unit, building, floor, etc...')
            createAccountPage.yourAddress.lblCity().should('exist')
                .should('contain.text', 'City')
            createAccountPage.yourAddress.txtCity().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblState().should('exist')
                .should('contain.text', 'State')
            createAccountPage.yourAddress.ddlState().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblZipCode().should('exist')
                .should('contain.text', 'Zip/Postal Code')
            createAccountPage.yourAddress.txtZipCode().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblCountry().should('exist')
                .should('contain.text', 'Country')
            createAccountPage.yourAddress.ddlCountry().should('exist')
            createAccountPage.yourAddress.ddlCountrySelectedOption().should('have.text', 'United States')
            createAccountPage.yourAddress.lblAddInformation().should('exist')
                .should('contain.text', 'Additional information')
            createAccountPage.yourAddress.txtAddInformation().should('exist').and('have.value', '')
            createAccountPage.yourAddress.legendAddInformation().should('have.text', 'You must register at least one phone number.')
            createAccountPage.yourAddress.lblHomePhone().should('exist')
                .should('contain.text', 'Home phone')
            createAccountPage.yourAddress.txtHomePhone().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblMobilePhone().should('exist')
                .should('contain.text', 'Mobile phone')
            createAccountPage.yourAddress.txtMobilePhone().should('exist').and('have.value', '')
            createAccountPage.yourAddress.lblAddressAlias()
                .should('exist')
                .should('contain.text', 'Assign an address alias for future reference. ')
            createAccountPage.yourAddress.txtAddressAlias().should('exist').and('have.value', 'My address')
            createAccountPage.btnRegister().should('exist').and('include.text', 'Register')
        })

    }),

        describe("First Name field validations", () => {

            it("Verify First Name field autofill", () => {
                createAccountPage.personalInformation.enterFirstName(user.valid.firstName)
                createAccountPage.yourAddress.txtFirstName()
                    .should('have.value', user.valid.firstName)
            })

            // BUG
            it("Verify inline First Name field validation by entering a value with invalid length. ", () => {
                createAccountPage.personalInformation.enterFirstName(user.valid.firstName)
                createAccountPage.clickOutsideElement()
                createAccountPage.yourAddress.txtFirstName().parent().should('have.class', 'form-error')

            })

            // BUG
            it("Verify inline First Name field validations by entering a value with invalid format. ", () => {
                createAccountPage.personalInformation.enterFirstName(user.invalidFormat.firstName)
                createAccountPage.clickOutsideElement()
                createAccountPage.yourAddress.txtFirstName().parent().should('have.class', 'form-error')
            })

            // BUG
            it("Verify inline First Name field validations by entering a value that meets all the criteria. ", () => {
                createAccountPage.personalInformation.enterFirstName(user.valid.firstName)
                createAccountPage.clickOutsideElement()
                createAccountPage.yourAddress.txtFirstName().parent().should('have.class', 'form-ok')
            })

            it("Verify First Name field validation when registering by leaving the field empty. ", () => {
                createAccountPage.yourAddress.txtFirstName().clear()
                createAccountPage.submit()
                createAccountPage.errorMessage('firstname is required.').should('exist')
            })

            it("Verify First Name field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterFirstName(user.invalidLenght.firstName)
                createAccountPage.submit()
                createAccountPage.errorMessage('firstname is too long. Maximum length: 32').should('exist')
            })

            it("Verify First Name field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterFirstName(user.invalidFormat.firstName)
                createAccountPage.submit()
                createAccountPage.errorMessage('firstname is invalid').should('exist')
            })

        }),

        describe("Last Name field validations", () => {

            it("Verify Last Name field autofill", () => {
                createAccountPage.personalInformation.enterLastName(user.valid.lastName)
                createAccountPage.yourAddress.txtLastName()
                    .should('have.value', user.valid.lastName)
            })

            // BUG
            it("Verify inline Last Name field validations by entering a value with invalid length. ", () => {
                createAccountPage.personalInformation.enterLastName(user.invalidLenght.lastName)
                createAccountPage.clickOutsideElement()
                createAccountPage.yourAddress.txtLastName().parent().should('have.class', 'form-error')
            })

            // BUG
            it("Verify inline Last Name field validations by entering a value with invalid format. ", () => {
                createAccountPage.personalInformation.enterLastName(user.invalidFormat.lastName)
                createAccountPage.clickOutsideElement()
                createAccountPage.yourAddress.txtLastName().parent().should('have.class', 'form-error')
            })

            // BUG
            it("Verify inline Last Name field validations by entering a value that meets all the criteria. ", () => {
                createAccountPage.personalInformation.enterLastName(user.valid.lastName)
                createAccountPage.clickOutsideElement()
                createAccountPage.yourAddress.txtLastName().parent().should('have.class', 'form-ok')
            })

            it("Verify Last Name field validation when registering by leaving the field empty. ", () => {
                createAccountPage.yourAddress.txtLastName().clear()
                createAccountPage.submit()
                createAccountPage.errorMessage('lastname is required.').should('exist')
            })

            it("Verify Last Name field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterLastName(user.invalidLenght.lastName)
                createAccountPage.submit()
                createAccountPage.errorMessage('lastname is too long. Maximum length: 32').should('exist')
            })

            it("Verify Last Name field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterLastName(user.invalidFormat.lastName)
                createAccountPage.submit()
                createAccountPage.errorMessage('lastname is invalid').should('exist')
            })

        }),

        describe("Company field validations", () => {

            it("Verify Company field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterCompany(user.invalidLenght.company)
                createAccountPage.submit()
                createAccountPage.errorMessage('company is too long. Maximum length: 64').should('exist')
            })

            it("Verify Company field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterCompany(user.invalidFormat.company)
                createAccountPage.submit()
                createAccountPage.errorMessage('company is invalid').should('exist')
            })

        }),

        describe("Address fields validations", () => {

            it("Verify Address field validation when registering by leaving the field empty. ", () => {
                createAccountPage.yourAddress.txtAddress1().clear()
                createAccountPage.submit()
                createAccountPage.errorMessage('address1 is required.').should('exist')
            })

            it("Verify Address field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterAddress1(user.invalidLenght.address)
                createAccountPage.submit()
                createAccountPage.errorMessage('address1 is too long. Maximum length: 128').should('exist')
            })

        }),

        describe("Country dropdown validations", () => {

            it("Verify State dropdown and Zip/Postal Code field display when United States country is selected", () => {
                createAccountPage.yourAddress.selectCountry('United States')
                createAccountPage.yourAddress.groupState()
                    .should('not.have.css', 'display', 'none')
                createAccountPage.yourAddress.groupZipCode()
                    .should('not.have.css', 'display', 'none')
            })

            it("Verify State dropdown and Zip/Postal Code field when United States country is not selected.", () => {
                createAccountPage.yourAddress.selectCountry('-')
                createAccountPage.yourAddress.groupState()
                    .should('have.css', 'display', 'none')
                createAccountPage.yourAddress.groupZipCode()
                    .should('have.css', 'display', 'none')
            })

        }),

        describe("City field validations", () => {

            it("Verify City field validation when registering by leaving the field empty. ", () => {
                createAccountPage.yourAddress.txtCity().clear()
                createAccountPage.submit()
                createAccountPage.errorMessage('city is required.').should('exist')
            })

            it("Verify City field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterCity(user.invalidLenght.city)
                createAccountPage.submit()
                createAccountPage.errorMessage('city is too long. Maximum length: 64').should('exist')
            })

            it("Verify City field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterCity(user.invalidFormat.city)
                createAccountPage.submit()
                createAccountPage.errorMessage('city is invalid').should('exist')
            })

        }),

        describe("State dropdown validations", () => {

            // it("Verify State dropdown options", () => {

            //     const states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

            //     console.log(createAccountPage.yourAddress.ddlStateOptions())

            // })

            it("Verify State dropdown validation when registering by leaving the option by default", () => {
                createAccountPage.yourAddress.selectCountry('United States')
                createAccountPage.submit()
                createAccountPage.errorMessage('This country requires you to choose a State').should('exist')
            })

            it("Verify State dropdown validation when registering by selecting a Country other than United States", () => {
                createAccountPage.yourAddress.selectCountry('-')
                createAccountPage.submit()
                createAccountPage.errorMessage('This country requires you to choose a State').should('not.exist')
            })

            
        }),


        describe("Zip/Postal Code field validations", () => {

            it("Verify Zip/Postal Code field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterZipCode(user.invalidLenght.zipCode)
                createAccountPage.submit()
                createAccountPage.errorMessage("The Zip/Postal code you've entered is invalid. It must follow this format: 00000").should('exist')
            })

            it("Verify Zip/Postal Code field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterZipCode(user.invalidFormat.zipCode)
                createAccountPage.submit()
                createAccountPage.errorMessage("The Zip/Postal code you've entered is invalid. It must follow this format: 00000").should('exist')
            })

        }),

        describe("Phone fields validations", () => {

            it("Verify Phone fields validation when registering by leaving empty both, the Mobile and Home phone fields.", () => {
                createAccountPage.submit()
                createAccountPage.errorMessage('You must register at least one phone number.').should('exist')
            })

            it("Verify Phone fields validation when registering by leaving empty only the Mobile phone field", () => {
                createAccountPage.yourAddress.enterHomePhone(user.valid.homePhone)
                createAccountPage.submit()
                createAccountPage.errorMessage('You must register at least one phone number.').should('not.exist')
            })

            it("Verify Phone fields validation when registering by leaving empty only the Home phone field.", () => {
                createAccountPage.yourAddress.enterMobilePhone(user.valid.mobilePhone)
                createAccountPage.submit()
                createAccountPage.errorMessage('You must register at least one phone number.').should('not.exist')
            })


            it("Verify Home Phone field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterHomePhone(user.invalidLenght.homePhone)
                createAccountPage.submit()
                createAccountPage.errorMessage('phone is too long. Maximum length: 32').should('exist')
            })

            it("Verify Home Phone field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterHomePhone(user.invalidFormat.homePhone)
                createAccountPage.submit()
                createAccountPage.errorMessage('phone is invalid').should('exist')
            })            

            it("Verify Mobile Phone field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterMobilePhone(user.invalidLenght.mobilePhone)
                createAccountPage.submit()
                createAccountPage.errorMessage('phone_mobile is too long. Maximum length: 32').should('exist')
            })

            //BUG
            it("Verify Mobile Phone field validation when registering by entering a value with invalid format.", () => {
                createAccountPage.yourAddress.enterMobilePhone(user.invalidFormat.mobilePhone)
                createAccountPage.submit()
                createAccountPage.errorMessage('mobile_phone is invalid').should('exist')
            })
            

        }),

        describe("Additional Information field validations", () => {

            it("Verify Additional Information field validation when registering by entering a value with invalid length.", () => {
                createAccountPage.yourAddress.enterAddInformation(user.invalidLenght.addInformation)
                createAccountPage.submit()
                createAccountPage.errorMessage('other is too long. Maximum length: 300').should('exist')
            })

        }),

        describe("Address alias field validations", () => {

            it("Verify Address field validation when registering by leaving the field empty. ", () => {
                createAccountPage.yourAddress.txtAddressAlias().clear()
                createAccountPage.submit()
                createAccountPage.errorMessage('alias is required.').should('exist')
            })

        })

        describe("Required fields validation", () => {

            it.skip("Verify validations when registering by entering values that meet all criteria in all fields", () => {

                const firstName = user.valid.firstName
                const lastName = user.valid.lastName
                const password = user.valid.password
                const address = user.valid.address
                const city = user.valid.city
                const state = user.valid.state
                const zipCode = user.valid.zipCode
                const country = user.valid.country
                const homePhone = user.valid.homePhone
                const mobilePhone = user.valid.mobilePhone
                const addressAlias = user.valid.addressAlias


                createAccountPage.enterAllRequired(firstName, lastName, password, address, city, state, zipCode, country, homePhone, mobilePhone, addressAlias)
                createAccountPage.submit()
                myAccountPage.heading().should('have.text', 'My account')

            })

        


        })
})