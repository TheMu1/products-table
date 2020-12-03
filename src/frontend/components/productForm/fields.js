/*
  All product form fields are described in this json
  @name - field name
  @pattern - field input pattern
  @placehoder - field placeholder name (for later translation) placeholder also used to display on active input checks
                later can be replaced with separate key:value for more different/attractive user facing messages.
*/
const fields =
[
  {
    "name": "ean",
    "pattern": "^\\d+$",
    "placeholder": "numbers"
  },
  {
    "name": "name",
    "pattern": "^[^-\\s][[a-zA-Z0-9 ]*$",
    "placeholder": "lettersNumbers"
  },
  {
    "name": "type",
    "pattern": "^[^-\\s][a-zA-Z0-9 ]*$",
    "placeholder": "lettersNumbers"
  },
  {
    "name": "weight",
    "pattern": "^\\d+([\.]\\d{0,2})?$",
    "placeholder": "numbersComma",
    "type": "text"
  },
  {
    "name": "flavour",
    "pattern": "^[^-\\s][a-zA-Z0-9 ]*$",
    "placeholder": "lettersNumbers",
  },
  {
    "name": "quantity",
    "pattern": "^\\d+$",
    "placeholder": "numbers",
    "type": "number"
  },
  {
    "name": "price",
    "pattern": "^\\d+([\\.]\\d{0,2})?$",
    "placeholder": "numbersComma",
    "type": "text"
  }
];

export default fields;