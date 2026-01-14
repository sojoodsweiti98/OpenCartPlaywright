import { Page, Locator } from '@playwright/test';

export class AuthenticationPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginPageUrl: string = 'https://ocposdemo.purpletreesoftware.com/admin/';
  private dashboardUrl: string = 'https://ocposdemo.purpletreesoftware.com/admin/index.php?route=dashboard/dashboard';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(this.loginPageUrl);
  }

  /**
   * Enter username in the username input field
   * @param username - The username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password in the password input field
   * @param password - The password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform complete login with username and password
   * @param username - The username
   * @param password - The password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Check if login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  /**
   * Check if an error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    const errorMessage = this.page.locator('.alert-danger');
    return await errorMessage.isVisible();
  }

  /**
   * Get the error message text
   */
  async getErrorMessageText(): Promise<string> {
    const errorMessage = this.page.locator('.alert-danger');
    return await errorMessage.textContent() || '';
  }

  /**
   * Check if dashboard is loaded (successful login)
   */
  async isDashboardLoaded(): Promise<boolean> {
    await this.page.waitForURL(this.dashboardUrl, { timeout: 5000 }).catch(() => {});
    return this.page.url().includes('dashboard');
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Logout by clicking logout button if available
   */
  async logout(): Promise<void> {
    const logoutButton = this.page.locator('a[href*="logout"]');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }
  }
}
