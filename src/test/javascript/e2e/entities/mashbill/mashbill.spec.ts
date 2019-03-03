import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MashbillComponentsPage, MashbillUpdatePage } from './mashbill.page-object';

describe('Mashbill e2e test', () => {
    let navBarPage: NavBarPage;
    let mashbillUpdatePage: MashbillUpdatePage;
    let mashbillComponentsPage: MashbillComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Mashbills', () => {
        navBarPage.goToEntity('mashbill');
        mashbillComponentsPage = new MashbillComponentsPage();
        expect(mashbillComponentsPage.getTitle()).toMatch(/Mashbills/);
    });

    it('should load create Mashbill page', () => {
        mashbillComponentsPage.clickOnCreateButton();
        mashbillUpdatePage = new MashbillUpdatePage();
        expect(mashbillUpdatePage.getPageTitle()).toMatch(/Create or edit a Mashbill/);
        mashbillUpdatePage.cancel();
    });

    it('should create and save Mashbills', () => {
        mashbillComponentsPage.clickOnCreateButton();
        mashbillUpdatePage.setMashbillNameInput('mashbillName');
        expect(mashbillUpdatePage.getMashbillNameInput()).toMatch('mashbillName');
        mashbillUpdatePage.setMashbillCodeInput('mashbillCode');
        expect(mashbillUpdatePage.getMashbillCodeInput()).toMatch('mashbillCode');
        mashbillUpdatePage.setMashbillNotesInput('mashbillNotes');
        expect(mashbillUpdatePage.getMashbillNotesInput()).toMatch('mashbillNotes');
        mashbillUpdatePage.save();
        expect(mashbillUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
