

(function ($, document) {

    var loginData = {};


    $.zz_page = function (el, options) {

        /**
         * Plugin default Settings
         * @type {Object}
         */
        var defaults = {

                triggerElement: 'a[href]:not([target="_blank"])',

                content: {
                    wrap: '.main_content'
                },

                showfunction : showAnimation
            },


            /**
             * The plugin
             * @type {Object}
             */
            plugin = this,

            /**
             * the bound el
             * @type {Object}
             */
            $el = $(el),
            el = el,

            /**
             * loaded pages since last onLoad
             * @type {Array}
             */
            loadLog = [],
            actualHref,
            relUrl;


        /**
         * Data stuff
         * @type {Object}
         */
        plugin.settings = {

        };




        /**
         * init the Plugin
         */
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            // load up the dom
            $(window).load(function() {
                plugin.preparePage();
            });

            plugin.append_events();
        };


        plugin.preparePage = function() {

            relUrl = getRelUrl();

            actualHref =  relUrl;

            if(actualHref == "") {
                actualHref = '/';
            }

            var childs = $('> '+ plugin.settings.content.wrap, $el);

            childs.each(function() {

                loadLog[actualHref] = generateId();

                var comwrap = $('<div id="'+loadLog[actualHref]+'"></div>');

                $(this).wrap(comwrap);

                plugin.loadContent();

            });

        };

        plugin.append_events = function() {

//            $(document).delegate(plugin.settings.triggerElement, 'click', function(e) {
            $(plugin.settings.triggerElement).on('click', clickEvent);
//            $(document).on('click', plugin.settings.triggerElement, function(e) {

        };

        /**
         * caching logic
         */
        plugin.loadContent = function() {

            window.history.pushState("", "Title", actualHref);

            if(!loadLog[actualHref]) {
                loadLog[actualHref] = generateId();

                loadAjax();
            }
            else {
                loadCached(loadLog[actualHref]);
            }

        };

        function showAnimation(newPage) {

            if($el.children(':not(:hidden)').length == 0) {
                newPage.fadeIn(0);
            }
            else {
                $el.children(':not(:hidden)').fadeOut(500, function() {
                    newPage.fadeIn(500);
                });
            }
        }

        function getRelUrl() {

            var href = location.href,
                origin = location.origin;

            return href.replace(origin, '');
        }

        function loadCached(id) {

            plugin.settings.showfunction($('#' + id));

        }

        function loadAjax() {

            var comwrap = $('<div id="'+loadLog[actualHref]+'"></div>');

            $( comwrap ).load( actualHref + ' ' + plugin.settings.content.wrap, function() {
                $(plugin.settings.triggerElement, comwrap).on('click', clickEvent);

                plugin.settings.showfunction(comwrap);
            });


            $el.append(comwrap);


        }

        function generateId()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function clickEvent(e) {
            e.preventDefault();

            var origin = location.origin;

            actualHref =  $(this).attr('href').replace(origin, '').toString();

            // homepage
            if(actualHref == "") {
                actualHref = '/';
            }

            plugin.loadContent();

            return false;
        }

        plugin.init();
    }

    /**
     * let jQuery know about the plugin
     * @param options
     * @return {the plugin instance}
     */
    $.fn.zz_page = function (options) {
        var pluginName = 'zz_page';
        if (options == undefined && $(this).data(pluginName) != undefined) {
            return $(this).data(pluginName);
        }
        else {
            return this.each(function () {
                if (undefined == $(this).data(pluginName)) {
                    var plugin = new $.zz_page(this, options);
                    $(this).data(pluginName, plugin);
                }
            });
        }
    };
})(jQuery, document, window)