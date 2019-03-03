import { element, by, promise, ElementFinder } from 'protractor';

export class MashbillComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-mashbill div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class MashbillUpdatePage {
    pageTitle = element(by.id('jhi-mashbill-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    mashbillNameInput = element(by.id('field_mashbillName'));
    mashbillCodeInput = element(by.id('field_mashbillCode'));
    mashbillNotesInput = element(by.id('field_mashbillNotes'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setMashbillNameInput(mashbillName): promise.Promise<void> {
        return this.mashbillNameInput.sendKeys(mashbillName);
    }

    getMashbillNameInput() {
        return this.mashbillNameInput.getAttribute('value');
    }

    setMashbillCodeInput(mashbillCode): promise.Promise<void> {
        return this.mashbillCodeInput.sendKeys(mashbillCode);
    }

    getMashbillCodeInput() {
        return this.mashbillCodeInput.getAttribute('value');
    }

    setMashbillNotesInput(mashbillNotes): promise.Promise<void> {
        return this.mashbillNotesInput.sendKeys(mashbillNotes);
    }

    getMashbillNotesInput() {
        return this.mashbillNotesInput.getAttribute('value');
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
