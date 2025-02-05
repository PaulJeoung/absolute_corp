// Email.js 라이브러리 초기화
(function() {
    emailjs.init("Zap0USiRnrXryBJ6G"); // publicKey from Email.js
})();

// 문서가 로드되면 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // 기본 폼 제출 방지

            // 입력된 값 가져오기
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            // 필수 입력값 확인
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

            // 체크박스 값 가져오기
            let services = [];
            document.querySelectorAll(".form-check-input:checked").forEach((checkbox) => {
                services.push(checkbox.nextElementSibling.innerText);
            });

            // 이메일 전송 데이터
            const templateParams = {
                to_name : "Absolute Solution 님",
                from_name: name,
                from_email: email,
                message: message,
                services: services.join(", "), // 선택된 서비스 목록
            };

            // Email.js를 사용하여 메일 전송
            emailjs.send("service_l2rfc3z", "template_vr7clmm", templateParams) // "service_id", "template_id", templateParams
                .then(function (response) {
                    alert("메일이 성공적으로 발송되었습니다!");
                    form.reset(); // 폼 초기화
                }, function (error) {
                    alert("메일 발송에 실패했습니다. 다시 시도해 주세요.");
                    console.error("EmailJS Error:", error);
                });
        });
    }
});
