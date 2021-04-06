import AbstractView from "./AbstractView.js";
import { http_post_form, http_post_json, http_get } from '../utils/request.js'
import { Autocomplete } from "../utils/autocomplete.js";

export class CreateNote extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("Settings");
  }

  async getHtml() {
      return `
        <h2 class="text-center">Create note</h2>
        <div id="error_message"></div>
        <form autocomplete="off"  id="create-note-form"><br>
        <div class="autocomplete">
          <input size="100" name="title" id="title" type="text" class="" placeholder="Title"><br>
        </div>
          <textarea cols="100" name="body" id="body" placeholder="Note..." id="exampleFormControlTextarea1" rows="10"></textarea><br>
        <div class="autocomplete">
          <input size="100" name="tags" id="tags" type="text" class="" placeholder="Tags"><br>
        </div>
          <input size="100" name="links" id="links" type="text" class="" placeholder="Links"><br>
          <button id="submit-btn">Create Note</button>
        </form>
      `;
  }

  async routine() {
    let arr_titles = [
      'note1',
      'note3',
      'note3',
      'note4',
      'note5',
    ];
    let arr_tabs = [
      'tag1',
      'tag3',
      'tag3',
      'tag4',
      'tag5',
    ];
    document.getElementById("submit-btn").addEventListener("click", CreateNote.submit_form)
    let autocomplite_title = new Autocomplete(document.getElementById("title"), arr_titles);
    let autocomplite_tags = new Autocomplete(document.getElementById("tags"), arr_tabs);
  }

  static submit_form(e) {
    e.preventDefault()

    if (!CreateNote.validateForm()) return;

    http_post_form('create-note-form', '/create', (message) => {
      document.querySelector("#error_message").innerHTML = "Note has been saved.";
      console.log("sucsees create: " + message)
    })
  }

  static validateForm() {
    let error = "";

    const title = document.getElementById('title').value.trim();
    if (title === '') {
      error += "Title can't be blank <br>"
    }

    const body = document.getElementById('body').value.trim();
    if (body === '') {
      error += "Body can't be blank <br>"
    }

    const links = document.getElementById('links').value.trim();
    if (links === '') {
      error += "Links field can't be blank <br>"
    }

    const tags = document.getElementById('tags').value.trim();
    if (tags === '') {
      error += "Tags field can't be blank <br>"
    }

    if (error === "") {
      document.querySelector("#error_message").innerHTML = "Sending...";
      return true
    } else {
      document.querySelector("#error_message").innerHTML = error;
    }
  }
  
}