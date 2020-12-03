/*
    Validates product form data
    @param products - all existing/saved products
    @param data - new product data
    @param translation - object with translated texts
    @param purpose - for proper edit/create product actions (on edit we dont need to check for duplicates as we dont editing EAn)
    @returns error object i.e error:{valid: false, ean: 'errorMsg' , price = 'errorMsg' }
 */
export const validateForm = (products, data, translation, purpose) => {
    let duplicate = false;
    let error = {};
    let formisValid = true;
    if (data.ean.length === 0) {
        error.ean = translation.eanEmpty;
        formisValid = false;
    }
    if (data.price.length === 0) {
        error.price = translation.priceEmpty;
        formisValid = false;
    }
    if (data.quantity.length === 0) {
        error.quantity = translation.quantityEmpty;
        formisValid = false;
    }
    if (purpose === 'create') {
        products.filter((p) => {
            if (p.ean === data.ean) {
                duplicate = true;
            }
        });
    }
    if (duplicate) {
        error.ean = translation.eanDuplicate;
        formisValid = false;
    }
    error.valid = formisValid;
    return error
};