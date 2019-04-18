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

function createDirCallback(dirEntry) {
    showInfo("Create dir ok");
}

function removeFileCallback(fileEntry) {
    fileEntry.remove(function() {
        showInfo('File removed.');
    }, errorHandler);
}

function readEntriesCallback(entries) {
    for (var i = 0, entry; entry = entries[i]; ++i) {
        showInfo(entry.toURL() + '<br>', true);
    }
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
            showInfo('Write completed.', true);
        };

        fileWriter.onerror = function(e) {
            showInfo('Write failed: ' + e.toString());
        };

        fileWriter.seek(fileWriter.length);
        var dataObj = new Blob([content], { type: 'text/plain' });
        fileWriter.write(dataObj);
    }, errorHandler);
}

function createDirs(type, dirname) {
    switch(type) {
        case 0:
            window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
                fs.root.getDirectory(dirname, {create: true}, createDirCallback, errorHandler);
            }, errorHandler);
        break;
        case 1:
            window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
                fs.root.getDirectory(dirname, {create: true}, createDirCallback, errorHandler);
            }, errorHandler);

        break;
        default:
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fs) {
                fs.getDirectory(dirname, {create: true}, createDirCallback, errorHandler);
            }, errorHandler);
    }
}

function removeFile(type, fielname) {
    switch(type) {
        case 0:
            window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
                fs.root.getFile(fielname, {create: false}, removeFileCallback, errorHandler);
            }, errorHandler);
        break;
        case 1:
            window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
                fs.root.getFile(fielname, {create: false}, removeFileCallback, errorHandler);
            }, errorHandler);

        break;
        default:
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fs) {
                fs.getFile(fielname, {create: false}, removeFileCallback, errorHandler);
            }, errorHandler);
    }
}

function listDir(type) {
    showInfo('All Files:<br>');
    switch(type) {
        case 0:
            window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
                var fileReader = fs.root.createReader();
                fileReader.readEntries(readEntriesCallback);
            }, errorHandler);
        break;
        case 1:
            window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
                var fileReader = fs.root.createReader();
                fileReader.readEntries(readEntriesCallback);
            }, errorHandler);
        break;
        default:
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fs) {
                var fileReader = fs.createReader();
                fileReader.readEntries(readEntriesCallback);
            }, errorHandler);
    }
}


function createDirsLocal() {
    createDirs(2, "dir-local");
}

function createDirsTemp() {
    createDirs(0, "dir-temp");
}

function createDirsPersistent() {
    createDirs(1, "dir-persistent");
}

function removeFileLocal() {
    removeFile(2, "log-local.txt");
}

function removeFileTemp() {
    removeFile(0, "log-temp.txt");
}

function removeFilePersistent() {
    removeFile(1, "log-persistent.txt");
}

function listDirLocal() {
    listDir(2);
}

function listDirTemp() {
    listDir(0);
}

function listDirPersistent() {
    listDir(1);
}

function openAndWrite(type, filename, content){
    switch (type) {
        case 0:
            window.requestFileSystem(window.TEMPORARY, 1024*1024, function (fs) {
                showInfo('open file system: ' + fs.name + '<br>');
                fs.root.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
                    writeFile(fileEntry, content, 1);
                }, errorHandler);
            }, errorHandler);
        break;
        case 1:
            window.requestFileSystem(window.PERSISTENT, 1024*1024, function (fs) {
                showInfo('open file system: ' + fs.name + '<br>');
                fs.root.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
                    writeFile(fileEntry, content, 1);
                }, errorHandler);
            }, errorHandler);
        break;
        default:
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fs) {
                showInfo('open file system: ' + cordova.file.dataDirectory + '<br>');
                fs.getFile(filename, { create: true }, function (fileEntry) {
                      writeFile(fileEntry, content, 1);
                }, errorHandler);
            }, errorHandler);
    }
}

function openAndRead(type, filename){
    switch (type) {
        case 0:
            window.requestFileSystem(window.TEMPORARY, 0, function (fs) {
                showInfo('open file system: ' + fs.name + '<br>');
                fs.root.getFile(filename, { create: false, exclusive: true }, readFile, errorHandler);
            }, errorHandler);
        break;
        case 1:
            window.requestFileSystem(window.PERSISTENT, 0, function (fs) {
                showInfo('open file system: ' + fs.name + '<br>');
                fs.root.getFile(filename, { create: false, exclusive: true }, readFile, errorHandler);
            }, errorHandler);
        break;
        default:
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fs) {
                showInfo('open file system: ' + cordova.file.dataDirectory + '<br>');
                fs.getFile(filename, { create: false }, readFile, errorHandler);
            });
    }
}

function writeFileTemp() {
    openAndWrite(0, "temp-test.txt", "Temp Write Test<br>")
}

function writeFilePersistent() {
    openAndWrite(1, "persistent-test.txt", "Persistent Write Test<br>")
}

function writeFileLocal() {
    openAndWrite(2, "local-test.txt", "LocalFileSystem Write Test<br>")
}

function readFileTemp() {
    openAndRead(0, "temp-test.txt");
}

function readFilePersistent() {
    openAndRead(1, "persistent-test.txt");
}

function readFileLocal() {
    openAndRead(2, "local-test.txt");
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

        document.getElementById("writelocal").addEventListener("click", writeFileLocal);
        document.getElementById("readlocal").addEventListener("click", readFileLocal);
        document.getElementById("deletelocal").addEventListener("click", removeFileLocal);
        document.getElementById("listlocal").addEventListener("click", listDirLocal);
        document.getElementById("createdirslocal").addEventListener("click", createDirsLocal);

        document.getElementById("writetemp").addEventListener("click", writeFileTemp);
        document.getElementById("readtemp").addEventListener("click", readFileTemp);
        document.getElementById("deletetemp").addEventListener("click", removeFileTemp);
        document.getElementById("createdirstemp").addEventListener("click", createDirsTemp);
        document.getElementById("listtemp").addEventListener("click", listDirTemp);
        document.getElementById("Temporary").addEventListener("click", temporaryInfo);

        document.getElementById("writepersistent").addEventListener("click", writeFilePersistent);
        document.getElementById("readpersistent").addEventListener("click", readFilePersistent);
        document.getElementById("deletepersistent").addEventListener("click", removeFilePersistent);
        document.getElementById("createdirspersistent").addEventListener("click", createDirsPersistent);
        document.getElementById("listpersistent").addEventListener("click", listDirPersistent);
        document.getElementById("PERSISTENT").addEventListener("click", persistentInfo);

        document.getElementById("info").addEventListener("click", showVariable);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
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
