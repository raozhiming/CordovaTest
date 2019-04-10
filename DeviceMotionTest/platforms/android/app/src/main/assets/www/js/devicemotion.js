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
var info = document.getElementById("info");
var watchID=-1;

function timeStamp2String (time){
        var datetime = new Date();
         datetime.setTime(time);
         var year = datetime.getFullYear();
         var month = datetime.getMonth() + 1;
         var date = datetime.getDate();
         var hour = datetime.getHours();
         var minute = datetime.getMinutes();
         var second = datetime.getSeconds();
         var mseconds = datetime.getMilliseconds();
         return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second+"."+mseconds;
};


function getCurrentAcceleration() {
    console.log('-----------------getCurrentAcceleration-------------');

    var options = {
        frequency: 500,
    }

    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError, options);

    function onSuccess(acceleration) {
        var dateStr = timeStamp2String(acceleration.timestamp);
        info.innerHTML=
                'x: '          + acceleration.x + '<br>' +
                'y: '          + acceleration.y + '<br>' +
                'z: '          + acceleration.z + '<br>' +
                'Timestamp: '  + dateStr        + '<br>';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
}

function watchAcceleration() {

    if (watchID!=-1) return;

    console.log('-----------------watchAcceleration-------------');
    var options = {
        frequency: 500,
    }

    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

    function onSuccess(acceleration) {
        var dateStr = timeStamp2String(acceleration.timestamp);
        info.innerHTML=
                'x: '          + acceleration.x + '<br>' +
                'y: '          + acceleration.y + '<br>' +
                'z: '          + acceleration.z + '<br>' +
                'Timestamp: '  + dateStr        + '<br>';
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }
}

function clearWatch() {
    navigator.accelerometer.clearWatch(watchID);
    watchID = -1;
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
        document.getElementById('btnGeolocationInfo').addEventListener('click', getCurrentAcceleration);
        document.getElementById('btnWatchPosition').addEventListener('click', watchAcceleration);
        document.getElementById('btnClearWatch').addEventListener('click', clearWatch);

        this.receivedEvent('deviceready');
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