//const productID = document.getElementById('productID');
var userID = "";
var cartItems = [];
var cartLength = 0;
var ArrProduct = [];
var unitPrise = 0;
var prise = 0;
var totalPrize = 0;
var index = 0;


auth.onAuthStateChanged(firebaseUser => {
  try {
    if (firebaseUser) {
      console.log('Logged-in user email id: ' + firebaseUser.email);
      userID = firebaseUser.uid;
      GetProfileData(firebaseUser);
      GetCartList();
      getAllProducts();
      // console.log(ArrProduct);
      // console.log(cartItems);
      // //populateCartData();
      //GetCartList();
      // getCartItemNo();
      //populateCartData();

      var siteNotification = localStorage.getItem("notificationCount");

      document.getElementById("notificationCnt").innerHTML = siteNotification;
      document.getElementById("notificationCnt1").innerHTML = siteNotification;


    } else {
      console.log('User has been logged out');
      window.location.href = "../login/index.html";
    }
  } catch (error) {
    console.log(error.message);
    //window.location.href = "../index.html";
  }
  // document.getElementById('loading-img').style.display = 'none';
});

function getAllProducts() {

  DBrows = db.collection("Products").get();

  DBrows.then((changes) => {
    changes.forEach(change => {
      var obj = {};

      obj.productID = change.id;
      obj.productDetails = change.data();

      ArrProduct.push(obj);
    });

    populateCartData();
  });

}

function GetProfileData(user) {
  // const ref = db.collection("Users").doc(user.uid);

  const snapshot = db.collection('UserList').doc(user.uid);
  snapshot.get().then((doc) => {
      if (doc.exists) {
        console.log('Document ref id: ' + doc.data().uid);
        userID = doc.data().uid;
        if (doc.data().ProfileImageURL != undefined && doc.data().ProfileImageURL != "") {
          document.getElementById('profilePic').src = doc.data().ProfileImageURL;
        }
        document.getElementById('profileName').innerHTML = doc.data().displayName;

        //        document.getElementById('headerProfilePic').src = doc.data().ImageURL;
        //        document.getElementById('displayName').innerHTML = doc.data().displayName;
      }
    })
    .catch(function(error) {
      // An error occurred
      console.log(error.message);
      // document.getElementById('errorMessage_Signup').innerHTML = error.message;
      // document.getElementById('errorMessage_Signup').style.display = 'block';
    });
};

function GetCartList() {
  console.log('GetCartList - Starts');

  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then((doc) => {
    if (doc.exists) {
      cartItems = doc.data().cartDetails;
      cartLength = cartItems.length;

      // console.log('Cart Length', cartLength);
      // console.log(cartItems.length);
      // console.log('GetCartList - Ends');

      //GetProductList();
      if (cartItems.length === 0) {
        document.getElementById("blankCartMessage").style.display = "block";
        document.getElementById("btnCheckOut").style.display = "none";
        document.getElementById('itemCount').innerHTML = 0 + ' Items';
        document.getElementById('totalAmount').innerHTML = '₹ 0';

      }

    }
  });
}

function populateCartData() {
  var index = 0;
  try {
    // console.log(cartItems.length);
    if (cartItems.length === 0) {
      document.getElementById('loading-img').style.display = 'none';
    } else {

      for (const item of cartItems) {
        var lProductID = item.ProductID;
        selectdedItem = item.SelectedsubItem;
        var j = ArrProduct.findIndex(e => e.productID === item.ProductID);
        //
        // console.log(ArrProduct[j].productDetails);
        // console.log(item);
        renderProduct(ArrProduct[j], index, item);
        index = index + 1;
        itemCount.innerHTML = (index) + " Items";
        document.getElementById("cartItemNo").innerHTML = index;

      }


      var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      };
      totalPrize = totalPrize.toLocaleString('en-IN', curFormat);
      // console.log("before write 1");
      document.getElementById("totalAmount").innerHTML = totalPrize;
      document.getElementById('loading-img').style.display = 'none';

    }


    // console.log('populateCartData - Ends');

  } catch (e) {
    //return false;
    console.log(e);
  } finally {

    //return true;
  }
  //getCartItemNo();

  //return true;

  // document.getElementById('loading').style.display = 'none';
}

//async function populateCartData() {
function populateCartData_old() {
  var index = 0;
  try {

    const cartItemsDB = db.collection("CartDetails").doc(userID);
    cartItemsDB.get().then((doc1) => {
      if (doc1.exists) {
        // console.log('populateCartData - Starts');

        var cartItems = doc1.data().cartDetails;
        for (const item of cartItems) {
          var lProductID = item.ProductID;
          selectdedItem = item.SelectedsubItem;
          const psnapshot = db.collection('Products').doc(lProductID);
          psnapshot.get().then((doc) => {
            if (doc.exists) {

              renderProduct(doc, index, item);
              index = index + 1;
              itemCount.innerHTML = (index) + " Items";
            }
            document.getElementById('loading-img').style.display = 'none';
          });
        }
        if (cartItems.length === 0) {
          document.getElementById('loading-img').style.display = 'none';
        }
      } else {
        document.getElementById('loading-img').style.display = 'none';
      }

      // console.log('populateCartData - Ends');
    });
  } catch (e) {
    //return false;
    console.log(e);
  } finally {

    //return true;
  }
  //getCartItemNo();

  //return true;

  // document.getElementById('loading').style.display = 'none';
}



