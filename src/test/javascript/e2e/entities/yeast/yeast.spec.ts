import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { YeastComponentsPage, YeastUpdatePage } from './yeast.page-object';

describe('Yeast e2e test', () => {
    let navBarPage: NavBarPage;
    let yeastUpdatePage: YeastUpdatePage;
    let yeastComponentsPage: YeastComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Yeasts', () => {
        navBarPage.goToEntity('yeast');
        yeastComponentsPage = new YeastComponentsPage();
        expect(yeastComponentsPage.getTitle()).toMatch(/Yeasts/);
    });

    it('should load create Yeast page', () => {
        yeastComponentsPage.clickOnCreateButton();
        yeastUpdatePage = new YeastUpdatePage();
        expect(yeastUpdatePage.getPageTitle()).toMatch(/Create or edit a Yeast/);
        yeastUpdatePage.cancel();
    });

    it('should create and save Yeasts', () => {
        yeastComponentsPage.clickOnCreateButton();
        yeastUpdatePage.setYeastNameInput('yeastName');
        expect(yeastUpdatePage.getYeastNameInput()).toMatch('yeastName');
        yeastUpdatePage.setYeastCodeInput('yeastCode');
        expect(yeastUpdatePage.getYeastCodeInput()).toMatch('yeastCode');
        yeastUpdatePage.save();
        expect(yeastUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
