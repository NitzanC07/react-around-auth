import { Link } from 'react-router-dom';

function Login(props) {
    // console.log(props);

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
                        placeholder='Email'
                        required
                    />
                    <input 
                        className='auth__input' 
                        id='input-password'
                        type='password'
                        name='password'
                        placeholder='Password'
                        required
                    />
                </div>
                <div>
                    <button 
                        className='auth__submit'
                        type='submit'
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