function GetProductList() {
  console.log("GetProductList - Cart Items", cartItems);
  var obj = {};
  for (j = 0; j < cartItems.length; j++) {
    const snapshot1 = db.collection('Products').doc(cartItems[j].ProductID);
    snapshot1.get().then((doc1) => {
      console.log('GetProductList - For loop - Starts');
      if (doc1.exists) {
        console.log('doc1:', doc1.id);
        obj.productID = doc1.id;
        obj.productDetails = doc1.data();
        //  selectedProduct
        console.log(obj);
        ArrProduct.push(obj);

        //var cartItemSelect ;
        console.log(doc1);
        console.log(j);
        console.log(cartItems[j]);
        // renderProduct(doc1, j , cartItems[j]);
        // if (selectedProduct.ProductDetails != undefined && selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
        //   var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
        //   prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
        // }
      }
      console.log('GetProductList - For loop Ends');
    });
  }
  console.log("GetProductList - Ends");
}


async function GetProductList_Old() {
  console.log('GetProductList - Starts');
  var obj = {};
  const snapshot = db.collection('CartDetails').doc(userID);
  snapshot.get().then((doc) => {
    if (doc.exists) {
      cartItems = doc.data().cartDetails;
      console.log(cartItems);
      console.log(cartItems.length);
      for (j = 0; j < cartItems.length; j++) {
        const snapshot1 = db.collection('Products').doc(cartItems[j].ProductID);
        snapshot1.get().then((doc1) => {
          console.log('GetProductList - For loop - Starts');
          if (doc1.exists) {
            console.log('doc1:', doc1);
            obj.productID = doc1.id;
            obj.productDetails = doc1.data();
            //  selectedProduct
            console.log(obj);
            ArrProduct.push(obj);

            // if (selectedProduct.ProductDetails != undefined && selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
            //   var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
            //   prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
            // }
          }
          console.log('GetProductList - For loop Ends');
        });
      }
    }
    console.log('GetProductList - Ends');
  });
}



function getCartItemNo() {
  console.log('in getCartItemNo');
  document.getElementById('itemCount').innerHTML = cartItems.length + ' Items';
  document.getElementById('cartItemNo').innerHTML = cartItems.length;
  prise = 0;
  // console.log(cartItems.length);
  for (i = 0; i < cartItems.length; i++) {
    var qty = cartItems[i].Quantity;
    var selectedsubItem = cartItems[i].SelectedsubItem;
    // var weight = selectedsubItem.split('-');
    var weight = selectedsubItem.split(' ');
    var index = ArrProduct.findIndex(e => e.productID === cartItems[i].ProductID);
    var selectedProduct = ArrProduct[index].productDetails;
    // console.log(selectedProduct.ProductDetails[0].ProductWeight.split(" "));
    // console.log(weight);
    // console.log(selectedProduct.ProductDetails.findIndex(e => e.ProductWeight.split(" ")[0] == weight[0].trim()));
    if (selectedProduct.ProductDetails != undefined && selectedProduct.ProductDetails.findIndex(e => e.ProductWeight.split(" ")[0] == weight[0].trim()) >= 0) {
      var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight.split(" ")[0] == weight[0].trim())]
      // console.log(unitPrise);
      // console.log(qty);
      prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
    }
  }

  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  prise = prise.toLocaleString('en-IN', curFormat);
  // console.log("before write 2");

  document.getElementById("totalAmount").innerHTML = prise;

}

function getCartItemNoDetails() {

    var curFormat = {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    };
  console.log('getCartItemNoDetails');
  var prise = 0;

  console.log(ArrProduct);
  console.log(cartItems.length);
  if (cartItems.length > 0) {
    console.log(cartItems.length);
    for (i = 0; i < cartItems.length; i++) {

      console.log(cartItems[i]);
      var qty = cartItems[i].Quantity;
      var selectedsubItem = cartItems[i].SelectedsubItem;
      var weight = selectedsubItem.split('-');
      console.log(cartItems[i].ProductID);

      console.log(ArrProduct);
      var index = ArrProduct.findIndex(e => e.productID === cartItems[i].ProductID);
      console.log(index);
      var selectedProduct = ArrProduct[index].productDetails;
      console.log(selectedProduct);
      if (selectedProduct.ProductDetails != undefined && selectedProduct.ProductDetails.findIndex(e => e.ProductWeight.split(" ")[0] == weight.split(" ")[0].trim()) >= 0) {
        var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight.split(" ")[0] == weight.split(" ")[0].trim())]
        prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
      }
    }


    cartItemNo.innerHTML = cartItems.length;
    document.getElementById('itemCount').innerHTML = cartItems.length + ' Items';
    //document.getElementById('cartItemNo').innerHTML = cartItems.length
    console.log("before write 3");

    document.getElementById('totalAmount').innerHTML = Number(prise).toLocaleString('en-IN', curFormat);


  } else {
    document.getElementById("blankCartMessage").style.display = "block";
    document.getElementById("btnCheckOut").style.display = "none";
    cartItemNo.innerHTML = 0;
    document.getElementById('itemCount').innerHTML = 0 + ' Items';

    document.getElementById('totalAmount').innerHTML = '₹ 0';

  }

}

