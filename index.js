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
        var UnitPrice = $('[name="UnitPrice"]').val();
        //var result2 = $('#quantity').val() * $('#price').val();
        var result = ( $('#BillingAmount').val() - $('#BasicCharge').val() ) / $('#quantity').val() ;

        //練習エリア終了
        
        var date = $('input[name="date"]').val();
        var number = $('input[name="number"]:checked').val();
        var names = '';
        $('#form-name').children().each(function (i, elm) {
            names += $(elm).val() + '、';
        })
        names = names.slice(0, -1);
      
        if (result < 100) {
                var msg = `99以下です\n文字入力テスト：${text1}\nバリデーションテスト：${text10}\n合計金額total：${UnitPrice}\n合計金額result2：${result}\n選択肢テスト：${select1}\n希望日：${date}\n人数：${number}\n氏名：${names}`;                  
　        　　　　　　　　　　　　　　　var msg2 = `99以下です`; 
        } else {
                var msg = `100以上です\n文字入力テスト：${text1}\nバリデーションテスト：${text10}\n合計金額total：${UnitPrice}\n合計金額result2：${result}\n選択肢テスト：${select1}\n希望日：${date}\n人数：${number}\n氏名：${names}`;                 
　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　var msg2 = `１００以上です`; 
        }
        
        sendText(msg);
        sendText(msg2);
        
        
        //メッセージ2通目送信検証用_開始
        
//        if (result < 100) {
//                var msg2 = `99以下です`;             
//        } else {
//                var msg2 = `100以上です`; 
//            }
//        sendText2(msg2);
        
        //メッセージ2通目送信検証用_終了

        
        return false;
    });
});
