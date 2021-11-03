$(document).ready(function () {
    // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
    // LINE DevelopersのLIFF画面より確認可能
    var liffId = "1656567556-B0AlZrXW";
    initializeLiff(liffId);
})

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({redirectUri: location.href});
            }
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

function sendText(text) {
    if (!liff.isInClient()) {
//WEBブラウザアクセスの場合の動作↓
        alert('本画面をLINE以外のブラウザで起動している場合、料金を診断できません。スマートフォンのLINEアプリから料金診断を行って下さい。');
//WEBブラウザアクセス以外の場合の動作↑
    } else {
        sendMessages(text);
//        sendautomail(text);//これを利用すると画面が3回目以降フリーズする現象に見舞われる。
//        sendLineNotifyMessage();//実験中。
//        myFunction();//実験中２。
    }
}

// LINEトーク画面上でメッセージ送信
//function sendMessages(text) {
//    liff.sendMessages([{
//        'type': 'text',
//        'text': text
//    }]).then(function () {
//        liff.closeWindow();
//    }).catch(function (error) {
//        window.alert('Failed to send message ' + error);
//    });
//}


//2通同時に送れるかテスト
// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    },{
        'type': 'text',
        'text': "2通同時に送れるかテスト"
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}
//2通同時に送れるかテスト


// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}



//Email送信
function sendautomail(text){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "lpg.switching@gmail.com",
        Password : "B1B77086CF542475B41E41582E7D1B36E78D",
        To : 'lpg.switching@gmail.com',
        From : "lpg.switching@gmail.com",
        Subject : "LINE経由でガス料金単価の計算実行あり。",
        Body : text
    }).then(
        message => alert(message)
    )
};


//クリアボタン押下時の動作
function refresh() {
    isInit = true;
    secondNum = 0;
    ans = 0;
    kigou = "";
    type.innerHTML = "";
    display.innerHTML = 0;
    textbox1.value = "";
    textbox2.value = "";
}

//----------------------------------------算出ロジック開始----------------------------------------

function update_field(){    
    var resultabout = Math.floor( ( $('#billingamount').val() - $('#basiccharge').val() ) / $('#quantity').val() );
    var result = `${resultabout}円`;
    $('#unitprice').text(result);
}
$(function() {
  $('input[type="number"]').on('keyup change', function() {
    update_field();
  });
});

//----------------------------------------算出ロジック終了----------------------------------------

//----------------------------------------以下Sendtextテスト２----------------------------------------
function sendText2(text) {
    if (!liff.isInClient()) {
//        shareTargetPicker2(text);
//        liff.openWindow({
//            url: "https://goofy-offer-5121.glide.page/dl//s/d0a5f4",
//            external: true
//        });
    } else {
        sendMessages2(text);
    }
}

// LINEトーク画面上でメッセージ送信
function sendMessages2(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

// Webブラウザからメッセージ送信
function shareTargetPicker2(text) {
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}
//----------------------------------------以上Sendtextテスト２----------------------------------------
//----------------------------------------以下LINE Notifyテスト----------------------------------------
function sendLineNotifyMessage(){
    var message = "test message";
    var token = ["BV9ydCSRx6vixlkyLi5H41JFT4q1DKBFrGy7h95dNkm"];
    
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify",
                      {
        "method" : "post",
        "payload" : "message=" + message,
        "headers" : {"Authorization" : "Bearer "+ token}
    });
}
//----------------------------------------以上LINE Notifyテスト----------------------------------------
//----------------------------------------以下LINE Notifyテスト2----------------------------------------
function sendHttpPost(message){
  var token = ["CAXV5gIKD4BCPHSCfcv2gbBRqOdVDkZInX6sq6cRmXd"];
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + message,
     "headers" : {"Authorization" : "Bearer "+ token}

   };

   UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
}

function myFunction(){
  var message="Google App Srciptから送信" ;
  sendHttpPost(message);
}
//----------------------------------------以上LINE Notifyテスト2----------------------------------------
