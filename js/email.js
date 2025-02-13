// Email.js initalize
(function() {
    emailjs.init("5ndp95bdoqP1J2fLz"); // publicKey from Email.js
})();

// Event listener added when loaded in DOMcontent
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // prevent default form
            console.log("submit click envent excution");

            // getter in value
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // input data validation
            if (!name) {
                alert("이름을 입력해 주세요.");
                document.getElementById("name").focus();
                return;
            }
            if (!email) {
                alert("이메일을 입력해 주세요.");
                document.getElementById("email").focus();
                return;
            }
            if (!message) {
                alert("메시지를 입력해 주세요.");
                document.getElementById("message").focus();
                return;
            }

            // getter in checkbox value
            let services = [];
            document.querySelectorAll(".form-check-input:checked").forEach((checkbox) => {
                services.push(checkbox.nextElementSibling.innerText);
            });

            // set on email form data
            const templateParams = {
                to_name : "Absolute Solution 님",
                from_name: name,
                from_email: email,
                message: message,
                services: services.join(", "), // selected service list
            };

            // Email.js sent logic
            console.log("preparing mailing service set on, email.js smtp send now\n", templateParams)
            emailjs.send("service_nwpfdn5", "template_6hewwfg", templateParams) // "service_id", "template_id", templateParams
                .then(function (response) {
                    alert("메일이 성공적으로 발송되었습니다!");
                    form.reset(); // form initialize
                }, function (error) {
                    alert("메일 발송에 실패했습니다. 다시 시도해 주세요.");
                    console.error("EmailJS Error:", error);
                });
        });
    }
});
