import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MashbillGrainComponentsPage, MashbillGrainUpdatePage } from './mashbill-grain.page-object';

describe('MashbillGrain e2e test', () => {
    let navBarPage: NavBarPage;
    let mashbillGrainUpdatePage: MashbillGrainUpdatePage;
    let mashbillGrainComponentsPage: MashbillGrainComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MashbillGrains', () => {
        navBarPage.goToEntity('mashbill-grain');
        mashbillGrainComponentsPage = new MashbillGrainComponentsPage();
        expect(mashbillGrainComponentsPage.getTitle()).toMatch(/Mashbill Grains/);
    });

    it('should load create MashbillGrain page', () => {
        mashbillGrainComponentsPage.clickOnCreateButton();
        mashbillGrainUpdatePage = new MashbillGrainUpdatePage();
        expect(mashbillGrainUpdatePage.getPageTitle()).toMatch(/Create or edit a Mashbill Grain/);
        mashbillGrainUpdatePage.cancel();
    });

    it('should create and save MashbillGrains', () => {
        mashbillGrainComponentsPage.clickOnCreateButton();
        mashbillGrainUpdatePage.setQuantityInput('5');
        expect(mashbillGrainUpdatePage.getQuantityInput()).toMatch('5');
        mashbillGrainUpdatePage.grainSelectLastOption();
        mashbillGrainUpdatePage.mashbillSelectLastOption();
        mashbillGrainUpdatePage.save();
        expect(mashbillGrainUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
