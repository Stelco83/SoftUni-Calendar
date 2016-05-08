var app = app || {};


app.userController = (function () {
    function UserController(viewBag, model) {

        this.veiwBag = viewBag;
        this.model = model;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.veiwBag.showLoginPage(selector)
    };
    UserController.prototype.login = function (data) {
        return this.model.login(data).then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                sessionStorage['username'] = success.username;
                noty({
                    dismissQueue: true,
                    text: 'Loggin successfull',
                    timeout : 3000,
                    type: 'success'

                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });

            },
            function (error) {
                var n = noty({
                    dismissQueue: true,
                    text: 'Invalid loggin',
                    type: 'error',
                    timeout : 3000
                });

            }
        )
    };


    UserController.prototype.loadRegisterPage = function (selector) {
        this.veiwBag.showRegisterPage(selector)
    };


    UserController.prototype.register = function (data) {
        return this.model.register(data).then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                sessionStorage['username'] = success.username;
                noty({
                    dismissQueue: true,
                    text: 'Register successfull',
                    timeout : 3000,
                    type: 'success'});

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'});
                })
            },
            function (error) {
                noty({
                    dismissQueue: true,
                    text: 'Invalid registration',
                    timeout : 3000,
                    type: 'error'});
            }
        ).done();
    };


    UserController.prototype.logout = function () {
        return this.model.logout().then(function () {
            sessionStorage.clear();

            Sammy(function () {
                this.trigger('redirectUrl', {url: '#/'})
            });
        })
    };


    return {
        load: function (viewBag, model) {
            return new UserController(viewBag, model)
        }
    }


}());