/*
    File contains functions for fetching data from localStorage
 */

//Function fetches saved products from localStorage
export const getProducts = () => {
    let result = [];
    try {
        result = JSON.parse(localStorage.getItem('products'));
    } catch(e) {
       console.log('Error occurred while fetching products -> ', e);
    }
    return result
};

//Function fetches saved selected language from localStorage
export const getLanguage = () => {
    let result = '';
    try {
        result = JSON.parse(localStorage.getItem('lang'));
        //if there is no lang in localStorage set default language English
        result = result ? result : 'English';
    } catch(e) {
        console.log('Error occurred while fetching selected language ->', e);
    }
    return result
};