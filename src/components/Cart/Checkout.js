import { useRef ,useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value =>  value.trim() === '';
const isFiveChars = value => value.trim().length === 5;


const Checkout = (props) => {
    const [formInputsvalidity, setformInputsvalidity] = useState({
        name : true,
        street : true,
        city : true,
        postalCode : true,
    });



    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
    
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        console.log(enteredPostalCodeIsValid);

        setformInputsvalidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            city : enteredCityIsValid,
            postalCode : enteredPostalCodeIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
        
        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name : enteredName,
            street : enteredStreet,
            city : enteredCity,
            postalCode : enteredPostalCode
        })
    }

    const nameControlClasses = `${classes.control} ${formInputsvalidity.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsvalidity.street ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsvalidity.city ? '' : classes.invalid}`
    const postalCodeControlClasses = `${classes.control} ${formInputsvalidity.postalCode ? '' : classes.invalid}`

    return <form className={classes.form} onSubmit={confirmHandler} >
        <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id='name' ref={nameInputRef} />
            {!formInputsvalidity.name && <p>please enter a valid name!!</p> }
        </div>
        <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input type="text" id='street' ref={streetInputRef} />
            {!formInputsvalidity.street && <p>please enter a valid street!!</p> }

        </div>
        <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsvalidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
        <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input type="text" id='city' ref={cityInputRef}/>
            {!formInputsvalidity.city && <p>please enter a valid city!!</p> }
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>

}

export default Checkout;