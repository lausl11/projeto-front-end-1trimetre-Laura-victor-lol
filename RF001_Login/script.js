function showForm (formId) {
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));
    document.getElementById(formId).classList.add("active");
}   
document.querySelector("button[type='submit']").addEventListener("click", function(e) {
  e.preventDefault();

  const email = document.querySelector("input[type='email']").value;
  const senha = document.querySelector("input[type='password']").value;

  if (email === "admin@email.com" && senha === "1234") {
    window.location.href = "../RF002_Pg_Inicial/index.html";
  } else {
    document.getElementById("mensagem-erro").style.display = "block";
  }
});