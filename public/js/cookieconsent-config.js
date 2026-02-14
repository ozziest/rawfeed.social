document.addEventListener("DOMContentLoaded", function () {
  if (window.CookieConsent && typeof window.CookieConsent.run === "function") {
    window.CookieConsent.run({
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "Cookies & Privacy",
              description:
                "We use only essential cookies for authentication and security. See our Cookie Policy for details.",
              acceptAllBtn: "Accept",
              rejectAllBtn: "Reject",
              showPreferencesBtn: "Manage",
            },
            preferencesModal: {
              title: "Cookie Preferences",
              acceptAllBtn: "Accept all",
              rejectAllBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
            },
          },
        },
      },
      autoShow: true,
      guiOptions: {
        consentModal: { layout: "box", position: "bottom right" },
        preferencesModal: { layout: "box", position: "right" },
      },
    });
  }
});
