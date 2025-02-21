//const productID = document.getElementById('productID');
var userID = "";
var orderList = [];

// var url = location.href;
let eventDocUrl = new URL(location.href);
// console.log ('URL: ' + eventDocUrl);
let searchParams = new URLSearchParams(eventDocUrl.search);
var orderDateRange = searchParams.get('orderDateRange');
// v
try {
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      userID = firebaseUser.uid;
      GetProfileData();
      GetUserList();
      populateOrderDetails('Pending');

    } else {
      window.location.href = "../login/index.html";
    }

  });
} catch (error) {

  console.log(error.message);
}
//window.location.href = "../index.html";
function GetUserList() {
  var DBrows = db.collection('UserList').get();
  // console.log("in GetUserList");
  DBrows.then((changes) => {
    var index = 0;
    changes.forEach(change => {
      // console.log(change.data());
      // console.log(change.id);
      var anchorB = document.createElement("button");
      anchorB.setAttribute("onclick", "showItem('" + change.id + "')");
      anchorB.innerHTML = change.data().displayName + ":" + change.data().EmailID;

      var hfID = document.createElement("input");
      hfID.setAttribute("type", "hidden");
      hfID.setAttribute("id", "hdID" + index);
      hfID.setAttribute("value", change.id);
      anchorB.appendChild(hfID);

      document.getElementById("idUsers").appendChild(anchorB);

    });
  });
}


function inputSearchFocus() {
  document.getElementById("idUsers").style.display = "block";
  document.getElementById("wrongSearch").style.display = "none";

}

function filterFunction() {
  console.log('hi');
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  // console.log(filter);
  div = document.getElementById("idUsers");
  a = div.getElementsByTagName("button");
  // console.log(a.length);
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}



function myChangeEvent() {
  console.log('myChangeEvent');

  document.getElementById("orderListDiv").innerHTML = "";
  var noFlag = false;
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.children[0].value.toUpperCase();
  div = document.getElementById("idUsers");
  a = div.getElementsByTagName("button");
  var hfid = "";
  var userList = [];
  var prodCnt = 0;
  var callCount = 0;
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      noFlag = true;;
      a[i].style.display = "";
      hfid = a[i].getElementsByTagName("input")[0];
      userList.push(hfid.value);
      prodCnt = prodCnt + 1;
      if (prodCnt === 10) {
        //RenderProductByProducrID(productList, callCount);
        renderOrderByUserID(userList, callCount);
        userList = [];
        prodCnt = 0;
        callCount = callCount + 1;
      }
    } else {
      a[i].style.display = "none";
    }
  }
  if (userList.length > 0) {
    renderOrderByUserID(userList, callCount);
    callCount = callCount +1;
  }
  console.log(callCount);
  if(callCount > 0 )
    document.getElementById("wrongSearch").style.display = "none";
  else {
    document.getElementById("wrongSearch").style.display = "block";
  }
  document.getElementById("idUsers").style.display = "none";

}


function showItem(itemname) {
  var index = 0;
  console.log(itemname);

    var DBrows = db.collection("OrderDetails")
      .where("orderBy","==", itemname)
      .get();
    DBrows.then((changes) => {
      changes.forEach(change => {
        console.log(change.id);
        console.log(change.data());
        renderOrder(change.id, change.data(), index);
        index = index + 1;
      });
      console.log(index);
      if(index === 0 )
      {
        document.getElementById("wrongSearch").style.display = "block";
      }
      document.getElementById("idUsers").style.display = "none";

    });

}

function renderOrderByUserID(userList, callCount) {
  console.log(userList);
  console.log(callCount);
  var index = 0;
  var DBrows = db.collection("OrderDetails")
    .where("orderBy", "in", userList)
    .get();
  DBrows.then((changes) => {
    index = Number(callCount) * 10;
    //productCategory.push('All');
    changes.forEach(change => {
      renderOrder(change.id, change.data(), index);
      index = index + 1;
    });
  });

  if(index === 0 )
  {
      document.getElementById("wrongSearch").style.display = "block";
  }
}

function GetUserListOld() {
  var DBrows = db.collection('UserList').get();

  DBrows.then((changes) => {
    var i = 0;
    changes.forEach(change => {
      orderList = change.data();
      var name = change.data().CreatedBy;
      var strText = change.data().displayName + ":" + change.data().EmailID;
      var strValue = change.id;

      var option = document.createElement("option");
      option.setAttribute("value", strValue);
      option.innerHTML = strText;

      document.getElementById("userList").appendChild(option);

    });
  });


}

function GetProfileData() {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(userID);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {

        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        }
        document.getElementById('profileName').innerHTML = doc.data().displayName;

        //document.getElementById('headerProfilePic').src = doc.data().ProfileImageURL;
        //document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};


function dateRangeChange() {
  var dateRange = document.getElementById('dateRange');
  var value = dateRange.options[dateRange.selectedIndex].value;
  if (value === 'Today')
    window.location.href = "orderStatus.html?orderDateRange=today";
  else if (value === 'Yesterday')
    window.location.href = "orderStatus.html?orderDateRange=yesterday";

  else if (value === 'Last 7 days')
    window.location.href = "orderStatus.html?orderDateRange=week";
  else if (value === 'Current month')
    window.location.href = "orderStatus.html?orderDateRange=month";
  else if (value === 'Last 6 months')
    window.location.href = "orderStatus.html?orderDateRange=sixmonth";

}

function GetOrderByUsers() {
  var index = 0;
  document.getElementById('loading').style.display = 'block';
  var users = document.getElementById('userList');
  var selecteduservalue = users.options[users.selectedIndex].value;

  var DBrows;
  if (selecteduservalue === 'All') {
    DBrows = db.collection('OrderDetails')
      .get();

  } else {
    DBrows = db.collection('OrderDetails')
      .where("orderBy", "==", selecteduservalue).get();
  }

  DBrows.then((changes) => {

    var i = 0;
    document.getElementById("orderListDiv").innerHTML = "";
    changes.forEach(change => {

      orderList = change.data();

      var name = change.data().CreatedBy;

      renderOrder(change.id, change.data(), index)
      index = index + 1;
    });
  });
  document.getElementById('loading').style.display = 'none';
}

function populateOrderDetailsBackup() {

  // const snapshot = db.collection('OrderDetails').doc(userID);
  var fromDate;
  var todayDate = new Date();
  // console.log(todayDate);
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

  todayDate = refDate;

  var index = 0;
  var snapshot;
  var DBrows;
  // console.log(orderDateRange);
  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null)

  {
    DBrows = db.collection('OrderDetails').get();

    //DBrow = db.collection('OrderDetails').get();
  } else if (orderDateRange === 'today') {
    // console.log('in today');
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", toDate).get();

  } else if (orderDateRange === 'yesterday') {

    todayDate.setDate(todayDate.getDate() - 1);

    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", todayDate)
      .where("orderDate", "<=", toDate).get();
  } else if (orderDateRange === 'week') {
    refDate.setDate(refDate.getDate() - 7);
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", refDate).get();
  } else if (orderDateRange === 'month') {
    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    DBrows = db.collection('OrderDetails')
      .where("orderDate", ">=", refDate).get();
  }

  DBrows.then((changes) => {

    var i = 0;
    document.getElementById("orderList").innerHTML = "";
    changes.forEach(change => {
      orderList = change.data();

      var name = change.data().CreatedBy;


      renderOrder(orderList, index, name, change.id);
      index = index + 1;
    });
  });
  document.getElementById('loading').style.display = 'none';


}

