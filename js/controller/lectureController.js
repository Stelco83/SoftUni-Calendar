var app = app || {};

app.lectureController = (function () {
    function LectureController(viewBag, model) {
        this.viewBag = viewBag;
        this.model = model;
    }

    LectureController.prototype.loadMyLectures = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];

        this.model.getMyLectures(userId).then(function (data) {
            var result = {
                lectures: []
            };
            data.forEach(function (lecture) {
                result.lectures.push({
                    title: lecture.title,
                    start: lecture.start,
                    end: lecture.end,
                    lecturer: lecture.lecturer
                })
            });

            _this.viewBag.showMyLectures(selector, result);

        })
    };

    LectureController.prototype.loadAllLectures = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];

        this.model.getAllLectures(userId).then(function (data) {
            var result = {
                lectures: []
            };
            data.forEach(function (lecture) {
                result.lectures.push({
                    title: lecture.title,
                    start: lecture.start,
                    end: lecture.end,
                    lecturer: lecture.lecturer
                })
            });

            _this.viewBag.showAllLectures(selector, result);

        })
    };

    LectureController.prototype.addLecture = function (data) {
        var result = {
            title: data.title,
            start: data.start,
            end: data.end,
            lecturer: data.lecturer
        };
        this.model.addLecture(result).then(function (success) {
            var lectureId = {
                lectureId: success._id
            };
            Sammy(function () {
                this.trigger('redirectUrl', {url: '#/calendar/list/'});
            });
        })
    };

    LectureController.prototype.loadEditLectures = function (selector, data) {
        var _this = this;
        this.viewBag.showEditLecture(selector, data);
    };
    LectureController.prototype.loadAddLectures = function (selector) {
        this.viewBag.showAddLecture(selector);
    };

    LectureController.prototype.editLecture = function (data) {
        var _this = this;
        _this.model.loadEditLectures(data.lectureId, data).then(function (success) {

        })
    };

    LectureController.prototype.loadDeleteLectures = function (selector) {
        var _this = this;
        _this.viewBag.showDeleteLecture(selector);
    };

    LectureController.prototype.deleteLectures = function (lectureId) {
        var _this = this;
        _this.model.deleteLectures(lectureId).then(function (success) {

        })
    };

    return {
        load: function (viewBag, model) {
            return new LectureController(viewBag, model)
        }
    }
}());