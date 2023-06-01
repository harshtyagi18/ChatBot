document
    .getElementById("message")
    .addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendMessage();
        }
    });
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send-button");
messageInput.addEventListener("input", function () {
    if (messageInput.value.trim().length > 0) {
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
});
function sendMessage() {
    const message = document.getElementById("message").value.trim();
    if (message !== "") {
        const chat = document.getElementById("chat");
        chat.innerHTML +=
            '<div style="display: flex; align-items: center; margin-bottom: 8px;"> <img src="https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg" width="50px" height="50px" style="border-radius: 10%; vertical-align: middle;"> <p style="width: 100%; padding: 14px; background-color: #01b7ff; font-size: larger; border-radius: 5px; margin-left: 20px;">' +
            message +
            "</p> </div>";
        fetch("/send_message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        })
            .then((response) => response.json())
            .then((data) => {
                chat.innerHTML +=
                    '<div style="display: flex; align-items: center; margin-bottom: 8px;"> <img src="https://st3.depositphotos.com/8950810/17657/v/450/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg" width="50px" height="50px" style="border-radius: 10%; vertical-align: middle;"><p class="bot" style="width: 100%; padding: 14px; background-color: #1fff06; font-size: large; border-radius: 5px; margin-left: 20px; color: black;"> ' +
                    data.message +
                    "</p> </div>";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        document.getElementById("message").value = "";
        sendButton.disabled = true;
    }
}
