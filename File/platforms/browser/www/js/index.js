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

var dirInfo = document.getElementById("dirinfo");


function showInfo() {
    dirInfo.innerHTML="cordova.file.applicationDirectory:<br>"+ cordova.file.applicationDirectory +
            "<br>cordova.file.applicationStorageDirectory:<br>" + cordova.file.applicationStorageDirectory +
            "<br>cordova.file.dataDirectory:<br>" + cordova.file.dataDirectory +
            "<br>cordova.file.externalDataDirectory:<br>" + cordova.file.externalDataDirectory +
            "<br>cordova.file.syncedDataDirectory:<br>" + cordova.file.syncedDataDirectory +
            "<br>cordova.file.cacheDirectory:<br>" + cordova.file.cacheDirectory +
            "<br>cordova.file.externalApplicationStorageDirectory:<br>" + cordova.file.externalApplicationStorageDirectory +
            "<br>cordova.file.externalCacheDirectory:<br>" + cordova.file.externalCacheDirectory +
            "<br>cordova.file.externalRootDirectory:<br>" + cordova.file.externalRootDirectory +
            "<br>cordova.file.tempDirectory:<br>" + cordova.file.tempDirectory +
            "<br>cordova.file.documentsDirectory:<br>" + cordova.file.documentsDirectory +
            "<br>cordova.file.sharedDirectory:<br>" + cordova.file.sharedDirectory;
}


function createAndWriteFile(){

    function errorHandler() {
        console.log("errorHandler");
    }

    function onInitFs(fs) {
      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

        // Create a FileWriter object for our FileSystemFileEntry (log.txt).
        fileEntry.createWriter(function(fileWriter) {
          fileWriter.onwriteend = function(e) {
            console.log('Write completed.');
          };

          fileWriter.onerror = function(e) {
            console.log('Write failed: ' + e.toString());
          };

          // Create a new Blob and write it to log.txt.
          // var bb = new BlobBuilder();
          // bb.append('Meow');
          // fileWriter.write(bb.getBlob('text/plain'));
          fileWriter.seek(fileWriter.length);
          var dataObj = new Blob(['welcome to elastos.orgwelcome to elastos.org'], { type: 'text/plain' });
          fileWriter.write(dataObj);
        }, errorHandler);

      }, errorHandler);

    }

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    navigator.webkitTemporaryStorage.requestQuota(1 * 1024 * 1024, function(grantedBytes) {
        window.requestFileSystem(window.TEMPORARY, grantedBytes, onInitFs, errorHandler);
    }, function(e) {
        console.log('Error', e);
    });
}


function writeFile(fileEntry, dataObj) {

    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };
        fileWriter.write(dataObj);
    });
}

function  onErrorCreateFile(error){
    console.log("onErrorCreateFile:" + error)
}

function  onErrorLoadFs(error){
    console.log("onErrorLoadFs:" + error)
}

function openAndReadFile(){
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function (fs) {

        console.log('open file system: ' + fs.name);
        fs.root.getFile("log.txt", { create: false, exclusive: true },
        function (fileEntry) {
            console.log("isFile?" + fileEntry.isFile.toString());

            readFile(fileEntry, null);

        }, onErrorCreateFile);

    }, onErrorLoadFs);
}


function readFile(fileEntry) {
    fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            alert(this.result);
        };
        reader.readAsText(file);
    }, onErrorReadFile);
}


function onErrorReadFile() {
  console.log("read error!");
}

function persistentInfo() {
  navigator.webkitPersistentStorage.queryUsageAndQuota(function(usage, quota) {
        console.log('PERSISTENT: ' + usage + '/' + quota + ' - ' + usage / quota + '%');
    });
}

function temporaryInfo() {
    navigator.webkitTemporaryStorage.queryUsageAndQuota(function(usage, quota) {
        console.log('Temporary: ' + usage + '/' + quota + ' - ' + usage / quota + '%');
    });
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("info").addEventListener("click", showInfo);
        document.getElementById("write").addEventListener("click", createAndWriteFile);
        document.getElementById("read").addEventListener("click", openAndReadFile);
        document.getElementById("PERSISTENT").addEventListener("click", persistentInfo);
        document.getElementById("Temporary").addEventListener("click", temporaryInfo);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log('-----------------onDeviceReady-------------');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

app.initialize();
