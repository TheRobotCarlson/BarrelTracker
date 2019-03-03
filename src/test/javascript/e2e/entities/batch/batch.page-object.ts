import { element, by, promise, ElementFinder } from 'protractor';

export class BatchComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-batch div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class BatchUpdatePage {
    pageTitle = element(by.id('jhi-batch-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    proofInput = element(by.id('field_proof'));
    dateInput = element(by.id('field_date'));
    batchNameInput = element(by.id('field_batchName'));
    mashbillSelect = element(by.id('field_mashbill'));
    scheduleSelect = element(by.id('field_schedule'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setProofInput(proof): promise.Promise<void> {
        return this.proofInput.sendKeys(proof);
    }

    getProofInput() {
        return this.proofInput.getAttribute('value');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    setBatchNameInput(batchName): promise.Promise<void> {
        return this.batchNameInput.sendKeys(batchName);
    }

    getBatchNameInput() {
        return this.batchNameInput.getAttribute('value');
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

    scheduleSelectLastOption(): promise.Promise<void> {
        return this.scheduleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    scheduleSelectOption(option): promise.Promise<void> {
        return this.scheduleSelect.sendKeys(option);
    }

    getScheduleSelect(): ElementFinder {
        return this.scheduleSelect;
    }

    getScheduleSelectedOption() {
        return this.scheduleSelect.element(by.css('option:checked')).getText();
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
