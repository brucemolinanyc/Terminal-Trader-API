import React from 'react'


class LoginPage extends React.Component{
    constructor(){
        super()

        this.state ={
            username: '',
            password: ''
        }
    }

    render(){
        return(
            <div>
                my login page
            </div>
        )
    }
}

export default LoginPage;