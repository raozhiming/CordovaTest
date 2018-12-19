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

var batteryStatus = document.getElementById("status");

function onBatteryStatus(status) {
    batteryStatus.innerHTML = "Level: " + status.level + " isPlugged: " + status.isPlugged;
}

function onBatteryLow(status) {
    batteryStatus.innerHTML = "Battery Level Low " + status.level + "%";
}

function onBatteryCritical(status) {
    batteryStatus.innerHTML = "Battery Level Critical " + status.level + "%\nRecharge Soon!";
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        window.addEventListener("batterystatus", onBatteryStatus, false);
        window.addEventListener("batterylow", onBatteryLow, false);
        window.addEventListener("batterycritical", onBatteryCritical, false);
    },
};

app.initialize();
