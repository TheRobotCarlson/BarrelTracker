import { element, by, promise, ElementFinder } from 'protractor';

export class BarrelComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-barrel div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class BarrelUpdatePage {
    pageTitle = element(by.id('jhi-barrel-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    lotSelect = element(by.id('field_lot'));
    customerSelect = element(by.id('field_customer'));
    batchSelect = element(by.id('field_batch'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    lotSelectLastOption(): promise.Promise<void> {
        return this.lotSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    lotSelectOption(option): promise.Promise<void> {
        return this.lotSelect.sendKeys(option);
    }

    getLotSelect(): ElementFinder {
        return this.lotSelect;
    }

    getLotSelectedOption() {
        return this.lotSelect.element(by.css('option:checked')).getText();
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

    batchSelectLastOption(): promise.Promise<void> {
        return this.batchSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    batchSelectOption(option): promise.Promise<void> {
        return this.batchSelect.sendKeys(option);
    }

    getBatchSelect(): ElementFinder {
        return this.batchSelect;
    }

    getBatchSelectedOption() {
        return this.batchSelect.element(by.css('option:checked')).getText();
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
