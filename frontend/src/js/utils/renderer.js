import { http_post_form, http_post_json, http_get } from '../utils/request.js'
import { Autocomplete } from "../utils/autocomplete.js";
import { fromDbColumnFormat } from './tools.js';
import { Router } from './router.js';

export class Renderer {

  static setAppHtml(html) {
    document.querySelector("#app").innerHTML = html;
  }

  static renderNoteView(note) {

    let date = new Date(note.creating_timestamp*1000)

    let links = generateButtonsFromDbFormat(note.links, "link_button")
    let tags = generateButtonsFromDbFormat(note.tags, "tag_button")

    let html = `
    <div class="note_view">
      Note ${note.id}:  ${note.title}<br>
      ====================<br>
      <div class="note_body">
        ${note.body}<br>
      </div>
        creation date: ${date}<br>
        tags: ${tags}<br>
        links: ${links}<br>
    </div>
    <div class="button_section">
      <button id='${note.id}' name='edit-note-btn'>Edit</button>
      <button id='${note.id}:${note.title}' name='create-linked-note-btn'>Create linked note</button>
    </div>
    `;

    Renderer.setAppHtml(html);

    document.querySelectorAll('.note_view')[0].addEventListener('click', (e) => {
        if(e.target.className == "link_button"){
          Router.navigateTo(`/view-note/${e.target.dataset.button_id}`)
        }
      })

    function generateButtonsFromDbFormat(db_elements, class_name) {
      let button_html = ''
      fromDbColumnFormat(db_elements).forEach((element) => {
        button_html += `
        <button class='${class_name}' data-button_id="${element.id}">${element.value}</button>
        `
      })
      return button_html
    }
  }

  static renderNoteHeads(note) {
    let html = '<div id="note_list">';

    note.reverse().forEach(element => {
      html += "<div><br>"
      html += element.title + "<br>"
      html += `<button id='${element.id}' name='open-note-btn'>Open</button>`
      html += `<button id='${element.id}' name='delete-note-btn'>Delete</button>`
      html += "</div>"
    });

    html += '</div>';
    Renderer.setAppHtml(html);
  }

}