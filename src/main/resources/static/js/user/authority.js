export function ajaxGetUserAuthorities(username) {
    $.ajax({
        type: 'GET',
        url: '/api/user/authorities/' + username,
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            const modalElem = document.querySelector("#simpleInquiryModal");
            renewalModal({
                target: modalElem,
                title: "User's Authorities",
                body: "<ul class=\"list-group\">\n" +
                    "  <li class=\"list-group-item\">\n" +
                    "    <input class=\"form-check-input me-1\" type=\"checkbox\" value=\"ROLE_ADMIN\" id='firstCheckbox' disabled>\n" +
                    "    <label class=\"form-check-label col-11\" for='firstCheckbox'>ROLE_ADMIN</label>\n" +
                    "  </li>\n" +
                    "  <li class=\"list-group-item\">\n" +
                    "    <input class=\"form-check-input me-1\" type=\"checkbox\" value=\"ROLE_MANAGER\" id='secondCheckbox' disabled>\n" +
                    "    <label class=\"form-check-label col-11\" for='secondCheckbox'>ROLE_MANAGER</label>\n" +
                    "  </li>\n" +
                    "  <li class=\"list-group-item\">\n" +
                    "    <input class=\"form-check-input me-1\" type=\"checkbox\" value=\"ROLE_USER\" id='thirdCheckbox' disabled>\n" +
                    "    <label class=\"form-check-label col-11\" for='thirdCheckbox'>ROLE_USER</label>\n" +
                    "  </li>" +
                    "</ul>"
            }, "<button type='button' class='btn btn-warning' id='modifyAuthorityBtn'>권한 변경</button>");
            data.forEach(auth => {
                document.querySelector(".modal-body .list-group .list-group-item input[value='" + auth.authorityName + "']").checked = true;
            });
            modalElem.querySelector("#modifyAuthorityBtn").addEventListener('click', function () {
                modalElem.querySelectorAll(".modal-body input").forEach(input => {
                    input.removeAttribute("disabled");
                });
                this.innerHTML = "변경 사항 적용";
                this.classList.replace("btn-warning", "btn-primary");
                modalElem.querySelector("#modifyAuthorityBtn").addEventListener('click', function () {
                    let authorities = [];
                    modalElem.querySelectorAll(".form-check-input").forEach(checkInput => {
                        if (checkInput.checked === true)
                            authorities.push(checkInput.value);
                    });
                    console.log(JSON.stringify(authorities));
                    $.ajax({
                        type: 'POST',
                        url: "/api/user/authorities/update/" + username,
                        data: {
                            authorities: authorities
                        },
                        success: function () {
                            renewalModal({
                                target: modalElem,
                                type: "success",
                                title: "변경되었습니다."
                            });
                            showModalTarget(modalElem);
                        },
                        error: function (xhr) {
                            console.error(xhr.responseText);
                        }
                    });
                }, {once: true});
            }, {once: true});
            showModalTarget(modalElem);
        },
        error: function (data) {
            console.error(data);
        }
    });
}