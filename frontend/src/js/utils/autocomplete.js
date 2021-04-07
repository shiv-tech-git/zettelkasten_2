export class Autocomplete {

  constructor(input_field, autocomplete_array, autocomplete_callback = () => {}) {
    this.currentFocus = -1;
    this.inp = input_field;
    this.arr = autocomplete_array;
    this.autocomplete_callback = autocomplete_callback;
    this.autocomplete();
  }

  autocomplete() {
    this.inp.addEventListener("input", this.inputListener.bind(this));
    this.inp.addEventListener("keydown", this.keyDownListener.bind(this));
    document.addEventListener("click", (function (e) {
      this.closeAllLists(e.target);
    }).bind(this));
  }

  keyDownListener(e) {
    var x = document.getElementById(this.inp.id + "autocomplete-list");

    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) {
      // If the arrow DOWN key is pressed,
      this.currentFocus++;
      this.addActive(x);
    } else if (e.keyCode == 38) { 
      // If the arrow UP key is pressed,
      this.currentFocus--;
      this.addActive(x);
    } else if (e.keyCode == 13) {
      // If the ENTER key is pressed
      e.preventDefault();
      if (this.currentFocus > -1) {
        if (x){
          x[this.currentFocus].click();
        }

      } else if (x && x.length == 1) {
          x[0].click()
      } 
    } else if (e.keyCode == 9) { 
      // If the arrow TAB key is pressed,
      e.preventDefault();
      if (this.currentFocus == -1 && x.length == 1) {
        x[0].click();
      }
    }
  }

  inputListener(e) {
    let a, b;
    let val = this.inp.value;
    
    this.closeAllLists();

    if (!val) return false;

    this.inp.currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.inp.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.inp.parentNode.appendChild(a);

    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].value.substr(0, val.length).toUpperCase() == val.toUpperCase()) {

        let val2 = this.arr[i].value
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + this.arr[i].value.substr(0, val.length) + "</strong>";
        b.innerHTML += this.arr[i].value.substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + this.arr[i].value + "'>";

        b.addEventListener("click", (function(val, e) {
          this.inp.value = "";
          this.autocomplete_callback(val)
          this.closeAllLists();
          this.currentFocus = -1;
        }).bind(this, this.arr[i]));
        a.appendChild(b);
      }
    }
  }

  addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[this.currentFocus].classList.add("autocomplete-active");
  }

  removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != this.inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

}