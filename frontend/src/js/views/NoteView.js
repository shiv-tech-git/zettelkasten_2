import AbstractView from "./AbstractView.js";
import { Renderer } from "../utils/renderer.js"
import { Router } from "../utils/router.js";
import { http_post_form, http_post_json, http_get } from '../utils/request.js'

export class NoteView extends AbstractView {
  constructor(params) {
      super(params);
      this.noteId = params.id;
      this.setTitle("Viewing Note");
  }

  async getHtml() {
    return ``;
  }

  routine() {
    let note_id = this.noteId
    http_post_json({id: note_id}, "/fetch-note-by-id", (msg) => {
      Renderer.renderNoteView(msg[0])
      document.getElementsByName('edit-note-btn')[0].addEventListener('click', NoteView.editNote)
    })
    
  }

  static editNote(e) {
    e.preventDefault()
    http_post_json({id: e.srcElement.id}, "/fetch-note-by-id", (msg) => {
      Renderer.renderNoteForm(msg[0], 'edit_mode')
      document.getElementById('submit-btn').addEventListener('click', NoteView.saveNote)
    })
  }

  static saveNote(e) {
    e.preventDefault()
    let form = document.getElementById('note-form')
    let note_id = form.querySelectorAll('[name="note_id"]')[0].id;

    let post_form = {
      id: note_id,
      title: form.querySelectorAll('#title')[0].value,
      body: form.querySelectorAll('#body')[0].value,
      tags: form.querySelectorAll('#tags')[0].value,
      links: form.querySelectorAll('#links')[0].value,
    }
    
    http_post_json(post_form, "/edit-note-by-id", (msg) => {
      console.log(msg)
      Router.navigateTo(`/view-note/${note_id}`)
    })
  }
}