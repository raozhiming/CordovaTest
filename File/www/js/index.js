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

 function showInfo(arg, append=false) {
    if (append) {
        dirInfo.innerHTML+=arg;
    }
    else {
        dirInfo.innerHTML=arg;
    }
}

function showVariable() {
    showInfo("cordova.file.applicationDirectory:<br>"+ cordova.file.applicationDirectory +
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
        "<br>cordova.file.sharedDirectory:<br>" + cordova.file.sharedDirectory);
}


function errorHandler(e) {
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
        case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
        case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
        case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
        case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break;
        default:
        msg = 'Unknown Error';
        break;
    };

    showInfo('Error: ' + msg);
}


function readFile(fileEntry) {
    fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            showInfo(this.result, true);
        };
        reader.readAsText(file);
    }, errorHandler);
}

function writeFile(fileEntry, content, count) {
    fileEntry.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
            showInfo("Dir:" + cordova.file.dataDirectory + '<br>Write completed.');
        };

        fileWriter.onerror = function(e) {
            showInfo("Dir:" + cordova.file.dataDirectory + '<br>Write failed: ' + e.toString());
        };

        fileWriter.seek(fileWriter.length);
        var dataObj = new Blob([cordova.file.dataDirectory], { type: 'text/plain' });
        fileWriter.write(dataObj);
    }, errorHandler);
}

function createDir() {
    window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
        fs.root.getDirectory('MyPictures', {create: true}, function(dirEntry) {
            showInfo("Create dir ok");
        }, errorHandler);
    }, errorHandler);
}

function removeFile(filename) {
    window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
        fs.root.getFile("log.txt", {create: false}, function(fileEntry) {
            fileEntry.remove(function() {
                showInfo('File removed.');
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);
}

function removeLocalFile(filename) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fs) {
        fs.getFile("log.txt", {create: false}, function(fileEntry) {
            fileEntry.remove(function() {
                showInfo('File removed.');
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);
}


function listDir(fileEntry) {

}


function openLocalFileSystemAndWrite(type, filename){
    window.resolveLocalFileSystemURL(type, function (fs) {
        showInfo('open file system: ' + fs.name + '<br>');
        fs.getFile(filename, { create: true }, function (fileEntry) {
              writeFile(fileEntry, "", 1);
        }, errorHandler);
    });
}

function openLocalFileSystemAndRead(type, filename){
    window.resolveLocalFileSystemURL(type, function (fs) {
        showInfo('open file system: ' + fs.name + '<br>');
        fs.getFile(filename, { create: false }, readFile, errorHandler);
    });
}


function openFileSystemAndWrite(type, filename){
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0,
        function (fs) {
            showInfo('open file system: ' + fs.name);
            fs.root.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
                writeFile(fileEntry, "", 1);
            }, errorHandler);
        },
        errorHandler);
}

function openFileSystemAndRead(){
    window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, function (fs) {
        showInfo('open file system: ' + fs.name);
        fs.root.getFile("log.txt", { create: false, exclusive: true }, readFile, errorHandler);
    }, errorHandler);
}

function createAndWriteFile(){
    openLocalFileSystemAndWrite(cordova.file.dataDirectory, "log.txt");
}

function createAndWriteFile2(){
    openFileSystemAndWrite(LocalFileSystem.TEMPORARY, "log.txt");
}

function openAndReadFile(){
    openLocalFileSystemAndRead(cordova.file.dataDirectory, "log.txt");
}

function persistentInfo() {
    navigator.webkitPersistentStorage.queryUsageAndQuota(function(usage, quota) {
        showInfo('PERSISTENT: ' + usage + '/' + quota + ' - ' + usage / quota + '%');
    });
}

function temporaryInfo() {
    navigator.webkitTemporaryStorage.queryUsageAndQuota(function(usage, quota) {
        showInfo('Temporary: ' + usage + '/' + quota + ' - ' + usage / quota + '%');
    });
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("writelocal").addEventListener("click", createAndWriteFile);
        document.getElementById("readlocal").addEventListener("click", openAndReadFile);
        document.getElementById("deletelocal").addEventListener("click", removeLocalFile);
        document.getElementById("write").addEventListener("click", createAndWriteFile2);
        document.getElementById("read").addEventListener("click", openFileSystemAndRead);
        document.getElementById("delete").addEventListener("click", removeFile);
        document.getElementById("info").addEventListener("click", showVariable);
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
