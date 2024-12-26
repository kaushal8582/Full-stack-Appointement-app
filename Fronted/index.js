const username = document.getElementById("username");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const addBtn = document.getElementById("addBtn");
const appointmentList = document.getElementById("appointmentList");

let DataArray = [];
let id = null;

function deleteData(id) {
  axios
    .delete(`http://localhost:3000/user/delete-user/${id}`)
    .then((result) => {
      getAllData();
    })
    .catch((err) => {
      console.log(err);
    });
}

function render(data) {
  let cluster = "";
  data.forEach((item) => {
    cluster += `<li>
                    <span>name:${item.username}, phoneNo: ${item.phoneNo} email:${item.email}</span>
                    <div class="actions">
                        <button class="edit" id="${item.id}" >edit</button>
                    <button class="edit" id="${item.id}" >Delete</button>
                    </div>
                </li>`;
  });
  appointmentList.innerHTML = cluster;
}

function getAllData() {
  axios.get("http://localhost:3000/user/get-data").then((result) => {
    console.log(result.data.data, "result value");
    DataArray = result.data.data;
    render(result.data.data);
  });
}

function addData() {
  // console.log(username,phone,email)
  if (!username.value || !phone.value || !email.value) {
    alert("Plz enter all details");
  }

  axios
    .post("http://localhost:3000/user/add-data", {
      username: username.value,
      email: email.value,
      phoneNo: phone.value,
    })
    .then((result) => {
      username.value = "";
      phone.value = "";
      email.value = "";
      getAllData();
    })
    .catch((err) => {});
}

addBtn.addEventListener("click", (e) => {
  if (e.target.innerText == "Update") {
    console.log(e.target.innerText)
    updateData();
  } else {
    addData();
  }
});

getAllData();

function updateData() {
    console.log(username.value.trim(),email.value.trim(),phone.value.trim(),id)
  axios
    .post("http://localhost:3000/user/edit-user", {
      id: id,
      name: username.value.trim(),
      usersendemail: email.value.trim(),
      mobile: phone.value.trim(),
    })
    .then((result) => {
      id = null;
      username.value = "";
      phone.value = "";
      email.value = "";
      addBtn.innerText="Submit"
      getAllData();
    });
}

appointmentList.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON" && e.target.innerText == "Delete") {
    // console.dir(e.target.id)
    deleteData(e.target.id);
  }

  if (e.target.tagName == "BUTTON" && e.target.innerText == "edit") {
    id = e.target.id;
    let value = DataArray.filter((item) => item.id == id);
    console.log(id,value)
    username.value = value[0].username;
    email.value = value[0].email;
    phone.value = value[0].phoneNo;
    addBtn.innerText = "Update";
  }
});

// function addAppointment() {
//   if (username && phone && email) {
//     const listItem = document.createElement("li");

//     const text = document.createElement("span");
//     text.textContent = `Name: ${username}, Phone: ${phone}, Email: ${email}`;

//     const actions = document.createElement("div");
//     actions.className = "actions";

//     const editButton = document.createElement("button");
//     editButton.textContent = "Edit";
//     editButton.className = "edit";
//     editButton.onclick = function () {
//       editAppointment(listItem, username, phone, email);
//     };

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.onclick = function () {
//       appointmentList.removeChild(listItem);
//     };

//     actions.appendChild(editButton);
//     actions.appendChild(deleteButton);

//     listItem.appendChild(text);
//     listItem.appendChild(actions);
//     appointmentList.appendChild(listItem);

//     document.getElementById("appointmentForm").reset();
//   } else {
//     alert("Please fill all fields!");
//   }
// }

// function editAppointment(listItem, username, phone, email) {
//   const form = document.getElementById("appointmentForm");
//   document.getElementById("username").value = username;
//   document.getElementById("phone").value = phone;
//   document.getElementById("email").value = email;
//   listItem.remove();
// }
