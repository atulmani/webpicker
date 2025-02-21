//const productID = document.getElementById('productID');
var userID = "";
var userName = "";
var OrderItems = [];
auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      console.log(userID);
      GetProfileData(firebaseUser);
      UpdateDeliveryDate();
      GetDeliveryAddress();
      createOrderItems();
      GetCouponDetails();
      //getCartSummary();
      //      populateAddress(addressID);

    } else {
      console.log('User has been logged out');
      // const functions = require("firebase-functions");
      // functions.logger.log("Hello from info. Here's an object:", someObj);
      window.location.href = "index.html";

    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
});

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then(async (doc) => {
      if (doc.exists) {
        //console.log('Document ref id: ' + doc.data().uid);
        userID = user.uid;
        userName = doc.data().displayName;
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('navUser').src = doc.data().ProfileImageURL;
        }
        //  document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        document.getElementById('displayName').innerHTML = doc.data().displayName;
        document.getElementById('EmailID').value = doc.data().EmailID;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
    });
};

function GetCouponDetails() {
  //get coupon details
  //  var couponList = [];
  var userList = [];
  var couponDetails = document.getElementById("couponDetails");
  DBrows = db.collection("Coupons").where("Status", "==", 'Active').get();
  var flag = false;
  DBrows.then((changes) => {

    changes.forEach(change => {
      userList = change.data().UserList;
      console.log(userList);
      if (userList[0].userID === 'All') {
        flag = true;
        var opt = document.createElement('option');
        opt.value = change.id;
        if (change.data().DiscountType === 'Percentage')
          opt.innerHTML = change.data().DiscountValue + " %";
        else
          opt.innerHTML = "₹ " + change.data().DiscountValue;
        couponDetails.appendChild(opt);
      }
      var index = userList.findIndex(e => e.userID === userID);
      if (index >= 0) {
        flag = true;
        var opt = document.createElement('option');
        opt.value = change.id;
        if (change.data().DiscountType === 'Percentage')
          opt.innerHTML = change.data().DiscountValue + " %";
        else
          opt.innerHTML = "₹ " + change.data().DiscountValue;
        couponDetails.appendChild(opt);
      }
    });
    if (flag === false) {
      couponDetails.style.display = "none";
    } else {
      document.getElementById('nocoupons').style.display = 'none';
    }
  });
  //console.log(couponList);
}

function applyCoupon() {
  console.log("in applyCoupon");
  var originalAmount = document.getElementById('hftotalAmount').value;
  console.log(originalAmount);
  var discountedAmount = 0;
  var discount = document.getElementById('couponDetails');
  if (discount.selectedIndex > 0) {
    var discountText = discount.options[discount.selectedIndex].text;
    console.log(discountText);
    if (discountText.search("%") >= 0) //if percentage
    {
      var discountPercentage = discountText.replace(" %", "").trim();
      console.log(discountPercentage, originalAmount);
      discountedAmount = Number(originalAmount) - (Number(originalAmount) * Number(discountPercentage.trim())) / 100;
    } else //absolute discount
    {
      var discountAbsolute = discountText.replace("₹ ", "").trim();
      discountedAmount = (Number(originalAmount) - Number(discountAbsolute));
    }

    document.getElementById("hfdiscountedAmount").value = discountedAmount;
    document.getElementById("totalAmount").innerHTML = "<span style='text-decoration:line-through;'>" + originalAmount + "</span>" + "    " + discountedAmount;
  }

}

function UpdateDeliveryDate() {
  const tempDate = new Date();
  console.log(tempDate.toLocaleDateString());

  var delDate = document.getElementById('DeliveryDate');
  console.log(delDate);
  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[0].text = tempDate.toLocaleDateString();
  delDate.options[0].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[1].text = tempDate.toLocaleDateString();
  delDate.options[1].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[2].text = tempDate.toLocaleDateString();
  delDate.options[2].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[3].text = tempDate.toLocaleDateString();
  delDate.options[3].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[4].text = tempDate.toLocaleDateString();
  delDate.options[4].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[5].text = tempDate.toLocaleDateString();
  delDate.options[5].value = tempDate.toLocaleDateString();

  tempDate.setDate(tempDate.getDate() + 1);
  delDate.options[6].text = tempDate.toLocaleDateString();
  delDate.options[6].value = tempDate.toLocaleDateString();

}

