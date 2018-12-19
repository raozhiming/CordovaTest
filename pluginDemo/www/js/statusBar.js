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


function overlayWebview() {
    var isOverlay = document.getElementById("overlaysWebView").checked;
    StatusBar.overlaysWebView(isOverlay);
}

function styleDefault() {
    StatusBar.styleDefault();
}

function lightContent() {
    StatusBar.styleLightContent();
}

function blackBranslucent() {
    StatusBar.styleBlackTranslucent();
}

function blackOpaque() {
    StatusBar.styleBlackOpaque();
}

function backgroundColorByName() {
    StatusBar.backgroundColorByName("red");
}

function backgroundColorByHexString() {
    StatusBar.backgroundColorByHexString("#333");
}

function hide() {
    StatusBar.hide();
}

function show() {
    StatusBar.show();
}

var app = {
    // Application Constructor
    initialize: function() {
        document.getElementById("overlaysWebView").addEventListener("change", overlayWebview);
        document.getElementById("styleDefault").addEventListener("click", styleDefault);
        document.getElementById("styleLightContent").addEventListener("click", lightContent);
        document.getElementById("styleBlackTranslucent").addEventListener("click", blackBranslucent);
        document.getElementById("styleBlackOpaque").addEventListener("click", blackOpaque);
        document.getElementById("backgroundColorByName").addEventListener("click", backgroundColorByName);
        document.getElementById("backgroundColorByHexString").addEventListener("click", backgroundColorByHexString);
        document.getElementById("hide").addEventListener("click", hide);
        document.getElementById("show").addEventListener("click", show);
    },
};

app.initialize();
