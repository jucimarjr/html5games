/* This object is a container of magic numbers and strings which were considered interesting to be centralized in only one file */

var Config = Object.freeze({

    /* Version number */
    VERSION_NUMBER: "0.1.0",

    /* System Name */
    SYSTEM_NAME: "Dominó Amazonense",

    /* Texts */
    LOGIN_INVALID_TEXT: "Usuário ou senha inválidos",
    ERROR_CONNECTION_TEXT: "Não foi possível se conectar com o servidor",

    /* Addresses */
    PHP_VALIDATE_LOGIN_ADDRESS: "./src/php/checklogin.php",

    /* HTML Identifiers */
    LOGIN_IFRAME_ID: "LoginIframe",
    LOGIN_INPUT_ID: "LoginInput",
    PASSWORD_INPUT_ID: "PasswordInput",
    LOGIN_ERROR_DIV_ID: "LoginErrorDiv"

});