/*globals window, $, _, Backbone, Validator */
(function () {
    'use strict';

    var Ghost = {
        Layout      : {},
        Views       : {},
        Collections : {},
        Models      : {},
        Validate    : new Validator(),

        settings: {
            apiRoot: '/api/v0.1'
        },

        // This is a helper object to denote legacy things in the
        // middle of being transitioned.
        temporary: {},

        currentView: null,
        router: null
    };

    _.extend(Ghost, Backbone.Events);

    Backbone.oldsync = Backbone.sync;
    // override original sync method to make header request contain csrf token
    Backbone.sync = function (method, model, options, error) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-param']").attr('content'));
        };
        /* call the old sync method */
        return Backbone.oldsync(method, model, options, error);
    };

    Ghost.init = function () {
        Ghost.router = new Ghost.Router();

        // This is needed so Backbone recognizes elements already rendered server side
        // as valid views, and events are bound
        Ghost.notifications = new Ghost.Views.NotificationCollection({model: []});

        Backbone.history.start({
            pushState: true,
            hashChange: false,
            root: '/ghost'
        });
    };

    Ghost.Validate.error = function (object) {
        this._errors.push(object);

        return this;
    };

    Ghost.Validate.handleErrors = function () {
        Ghost.notifications.clearEverything();
        _.each(Ghost.Validate._errors, function (errorObj) {

            Ghost.notifications.addItem({
                type: 'error',
                message: errorObj.message || errorObj,
                status: 'passive'
            });
            if (errorObj.hasOwnProperty('el')) {
                errorObj.el.addClass('input-error');
            }
        });
    };

    window.Ghost = Ghost;

}());
