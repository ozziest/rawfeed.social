function showToast(message, type = "error") {
  const toast = document.createElement("div");
  toast.className = [
    "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
    "px-5 py-3 rounded-lg shadow-lg text-sm font-medium text-white",
    "animate-[fadeInUp_0.2s_ease-out]",
    type === "error" ? "bg-red-600" : "bg-green-600",
  ].join(" ");
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  const locale = navigator.language || "en-US";
  const options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (date.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}

function updateTimestamps() {
  document.querySelectorAll("time[datetime]").forEach((el) => {
    const date = new Date(el.getAttribute("datetime"));

    if (!isNaN(date.getTime())) {
      el.textContent = formatRelativeTime(date);

      el.title = date.toLocaleString(navigator.language || "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
  });
}

function initMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

function getStoredTheme() {
  const match = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("theme="));
  return match ? match.trim().slice(6) : "system";
}

function setThemeCookie(theme) {
  const maxAge = 365 * 24 * 60 * 60;
  document.cookie = `theme=${theme}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    // system
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);

  // Re-apply when OS preference changes (only relevant in system mode)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (getStoredTheme() === "system") {
        applyTheme("system");
      }
    });
}

function cycleTheme() {
  const current = getStoredTheme();
  const next =
    current === "system" ? "dark" : current === "dark" ? "light" : "system";
  setThemeCookie(next);
  applyTheme(next);
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.dataset.theme = next;
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    updateTimestamps();
    initMobileMenu();

    document.body.addEventListener("htmx:afterSwap", function (event) {
      updateTimestamps();
    });

    document.body.addEventListener("notify", function (event) {
      const { type, message } = event.detail || {};
      if (message) showToast(message, type);
    });
  });
} else {
  initTheme();
  updateTimestamps();
  initMobileMenu();
}
