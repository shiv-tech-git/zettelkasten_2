import AbstractView from "./AbstractView.js";
import { Router } from "../utils/router.js";
import { Renderer } from "../utils/renderer.js"
import { http_post_form, http_post_json, http_get } from '../utils/request.js'

export class ShowAll extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("ShowAll");
  }

  async getHtml() {
    http_get('/fetch-all-notes', this.showAll);
      return ``;
  }

  routine() {

  }

  showAll(note_head){
    Renderer.renderNoteHead(note_head)
    document.querySelector('#note_list').addEventListener('click', ShowAll.buttonHandler)
  }

  static buttonHandler(event) {
    if (event.srcElement.name === "open-note-btn") {
      ShowAll.openNote(event.srcElement.id)
    } else if (event.srcElement.name === "delete-note-btn") {
      ShowAll.deleteNote(event.srcElement.id)
    }
  }

  static openNote(note_id) {
    Router.navigateTo(`/view-note/${note_id}`);
  }

  static deleteNote(note_id) {
    console.log("delete " + note_id)
    http_post_json({ id: note_id }, "/delete-note-by-id", (msg) => {console.log(msg); location.reload();})
  }

}