// function renderPendingPaymentOrder(order, index, createdBy, orderid) {
//
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//   var dDate = new Date(order.deliveryDate.seconds * 1000);
//   var dt1 = dDate.toLocaleDateString("en-US", options);
//
//   var oDate = new Date(order.orderDate.seconds * 1000);
//   var dt = oDate.toLocaleDateString("en-US", options);
//
//   // var anchor = document.createElement("a");
//   // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);
//
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12 " + "Pending");
//   div1.setAttribute("style", "padding: 5px;");
//   div1.setAttribute("id", "mainDiv" + index);
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("class", "orders-list-div");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("class", "");
//   div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "order-details");
//
//   var hforderid = document.createElement("input");
//   hforderid.setAttribute('type', 'hidden');
//   hforderid.setAttribute('id', 'hfOrderID' + index);
//   hforderid.setAttribute('value', orderid);
//
//   div5.appendChild(hforderid);
//
//   var hforderby = document.createElement("input");
//   hforderby.setAttribute('type', 'hidden');
//   hforderby.setAttribute('id', 'hfOrderBy' + index);
//   hforderby.setAttribute('value', order.orderBy);
//
//   div5.appendChild(hforderby);
//
//   var i1 = document.createElement("i");
//   i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
//   i1.setAttribute("class", "far fa-edit address-edit-icon");
//   i1.setAttribute("style", "padding: 0 5px 0 5px;");
//
//   div5.appendChild(i1);
//
//   var spanDelete = document.createElement('span');
//   spanDelete.setAttribute("id", "btnDelete" + index);
//   spanDelete.setAttribute("onclick", "deleteOrder(" + "hfOrderID" + index + ",mainDiv" + index + ");");
//   spanDelete.setAttribute("class", "material-icons");
//   spanDelete.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
//   spanDelete.innerHTML = "delete_outline";
//
//   div5.appendChild(spanDelete);
//
//   div3.appendChild(div5);
//
//   var small1 = document.createElement("small");
//   small1.setAttribute("class", "payment-pending");
//   small1.innerHTML = "Delivery Date: " + dt1; //dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear() + "";
//
//   div3.appendChild(small1);
//
//   var small11 = document.createElement("small");
//   small11.setAttribute("class", "payment-pending");
//   small11.innerHTML = "Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;
//
//   div3.appendChild(small11);
//   div2.appendChild(div3);
//
//   var h1 = document.createElement("h6");
//   h1.innerHTML = "Order Serial Numbe : " + (index + 1);
//
//   div2.appendChild(h1);
//
//   var h11 = document.createElement("h6");
//   h11.innerHTML = "Order By : " + createdBy;
//
//   div2.appendChild(h11);
//
//
//   h11 = document.createElement("h6");
//   h11.innerHTML = "Order Status : " + order.orderStatus;
//   div2.appendChild(h11);
//
//   var h2 = document.createElement("h6");
//   if (order.discountedprize > 0) {
//     h2.setAttribute("style", "padding:0;text-decoration:line-through;");
//   } else {
//     h2.setAttribute("style", "padding:0;");
//
//   }
//   h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
//
//   div2.appendChild(h2);
//
//   if (order.discountedprize > 0) {
//     var h21 = document.createElement("h6");
//     h21.setAttribute("style", "padding:0;");
//     h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
//     div2.appendChild(h21);
//
//   }
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "order-details");
//
//   var div4h1 = document.createElement("h5");
//   div4h1.setAttribute("class", "payment-pending");
//   div4h1.innerHTML = order.totalItems + " Items";
//
//   div4.appendChild(div4h1);
//
//   var div4h2 = document.createElement("h5");
//   div4h2.setAttribute("class", "payment-pending");
//   div4h2.innerHTML = 'Payment Pending';
//   div4.appendChild(div4h2);
//   div2.appendChild(div4);
//
//   //div2.appendChild(div5);
//
//   //  anchor.appendChild(div2);
//
//   div1.appendChild(div2);
//   document.getElementById("orderList").appendChild(div1);
//
// }


