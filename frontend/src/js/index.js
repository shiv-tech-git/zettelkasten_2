// import Dashboard from "./views/Dashboard.js";
// import { ShowAll } from "./views/ShowAll.js";
// import { CreateNote } from "./views/CreateNote.js";
// import { Autocomplete } from "./views/Autocomplete.js";
// import { NoteView } from "./views/NoteView.js";
import { Router } from "./utils/router.js";


// const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// const getParams = match => {
//     const values = match.result.slice(1);
//     const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
//     const temp = Object.fromEntries(keys.map((key, i) => {
//         return [key, values[i]];
//     }))
    
//     return Object.fromEntries(keys.map((key, i) => {
//         return [key, values[i]];
//     }));
// };

// const navigateTo = url => {
//     history.pushState(null, null, url);
//     router();
// };

// const router = async () => {
//     const routes = [
//         { path: "/", view: Dashboard },
//         { path: "/show_all", view: ShowAll },
//         { path: "/create_note", view: CreateNote },
//         { path: "/autocomplete", view: Autocomplete },
//         { path: "/note/:id", view: NoteView },
//     ];

//     // Test each route for potential match
//     const potentialMatches = routes.map(route => {
//         return {
//             route: route,
//             result: location.pathname.match(pathToRegex(route.path))
//         };
//     });

//     let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

//     if (!match) {
//       match = {
//           route: routes[0],
//           result: [location.pathname]
//       };
//     }
//     const params = getParams(match);
//     const view = new match.route.view(getParams(match));

//     document.querySelector("#app").innerHTML = await view.getHtml();
//     await view.routine();
// };

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





