var app = app || {};

app.homeViewBag = (function () {
    function showWelcomePage(selector,data) {
        $.get('templates/welcome-guest.html', function (templ) {
            var renderData =  Mustache.render(templ,data);
            $(selector).html(renderData);
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

    function showHomePage(selector, data) {
        $.get('templates/welcome-user.html', function (templ) {
            var renderData =  Mustache.render(templ, data);
            $(selector).html(renderData);

        })
    }


    return {
        load: function () {
            return{
                showWelcomePage: showWelcomePage,
                showHomePage: showHomePage,
                showLoginMenu : showLoginMenu,
                showHomeMenu : showHomeMenu
            }
        }}
}());