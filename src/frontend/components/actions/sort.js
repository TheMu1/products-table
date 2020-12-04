/*
    Sorts table data
    @param column - clumn sorted by
    @param products - products array
    @param direction - sort direction
    @return return object of sorted data, sorted column and sort direction (asc/desc)
 */
const sortData = (column, products, direction) => {
    column = column.toLowerCase();
    //check wich semantic ui sorting icon to show (arrow up or down)
    direction = direction === 'ascending' ? 'descending' : 'ascending';
    //make a copy of products array, to avoid direct initial state/array mutation
    let sortedData = [...products].sort((a, b) => {
        //detect are we sorting strings or numeric values
        if (isNumeric(a[column]) || typeof a[column] === 'boolean') {
            return a[column] - b[column];
        } else {
            //as for demo task sorting not supporting locale
            const nameA = a[column].toUpperCase();
            const nameB = b[column].toUpperCase();
            //force nameA to be string to avoid possible exceptions (just in case :) )
            return ('' + nameA).localeCompare(nameB);
        }
    });
    if (direction === 'descending') {
        sortedData.reverse();
    }
    return {
        data: sortedData,
        sortColumn: column,
        sortDirection: direction
    };
};

/*
    Helper function for sort method, checks either given value is numeric
 */
const isNumeric = (value) => {
    return /^\d+$/.test(value);
};

export default sortData;