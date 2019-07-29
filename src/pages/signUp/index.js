import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';
import Logo from '../../asserts/logo.png';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        };

    }
    

    handleSignUp = async e => {
       e.preventDefault();
       const user = this.state;
       if(!user.name || !user.email || !user.password){
           this.setState({ error: "Preencha todos os campos!" })
       } else{
           try{
               const response = await api.post('/users', user);
               if(response.status === 201){
                   this.props.history.push('/');
               }else{
                   this.setState({error: 'Erro ao registrar'})
               }
           }catch (e) {
                console.log(e);
                this.setState({ error: "Ocorreu um erro ao registrar sua conta" });
           }
       }
    };

    render(){
        return(
            <div className="container-signUp">
                <form onSubmit={this.handleSignUp}>
                    <img id="img-logo" src={Logo} alt="Logo Hospede" />
                    {this.state.error && <p id="erro">{this.state.error}</p>}
                    <input 
                        className="input-signUp"
                        text="text"
                        placeholder="Nome do Usuário"
                        value= {this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                        />
                        <input 
                            className="input-signUp"
                            type="email"
                            placeholder="Email"
                            value= {this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                        />
                        <input
                            className="input-signUp" 
                            type="password"
                            placeholder="Senha"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                        />
                        <button type="submit">Cadastrar Usuário</button>
                        <hr />
                        <Link to="/">Fazer Login</Link>
                </form>
            </div>
        )
    }

}

export default withRouter(SignUp);