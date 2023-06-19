const buttonAdd = document.querySelector(".nav__btn--add-recipe");
console.log(buttonAdd);
buttonAdd?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/add";
});
