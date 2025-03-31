async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatLog = document.getElementById("chat-log");
  
    const userText = input.value.trim();
    if (!userText) return;
  
    appendToChat("You", userText);
    input.value = "";
  
    const response = await fetch("https://wunderbite-chatbot.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });
  
    const data = await response.json();
    appendToChat("WÜNDER", data.reply);
  }
  
  function appendToChat(sender, message) {
    const chatLog = document.getElementById("chat-log");
    const messageEl = document.createElement("div");
    messageEl.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageEl);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  window.onload = () => {
    const greetings = [
      {
        text: "Welcome to Wünderbite. I'm WÜNDER, your Flavor Resonance Assistant. What would you like to explore today?",
        weight: 50,
      },
      {
        text: "Hello again. You look... familiar.",
        weight: 20,
      },
      {
        text: "Some flavors remember you. Ask the right one.",
        weight: 15,
      },
      {
        text: "Your emotional profile is unusually vibrant today. Interesting.",
        weight: 10,
      },
      {
        text: "Elswith would’ve liked you. Shall we begin?",
        weight: 5,
      }
    ];
  
    const totalWeight = greetings.reduce((sum, g) => sum + g.weight, 0);
    const rand = Math.random() * totalWeight;
  
    let runningWeight = 0;
    for (let i = 0; i < greetings.length; i++) {
      runningWeight += greetings[i].weight;
      if (rand <= runningWeight) {
        appendToChat("WÜNDER", greetings[i].text);
        break;
      }
    }
  };
  
  