// async function getCartItemNo2() {
//   //var arr = [];
//   var prise = 0;
//
//   const snapshot = db.collection('CartDetails').doc(userID);
//   snapshot.get().then(async (doc) => {
//     if (doc.exists) {
//       //  console.log(doc.id);
//       cartItems = doc.data().cartDetails;
//
//
//       for (var i = 0; i < cartItems.length; i++) {
//         arr.push(cartItems[i].ProductID);
//       }
//       var parr = [];
//       //const prodDetails = db.collection('Products').doc(item[i].ProductID);
//       if (arr != null && arr.length > 0) {
//         db.collection('Products').where("__name__", 'in', arr)
//           //const prodDetails = db.collection('Products').where ("__name__" , '==', 'O1RMEcLeeaHt9cXoAT33')
//           .get()
//           .then((psnapshot) => {
//             psnapshot.forEach((doc) => {
//               parr.push({
//                 ProductID: doc.id,
//                 ProductDetails: doc.data().ProductDetails
//               });
//             });
//             for (i = 0; i < cartItems.length; i++) {
//               var qty = cartItems[i].Quantity;
//               var selectedsubItem = cartItems[i].SelectedsubItem;
//               var weight = selectedsubItem.split('-');
//
//               var selectedProduct = parr[parr.findIndex(e => e.ProductID === cartItems[i].ProductID)];
//               if (selectedProduct.ProductDetails != undefined && selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim() >= 0)) {
//                 var unitPrise = selectedProduct.ProductDetails[selectedProduct.ProductDetails.findIndex(e => e.ProductWeight == weight[0].trim())]
//                 prise = Number(prise) + Number(qty) * Number(unitPrise.ProductFinalPrise);
//               }
//             }
//             cartItemNo.innerHTML = cartItems.length;
//             document.getElementById('itemCount').innerHTML = cartItems.length + ' Items';
//
//             document.getElementById('totalAmount').innerHTML = '₹ ' + prise;
//
//           });
//       } else {
//         document.getElementById("blankCartMessage").style.display = "block";
//         document.getElementById("btnCheckOut").style.display = "none";
//         cartItemNo.innerHTML = 0;
//         document.getElementById('itemCount').innerHTML = 0 + ' Items';
//
//         document.getElementById('totalAmount').innerHTML = '₹ 0';
//       }
//
//
//     } else {
//       document.getElementById("blankCartMessage").style.display = "block";
//       document.getElementById("btnCheckOut").style.display = "none";
//       cartItemNo.innerHTML = 0;
//       document.getElementById('itemCount').innerHTML = 0 + ' Items';
//
//       document.getElementById('totalAmount').innerHTML = '₹ 0';
//
//     }
//   });
// }


