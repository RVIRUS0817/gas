var postUrl = "https://notify-api.line.me/api/notify";
var token = "hoge";

function doPost(e){

  var json = e.postData.getDataAsString();
  var params = JSON.parse(json);

  // 新規、更新、削除
  var actionType = params["action"];
  // ブログ、WIKI、コメント
  var resourceType = params["resource_type"];
  // 実行した人の名前
  var name = params["action_user"]["account"];
  // URL
  var url = params[resourceType]["url"];
  // 通知メッセージ
  var message = "";


  message = resourceType + "：" + actionToJapanese(actionType)  + "\n" + name + "\n" + url;

  var options =
  {
    "method"  : "post",
    "payload" : "message=" + message,
    "headers" : {"Authorization" : "Bearer "+ token}
  };

  // lineに投げる
  UrlFetchApp.fetch(postUrl,options);
}

function actionToJapanese(actionType){
  switch(true){
    case actionType == "create":
      return "投稿";

    case actionType == "update":
      return "更新";

    case actionType == "delete":
      return "削除";
  }
}
