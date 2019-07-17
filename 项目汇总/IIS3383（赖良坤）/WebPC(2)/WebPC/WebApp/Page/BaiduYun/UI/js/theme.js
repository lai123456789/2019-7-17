/*!
 * bootstrap-fileinput v5.0.4
 * http://plugins.krajee.com/file-input
 *
 * Font Awesome 5 icon theme configuration for bootstrap-fileinput. Requires font awesome 5 assets to be loaded.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2019, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function ($) {
    "use strict";

    $.fn.fileinputThemes.fas = {
        fileActionSettings: {
            removeIcon: '<i class="fa fa-trash-o"></i>',
            uploadIcon: '<i class="fa fa-upload"></i>',
            uploadRetryIcon: '<i class="fas fa-redo-alt"></i>',
            downloadIcon: '<i class="fas fa-download"></i>',
            zoomIcon: '<i class="fa fa-search-plus"></i>',
            dragIcon: '<i class="fas fa-arrows-alt"></i>',
            indicatorNew: '<i class="fa fa-plus-circle text-warning"></i>',
            indicatorSuccess: '<i class="fas fa-check-circle text-success"></i>',
            indicatorError: '<i class="fas fa-exclamation-circle text-danger"></i>',
            indicatorLoading: '<i class="fas fa-hourglass text-muted"></i>',
            indicatorPaused: '<i class="fa fa-pause text-info"></i>'
        },
        layoutTemplates: {
            fileIcon: '<i class="fa fa-file"></i> '
        },
        previewZoomButtonIcons: {
            prev: '<i class="fa fa-chevron-left"></i>',
            next: '<i class="fa fa-chevron-right"></i>',
            toggleheader: '<i class="fa fa-arrows-v" style="font-weight:bold;"></i>',
            fullscreen: '<i class="fa fa-arrows-alt" style="font-weight:bold;"></i>',
            borderless: '<i class="fa fa-external-link" style="font-weight:bold;"></i>',
            close: '<span  style="font-weight:bold;">X</span>'
        },
        previewFileIcon: '<i class="fa fa-file"></i>',
        browseIcon: '<i class="fa fa-file"></i>',
        removeIcon: '<i class="fa fa-trash-o"></i>',
        cancelIcon: '<i class="fas fa-ban"></i>',
        pauseIcon: '<i class="fas fa-pause"></i>',
        uploadIcon: '<i class="fa fa-cloud-upload"></i>',
        msgValidationErrorIcon: '<i class="fas fa-exclamation-circle"></i> '
    };
})(window.jQuery);
