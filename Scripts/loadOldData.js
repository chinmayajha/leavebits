window.onload = function () {
    console.log("Data loaded from local storage: ", localStorage.getItem("ID"), localStorage.getItem("name"), localStorage.getItem("contact"), localStorage.getItem("room"), localStorage.getItem("hostel"), localStorage.getItem("DEPARTURE"), localStorage.getItem("RETURN"));
    document.getElementById("ID").value = localStorage.getItem("ID");
    document.getElementById("name").value = localStorage.getItem("name");
    document.getElementById("room").value = localStorage.getItem("room");
    document.getElementById("contact").value = localStorage.getItem("contact");
    document.getElementById("hostel").value = localStorage.getItem("hostel");
};