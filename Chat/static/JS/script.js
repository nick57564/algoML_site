const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const inputInitHeight = chatInput.scrollHeight;


const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  var userImage = $("<img>").attr("src", "https://algo-ml.com/static/IM/logo_blue_icon.png")
    .css({
        width: '50px',        
        height: '50px',         
        borderRadius: '7px'     
    }); 
  let chatContent = className === "outgoing" 
    ? `<p></p>` 
    : `${userImage[0].outerHTML}<p></p>`;
  $("#chatContainer").append(chatContent);
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; 
}

const generateResponse = (chatElement) => {
    const API_URL = "/chat/";  
    const messageElement = chatElement.querySelector("p");

    $.ajax({
        type: "POST",
        url: API_URL,
        data: { user_input: userMessage },
        xhrFields: {
            onprogress: function (xhr) {
                const response = xhr.responseText;
                  $(messageElement).html(response); 
            }
        },
        success: function (response) {
              $(messageElement).html(response);
        },
        error: function (xhr) {
            $(messageElement).addClass("error").text(`Error: ${xhr.statusText}`);
        }
    });
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); 
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
document.body.classList.add("show-chatbot");
