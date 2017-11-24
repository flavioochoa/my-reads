import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react'

class RadioGroup extends Component {
    state = {}
    handleChange = (e, { value }) => {
        e.target.value = value;
        this.props.onChange(e, value)
    }

    render() {
        return (
            <div hidden={!this.props.isOpen}>
            {
                this.props.options.map((option, index)=>{
                    return (
                        <Checkbox key={index}
                            radio
                            label={option.label}
                            name='checkboxRadioGroup'
                            value={option.value}
                            checked={this.props.value === option.value}
                            onChange={this.handleChange}
                            className={this.props.className}
                        />
                    );
                })
            }
            </div>
          
        );
      }
}

export default RadioGroup;