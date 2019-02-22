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

function onDismissed() {
    alert('You Click done');
}

function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

function onPrompt(results) {
    alert('You selected button ' + results.buttonIndex + " and entered: " + results.input1);
}


function onBeep(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}


function dialogAlert() {
    navigator.notification.alert('Alert Test', onDismissed, "alertTitle", ['OK', 'Cancel']);
}

function dialogConfirm() {
    navigator.notification.confirm('Confirm Test', onConfirm, "Pls confirm", ['Restart', 'Exit', 'Cancel']);
}

function dialogPrompt() {
    navigator.notification.prompt('Prompt Test', onPrompt, "alertTitle", ['OK', 'Cancel'], 'Default Text');
}

function dialogBeep() {
    navigator.notification.beep(2);
}

var app = {
    // Application Constructor
    initialize: function() {
        // document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btnAlert').addEventListener('click', dialogAlert);
        document.getElementById('btnConfirm').addEventListener('click', dialogConfirm);
        document.getElementById('btnPrompt').addEventListener('click', dialogPrompt);
        document.getElementById('btnBeep').addEventListener('click', dialogBeep);
    },
};

app.initialize();
