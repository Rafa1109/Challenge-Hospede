import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';
import { logout, getUser } from '../../services/auth';
import './style.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            tarefa: '',
            edTarefa: '',
            tarefas: [],
            idTarefa: '',
            error: ''
        }
    }

    componentDidMount(){
        this.loadTarefas();
    }

    loadTarefas = async () => {
        const response = await api.get(`/users/${getUser()._id}/todo`);
        this.setState({ tarefas: response.data.data});
    }

    handleCreateTarefa = async e => {
        e.preventDefault();

        const tarefa = {
            value: this.state.tarefa
        }

        
            try{
                const response = await api.post(`/users/${getUser()._id}/todo`, tarefa);
                if(response.status === 201){
                    this.loadTarefas();
                    this.setState({ tarefa: ''});
                } else {
                    this.setState({ error: 'Não foi possível adicionar tarefa!'})
                }
            } catch (e){
                console.log(e);
                this.setState({ error: 'Erro!'})
            }
        
    }

    editarTarefa = (id, tarefa) => {
        this.setState({ idTarefa: id, edTarefa: tarefa })
    }

    handleUpdateTarefa = async e => {
        e.preventDefault();

        const tarefa = {
            value: this.state.edTarefa
        }
        try{
            const response = await api.put(`/users/${getUser()._id}/todo/${this.state.idTarefa}`, tarefa);
            if(response.status === 200){
                this.loadTarefas();
                this.setState({ edTarefa: '', idTarefa: ''});
            }
        }catch (e){
            console.log(e);
            this.setState({ error: 'Erro!'})
        }
    }

    handleDeleteTarefa = async id =>{
        await api.delete(`/users/${getUser()._id}/todo/${id}`);
        this.loadTarefas();
    }

    handleLogOut = async (e, id) =>{
        e.preventDefault();
        logout();
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="container-home">
                <header className="header-main">
                    <h1>Hospede</h1>
                    <h2 id="name-user">Olá {getUser().name}</h2>
                    <button onClick={this.handleLogOut}>Sair</button>
                </header>
                <div className="div-tarefas">
                    <h4>Adicionar nova tarefa</h4>
                    <p>{this.state.error}</p>
                    <form className="form-tarefa" onSubmit={this.handleCreateTarefa}>
                        <input 
                            className="form-control form-control-lg input-tarefa"
                            type="text"
                            placeholder="Adicione uma nova tarefa aqui!"
                            value={this.state.tarefa}
                            onChange={e =>  this.setState({ tarefa: e.target.value})}
                        />
                        <button type="submit" className="btn btn-success">Adicionar</button>
                    </form>
                </div>
                
                <div className="div-tarefas">
                    <h4>Editar Tarefa</h4>
                    <form className="form-edTarefas" onSubmit={this.handleUpdateTarefa}>
                            <input 
                                className="form-control form-control-lg input-tarefa"
                                type="text"
                                placeholder="Edite a tarefa"
                                value={this.state.edTarefa}
                                disabled={!this.state.edTarefa}
                                onChange={e => this.setState({edTarefa: e.target.value})}
                            />
                            <button type="submit" disabled={!this.state.edTarefa} className="btn btn-info botao">Salvar</button>
                    </form>
                </div>

                <div>
                    <section className="lista-tarefas">
                        <h3>Lista de Tarefas</h3>
                        <table className="table table-hover table-bordered tabela-tarefa">
                            <thead>
                                <tr>
                                    <th scope="col">Tarefa</th>
                                    <th scope="col">Ação</th>
                                </tr>
                            </thead>
                            {this.state.tarefas.map(tarefa => (
                                <tbody>
                                    <tr key={tarefa._id}>
                                        <td>{tarefa.value}</td>
                                        <td><button
                                            className="btn btn-primary botao-lista"
                                            onClick={() => this.editarTarefa(tarefa._id, tarefa.value)}>Editar</button>
                                            <button 
                                            className="btn btn-danger botao-lista"
                                            onClick={() => this.handleDeleteTarefa(tarefa._id)}>Excluir</button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </section>
                </div>

            </div>
        )
    }
}

export default withRouter(Home);