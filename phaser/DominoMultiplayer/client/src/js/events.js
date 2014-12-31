/* The possible events that trigger actions and state changes in the finite state machine*/

var Events = Object.freeze({
    INIT: "Events.INIT",
    LOGIN_TRY: "Events.LOGIN_TRY",
    LOGIN_CONFIRMED: "Events.LOGIN_CONFIRMED",
    LOGIN_REFUSED: "Events.LOGIN_REFUSED",
    ERROR_CONNECTION: "Events.ERROR_CONNECTION"
});