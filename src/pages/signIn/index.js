import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import api from '../../services/api';
import { login, isAuthenticated } from '../../services/auth';
import Logo from '../../asserts/hospede.svg'
import './styles.css'

class SignIn extends Component {
    constructor(props){
       super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    handleSignIn = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        if(!email || !password){
            this.setState({ error: 'Preencha todos os campos.' });
        } else {
            try {
                const response = await api.post('/users/auth', { email, password });
                login(response);
                if(isAuthenticated && response.status === 200){
                    this.props.history.push('/home');
                } else if(response.status === 401) {
                    this.setState({ error: 'E-mail e/ou senha Inválidos' });
                } else {
                    this.setState({ error: 'E-mail e/ou senha Inválidos.' });
                }
                

            } catch (error) {
                console.log(error);
                this.setState({ error: 'Ocorreu um erro inesperado.' });
            }
        }
    }

    render() {
        return (
            <div className='container-sign'>
                <form onSubmit={this.handleSignIn}>
                    <img id="img-logo" src={Logo} alt="Logo Hospede"/>
                    {this.state.error && <p id="erro">{this.state.error}</p>}

                    <input
                        className="input-sign"
                        type='email'
                        placeholder='E-mail'
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                    />

                    <input 
                        className="input-sign"
                        type='password'
                        placeholder='Senha'
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />

                    <button type='submit'>Entrar</button>
                    <hr />
                    <Link to='/signup'>Cadastrar-se</Link>

                </form>
            </div>
        )
    }

}

export default withRouter(SignIn);