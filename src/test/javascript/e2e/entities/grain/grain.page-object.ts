import { element, by, promise, ElementFinder } from 'protractor';

export class GrainComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-grain div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class GrainUpdatePage {
    pageTitle = element(by.id('jhi-grain-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    grainNameInput = element(by.id('field_grainName'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setGrainNameInput(grainName): promise.Promise<void> {
        return this.grainNameInput.sendKeys(grainName);
    }

    getGrainNameInput() {
        return this.grainNameInput.getAttribute('value');
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
