import React from "react";
import PropTypes from "prop-types";
import {Form, Checkbox} from "semantic-ui-react";
import CustomInput from "../parts/input";
import {withRouter} from "react-router";
import {onSaveClick} from "../actions/productFormActions";
import CustomButton from "../parts/customButton";
import SuccessMessage from "../parts/message";
import fields from "./fields";

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                ean: '',
                name: '',
                type: '',
                weight: '',
                flavour: '',
                active: false,
                quantity: '0',
                price: '0',
                priceHistory: [],
                quantityHistory: []
            },
            error: {
                ean: '',
                name: '',
                type: '',
                weight: '',
                flavour: '',
                quantity: '',
                price: '',
                duplicate: ''
            },
            editable: this.props.editable,
            quantityChanged: false,
            priceChanged: false,
            saved: false,
            successMessage: ''
        };
    }

    componentDidMount() {
        if (this.props.product) {
            let product = this.props.product;
            this.setState({
                product: product
            })
        }
    }

    onSaveClick = () => {
        let result = onSaveClick(this.props.language.messages, this.state.product,
            this.state.priceChanged, this.state.quantityChanged, this.props.purpose);
        this.setState({
            ...result
        });
    };

    onActiveCheckChange = () => {
        this.setState((prevState) => {
            let product = {...this.state.product, active: !prevState.product.active};
            return {
                product
            }
        })
    };

    onInputChange = (e) => {
        if (e.target.validity.valid) {
            let {quantityChanged, priceChanged} = this.state;
            const product = {...this.state.product, [e.target.name]: e.target.value};
            if (e.target.name === 'quantity') {
                quantityChanged = true;
            }
            if (e.target.name === 'price') {
                priceChanged = true;
            }
            this.setState({
                product,
                quantityChanged: quantityChanged,
                priceChanged: priceChanged,
                error: {
                    [e.target.name]: ''
                }
            })
        } else {
            this.setState({
                ...this.state.product,
                error: {
                    [e.target.name]: e.target.placeholder
                }
            })
        }
    };

    render() {
        let editable = this.state.editable;
        let form = [], buttons = [];
        let eanEditable = '', successMessage = '';
        let language = this.props.language;
        if (this.state.saved) {
            successMessage =
                <SuccessMessage
                    header="Success"
                    icon="save"
                    content={this.state.successMessage}
                />
        }
        eanEditable = !(!editable || this.props.purpose === 'edit');
        if(this.props.purpose != "view"){
            buttons.push(
                <CustomButton
                    key="1"
                    color="blue"
                    icon="arrow left"
                    btnText={language.buttons.back}
                    onClick={() => this.props.history.push('/')}
                />
            );
        }
        if (editable) {
            buttons.push(
                <CustomButton
                    key="2"
                    className="float-right"
                    color="green"
                    icon="check"
                    btnText={language.buttons.save}
                    onClick={this.onSaveClick}
                />
            );

        }
        // generate product form from fields objects
        fields.forEach( (field) => {
          form.push(
              <Form.Field key={field.name} className={this.state.error[field.name] ? "error" : ""}>
                  <label className="custom-label">{language.createPage[field.name]}</label>
                  <CustomInput
                      className="custom-input"
                      indexKey={field.name}
                      name={field.name}
                      editable={field.name === 'ean' ? eanEditable : editable}
                      onChange={this.onInputChange}
                      value={this.state.product[field.name]}
                      pattern={field.pattern}
                      placeholder={language.placeholders[field.placeholder]}
                  />
                  <label className="error-label">{this.state.error[field.name]}</label>
              </Form.Field>
          );
        });
        return (
            <Form>
                {form}
                <Form.Field inline style={{display: "flex", alignItems: "center", paddingTop: "6px", paddingBottom: "9px"}}>
                    <label className="custom-label">{language.createPage.active}</label>
                    <Checkbox toggle
                              onChange={this.onActiveCheckChange}
                              checked={this.state.product.active}
                              disabled={!editable}
                    />
                </Form.Field>
                {successMessage}
                <Form.Field>
                    {buttons}
                </Form.Field>
            </Form>
        )
    }
}

ProductForm.propTypes = {
    product: PropTypes.object,
    editable: PropTypes.bool,
    purpose: PropTypes.string,
    language: PropTypes.object,
};

export default withRouter(ProductForm)