// function renderPendingOrder(order, index, createdBy, orderid) {
//
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//   var dDate = new Date(order.deliveryDate.seconds * 1000);
//   var dt1 = dDate.toLocaleDateString("en-US", options);
//
//   var oDate = new Date(order.orderDate.seconds * 1000);
//   var dt = oDate.toLocaleDateString("en-US", options);
//   //
//   // var anchor = document.createElement("a");
//   // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);
//
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12 " + "Pending");
//   div1.setAttribute("style", "padding: 5px;");
//   div1.setAttribute("id", "mainDiv" + index);
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("class", "orders-list-div");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("class", "");
//   div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "order-details");
//
//   var hforderid = document.createElement("input");
//   hforderid.setAttribute('type', 'hidden');
//   hforderid.setAttribute('id', 'hfOrderID' + index);
//   hforderid.setAttribute('value', orderid);
//
//   div5.appendChild(hforderid);
//
//   var hforderby = document.createElement("input");
//   hforderby.setAttribute('type', 'hidden');
//   hforderby.setAttribute('id', 'hfOrderBy' + index);
//   hforderby.setAttribute('value', order.orderBy);
//
//   div5.appendChild(hforderby);
//
//   var i1 = document.createElement("i");
//   i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
//   i1.setAttribute("class", "far fa-edit address-edit-icon");
//   i1.setAttribute("style", "padding: 0 5px 0 5px;");
//
//   div5.appendChild(i1);
//
//   var spanDelete = document.createElement('span');
//   spanDelete.setAttribute("id", "btnDelete" + index);
//   spanDelete.setAttribute("onclick", "deleteOrder(" + "hfOrderID" + index + ",mainDiv" + index + ");");
//   spanDelete.setAttribute("class", "material-icons");
//   spanDelete.setAttribute("style", "cursor:pointer;padding: 0 20px 0 5px;");
//   spanDelete.innerHTML = "delete_outline";
//
//   div5.appendChild(spanDelete);
//   div3.appendChild(div5);
//
//   var small1 = document.createElement("small");
//   small1.setAttribute("class", "delivery-pending");
//   small1.innerHTML = "Delivery Date: " + dt1; //dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();;
//   div3.appendChild(small1);
//
//   var small11 = document.createElement("small");
//   small11.setAttribute("class", "delivery-pending");
//   small11.innerHTML = "Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;
//   div3.appendChild(small11)
//
//   div2.appendChild(div3);
//
//   var span1 = document.createElement('span');
//   span1.setAttribute('class', "material-icons delivery-pending");
//   span1.innerHTML = 'schedule';
//
//   div2.appendChild(span1);
//
//   var h1 = document.createElement("h6");
//   h1.innerHTML = "Order Serial Numbe : " + (index + 1);
//   div2.appendChild(h1);
//
//   var h11 = document.createElement("h6");
//   h11.innerHTML = "Order By : " + createdBy;
//   div2.appendChild(h11);
//
//   h11 = document.createElement("h6");
//   h11.innerHTML = "Order Status : " + order.orderStatus;
//   div2.appendChild(h11);
//
//   var h2 = document.createElement("h6");
//   if (order.discountedprize > 0) {
//     h2.setAttribute("style", "padding:0;text-decoration:line-through;");
//   } else {
//     h2.setAttribute("style", "padding:0;");
//   }
//
//   h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
//   div2.appendChild(h2);
//
//   if (order.discountedprize > 0) {
//     var h21 = document.createElement("h6");
//     h21.setAttribute("style", "padding:0;");
//     h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
//     div2.appendChild(h21);
//   }
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "order-details");
//
//   var div4h1 = document.createElement("h5");
//   div4h1.setAttribute("class", "delivery-pending");
//   div4h1.innerHTML = order.totalItems + " Items";
//
//   div4.appendChild(div4h1);
//
//   var div4h2 = document.createElement("h5");
//   div4h2.setAttribute("class", "delivery-pending");
//   div4h2.innerHTML = 'Delivery Pending';
//   div4.appendChild(div4h2);
//   div2.appendChild(div4);
//   //  anchor.appendChild(div2);
//   //div1.appendChild(anchor);
//   div1.appendChild(div2);
//   document.getElementById("orderList").appendChild(div1);
//
// }

// function renderDeliveredOrder(order, index, createdBy, orderid) {
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//   var dDate = new Date(order.deliveryDate.seconds * 1000);
//   var dt1 = dDate.toLocaleDateString("en-US", options);
//
//   var oDate = new Date(order.orderDate.seconds * 1000);
//   var dt = oDate.toLocaleDateString("en-US", options);
//
//
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12 " + "Delivered");
//   div1.setAttribute("style", "padding: 5px;");
//   div1.setAttribute("id", "mainDiv" + index);
//
//   // var anchor = document.createElement("a");
//   // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("class", "orders-list-div");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("class", "");
//   div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "order-details");
//
//   var hforderid = document.createElement("input");
//   hforderid.setAttribute('type', 'hidden');
//   hforderid.setAttribute('id', 'hfOrderID' + index);
//   hforderid.setAttribute('value', orderid);
//
//   div5.appendChild(hforderid);
//
//   var hforderby = document.createElement("input");
//   hforderby.setAttribute('type', 'hidden');
//   hforderby.setAttribute('id', 'hfOrderBy' + index);
//   hforderby.setAttribute('value', order.orderBy);
//
//   div5.appendChild(hforderby);
//
//   var i1 = document.createElement("i");
//   i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
//   i1.setAttribute("class", "far fa-edit address-edit-icon");
//   i1.setAttribute("style", "padding: 0 5px 0 5px;");
//
//   div5.appendChild(i1);
//   div3.appendChild(div5);
//
//   var small1 = document.createElement("small");
//   small1.innerHTML = "Delivery Date: " + dt1; // dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();;
//
//   div3.appendChild(small1);
//
//   var small11 = document.createElement("small");
//   small11.innerHTML = "<br>Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;
//
//
//   div3.appendChild(small11);
//   div2.appendChild(div3);
//
//   var span1 = document.createElement('span');
//   span1.setAttribute('class', "material-icons");
//   span1.innerHTML = 'task_alt';
//
//   div2.appendChild(span1);
//
//   var h1 = document.createElement("h6");
//   h1.innerHTML = "Order Serial Numbe : " + (index + 1);
//   div2.appendChild(h1);
//
//   var h11 = document.createElement("h6");
//   h11.innerHTML = "Order By : " + createdBy;
//   div2.appendChild(h11);
//
//   h11 = document.createElement("h6");
//   h11.innerHTML = "Order Status : " + order.orderStatus;
//   div2.appendChild(h11);
//
//   var h2 = document.createElement("h6");
//   if (order.discountedprize > 0) {
//     h2.setAttribute("style", "padding:0;text-decoration:line-through;");
//   } else {
//     h2.setAttribute("style", "padding:0;");
//
//   }
//   h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
//   div2.appendChild(h2);
//
//   if (order.discountedprize > 0) {
//     var h21 = document.createElement("h6");
//     h21.setAttribute("style", "padding:0;");
//     h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
//     div2.appendChild(h21);
//   }
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "order-details");
//
//   var div4h1 = document.createElement("h5");
//   div4h1.innerHTML = order.totalItems + " Items";
//
//   div4.appendChild(div4h1);
//   var div4h2 = document.createElement("h5");
//   div4h2.innerHTML = 'Delivered';
//
//   div4.appendChild(div4h2);
//   div2.appendChild(div4);
//   // anchor.appendChild(div2);
//   // div1.appendChild(anchor);
//   div1.appendChild(div2);
//   document.getElementById("orderList").appendChild(div1);
//
// }

