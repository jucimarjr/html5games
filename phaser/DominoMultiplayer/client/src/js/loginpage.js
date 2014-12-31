/*global Utils*/

/* Not called */

var LoginPage = function () {
    'use strict';
    return this;
};

LoginPage.prototype = {
    loginButtonClick: function () {
        'use strict';
        Utils.validateLogin("fpbfabio", "1234");
    }
};