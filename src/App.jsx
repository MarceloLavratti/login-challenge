import { login } from './utils';
import './index.css';
import { useEffect, useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs para controlar os inputs(useRef)
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [btnEnable, setBtnEnable] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const handleInputChange = (e) => {

    const { id, value } = e.target

    if (id === 'email') {
      setEmail(value)
    } else if (id === 'password') {
      setPassword(value)
    }
  }

  useEffect(() => {
    if (email.trim() !== '' && password.length >= 6) {
      setBtnEnable(true)
    } else {
      setBtnEnable(false)
    }
  }, [email, password])  

  const handleBtnLogin = async () => {

    setBtnEnable(false)
    if(isVisible){
      setIsVisible(false)
    }

    try {
      await login({ email, password })
      alert('Login successfull')
    } catch (error) {
      setIsVisible(true)
    } finally {
      setBtnEnable(true)
    }
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {isVisible && (
          <div className='errorMessage'>Falha no login, tente novamente</div>
        )}        
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' onChange={handleInputChange} />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} onChange={handleInputChange} />
        </div>

        <div className='button'>
          <button disabled={!btnEnable} onClick={handleBtnLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
