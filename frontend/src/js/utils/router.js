import Dashboard from "../views/Dashboard.js";
import { ShowAll } from "../views/ShowAll.js";
import { CreateNote } from "../views/CreateNote.js";
import { Autocomplete } from "../views/Autocomplete.js";
import { NoteView } from "../views/NoteView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const routes = [
  { path: "/", view: Dashboard },
  { path: "/show_all", view: ShowAll },
  { path: "/create_note", view: CreateNote },
  { path: "/autocomplete", view: Autocomplete },
  { path: "/view-note/:id", view: NoteView },
];

export class Router {

  static getParams(match) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
  };

  static navigateTo(url) {
      history.pushState(null, null, url);
      Router.router();
  };

  static async router() {
    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
      match = {
          route: routes[0],
          result: [location.pathname]
      };
    }
    const view = new match.route.view(Router.getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();
    view.routine();
  };

}