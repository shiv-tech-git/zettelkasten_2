import AbstractView from "./AbstractView.js";
import { NoteForm } from "../utils/NoteForm.js"
import { http_post_form, http_post_json, http_get } from '../utils/request.js'
import { Router } from "../utils/router.js";

export class CreateNote extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("Settings");
  }

  async getHtml() {
      return "";
  }

  routine() {
    NoteForm.renderNoteForm({}, 'create_mode')
  }
}