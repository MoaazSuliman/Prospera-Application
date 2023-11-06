frappe.provide("frappe.ui.misc");
frappe.ui.misc.about = function () {
    if (!frappe.ui.misc.about_dialog) {
        var d = new frappe.ui.Dialog({ title: __("Frappe Framework") });

        $(d.body).html(
            repl(
                "<div>\
                <p>" +
                __("Open Source Applications for the Web By Prospera") +
                "</p>  \
                <p><i class='fa fa-globe fa-fw'></i>\
                    Website: <a href='https://www.prospera.ws/' target='_blank'>Prospera</a></p>\
                <p><i class='fa fa-linkedin fa-fw'></i>\
                    Linkedin: <a href='https://www.linkedin.com/company/prosperaclouderp/mycompany/' target='_blank'>Prospera Linkedin</a></p>\
                <hr>\
                <h4>Installed Apps</h4>\
                <div id='about-app-versions'>Loading versions...</div>\
                <hr>\
                <p class='text-muted'>&copy; Frappe Technologies Pvt. Ltd. and contributors </p> \
                <p class='text-muted'>&copy; Prospera Systems Technologies </p> \
                </div>",
                frappe.app

            )
        );

        frappe.ui.misc.about_dialog = d;

        frappe.ui.misc.about_dialog.on_page_show = function () {
            if (!frappe.versions) {
                frappe.call({
                    method: "frappe.utils.change_log.get_versions",
                    callback: function (r) {
                        show_versions(r.message);
                    },
                });
            } else {
                show_versions(frappe.versions);
            }
        };

        var show_versions = function (versions) {
            var $wrap = $("#about-app-versions").empty();
            $.each(Object.keys(versions).sort(), function (i, key) {
                var v = versions[key];
                var title = v.title === 'ERPNext' ? 'Prospera ERP' : v.title;

                var text = v.branch
                    ? $.format("<p><b>{0}:</b> v{1} ({2})<br></p>", [
                          title,
                          v.branch_version || v.version,
                          v.branch,
                      ])
                    : $.format("<p><b>{0}:</b> v{1}<br></p>", [title, v.version]);

                $(text).appendTo($wrap);
            });
            

            frappe.versions = versions;
        };
    }

    frappe.ui.misc.about_dialog.show();
};
