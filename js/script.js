const frases = {
    feliz: [
        "¡Qué genial verte sonriendo! Me llena de energía positiva😊.",
        "Me alegra mucho verte feliz, Nelsi. Eres una de las mejores que conozco.",
        "Cuando estás de buen humor, todo parece más divertido. Me siento afortunado de contar con tu amistad.",
        "Eres una gran amiga y me haces sentir muy afortunado. Gracias por compartir tu alegría conmigo.",
        "Verte feliz me motiva a seguir adelante con una sonrisa. Eres una persona maravillosa.",
        "Cada vez que estás de buen humor, siento que será un día maravilloso.",
        "Eres una de mis mejores amigas y tu felicidad es contagiosa. Me encanta verte sonreír.",
        "A pesar de todo, eres una gran persona y te aprecio. Sigue siendo tú misma, siempre positiva.",
        "Me encanta saber que estás bien. Vales mucho y mereces ser feliz siempre.",
        "Eres una amiga genial y sabes que siempre puedes contar conmigo, pase lo que pase.",
    ],
    triste: [
        "Siempre estoy para ti, pa' darte amor/apoyo/ánimos.",
        "Lamento mucho verte triste, pero recuerda que estoy aquí para lo que necesites, siempre.",
        "Te abrazo en mi corazón mientras todo pasa, sé que pronto volverás a brillar.",
        "Aunque no pueda hacer que todo mejore ahora, prometo que siempre estaré a tu lado.",
        "No importa lo que pase, nunca estarás sola. Yo estaré aquí para ti, en cada momento.",
        "A veces la vida se siente pesada, pero te prometo que juntos podemos con todo.",
        "Te entiendo, Nelsi. Si quieres hablar o simplemente estar en silencio, estaré aquí.",
        "Todo pasa, y sé que tu sonrisa regresará, porque eres más fuerte de lo que crees.",
        "Me duele verte triste, pero lo que más quiero es que sepas que te quiero mucho y estoy contigo.",
        "Aunque no pueda quitarte la tristeza, quiero que sepas que me importas mucho. Estoy aquí para ti.",
    ],
    cansado: [
        "Tómate un momento para respirar y recargar energías. 🌿",
        "Descansa, Nelsi. Todo lo que has hecho hoy ha sido impresionante, ahora es momento de cuidar de ti.",
        "Si necesitas dormir, descansar o relajarte, hazlo. Estaré esperando para acompañarte cuando te sientas mejor.",
        "Eres increíblemente fuerte, pero incluso las más fuertes necesitan descansar. Estoy aquí para ayudarte.",
        "Sé que estás agotada, pero quiero que sepas que no tienes que hacer todo sola, siempre estaré para ti.",
        "Te quiero mucho, y aunque a veces me cueste expresarlo y no siempre sepa cómo ayudarte, me preocupo mucho por ti.",

    ],
    alegre: [
        "Cada día que pasa, valoro más nuestra amistad. No sé qué haría sin ti.",
        "Tenerte en mi vida es una bendición. Te quiero mucho más de lo que las palabras pueden expresar.",
        "Me siento muy afortunado de tener tu amistad.",
        "Desde que llegaste a mi vida, todo es mucho mejor. Gracias por ser tan importante para mí.",
        "Cada vez que pienso en ti, me doy cuenta de que nuestra amistad es algo único y especial.",
        "Valoro mucho tu amistad y no hay nada que desee más que verte feliz siempre.",
        "No hay un solo día en el que no agradezca al destino por haberte puesto en mi camino.",
        "Te quiero mucho, amiga mía.",
        "Quiero que sepas lo especial que eres para mí.",
        "Nunca imaginé tener una amiga tan increíble como tú. Te quiero mucho.",
    ],
};

const chatMessages = document.getElementById("chat-messages");
const emotionButtons = document.getElementById("emotion-buttons");

function clearMessages() {
    chatMessages.innerHTML = '';
}
//DE AQUI
let voices = [];

function populateVoiceList() {
    voices = speechSynthesis.getVoices();
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

function addMessage(sender, text) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add(sender);

    const message = document.createElement("div");
    message.classList.add("chat-message");
    message.textContent = text;

    messageContainer.appendChild(message);
    chatMessages.appendChild(messageContainer);

    // Asegurar scroll al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Configurar eliminación automática del mensaje después de 4 segundos
    setTimeout(() => {
        if (chatMessages.contains(messageContainer)) {
            chatMessages.removeChild(messageContainer);
        }
    }, 8000);

    // Convertir el texto del bot en voz
    if (sender === "bot") {
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voices.find(voice => voice.name.includes("Google") || voice.name.includes("Microsoft"));
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        speechSynthesis.speak(utterance);
    }
}

emotionButtons.addEventListener("click", (e) => {
    if (e.target.classList.contains("emotion-button")) {
        const selectedEmotion = e.target.dataset.emotion;

        if (selectedEmotion) {
            // Limpiar mensajes antes de agregar uno nuevo
            clearMessages();

            addMessage("user", `Me siento ${selectedEmotion}`);
            const randomPhrase =
                frases[selectedEmotion][
                Math.floor(Math.random() * frases[selectedEmotion].length)
                ];
            setTimeout(() => addMessage("bot", randomPhrase), 500);
        }
    }
});