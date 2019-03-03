import { element, by, promise, ElementFinder } from 'protractor';

export class LotComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-lot div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class LotUpdatePage {
    pageTitle = element(by.id('jhi-lot-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    barrelCapacityInput = element(by.id('field_barrelCapacity'));
    lotNameInput = element(by.id('field_lotName'));
    locationInput = element(by.id('field_location'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setBarrelCapacityInput(barrelCapacity): promise.Promise<void> {
        return this.barrelCapacityInput.sendKeys(barrelCapacity);
    }

    getBarrelCapacityInput() {
        return this.barrelCapacityInput.getAttribute('value');
    }

    setLotNameInput(lotName): promise.Promise<void> {
        return this.lotNameInput.sendKeys(lotName);
    }

    getLotNameInput() {
        return this.lotNameInput.getAttribute('value');
    }

    setLocationInput(location): promise.Promise<void> {
        return this.locationInput.sendKeys(location);
    }

    getLocationInput() {
        return this.locationInput.getAttribute('value');
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
