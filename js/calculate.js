//* Create Bill Array
var billArray = [];
//*localStorage dang null
//* kiem tra neu localStorage null thi  billArray = [] , neu localStorage not null billArray = JSON.parse(localStorage.getItem("local_storage_bill_array"))
window.onload = function () {
    billArray = localStorage.getItem("local_storage_bill_array") ? billArray = JSON.parse(localStorage.getItem("local_storage_bill_array")) : billArray = [];
    genderTable()
}
//*Create Customer Object
var Customers = function (name, address, start, end, vat) {
    this.index = 0,
        this.name = name,
        this.address = address,
        this.start = start,
        this.end = end,
        this.vat = vat
}
//*gender Table
let genderTable = () => {
    var html = '';
    getElement('#table_data tbody').innerHTML = '';
    billArray.forEach((value, index) => {
        value.index = index;
        html += ` <tr>
        <td>${value.index}</td>
        <td>${value.name}</td>
        <td>${value.address}</td>
        <td>${value.start}</td>
        <td>${value.end}</td>
        <td>${value.vat}%</td>
        <td>
            <div class="form-group my-2">
                <a href="#" value="" onclick ="showPopUpUpdateBill(${value.index})" val id="update_table"><i class="fa-solid fa-pen-to-square"></i></a>
                <a href="#" onclick ="deleteElementBillTable(${value.index})"><i class="fa-solid fa-trash"></i></a>
            </div>
        </td>
    </tr>`
    });
    getElement('#table_data tbody').innerHTML = html;
}


//* hàm clear input
let clearInput = (...acc) => {
    for (let i = 0; i < acc.length; i++) {
        getElement(acc[i]).value = "";
    }
    getElement('#start').nextElementSibling.innerHTML = "";
    getElement('#end').nextElementSibling.innerHTML = "";
    getElement('#vat').nextElementSibling.innerHTML = "";
    getElement('#name').nextElementSibling.innerHTML = "";
    getElement('#address').nextElementSibling.innerHTML = "";
}


//* Create Function Insert Customers value
let insertCustomers = () => {
    //*get value
    var name = getElement('#name').value;
    var address = getElement('#address').value;
    var start = getElement('#start').value;
    var end = getElement('#end').value;
    var vat = getElement('#vat').value;
    //validate
    if (isNaN(start)) {
        getElement('#start').nextElementSibling.innerHTML = "start phải là sô";
    }
   
    if (isNaN(end)) {
        getElement('#end').nextElementSibling.innerHTML = "end phải là sô";
    }
   
    if (isNaN(vat)) {
        getElement('#vat').nextElementSibling.innerHTML = "vat phải là sô";
    }
    if (parseInt(start) < 0) {
        getElement('#start').nextElementSibling.innerHTML = "start phải > 0";
    }
   
    if (parseInt(end) < 0) {
        getElement('#end').nextElementSibling.innerHTML = "end phải > 0";
    }
   
    if (parseInt(vat) < 0) {
        getElement('#vat').nextElementSibling.innerHTML = "vat phải > 0";
    }
    if (start == "") {
        getElement('#start').nextElementSibling.innerHTML = "start không được trống";
    }
    if (start && !isNaN(start) && parseInt(start) >= 0) {
        getElement('#start').nextElementSibling.innerHTML = "";
    }
    if (end == "") {
        getElement('#end').nextElementSibling.innerHTML = "end không được trống";
    }
    if (end && !isNaN(end) && parseInt(end) >= 0) {
        getElement('#end').nextElementSibling.innerHTML = "";
    }
    if (vat == "") {
        getElement('#vat').nextElementSibling.innerHTML = "vat không được trống";
    }
    if (vat && !isNaN(vat) && parseInt(vat) >= 0) {
        getElement('#vat').nextElementSibling.innerHTML = "";
    }
    if (address == "") {
        getElement('#address').nextElementSibling.innerHTML = "address không được trống";
    }
    if (address) {
        getElement('#address').nextElementSibling.innerHTML = "";
    }
    if (name == "") {
        getElement('#name').nextElementSibling.innerHTML = "name không được trống";
        
    }
    if (name) {
        getElement('#name').nextElementSibling.innerHTML = "";
    }
    if (!isNaN(start) && !isNaN(end) && parseInt(start) > parseInt(end)) {
        getElement('#end').nextElementSibling.innerHTML = "end phai la lon hon start";
    }
    if (isNaN(start) || isNaN(vat) || isNaN(end) || name == "" ||  address == "" ||  start == "" ||  end == "" ||  vat == "" || parseInt(start ) < 0 || parseInt(end ) < 0 || parseInt(vat ) < 0)   {
        console.log("asdsa");
        return;
    }
   
    console.log(name,address,start,end,vat);
    // getElement('#start').nextElementSibling.innerHTML = "";
    // getElement('#end').nextElementSibling.innerHTML = "";
    // getElement('#vat').nextElementSibling.innerHTML = "";
    // getElement('#address').nextElementSibling.innerHTML = "";
    // getElement('#name').nextElementSibling.innerHTML = "";
    //*new object customer
    var customers = new Customers(name, address, start, end, vat);
    //*push value to array
    billArray.push(customers);
    console.log(billArray);
    //* tao table
    genderTable();
    //* clear các value có trong input trong insert table
    clearInput('#name', '#address', '#start', '#end', '#vat');

    //* set new item to local storage
    localStorage.setItem("local_storage_bill_array", JSON.stringify(billArray));
    // getElement('#name').value = "";
    // getElement('#address').value = "";
    // getElement('#start').value = "";
    // getElement('#end').value = "";
    // getElement('#vat').value = "";

}
//* clear value in input from form insert data
let clearInputInsertForm = () => {
    clearInput('#name', '#address', '#start', '#end', '#vat');
}