function GetDeliveryAddress() {
  var addressList = [];
  const snapshot = db.collection('AddressList').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      // console.log('Document id:' + doc.id);
      console.log(doc.data());
      addressList = doc.data().AddressList;

      selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
      if (selIndex >= 0) {

        document.getElementById("branchID").value = addressList[selIndex].branchID;
        document.getElementById("branch").innerHTML = addressList[selIndex].branchName;
        console.log(addressList[selIndex].addressLine1);
        console.log(addressList[selIndex].addressLine2);
        console.log(addressList[selIndex].city);
        console.log(addressList[selIndex].ZipCode);
        console.log(addressList[selIndex].PhoneNumber);

        document.getElementById("address").innerHTML = addressList[selIndex].addressLine1 + ", " +
          addressList[selIndex].addressLine2 + ", " +
          addressList[selIndex].city + " - " +
          addressList[selIndex].ZipCode + "(ph : " + addressList[selIndex].PhoneNumber + ")";
      }
    }
  });

}
var cartDetails = [];
var addressList = [];
var selectedAddress;
var orderDetails = [];
var message = "";
var iError = 0;

//function getCartDetails() {
function SaveOrder() {
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {
      //console.log('get cart details');
      cartDetails = doc.data().cartDetails;
      if (cartDetails.length === 0) {
        message = "cart is empty, add to cart";
        iError = 1;
        console.log("cart is empty, add to cart");
      }
      else
      {
        //Get Address Start
        const snapshotAddress = db.collection('AddressList').doc(userID);
        snapshotAddress.get().then(async (adoc) => {
          if (adoc.exists) {
            console.log('if address exists');
            addressList = adoc.data().AddressList;
            var selIndex = -1;
            selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
            if (selIndex >= 0) {
              selectedAddress = addressList[selIndex];
              console.log('if address selected');
                SaveOrderinDB();
            } else {
              message = message + "Select Address";
              iError = 2;
            }
          } else {
            message = message + "Add Address";
            iError = 3;
            console.log("Add Address");
          }
        });

        //get address end
      }
    }
  });
  console.log(message);
  return message;
}
//
// function getAddress() {
//   const snapshotAddress = db.collection('AddressList').doc(userID);
//   console.log('in getAddress');
//   snapshotAddress.get().then(async (adoc) => {
//     if (adoc.exists) {
//       console.log('if address exists');
//       addressList = adoc.data().AddressList;
//       var selIndex = -1;
//       selIndex = addressList.findIndex(e => e.addressSelected === 'YES');
//       if (selIndex >= 0) {
//         selectedAddress = addressList[selIndex];
//         console.log('if address selected');
//
//       } else {
//         message = message + "Select Address";
//         iError = 2;
//       }
//     } else {
//       message = message + "Add Address";
//       iError = 3;
//
//       console.log("Add Address");
//     }
//   });
//   console.log(message);
//   return message;
//
// }

