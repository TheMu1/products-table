import {validateForm} from "./validate";
/*
    Form save button on click action.
    @translatedMessages - object with translated texts
    @product - product field values
    @priceChanged - represents if price value have been changed
    @quantityChanged - represents if quantity value have been changed
    @actionType - used to determine if we should update or save new product
    @returns success object if product was saved/modified, or error object if fields validity not passed
 */
export const onSaveClick = (translatedMessages, product, priceChanged, quantityChanged, actionType) => {
    let successMsg = '';
    let localProducts = JSON.parse(localStorage.getItem('products'));
    let timestamp = Date.now();
    let existingProducts = localProducts ? localProducts : [];
    //push new price only if we made some changes
    if (priceChanged) {
        product.priceHistory.push({
            timestamp: timestamp,
            value: product.price
        });
    }
    //push new quantity only if we made some changes
    if (quantityChanged) {
        product.quantityHistory.push({
            timestamp: timestamp,
            value: product.quantity
        });
    }
    //check product fields validity
    let formValidity = validateForm(existingProducts, product, translatedMessages.negative, actionType);
    if (formValidity.valid) {
        if (actionType === 'create') {
            existingProducts.push(product);
            successMsg = translatedMessages.positive.saveSuccess;
        } else {
            const productIndex = localProducts.findIndex(e => e.ean === product.ean);
            existingProducts[productIndex] = product;
            successMsg = translatedMessages.positive.updateSuccess;
        }
        localStorage.setItem('products', JSON.stringify(existingProducts));
        return {
            saved: true,
            editable: false,
            successMessage: successMsg
        }
    } else {
        return {
            error: formValidity
        }
    }
};