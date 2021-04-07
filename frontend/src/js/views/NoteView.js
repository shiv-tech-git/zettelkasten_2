import AbstractView from "./AbstractView.js";
import { Renderer } from "../utils/renderer.js"
import { NoteForm } from "../utils/NoteForm.js"
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
      document.getElementsByName('create-linked-note-btn')[0].addEventListener('click', NoteView.createLinkedNote)
    })
    
  }

  static editNote(e) {
    e.preventDefault()
    http_post_json({id: e.srcElement.id}, "/fetch-note-by-id", (res) => {
      NoteForm.renderNoteForm(res[0], 'edit_mode')
      document.getElementById('submit-btn').addEventListener('click', NoteView.saveNote)
    })
  }

  static createLinkedNote(e){
    e.preventDefault()
    NoteForm.renderNoteForm({links: e.srcElement.id}, "linked_note")

  }

  static saveNote(e) {
    e.preventDefault()
    if(!NoteForm.validateForm()) return;
    
    http_post_json(NoteForm.collectFormData(), "/edit-note-by-id", (msg) => {
      console.log(msg)
      Router.navigateTo(`/view-note/${note_id}`)
    })
  }
}