(function () {
  const COOKIE_CONSENT_KEY = "rawfeed_cookie_consent";
  const CONSENT_VERSION = "1.0";

  function getCookieConsent() {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return data;
      }
    } catch (e) {}
    return null;
  }

  function setCookieConsent(accepted) {
    try {
      const data = {
        accepted: accepted,
        version: CONSENT_VERSION,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function createBanner() {
    const banner = document.createElement("div");
    banner.id = "rawfeed-cookie-banner";
    banner.innerHTML = `
      <div style="
        position: fixed;
        bottom: 32px;
        right: 32px;
        max-width: 340px;
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        padding: 24px 20px 20px 20px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        gap: 16px;
      ">
        <div style="margin-bottom: 8px;">
          <strong style="font-size: 16px;">Cookie Preferences</strong>
          <p style="margin: 8px 0 0 0; color: #6b7280;">
            We use essential cookies for authentication and security. See our <a href="/legal/cookies" style="color: #2563eb; text-decoration: none; font-weight: 500;">Cookie Policy</a> for details.
          </p>
        </div>
        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button id="cookie-reject-btn" style="
            padding: 8px 16px;
            border: 1px solid #d1d5db;
            background-color: #ffffff;
            color: #1f2937;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
          " onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='#ffffff'">
            Reject
          </button>
          <button id="cookie-accept-btn" style="
            padding: 8px 16px;
            background-color: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s;
          " onmouseover="this.style.backgroundColor='#1d4ed8'" onmouseout="this.style.backgroundColor='#2563eb'">
            Accept
          </button>
        </div>
      </div>
    `;
    return banner;
  }

  function showBanner() {
    const consent = getCookieConsent();
    if (consent) {
      return;
    }

    const banner = createBanner();
    document.body.appendChild(banner);

    document
      .getElementById("cookie-accept-btn")
      .addEventListener("click", function () {
        setCookieConsent(true);
        banner.remove();
      });

    document
      .getElementById("cookie-reject-btn")
      .addEventListener("click", function () {
        setCookieConsent(false);
        banner.remove();
      });
  }

  // Expose reset function
  window.resetCookieBanner = function () {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    location.reload();
  };

  // Expose show function
  window.showCookieBanner = function () {
    const consent = getCookieConsent();
    if (consent) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
    showBanner();
  };

  // Show banner when ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
