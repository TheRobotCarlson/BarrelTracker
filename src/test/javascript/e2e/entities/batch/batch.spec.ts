import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { BatchComponentsPage, BatchUpdatePage } from './batch.page-object';

describe('Batch e2e test', () => {
    let navBarPage: NavBarPage;
    let batchUpdatePage: BatchUpdatePage;
    let batchComponentsPage: BatchComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Batches', () => {
        navBarPage.goToEntity('batch');
        batchComponentsPage = new BatchComponentsPage();
        expect(batchComponentsPage.getTitle()).toMatch(/Batches/);
    });

    it('should load create Batch page', () => {
        batchComponentsPage.clickOnCreateButton();
        batchUpdatePage = new BatchUpdatePage();
        expect(batchUpdatePage.getPageTitle()).toMatch(/Create or edit a Batch/);
        batchUpdatePage.cancel();
    });

    it('should create and save Batches', () => {
        batchComponentsPage.clickOnCreateButton();
        batchUpdatePage.setProofInput('5');
        expect(batchUpdatePage.getProofInput()).toMatch('5');
        batchUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(batchUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        batchUpdatePage.setBatchNameInput('batchName');
        expect(batchUpdatePage.getBatchNameInput()).toMatch('batchName');
        batchUpdatePage.mashbillSelectLastOption();
        batchUpdatePage.scheduleSelectLastOption();
        batchUpdatePage.save();
        expect(batchUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