// function renderCancelledOrder(order, index, createdBy, orderid) {
//   var options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   };
//
//   var dDate = new Date(order.deliveryDate.seconds * 1000);
//   var dt1 = dDate.toLocaleDateString("en-US", options);
//
//   var oDate = new Date(order.orderDate.seconds * 1000);
//   var dt = oDate.toLocaleDateString("en-US", options);
//
//
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12 " + "Cancelled");
//   div1.setAttribute("style", "padding: 5px;");
//   div1.setAttribute("id", "mainDiv" + index);
//   //
//   // var anchor = document.createElement("a");
//   // anchor.setAttribute("href", "orderSummary.html?id=" + order.orderID+"&userID="+order.orderBy);
//
//   var div2 = document.createElement("div");
//   div2.setAttribute("class", "orders-list-div");
//
//   var div3 = document.createElement("div");
//   div3.setAttribute("class", "");
//   div3.setAttribute("style", "flex-direction: column;align-items: flex-start;");
//
//   var div5 = document.createElement("div");
//   div5.setAttribute("class", "order-details");
//
//   var hforderid = document.createElement("input");
//   hforderid.setAttribute('type', 'hidden');
//   hforderid.setAttribute('id', 'hfOrderID' + index);
//   hforderid.setAttribute('value', orderid);
//
//   div5.appendChild(hforderid);
//
//   var hforderby = document.createElement("input");
//   hforderby.setAttribute('type', 'hidden');
//   hforderby.setAttribute('id', 'hfOrderBy' + index);
//   hforderby.setAttribute('value', order.orderBy);
//
//   div5.appendChild(hforderby);
//
//   var i1 = document.createElement("i");
//   i1.setAttribute("onclick", "GetOrderDetails(" + "hfOrderID" + index + ", hfOrderBy" + index + ");");
//   i1.setAttribute("class", "far fa-edit address-edit-icon");
//   i1.setAttribute("style", "padding: 0 5px 0 5px;");
//
//   div5.appendChild(i1);
//   div3.appendChild(div5);
//
//   var small1 = document.createElement("small");
//   small1.setAttribute('class', "cancel");
//   small1.innerHTML = "Delivery Date: " + dt1; //dt1.getDate() + "-" + (dt1.getMonth() + 1) + "-" + dt1.getFullYear();
//   div3.appendChild(small1);
//
//   var small11 = document.createElement("small");
//   small11.setAttribute("class", "cancel");
//   small11.innerHTML = "<br>Order Date: " + dt; //dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();;
//   div3.appendChild(small11);
//
//   div2.appendChild(div3);
//
//   var span1 = document.createElement('span');
//   span1.setAttribute('class', "material-icons cancel");
//   span1.innerHTML = 'cancel';
//   div2.appendChild(span1);
//
//   var h1 = document.createElement("h6");
//   h1.innerHTML = "Order Serial Numbe : " + (index + 1);
//   div2.appendChild(h1);
//
//   var h11 = document.createElement("h6");
//   h11.innerHTML = "Order By : " + createdBy;
//   div2.appendChild(h11);
//
//   h11 = document.createElement("h6");
//   h11.innerHTML = "Order Status : " + order.orderStatus;
//   div2.appendChild(h11);
//
//   var h2 = document.createElement("h6");
//   if (order.discountedprize > 0) {
//     h2.setAttribute("style", "padding:0;text-decoration:line-through;");
//   } else {
//     h2.setAttribute("style", "padding:0;");
//
//   }
//   h2.innerHTML = "TotalAmount : ₹ " + order.totalAmount;
//   div2.appendChild(h2);
//
//   if (order.discountedprize > 0) {
//     var h21 = document.createElement("h6");
//     h21.setAttribute("style", "padding:0;");
//     h21.innerHTML = "Discounted Amount : ₹ " + order.discountedprize + " (" + order.discountDetails.discountValue + " Off)";
//     div2.appendChild(h21);
//   }
//
//   var div4 = document.createElement("div");
//   div4.setAttribute("class", "order-details");
//
//   var div4h1 = document.createElement("h5");
//   div4h1.setAttribute('class', 'cancel');
//   div4h1.innerHTML = order.totalItems + " Items";
//   div4.appendChild(div4h1);
//
//   var div4h2 = document.createElement("h5");
//   div4h2.setAttribute('class', 'cancel');
//   div4h2.innerHTML = 'Cancelled';
//   div4.appendChild(div4h2);
//
//   div2.appendChild(div4);
//   // anchor.appendChild(div2);
//   // div1.appendChild(anchor);
//   div1.appendChild(div2);
//   document.getElementById("orderList").appendChild(div1);
//
// }
/////////////////////new function
// function renderOrderbackup(order, index, createdBy, orderid) {
//   //console.log(selectedItem);
//   //orderStatus : Pending, Packed, On the Way, Delivered, Cancelled
//   //PaymentStatus : Pending, Completed
//   //Combination orderStatus : Pending, PaymentStatus : Pending - covered
//   //Combination orderStatus : Pending, PaymentStatus : Completed - covered
//   //Combination orderStatus : Packed, PaymentStatus : Pending - covered
//   //Combination orderStatus : Packed, PaymentStatus : Completed -covered
//   //Combination orderStatus : On the Way, PaymentStatus : Pending -covered
//   //Combination orderStatus : On the Way, PaymentStatus : Completed-covered
//   //Combination orderStatus : Delivered, PaymentStatus : Pending -- not a valid status
//   //Combination orderStatus : Delivered, PaymentStatus : Completed - covered
//   //Combination orderStatus : Cancelled, PaymentStatus : Pending  -covered
//   //Combination orderStatus : Cancelled, PaymentStatus : Completed - covered
//   if (order.orderStatus === 'Pending' && order.paymentStatus === 'Pending') {
//     renderPendingPaymentOrder(order, index, createdBy, orderid);
//   } else if (order.orderStatus === 'Pending' && order.paymentStatus === 'Completed') {
//     renderPendingOrder(order, index, createdBy, orderid);
//   } else if (order.paymentStatus === 'Completed' && order.orderStatus === 'Delivered') {
//     renderDeliveredOrder(order, index, createdBy, orderid);
//   } else if (order.orderStatus === 'Packed' && order.paymentStatus === 'Pending') {
//     renderPendingPaymentOrder(order, index, createdBy, orderid);
//   } else if (order.orderStatus === 'Packed' && order.paymentStatus === 'Completed') {
//     renderPendingOrder(order, index, createdBy, orderid);
//   } else if (order.orderStatus === 'On The Way' && order.paymentStatus === 'Pending') {
//     renderPendingPaymentOrder(order, index, createdBy, orderid);
//   } else if (order.orderStatus === 'On The Way' && order.paymentStatus === 'Completed') {
//     renderPendingOrder(order, index, createdBy, orderid);
//   } else if (order.orderStatus === 'Cancelled') {
//     renderCancelledOrder(order, index, createdBy, orderid);
//   }
//
// }


