import React,{ Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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
                        toastClassName="dark-toast" 
                        progressClassName="transparent-progress" 
                    />
            );
        }else{
            return null;
        }
    }
}

export default MessageNotification;