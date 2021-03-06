import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotoYourProfilePage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#yourProfileMenuItem');
  }

  async gotoHomePage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#yourProfileMenuItem');
    await testController.click('#editProfile');
  }

  async gotoCreateProfilePage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#profilesMenuItem');
  }

  async gotoProfilesPage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#profilesMenuItem');
  }

  async gotoJamsPage(testController) {
    await testController.click('#jams-dropdown');
    await testController.click('#jamsMenuItem');
  }

  async gotoAddJamPage(testController) {
    await testController.click('#jams-dropdown');
    await testController.click('#addjamMenuItem');
  }

  async gotoJamsAdminPage(testController) {
    await testController.click('#admin-dropdown');
    await testController.click('#jamsAdminMenuItem');
  }

  async gotoProfilesAdminPage(testController) {
    await testController.click('#admin-dropdown');
    await testController.click('#profilesAdminMenuItem');
  }

  async gotoEditProfileAdminPage(testController) {
    await testController.click('#admin-dropdown');
    await testController.click('#profilesAdminMenuItem');
    await testController.click('#editProfileAdmin');
  }

  async gotoEditJamAdminPage(testController) {
    await testController.click('#admin-dropdown');
    await testController.click('#jamsAdminMenuItem');
    await testController.click('#editJamAdmin');
  }

  async gotoInstrumentFilterPage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#profilesMenuItem');
    await testController.click('#instrumentProfileFilter');
  }

  async gotoInterestFilterPage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#profilesMenuItem');
    await testController.click('#interestProfileFilter');
  }

  async gotoJamFilterPage(testController) {
    await testController.click('#profiles-dropdown');
    await testController.click('#profilesMenuItem');
    await testController.click('#jamProfileFilter');
  }

}

export const navBar = new NavBar();
