import React,{ Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class MessageNotification extends Component {
    notify = () => toast(this.props.content);

    render(){
        if(this.props.isVisible){
            this.notify();
            return (
                <ToastContainer 
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnHover
                    />
            );
        }else{
            return null;
        }
    }
}

export default MessageNotification;