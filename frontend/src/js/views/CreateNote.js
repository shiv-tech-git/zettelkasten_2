import AbstractView from "./AbstractView.js";

export class CreateNote extends AbstractView {
  constructor(params) {
      super(params);
      this.setTitle("Settings");
  }

  async getHtml() {
      // return `
      //   <h2 class="text-center">Create note</h2>
      //   <form id="create-note-form" action="http://localhost:3000/create" method="post"><br>
      //     <input required size="100" name="title" type="text" class="" placeholder="Title"><br>
      //     <textarea cols="100" name="note" class="" placeholder="Note..." id="exampleFormControlTextarea1" rows="10"></textarea><br>
      //     <input size="100" name="tags" type="text" class="" placeholder="Tags"><br>
      //     <input size="100" name="links" type="text" class="" placeholder="Links"><br>
      //     <input type="submit" value="Submit">
      //     <a href="" id="submit-btn" class="">Create</a>
      //   </form>
      // `;
      return  `
        <form method="POST" action="/submit-form">
        <input type="text" name="username" />
        <input type="submit" />
        </form>
      `
  }

  async routine() {
    document.getElementById("submit-btn").addEventListener("click", CreateNote.submit_form)
  }

  static submit_form(e) {

    
    e.preventDefault()
    console.log("submit")
    let form = document.getElementById('create-note-form')
    let data = new FormData(form);
    // CreateNote.sendData(data)
  }

  static sendData( formData ) {
    console.log("sending data")
    const XHR = new XMLHttpRequest()
    
    // Define what happens on successful data submission
    XHR.addEventListener( 'load', function( event ) {
        
    } );
  
    // Define what happens in case of error
    XHR.addEventListener(' error', function( event ) {
    } );
    
    XHR.onreadystatechange = function() {
        if (XHR.readyState == XMLHttpRequest.DONE) {
            if(XHR.status == 200){
                let obj = JSON.parse(XHR.responseText)
                console.log(typeof obj);
                console.log(obj);
            }else{
                console.log('Error: ' + XHR.statusText )
            }
        }
    }
    // Set up our request
    XHR.open( 'POST', '/create' );
    XHR.setRequestHeader( 'Content-Type', 'application/json' );
  
    // Send our FormData object; HTTP headers are set automatically
    let body = {};
    formData.forEach((value, key) => body[key] = value);
    XHR.send( JSON.stringify(body) );
  }


}