function GetOrderDetails(orderID, userID) {

  window.location.href = "orderDetails.html?id=" + orderID.value + "&userID=" + userID.value;
}



function populateOrderDetails(orderStatus) {
  var i = 0;
  var fromDate;
  var todayDate = new Date();
  var toDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
  var refDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

  todayDate = refDate;
  var index = 0;
  var snapshot;
  var DBrows;
  var orderStatusList = ['Pending', 'Packed', 'On The Way'];
  var fromDate;
  var toDate;

  if (orderDateRange === undefined || orderDateRange === '' || orderDateRange === null || orderDateRange === 'null') {
    orderDateRange = "week";
  }
  //DBrow = db.collection('OrderDetails').get();
  if (orderDateRange === 'today') {
    var filter = document.getElementById("dateRange");
    filter.options[0].selected = true;

    if (orderStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        //.where('orderBy', '==', userID)
        .where("orderDate", ">=", toDate).get();

    } else if (orderStatus === 'Pending') {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', 'in', orderStatusList)
        .where("orderDate", ">=", toDate).get();

    } else {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', '==', orderStatus)
        .where("orderDate", ">=", toDate).get();
    }

    fromDate = 'Today';
    toDate = 'Today';

  } else if (orderDateRange === 'yesterday') {
    var filter = document.getElementById("dateRange");
    filter.options[1].selected = true;

    todayDate.setDate(todayDate.getDate() - 1);

    if (orderStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        //.where('orderBy', '==', userID)
        .where("orderDate", ">=", todayDate)
        .where("orderDate", "<=", toDate).get();
    } else if (orderStatus === 'Pending') {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', 'in', orderStatusList)
        .where("orderDate", ">=", todayDate)
        .where("orderDate", "<=", toDate).get();

    } else {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', '==', orderStatus)
        .where("orderDate", ">=", todayDate)
        .where("orderDate", "<=", toDate).get();
    }
    fromDate = todayDate;
    toDate = todayDate;

  } else if (orderDateRange === 'week') {
    var filter = document.getElementById("dateRange");
    filter.options[2].selected = true;

    refDate.setDate(refDate.getDate() - 7);

    if (orderStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        //.where('orderBy', '==', userID)
        .where("orderDate", ">=", refDate).get();
    } else if (orderStatus === 'Pending') {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', 'in', orderStatusList)
        .where("orderDate", ">=", refDate).get();

    } else {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', '==', orderStatus)
        .where("orderDate", ">=", refDate).get();
    }
    fromDate = refDate;
    toDate = 'Today';

  } else if (orderDateRange === 'month') {
    var filter = document.getElementById("dateRange");
    filter.options[3].selected = true;

    refDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    if (orderStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        //.where('orderBy', '==', userID)
        .where("orderDate", ">=", refDate).get();
    } else if (orderStatus === 'Pending') {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', 'in', orderStatusList)
        .where("orderDate", ">=", refDate).get();

    } else {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', '==', orderStatus)
        .where("orderDate", ">=", refDate).get();
    }
    fromDate = refDate;
    toDate = 'Today';

  } else if (orderDateRange === 'sixmonth') {
    var filter = document.getElementById("dateRange");
    filter.options[4].selected = true;

    refDate = refDate.setMonth(refDate.getMonth() - 6);
    refDate = new Date(refDate);
    if (orderStatus === 'All') {
      DBrows = db.collection('OrderDetails')
        //.where('orderBy', '==', userID)
        .where("orderDate", ">=", refDate).get();
    } else if (orderStatus === 'Pending') {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', 'in', orderStatusList)
        .where("orderDate", ">=", refDate).get();

    } else {
      DBrows = db.collection('OrderDetails')
        .where('orderStatus', '==', orderStatus)
        .where("orderDate", ">=", refDate).get();
    }
    fromDate = refDate;
    toDate = 'Today';

  }


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (fromDate === 'Today') {
    document.getElementById('dateRangelbl').innerHTML = "Order Placed Today";
  } else if (fromDate === toDate) {
    var displayDate = fromDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML = "Order Placed on :" + displayDate;
  } else if (toDate === 'Today') {
    var fDate = new Date(fromDate);
    var displayDate = fDate.toLocaleDateString("en-US", options);
    document.getElementById('dateRangelbl').innerHTML = displayDate + " till Today";
  }


  DBrows.then((changes) => {

    var i = 0;
    document.getElementById("orderListDiv").innerHTML = "";

    changes.forEach(change => {
      orderList = change.data();
      renderOrder(change.id, change.data(), i);
      i = i + 1;
    });

    document.getElementById("orderCount").innerHTML = i + " Orders";
    document.getElementById('loading').style.display = 'none';
  });
  populateCartData();


}

function GetOrder(filter) {
  var orderMenuListHr = document.getElementById('orderMenuListHr');
  // console.log(filter);
  if (filter === 'Pending') {
    orderMenuListHr.style.transform = 'translateX(0%)';
  } else if (filter === 'Delivered') {
    orderMenuListHr.style.transform = 'translateX(100%)';
  } else {
    orderMenuListHr.style.transform = 'translateX(200%)';
  }
  populateOrderDetails(filter);

}