//*show pop-up update bill
let showPopUpUpdateBill = (id) => {
    getElement('#hidden').removeAttribute('class');
    var customer_id = id;
    //* truyền dữ liệu vào pop-up update bill
    // getElement('#index_edit').setAttribute('value', customer_id);
    getElement('#index_edit').value = customer_id;
    for (let i = 0; i < billArray.length; i++) {
        const customer_edit = billArray[i];
        if (customer_edit.index == customer_id) {
            getElement('#name_edit').value = customer_edit.name;
            getElement('#address_edit').value = customer_edit.address;
            getElement('#start_edit').value = customer_edit.start;
            getElement('#end_edit').value = customer_edit.end;
            getElement('#vat_edit').value = customer_edit.vat;
            // // getElement('#name_edit').setAttribute('value', customer_edit.name);
            // getElement('#address_edit').setAttribute('value', customer_edit.address);
            // getElement('#start_edit').setAttribute('value', customer_edit.start);
            // getElement('#end_edit').setAttribute('value', customer_edit.end);
            // getElement('#vat_edit').setAttribute('value', customer_edit.vat);
            return
        }
    }
    // getElement('#name_edit').setAttribute('value', name);
    // getElement('#name_edit').value = name;

}

//*hidden pop-up update bill
let hiddenPopUpUpdateBill = () => {
    getElement('#hidden').setAttribute('class', 'hidden');
}

//* update customer bill
let updateCustomerBill = () => {
    var name_update = getElement('#name_edit').value;
    var address_update = getElement('#address_edit').value;
    var start_update = getElement('#start_edit').value;
    var end_update = getElement('#end_edit').value;
    var vat_update = getElement('#vat_edit').value;
    var index_customer_update = getElement('#index_edit').value;
    //*find obj to edit in array by index 
    var index_obj_customer_edit = billArray.findIndex(obj => obj.index == index_customer_update);
    //*insert value to array
    billArray[index_obj_customer_edit].name = name_update;
    billArray[index_obj_customer_edit].address = address_update;
    billArray[index_obj_customer_edit].start = start_update;
    billArray[index_obj_customer_edit].end = end_update;
    billArray[index_obj_customer_edit].vat = vat_update;
    //* an pop-up update
    hiddenPopUpUpdateBill();
    //* tao table
    genderTable();
    //* set update item to local storage
    localStorage.setItem("local_storage_bill_array", JSON.stringify(billArray));
}

//*delete customer in table
let deleteElementBillTable = (id) => {
    let customer_id = id;
    //*delete customer
    billArray.splice(customer_id, 1);
    //* tao table
    genderTable();
    //* set delete item to local storage
    localStorage.setItem("local_storage_bill_array", JSON.stringify(billArray));
}

//* các event
// getEvent('click', '#insert_data_customer', insertCustomers);

getElement('#insert_data_customer').addEventListener('click', () =>{
    insertCustomers();
 
})

getEvent('click', '#clear_input_insert_form', clearInputInsertForm);
getEvent('click', '#update_bill', updateCustomerBill)
getEvent('click', '#hidden_update_bill', hiddenPopUpUpdateBill);


// getElement('#hidden_update_bill').addEventListener('click', () => {
//     hiddenPopUpUpdateBill();
// });
// getEvent('click', '#update_table', showPopUpUpdateBill);
// getElement('#update_table').addEventListener('click', () => {
//     showPopUpUpdateBill();
// });


//* get value on URL
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// console.log(urlParams);

// const product = urlParams.get('customer');
// console.log(product);


// var a = 1;
// var b = null;
// a = b ? a = 1 : [];
// console.log(a);