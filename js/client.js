const socket = io ('http://localhost:8000');

const form = document.getElementById ("sendcontainer")
const messageinput = document.getElementById ("messageimp")
// const fileinput = document.getElementById ("fileimp");
const messagecontainer = document.querySelector (".container")
const userCountDisplay = document.getElementById ("user");
var audio = new Audio ("ding-101492.mp3")

const append = (message, position) => {
    const messageelement = document.createElement ('div')
    messageelement.innerText = message;
    messageelement.classList.add ('message');
    messageelement.classList.add (position);
    messagecontainer.append (messageelement);
    if (position == "left") {
        audio.play ();
    }
}

form.addEventListener ('submit', (e) => {
    e.preventDefault ();
    const message = messageinput.value.trim ();

    // const file = fileinput.files[0];

    if (message === '') {
        alert ('please enter some message');
        return;
    }

    append (`You : ${message}`, "right")
    socket.emit ("send", message)
    messageinput.value = "";

    // if (file) {
    //     const reader = new FileReader ();
    //     reader.onload = function () {
    //         const fileData = reader.result;
    //         const fileName = file.name;
    //         append (`You sent a file : ${fileName}`, "right");
    //         socket.emit ("send", {type: 'file', content: fileData, fileName: fileName});
    //     };

    //     reader.readAsDataURL (file);
    // }

    messageinput.value = "";
    // fileinput.value = "";
});

const name = prompt ("enter name to join")
socket.emit ("new-user-joined", name)

socket.on ("user-joined", name => {
    append (`${name} joined the chat`, 'right')
})

socket.on ("receive", data => {
    // if (data.type === 'text') {
        append (`${data.name} : ${data.message}`, 'left');
    // }

    // else if (data.type === 'file') {
    //     const fileLink = document.createElement ('a');
    //     fileLink.href = data.content;
    //     fileLink.download = data.fileName;
    //     fileLink.innerText = `${data.name} sent a file : ${data.fileName}`;
    //     fileLink.classList.add ('message', 'left');
    //     messagecontainer.append (fileLink);
    // }
});

socket.on ("leave", name => {
    append (`${name} left the chat`, 'left')
})


// socket.on ("co", () => {
//     append (`${count}`, "left")
// })

socket.on ("user-count", count => {
    userCountDisplay.innerHTML = `Active users are : ${count}`;
})