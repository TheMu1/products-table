import {validateForm} from "./validate";
/*
    Form save button on click action. Saves new product or edits already exisiting.
    @translatedMessages - object with translated texts
    @product - product field values
    @priceChanged - represents if price value have been changed
    @quantityChanged - represents if quantity value have been changed
    @actionType - used to determine if we should update or save new product
    @returns success object if product was saved/modified, or error object if fields validity not passed
 */
export const saveUpdateProduct = (translatedMessages, product, priceChanged, quantityChanged, actionType) => {
    let successMsg = '';
    let localProducts = JSON.parse(localStorage.getItem('products'));
    let timestamp = Date.now();
    let existingProducts = localProducts ? localProducts : [];

    //check product fields validity
    let formValidity = validateForm(existingProducts, product, translatedMessages.negative, actionType);
    if (formValidity.valid) {
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
        //truncate leading zeroes for pretty looking
        product.quantity = Number(product.quantity).toString();
        product.price = Number(product.price).toString();

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

/*
    Deletes product by given ean and updates saved products in localStorage
    @products - existing products
    @eanToDelete - actual product to delete
    @return updated product array
 */
export const deleteProduct = (products, eanToDelete) => {
    let result = products;
    result.forEach((p, index) => {
            if (eanToDelete === p.ean) {
                result.splice(index, 1);
            }
        }
    );
    localStorage.setItem('products', JSON.stringify(result));
    return result
};

/*
    Find product by ean
    @products - existing products
    @ean - product unique id to find
    @return product
 */
export const findProduct = (products, ean) => {
    let result = {};
    products.forEach((p) => {
        if (p.ean === ean) {
            result = p;
        }
    });
    return result
};

/*
    Changes product status to opposite and updates saved products in localStorage
    @products - existing products
    @ean - product ean which status will be reverted
 */
export const changeProductStatus = (products, ean) => {
    let result = products;
    result.forEach((p) => {
            if (ean === p.ean) {
                p.active = !p.active;
            }
        }
    );
    localStorage.setItem('products', JSON.stringify(result));
    return result;
};