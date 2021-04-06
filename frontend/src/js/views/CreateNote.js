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
          <input size="100" name="tags" id="tags" type="text" class="" placeholder="Tags">
          <button id="create-tag-btn">Create tag</button>
        </div>
        <div class="autocomplete">
          <input size="100" name="links" id="links" type="text" class="" placeholder="Links"><br>
          <button id="submit-btn">Create Note</button>
        </div>
        </form>
      `;
  }

  routine() {
    document.getElementById("submit-btn").addEventListener("click", CreateNote.submit_form)
    document.getElementById("create-tag-btn").addEventListener("click", CreateNote.createTag)

    http_get('/fetch-all-tags', (res) => {
      let arr = Array();
      res.forEach(element => { arr.push(element.tag)});
      let autocomplite_title = new Autocomplete(document.getElementById("tags"), arr);
    })

    http_get('/fetch-all-titles', (res) => {
      let arr = Array();
      res.forEach(element => { arr.push(element.title)});
      console.log(arr)
      let autocomplite_title = new Autocomplete(document.getElementById("links"), arr);
    })
  }

  static submit_form(e) {
    e.preventDefault()

    if (!CreateNote.validateForm()) return;

    http_post_form('create-note-form', '/create_note', (message) => {
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

  static createTag(e) {
    e.preventDefault()
    let mess = { tag: document.querySelector("#tags").value }
    http_post_json(mess, '/create_tag', (msg) => {console.log("Tag creating status: ", msg); location.reload();})
  }

  static validateTag(tag){
    let error = "";

    const title = document.getElementById('title').value.trim();
    if (title === '') {
      error += "Title can't be blank <br>"
    }

    if (error === "") {
      document.querySelector("#error_message").innerHTML = "Sending...";
      return true
    } else {
      document.querySelector("#error_message").innerHTML = error;
    }
  }
  
}