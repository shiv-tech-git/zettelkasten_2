import AbstractView from "./AbstractView.js";
import { http_post_form, http_post_json, http_get } from '../utils/request.js'

export class CreateNote extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("Settings");
  }

  async getHtml() {
      return `
        <h2 class="text-center">Create note</h2>
        <form id="create-note-form"><br>
          <input pattern="[A-Za-z]{3}" required size="100" name="title" type="text" class="" placeholder="Title"><br>
          <textarea required cols="100" name="note" class="" placeholder="Note..." id="exampleFormControlTextarea1" rows="10"></textarea><br>
          <input required size="100" name="tags" type="text" class="" placeholder="Tags"><br>
          <input required size="100" name="links" type="text" class="" placeholder="Links"><br>
          <input required id="submit-btn" type="submit" value="Submit">
        </form>
      `;
  }

  async routine() {
    document.getElementById("submit-btn").addEventListener("click", CreateNote.submit_form)
  }

  static submit_form(e) {
    e.preventDefault()
    http_post_form('create-note-form', '/create', (o) => {console.log(o)})
  }
}