var app = app || {};
(function () {

    (function () {
        var router = Sammy(function () {

            var userViewBag = app.userViewBag.load();
            var homeViewBag = app.homeViewBag.load();
            var lectureViewBag = app.lectureViewBag.load();

            var requester = app.requester
                .load('kid_-1gIA4ETkb',
                '03236e0641c5440ea4653ecdc6d5f76d', 'https://baas.kinvey.com/');

            var selectorMenu = '#menu';
            var selector = '#container';
            var calendarSelector = "#calendar";


            var userModel = app.userModel.load(requester);
            var lectureModel = app.lectureModel.load(requester);

            var userController = app.userController.load(userViewBag, userModel);
            var homeController = app.homeController.load(homeViewBag);
            var lectureController = app.lectureController.load(lectureViewBag,lectureModel);


            this.before(function () {


            });

            this.get('#/register/', function () {
                userController.loadRegisterPage(selector)
            });

            this.get('#/login/', function () {
                userController.loadLoginPage(selector);

            });

//
            this.get('#/logout/', function () {
                userController.logout();
            });

            this.get('#/calendar/my/', function () {
                lectureController.loadMyLectures(selector);
            });

                this.get('#/calendar/list/', function () {
                lectureController.loadAllLectures(calendarSelector);
            });

            this.get('#/addLecture/', function () {
               lectureController.loadAddLectures(calendarSelector)
            });

            this.get('#/editLecture/', function () {
                lectureController.loadEditLectures(selector);
            });



            this.get('#/', function () {
                homeController.loadLoginMenu(selectorMenu);
                homeController.loadWelcomePage(selector);

            });

            this.get('#/home/', function () {
                homeController.loadHomePage(selector);
                homeController.loadHomeMenu(selectorMenu);
            });
//
//
//            //---------------------------------
//
            this.bind('redirectUrl', function (ev, data) {
                this.redirect(data.url)
            });
//
            this.bind('register', function (ev, data) {
                userController.register(data)
            });

            this.bind('login', function (ev, data) {
                userController.login(data);

            });
//
//
            this.bind('addLecture', function (ev, data) {
                lectureController.addLecture(data);
            });

            this.bind('edit-lecture', function (ev, data) {

                lectureController.editLecture(data)
            });


        });

        router.run('#/');
    }());


}());

