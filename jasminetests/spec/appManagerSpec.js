describe("appManager", function() {
    var running_list, running_list_origin, app_list, app_list_origin, last_list, last_list_origin;
    var appInfos, appInfos_origin, isSuccess;

    function getAppListPromise() {
        return new Promise(function(resolve, reject) {
            var success = function (ret) {
                console.log("getAppList success:" + ret.toString());
                app_list = ret;
                isSuccess = true;
                resolve();
            };
            var error = function (error) {
                console.log("getAppList fail!");
                isSuccess = false;
                reject();
            };
            appManager.getAppList(success, error);
        });
    }

    function getRunningListPromise() {
        return new Promise(function(resolve, reject) {
            var success = function (ret) {
               console.log("getRunningList success:" + ret.toString());
               running_list = ret;
                isSuccess = true;
               resolve();
            };
            var error = function (error) {
               console.log("getRunningList fail!");
                isSuccess = false;
               reject();
            };
            appManager.getRunningList(success, error);
        });
    }

    function getLastListPromise() {
        return new Promise(function(resolve, reject) {
            var success = function (ret) {
               console.log("getLastList success:" + ret.toString());
               last_list = ret;
                isSuccess = true;
               resolve();
            };
            var error = function (error) {
               console.log("getLastList fail!");
                isSuccess = false;
               reject();
            };
            appManager.getLastList(success, error);
        });
    }

    function getAppInfosPromise() {
        return new Promise(function(resolve, reject) {
            var success = function (ret) {
                console.log("getAppInfos success:" + ret.toString());
                appInfos = ret;
                isSuccess = true;
                resolve();
            };
            var error = function (error) {
                console.log("getAppInfos fail!");
                isSuccess = false;
                reject();
            };
            appManager.getAppInfos(success, error);
        });
    }

    function startDappById(dapp_id) {
        return new Promise(function(resolve, reject) {
            var success = function () {
                console.log("start success:" + dapp_id);
                isSuccess = true;
                sleep(100); //wait for start
                resolve();
            };
            var error = function (error) {
                console.log("start fail:" + dapp_id);
                isSuccess = false;
                reject();
            };
            appManager.start(dapp_id, success, error);
        });
    }

    function closeById(dapp_id) {
        return new Promise(function(resolve, reject) {
            var success = function () {
                console.log("close success:" + dapp_id);
                isSuccess = true;
                sleep(100); //wait for close
                resolve();
            };
            var error = function (error) {
                console.log("close fail:" + dapp_id);
                isSuccess = false;
                reject();
            };
            appManager.close(dapp_id, success, error);
        });
    }

    function launcher() {
        return new Promise(function(resolve, reject) {
            var success = function () {
                console.log("launcher success:");
                isSuccess = true;
                resolve();
            };
            var error = function (error) {
                console.log("launcher fail:");
                isSuccess = false;
                reject();
            };
            appManager.launcher(success, error);
        });
    }

    function install(url) {
        return new Promise(function(resolve, reject) {
            var success = function () {
                console.log("install success:" + url);
                isSuccess = true;
                resolve();
            };
            var error = function (error) {
                console.log("install fail:" + url);
                isSuccess = false;
                reject();
            };
            appManager.install(url, success, error);
        });
    }

    function unInstall(dapp_id, buildIn) {
        return new Promise(function(resolve, reject) {
            var success = function () {
                console.log("unInstall success:" + dapp_id);
                isSuccess = true;
                resolve();
            };
            var error = function (error) {
                console.log("unInstall fail:" + dapp_id);
                if (buildIn) {
                    isSuccess = true;
                    resolve();
                }
                else {
                    isSuccess = false;
                    reject();
                }
            };
            appManager.unInstall(dapp_id, success, error);
        });
    }

    function sleep(delay) {
        var start = (new Date()).getTime();
        while ((new Date()).getTime() - start < delay) {
            continue;
        }
    }

    beforeAll(async function() {
        await getAppListPromise();
        await getRunningListPromise();
        await getLastListPromise();
        await getAppInfosPromise();

        running_list_origin = running_list;
        last_list_origin = last_list;
        app_list_origin = app_list;
        appInfos_origin = appInfos;
    });

    afterAll(async function() {
        await getRunningListPromise();
        for (i=0;i<running_list.length;i++){
            await closeById(running_list[i]);
        }
    });


    describe("check list for first launcher", function() {
        it("appList >= 4", async function() {
            expect(app_list.length).toBeGreaterThanOrEqual(4);
        }, 1000);

        it("runningList == 0", async function() {
            expect(running_list_origin.length).toBe(0);
        }, 1000);

        it("lastList == 0", async function() {
            expect(running_list_origin.length).toBe(0);
        }, 1000);

        it("getAppInfos >= 4", async function() {
            var appCount = 0;
            if (typeof appInfos_origin == 'object') {
                for (const key in appInfos_origin) {
                    appCount++;
//                    console.log("id:" + appInfos_origin[key].id + " name:" + appInfos_origin[key].name +
//                        " version:" + appInfos_origin[key].version + " icon:"+ appInfos_origin[key].icons[0].src +
//                        " buildIn:" + appInfos_origin[key].builtIn);
                }
            }
            expect(appCount).toBe(app_list.length);
        }, 1000);
    })

    describe("run buildin dapp", function() {
        var running_list_start, last_list_start;
        beforeEach(async function() {
            await startDappById("org.elastos.trinity.samples");

            await getLastListPromise();
            await getRunningListPromise();
            running_list_start = running_list;
            last_list_start = last_list;

            var index=last_list_start.indexOf("org.elastos.trinity.samples")
            expect(index).toBe(0);
        });

        it("close", async function() {
            await closeById("org.elastos.trinity.samples");
            expect(isSuccess).toBe(true);

            await getLastListPromise();
            await getRunningListPromise();
            expect(isSuccess).toBe(true);
            expect(running_list_start.length).toBeGreaterThanOrEqual(running_list.length);
            expect(last_list_start.length).toBeGreaterThanOrEqual(last_list.length);

            //close all
            for (i=0;i<running_list.length;i++){
                await closeById(running_list[i]);
            }

            await getLastListPromise();
            await getRunningListPromise();
            expect(running_list.length).toBe(0);
            expect(last_list.length).toBe(0);
        }, 10000);

        it("launcher", async function() {
            await launcher();
            await getLastListPromise();
            await getRunningListPromise();
            expect(isSuccess).toBe(true);
            expect(running_list_start.length).toBe(running_list.length);
            expect(last_list_start.length).toBe(last_list.length);
        });

        it("uninstall buildin dapp", async function() {
            await unInstall("org.elastos.trinity.samples", true);
            expect(isSuccess).toBe(true);
        }, 1000);

        it("run all buildin dapp", async function() {
            var dappCount = 0;
            if (typeof appInfos == 'object') {
                for (const key in appInfos_origin) {
                    await startDappById(appInfos_origin[key].id);
                    expect(isSuccess).toBe(true);
                    dappCount++;
                }
            }

            await getRunningListPromise();
            expect(running_list.length).toBe(dappCount);
        }, 10000);

    })

    describe("test epk", function() {
        var app_list_start;
        beforeEach(async function() {
            await getAppListPromise();
            app_list_start = app_list;

            var index=app_list_start.indexOf("org.elastos.trinity.demo2");
            if (index != -1) {
                await unInstall("org.elastos.trinity.demo2", false);

                await getAppListPromise();
                index=app_list.indexOf("org.elastos.trinity.demo2");
                expect(index).toBe(-1);
            }
        });

        it("install epk with file", async function() {
            await install("file:///storage/emulated/0/demo2.zip");

            await getAppListPromise();
            var index=app_list_start.indexOf("org.elastos.trinity.demo2");
            expect(index).toBeGreaterThanOrEqual(0);
        }, 1000);

//        it("install epk with content", async function() {
//        }, 1000);
    })
});
