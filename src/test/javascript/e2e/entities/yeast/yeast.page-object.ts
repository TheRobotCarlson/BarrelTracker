import { element, by, promise, ElementFinder } from 'protractor';

export class YeastComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-yeast div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class YeastUpdatePage {
    pageTitle = element(by.id('jhi-yeast-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    yeastNameInput = element(by.id('field_yeastName'));
    yeastCodeInput = element(by.id('field_yeastCode'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setYeastNameInput(yeastName): promise.Promise<void> {
        return this.yeastNameInput.sendKeys(yeastName);
    }

    getYeastNameInput() {
        return this.yeastNameInput.getAttribute('value');
    }

    setYeastCodeInput(yeastCode): promise.Promise<void> {
        return this.yeastCodeInput.sendKeys(yeastCode);
    }

    getYeastCodeInput() {
        return this.yeastCodeInput.getAttribute('value');
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
