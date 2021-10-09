function taodoituongsanpham(imgsp, tensp, giasp, id) {
    var sanpham = new Object();
    sanpham.imgsp = imgsp;
    sanpham.tensp = tensp;
    sanpham.giasp = giasp;

    if (id != null) {
        sanpham.id = id;
    } else {
        sanpham.id = taoid();
    }
    sanpham.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    }
    sanpham.fromJson = function (json) {
        var doituong = new Object();
        var doituongLocal = JSON.parse(json)
        var doituong = taodoituongsanpham(doituongLocal.imgsp, doituongLocal.tensp, doituongLocal.giasp);
        return doituong;
    }
    return sanpham;
}
function chuyendanhsachsanphamthanhhtml(danhsachsanpham) {
    var HTMLdanhsachsanpham = '';
    for (var i = 0; i < danhsachsanpham.length; i++) {
        var sanpham = danhsachsanpham[i];
        var htmlsanpham = chuyendoituongsanphamthanhhtml(sanpham);
        HTMLdanhsachsanpham = HTMLdanhsachsanpham + htmlsanpham;
    }
    HTMLdanhsachsanpham = HTMLdanhsachsanpham + ''
    return HTMLdanhsachsanpham;
}
function chuyendoituongsanphamthanhhtml(sanpham) {
    sanpham = taodoituongsanpham(sanpham.imgsp, sanpham.tensp, sanpham.giasp, sanpham.id);
    var sanphamHTML = '';
    sanphamHTML += '<div class="product">'
    sanphamHTML += ' <img class="img-product" src="' + sanpham.imgsp + '" width="200px" />'
    sanphamHTML += '<p class="name-product">' + sanpham.tensp + '</p>'
    sanphamHTML += ' <p class="price-product">Giá: ' + sanpham.giasp + 'vnđ</p>'
    sanphamHTML += '  <button type="button" class="detail" onclick="">CHI TIẾT</button>'
    sanphamHTML += ' <br>'
    sanphamHTML += ' </div >'
    return sanphamHTML;
}
function taoid() {
    var id = '';
    id = Math.random().toString().substr(2, 10) + '_' + String(new Date().getTime());
    return id;
}
function truyxuatsanphamtheoid(id) {
    var jsondanhsachsanpham = localStorage.getItem('danhsachsanpham');
    var danhsachsanpham = JSON.parse(jsondanhsachsanpham);
    for (var i = 0; i < danhsachsanpham.length; i++) {
        var sanpamhientai = danhsachsanpham[i];
        if (sanpamhientai.id == id) {
            return sanpamhientai;
        }
    }

}
function onclicktimkiemsanpham() {
    var nodeidsanpham = document.getElementById('idsanpham');
    var idsanpham = nodeidsanpham.value;
    console.log('id:' + idsanpham);
    var sanpham = truyxuatsanphamtheoid(idsanpham);
    console.log(sanpham);

    var html = chuyendoituongsanphamthanhhtml(sanpham);
    var nodeketqua = document.getElementById('ketqua');
    nodeketqua.innerHTML = html;
}
function onclicktaosanpham() {
    var danhsachsanpham = JSON.parse(localStorage.getItem('danhsachsanpham'));
    if (danhsachsanpham == null)
        danhsachsanpham = new Array();
    console.log(danhsachsanpham);
    var img = document.getElementById('imgsp');
    var imgsp = img.value;
    img.value = '';

    var ten = document.getElementById('tensp');
    var tensp = ten.value;
    ten.value = '';

    var gia = document.getElementById('giasp');
    var giasp = gia.value;
    gia.value = '';

    var sanpham = taodoituongsanpham(imgsp, tensp, giasp, null);
    danhsachsanpham.push(sanpham);
    console.log(danhsachsanpham);
    var jsondanhsachsanpham = JSON.stringify(danhsachsanpham)
    localStorage.setItem('danhsachsanpham', jsondanhsachsanpham);

}
function onclickthemvaogiohang(id) {
    alert('thêm vào giỏ hàng thành công ' + id);
}
function onclickdanhmuc(id) {
    var element_to_scroll_to = document.getElementById(id);
    element_to_scroll_to.scrollIntoView();
}
function taodoituonguser(name, pass) {
    var user = new Object();
    user.name = name;
    user.pass = pass;
    user.toJson = function () {
        var json = JSON.stringify(this);
        return json;
    }
    user.fromJson = function (json) {
        var doituong = new Object();
        var doituongLocal = JSON.parse(json)
        var doituong = taodoituonguser(doituongLocal.name, doituongLocal.pass);
        return doituong;
    }
    return user;
}
function truyxuatuser(name) {
    console.log('name:' + name);
    var jsondanhsachuser = localStorage.getItem('danhsachuser');
    if (jsondanhsachuser == null) {
        var flaguser = true;
    } else {
        var danhsachuser = JSON.parse(jsondanhsachuser);
        for (var i = 0; i < danhsachuser.length; i++) {
            var userhientai = danhsachuser[i];
            if (userhientai.name == name) {
                var flaguser = false;
                break;
            } else {
                var flaguser = true;
            }

        }
    }
    console.log('flaguser: ' + flaguser);
    return flaguser;
}
function onclicktaouser() {
    var danhsachuser = JSON.parse(localStorage.getItem('danhsachuser'));
    if (danhsachuser == null)
        danhsachuser = new Array();
    console.log(danhsachuser);
    var username = document.getElementById('username');
    var name = username.value;
    username.value = '';

    var password = document.getElementById('password');
    var pass = password.value;
    password.value = '';

    var checkpassword = document.getElementById('checkpassword');
    var checkpass = checkpassword.value;
    checkpassword.value = '';
    if (checkpass == pass) {
        var flagcheckpass = true;
    } else {
        var flagcheckpass = false;
    }
    console.log('flagcheckpass: ' + flagcheckpass);

    var check = document.getElementById('xac-nhan');
    var checkbox = check.checked;
    console.log('checkbox : ' + checkbox);
    if (name != "" && pass != "" && flagcheckpass == true && truyxuatuser(name) == true && checkbox == true) {
        var user = taodoituonguser(name, pass);
        danhsachuser.push(user);
        console.log(danhsachuser);
        var jsondanhsachuser = JSON.stringify(danhsachuser)
        localStorage.setItem('danhsachuser', jsondanhsachuser);
    }
    window.location.href = "login.html";
}
function checkacccount(name, pass) {
    var jsondanhsachuser = localStorage.getItem('danhsachuser');
    var danhsachuser = JSON.parse(jsondanhsachuser);
    for (var i = 0; i < danhsachuser.length; i++) {
        var acccount = danhsachuser[i];
        if (acccount.name == name && acccount.pass == pass) {
            var flagacccount = true;
            break;
        } else {
            var flagacccount = false;
        }
    }
    console.log('flagacccount: ' + flagacccount);
    return flagacccount;
}
function onclicklogin() {
    var username = document.getElementById('userlogin');
    var name = username.value;
    var password = document.getElementById('passlogin');
    var pass = password.value;
    var acccount = checkacccount(name, pass);
    if (acccount == true) {
        console.log('Đăng nhập thành công!');
        window.location.href = "index.html";
    }else{
        console.log('Đăng nhập thất bại!');
    }
}