function SaveOrderinDB() {

  var orderDetails = [];
  var message = "";
  var iError = 0;
  console.log('SaveOrder');
  //getCartDetails();

  //getAddress();
  var deliveryDate = '';
  var delDateObj = document.getElementById("DeliveryDate");
  deliveryDate = delDateObj.options[delDateObj.selectedIndex].value;
  console.log(deliveryDate);

  var deliveryTime = '';
  var delTimeObj = document.getElementById("DeliveryTime");
  deliveryTime = delTimeObj.options[delTimeObj.selectedIndex].value;

  var paymentOption = "";
  if (document.getElementById("PayOption1").checked) {
    paymentOption = document.getElementById("PayOption1").value;
  } else if (document.getElementById("PayOption2").checked) {
    paymentOption = document.getElementById("PayOption2").value;
  } else if (document.getElementById("PayOption3").checked) {
    paymentOption = document.getElementById("PayOption3").value;
  }

  var prize = document.getElementById("hftotalAmount").value;
  var discountedprize = document.getElementById("hfdiscountedAmount").value;
  var itemCount = document.getElementById("itemCount").innerHTML;
  var discount = {
    coupondID: couponDetails.options[couponDetails.selectedIndex].value,
    discountValue: couponDetails.options[couponDetails.selectedIndex].text

  };

  var orderChanges = [];
  orderChanges.push({
    OrderStage: 1,
    OrderStatus: 'Order Placed',
    PaymentStatus: 'Pending',
    DeliverySlot: deliveryTime,
    DeliveryDate: deliveryDate,
    ChangedTimeStamp: new Date()
  });

  orderChanges.push({
    OrderStage: 2,
    OrderStatus: 'Pending',
    PaymentStatus: 'Pending',
    DeliverySlot: deliveryTime,
    DeliveryDate: deliveryDate,
    ChangedTimeStamp: new Date()
  });

  console.log(orderChanges);

  console.log(userID);
  console.log(cartDetails.length);
  console.log(selectedAddress);
  if (cartDetails.length > 0 && selectedAddress != null) {
    console.log('insert order');

    db.collection('OrderDetails')
      .add({
        orderItems: OrderItems, //cartDetails,
        totalItems: itemCount,
        totalAmount: prize,
        deliveryAddress: selectedAddress,
        deliveryDate: firebase.firestore.Timestamp.fromDate(new Date(Date.parse(deliveryDate))), //deliveryDate,
        deliveryTime: deliveryTime,
        paymentOption: paymentOption,
        discountedprize: discountedprize,
        discountDetails: discount,
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        orderDate: firebase.firestore.Timestamp.fromDate(new Date()),
        orderBy: userID,
        orderByUserName: userName,
        //OrderDetails: orderDetails,
        CreatedBy: auth.currentUser.email,
        CreatedTimestamp: (new Date()).toString(),
        UpdatedBy: '',
        UpdatedTimestamp: ''
      })

      .then(function(docRef) {
        console.log("Data added sucessfully in the document: " + docRef.id);
        orderID = docRef.id;
        cartDetails = [];

        db.collection('OrderTracking')
          .doc(docRef.id)
          .set({
            OrderID: orderID,
            ChangeTrack: orderChanges,
            UpdatedTimestamp: new Date(),
            UpdatedByUser: userID,
            UserID: userID
          })
          .then(function(docRef) {
            console.log("Data added sucessfully in the document: " + userID);
            //    window.location.href = "orderStatus.html"
            // console.log(Date.parse(eventstart))
          })
          .catch(function(error) {
            console.error("error updatign order:", error);
          });


        db.collection('CartDetails')
          .doc(userID)
          .update({
            cartDetails: cartDetails
          })
          .then(function(docred) {
            console.log('cart details made blank');
            window.location.href = "orderSummary.html?id=" + orderID;
          });
        // console.log(Date.parse(eventstart))
      })
      .catch(function(error) {
        console.log(error);
        //  console.error("error adding document:", error.message);
      });


  }

  console.log("after save");
  //window.location.href = "orderList.html";

}