function renderProduct(doc, index, selecteditem) {
  //  console.log('Doc ID: ' + doc.id);
  //  console.log('Event Name: ' + doc.data().ProductName);
  //console.log(doc.productDetails.);
  //var productlist = doc.data().ProductDetails;
  var pProductWeightUnit = doc.productDetails.ProductWeightUnit;
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

  var productlist = doc.productDetails.ProductDetails;
  var mainReload = document.createElement("main");
  mainReload.setAttribute("id", "main" + index);
  mainReload.setAttribute("class", "row no-gutters");
  var div1 = document.createElement("div");
  div1.setAttribute("class", "col-sm-12");
  div1.setAttribute("style", "padding: 5px;");

  var div1_1 = document.createElement("div");
  div1_1.setAttribute("class", "product-list-div");

  var table1 = document.createElement("table");
  table1.setAttribute("width", "100%");

  var tr1 = document.createElement("tr");

  var td1 = document.createElement("td");
  td1.setAttribute("width", "45%");
  td1.setAttribute("class", "product-img-td");;
  var hfID = document.createElement("input");
  hfID.setAttribute("id", "hfID" + index);
  hfID.setAttribute("type", "hidden");
  hfID.setAttribute("value", doc.productID);
  td1.appendChild(hfID);
  var img1 = document.createElement("img");
  img1.setAttribute("src", doc.productDetails.ProductImageURL);
  img1.setAttribute("width", "100%")
  img1.setAttribute("alt", "");
  td1.appendChild(img1);

  var div1_2 = document.createElement("div");
  div1_2.setAttribute("class", "off-div");
  div1_2.innerHTML = "<small>" + "20% OFF" + "</small>";
  td1.appendChild(div1_2);

  tr1.appendChild(td1);

  var td2 = document.createElement("td");
  td2.setAttribute("width", "55%");
  td2.setAttribute("valign", "top")
  td2.setAttribute("class", "product-names-div");


    var div1_3 = document.createElement("div");
    div1_3.setAttribute("class", "veg-nonVeg-div");

    var imgVegNonVeg = document.createElement("img");

    if (doc.productDetails.VegNonVeg === "Veg")
      imgVegNonVeg.setAttribute("src", "../img/veg.png");
    else if (doc.productDetails.VegNonVeg === "NonVeg")
      imgVegNonVeg.setAttribute("src", "../img/non-veg.png");
    imgVegNonVeg.setAttribute("width", "100%");
    imgVegNonVeg.setAttribute("alt", "");

    div1_3.appendChild(imgVegNonVeg);
    td2.appendChild(div1_3);

    var s1 = document.createElement("small");
    s1.setAttribute("class", "product-names");
    s1.innerHTML = doc.productDetails.ProductName;

    td2.appendChild(s1);
    var b1 = document.createElement("br");
    td2.appendChild(b1);


    var s2 = document.createElement("small");
    s2.setAttribute("style", "font-size: 0.8rem; color: rgba(0,0,0,0.5);");
    s2.innerHTML = doc.productDetails.Brand;
    td2.appendChild(s2);
    var b2 = document.createElement("br");
    td2.appendChild(b2);


  // td2.innerHTML = "<small class='product-names' id='itemName'>" + doc.productDetails.ProductName + "</small><br>" +
  //   "<small style='font-size: 0.8rem; color: rgba(0,0,0,0.5);'>" + doc.productDetails.Brand + "</small><br>";

  // var selectP = document.createElement("select");
  // selectP.name = "productDetails";
  // selectP.id = "productDetails" + index;
  var MRP = "";
  var FinalPrize = "";
  // selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelect" + index + ")");
  var hfSelected = document.createElement("input");
  hfSelected.id = "hfSelect" + index;
  hfSelected.setAttribute("type", "hidden");

  var hfMRP = document.createElement("input");
  hfMRP.setAttribute("id", "hfMrp" + index);
  hfMRP.setAttribute("type", "hidden");

  var hfFinalPrize = document.createElement("input");
  hfFinalPrize.id = "hfFinalPrize" + index;
  hfFinalPrize.setAttribute("type", "hidden");
  //var
  for (const val of productlist) {
    var option = document.createElement("option");
    option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
    if(pProductWeightUnit != undefined)
    {
      option.text = val.ProductWeight.split(" ")[0] + " " + pProductWeightUnit +  " - " + "Rs." + val.ProductFinalPrise;
    }
    else {
      option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise
    }
    var productWeight = val.ProductWeight;
    productWeight = productWeight.split(" ");
    var selectedsubItem = selecteditem.SelectedsubItem;
    selectedsubItem = selectedsubItem.split(" ");
    if (selectedsubItem[0] === productWeight[0]) {
      option.selected = true;
      MRP = val.ProductMRP;
      FinalPrize = val.ProductFinalPrise;
      hfMRP.setAttribute("value", MRP);
      hfFinalPrize.setAttribute("value", FinalPrize);
      // console.log(option.text);
      hfSelected.setAttribute("value", option.text);

      //      totalPrize = Number(totalPrize) + Number(val.ProductFinalPrise) *
    }
    // selectP.appendChild(option);
  }

  var itemUnit = document.createElement("input");
  itemUnit.setAttribute("id", "unit" + index);
  itemUnit.setAttribute("readonly", "true");
  itemUnit.setAttribute("value", selecteditem.SelectedsubItem);
  td2.appendChild(itemUnit);

  totalPrize = Number(totalPrize) + Number(FinalPrize) * Number(selecteditem.Quantity);
  //totalAmount.innerHTML = "Rs. " + totalPrize;

  //selectP.addEventListener("change", addActivityItem, false);
  // td2.appendChild(selectP);
  td2.appendChild(hfSelected);
  FinalPrize = Number(FinalPrize) * Number(selecteditem.Quantity)
  MRP = Number(MRP) * Number(selecteditem.Quantity)

  var div1_4 = document.createElement("div");
  div1_4.setAttribute("id", "divPrise" + index);
  div1_4.setAttribute("class", "product-price");

  var FinalPrizeCur = Number(FinalPrize).toLocaleString('en-IN', curFormat);
  var MRPCur = Number(MRP).toLocaleString('en-IN', curFormat);
  div1_4.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + MRPCur + "</span>" + "</h5>" +
    "<small>" + "<span id='final" + index + "'>" + FinalPrizeCur + "</span></small><br><br><br>";

  //div1_4.appendChild(mrpspan);
  //div1_4.appendChild(finalspan);

  var table2 = document.createElement("table");
  table2.setAttribute("style", "width:100%;position:absolute;bottom:10px;right:10px;");

  var t2tr = document.createElement("tr");

  var t2trtd1 = document.createElement("td");
  t2trtd1.setAttribute("width", "30%");
  t2trtd1.setAttribute("valign", "bottom");
  var delete_outline = document.createElement("span");
  delete_outline.setAttribute("class", "material-icons");
  delete_outline.setAttribute("style", "cursor:pointer;");


  delete_outline.addEventListener('click', function(e) {
    deleteCartItem(e, selecteditem.SelectedsubItem, doc.productID, "main" + index)
  }, false);
  delete_outline.innerHTML = "delete_outline";
  t2trtd1.appendChild(delete_outline);

  var t2trtd2 = document.createElement("td");
  t2trtd2.setAttribute("width", "70%");
  t2trtd2.setAttribute("class", "quantity-td");
  t2trtd2.setAttribute("style", "position:relative;");
  var trdiv = document.createElement("div");
  trdiv.setAttribute("id", "quantityFullDiv" + index);
  trdiv.setAttribute("class", "quantity buttons_added");

  var trinput1 = document.createElement("input");
  trinput1.setAttribute("id", "minus" + index);
  trinput1.setAttribute("type", "button");
  trinput1.setAttribute("value", "-");
  trinput1.setAttribute("class", "minus");

  trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.productDetails.StepQty + ",'" + doc.productDetails.ProductName + "','" + doc.productID + "'," + "hfSelect" + index + "," + "hfMrp" + index + "," + "hfFinalPrize" + index + "," + "divPrise" + index + " )");

  //trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ","+doc.data().ProductName+","+selectP+" ,"+doc.id+" )");
  var trinput2 = document.createElement("input");
  trinput2.setAttribute("id", "qty" + index);
  trinput2.setAttribute("type", "number");
  trinput2.setAttribute("step", "1");
  trinput2.setAttribute("name", "quantity");

  //trinput2.setAttribute("value", doc.data().MinimumQty);
  trinput2.setAttribute("value", selecteditem.Quantity);
  trinput2.setAttribute("title", "Qty");
  trinput2.setAttribute("class", "input-text qty text");
  trinput2.setAttribute("size", "4");
  trinput2.setAttribute("pattern", "");
  trinput2.setAttribute("inputmode", "");
  //trinput2.setAttribute("onClick","updateQuantity("+"qty" + index + "," + doc.data().MinimumQty +","+doc.data().MaximumQty+ ",''" +doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + " )");
  trinput2.setAttribute("onchange", "updateQuantity(" + "qty" + index + "," + doc.productDetails.MinimumQty + "," + doc.productDetails.MaximumQty + ",'" + doc.productDetails.ProductName + "','" + doc.productID + "'," + "hfSelect" + index + "," + "hfMrp" + index + "," + "hfFinalPrize" + index + "," + "divPrise" + index + " )");

  var trinput3 = document.createElement("input");
  trinput3.setAttribute("id", "plus" + index);
  trinput3.setAttribute("type", "button");
  trinput3.setAttribute("value", "+");
  //trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "')");
  trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.productDetails.StepQty + ",'" + doc.productDetails.ProductName + "','" + doc.productID + "'," + "hfSelect" + index + "," + "hfMrp" + index + "," + "hfFinalPrize" + index + "," + "divPrise" + index + " )");

  trinput3.setAttribute("class", "plus");

  var trinput4 = document.createElement("input");
  trinput4.setAttribute("id", "step" + index);
  trinput4.setAttribute("type", "hidden");
  trinput4.setAttribute("value", doc.productDetails.StepQty);

  var trinput5 = document.createElement("input");
  trinput5.setAttribute("id", "min" + index);
  trinput5.setAttribute("type", "hidden");
  trinput5.setAttribute("value", doc.productDetails.MinimumQty);

  var trinput6 = document.createElement("input");
  trinput6.setAttribute("id", "max" + index);
  trinput6.setAttribute("type", "hidden");
  trinput6.setAttribute("value", doc.productDetails.MaximumQty);

  trdiv.appendChild(trinput1);
  trdiv.appendChild(trinput2);
  trdiv.appendChild(trinput3);
  trdiv.appendChild(trinput4);
  trdiv.appendChild(trinput5);
  trdiv.appendChild(trinput6);

  t2trtd2.appendChild(trdiv);
  t2tr.appendChild(t2trtd1);
  t2tr.appendChild(t2trtd2);
  table2.appendChild(t2tr);
  td2.appendChild(table2);
  td2.appendChild(hfMRP);
  td2.appendChild(hfFinalPrize);

  td2.appendChild(div1_4);
  tr1.appendChild(td2);
  table1.appendChild(tr1);
  div1_1.appendChild(table1);
  div1.appendChild(div1_1);
  mainReload.appendChild(div1);

  //document.getElementById("divCart").appendChild(div1);
  document.getElementById("divCart").appendChild(mainReload);

}

