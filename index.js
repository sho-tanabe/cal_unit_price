$(function () {
    // カレンダー
    $(function () {
        $('input[name="date"]').datepicker({
            dateFormat: 'yy/mm/dd',
        });
    });

    // 参加人数分の氏名欄を生成
    $('#form-number').click(function () {
        $('#form-name').empty();
        var num = $('input[name="number"]:checked').val();
        for (i = 0; i < num; i++) {
            $('#form-name').append(
                `<input class="form-control w-100 mt-1" name="name" maxlength="10">`
            );
        }
    });

    // 送信
    $('form').submit(function () {

        //練習エリア開始
        var text1 = $('input[name="text1"]').val();
        var select1 = $('[name="select1"] option:selected').val();
        var text10 = $('input[name="text10"]').val();
        //var total = $('[name="total"]').val();

        var billingamount = $('input[name="billingamount"]').val();
        var basiccharge = $('input[name="basiccharge"]').val();
        var quantity = $('input[name="quantity"]').val();
        var unitprice = $('[name="unitprice"]').val();

        //var result2 = $('#quantity').val() * $('#price').val();
        var result = ( $('#billingamount').val() - $('#basiccharge').val() ) / $('#quantity').val();

        
 

        //練習エリア終了
        
        var date = $('input[name="date"]').val();
        var number = $('input[name="number"]:checked').val();
        var names = '';
        $('#form-name').children().each(function (i, elm) {
            names += $(elm).val() + '、';
        })
        names = names.slice(0, -1);
      
        if (result < 250){
            var msg = `【現在のガス料金情報】\nAAAランク\n【内訳】\nご請求予定金額(円):${billingamount}\n基本料金(円):${basiccharge}\n今回ご使用量(㎥):${quantity}\nガス料金単価:${result}`;
            var msg2 = `AAAランク`; 
        } else {
            var msg = `【現在のガス料金情報】\nBランク\n【内訳】\nご請求予定金額(円):${billingamount}\n基本料金(円):${basiccharge}\n今回ご使用量(㎥):${quantity}\nガス料金単価:${result}`;
            var msg2 = `Bランク`; 
        }
        
        sendText(msg);
//        sendText(msg2);
        
        
        
        
        
        
        
        
        
        
        
        
        //メッセージ2通目送信検証用_開始
        
//        if (result < 250) {
//                var msg = `AAAランク`;             
//        } else {
//                var msg = `Bランク`; 
//            }
        sendText2(msg2);
        
        //メッセージ2通目送信検証用_終了

        
        return false;
    });
});
