function Register() {

    return(
        <section className="register">
            <h1 className='register__title'>Sign up</h1>
            <form className='register__form'>
                <input 
                    className='register__input' 
                    id='input-email'
                    type='email'
                    name='email'
                    placeholder='Email'
                    required
                />
                <input 
                    className='register__input' 
                    id='input-password'
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                />
                <button 
                    className='register__submit'
                    type='submit'
                >
                    Sign up
                </button>
            </form>
            <p className="register__text">Already a member? Log in here!</p>
        </section>
    )
}

export default Register