/////////////////////new function
// function renderProduct_old(doc, index, selecteditem) {
//   var curFormat = {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2
//   };
//
//   //  console.log('Doc ID: ' + doc.id);
//   //  console.log('Event Name: ' + doc.data().ProductName);
//
//   //var productlist = doc.data().ProductDetails;
//   var productlist = doc.productDetails;
//   var mainReload = document.createElement("main");
//   mainReload.setAttribute("id", "main" + index);
//   var div1 = document.createElement("div");
//   div1.setAttribute("class", "col-sm-12");
//   div1.setAttribute("style", "padding: 5px;");
//
//   var div1_1 = document.createElement("div");
//   div1_1.setAttribute("class", "product-list-div");
//
//   var table1 = document.createElement("table");
//   table1.setAttribute("width", "100%");
//
//   var tr1 = document.createElement("tr");
//
//   var td1 = document.createElement("td");
//   td1.setAttribute("width", "45%");
//   td1.setAttribute("class", "product-img-td");;
//   var hfID = document.createElement("input");
//   hfID.setAttribute("id", "hfID" + index);
//   hfID.setAttribute("type", "hidden");
//   hfID.setAttribute("value", doc.id);
//   td1.appendChild(hfID);
//   var img1 = document.createElement("img");
//   img1.setAttribute("src", doc.data().ProductImageURL);
//   img1.setAttribute("width", "100%")
//   img1.setAttribute("alt", "");
//   td1.appendChild(img1);
//
//   var div1_2 = document.createElement("div");
//   div1_2.setAttribute("class", "off-div");
//   div1_2.innerHTML = "<small>" + "20% OFF" + "</small>";
//   td1.appendChild(div1_2);
//
//   var div1_3 = document.createElement("div");
//   div1_3.setAttribute("class", "veg-nonVeg-div");
//
//   var imgVegNonVeg = document.createElement("img");
//
//   if (doc.data().VegNonVeg === "Veg")
//     imgVegNonVeg.setAttribute("src", "../img/veg.png");
//   else if (doc.data().VegNonVeg === "NonVeg")
//     imgVegNonVeg.setAttribute("src", "../img/non-veg.png");
//   imgVegNonVeg.setAttribute("width", "100%");
//   imgVegNonVeg.setAttribute("alt", "");
//
//   div1_3.appendChild(imgVegNonVeg);
//   td1.appendChild(div1_3);
//   tr1.appendChild(td1);
//
//   var td2 = document.createElement("td");
//   td2.setAttribute("width", "55%");
//   td2.setAttribute("valign", "top")
//   td2.setAttribute("class", "product-names-div");
//   td2.innerHTML = "<small class='product-names' id='itemName'>" + doc.data().ProductName + "</small><br>" +
//     "<small style='font-size: 0.8rem; color: rgba(0,0,0,0.5);'>" + doc.data().Brand + "</small><br>";
//
//   // var selectP = document.createElement("select");
//   // selectP.name = "productDetails";
//   // selectP.id = "productDetails" + index;
//   var MRP = "";
//   var FinalPrize = "";
//   // selectP.setAttribute("onchange", "mySelectionChange(" + "productDetails" + index + "," + "mrp" + index + "," + "final" + index + "," + "hfSelect" + index + ")");
//   var hfSelected = document.createElement("input");
//   hfSelected.id = "hfSelect" + index;
//   hfSelected.setAttribute("type", "hidden");
//
//   var hfMRP = document.createElement("input");
//   hfMRP.setAttribute("id", "hfMrp" + index);
//   hfMRP.setAttribute("type", "hidden");
//
//   var hfFinalPrize = document.createElement("input");
//   hfFinalPrize.id = "hfFinalPrize" + index;
//   hfFinalPrize.setAttribute("type", "hidden");
//
//   for (const val of productlist) {
//     var option = document.createElement("option");
//     option.value = val.ProductFinalPrise + ":" + val.ProductMRP;
//     option.text = val.ProductWeight + " - " + "Rs." + val.ProductFinalPrise;
//     if (selecteditem.SelectedsubItem === option.text) {
//       option.selected = true;
//       MRP = val.ProductMRP;
//       FinalPrize = val.ProductFinalPrise;
//       hfMRP.setAttribute("value", MRP);
//       hfFinalPrize.setAttribute("value", FinalPrize);
//
//       hfSelected.setAttribute("value", option.text);
//     }
//     // selectP.appendChild(option);
//   }
//
//   var itemUnit = document.createElement("input");
//   itemUnit.setAttribute("id", "unit" + index);
//   itemUnit.setAttribute("readonly", "true");
//   itemUnit.setAttribute("value", selecteditem.SelectedsubItem);
//   td2.appendChild(itemUnit);
//
//   totalPrize = Number(totalPrize) + Number(FinalPrize) * Number(selecteditem.Quantity);
//   //totalAmount.innerHTML = "Rs. " + totalPrize;
//
//   //selectP.addEventListener("change", addActivityItem, false);
//   // td2.appendChild(selectP);
//   td2.appendChild(hfSelected);
//   FinalPrize = Number(FinalPrize) * Number(selecteditem.Quantity)
//   MRP = Number(MRP) * Number(selecteditem.Quantity)
//
//   var div1_4 = document.createElement("div");
//   div1_4.setAttribute("id", "divPrise" + index);
//   div1_4.setAttribute("class", "product-price");
//
//   div1_4.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + Number(MRP).toLocaleString('en-IN', curFormat) + "</span>" + "</h5>" +
//     "<small>" + "<span id='final" + index + "'>" + Number(FinalPrize).toLocaleString('en-IN', curFormat) + "</span></small><br><br><br>";
//
//   //div1_4.appendChild(mrpspan);
//   //div1_4.appendChild(finalspan);
//
//   var table2 = document.createElement("table");
//   table2.setAttribute("style", "width:51%;position:absolute;bottom:10px;right:10px;");
//
//   var t2tr = document.createElement("tr");
//
//   var t2trtd1 = document.createElement("td");
//   t2trtd1.setAttribute("width", "30%");
//   var delete_outline = document.createElement("span");
//   delete_outline.setAttribute("class", "material-icons");
//   delete_outline.setAttribute("style", "cursor:pointer;");
//
//
//   delete_outline.addEventListener('click', function(e) {
//     deleteCartItem(e, selecteditem.SelectedsubItem, doc.id, "main" + index)
//   }, false);
//   delete_outline.innerHTML = "delete_outline";
//   t2trtd1.appendChild(delete_outline);
//
//   var t2trtd2 = document.createElement("td");
//   t2trtd2.setAttribute("width", "70%");
//   t2trtd2.setAttribute("class", "quantity-td");
//   var trdiv = document.createElement("div");
//   trdiv.setAttribute("id", "quantityFullDiv" + index);
//   trdiv.setAttribute("class", "quantity buttons_added");
//
//   var trinput1 = document.createElement("input");
//   trinput1.setAttribute("id", "minus" + index);
//   trinput1.setAttribute("type", "button");
//   trinput1.setAttribute("value", "-");
//   trinput1.setAttribute("class", "minus");
//
//   trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + "," + "hfMrp" + index + "," + "hfFinalPrize" + index + "," + "divPrise" + index + " )");
//
//   //trinput1.setAttribute("onclick", " decrementQty(" + "qty" + index + ", " + "min" + index + " ," + doc.data().StepQty + ","+doc.data().ProductName+","+selectP+" ,"+doc.id+" )");
//   var trinput2 = document.createElement("input");
//   trinput2.setAttribute("id", "qty" + index);
//   trinput2.setAttribute("type", "number");
//   trinput2.setAttribute("step", "1");
//   trinput2.setAttribute("name", "quantity");
//
//   //trinput2.setAttribute("value", doc.data().MinimumQty);
//   trinput2.setAttribute("value", selecteditem.Quantity);
//   trinput2.setAttribute("title", "Qty");
//   trinput2.setAttribute("class", "input-text qty text");
//   trinput2.setAttribute("size", "4");
//   trinput2.setAttribute("pattern", "");
//   trinput2.setAttribute("inputmode", "");
//   //trinput2.setAttribute("onClick","updateQuantity("+"qty" + index + "," + doc.data().MinimumQty +","+doc.data().MaximumQty+ ",''" +doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + " )");
//   trinput2.setAttribute("onchange", "updateQuantity(" + "qty" + index + "," + doc.data().MinimumQty + "," + doc.data().MaximumQty + ",'" + doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + "," + "hfMrp" + index + "," + "hfFinalPrize" + index + "," + "divPrise" + index + " )");
//
//   var trinput3 = document.createElement("input");
//   trinput3.setAttribute("id", "plus" + index);
//   trinput3.setAttribute("type", "button");
//   trinput3.setAttribute("value", "+");
//   //trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "','" + selectP[selectP.selectedIndex].text + "')");
//   trinput3.setAttribute("onclick", "incrementQty(" + "qty" + index + ", " + "max" + index + " ," + doc.data().StepQty + ",'" + doc.data().ProductName + "','" + doc.id + "'," + "hfSelect" + index + "," + "hfMrp" + index + "," + "hfFinalPrize" + index + "," + "divPrise" + index + " )");
//
//   trinput3.setAttribute("class", "plus");
//
//   var trinput4 = document.createElement("input");
//   trinput4.setAttribute("id", "step" + index);
//   trinput4.setAttribute("type", "hidden");
//   trinput4.setAttribute("value", doc.data().StepQty);
//
//   var trinput5 = document.createElement("input");
//   trinput5.setAttribute("id", "min" + index);
//   trinput5.setAttribute("type", "hidden");
//   trinput5.setAttribute("value", doc.data().MinimumQty);
//
//   var trinput6 = document.createElement("input");
//   trinput6.setAttribute("id", "max" + index);
//   trinput6.setAttribute("type", "hidden");
//   trinput6.setAttribute("value", doc.data().MaximumQty);
//
//   trdiv.appendChild(trinput1);
//   trdiv.appendChild(trinput2);
//   trdiv.appendChild(trinput3);
//   trdiv.appendChild(trinput4);
//   trdiv.appendChild(trinput5);
//   trdiv.appendChild(trinput6);
//
//   t2trtd2.appendChild(trdiv);
//   t2tr.appendChild(t2trtd1);
//   t2tr.appendChild(t2trtd2);
//   table2.appendChild(t2tr);
//   td2.appendChild(table2);
//   td2.appendChild(hfMRP);
//   td2.appendChild(hfFinalPrize);
//
//   td2.appendChild(div1_4);
//   tr1.appendChild(td2);
//   table1.appendChild(tr1);
//   div1_1.appendChild(table1);
//   div1.appendChild(div1_1);
//   mainReload.appendChild(div1);
//
//   //document.getElementById("divCart").appendChild(div1);
//   document.getElementById("divCart").appendChild(mainReload);
//
// }

