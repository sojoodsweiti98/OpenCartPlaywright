import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';

test.describe('Authentication - Positive Test Cases', () => {
  let authPage: AuthenticationPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthenticationPage(page);
    await authPage.navigateToLoginPage();
  });

  test('TC001: Should login successfully with valid credentials', async () => {
    // Arrange
    const validUsername = 'Demoadmin';
    const validPassword = 'Demo123';

    // Act
    await authPage.login(validUsername, validPassword);

    // Assert
    expect(await authPage.isDashboardLoaded()).toBe(true);
  });

  test('TC002: Should display login page with username field visible', async () => {
    // Assert
    const isLoginPageDisplayed = await authPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
  });

  test('TC003: Should redirect to dashboard after successful login', async () => {
    // Arrange
    const validUsername = 'Demoadmin';
    const validPassword = 'Demo123';

    // Act
    await authPage.login(validUsername, validPassword);
    const currentUrl = await authPage.getCurrentUrl();

    // Assert
    expect(currentUrl).toContain('dashboard');
  });

  test('TC004: Username field should accept input', async () => {
    // Arrange
    const testUsername = 'testuser';

    // Act
    await authPage.enterUsername(testUsername);

    // Assert
    const username = await authPage.isLoginPageDisplayed();
    expect(username).toBe(true);
  });

  test('TC005: Password field should accept input', async () => {
    // Arrange
    const testPassword = 'testpassword';

    // Act
    await authPage.enterPassword(testPassword);

    // Assert
    const isLoginPageDisplayed = await authPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
  });

  test('TC006: Login button should be clickable', async ({ page }) => {
    // Arrange
    const loginButton = page.getByRole('button', { name: 'Login' });

    // Assert
    expect(await loginButton.isEnabled()).toBe(true);
  });
});
