const baseURL = window.location.hostname.includes('127.0.0.1')
    ? 'http://127.0.0.1:5500/Login'
    : 'https://vimamoraes.github.io/Trabalho'

/**
 * loginFirebase
 * Realiza a autenticação do usuário no firabase
 * @param {String} email - email do usuário
 * @param {String} senha - senha do usuário
 * @return {object} - Objeto com o usupario logado
 */
function loginFirebase(email, senha) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(result => {
            alert(`Bem vindo, ${JSON.stringify(result.user.email)}`)
            window.location.href = `${baseURL}/home.html`
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
                    mensagem = 'Tente novamente!'
            }
            alert(`Não foi possivel obter acesso: ${mensagem}`)
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
            window.location.href = `${baseURL}/index.html`
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
                    mensagem = 'Tente novamente!'
            }
            alert(`Não foi possivel cadastrar o usuário: ${mensagem}`)
            console.log(error.message);
        })
}
/**
 * verificaLogado.
 * Verifica se o usuário deve ter acesso a página que será carregada
 * @return {null} - Caso não esteja logado, redireciona para o início
 */
function verificaLogado() {
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log('Usuário logado!')
            } else {
                console.log('Usuário não logado. Redirecionando...')
                window.location.href = `${baseURL}/index.html`
            }
        })
}
/**
 * logoutFirebase.
 * Realiza o logout do usuário no Firebase.
 * @return {null} - Redireciona o usuário para o login
 */
function logout() {
    firebase
        .auth()
        .signOut()
        .then(function () {
            alert('Realizando o logout do usuário!')
            window.location.href = baseURL
        })
        .catch(function (error) {
            alert(`Não foi possível efetuar o logout, Erro: ${error.message}`)
        });
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
