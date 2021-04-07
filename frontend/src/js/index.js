import { Router } from "./utils/router.js";

window.addEventListener("popstate", Router.router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            Router.navigateTo(e.target.href);
        }
    });

    Router.router();
});





