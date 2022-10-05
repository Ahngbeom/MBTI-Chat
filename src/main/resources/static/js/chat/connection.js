/** Connection Chatting room **/

const joinChattingRoomBtn = document.querySelector(".join-chat-room-btn");
const chatModal = new bootstrap.Modal("#chatModal");
const chatModalElement = document.getElementById("chatModal");
const sendMessageBtn = document.getElementById("chat-send-message-btn");

let socket = null;
let stompClient = null;


joinChattingRoomBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const roomName = $(this).data("room-name");
        $.ajax({
            type: 'GET',
            url: '/api/chat/join-availability/' + roomName,
            async: false,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                alert(data);
                // connect(roomName);
                // chatModal.show();
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        })
    });
});

// export const enableJoinChattingService = function () {
//     document.querySelector(".join-chat-room-btn").addEventListener('click', function () {
//         chattingRoomEnter();
//     });
// }

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#serverGreetings").show();
        $("#conversation").show();
    } else {
        $("#serverGreetings").hide();
        $("#conversation").hide();
        chatModal.hide();
    }
    $("#chatting").html("");
}

function connect(roomName) {
    socket = new SockJS('/ws/mbti-chat'); // SockJS 통해 서버의 WebSocket 지원 여부, Cookies 필요 여부, CORS를 위한 Origin 정보 등을 응답으로 전달받는다.
    stompClient = Stomp.over(socket); // Stomp.over: WebSocket 지정

    stompClient.connect({}, function (frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);

        stompClient.subscribe('/unicast', function (message) {
            console.log(message);
            console.log(JSON.parse(message.body));
            // alert(JSON.parse(message.body).message);
        });

        stompClient.send("/mbti-chat/join-room/" + roomName, {}, {});

        stompClient.subscribe('/topic/mbti-chat/' + roomName, function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });


        // $.ajax({
        //     type: 'GET',
        //     url: '/api/user/info',
        //     contentType: 'application/json; charset=utf-8',
        //     async: false,
        //     success: function (data) {
        //         console.log(data);
        //         // 클라이언트가 입장했다는 의미로 클라이언트의 닉네임을 서버에게 전송한다.
        //         stompClient.send("/send/hello", {}, data.nickname);
        //
        //         // 서버가 클라이언트의 입장을 환영하는 인사말을 브로드캐스팅하게되고, 클라이언트는 인사말을 수신받을 주소를 구독하여 메시지를 얻어낸다.
        //         stompClient.subscribe('/topic/greetings', function (greeting) {
        //             showGreeting(JSON.parse(greeting.body).content);
        //         });
        //         // stompClient.subscribe('/topic/' + data.mbtiInfoList[0].mbti.substring(0, 4), function (chatMessage) {
        //         //     console.log(chatMessage);
        //         //     if (data.username === JSON.parse(chatMessage.body).from)
        //         //         showSendMessage(JSON.parse(chatMessage.body));
        //         //     else
        //         //         showReceiveMessage(JSON.parse(chatMessage.body))
        //         // });
        //         // sendMessageBtn.onclick = function (e) {
        //         //     console.log(e);
        //         //     sendMessage(data.mbtiInfoList[0].mbti.substring(0, 4));
        //         // }
        //     },
        //     error: function (data) {
        //         console.log(data);
        //         alert(data);
        //     }
        // });
    });
}

function disconnect() {
    chatModalElement.querySelector(".modal-body").innerHTML = "";
    $.ajax({
        type: 'GET',
        url: '/user-info',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            stompClient.send("/send/bye", {}, data.nickname);
        },
        error: function (data) {

        }
    });
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    console.log("sendMessage()");
    if (stompClient) {
        if (mbti === undefined || mbti === null)
            stompClient.send("/send/message", {}, $("#message").val());
        else
            stompClient.send("/send/" + mbti, {}, chatModalElement.querySelector("#input-send-message").value);
    } else
        alert("Not Connected.");
}

function showGreeting(data) {
    // $("#greetings").append("<tr><td>" + message + "</td></tr>");
    chatModalElement.querySelector(".modal-body")
        .insertAdjacentHTML('beforeend',
            "<div class='alert alert-warning text-center'>"
            + "<h4 class='alert-heading'>" + data.from + "(" +  data.status + ")</h4>"
            + data.message
            + "</div>");
}

function showSendMessage(post) {
    console.log(post);
    // $("#chatting").append("<tr><td>" + post.from + ": " + post.message + "</td></tr>");
    chatModalElement.querySelector(".modal-body").insertAdjacentHTML('beforeend', "<div class='alert alert-primary text-end'>" + post.message + "</div>")
}

function showReceiveMessage(post) {
    console.log(post);
    // $("#chatting").append("<tr><td>" + post.from + ": " + post.message + "</td></tr>");
    chatModalElement.querySelector(".modal-body").insertAdjacentHTML('beforeend', "<div class='alert alert-secondary text-start'>" + post.message + "</div>")
}

// $(function () {
//     // $("form").on('submit', function (e) {
//     //     e.preventDefault();
//     // });
//
//     // $("#connect").click(function () {
//     //     connect();
//     // });
//     // $("#disconnect").click(function () {
//     //     disconnect();
//     // });
//     // $("#send").click(function () {
//     //     sendMessage();
//     // });
// });

$("#chat-send-message-btn").click(function () {
    sendMessage();
});