// fetch data from html page and save to localstorage

async function saveData() {
    var ID = document.getElementById("ID");
    var name = document.getElementById("name");
    var contact = document.getElementById("contact");
    var room = document.getElementById("room");
    var hostel = document.getElementById("hostel");
    var departure = document.getElementById("DEPARTURE");
    var returnn = document.getElementById("RETURN");

    localStorage.setItem("ID", ID.value);
    localStorage.setItem("name", name.value);
    localStorage.setItem("contact", contact.value);
    localStorage.setItem("room", room.value);
    localStorage.setItem("hostel", hostel.value);
    localStorage.setItem("DEPARTURE", departure.value);
    localStorage.setItem("RETURN", returnn.value);

    console.log("Data saved to local storage: ", localStorage.getItem("ID"), localStorage.getItem("name"), localStorage.getItem("contact"), localStorage.getItem("room"), localStorage.getItem("hostel"), localStorage.getItem("DEPARTURE"), localStorage.getItem("RETURN"));
    window.location.href = 'index.html';
} 