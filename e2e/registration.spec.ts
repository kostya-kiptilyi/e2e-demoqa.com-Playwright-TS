import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registration.page';
import { 
  firstName, lastName, mobileNumber, successMessage, genderMale, email, 
  birthMonth, birthYear, dateOfBirth, subjectShort, subjectFull, 
  currentAddress, state, city, genderFemale, dateOfBirthFormatted, 
  hobbySports, namePicture, patchPicture 
} from '../testData/testData';

test.describe('Student Registration Form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/automation-practice-form');
  });

  test('TC_01: Verify that Student Registration Form opens successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://demoqa.com/automation-practice-form');
  });

  test('TC_02: Verify that a user can successfully register with required fields', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillFirstName(firstName);
    await registrationPage.verifyFirstName(firstName);

    await registrationPage.fillLastName(lastName);
    await registrationPage.verifyLastName(lastName);

    await registrationPage.selectGender('1');
    await registrationPage.verifyGenderSelected('1');

    await registrationPage.fillMobileNumber(mobileNumber);
    await registrationPage.verifyMobileNumber(mobileNumber);

    await registrationPage.clickSubmit();
    await registrationPage.verifyModalHeaderText(successMessage);

    await registrationPage.verifyStudentName(`${firstName} ${lastName}`);
    await registrationPage.verifyGenderText(genderMale);
    await registrationPage.verifyMobileNumberInTable(mobileNumber);
    await registrationPage.verifyDateOfBirthIsVisibleAndIsNotEmptyInTable();

    await registrationPage.verifyCloseBtnInTable();
  });

  test('TC_03: Verify that a user can successfully register by filling all fields', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.uploadFile(patchPicture);

    await registrationPage.fillFirstName(firstName);
    await registrationPage.verifyFirstName(firstName);

    await registrationPage.fillLastName(lastName);
    await registrationPage.verifyLastName(lastName);

    await registrationPage.fillUserEmail(email);
    await registrationPage.verifyUserEmail(email);

    await registrationPage.selectGender('2');
    await registrationPage.verifyGenderSelected('2');

    await registrationPage.fillMobileNumber(mobileNumber);
    await registrationPage.verifyMobileNumber(mobileNumber);

    await registrationPage.fillDateOfBirth(birthMonth, birthYear);
    await registrationPage.verifyDateOfBirthInTable(dateOfBirth);

    await registrationPage.selectSubject(subjectShort);
    await registrationPage.verifySubject(subjectFull);

    await registrationPage.selectHobby('1');
    await registrationPage.verifyHobbySelected('1');

    await registrationPage.fillCurrentAddress(currentAddress);
    await registrationPage.verifyCurrentAddress(currentAddress);

    await registrationPage.selectState(state);
    await registrationPage.verifyState(state);

    await registrationPage.selectCity(city);
    await registrationPage.verifyCity(city);

    await registrationPage.clickSubmit();
    await registrationPage.verifyModalHeaderText(successMessage);

    await registrationPage.verifyStudentName(`${firstName} ${lastName}`);
    await registrationPage.verifyStudentEmail(email);
    await registrationPage.verifyGenderText(genderFemale);
    await registrationPage.verifyMobileNumberInTable(mobileNumber);
    await registrationPage.verifyDateOfBirthInTable(dateOfBirth);
    await registrationPage.verifySubjectInTable(subjectFull);
    await registrationPage.verifyHobbyInTable(hobbySports);
    await registrationPage.verifyPictureInTable(namePicture);
    await registrationPage.verifyAddressInTable(currentAddress);
    await registrationPage.verifyStateAndCityInTable(`${state} ${city}`);

    await registrationPage.verifyCloseBtnInTable();
  });

});