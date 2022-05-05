import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login(props) {
    // console.log(props);

    const [history, setHistory] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        auth.login(email, password)
        .then((res) => {
            console.log(`Login succesful: ${res}`);
            history.push('/');
        })
        .catch((err) => {
            console.log(`Something went wrong: ${err}`);
        })
    }

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
                    <p className="auth__text">Not a member yet?
                    <Link to='/signup' className='auth__links'> {props.link} </Link>
                    here!
                    </p>
                </div>
                
            </form>
        </section>
    )
}

export default Login;