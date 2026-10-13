export default function AuthForm({onLogin, onRegister}){
    async function handleSubmit(event) {
        event.preventDefault()

        const form = event.currentTarget
        const email = form.elements['email-input'].value
        const password = form.elements['password-input'].value
        const action = event.nativeEvent.submitter.value

        if (action == 'login') {
            await onLogin(email,password)
            form.reset()
        }else if(action == 'signup'){
            await onRegister(email,password)
        }
    }

    return <>
        <form id="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <h3>Create an account</h3>
                <div className="container px-3 py-2">
                    <input
                    type="email"
                    id="email-input"
                    placeholder="Email"
                    required
                    className="form-control"
                    />

                    <input
                    type="password"
                    id="password-input"
                    placeholder="Password (at least 6 characters)"
                    minLength="6"
                    required
                    className="form-control"
                    />
                </div>
                

            

                <div className="d-flex gap-2 justify-content-center py-3">
                    <button className="btn btn-primary" value="login">Log In</button>
                    <button className="btn btn-outline-primary" value="signup">Sign Up</button>
                </div>
            </div>
        </form>
    </>
}
    