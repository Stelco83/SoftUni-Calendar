var app = app || {};

function blockSpecialChar(e){
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
}


app.userViewBag = (function () {
    function showLoginPage(selector) {
        $.get('templates/login.html', function (templ) {
            $(selector).html(templ);
            $('#login-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function () {
                    this.trigger('login', {username: username, password: password})
                });

            });


        })

    }

    function showLoginMenu(selector) {
        $.get('templates/menu-login.html', function (templ) {
            $(selector).html(templ);
        })
    }

    function showHomeMenu(selector) {
        $.get('templates/menu-home.html', function (templ) {
            $(selector).html(templ);
        })
    }


    function showRegisterPage(selector) {
        $.get('templates/register.html', function (templ) {
            $(selector).html(templ);

            $('#register-button').on('click', function () {
                var username = $('#username').val(),
                    password =  $('#password').val(),
                    confirmpassword = $('#confirm-password').val();

                    if(password != confirmpassword)

                        return error(noty);
                    function error(noty) {
                            noty({
                                dismissQueue: true,
                                text: 'Password do not match',
                                timeout : 3000,
                                type: 'error'});
                        }



                Sammy(function () {
                    this.trigger('register',
                        {username: username, password: password})
                });
            });



        })
    }


    return {
        load: function () {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage,
                showLoginMenu: showLoginMenu,
                showHomeMenu: showHomeMenu

            }
        }
    }
}());