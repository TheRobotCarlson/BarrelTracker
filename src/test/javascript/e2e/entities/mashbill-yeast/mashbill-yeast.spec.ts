import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MashbillYeastComponentsPage, MashbillYeastUpdatePage } from './mashbill-yeast.page-object';

describe('MashbillYeast e2e test', () => {
    let navBarPage: NavBarPage;
    let mashbillYeastUpdatePage: MashbillYeastUpdatePage;
    let mashbillYeastComponentsPage: MashbillYeastComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MashbillYeasts', () => {
        navBarPage.goToEntity('mashbill-yeast');
        mashbillYeastComponentsPage = new MashbillYeastComponentsPage();
        expect(mashbillYeastComponentsPage.getTitle()).toMatch(/Mashbill Yeasts/);
    });

    it('should load create MashbillYeast page', () => {
        mashbillYeastComponentsPage.clickOnCreateButton();
        mashbillYeastUpdatePage = new MashbillYeastUpdatePage();
        expect(mashbillYeastUpdatePage.getPageTitle()).toMatch(/Create or edit a Mashbill Yeast/);
        mashbillYeastUpdatePage.cancel();
    });

    it('should create and save MashbillYeasts', () => {
        mashbillYeastComponentsPage.clickOnCreateButton();
        mashbillYeastUpdatePage.setQuantityInput('5');
        expect(mashbillYeastUpdatePage.getQuantityInput()).toMatch('5');
        mashbillYeastUpdatePage.yeastSelectLastOption();
        mashbillYeastUpdatePage.mashbillSelectLastOption();
        mashbillYeastUpdatePage.save();
        expect(mashbillYeastUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
