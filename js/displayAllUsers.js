export function displayAllUsers(usersArray) {
    const listOfUsers = document.querySelector(".users");
    listOfUsers.innerHTML = "";
    usersArray.map(user => {
      const html = ` <li class="user">
          <div class="user_photo-wrapper">
            <img 
            src=${user.picture.large} 
            alt="" class="user_img"
            >
          </div>
          <div class="user_description">
            <h2 class="user_name">${user.name.first} ${user.name.last}, ${user.dob.age}</h2>
            <span class="user_location data">Location: ${user.location.city}</span>
          </div>
          <div class="user_manipulate">
            <img 
              src="img/add-user.png" 
              alt="" 
              class="img_manipulate"
              >
            <img
              src="img/broken-heart.png"
              alt=""
              class="img_manipulate img_broken"
              >
            <img
              src="img/red-heart.png"
              alt=""
              class="img_manipulate img_liked hidden"
              >
            <img 
              src="img/email.png" 
              alt="" 
              class="img_manipulate"
              >
          </div>
        </li>`;
      listOfUsers.insertAdjacentHTML("beforeend", html);
    });
  }