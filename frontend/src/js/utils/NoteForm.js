import { http_post_form, http_post_json, http_get } from '../utils/request.js'
import { Autocomplete } from "../utils/autocomplete.js";
import { Renderer } from "../utils/renderer.js"
import { fromDbColumnFormat, toDbColumnFormat } from '../utils/tools.js'

export class NoteForm {
  
  static renderNoteForm(note, mode) {
    let title
    let button_name
    let note_title = ""
    let note_body = ""
    let note_id = ""

    switch(mode) {
      case "linked_note":
      case "create_mode":
        title = "Create note"
        button_name = "Create"
        break;
      case "edit_mode":
        title = "Edit note"
        button_name = "Save"
        note_title = note.title
        note_body = note.body
        note_id = note.id
        break;
    }
    
    let html = `
    <h2 class="text-center">${title}</h2>
    <div id="error_message"></div>
    <form autocomplete="off"  id="note-form"><br>
      <div hidden id="${note_id}" name="note_id"></div>
      <div class="autocomplete">
        <input size="100" name="title" id="title" type="text" class="" placeholder="Title" value="${note_title}"><br>
      </div>
        <textarea cols="100" name="body" id="body" placeholder="Note..." id="exampleFormControlTextarea1" rows="10">${note_body}</textarea><br>
      <div class="autocomplete">
        <div id="tag_line">
          <strong>Confirmed tags: </strong><div id="confirmed_tags"></div>
        </div>
        <input size="100" name="tags" id="tags" type="text" class="" placeholder="Tags" value="">
        <button id="create-tag-btn">Create tag</button>
      </div>
      <div class="autocomplete">
      <div id="links_line">
        <strong>Confirmed links: </strong><div id="confirmed_links"></div>
      </div>
        <input size="100" name="links" id="links" type="text" class="" placeholder="Links" value=""><br>
        <button id="submit-btn">${button_name}</button>
      </div>
    </form>   
    `

    Renderer.setAppHtml(html);
    addConfirmedLinksAndTags()
    // if linked note is creating -> disable delete link button
    if (mode == "linked_note") {
      document.getElementsByName('delete-confirmed-link')[0].setAttribute('disabled', '')
      history.pushState(null, null, "/create_note");
    }

    document.getElementById("create-tag-btn").addEventListener("click", createTag)
    document.getElementById("confirmed_tags").addEventListener("click", deleteConfirmedTagOrLink)
    document.getElementById("confirmed_links").addEventListener("click", deleteConfirmedTagOrLink)
    document.getElementById("submit-btn").addEventListener("click", submit_form)


    function addConfirmedLinksAndTags() {
      if (note.tags) {
        fromDbColumnFormat(note.tags).forEach((id_val) => {addConfirmedTag(id_val)})
      }
      // note.tags.split(", ").forEach((id_tag)=> {addConfirmedTag(id_tag.split(":")[1])});
      if (note.links) [
        fromDbColumnFormat(note.links).forEach((id_val) => {addConfirmedLink(id_val)})
      ]
      
      // note.links.split(", ").forEach((id_link)=> { addConfirmedLink(id_link.split(":")[1])});
    }

    http_get('/fetch-all-tags', (res) => {
      let arr = Array();
      // res.forEach(element => { arr.push(element.tag)});
      res.forEach(element => { arr.push({id: element.id, value: element.tag})});
      let autocomplite_title = new Autocomplete(document.getElementById("tags"), arr, addConfirmedTag);
    })

    http_get('/fetch-all-titles', (res) => {
      // let arr = Array();
      // res.forEach(element => { arr.push(element.title)});
      // let autocomplite_title = new Autocomplete(document.getElementById("links"), arr, addConfirmedLink);
      let arr = [];
      res.forEach(element => { arr.push({id: element.id, value: element.title})});
      let autocomplite_title = new Autocomplete(document.getElementById("links"), arr, addConfirmedLink);
    })

    function addConfirmedTag(tag) {
      let confirmed_tags = document.querySelector('#confirmed_tags')
      let confirmed_tag = document.createElement("DIV");
      confirmed_tag.setAttribute("class", "confirmed_tag");
      confirmed_tag.setAttribute("data-confirmed-tag-name", tag.value);
      confirmed_tag.innerHTML += `<div class='tag-name' data-tag_id="${tag.id}">${tag.value}</div>`
      confirmed_tag.innerHTML += `<button name="delete-confirmed-tag">X</button>`
      confirmed_tags.append(confirmed_tag)
    }

    function addConfirmedLink(link) {
      let confirmed_links = document.querySelector('#confirmed_links')
      let confirmed_link = document.createElement("DIV");
      confirmed_link.setAttribute("class", "confirmed_links");
      confirmed_link.setAttribute("data-confirmed-link-name", link.value);
      confirmed_link.innerHTML += `<div class='link-name' data-link_id="${link.id}">${link.value}</div>`
      confirmed_link.innerHTML += `<button name="delete-confirmed-link">X</button>`
      confirmed_links.append(confirmed_link)
    }

    function deleteConfirmedTagOrLink(e){
      e.preventDefault()
      if (e.srcElement.name == 'delete-confirmed-tag' || e.srcElement.name == 'delete-confirmed-link') {
        e.target.parentElement.remove()
      }
    }

    function createTag(e) {
      e.preventDefault()
      if (!validateTag()) return;
      
      let mess = { tag: document.querySelector("#tags").value }
      http_post_json(mess, '/create_tag', (msg) => {console.log("Tag creating status: ", msg); location.reload();})
    }
  
    function validateTag(tag){
      let error = "";
  
      const title = document.getElementById('tags').value.trim();
      if (title === '') {
        error += "Tag field can't be blank <br>"
      }
  
      if (error === "") {
        document.querySelector("#error_message").innerHTML = "Sending...";
        return true
      } else {
        document.querySelector("#error_message").innerHTML = error;
        return false
      }
    }

    function submit_form(e) {
      console.log("hello")
      e.preventDefault()
      console.log(collectFormData())
      
      if (!validateForm()) return;

      http_post_json(collectFormData(), '/create_note', (message) => {
        document.querySelector("#error_message").innerHTML = "Note has been saved.";
        console.log("sucsees create: ", message)
        Router.navigateTo("/show_all")
      })
    }
  
    function validateForm() {
      let error = "";
  
      const title = document.getElementById('title').value;
      if (title === '') {
        error += "Title can't be blank <br>"
      }
  
      const body = document.getElementById('body').value;
      if (body === '') {
        error += "Body can't be blank <br>"
      }
  
      const links = document.getElementById('confirmed_links').innerHTML;
      
      if (links === '') {
        error += "Confirmed links field can't be blank <br>"
      }
  
      const tags = document.getElementById('confirmed_tags').innerHTML;
      if (tags === '') {
        error += "Confirmed tags field can't be blank <br>"
      }
  
      if (error === "") {
        document.querySelector("#error_message").innerHTML = "Sending...";
        return true
      } else {
        document.querySelector("#error_message").innerHTML = error;
      }
    }
  
    function collectFormData() {
      let form = document.getElementById('note-form')
      let note_id = form.querySelectorAll('[name="note_id"]')[0].id;
      let note_tags = ""
      let note_links = ""
  
      
  
      form.querySelectorAll('.confirmed_tag').forEach((element) => {
        if (note_tags != "") note_tags += ", "
        let tag = element.getElementsByClassName('tag-name')[0]
        note_tags += tag.dataset.tag_id + ":" + tag.innerText
      })
  
      form.querySelectorAll('.confirmed_links').forEach((element) => {
        if (note_links != "") note_links += ", "
        let link = element.getElementsByClassName('link-name')[0]
        note_links += link.dataset.link_id + ":" + link.innerText
      })
  
  
      let post_form = {
        id: note_id,
        title: form.querySelectorAll('#title')[0].value,
        body: form.querySelectorAll('#body')[0].value,
        tags: note_tags,
        links: note_links,
      }
      return post_form;
    }

  }
  

}