var app = app || {};

app.lectureViewBag = (function () {
    function showMyLectures(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);


            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/addLecture/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/editLecture/'});
                            })
                        });
                        $('#deleteLecture').on('click', function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/deleteLecture/'});
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });

        });

    }

    function showAllLectures(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/all'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/editLecture/'});
                            })
                        });
                        $('#deleteLecture').on('click', function () {
                            showAddLecture(selector);
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/deleteLecture/'});
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        });


    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $('.button').on('click', function () {
                var title = $('#title').val(),
                    start = $('#starat').val(),
                    end = $('#end').val();

                Sammy(function () {
                    this.trigger('addLecture',
                        {
                            title: title,
                            start: start, end: end
                        }
                    )
                })
            })
        })
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('.button').on('click', function () {
                var title = $('#title').val(),
                    start = $('#starat').val(),
                    end = $('#end').val();

                Sammy(function () {
                    this.trigger('add-lecture',
                        {
                            title: title,
                            start: start, end: end
                        }
                    )
                })
            })
        })
    }

    function showDeleteLecture(selector, data) {

        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
        })
    }

    return {
        load: function () {
            return{
                showMyLectures: showMyLectures,
                showAllLectures: showAllLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());