/// <reference types="cypress" />
export class CreateAnAccountPage {

    // Create an Account Page attributes


    // Create an Account Page elements
    heading = () => cy.get('.page-heading')
    btnRegister = () => cy.get("#submitAccount")
    errorMessagesList = () => cy.get('.alert.alert-danger ol')

    // Create an Account Page actions
    clickOutsideElement = () => cy.get('body').click(0, 0)
    submit = () => this.btnRegister().click()
    errorMessage = (errorString) => this.errorMessagesList().contains(errorString)

    personalInformation = {

        // Personal Information section elements
        title: () => cy.get("#account-creation_form .account_creation .page-subheading").eq(0),

        gender: {

            title: () => cy.get("#account-creation_form .account_creation .clearfix label"),

            lblMr: () => cy.get("label[for=id_gender1]"),
            rdoMr: () => cy.get("#id_gender1"),

            lblMrs: () => cy.get("label[for=id_gender2]"),
            rdoMrs: () => cy.get("#id_gender2"),
        },

        lblFirstName: () => cy.get("label[for=customer_firstname]"),
        txtFirstName: () => cy.get("#customer_firstname"),

        lblLastName: () => cy.get("label[for=customer_lastname]"),
        txtLastName: () => cy.get("#customer_lastname"),

        lblEmail: () => cy.get("label[for=email]"),
        txtEmail: () => cy.get("#email"),

        lblPassword: () => cy.get("label[for=passwd]"),
        txtPassword: () => cy.get("#passwd"),
        legendPassword: () => cy.get("#account-creation_form .password .form_info"),

        dateOfBirth: {

            title: () => cy.get("#account-creation_form div[class=form-group] label"), // No encontré otra forma más simple de acceder

            ddlDay: () => cy.get('select[name="days"]'),
            ddlMonth: () => cy.get('select[name="months"]'),
            ddlYear: () => cy.get('select[name="years"]'),
            ddlDayOption: () => cy.get('select[name="days"] > option'),
            ddlMonthOption: () => cy.get('select[name="months"] > option'),
            ddlYearOption: () => cy.get('select[name="years"] option'),

        },

        lblNewsletter: () => cy.get("label[for=newsletter]"),
        chkNewsletter: () => cy.get("#newsletter"),

        lblOptin: () => cy.get("label[for=optin]"),
        chkOptin: () => cy.get("#optin"),

        formError: () => cy.get('#create-account_form .form-error'),
        formOk: () => cy.get('#create-account_form .form-ok'),

        // Personal information section actions

        enterFirstName: function (firstName) { this.txtFirstName().type(firstName) },
        enterLastName: function (lastname) { this.txtLastName().type(lastname) },
        enterEmail: function (email) { this.txtEmail().type(email) },
        enterPassword: function (password) { this.txtPassword().type(password) },

        /**
         * @description Fill in all required fields within the Personal Information section
         * @param {String} firstName New user first name
         * @param {String} lastName New user last name
         * @param {String} password New user password
         * @param {String} email New user email
        */
        enterAllRequired(firstName, lastName, password, email) {
            this.enterFirstName(firstName)
            this.enterLastName(lastName)
            this.enterEmail(email)
            this.enterPassword(password)
        },

        /**
         * @description Clear all required fields within the Personal Information section
         */
        clearAllRequired() {
            this.txtFirstName().clear()
            this.txtLastName().clear()
            this.txtEmail().clear()
            this.txtPassword().clear()
        },

        /**
         * @description Enter Date of Birth
         * @param {Number} day Day of birth
         * @param {String} month Month of birth
         * @param {Number} year Year of birth
         */
        enterBirthday(day, month, year) {
            this.dateOfBirth.ddlDay().select(day)
            this.dateOfBirth.ddlMonth().select(month)
            this.dateOfBirth.ddlYear().select(year)
        }
    }

