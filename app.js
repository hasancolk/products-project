const productId = document.getElementById('productId');
const productName = document.getElementById('productName');
const categoryName = document.getElementById('categoryName');
const brandName = document.getElementById('brandName');
const productPrice = document.getElementById('productPrice');
const _productId = document.getElementById('_productId');

const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');

const database = firebase.database();
const rootRef = database.ref('products');

let eklenenler = [];

function eklendiMi(dizi,sayi){
    for(let i=0;i<dizi.length;i++)
    {
        if(dizi[i]==sayi)
            return true;
    }

    return false;
}

rootRef.on('value', function (snapshot) {

    snapshot.forEach(function (childSnapshot) {

        var data = childSnapshot.val();

        var productId = data.product_id;
        var productName = data.product_name;
        var categoryName = data.category_name;
        var brandName = data.brand_name;
        var productPrice = data.product_price;

        if(eklendiMi(eklenenler,productId)==false){
            
            eklenenler.push(productId);
            
            var insertTbody = document.getElementById('productTable').getElementsByTagName('tbody')[0];

        
            var newRow = insertTbody.insertRow();

            
            var cell1 = newRow.insertCell();
            cell1.appendChild(document.createTextNode(productId));

            var cell2 = newRow.insertCell();
            cell2.appendChild(document.createTextNode(productName));

            var cell3 = newRow.insertCell();
            cell3.appendChild(document.createTextNode(categoryName));

            var cell4 = newRow.insertCell();
            cell4.appendChild(document.createTextNode(brandName));
            
            var cell5 = newRow.insertCell();
            cell5.appendChild(document.createTextNode(productPrice));
        }
    
       
    });

    
});


addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    rootRef.child(productId.value).set({
        product_name: productName.value,
        category_name: categoryName.value,
        brand_name: brandName.value,
        product_price: productPrice.value,
        product_id: productId.value
    })
    
});

removeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    rootRef.child(_productId.value).remove();
    if(eklendiMi(eklenenler,_productId.value)==true)
        //alert(`Ürün listeden kaldırıldı.\nListenin güncellenmesi için sayfayı yenileyiniz...`);
        document.location.reload(true);
    else
        alert("Geçersiz kod");
});