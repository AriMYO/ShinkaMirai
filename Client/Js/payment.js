document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-button");
  const views = document.querySelectorAll(".view");
  const planCard = document.querySelector(".plan-card");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const viewToShow = this.getAttribute("data-view");

      navButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      views.forEach((view) => {
        if (view.id === viewToShow + "View") {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });

      if (viewToShow === "scholarship") {
        planCard.style.display = "none";
      } else {
        planCard.style.display = "block";
      }
    });
  });

  function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    input.value = value;
  }

  function formatDate(input) {
    let value = input.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + " / " + value.slice(2, 4);
    }
    input.value = value.slice(0, 7); // Limita a 7 caracteres para incluir el espacio y la barra
  }

  document.getElementById("tarjeta").addEventListener("input", function () {
    formatCardNumber(this);
  });

  document.getElementById("fecha").addEventListener("input", function () {
    formatDate(this);
  });

  document.getElementById("cvc").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 3); // Limita a 3 dígitos
  });
});
