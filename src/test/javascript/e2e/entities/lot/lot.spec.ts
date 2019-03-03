import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LotComponentsPage, LotUpdatePage } from './lot.page-object';

describe('Lot e2e test', () => {
    let navBarPage: NavBarPage;
    let lotUpdatePage: LotUpdatePage;
    let lotComponentsPage: LotComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lots', () => {
        navBarPage.goToEntity('lot');
        lotComponentsPage = new LotComponentsPage();
        expect(lotComponentsPage.getTitle()).toMatch(/Lots/);
    });

    it('should load create Lot page', () => {
        lotComponentsPage.clickOnCreateButton();
        lotUpdatePage = new LotUpdatePage();
        expect(lotUpdatePage.getPageTitle()).toMatch(/Create or edit a Lot/);
        lotUpdatePage.cancel();
    });

    it('should create and save Lots', () => {
        lotComponentsPage.clickOnCreateButton();
        lotUpdatePage.setBarrelCapacityInput('5');
        expect(lotUpdatePage.getBarrelCapacityInput()).toMatch('5');
        lotUpdatePage.setLotNameInput('lotName');
        expect(lotUpdatePage.getLotNameInput()).toMatch('lotName');
        lotUpdatePage.setLocationInput('location');
        expect(lotUpdatePage.getLocationInput()).toMatch('location');
        lotUpdatePage.save();
        expect(lotUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
