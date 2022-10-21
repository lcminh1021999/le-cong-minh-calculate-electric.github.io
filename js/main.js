accountCustomerArray = [];
accountLoginArray = [];

window.onload = function () {
    accountCustomerArray = localStorage.getItem("accountCustomer") ? accountCustomerArray = JSON.parse(localStorage.getItem("accountCustomer")) : accountCustomerArray = [];
}
// console.log(accountCustomerArray);
// console.log(localStorage.getItem("accountCustomer"));
// window.onload = function () {
//     accountLoginArray = localStorage.getItem("accountLogin") ? accountLoginArray = JSON.parse(localStorage.getItem("accountLogin")) : accountLoginArray = [];
// }
window.onload = function () {

    if (accountLoginArray = localStorage.getItem("accountLogin")) {
        accountLoginArray = JSON.parse(localStorage.getItem("accountLogin"));
        console.log(accountLoginArray);
        getElement('#login_box').setAttribute('class', 'hidden_login_box');
        getElement('#hidden_login').setAttribute('class', 'hidden_login');
        accountLoginArray.forEach(element => {
            getElement('#user_info_box').setAttribute('class', 'user_info_box');
            var html = `<li>
            <a class="name_user" href="">Name : ${element.name}</a>
            <ul class="sub_menu_1">
               <li>
                    <a href="./calculate.html">Quan lý thông tin cútomer</a>
               </li>
                <li>
                    <a id="logout" onClick="userLogout()" href="#">logout</a>
                </li>
            </ul>
        </li>`;
            getElement('#user_info_box').innerHTML = html;
        });
    } else {
        //*return loi
        accountLoginArray = [];
    }
}


var accountCustomerObject = function (name, email, phone, password) {
    this.id = 0,
        this.name = name,
        this.email = email,
        this.phone = phone,
        this.password = password
}

//* Show login form 
let showLoginForm = () => {
    getElement('#hidden_login').removeAttribute('class');
}
//* Hidden login form
let hiddenLoginForm = () => {
    getElement('#hidden_login').setAttribute('class', 'hidden_login');
}

//* Show Register form
let showRegisterForm = () => {
    getElement('#hidden_register').removeAttribute('class');
}

//* Hidden Register form
let hiddenRegisterForm = () => {
    getElement('#hidden_register').setAttribute('class', 'hidden_register');
}

//* Register Account
//!loi fix
let registerAccount = () => {
    var name = getElement('#name_register').value;
    var email = getElement('#email_register').value;
    var phone = getElement('#phone_register').value;
    var password = getElement('#password_register').value;

    if (name == "") {
        getElement('#name_register').nextElementSibling.innerHTML = "name không được trống";
    }
    if (name) {
        getElement('#name_register').nextElementSibling.innerHTML = "";
    }
    if (email == "") {
        getElement('#email_register').nextElementSibling.innerHTML = "email không được trống";
        
    }
    if (email) {
        getElement('#email_register').nextElementSibling.innerHTML = "";
    }
    if (phone == "") {
        getElement('#phone_register').nextElementSibling.innerHTML = "phone không được trống";
        
    }
    if (phone) {
        getElement('#phone_register').nextElementSibling.innerHTML = "";
    }
    if (password == "") {
        getElement('#password_register').nextElementSibling.innerHTML = "password không được trống";
        
    }
    if (password) {
        getElement('#password_register').nextElementSibling.innerHTML = "";
    }

    if ( name == "" ||  email == "" ||  phone == "" ||  password == "")   {
        console.log("asdsa");
        return;
    }


    var new_customer = new accountCustomerObject(name, email, phone, password);
    console.log(new_customer);
    accountCustomerArray = JSON.parse(localStorage.getItem("accountCustomer"))
    if (accountCustomerArray == null) {
        accountCustomerArray = []
    } else {
        accountCustomerArray = JSON.parse(localStorage.getItem("accountCustomer"))
    }
    accountCustomerArray.push(new_customer);
    console.log(accountCustomerArray);
    //*upload to  local storage 
    localStorage.setItem('accountCustomer', JSON.stringify(accountCustomerArray));
    hiddenRegisterForm()
}

//* login account
//!loi fix
let loginAccount = () => {
    var test = localStorage.getItem('accountCustomer');
    var account_customer = JSON.parse(localStorage.getItem('accountCustomer'));

    var email_login = getElement('#email_login').value;
    var pass_login = getElement('#pass_login').value;
 
    if (email_login == "") {
        getElement('#email_login').nextElementSibling.innerHTML = "email không được trống";
        
    }
    if (email_login) {
        getElement('#email_login').nextElementSibling.innerHTML = "";
    }
  
    if (pass_login == "") {
        getElement('#pass_login').nextElementSibling.innerHTML = "password không được trống";
        
    }
    if (pass_login) {
        getElement('#pass_login').nextElementSibling.innerHTML = "";
    }

    if ( email_login == "" ||  pass_login == "")   {
        console.log("asdsa");
        return;
    }

    account_customer.forEach((value, index) => {
        var email = value.email;
        var pass = value.password;
        if (email === email_login && pass === pass_login) {
            getElement('#login_box').setAttribute('class', 'hidden_login_box');
            getElement('#hidden_login').setAttribute('class', 'hidden_login');

            var account_login = new accountCustomerObject(value.name, value.email, value.phone, value.password)
            accountLoginArray.push(account_login);
            localStorage.setItem('accountLogin', JSON.stringify(accountLoginArray));
            // accountLoginArray = JSON.parse(localStorage.getItem('accountLogin' ));
            // console.log(accountLoginArray);
            // accountLoginArray.forEach((value) => {
            //     console.log(value.name);
            // })
            getElement('#user_info_box').setAttribute('class', 'user_info_box');
            var html = `<li>
            <a class="name_user" href="">Name : ${value.name}</a>
            <ul class="sub_menu_1">
                <li>
                  <a href="./calculate.html">Quan lý thông tin cútomer</a>
                </li>
                <li>
                  <a id="logout" onClick="userLogout()" href="#">logout</a>
                </li>
            </ul>
        </li>`;
            getElement('#user_info_box').innerHTML = html;
            // accountLoginArray.forEach(element => {
            //     getElement('#user_info_box').setAttribute('class', 'user_info_box');
            //     var html = `<label>Name : ${element.name}</label>`;
            //     getElement('#user_info_box').innerHTML =  html;
            // });
            // getElement('#user_info_box').classList.remove("user_info_box ");
            return

        } else {
            getElement('#pass_login').nextElementSibling.innerHTML = "email hoặc pass không đúng";
        }
    });
}
//!loi fix
//*logout
let userLogout = () => {
    console.log("123");
    localStorage.removeItem('accountLogin');
    getElement('#login_box').removeAttribute('class', 'hidden_login_box');
    getElement('#login_box').setAttribute('class', 'login_box');
    getElement('#user_info_box').setAttribute('class', 'user_info_box_hidden');
}


getEvent('click', '#show_login_form', function () {
    showLoginForm();
});
getEvent('click', '#hidden_login_form', function () {
    hiddenLoginForm();
});

getEvent('click', '#show_register_form', function () {
    showRegisterForm();
});
getEvent('click', '#hidden_register_form', function () {
    hiddenRegisterForm();
});
getEvent('click', '#register_account', function () {
    registerAccount();
})
getEvent('click', '#login_account', function () {
    loginAccount();
});