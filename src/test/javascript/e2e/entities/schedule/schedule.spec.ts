import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ScheduleComponentsPage, ScheduleUpdatePage } from './schedule.page-object';

describe('Schedule e2e test', () => {
    let navBarPage: NavBarPage;
    let scheduleUpdatePage: ScheduleUpdatePage;
    let scheduleComponentsPage: ScheduleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Schedules', () => {
        navBarPage.goToEntity('schedule');
        scheduleComponentsPage = new ScheduleComponentsPage();
        expect(scheduleComponentsPage.getTitle()).toMatch(/Schedules/);
    });

    it('should load create Schedule page', () => {
        scheduleComponentsPage.clickOnCreateButton();
        scheduleUpdatePage = new ScheduleUpdatePage();
        expect(scheduleUpdatePage.getPageTitle()).toMatch(/Create or edit a Schedule/);
        scheduleUpdatePage.cancel();
    });

    it('should create and save Schedules', () => {
        scheduleComponentsPage.clickOnCreateButton();
        scheduleUpdatePage.setTargetBarrelQuantityInput('5');
        expect(scheduleUpdatePage.getTargetBarrelQuantityInput()).toMatch('5');
        scheduleUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(scheduleUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        scheduleUpdatePage.mashbillSelectLastOption();
        scheduleUpdatePage.customerSelectLastOption();
        scheduleUpdatePage.save();
        expect(scheduleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
