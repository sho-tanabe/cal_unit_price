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
        var date = $('input[name="date"]').val();
        var number = $('input[name="number"]:checked').val();
        var names = '';
        $('#form-name').children().each(function (i, elm) {
            names += $(elm).val() + '、';
        })
        names = names.slice(0, -1);
        //練習エリア終了


        //計算要素項目
        var billingamount = $('input[name="billingamount"]').val();
        var basiccharge = $('input[name="basiccharge"]').val();
        var quantity = $('input[name="quantity"]').val();
        var unitprice = $('[name="unitprice"]').val();

        //算出結果
        var result = ( $('#billingamount').val() - $('#basiccharge').val() ) / $('#quantity').val();
        var resultround = Math.floor(result);

        //コスト削減予定額
        var costcut = (result - 280) * $('#quantity').val();

        //コスト削減予定額（LINEトーク送信用）
        if (costcut < 1000){
            var costcutmsg = `判定結果をご確認ください(${costcut})`;
        }　else if (costcut < 10000){
            var costcutfloor = Math.floor(costcut / 100) * 100;
            var costcutmsg = `約${costcutfloor}円程度`;
            } else {
                var costcutfloor = Math.floor(costcut / 1000) * 1000;
                var costcutmsg = `約${costcutfloor}円程度`;
                }                
        
        var msg = `【現在のガス料金情報】\nご請求予定金額(円):${billingamount}\n基本料金(円):${basiccharge}\n今回ご使用量(㎥):${quantity}\nガス料金単価:${resultround}\n-----------\n【お安くなる金額目安】\n${costcutmsg}`;
        
        if (result < 280){
            var msg2 = `Sランク`; 
        } else {
            var msg2 = `Bランク`; 
        }
        
        sendText(msg);
        sendText2(msg2);
        
        
        return false;
    });
});