function updateQuantity(oqty, iMin, iMax, itemName, productID, itemSizeObj, hfMRP, hfFinalPrize, divprise) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  console.log(itemSizeObj);
  var qty = Number(oqty.value);
  if (qty < iMin)
    qty = iMin;
  if (qty > iMax)
    qty = iMax;

  oqty.value = qty;
  var lmrp = 0;
  var lfinal = 0;

  lmrp = Number(qty) * Number(hfMRP.value);
  hfMRP.innerHTML = lmrp;

  lfinal = Number(qty) * Number(hfFinalPrize.value);
  hfFinalPrize.innerHTML = lfinal;

  divprise.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + Number(lmrp).toLocaleString('en-IN', curFormat) + "</span>" + "</h5>" +
    "<small>" + "<span id='final" + index + "'>" + Number(lfinal).toLocaleString('en-IN', curFormat) + "</span></small><br><br><br>";

  AddUpdateCart(itemName, itemSizeObj, Number(qty), productID, 'active');
  getCartItemNo();
}

function incrementQty(oqty, omax, step, itemName, productID, itemSizeObj, hfMRP, hfFinalPrize, divprise) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };

console.log(oqty);
console.log(omax);
console.log(step);
console.log(itemName);
console.log(productID);
console.log(itemSizeObj);
console.log(hfMRP);
console.log(hfFinalPrize);
console.log(divprise);

  var qty = Number(oqty.value);
  var max = Number(omax.value);

  if ((qty + step) <= max) {
    qty = Number(qty) + Number(step);
  } else {
    qty = max;
  }

  oqty.value = qty;
  console.log(qty);

  var lmrp = 0;
  var lfinal = 0;

  lmrp = Number(qty) * Number(hfMRP.value);
  hfMRP.innerHTML = lmrp;
  console.log(lmrp);
  lfinal = Number(qty) * Number(hfFinalPrize.value);
  hfFinalPrize.innerHTML = lfinal;
