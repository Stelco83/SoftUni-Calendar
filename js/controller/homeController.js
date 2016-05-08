var app = app || {};

app.homeController = (function () {
    function HomeController(viewBag, model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomePage = function (selector) {
        this.viewBag.showWelcomePage(selector);
    };

    HomeController.prototype.loadLoginMenu = function (selector) {
        this.viewBag.showLoginMenu(selector);
    };
    HomeController.prototype.loadHomeMenu = function (selector) {
        this.viewBag.showHomeMenu(selector);
    };



    HomeController.prototype.loadHomePage = function (selector) {
        var data = {
            username : sessionStorage['username']
        };
        this.viewBag.showHomePage(selector, data);
    };


    return {
        load : function (viewBag, model) {
            return new HomeController(viewBag, model);
        }
    }

}());