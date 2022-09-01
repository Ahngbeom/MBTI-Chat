// BootStrap Toast
const toastDetector = function () {
    const toastList = document.querySelectorAll(".toast");
    if (toastList.length > 0) {

    }
    toastList.forEach(toast => {
        const btToast = new bootstrap.Toast(toast, {autohide: false});
        btToast.show();
        toast.addEventListener('hidden.bs.toast', function () {
           toast.remove();
        });
    });
}

const toastElement = "<div class=\"toast mb-3\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n" +
    "            <div class=\"toast-header\">\n" +
    "                <strong class=\"me-auto\">Bootstrap</strong>\n" +
    "                <small>11 mins ago</small>\n" +
    "                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n" +
    "            </div>\n" +
    "            <div class=\"toast-body\">\n" +
    "                Hello, world! This is a toast message.\n" +
    "            </div>\n" +
    "        </div>";

const createToast = function (toastContainerTarget, type, header, body) {
    const toastElement = document.createElement("div");
    toastElement.classList.add("toast", "mb-3", "text-bg-" + type, "border-0");
    toastElement.setAttribute("role", "alert");
    toastElement.setAttribute("aria-live", "assertive");
    toastElement.setAttribute("aria-atomic", "true");

    const toastHeader = document.createElement("div");
    toastHeader.classList.add("toast-header", "border-0");
    toastHeader.innerHTML += "<strong class='me-auto text-dark'>" + header + "</strong>";
    toastHeader.innerHTML += "<small class='text-muted'>" + new Date().toLocaleString() + "</small>";
    toastHeader.innerHTML += "<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>";
    toastElement.appendChild(toastHeader);

    const toastBody = document.createElement("div");
    toastBody.classList.add("toast-body", "text-bg-light");
    toastBody.append(body);
    toastElement.appendChild(toastBody);

    toastContainerTarget.append(toastElement);

    toastDetector();
}