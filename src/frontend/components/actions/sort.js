/*
    Sorts table data
    @param column - clumn sorted by
    @param iconColumn - column where to display sort direction icon
    @param products - table data
    @param direction - sort direction
    @return return object of sorted data, sorted column and sort direction (asc/desc)
 */
const sort = (column, iconColumn, products, direction) => {
    column = column.toLowerCase();
    direction = iconColumn ? (direction === 'ascending' ? 'descending' : 'ascending') : 'ascending';
    const sortedData = products.sort((a, b) => {
        //detect are we sorting strings or numeric values
        if (isNumeric(a[column])) {
            return a[column] - b[column];
        } else {
            const nameA = a[column].toUpperCase();
            const nameB = b[column].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
    });
    if (direction === 'descending') {
        sortedData.reverse();
    }
    return {
        data: sortedData,
        sort: {
            column,
            direction
        }
    };
};

/*
    Helper function for sort method, checks either given value is numeric or string
 */
const isNumeric = (value) => {
    return /^\d+$/.test(value);
};

export default sort;