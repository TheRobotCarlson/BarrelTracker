import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { GrainComponentsPage, GrainUpdatePage } from './grain.page-object';

describe('Grain e2e test', () => {
    let navBarPage: NavBarPage;
    let grainUpdatePage: GrainUpdatePage;
    let grainComponentsPage: GrainComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Grains', () => {
        navBarPage.goToEntity('grain');
        grainComponentsPage = new GrainComponentsPage();
        expect(grainComponentsPage.getTitle()).toMatch(/Grains/);
    });

    it('should load create Grain page', () => {
        grainComponentsPage.clickOnCreateButton();
        grainUpdatePage = new GrainUpdatePage();
        expect(grainUpdatePage.getPageTitle()).toMatch(/Create or edit a Grain/);
        grainUpdatePage.cancel();
    });

    it('should create and save Grains', () => {
        grainComponentsPage.clickOnCreateButton();
        grainUpdatePage.setGrainNameInput('grainName');
        expect(grainUpdatePage.getGrainNameInput()).toMatch('grainName');
        grainUpdatePage.save();
        expect(grainUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
