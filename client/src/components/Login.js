import React from "react";


function Login({ handleLogin}) {
    const [isAdmin, setIsAdmin] = React.useState(false);

    const handleAdmin = ({type}) => {
        if (!isAdmin) {
            handleLogin(type);
        }
        setIsAdmin(!isAdmin);
    }

    const handleAdmin2 = (type) => {
        handleLogin(type);
    }

    return (
        <>
            <div className="mdl-layout__header-row">
                <button className="login-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => handleAdmin("user")}>Login</button>
                
                {isAdmin ? <button style={{ marginLeft: "5px" }} className="login-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={() => handleAdmin2("admin")}>Admin</button> : <div></div>}
            </div>
        </>
    );
}

export default Login;