function getCartSummary() {
  var arr = [];
  var prise = 0;

  console.log(userID);
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {

      //  console.log(doc.id);
      cartItems = doc.data().cartDetails;


      console.log(cartItems);
      for (var i = 0; i < cartItems.length; i++) {
        arr.push(cartItems[i].ProductID);
      }
      var parr = [];
      console.log(arr);
      if (arr != null && arr.length > 0) {
        db.collection('Products').where("__name__", 'in', arr)
          .get()
          .then((psnapshot) => {
            psnapshot.forEach((doc) => {
              parr.push({
                ProductID: doc.id,
                ProductDetails: doc.data().ProductDetails
              });
            });
            for (i = 0; i < cartItems.length; i++) {
              var qty = cartItems[i].Quantity;
              var selectedsubItem = cartItems[i].SelectedsubItem;
              var weight = selectedsubItem.split('-');
              var selectedProduct = parr[parr.findIndex(e => e.ProductID === cartItems[i].ProductID)];
              if (selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
                var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
                prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
              }
            }
            var len = cartItems.length;
            document.getElementById('itemCount').innerHTML = len;
            document.getElementById('totalAmount').innerHTML = prise;
            document.getElementById('hftotalAmount').value = prise;
            console.log("in set");
            document.getElementById('hfdiscountedAmount').value = prise;
            document.getElementById('CartitemCount').innerHTML = len;
          });
      } else {
        console.log('in else');
        document.getElementById('itemCount').innerHTML = '0';
        document.getElementById('totalAmount').innerHTML = '0';
        document.getElementById('CartitemCount').innerHTML = '0';
        document.getElementById('hftotalAmount').value = '0';
        document.getElementById('hfdiscountedAmount').value = '0';

        document.getElementById('btnProceedToPay').disabled = true;
      }
    }

  });
}



function createOrderItems() {
  var arr = [];
  var prise = 0;

  console.log(userID);
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then(async (doc) => {
    if (doc.exists) {

      //  console.log(doc.id);
      cartItems = doc.data().cartDetails;


      console.log(cartItems);
      for (var i = 0; i < cartItems.length; i++) {
        arr.push(cartItems[i].ProductID);
      }
      var parr = [];
      console.log(arr);
      if (arr != null && arr.length > 0) {
        db.collection('Products').where("__name__", 'in', arr)
          .get()
          .then((psnapshot) => {
            psnapshot.forEach((doc) => {
              console.log(doc.data().ProductImageURL);
              parr.push({
                ProductID: doc.id,
                ProductDetails: doc.data().ProductDetails,
                productImageURL: doc.data().ProductImageURL,
                VegNonVeg: doc.data().VegNonVeg
              });
            });
            for (i = 0; i < cartItems.length; i++) {


              var qty = cartItems[i].Quantity;
              var selectedsubItem = cartItems[i].SelectedsubItem;
              var weight = selectedsubItem.split('-');
              var selectedProduct = parr[parr.findIndex(e => e.ProductID === cartItems[i].ProductID)];
              var unitPrise = 0;
              var MRP = 0;
              var sellPrize = 0;
              if (selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
                var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
                prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
                MRP = unitPrise.ProductMRP;
                sellPrize = unitPrise.ProductFinalPrise;
              }
              console.log(selectedProduct);
              OrderItems.push({
                ProductID: cartItems[i].ProductID,
                ProductName: cartItems[i].ItemName,
                SelectedSubItem: cartItems[i].SelectedsubItem,
                ImageURL: selectedProduct.productImageURL,
                VegNonVeg: selectedProduct.VegNonVeg,
                UnitPrise: sellPrize,
                MRP: MRP,
                Quantity: cartItems[i].Quantity
              });
            }

            console.log(OrderItems);
            var len = cartItems.length;
            document.getElementById('itemCount').innerHTML = len;
            document.getElementById('totalAmount').innerHTML = prise;
            document.getElementById('hftotalAmount').value = prise;

            document.getElementById('CartitemCount').innerHTML = len;
          });
      } else {
        console.log('in else');
        document.getElementById('itemCount').innerHTML = '0';
        document.getElementById('totalAmount').innerHTML = '0';
        document.getElementById('hftotalAmount').value = '0';
        document.getElementById('CartitemCount').innerHTML = '0';
        document.getElementById('btnProceedToPay').disabled = true;
      }
    }

  });
}
