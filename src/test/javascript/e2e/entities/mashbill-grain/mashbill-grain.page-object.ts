import { element, by, promise, ElementFinder } from 'protractor';

export class MashbillGrainComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-mashbill-grain div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class MashbillGrainUpdatePage {
    pageTitle = element(by.id('jhi-mashbill-grain-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    quantityInput = element(by.id('field_quantity'));
    grainSelect = element(by.id('field_grain'));
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

    grainSelectLastOption(): promise.Promise<void> {
        return this.grainSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    grainSelectOption(option): promise.Promise<void> {
        return this.grainSelect.sendKeys(option);
    }

    getGrainSelect(): ElementFinder {
        return this.grainSelect;
    }

    getGrainSelectedOption() {
        return this.grainSelect.element(by.css('option:checked')).getText();
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
