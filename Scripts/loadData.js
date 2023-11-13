window.onload = function () {
    console.log("Data loaded from local storage: ", localStorage.getItem("ID"), localStorage.getItem("name"), localStorage.getItem("contact"), localStorage.getItem("room"), localStorage.getItem("hostel"), localStorage.getItem("DEPARTURE"), localStorage.getItem("RETURN"));
    document.getElementById("ID").textContent = localStorage.getItem("ID");
    document.getElementById("name").textContent = localStorage.getItem("name");
    document.getElementById("room").textContent = localStorage.getItem("room");
    document.getElementById("hostel").textContent = localStorage.getItem("hostel");
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var departuredate = new Date(localStorage.getItem("DEPARTURE"));
    document.getElementById("DEPARTURE").textContent = departuredate.getDate().toString() + '-' + months[departuredate.getMonth()] + '-' + (departuredate.getYear() - 100 + 2000).toString();
    var returndate = new Date(localStorage.getItem("RETURN"));
    document.getElementById("RETURN").textContent = returndate.getDate().toString() + '-' + months[returndate.getMonth()] + '-' + (returndate.getYear() - 100 + 2000).toString();
    document.getElementById("APPLIEDON").textContent = departuredate.getDate().toString() + '-' + months[departuredate.getMonth()] + '-' + (departuredate.getYear() - 100 + 2000).toString();

    console.log(departuredate, returndate);
};