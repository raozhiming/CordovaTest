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

var durationInfo = document.getElementById("mediaDuration");
var positionInfo = document.getElementById("mediaPosition");

var myMedia = null;
var volumeValue = 0.5;

function playAudio() {
    var src = "/background.mp3";

    if(myMedia === null) {
        myMedia = new Media(src, onSuccess, onError);

        function onSuccess() {
            console.log("playAudio Success");
        }

        function onError(error) {
            console.log("playAudio Error: " + error.code);
        }
    }

    var counter = 0;
    var timerDur = setInterval(function() {
        counter = counter + 100;
        if (counter > 2000) {
            clearInterval(timerDur);
        }
        var dur = myMedia.getDuration();
        if (dur > 0) {
            clearInterval(timerDur);
            durationInfo.innerHTML = (dur) + " sec";
        }
    }, 100);

    var mediaTimer = setInterval(function () {
        // get media position
        myMedia.getCurrentPosition(
            // success callback
            function (position) {
                if (position > -1) {
                    console.log((position) + " sec");
                    positionInfo.innerHTML = position + " sec";
                }
            },
            // error callback
            function (e) {
                console.log("Error getting pos=" + e);
            }
        );
    }, 1000);

    myMedia.play();
}

function pauseAudio() {
   if(myMedia) {
      myMedia.pause();
   }
}

function stopAudio() {
   if(myMedia) {
      myMedia.stop();
      myMedia.release();
      myMedia = null;
   }

   myMedia = null;
}

function volumeUp() {
   if(myMedia && volumeValue < 1) {
      myMedia.setVolume(volumeValue += 0.1);
   }
}

function volumeDown() {
   if(myMedia && volumeValue > 0) {
      myMedia.setVolume(volumeValue -= 0.1);
   }
}

var app = {
    // Application Constructor
    initialize: function() {
        document.getElementById("playAudio").addEventListener("click", playAudio);
        document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
        document.getElementById("stopAudio").addEventListener("click", stopAudio);
        document.getElementById("volumeUp").addEventListener("click", volumeUp);
        document.getElementById("volumeDown").addEventListener("click", volumeDown);
    },
};

app.initialize();
