const baseURL = "http://127.0.0.1:5500"

/**
 * loginFirebase
 * Realiza a autenticação do usuário no firabase
 * @param {String} email - email do usuário
 * @param {String} senha - senha do usuário
 * @return {object} - Objeto com o usupario logado
 */
//-----------------------------------------------------\
// Link onde tem os erros da função code               |
// https://firebase.google.com/docs/auth/admin/errors  |
//-----------------------------------------------------/
function loginFirebase(email, senha) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(result => {
            alert(`Bem vindo, ${JSON.stringify(result.user.email)}`)
            window.location.href = `${baseURL}/Login/home.html`
        })
        .catch(error => {
            let mensagem = '';
            switch (error.code) {
                case 'auth/invalid-email':
                    mensagem = 'Formato de E-mail invalido!'
                    break;
                case 'auth/user-not-found':
                    mensagem = 'E-mail não cadastrado!'
                    break;
                case 'auth/wrong-password':
                    mensagem = 'Senha Incorreta, digite novamente!'
                    break;
                default:
                    mensagem = 'tente novamente!'
            }
            alert(`Não foi possivel cadastrar o usuário: ${mensagem}`)
            console.log(error.message);
        })
}
/**
 * novoUsuario.
 * Cria um novo usuário no Firebase
 * @param {string} email - email do usuário
 * @param {string} senha - senha do usuário
 * @return {object} - O usuário criado
 */
function novoUsuario(email, senha) {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((result) => {
            alert(`Usuario, ${JSON.stringify(result.user.email)}, Cadastrado com sucesso!`)
            window.location.href = `${baseURL}/Login/index.html`
        })
        .catch(error => {
            let mensagem = '';

            switch (error.code) {
                case 'auth/invalid-email':
                    mensagem = 'O E-mail informado é inválido!'
                    break;
                case 'auth/email-already-in-use':
                    mensagem = 'O e-mail informado já está sendo utilizado!'
                    break;
                case 'auth/weak-password':
                    mensagem = 'Senha Invalida, Por favor insira 6 digitos!'
                    break;
                default:
                    mensagem = 'tente novamente!'
            }
            alert(`Não foi possivel cadastrar o usuário: ${mensagem}`)
            console.log(error.message);
        })
}
/**
 * verificaLogado
 * Verifica se o usuário está logado no sistema
 * @param {Null}
 */
function verificaLogado() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.log('Acesso inválido. Redirecionando...')
            window.location.href = baseURL
        }
    })
}
/**
 * logout
 * Ao apertar o botão de logout na pagina home, ele irá sair e voltar para a pagina de login.
 */
function logout() {
    alert('Saindo!')
    window.location.href = `${baseURL}/Login/index.html`
}
/**
 * mostrarOcultarSenha
 * Verifica o type da senha, ao clicar no check ele altera o type de password para text.
 */
function mostrarOcultarSenha() {
    var senha = document.getElementById("senhaInput");
    if (senha.type == "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}