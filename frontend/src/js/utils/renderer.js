export class Renderer {

  static setAppHtml(html) {
    document.querySelector("#app").innerHTML = html;
  }

  static renderNoteView(note) {

    let date = new Date(note.creating_timestamp*1000)

    let html = `
    Note ${note.id}:  ${note.title}<br>
    ====================<br>
    ${note.body}<br>
    creation date: ${date}<br>
    tags: ${note.tags}<br>
    links: ${note.links}<br>
    <button id='${note.id}' name='edit-note-btn'>Edit</button>
    `;

    Renderer.setAppHtml(html);
  }

  static renderNoteHead(note) {
    let html = '<div id="note_list">';

    note.reverse().forEach(element => {
      html += "<div><br>"
      html += element.title + "<br>"
      html += `<button id='${element.id}' name='open-note-btn'>Open</button>`
      html += `<button id='${element.id}' name='delete-note-btn'>Delete</button>`
      html += "</div>"
    });
    Renderer.setAppHtml(html);
  }

  static renderNoteForm(note, mode) {
    let title
    let button_name
    let note_title = ""
    let note_body = ""
    let note_tags = ""
    let note_links = ""
    let note_id = ""

    switch(mode) {
      case "create_mode":
        title = "Create note"
        button_name = "Create"
        break;
      case "edit_mode":
        title = "Edit note"
        button_name = "Save"
        note_title = note.title
        note_body = note.body
        note_tags = note.tags
        note_links = note.links
        note_id = note.id
        break;
    }
    console.log(note.body)
    let html = `
    <h2 class="text-center">${title}</h2>
    <div id="error_message"></div>
    <form autocomplete="off"  id="note-form"><br>
      <div hidden id="${note.id}" name="note_id"></div>
      <div class="autocomplete">
        <input size="100" name="title" id="title" type="text" class="" placeholder="Title" value="${note.title}"><br>
      </div>
        <textarea cols="100" name="body" id="body" placeholder="Note..." id="exampleFormControlTextarea1" rows="10">${note.body}</textarea><br>
      <div class="autocomplete">
        <input size="100" name="tags" id="tags" type="text" class="" placeholder="Tags" value="${note.title}">
        <button id="create-tag-btn">Create tag</button>
      </div>
      <div class="autocomplete">
        <input size="100" name="links" id="links" type="text" class="" placeholder="Links"value="${note.links}"><br>
        <button id="submit-btn">${button_name}</button>
      </div>
    </form>   
    `

    Renderer.setAppHtml(html);
  }
}