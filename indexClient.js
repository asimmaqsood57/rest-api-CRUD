const postData = () => {
  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const age = document.getElementById("age").value;

  const intAge = parseInt(age);

  const phone = document.getElementById("phone").value;
  const intPhone = Number(phone);

  console.log(name, email, intAge, intPhone);

  const resp = fetch("http://localhost:3001/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      age: intAge,
      phone: intPhone,
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  if (resp) {
    renderUsers();
  }
};

const fetchData = async () => {
  console.log("getting data");

  try {
    const respo = await fetch("http://localhost:3001/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await respo.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (id) => {
  if (window.confirm("Do you want to delete it?")) {
    const dataDeleted = await fetch(`http://localhost:3001/user/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (dataDeleted) {
      renderUsers();
    }
    console.log(dataDeleted);
  }
};
const updateData = async (editObj) => {
  objuser = JSON.parse(decodeURIComponent(editObj));
  console.log(objuser);

  const id = objuser._id;

  let html = `
        
        <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Name</label
              >
              <input
              value="${objuser.name}"
                type="text"
                class="form-control"
                id="updateName"
                aria-describedby="emailHelp"
              />

            </div>
        <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Age</label
              >
              <input

              value="${objuser.age}"

                type="text"
                class="form-control"
                id="updateAge"
                aria-describedby="emailHelp"
              />

            </div>
        <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Email</label
              >
              <input
              value="${objuser.email}"

                type="email"
                class="form-control"
                id="updateEmail"
                aria-describedby="emailHelp"
              />

            </div>

            <div class="mb-3 form-check">
              <input

                type="hidden"
                class="form-check-input"
                id="id"
                value="${id}"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Check me out</label
              >
            </div>
            <button onclick="submitData()" class="btn btn-primary">Submit</button>
          </div>`;

  document.getElementById("edit").innerHTML = html;
};

const submitData = () => {
  const name = document.getElementById("updateName").value;

  const email = document.getElementById("updateEmail").value;

  const age = document.getElementById("updateAge").value;
  const id = document.getElementById("id").value;

  const intAge = parseInt(age);

  console.log(name, email, intAge, id);

  if (window.confirm("Are you sure you want to edit?")) {
    if (name || email || intAge || id) {
      const resp = fetch(`http://localhost:3001/user/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          age: intAge,
        }),
      })
        .then((res) => {
          console.log(res);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });

      if (resp) {
        renderUsers();
      }
    }
  }
};

async function renderUsers() {
  let users = await fetchData();
  let html = "";
  users.forEach((user) => {
    let htmlSegment = `    <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age} </td>
          <td><button type="button" onclick="updateData( ' ${encodeURIComponent(
            JSON.stringify(user)
          )} '  )"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit
</button></td>
         <td><button onclick="deleteData('${
           user._id
         }')" class="btn btn-danger">Delete</button>
    </td>
          </tr>`;

    html += htmlSegment;
  });

  let container = document.getElementById("data");
  container.innerHTML = html;
}

renderUsers();

// postData();
