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

var geolocation = document.getElementById("geolocationinfo");
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


function geolocationInfo() {
    console.log('-----------------geolocationInfo-------------');

    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000,
        timeout: 3000,
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        var dateStr = timeStamp2String(position.timestamp);
        geolocation.innerHTML=
                'Latitude: '          + position.coords.latitude          + '<br>' +
                'Longitude: '         + position.coords.longitude         + '<br>' +
                'Altitude: '          + position.coords.altitude          + '<br>' +
                'Accuracy: '          + position.coords.accuracy          + '<br>' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
                'Heading: '           + position.coords.heading           + '<br>' +
                'Speed: '             + position.coords.speed             + '<br>' +
                'Timestamp: '         + dateStr                           + '<br>';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
}

function watchPosition() {

    if (watchID!=-1) return;

    console.log('-----------------watchPosition-------------');
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000,
        timeout: 3000,
    }

    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {
        console.log('-----------------watchPosition onSuccess-------------');
        var dateStr = timeStamp2String(position.timestamp);
        geolocation.innerHTML=
            'Latitude: '          + position.coords.latitude          + '<br>' +
            'Longitude: '         + position.coords.longitude         + '<br>' +
            'Altitude: '          + position.coords.altitude          + '<br>' +
            'Accuracy: '          + position.coords.accuracy          + '<br>' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
            'Heading: '           + position.coords.heading           + '<br>' +
            'Speed: '             + position.coords.speed             + '<br>' +
            'Timestamp: '         + dateStr                           + '<br>';
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }
}

function clearWatch() {
    navigator.geolocation.clearWatch(watchID);
    watchID = -1;
}


var app = {
    // Application Constructor
    initialize: function() {
        // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btnGeolocationInfo').addEventListener('click', geolocationInfo);
        document.getElementById('btnWatchPosition').addEventListener('click', watchPosition);
        document.getElementById('btnClearWatch').addEventListener('click', clearWatch);
    },
};

app.initialize();
