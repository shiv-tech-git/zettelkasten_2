import AbstractView from "./AbstractView.js";
import { http_post_form, http_post_json, http_get } from '../utils/request.js'

export class ShowAll extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("ShowAll");
  }

  async getHtml() {
    http_get('/fetch-all-notes', this.showAll);
      return `
          <h1>All of the notes</h1>
      `;
  }

  showAll(data){
    console.log(data)
    let html = '<div id="note_list">';

    data.reverse().forEach(element => {
      html += "<div><br>"
      html += element.id + "   "
      html += element.title + "<br>"
      html += element.body + "<br>"
      html += `<button id='${element.id}' name='edit-note-btn'>Edit</button>`
      html += `<button id='${element.id}' name='delete-note-btn'>Delete</button>`
      html += "</div>"
    });
    document.querySelector("#app").innerHTML = html;
    document.querySelector('#note_list').addEventListener('click', ShowAll.buttonHandler)
  }

  static editNote(note_id) {
    console.log("edit " + note_id)
  }

  static deleteNote(note_id) {
    console.log("delete " + note_id)
  }

  static buttonHandler(event) {
    if (event.srcElement.name === "edit-note-btn") {
      ShowAll.editNote(event.srcElement.id)
    } else if (event.srcElement.name === "delete-note-btn") {
      ShowAll.deleteNote(event.srcElement.id)
    }
  }
}