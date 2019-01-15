import {
  Form, Input, Select, Button,
} from 'antd';

const { Option } = Select;

class PriceInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'btc',
    };
  }

  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }

  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="btc">BTC</Option>
          <Option value="eth">ETH</Option>
          <Option value="bch">BCH</Option>
          <Option value="eos">EOS</Option>
        </Select>
      </span>
    );
  }
}

// A simple betting form. This is a person to person (1-1)
// straight bet. Person A bets Person B a set amount. 
// Example headline: NFL Detroit Lions loose.
// Example Terms: Lions loose game 20 against Minnesota Vikings by 10pts or more. 
// Example Wager: 0.003 BTC
class SimpleBettingForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item 
          label="Headline"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('headline', {
            rules: [{ required: true, message: 'Please input your headline!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item 
          label="Terms"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('terms', {
            rules: [{ required: true, message: 'Please input your betting terms!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item 
          label="Wager"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('wager', {
            initialValue: { number: 0, currency: 'btc' },
            rules: [{ required: true, validator: this.checkPrice }],
          })(<PriceInput />)}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

const simple = Form.create({ name: 'simple_betting_form' })(SimpleBettingForm);
export default simple