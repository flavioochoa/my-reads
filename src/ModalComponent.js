import React, {Component} from 'react';
import { Header, Modal } from 'semantic-ui-react';

class ModalComponent extends Component {
    render() {
      return (
        <Modal open={this.props.open} closeIcon onClose={this.props.onClose}>
            <Header icon='idea' content={this.props.title?this.props.title:""} />
            <Modal.Content>
                {this.props.children}
            </Modal.Content>
        </Modal>
      );
    }
}

export default ModalComponent;