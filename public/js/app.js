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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateTimestamps);
} else {
  updateTimestamps();
}
