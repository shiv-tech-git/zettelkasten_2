export class Autocomplete {

  constructor(input_field, autocomplete_array) {
    this.currentFocus = -1;
    this.inp = input_field;
    this.arr = autocomplete_array;
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
        if (x) x[this.currentFocus].click();

      } else if (x && x.length == 1) {
          x[0].click()
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
    /*append the DIV element as a child of the autocomplete container:*/
    this.inp.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (let i = 0; i < this.arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (this.arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        let val2 = this.arr[i] 
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + this.arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += this.arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + this.arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", (function(val, e) {
          this.inp.value = val;
            this.closeAllLists();
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