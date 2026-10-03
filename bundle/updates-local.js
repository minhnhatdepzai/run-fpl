const form = document.getElementById("signup-form");
const email = document.getElementById("signup-email");
const submit = document.getElementById("signup-submit");
const status = document.getElementById("signup-status");
const card = document.querySelector(".updates-card");
const storageKey = "claybound-local-signups";
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const languageKey = "run-fpl-language";
const languageButton = document.getElementById("updates-language");

const copy = {
  vi: {
    title: "Kết nối với tôi.", label: "Địa chỉ email", submit: "Lưu email",
    back: "Quay lại Run FPL", language: "Ngôn ngữ", working: "Đang lưu…",
    saved: "Đã lưu email trên thiết bị này.", already: "Email này đã được lưu.",
    invalid: "Địa chỉ email chưa đúng.", error: "Có lỗi xảy ra. Hãy thử lại.",
  },
  en: {
    title: "Let’s build something real.", label: "Email address", submit: "Save email",
    back: "Back to Run FPL", language: "Language", working: "Saving…",
    saved: "Saved on this device.", already: "This email is already saved.",
    invalid: "That address looks off.", error: "Something went wrong. Try again.",
  },
};

const readLanguage = () => localStorage.getItem(languageKey) === "en" ? "en" : "vi";

function renderLanguage() {
  const language = readLanguage();
  const text = copy[language];
  document.documentElement.lang = language;
  document.querySelector(".updates-card h1").textContent = text.title;
  document.querySelector(".updates-label").textContent = text.label;
  submit.textContent = text.submit;
  document.querySelector(".updates-back").textContent = text.back;
  languageButton.textContent = language.toUpperCase();
  languageButton.setAttribute("aria-label", text.language);
}

if (new URLSearchParams(location.search).get("end") !== "1") {
  document.getElementById("updates-eyebrow").textContent = "RUN FPL · LÊ MINH NHẬT";
}

document.getElementById("updates-social")?.insertAdjacentHTML(
  "beforeend",
  `<div class="updates-social-links">
    <a href="https://www.facebook.com/le.nhat.492484" target="_blank" rel="noopener noreferrer">Facebook</a>
    <a href="https://github.com/minhnhatdepzai" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="mailto:lnhat1938@gmail.com">lnhat1938@gmail.com</a>
  </div>`,
);

const kinds = { working: "working", saved: "saved", already: "already", invalid: "failed", error: "failed" };

function show(state) {
  const language = readLanguage();
  const kind = kinds[state] || kinds.error;
  const message = copy[language][state] || copy[language].error;
  status.dataset.state = kind;
  status.textContent = message;
  email.setAttribute("aria-invalid", String(kind === "failed" && state === "invalid"));
}

languageButton?.addEventListener("click", () => {
  localStorage.setItem(languageKey, readLanguage() === "vi" ? "en" : "vi");
  renderLanguage();
});

renderLanguage();

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = String(email.value || "").trim().toLowerCase();

  if (address.length < 6 || address.length > 254 || !validEmail.test(address)) {
    show("invalid");
    email.focus();
    return;
  }

  submit.disabled = true;
  show("working");

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const already = saved.includes(address);
    if (!already) {
      saved.push(address);
      localStorage.setItem(storageKey, JSON.stringify(saved));
    }
    show(already ? "already" : "saved");
    card?.classList.add("is-done");
  } catch {
    show("error");
    email.focus();
  } finally {
    submit.disabled = false;
  }
});

email?.addEventListener("input", () => {
  if (status.dataset.state === "failed") {
    delete status.dataset.state;
    status.textContent = "";
    email.setAttribute("aria-invalid", "false");
  }
});