console.log(lfinal);
  divprise.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + Number(lmrp).toLocaleString('en-IN', curFormat) + "</span>" + "</h5>" +
    "<small>" + "<span id='final" + index + "'>" + Number(lfinal).toLocaleString('en-IN', curFormat) + "</span></small><br><br><br>";

  AddUpdateCart(itemName, itemSizeObj, qty, productID, 'active');
  getCartItemNo();
}

//function decrementQty(oqty, omin, step, itemName, itemSizeObj, productID) {
function decrementQty(oqty, omin, step, itemName, productID, itemSizeObj, hfMRP, hfFinalPrize, divprise) {
  var curFormat = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  };
  var qty = oqty.value;

  var min = omin.value;

  if ((qty - step) >= min) {
    qty = qty - step;
  } else {
    qty = min;
  }

  oqty.value = qty;

  var lmrp = 0;
  var lfinal = 0;

  lmrp = Number(qty) * Number(hfMRP.value);
  hfMRP.innerHTML = lmrp;

  lfinal = Number(qty) * Number(hfFinalPrize.value);
  hfFinalPrize.innerHTML = lfinal;

  divprise.innerHTML = "<h5>" + "<span id='mrp" + index + "' >" + Number(lmrp).toLocaleString('en-IN', curFormat) + "</span>" + "</h5>" +
    "<small> " + "<span id='final" + index + "'>" + Number(lfinal).toLocaleString('en-IN', curFormat) + "</span></small><br><br><br>";

  //var str = itemSizeObj[itemSizeObj.selectedIndex].text;
  AddUpdateCart(itemName, itemSizeObj, qty, productID, 'active');
  getCartItemNo();
}

