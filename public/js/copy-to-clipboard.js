document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", function () {
      const text = this.getAttribute("data-copy");
      navigator.clipboard.writeText(text);

      // Show feedback
      const originalHTML = this.innerHTML;
      this.innerHTML =
        '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
      setTimeout(() => {
        this.innerHTML = originalHTML;
      }, 1000);
    });
  });
});
