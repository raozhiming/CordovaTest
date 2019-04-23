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
// {
//   "authorized": Boolean
//   "denied": Boolean
//   "restricted": Boolean
//   "prepared": Boolean
//   "scanning": Boolean
//   "previewing": Boolean
//   "showing": Boolean
//   "lightEnabled": Boolean
//   "canOpenSettings": Boolean
//   "canEnableLight": Boolean
//   "currentCamera": Number
// }

function showStatus(status) {
    s = "authorized:" + status.authorized + '<br>' +
        "denied:" + status.authorized + '<br>' +
        "restricted:" + status.authorized + '<br>' +
        "prepared:" + status.authorized + '<br>' +
        "scanning:" + status.authorized + '<br>' +
        "previewing:" + status.authorized + '<br>' +
        "showing:" + status.authorized + '<br>' +
        "lightEnabled:" + status.authorized + '<br>' +
        "canOpenSettings:" + status.authorized + '<br>' +
        "canEnableLight:" + status.authorized + '<br>' +
        "currentCamera:" + status.authorized + '<br>';
    console.log(s);
}

function onDone(err, status){
    showStatus(status);
}

function startPrepare() {
    console.log("startPrepare");
    QRScanner.prepare(onDone);
}

//拍照
function startScan() {
    console.log("startScan");
    var callback = function(err, contents){
        if(err){
            if(err.name === 'SCAN_CANCELED') {
                console.error('The scan was canceled before a QR code was found.');
            } else {
                console.error(err._message);
            }
        }
        console.log('The QR Code contains: ' + contents);
    }

    window.QRScanner.scan(callback);
}

function show() {
    console.log("show");
    window.QRScanner.show(function(status){
        showStatus(status);
    });
}


function destroy() {
    QRScanner.destroy(function(status){
        showStatus(status);
    });
}


function cancelScan() {
    console.log("cancelScan");
    window.QRScanner.cancelScan(function(status){
        showStatus(status);
    });
}

function hide() {
    console.log("hide");
    window.QRScanner.hide(function(status){
        showStatus(status);
    });
}

function enableLight() {
    QRScanner.enableLight(function(err, status){
        err && console.error(err);
        showStatus(status);
    });
}

function disableLight() {
    QRScanner.disableLight(function(err, status){
        err && console.error(err);
        showStatus(status);
    });
}

function frontCamera() {
    QRScanner.useFrontCamera(function(err, status){
        err && console.error(err);
        showStatus(status);
    });
}

function backCamera() {
    QRScanner.useBackCamera(function(err, status){
        err && console.error(err);
        showStatus(status);
    });
}

function pausePreview() {
    QRScanner.pausePreview(function(status){
        showStatus(status);
    })
}

function resumePreview() {
    QRScanner.resumePreview(function(status){
        showStatus(status);
    })
}

function openSetting() {
    QRScanner.getStatus(function(status){
        showStatus(status);
        if(status.canOpenSettings){
            if(confirm("Would you like to enable QR code scanning? You can allow camera access in your settings.")){
              QRScanner.openSettings();
            }
        }
    });
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        document.getElementById('btnScan').addEventListener('click', startScan);
        document.getElementById('btnPrepare').addEventListener('click', startPrepare);
        document.getElementById('btnShow').addEventListener('click', show);
        document.getElementById('btnHide').addEventListener('click', hide);
        document.getElementById('btnCancel').addEventListener('click', cancelScan);
        document.getElementById('btnDestroy').addEventListener('click', destroy);
        document.getElementById('btnEnableLight').addEventListener('click', enableLight);
        document.getElementById('btnDisableLight').addEventListener('click', disableLight);
        document.getElementById('btnFront').addEventListener('click', frontCamera);
        document.getElementById('btnBack').addEventListener('click', backCamera);
        document.getElementById('btnPause').addEventListener('click', pausePreview);
        document.getElementById('btnResume').addEventListener('click', resumePreview);
        document.getElementById('btnSetting').addEventListener('click', openSetting);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();