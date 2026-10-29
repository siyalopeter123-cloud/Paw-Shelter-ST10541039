document.addEventListener("DOMContentLoaded", () => {
  // Reveal animation for sections and cards
  const revealItems = document.querySelectorAll("section, .card, .contact-card, .map-card");
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealItems.forEach(item => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });

  // Update footer year dynamically
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const ceoForm = document.getElementById("ceoAccessForm");
  if (ceoForm) {
    const ceoNameField = document.getElementById("ceoName");
    const ceoCodeField = document.getElementById("ceoCode");
    const ceoInfo = document.getElementById("ceoInfo");
    const ceoData = {
      name: "lawrence",
      code: "paw2026ceo"
    };

    const clearCEOInfo = () => {
      ceoInfo.hidden = true;
      ceoInfo.innerHTML = "<h3>CEO Information</h3>";
    };

    ceoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const existingMessage = ceoForm.querySelector(".form-message");
      if (existingMessage) existingMessage.remove();

      const enteredName = (ceoNameField.value || "").trim().toLowerCase();
      const enteredCode = (ceoCodeField.value || "").trim().toLowerCase();

      if (enteredName === ceoData.name && enteredCode === ceoData.code) {
        ceoInfo.innerHTML = `
          <h3>CEO Information</h3>
          <p><strong>Name:</strong> Lawrence</p>
          <p><strong>Role:</strong> Chief Executive Officer</p>
          <p><strong>Date of Birth:</strong> 10 November 2005</p>
          <p><strong>ID Number:</strong> 0511105414086</p>
          <p><strong>Email:</strong> lawrence@pawshelter.co.za</p>
          <p><strong>Phone:</strong> 068 443 2036</p>
        `;
        ceoInfo.hidden = false;
        ceoForm.reset();
        return;
      }

      clearCEOInfo();

      const errorMessage = document.createElement("p");
      errorMessage.className = "form-message error";
      errorMessage.textContent = "Incorrect CEO details. Information has been cleared.";
      ceoForm.appendChild(errorMessage);
      ceoForm.reset();
    });
  }

  // Handle forms with validation + success message
  document.querySelectorAll("form").forEach(form => {
    if (form.id === "ceoAccessForm") return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const requiredFields = form.querySelectorAll("[required]");
      let formValid = true;
      let firstInvalidField = null;

      requiredFields.forEach(field => {
        const value = field.value.trim();

        if (!value) {
          formValid = false;
          field.style.borderColor = "#d9534f";
          if (!firstInvalidField) firstInvalidField = field;
        } else {
          field.style.borderColor = "#b6d7a8";
        }
      });

      const existingMessage = form.querySelector(".form-message");
      if (existingMessage) existingMessage.remove();

      if (!formValid) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "form-message error";
        errorMessage.textContent = "Please complete all required fields before submitting.";
        form.appendChild(errorMessage);

        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      const successMessage = document.createElement("p");
      successMessage.className = "form-message success";
      successMessage.textContent = "Thank you! Your message has been sent successfully.";
      form.appendChild(successMessage);

      form.reset();
    });
  });
});