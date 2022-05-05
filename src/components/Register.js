import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
    // console.log(props);

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        auth.register({email, password})
        .then((res) => {
            console.log(`Register succesful: ${res}`);
            history.push('/signin');
        })
        .catch((err) => {
            console.log(`Something went wrong: ${err}`);
        })
    }

    console.log(`change values. password: ${password} Email: ${email}`);

    return(
        <section className='auth'>
            <form className='auth__form'>
                <div>
                    <h1 className='auth__title'>{props.title}</h1>
                    <input 
                        className='auth__input' 
                        id='input-email'
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                    <input 
                        className='auth__input' 
                        id='input-password'
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                </div>
                <div>
                    <button 
                        className='auth__submit'
                        type='submit'
                        onClick={handleSubmit}
                    >
                        {props.title}
                    </button>
                    <p className="auth__text">Already a member?
                    <Link to='/signin' className='auth__links'> {props.link} </Link>
                    here!
                    </p>
                </div>
                
            </form>
        </section>
    )
}

export default Register;