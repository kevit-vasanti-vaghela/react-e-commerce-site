import React from 'react';
import classes from './Notification.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';


const Notification = (props) => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);
    let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;
  const closeBtnClasses = `fa-solid  fa-sharp fa-square-xmark `
  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <button 
      onClick={() => dispatch(uiActions.clearNotification({}))}
        style={{
            backgroundColor:'transparent', 
            border:'none'
        }}>
            <i 
            className="fa-solid  fa-sharp fa-square-xmark"
            style={{backgroundColor:'#690000', fontSize:'18px', color:'white', borderColor:'white', textIndent:'-1px -1px',lineHeight:'0' }}
            ></i>
      </button>
    </section>
  )
}

export default Notification
