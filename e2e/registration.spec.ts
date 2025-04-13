import { test, expect } from '@playwright/test';
import {RegistrationPage} from '../pages/registration.page';
import {firstName, lastName, mobileNumber,successMessage, genderMale} from '../testData/testData'

test.describe('Student Registration Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/automation-practice-form');
  });

  test('TC_01 Verify that Student Registration Form opens successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://demoqa.com/automation-practice-form')
  });

  test('TC_02 Verify that a user can successfully register by filling out the required fields', async ({page}) => {
    const registrationPage = new RegistrationPage(page)
    await registrationPage.fillFirstName(firstName);
    await registrationPage.verifyFirstNameIsFilledWith(firstName);

    await registrationPage.fillLastName(lastName);
    await registrationPage.verifyLasttNameIsFilledWith(lastName);

    await registrationPage.checkGenderRadioBtn('1');
    await registrationPage.verifyThatGenderRadioButtonIsChecked('1');

    await registrationPage.fillMobileNumber(mobileNumber);
    await registrationPage.verifyMobileNumberIsFilledWith(mobileNumber);

    await registrationPage.clickOnSubmitBtn();
    await registrationPage.verifySuccessMessageIsDisplayed(successMessage);
    
    await registrationPage.verifyStudentNmaeIsDisplayedInTable(firstName + ' ' + lastName);
    await registrationPage.verifyGenderIsVisibleInTable(genderMale);
    await registrationPage.verifyMobileNumberIsVisibleInTable(mobileNumber);
    await registrationPage.verifyDateOfBirthIsVisibleInTable();
    await registrationPage.verifyCloseBtnIsVisibleFromTable();
  });

});