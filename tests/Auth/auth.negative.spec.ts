import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';

test.describe('Authentication - Negative Test Cases', () => {
  let authPage: AuthenticationPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthenticationPage(page);
    await authPage.navigateToLoginPage();
  });

  test('TC101: Should not login with invalid username', async ({ page }) => {
    // Arrange
    const invalidUsername = 'InvalidUser';
    const validPassword = 'Demo123';

    // Act
    await authPage.login(invalidUsername, validPassword);
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);

    // Assert
    expect(await authPage.isErrorMessageDisplayed()).toBe(true);
  });

  test('TC102: Should not login with invalid password', async ({ page }) => {
    // Arrange
    const validUsername = 'Demoadmin';
    const invalidPassword = 'WrongPassword';

    // Act
    await authPage.login(validUsername, invalidPassword);
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);

    // Assert
    expect(await authPage.isErrorMessageDisplayed()).toBe(true);
  });

  test('TC103: Should not login with empty username', async ({ page }) => {
    // Arrange
    const emptyUsername = '';
    const validPassword = 'Demo123';

    // Act
    await authPage.login(emptyUsername, validPassword);
    
    // Wait for potential error/validation
    await page.waitForTimeout(2000);

    // Assert
    const isDashboardLoaded = await authPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(false);
  });

  test('TC104: Should not login with empty password', async ({ page }) => {
    // Arrange
    const validUsername = 'Demoadmin';
    const emptyPassword = '';

    // Act
    await authPage.login(validUsername, emptyPassword);
    
    // Wait for potential error/validation
    await page.waitForTimeout(2000);

    // Assert
    const isDashboardLoaded = await authPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(false);
  });

  test('TC105: Should not login with both username and password empty', async ({ page }) => {
    // Arrange
    const emptyUsername = '';
    const emptyPassword = '';

    // Act
    await authPage.login(emptyUsername, emptyPassword);
    
    // Wait for potential error/validation
    await page.waitForTimeout(2000);

    // Assert
    const isDashboardLoaded = await authPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(false);
  });

  test('TC106: Should not login with wrong username and wrong password', async ({ page }) => {
    // Arrange
    const invalidUsername = 'WrongUser';
    const invalidPassword = 'WrongPass';

    // Act
    await authPage.login(invalidUsername, invalidPassword);
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);

    // Assert
    expect(await authPage.isErrorMessageDisplayed()).toBe(true);
  });

  test('TC107: Should not login with username containing special characters', async ({ page }) => {
    // Arrange
    const usernameWithSpecialChars = 'Demo@admin#$%';
    const validPassword = 'Demo123';

    // Act
    await authPage.login(usernameWithSpecialChars, validPassword);
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);

    // Assert
    expect(await authPage.isErrorMessageDisplayed()).toBe(true);
  });

  test('TC108: Should remain on login page after failed login attempt', async () => {
    // Arrange
    const invalidUsername = 'InvalidUser';
    const invalidPassword = 'InvalidPass';

    // Act
    await authPage.login(invalidUsername, invalidPassword);
    
    // Assert
    const isLoginPageDisplayed = await authPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
  });

  test('TC109: Should not login with password containing only spaces', async ({ page }) => {
    // Arrange
    const validUsername = 'Demoadmin';
    const passwordWithSpaces = '     ';

    // Act
    await authPage.login(validUsername, passwordWithSpaces);
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);

    // Assert
    const isDashboardLoaded = await authPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(false);
  });

  test('TC110: Should not login with case-sensitive incorrect password', async ({ page }) => {
    // Arrange
    const validUsername = 'Demoadmin';
    const incorrectCase = 'demo123'; // lowercase instead of correct case

    // Act
    await authPage.login(validUsername, incorrectCase);
    
    // Wait for error message to appear
    await page.waitForTimeout(2000);

    // Assert
    expect(await authPage.isErrorMessageDisplayed()).toBe(true);
  });
});
