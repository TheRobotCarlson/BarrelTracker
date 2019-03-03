import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BarrelComponentsPage, BarrelUpdatePage } from './barrel.page-object';

describe('Barrel e2e test', () => {
    let navBarPage: NavBarPage;
    let barrelUpdatePage: BarrelUpdatePage;
    let barrelComponentsPage: BarrelComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Barrels', () => {
        navBarPage.goToEntity('barrel');
        barrelComponentsPage = new BarrelComponentsPage();
        expect(barrelComponentsPage.getTitle()).toMatch(/Barrels/);
    });

    it('should load create Barrel page', () => {
        barrelComponentsPage.clickOnCreateButton();
        barrelUpdatePage = new BarrelUpdatePage();
        expect(barrelUpdatePage.getPageTitle()).toMatch(/Create or edit a Barrel/);
        barrelUpdatePage.cancel();
    });

    it('should create and save Barrels', () => {
        barrelComponentsPage.clickOnCreateButton();
        barrelUpdatePage.lotSelectLastOption();
        barrelUpdatePage.customerSelectLastOption();
        barrelUpdatePage.batchSelectLastOption();
        barrelUpdatePage.save();
        expect(barrelUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
