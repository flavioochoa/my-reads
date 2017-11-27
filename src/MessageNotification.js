import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const notify = (props) => toast(props.content);

const MessageNotification = (props) => {
    if (props.isVisible) {
        notify(props);
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
    } else {
        return null;
    }
}

export default MessageNotification;