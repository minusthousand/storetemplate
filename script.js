const list = document.getElementsByClassName("nav")[0];
const burger = document.getElementsByClassName("burger")[0];
const close = document.getElementsByClassName("close")[0];
let notOK = 0;

function fadeIn() {
  list.style.display = "flex";
  close.style.display = "flex";
  list.classList.remove("nav__list--hidden");
  list.classList.add("nav__list--active");
  list.addEventListener("animationend", function() {
    list.style.display = "flex";
    close.style.display = "flex";
  });
}

function fadeOut() {
  list.classList.remove("nav__list--active");
  list.classList.add("nav__list--hidden");
  list.addEventListener("animationend", function() {
    list.style.display = "none";
    close.style.display = "none";
  });
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function insertError(reference, text, newElId) {
  let newEl = document.createElement("p");
  newEl.setAttribute("id", newElId);
  newEl.style.color = "red";
  newEl.style.margin = "0";
  newEl.style.fontSize = "12px";
  newEl.innerHTML = text;

  insertAfter(newEl, reference);
  reference.style.borderColor = "red";

  notOK++;
}

function hideError(base, newElId) {
  newEl = document.getElementById(newElId);
  if (newEl) {
    newEl.parentNode.removeChild(newEl);
  }
  base.style.borderColor = "#ccc";
}

function validateForm() {
  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let email = document.getElementById("email");
  let age = document.getElementById("age");
  let terms = document.getElementById("terms");
  notOK = 0;

  if (fname.value == "") {
    hideError(fname, "fnameError");
    insertError(fname, "Enter first name.", "fnameError");
  } else {
    hideError(fname, "fnameError");
  }

  if (lname.value == "") {
    hideError(lname, "lnameError");
    insertError(lname, "Enter last name.", "lnameError");
  } else {
    hideError(lname, "lnameError");
  }

  if (emailIsValid(email.value) === false) {
    hideError(email, "emailError");
    insertError(email, "Enter valid email.", "emailError");
  } else {
    hideError(email, "emailError");
  }

  if (!(isNaN(Number(age.value)) === true)) {
    if (Number(age.value) <= 0 || Number(age.value) > 116) {
      hideError(age, "ageError");
      insertError(age, "Enter valid age.", "ageError");
    } else if (18 > Number(age.value)) {
      hideError(age, "ageError");
      insertError(
        age,
        "You must be at least 18 years old to register.",
        "ageError"
      );
    } else {
      hideError(age, "ageError");
    }
  } else {
    hideError(age, "ageError");
    insertError(age, "Enter valid age.", "ageError");
  }

  if (terms.checked === false) {
    notOK++;
    document.getElementById("termsContainer").style.color = "red";
  } else {
    document.getElementById("termsContainer").style.color = "black";
  }

  if (notOK != 0) {
    alert("You have to fill all forms correctly.");
    return false;
  }
}
