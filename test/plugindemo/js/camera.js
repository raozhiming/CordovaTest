/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var divChoosePic = document.getElementById("divChoosePic");
var imgShow = document.getElementById("imgShow");

//图片选择框显示隐藏
function showChooseDiv(flag) {
    if (flag === 1) {//隐藏
        divChoosePic.style.display = "none";
        return;
    }
    if (flag === 2) {//显示
        divChoosePic.style.display = "block";
        return
    }
    divChoosePic.style.display = "block";
}

//拍照
function callTakePicture() {
    showChooseDiv(2);
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
        //将选择的控件放到要显示的控件上
        imgShow.src = "data:image/jpeg;base64," + imageData;
        console.log('-----------------onSuccess-------------\n\n\n------------');
    };

    function onFail(message) {
        alert('Failed because: ' + message);
    };
}

//选择本地图片
function addLocalPicture() {
    showChooseDiv(2);

    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });

    function onSuccess(imageURL) {
        //将选择的控件放到要显示的控件上
        imgShow.src = "data:image/jpeg;base64," + imageURL;
    };

    function onFail(message) {
        navigator.notification.alert('Failed because:'+message,"操作提示","确定");
    };
}

function cancelChoosePic() {
    showChooseDiv(2);
    imgShow.src = "img/logo.png";
}

var app = {
    // Application Constructor
    initialize: function() {
        document.getElementById('btnChooseFromCamera').addEventListener('click', callTakePicture);
        document.getElementById('btnChooseFromLocal').addEventListener('click', addLocalPicture);
        document.getElementById('btnCancelChoose').addEventListener('click', cancelChoosePic);
    },
};

app.initialize();
