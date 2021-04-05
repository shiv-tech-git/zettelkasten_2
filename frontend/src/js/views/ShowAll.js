import AbstractView from "./AbstractView.js";
import { http_post_form, http_post_json, http_get } from '../utils/request.js'

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("ShowAll");
    }

    async getHtml() {
      http_get('/all', this.showAll);
        return `
            <h1>All of the notes</h1>
        `;
    }

    showAll(data){
      console.log(data)
      let html = '';

      data.forEach(element => {
        html += "<div><br>"
        html += element.id + "   "
        html += element.title + "<br>"
        html += element.body + "<br>"
        html += "</div>"
      });
      document.querySelector("#app").innerHTML = html;
    }
}