function populateCartData() {
  var itemCount = 0;
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      cartDetails = doc.data().cartDetails;
      itemCount = cartDetails.length;
      //console.log(change.doc, index, selectdedItem);
    }
    //document.getElementById('cartItemCount').innerHTML = itemCount;

  });

}

function renderOrder(orderid, order, index) {
  var div1 = document.createElement("div");
  div1.setAttribute("class", "dashboard-card order-status");
  div1.setAttribute("id", "orderDiv" + index);
  // div1.setAttribute("onclick","showHideCard(orderDiv" + index + ", orderDiv" + index + "arrow)");

  var div2 = document.createElement("div");
  div2.setAttribute("class", "");
  div2.setAttribute("style", "display:flex;align-items: center;");
  // div2.setAttribute("id","orderDiv" + index);
  div2.setAttribute("onclick", "showHideCard(orderDiv" + index + ", orderDiv" + index + "arrow)");

  var div3 = document.createElement("div");
  div3.setAttribute("class", "arrow-down");

  var span1 = document.createElement("span");
  span1.setAttribute("class", "material-icons-outlined");
  span1.setAttribute("id", "orderDiv" + index + "arrow");
  span1.innerHTML = "keyboard_arrow_down";

  div3.appendChild(span1);

  var hforderid = document.createElement("input");
  hforderid.setAttribute('type', 'hidden');
  hforderid.setAttribute('id', 'hfOrderID' + index);
  hforderid.setAttribute('value', order.orderID);
  div3.appendChild(hforderid);
  div2.appendChild(div3);

  var div4 = document.createElement("div");
  div4.setAttribute("class", "");

  var span2 = document.createElement("span");
  span2.setAttribute("class", "material-icons-outlined order-icon")
  if (order.orderStatus === "Delivered") {
    span2.setAttribute("style", "font-size: 3rem; color: #1D741B;");
    span2.innerHTML = "check_circle";
  } else if (order.orderStatus === "On The Way") {
    span2.setAttribute("style", "font-size: 3rem; color: #88CA5E;");
    span2.innerHTML = "local_shipping";
  } else if (order.orderStatus === "Packed") {

    span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
    span2.innerHTML = "widgets";
  } else if (order.orderStatus === "Pending") {

    span2.setAttribute("style", "font-size: 3rem; color: #F8D210;");
    span2.innerHTML = "history_toggle_off";
  } else if (order.orderStatus === "Cancelled") {

    span2.setAttribute("style", "font-size: 3rem; color: #ff5757;");
    span2.innerHTML = "cancel";
  }

  //span2.setAttribute("class","material-icons-outlined order-icon");
  //check for order statys and change the icon
  //span2.innerHTML="check_circle";

  div4.appendChild(span2);
  div2.appendChild(div4);

  var div5 = document.createElement("div");
  div5.setAttribute("class", "details");

  var h1 = document.createElement("h4");
  if (order.orderStatus === "Delivered") {
    h1.setAttribute("style", "color: #1D741B");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "On The Way") {
    h1.setAttribute("style", "color: #88CA5E");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Packed") {
    h1.setAttribute("style", "color: #F8D210");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Cancelled") {
    h1.setAttribute("style", "color: #ff5757");
    h1.innerHTML = order.orderStatus;
  } else if (order.orderStatus === "Pending") {
    h1.setAttribute("style", "color: #F8D210");
    h1.innerHTML = order.orderStatus;
  }
  div5.appendChild(h1);


  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };


  var dt = order.deliveryDate;
  var odeldate = new Date(dt.seconds * 1000);
  var delDate = odeldate.toLocaleDateString("en-US", options);

  var p1 = document.createElement("p");
  p1.setAttribute("class", "small-text dashboard-sub-heading");
  p1.innerHTML = "Delivery: " + delDate + " [ " + order.deliveryTime + " ] - " + order.totalItems + " Items";

  div5.appendChild(p1);
  div2.appendChild(div5);
  div1.appendChild(div2);

  var div6 = document.createElement("div");
  div6.setAttribute("class", "dashboard-card-expand");

  var hr1 = document.createElement("hr");
  div6.appendChild(hr1);

  var div7 = document.createElement("div");
  div7.setAttribute("class", "dashboard-card-order");

  var div8 = document.createElement("div");
  div8.setAttribute("class", "");

  var h2 = document.createElement("h5");
  h2.setAttribute("class", "small-text");
  h2.setAttribute("style", "margin: 0 auto;");
  h2.innerHTML = "Order Number";
  div8.appendChild(h2);

  var small1 = document.createElement("small");
  small1.innerHTML = order.orderNumber;
  div8.appendChild(small1);

  div7.appendChild(div8);

  var div9 = document.createElement("div");
  div9.setAttribute("class", "");

  var h3 = document.createElement("h5");
  h3.setAttribute("class", "small-text");
  h3.setAttribute("style", "margin: 0 auto;");
  h3.innerHTML = "Order Date";
  div9.appendChild(h3);

  var odt = order.orderDate;
  var oOrderdate = new Date(odt.seconds * 1000);
  var orderDate = oOrderdate.toLocaleDateString("en-US", options);

  var small2 = document.createElement("small");
  small2.innerHTML = orderDate;
  div9.appendChild(small2);

  div7.appendChild(div9);

  div6.appendChild(div7);

  var br1 = document.createElement("br");
  div6.appendChild(br1);

  var div10 = document.createElement("div");
  div10.setAttribute("class", "dashboard-card-order");

  var div11 = document.createElement("div");
  div11.setAttribute("class", "");

  var h4 = document.createElement("h5");
  h4.setAttribute("class", "small-text");
  h4.setAttribute("style", "margin: 0 auto;");
  h4.innerHTML = "Total Amount";
  div11.appendChild(h4);

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var displayAmt = Number(order.totalAmount).toLocaleString('en-IN', curFormat);
  var small3 = document.createElement("small");
  small3.innerHTML = displayAmt;
  div11.appendChild(small3);

  div10.appendChild(div11);

  var div12 = document.createElement("div");
  div12.setAttribute("class", "");

  var h5 = document.createElement("h5");
  h5.setAttribute("class", "small-text");
  h5.setAttribute("style", "margin: 0 auto;");
  h5.innerHTML = "Payable  Amount";
  div12.appendChild(h5);

  var displayDiscountAmt = order.discountedprize.toLocaleString('en-IN', curFormat);
  //console.log(displayDiscountAmt);
  var discount = order.discountDetails.coupondID;

  var small4 = document.createElement("small");
  if (order.discountDetails.coupondID === "none" || order.discountDetails.discountValue === "none") {
    small4.innerHTML = "No Discount";
  } else {
    //  small4.innerHTML = displayDiscountAmt + "(Off " + order.discountDetails.discountValue + ")";
    small4.innerHTML = "<span style='font-size: 1.2rem;color: #1D741B;'>" + displayDiscountAmt + " </span> (Off " + order.discountDetails.discountValue + ")";

  }
  div12.appendChild(small4);

  div10.appendChild(div12);
  div6.appendChild(div10);
  var br2 = document.createElement("br");
  div6.appendChild(br2);

  ///to be updated only in Admin module - Start

  var div13 = document.createElement("div");
  div13.setAttribute("class", "dashboard-card-order");

  var div14 = document.createElement("div");
  div14.setAttribute("class", "");

  var br4 = document.createElement("br");
  div14.appendChild(br4);

  var h5 = document.createElement("h5");
  h5.setAttribute("class", "small-text");
  h5.setAttribute("style", "margin: 0 auto;");
  h5.innerHTML = "Order By";
  div14.appendChild(h5);
  //console.log(order);
  var small4 = document.createElement("small");
  small4.innerHTML = order.orderByUserName + " : " + order.CreatedBy;
  div14.appendChild(small4);

  div13.appendChild(div14);

  var div15 = document.createElement("div");
  div15.setAttribute("class", "");

  div13.appendChild(div15);
  div6.appendChild(div13);
  var br3 = document.createElement("br");
  div6.appendChild(br2);

  ///to be updated only in Admin module - End


  var dDate = new Date(order.deliveryDate.seconds * 1000);

  const tempDate = new Date();
  tempDate.setDate(tempDate.getDate() + 2);

  var flag = false;
  //order can be cancelled only if order status is Pending and delivery Date is > todays date
  if (order.orderStatus === 'Pending' && dDate >= tempDate) {
    flag = true;
  } else {
    flag = false;
  }

  var div16 = document.createElement("div");
  div16.setAttribute("class", "");
  div16.setAttribute("style", "display:flex;align-items:center;justify-content: space-between;padding-top: 10px;");

  var anchor1 = document.createElement("a");
  anchor1.setAttribute("href", "#trend");

  var button1 = document.createElement("button");
  button1.setAttribute("class", "mybutton buttonTransparent");
  button1.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
  button1.innerHTML = "Delete";

  var span11 = document.createElement("span");
  span11.setAttribute("class", "material-icons-outlined");
  span11.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span11.innerHTML = "delete_forever";
  button1.appendChild(span11);
  anchor1.appendChild(button1);
  if (flag === true)
    div16.appendChild(anchor1);

  var anchor2 = document.createElement("a");
  anchor2.setAttribute("href", "orderDetails.html?id=" + orderid + "&userID=" + order.orderBy);
  //anchor.setAttribute("href", "orderSummary.html?id=" + orderid);

  var button2 = document.createElement("button");
  button2.setAttribute("class", "mybutton buttonTransparent");
  button2.setAttribute("style", "padding-bottom: 7px;margin: auto 10px;");
  button2.innerHTML = "Edit";

  var span12 = document.createElement("span");
  span12.setAttribute("class", "material-icons-outlined");
  span12.setAttribute("style", "position: relative;top: 5px;font-size: 1.2rem;padding-left: 5px;");
  span12.innerHTML = "edit";
  button2.appendChild(span12);
  anchor2.appendChild(button2);
  div16.appendChild(anchor2);
  div6.appendChild(div16);


  var hr11 = document.createElement("hr");
  div6.appendChild(hr11);

  //Added elements progress- start
  const snapshot = db.collection('OrderTracking').doc(orderid);
  var changeTrack = [];
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      changeTrack = doc.data().ChangeTrack;

      var div17 = document.createElement("div");
      div17.setAttribute("class", "progress-bar-div");

      var pendingorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 1);
      var packedorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 3);
      var onTheWayorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 4);
      var deliveredorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 5);
      var cancelledorderTrackIndex = changeTrack.findIndex(e => e.OrderStage === 6);

      if (packedorderTrackIndex === -1 && onTheWayorderTrackIndex >= 0)
        packedorderTrackIndex = onTheWayorderTrackIndex;
      else if (packedorderTrackIndex === -1 && deliveredorderTrackIndex >= 0)
        packedorderTrackIndex = deliveredorderTrackIndex;

      if (onTheWayorderTrackIndex === -1 && deliveredorderTrackIndex >= 0) {
        onTheWayorderTrackIndex = deliveredorderTrackIndex;
      }

      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      //          var displayDate = fromDate.toLocaleDateString("en-US", options);

      var div18 = document.createElement("div");
      if (pendingorderTrackIndex >= 0) {
        div18.setAttribute("class", "active");
      } else {
        div18.setAttribute("class", "");
      }

      var h55 = document.createElement("h5");
      h55.innerHTML = "Pending";
      div18.appendChild(h55);

      var div19 = document.createElement("div");
      div19.setAttribute("class", "step");
      div18.appendChild(div19);

      var small51 = document.createElement("small");
      var timedisplay = "";
      if (pendingorderTrackIndex >= 0) {
        pendingDate = new Date(changeTrack[pendingorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = pendingDate.toLocaleTimeString('en-US');

        var pendingDatedisplay = pendingDate.toLocaleDateString("en-US", options);
        small51.innerHTML = pendingDatedisplay;
      }
      div18.appendChild(small51);

      var br551 = document.createElement("br");
      div18.appendChild(br551);

      var small52 = document.createElement("small");
      small52.setAttribute("class", "time");
      if (pendingorderTrackIndex >= 0) {
        small52.innerHTML = timedisplay; // "Time";
      } else {
        small52.innerHTML = "-"
      }
      div18.appendChild(small52);

      div17.appendChild(div18);

      var div20 = document.createElement("div");
      if (packedorderTrackIndex >= 0) {
        div20.setAttribute("class", "active");
      } else if (cancelledorderTrackIndex >= 0) {
        div20.setAttribute("class", "cancelled");
      } else {
        div20.setAttribute("class", "");
      }

      var h56 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h56.innerHTML = "Cancelled";
      } else {
        h56.innerHTML = "Packed";
      }

      div20.appendChild(h56);

      var div21 = document.createElement("div");
      div21.setAttribute("class", "step center");
      div20.appendChild(div21);

      var div22 = document.createElement("div");
      div22.setAttribute("class", "line");
      div20.appendChild(div22);

      var small52 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        var cancelDate = new Date(changeTrack[cancelledorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = cancelDate.toLocaleTimeString('en-US');
        cancelDate = cancelDate.toLocaleDateString("en-US", options);
        small52.innerHTML = cancelDate;
      } else if (packedorderTrackIndex >= 0) {
        var packedDate = new Date(changeTrack[packedorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = packedDate.toLocaleTimeString('en-US');
        packedDate = packedDate.toLocaleDateString("en-US", options);
        small52.innerHTML = packedDate;
      } else {
        small52.innerHTML = "-";
        timedisplay = "-";
      }

      div20.appendChild(small52);

      var br552 = document.createElement("br");
      div20.appendChild(br552);

      var small53 = document.createElement("small");
      small53.setAttribute("class", "time");
      small53.innerHTML = timedisplay; //"Time";
      div20.appendChild(small53);

      div17.appendChild(div20);

      var div23 = document.createElement("div");
      if (cancelledorderTrackIndex >= 0) {
        div23.setAttribute("class", "");
      } else if (onTheWayorderTrackIndex >= 0) {
        div23.setAttribute("class", "active");
      } else {
        div23.setAttribute("class", "");
      }

      var h57 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h57.innerHTML = "-";
      } else {
        h57.innerHTML = "On The Way";
      }
      div23.appendChild(h57);

      var div24 = document.createElement("div");
      div24.setAttribute("class", "step center");
      div23.appendChild(div24);

      var div25 = document.createElement("div");
      div25.setAttribute("class", "line center");
      div23.appendChild(div25);

      var small53 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        timedisplay = "-";
        small53.innerHTML = "-";
      } else if (onTheWayorderTrackIndex >= 0) {
        var onTheWayDate = new Date(changeTrack[onTheWayorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = onTheWayDate.toLocaleTimeString('en-US');
        onTheWayDate = onTheWayDate.toLocaleDateString("en-US", options);
        small53.innerHTML = onTheWayDate;
      } else {
        small53.innerHTML = "-";
        timedisplay = "-";
      }

      div23.appendChild(small53);

      var br553 = document.createElement("br");
      div23.appendChild(br553);

      var small54 = document.createElement("small");
      small54.setAttribute("class", "time");
      small54.innerHTML = timedisplay; //"Time";
      div23.appendChild(small54);

      div17.appendChild(div23);

      var div26 = document.createElement("div");
      if (cancelledorderTrackIndex >= 0) {
        div26.setAttribute("class", "");
      } else if (deliveredorderTrackIndex >= 0) {
        div26.setAttribute("class", "active");
      } else {
        div26.setAttribute("class", "");
      }

      var h58 = document.createElement("h5");
      if (cancelledorderTrackIndex >= 0) {
        h58.innerHTML = "-";
      } else {
        h58.innerHTML = "Delivered";
      }
      div26.appendChild(h58);

      var div27 = document.createElement("div");
      div27.setAttribute("class", "step right");
      div26.appendChild(div27);

      var div28 = document.createElement("div");
      div28.setAttribute("class", "line right");
      div26.appendChild(div28);

      var small56 = document.createElement("small");
      timedisplay = "";
      if (cancelledorderTrackIndex >= 0) {
        timedisplay = "-";
        small56.innerHTML = "-";
      } else if (deliveredorderTrackIndex >= 0) {
        var delievredDate = new Date(changeTrack[deliveredorderTrackIndex].ChangedTimeStamp.seconds * 1000);
        timedisplay = delievredDate.toLocaleTimeString('en-US');
        delievredDate = delievredDate.toLocaleDateString("en-US", options);
        small56.innerHTML = delievredDate;
      } else {
        small56.innerHTML = "-";
        timedisplay = "-";
      }
      div26.appendChild(small56);

      var br554 = document.createElement("br");
      div26.appendChild(br554);

      var small55 = document.createElement("small");
      small55.setAttribute("class", "time");
      small55.innerHTML = timedisplay; //"Time";
      div26.appendChild(small55);

      div17.appendChild(div26);
      div6.appendChild(div17);

    }
  });

  //Added elements progress- End


  div1.appendChild(div6);
  document.getElementById("orderListDiv").appendChild(div1);
}

