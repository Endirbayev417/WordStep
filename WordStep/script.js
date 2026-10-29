// ===== 1. Смена темы (светлая / тёмная) =====
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

// Берём сохранённую тему, если есть
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) { /* хранилище недоступно, ничего страшного */ }

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// ===== 2. Вопросы: открываются и закрываются по нажатию =====
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    answer.hidden = open;
    btn.querySelector(".plus").textContent = open ? "+" : "−";
  });
});

// ===== 3. Кнопка "Копировать" для контрольной суммы =====
const copyBtn = document.getElementById("copyBtn");
const hashText = document.getElementById("hashText");

copyBtn.addEventListener("click", async () => {
  const text = hashText.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    // Запасной способ, если браузер не разрешил буфер обмена
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  copyBtn.textContent = "Скопировано ✓";
  setTimeout(() => { copyBtn.textContent = "Копировать"; }, 2000);
});

// ===== 4. Год в подвале =====
document.getElementById("year").textContent = new Date().getFullYear();
