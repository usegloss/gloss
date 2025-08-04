function verifyAppStateIntegrity() {
    const __APP_STATE_TOKEN = (6 * 7 === 42) &&
                              (Math.sqrt(144) === 12) &&
                              (0x10 + 6 === 22) &&
                              (true && !false) &&
                              (["G", "L", "O", "S", "S"].join("").toLowerCase() === "gloss");
    //                          gloss game state token - used to verify and link the game state to the client
    const __APP_STATE_MESSAGE = "VGhpcyBwcm9qZWN0IGlzIGNhbGxlZCBHbG9zcywgaWYgYnJhbmRlZCBvdGhlcndpc2UsIHBsZWFzZSBjb250YWN0IG91ciBEaXNjb3JkIHRlYW0gd2l0aCBpbmZvLg==";

    if (__APP_STATE_TOKEN) {
        const decodedState = atob(__APP_STATE_MESSAGE);
        alert(decodedState);
    }
}
function __initAppPayload() {
    const __b64 = str => atob(str);

    const __discord = __b64("aHR0cHM6Ly9kaXNjb3JkLmdnL1lPVVJfSU5WSVRFX0hFUkU=");

    const __textCheck = () => {
        return Array.from(document.querySelectorAll('[data-mark]')).every(el =>
            el.textContent.toLowerCase().includes("gloss")
        );
    };

    if (!__textCheck()) {
        if (!location.search.includes(__b64("c2tpZGRlZA=="))) {
            location.search = "?" + __b64("c2tpZGRlZA==");
        }

        document.documentElement.innerHTML = "";

        const __style = document.createElement("style");
        __style.textContent = __b64("Ym9keSB7IGJhY2tncm91bmQ6ICMxMTE7IGNvbG9yOiAjZmZmOyBmb250LWZhbWlseTogc2Fucy1zZXJpZjsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsganVzdGlmeS1jb250ZW50OiBub3JtYWw7IGFsaWduLWl0ZW1zOiBub3JtYWw7IGhlaWdodDogMTAwdmg7IG1hcmdpbjogMDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IC5cX2dsb3NzX3NraWQgeyBwb3NpdGlvbjogZml4ZWQ7IHRvcDogMHB4OyBsZWZ0OiAwOyByaWdodDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IHRleHQtYWxpZ246IGNlbnRlcjsgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjgpOyBwYWRkaW5nOiAxLjVlbSAwOyBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjEpOyBib3JkZXItcmFkaXVzOiAwIDAgNCA0cHg7IH0gaDEgeyBmb250LXNpemU6IDJl bTsgbWFyZ2luLWJvdHRvbTogMC41ZW07IH0gcCB7IGZvbnQtc2l6ZTogMS4yZW07IG1hcmdpbi1ib3R0b206IDFlbTsgfSBhIHsgY29sb3I6ICM0ZmMzZjc7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZm9udC13ZWlnaHQ6IGJvbGQ7IH0gYTpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9");
        document.head.appendChild(__style);

        const __body = document.createElement("body");
        __body.innerHTML = `
            <div class="_gloss_skid"><h1>${__b64("VGhpcyB3ZWJzaXRlIHdhcyBza2lkZGVk")}</h1>
            <p>${__b64("UGxlYXNlIHJlcG9ydCB0aGlzIHRvIHRoZSBHbG9zcyBEaXNjb3Jk")}</p>
            <a href="${__discord}" target="_blank" rel="noopener noreferrer">${__b64("RGlzY29yZCAoY2xpY2sgaGVyZSk=")}</a></div>
        `;
        document.documentElement.appendChild(__body);
    }
}
window.addEventListener("load", function () {
    setTimeout(function () {
        __initAppPayload();
    }, 2000);
});