$('#anchorAll').click(function() {

  $('.Pending').show("slide");
  $('.Delivered').show("slide");
  $('.Cancelled').show("slide");
  // $('.Fruit').show("slide");
});
$('#anchorPending').click(function() {
  hideall();
  $('.Pending').show("fadeUp");
});
$('#anchorDelivered').click(function() {
  hideall();
  $('.Delivered').show("slide");
});

$('#anchorCancelled').click(function() {
  hideall();
  $('.Cancelled').show("slide");
});
// $('#anchorPearl').click(function() {
//   hideall();
//   $('.Pearl').show("slide");
// });
// $('#anchorFruit').click(function() {
//   hideall();
//   $('.Fruit').show("slide");
// });

function hideall() {
  $('.Pending').hide();
  $('.Delivered').hide();
  $('.Cancelled').hide();
  // $('.Fruit').hide();
};

//}

function populateOrderFilter() {
  var orderFilter = document.getElementById('orderFilter');

  // orderFilter.style.opacity = '1';
  orderFilter.style.pointerEvents = 'all';
  orderFilter.style.height = '100vh';
}

function closeOrderFilter() {
  var orderFilter = document.getElementById('orderFilter');

  // orderFilter.style.opacity = '0';
  orderFilter.style.pointerEvents = 'none';
  orderFilter.style.height = '0';
}

function showHideCard(card, cardArrow) {
  card.classList.toggle("active");

  cardArrow.classList.toggle("active");
}