    yourAddress = {

        // Your Address section elements
        title: () => cy.get("#account-creation_form .account_creation .page-subheading").eq(1),


        lblFirstName: () => cy.get("label[for=firstname]"),
        txtFirstName: () => cy.get("#firstname"),

        lblLastName: () => cy.get("label[for=lastname]"),
        txtLastName: () => cy.get("#lastname"),

        lblCompany: () => cy.get("label[for=company]"),
        txtCompany: () => cy.get("#company"),

        lblAddress1: () => cy.get("label[for=address1]"),
        txtAddress1: () => cy.get("#address1"),
        legendAddress1: () => cy.get("#address1").siblings('.inline-infos'),

        lblAddress2: () => cy.get("label[for=address2]"),
        txtAddress2: () => cy.get("#address2"),
        legendAddress2: () => cy.get("#address2").siblings('.inline-infos'),

        lblCity: () => cy.get("label[for=city]"),
        txtCity: () => cy.get("#city"),

        lblState: () => cy.get("label[for=id_state]"),
        ddlState: () => cy.get("#id_state"),
        ddlStateOptions: () => cy.get("#id_state option"),
        groupState: () => cy.get('.required.id_state.select.form-group'),

        lblZipCode: () => cy.get("label[for=postcode]"),
        txtZipCode: () => cy.get("#postcode"),
        groupZipCode: () => cy.get('.required.postcode.form-group'),

        lblCountry: () => cy.get("label[for=id_country]"),
        ddlCountry: () => cy.get("#id_country"),
        ddlCountrySelectedOption: () => cy.get("#id_country option[selected=selected]"),

        lblAddInformation: () => cy.get("label[for=other]"),
        txtAddInformation: () => cy.get("#other"),
        legendAddInformation: () => cy.get(".textarea").siblings('.inline-infos'),

        lblHomePhone: () => cy.get("label[for=phone]"),
        txtHomePhone: () => cy.get("#phone"),

        lblMobilePhone: () => cy.get("label[for=phone_mobile]"),
        txtMobilePhone: () => cy.get("#phone_mobile"),

        lblAddressAlias: () => cy.get("label[for=alias]"),
        txtAddressAlias: () => cy.get("#alias"),

        // Your Address section actions
        enterFirstName: function (firstName) { this.txtFirstName().type(firstName) },
        enterLastName: function (lastname) { this.txtLastName().type(lastname) },
        enterCompany: function (company) { this.txtCompany().type(company) },
        enterAddress1: function (address) { this.txtAddress1().type(address) },
        enterCity: function (city) { this.txtCity().type(city) },
        enterZipCode: function (zipCode) { this.txtZipCode().type(zipCode) },
        enterAddInformation: function (addInformation) { this.txtAddInformation().type(addInformation) },
        enterHomePhone: function (homePhone) { this.txtHomePhone().type(homePhone) },
        enterMobilePhone: function (mobilePhone) { this.txtMobilePhone().type(mobilePhone) },
        enterAddressAlias: function (addressAlias) { this.txtAddressAlias().type(addressAlias) },

        selectCountry: function (country) { this.ddlCountry().select(country) },
        selectState: function (state) { this.ddlState().select(state) }

    }

    /**
     * @description Fill in all required fields to create an account
     * @param {String} firstName User's firstname
     * @param {String} lastName User's lastname
     * @param {String} password User's account password
     * @param {String} address User's address
     * @param {String} city User's city
     * @param {String} state User's state
     * @param {Number} zipCode Zip/Postal Code of the city
     * @param {String} country User's country
     * @param {String} homePhone User's Home Phone
     * @param {String} mobilePhone User's Mobile Phone
     * @param {String} addressAlias User's Address Alias
     */
    enterAllRequired(firstName, lastName, password, address, city, state, zipCode, country, homePhone, mobilePhone, addressAlias) {
        this.personalInformation.enterFirstName(firstName)
        this.personalInformation.enterLastName(lastName)
        this.personalInformation.enterPassword(password)
        this.yourAddress.enterAddress1(address)
        this.yourAddress.enterCity(city)
        this.yourAddress.selectCountry(country)
        this.yourAddress.selectState(state)
        this.yourAddress.enterZipCode(zipCode)
        if (Math.random() < 0.5) {
            this.yourAddress.enterHomePhone(homePhone)
        } else {
            this.yourAddress.enterMobilePhone(mobilePhone)
        }
        this.yourAddress.txtAddressAlias().clear()
        this.yourAddress.enterAddressAlias(addressAlias)
    }

}

