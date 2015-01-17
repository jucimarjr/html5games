/* This object is a container of magic numbers and strings which were considered interesting to be centralized in only one file */

var Config = Object.freeze({

    /* SERVER */
    SERVER_PORT_SUFFIX: ":3001/",

    /* Version number */
    VERSION_NUMBER: "0.2.0",

    /* System Name */
    SYSTEM_NAME: "Dominó Amazonense",

    /* Texts */
    LOGIN_INVALID_TEXT: "Usuário ou senha inválidos",
    ERROR_CONNECTION_TEXT: "Não foi possível se conectar com o servidor",
    EMPTY_USER_TEXT: "-",
    LOGOUT_TEXT: "logout",

    /* Addresses */
    PHP_VALIDATE_LOGIN_ADDRESS: "src/php/checklogin.php",
    PHP_OBTAIN_IP_ADDRESS: "src/php/obtainip.php",
    JAVASCRIPT_SOCKET_IO_ADDRESS: "socket.io/socket.io.js",

    /* CSS Classes */
    CSS_CLASS_ROOM: "room",

    /* CSS Attributes */
    Z_INDEX_FRONT: 1,
    Z_INDEX_BACK: 0,

    /* HTML Identifiers */
    LOGIN_BUTTON_ID: "LoginButton",
    LOGIN_IFRAME_ID: "LoginIframe",
    LOGIN_INPUT_ID: "LoginInput",
    PASSWORD_INPUT_ID: "PasswordInput",
    LOGIN_ERROR_DIV_ID: "LoginErrorDiv",

    ROOMS_IFRAME_ID: "RoomsIframe",
    ROOMS_UL_ID: "RoomsUl",
    LOGOUT_BUTTON_ID: "LogoutButton",

    WAIT_MORE_PLAYERS_IFRAME_ID: "WaitMorePlayersIframe",
    BACK_BUTTON_ID: "BackButton",
    WAIT_MORE_PLAYERS_UL_ID: "WaitPlayersUl"
});