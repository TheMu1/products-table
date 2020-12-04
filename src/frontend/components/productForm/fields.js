/*
  All product form fields are described in this json
  @name - field name
  @pattern - field input pattern
  @placehoder - field placeholder name (for later translation) placeholder also used to display on active input checks
                later can be replaced with separate key:value for more different/attractive user facing messages.
  @required - true if we need to add asterisk symbol to field label (mark required field)
*/
const letterNumbersRe = "^[a-zA-ZąčęėįšųūĄČĘĖĮŠŲŪ0-9](?!.*\\s{2,})[a-zA-ZąčęėįšųūĄČĘĖĮŠŲŪ0-9 ]*$";
const fields =
[
  {
    "name": "ean",
    "pattern": "^\\d+$",
    "placeholder": "numbers",
    "required": true
  },
  {
    "name": "name",
    "pattern": letterNumbersRe,
    "placeholder": "lettersNumbers"
  },
  {
    "name": "type",
    "pattern": letterNumbersRe,
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
    "pattern": letterNumbersRe,
    "placeholder": "lettersNumbers",
  },
  {
    "name": "quantity",
    "pattern": "^\\d+$",
    "placeholder": "numbers",
    "type": "number",
    "required": true
  },
  {
    "name": "price",
    "pattern": "^\\d+([\\.]\\d{0,2})?$",
    "placeholder": "numbersComma",
    "type": "text",
    "required": true
  }
];

export default fields;