function deleteCartItem(e, itemSizeObj, productID, deleteID) {

  e.preventDefault();

  //const snapshot = db.collection('CartDetails').doc(userID);
  //snapshot.get().then((doc) =>
  {
    item = cartItems;

    itemIndex = item.findIndex(a => a.ProductID === productID && a.SelectedsubItem.split(" ")[0] === itemSizeObj.split(" ")[0]);
    if (itemIndex >= 0) {
      item.splice(itemIndex, 1);
    }


    db.collection('CartDetails')
      .doc(userID)
      .update({
        cartDetails: item //firebase.firestore.FeildValue.arrayUnion(item)
      })
      .then(() => {
        itemdelete = document.getElementById(deleteID);
        getCartItemNo();
        itemdelete.remove();

        if (item.length === 0) {
          document.getElementById("blankCartMessage").style.display = "block";
          document.getElementById("btnCheckOut").style.display = "none";
          document.getElementById('itemCount').innerHTML = 0 + ' Items';
          document.getElementById('totalAmount').innerHTML = '₹ 0';

        }

        //itemdelete.load(location.href + itemdelete); //to relooad a page
        //var but = document.createElement("button");
        //but.setAttribute
        //$("#main").load(location.href + " #main"); to relooad a page
        //location.reload();
        // populateCartData();
        //getCartItemNo();
      })
      .catch(function(error) {
        console.log("in error");
        // document.getElementById('errorMessage').innerHTML = error.message;
        // document.getElementById('errorMessage').style.display = 'block';
      });

  }
  //});
}


function mySelectionChange(productdetails, mrp, final, hfselect) {
  //alert(productdetails);
  //alert(productdetails.selectedIndex);
  var str = productdetails[productdetails.selectedIndex].value;
  const myarr = str.split(":");
  //alert (myarr )
  mrp.innerHTML = myarr[1];
  final.innerHTML = myarr[0];
  //alert(mrp);
  hfselect.value = productdetails[productdetails.selectedIndex].text;
  //AddUpdateCart(productdetails[productdetails.selectedIndex])
}

function AddUpdateCart(itemName, itemSelect, itemQuantity, productID, itemQualityStatus) {

  console.log(itemSelect);
  var itemIndex = cartItems.findIndex(a => a.ProductID === productID && a.SelectedsubItem.split(" ")[0] === itemSelect.value.split(" ")[0]);

  if (itemIndex >= 0)
    cartItems.splice(itemIndex, 1);

  cartItems.push({
    ItemName: itemName,
    SelectedsubItem: itemSelect.value,
    Quantity: itemQuantity,
    ProductID: productID,
    Status: itemQualityStatus
  });

  db.collection('CartDetails')
    .doc(userID)
    .set({
      uid: userID,
      cartDetails: cartItems, //firebase.firestore.FeildValue.arrayUnion(item),
      CreatedTimestamp: '',
      UpdatedTimestamp: (new Date()).toString()
    })
    .then(function(docref) {
      // updated
      console.log('Users data saved successfully');
      getCartItemNo();
      // Show alert
      //document.querySelector('.alert').style.display = 'block';

    })
    .catch(function(error) {
      // An error occurred
      // console.log(error.message);
      console.log("in error");
      document.getElementById('errorMessage').innerHTML = error.message;
      document.getElementById('errorMessage').style.display = 'block';
    });


  //});
}





var removeByAttr = function(arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      (arguments.length > 2 && arr[i][attr] === value)) {

      arr.splice(i, 1);

    }
  }
  return arr;
}
