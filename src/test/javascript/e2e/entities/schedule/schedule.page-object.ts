import { element, by, promise, ElementFinder } from 'protractor';

export class ScheduleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-schedule div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class ScheduleUpdatePage {
    pageTitle = element(by.id('jhi-schedule-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    targetBarrelQuantityInput = element(by.id('field_targetBarrelQuantity'));
    dateInput = element(by.id('field_date'));
    mashbillSelect = element(by.id('field_mashbill'));
    customerSelect = element(by.id('field_customer'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setTargetBarrelQuantityInput(targetBarrelQuantity): promise.Promise<void> {
        return this.targetBarrelQuantityInput.sendKeys(targetBarrelQuantity);
    }

    getTargetBarrelQuantityInput() {
        return this.targetBarrelQuantityInput.getAttribute('value');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    mashbillSelectLastOption(): promise.Promise<void> {
        return this.mashbillSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    mashbillSelectOption(option): promise.Promise<void> {
        return this.mashbillSelect.sendKeys(option);
    }

    getMashbillSelect(): ElementFinder {
        return this.mashbillSelect;
    }

    getMashbillSelectedOption() {
        return this.mashbillSelect.element(by.css('option:checked')).getText();
    }

    customerSelectLastOption(): promise.Promise<void> {
        return this.customerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    customerSelectOption(option): promise.Promise<void> {
        return this.customerSelect.sendKeys(option);
    }

    getCustomerSelect(): ElementFinder {
        return this.customerSelect;
    }

    getCustomerSelectedOption() {
        return this.customerSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
