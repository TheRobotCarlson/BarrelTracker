import { element, by, promise, ElementFinder } from 'protractor';

export class MashbillYeastComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-mashbill-yeast div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class MashbillYeastUpdatePage {
    pageTitle = element(by.id('jhi-mashbill-yeast-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));
    yeastSelect = element(by.id('field_yeast'));
    mashbillSelect = element(by.id('field_mashbill'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setQuantityInput(quantity): promise.Promise<void> {
        return this.quantityInput.sendKeys(quantity);
    }

    getQuantityInput() {
        return this.quantityInput.getAttribute('value');
    }

    yeastSelectLastOption(): promise.Promise<void> {
        return this.yeastSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    yeastSelectOption(option): promise.Promise<void> {
        return this.yeastSelect.sendKeys(option);
    }

    getYeastSelect(): ElementFinder {
        return this.yeastSelect;
    }

    getYeastSelectedOption() {
        return this.yeastSelect.element(by.css('option:checked')).getText();
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
