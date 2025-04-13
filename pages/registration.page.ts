import { expect, type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
    readonly page: Page;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputMobileNumber: Locator;
    readonly submitBtn : Locator;
    readonly modalHeader : Locator;
    readonly studentNameFromTable : Locator;
    readonly genderNameFromTable : Locator;
    readonly mobileNumberFromTable : Locator;
    readonly dateOfBirthFromTable : Locator;
    readonly closeBtnFromTable : Locator;
    constructor(page: Page) {
        this.page = page;
        this.inputFirstName = page.locator('//input[@id="firstName"]');
        this.inputLastName = page.locator('//input[@id="lastName"]');
        this.inputMobileNumber = page.locator('//input[@id="userNumber"]');
        this.submitBtn = page.locator('//button[@id="submit"]');
        this.modalHeader = page.locator('//div[@class="modal-header"]');
        this.studentNameFromTable = page.locator('//table/tbody/tr[1]/td[2]');
        this.genderNameFromTable = page.locator('//table/tbody/tr[3]/td[2]');
        this.mobileNumberFromTable = page.locator('//table/tbody/tr[4]/td[2]');
        this.dateOfBirthFromTable = page.locator('//table/tbody/tr[5]/td[2]');
        this.closeBtnFromTable = page.locator('//button[@id="closeLargeModal"]');
    }

    genderRadioBtn(genderRadioNumber: string): Locator {
        return this.page.locator(`//input[@id='gender-radio-${genderRadioNumber}']`);
    }

    // async registrationWithRequiredFields(firstname: string, lastname: string, genderRadioNumber: number) {
    //     await this.genderRadioBtn(genderRadioNumber).check();
    //     await expect(this.genderRadioBtn(genderRadioNumber)).toBeChecked();
    // }

    async fillFirstName(firstName: string) {
        await this.inputFirstName.fill(firstName);
    }

    async verifyFirstNameIsFilledWith(firstName: string) {
        await expect(this.inputFirstName).toHaveValue(firstName);
    }

    async fillLastName(lastName: string) {
        await this.inputLastName.fill(lastName);
    }

    async verifyLasttNameIsFilledWith(lastName: string) {
        await expect(this.inputLastName).toHaveValue(lastName);
    }

     async checkGenderRadioBtn(genderRadioNumber: string) {
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.genderRadioBtn(genderRadioNumber).check({force: true});
    }
    
    async verifyThatGenderRadioButtonIsChecked(genderRadioNumber: string) {
        await expect(this.genderRadioBtn(genderRadioNumber)).toBeChecked();
    }

    async fillMobileNumber(mobNumber: string) {
        const input = this.inputMobileNumber;
        await expect(input).toBeVisible();
        await input.click({ force: true });
        await input.fill(mobNumber);          
        await input.type(mobNumber, { delay: 50 });
    }
    
    async verifyMobileNumberIsFilledWith(mobNumber: string) {
        await expect(this.inputMobileNumber).toHaveValue(mobNumber);
    }
    
    async clickOnSubmitBtn() {
        await this.submitBtn.click();
    }

    async verifySuccessMessageIsDisplayed(textSuccessMessage: string) {
        await expect(this.modalHeader).toBeVisible();
        await expect(this.modalHeader).toHaveText(textSuccessMessage);
    }

    async verifyStudentNmaeIsDisplayedInTable(studentName: string) {
        await expect(this.studentNameFromTable).toBeVisible();
        await expect(this.studentNameFromTable).toHaveText(studentName);
    }

    async verifyGenderIsVisibleInTable(genderName: string) {
        await expect(this.genderNameFromTable).toBeVisible();
        await expect(this.genderNameFromTable).toHaveText(genderName);
    }

    async verifyMobileNumberIsVisibleInTable(mobNumber: string) {
        await expect(this.mobileNumberFromTable).toBeVisible();
        await expect(this.mobileNumberFromTable).toHaveText(mobNumber);
    }


    async verifyDateOfBirthIsVisibleInTable() {
        await expect(this.dateOfBirthFromTable).toBeVisible();
        await expect(this.dateOfBirthFromTable).not.toHaveText('')
    }

    async verifyCloseBtnIsVisibleFromTable() {
        await expect(this.closeBtnFromTable).toBeVisible();
    }

}