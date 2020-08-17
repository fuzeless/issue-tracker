/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d56e17cdd544545b3a5d";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "server";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function(err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?1000\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./server/render.jsx":
/*!***************************!*\
  !*** ./server/render.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_Page_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/Page.jsx */ \"./src/Page.jsx\");\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template.js */ \"./server/template.js\");\n\n\n\n\n\n\nfunction render(req, res) {\n  const element = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"StaticRouter\"], {\n    location: req.url,\n    context: {}\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_Page_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null));\n  const body = react_dom_server__WEBPACK_IMPORTED_MODULE_1___default.a.renderToString(element);\n  res.send(Object(_template_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(body));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (render);\n\n//# sourceURL=webpack:///./server/render.jsx?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ \"dotenv\");\n/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http-proxy-middleware */ \"http-proxy-middleware\");\n/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! source-map-support */ \"source-map-support\");\n/* harmony import */ var source_map_support__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(source_map_support__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _render_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render.jsx */ \"./server/render.jsx\");\n\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_2___default()();\nconst fileServerMiddleware = express__WEBPACK_IMPORTED_MODULE_2___default.a.static('public');\ndotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();\nsource_map_support__WEBPACK_IMPORTED_MODULE_4___default.a.install();\nconst enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';\n\nif (enableHMR && \"development\" !== 'production') {\n  console.log('Dev middleware added, enabling HMR');\n  /* eslint-disable global-require */\n\n  /* eslint-disable import/no-extraneous-dependencies */\n\n  const webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\n  const devMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\n  const hotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n\n  const config = __webpack_require__(/*! ../webpack.config.js */ \"./webpack.config.js\")[0];\n\n  config.entry.app.push('webpack-hot-middleware/client');\n  config.plugins = config.plugins || [];\n  config.plugins.push(new webpack.HotModuleReplacementPlugin());\n  const compiler = webpack(config);\n  app.use(devMiddleware(compiler));\n  app.use(hotMiddleware(compiler));\n}\n\napp.use(fileServerMiddleware);\nconst apiProxyTarget = process.env.API_PROXY_TARGET;\n\nif (apiProxyTarget) {\n  app.use('/graphql', http_proxy_middleware__WEBPACK_IMPORTED_MODULE_3___default()({\n    target: apiProxyTarget\n  }));\n}\n\nconst UI_API_ENDPOINT = process.env.UI_API_ENDPOINT || 'http://localhost:3000/graphql';\nconst env = {\n  UI_API_ENDPOINT\n};\napp.get('/about', (req, res, next) => {\n  Object(_render_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(req, res, next);\n});\napp.get('*', (req, res) => {\n  res.sendFile(path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve('public/index.html'));\n});\nconst PORT = process.env.UI_SERVER_PORT || 8000;\napp.listen(PORT, () => {\n  console.log(`UI listening on port ${PORT}!`);\n});\n\nif (true) {\n  module.hot.accept(/*! ./render.jsx */ \"./server/render.jsx\", function() { /* harmony import */ _render_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render.jsx */ \"./server/render.jsx\");\n });\n}\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./server/template.js":
/*!****************************!*\
  !*** ./server/template.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return template; });\nfunction template(body) {\n  return `<!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <link rel=\"stylesheet\" href=\"./bootstrap/css/bootstrap.min.css\">\n        <style>\n            table.bordered-table th, td {border: 1px solid silver; padding: 6px}\n            table.bordered-table {border-collapse: collapse;}\n            input.invalid {border-color: red;}\n            div.error {color: red;}\n            body { padding-top: 20px; }\n            .dropdown-toggle::after{\n                content: none\n            }\n        </style>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Issue Tracker</title>\n    </head>\n    <body>\n        <div id=\"content\">\n            ${body}\n            <script src=\"vendor.bundle.js\"></script>\n            <script src=\"app.bundle.js\"></script>\n        </div>\n    </body>\n    </html>`;\n}\n\n//# sourceURL=webpack:///./server/template.js?");

/***/ }),

/***/ "./src/About.jsx":
/*!***********************!*\
  !*** ./src/About.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return About; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction About() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"text-center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Issue Tracker\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"v1.0?\"));\n}\n\n//# sourceURL=webpack:///./src/About.jsx?");

/***/ }),

/***/ "./src/Clock.jsx":
/*!***********************!*\
  !*** ./src/Clock.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Clock; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable react/react-in-jsx-scope */\n\nclass Clock extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor() {\n    super();\n    this.state = {\n      date: new Date()\n    };\n  }\n\n  componentDidMount() {\n    // this.timerID = setInterval(\n    //     () => this.tick(),\n    //     1000\n    // );\n    // requestAnimationFrame(() => this.tick());\n    this.tick();\n  }\n\n  componentWillUnmount() {\n    clearInterval(this.timerID);\n  }\n\n  tick() {\n    this.setState({\n      date: new Date()\n    });\n    requestAnimationFrame(this.tick.bind(this));\n  }\n\n  render() {\n    const {\n      date\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, `It is ${date.toLocaleTimeString()}`));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/Clock.jsx?");

/***/ }),

/***/ "./src/Contents.jsx":
/*!**************************!*\
  !*** ./src/Contents.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Contents; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _IssueList_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IssueList.jsx */ \"./src/IssueList.jsx\");\n/* harmony import */ var _IssueReport_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IssueReport.jsx */ \"./src/IssueReport.jsx\");\n/* harmony import */ var _IssueEdit_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IssueEdit.jsx */ \"./src/IssueEdit.jsx\");\n/* harmony import */ var _About_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./About.jsx */ \"./src/About.jsx\");\n\n\n\n\n\n\n\nconst NotFound = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Wrong Link try again...\");\n\nfunction Contents() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Redirect\"], {\n    exact: true,\n    from: \"/\",\n    to: \"/issues\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/issues\",\n    component: _IssueList_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/edit/:id\",\n    component: _IssueEdit_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/report\",\n    component: _IssueReport_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    path: \"/about\",\n    component: _About_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n    component: NotFound\n  }));\n}\n\n//# sourceURL=webpack:///./src/Contents.jsx?");

/***/ }),

/***/ "./src/InputForms/DateInput.jsx":
/*!**************************************!*\
  !*** ./src/InputForms/DateInput.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DateInput; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nfunction displayFormat(date) {\n  const newDate = new Date(date);\n  return date != null ? newDate.toDateString() : '';\n}\n\nfunction editFormat(date) {\n  const newDate = new Date(date);\n  return date != null ? newDate.toISOString().substr(0, 10) : '';\n}\n\nfunction unformat(str) {\n  const val = new Date(str);\n  return Number.isNaN(val.getTime()) ? null : val;\n}\n\nclass DateInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      value: editFormat(props.value),\n      focused: false,\n      valid: true\n    };\n    this.onFocus = this.onFocus.bind(this);\n    this.onBlur = this.onBlur.bind(this);\n    this.onChange = this.onChange.bind(this);\n  }\n\n  onFocus() {\n    this.setState({\n      focused: true\n    });\n  }\n\n  onBlur(e) {\n    const {\n      value,\n      valid: oldValid\n    } = this.state;\n    const {\n      onValidityChange,\n      onChange\n    } = this.props;\n    const dateValue = unformat(value);\n    const valid = value === '' || dateValue != null;\n\n    if (valid !== oldValid && onValidityChange) {\n      onValidityChange(e, valid);\n    }\n\n    this.setState({\n      focused: false,\n      valid\n    });\n    if (valid) onChange(e, dateValue);\n  }\n\n  onChange(e) {\n    if (e.target.value.match(/^[\\d-]*$/)) {\n      this.setState({\n        value: e.target.value\n      });\n    }\n  }\n\n  render() {\n    const {\n      valid,\n      focused,\n      value\n    } = this.state;\n    const {\n      value: origValue,\n      onValidityChange,\n      ...props\n    } = this.props;\n    const displayValue = focused || !valid ? value : displayFormat(origValue);\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", _extends({}, props, {\n      value: displayValue,\n      placeholder: focused ? 'YYYY-MM-DD' : null,\n      onFocus: this.onFocus,\n      onBlur: this.onBlur,\n      onChange: this.onChange\n    }));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/InputForms/DateInput.jsx?");

/***/ }),

/***/ "./src/InputForms/NumInput.jsx":
/*!*************************************!*\
  !*** ./src/InputForms/NumInput.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return NumInput; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nfunction format(value) {\n  return value != null ? value.toString() : '';\n}\n\nfunction unformat(value) {\n  const val = Number.parseInt(value, 10);\n  return !Number.isNaN(val) ? val : null;\n}\n\nclass NumInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      value: format(props.value)\n    };\n    this.onBlur = this.onBlur.bind(this);\n    this.onChange = this.onChange.bind(this);\n  }\n\n  onChange(e) {\n    if (e.target.value.match(/^\\d*$/)) {\n      this.setState({\n        value: e.target.value\n      });\n    }\n  }\n\n  onBlur(e) {\n    const {\n      onChange\n    } = this.props;\n    const {\n      value\n    } = this.state;\n    onChange(e, unformat(value));\n  }\n\n  render() {\n    const {\n      value\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", _extends({\n      type: \"text\" // eslint-disable-next-line react/jsx-props-no-spreading\n\n    }, this.props, {\n      value: value,\n      onBlur: this.onBlur,\n      onChange: this.onChange\n    }));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/InputForms/NumInput.jsx?");

/***/ }),

/***/ "./src/InputForms/TextInput.jsx":
/*!**************************************!*\
  !*** ./src/InputForms/TextInput.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextInput; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction format(text) {\n  return text != null ? text : '';\n}\n\nfunction unformat(text) {\n  return text.trim().length === 0 ? null : text;\n}\n\nclass TextInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      value: format(props.value)\n    };\n    this.onBlur = this.onBlur.bind(this);\n    this.onChange = this.onChange.bind(this);\n  }\n\n  onChange(e) {\n    this.setState({\n      value: e.target.value\n    });\n  }\n\n  onBlur(e) {\n    const {\n      onChange\n    } = this.props;\n    const {\n      value\n    } = this.state;\n    onChange(e, unformat(value));\n  }\n\n  render() {\n    const {\n      value\n    } = this.state;\n    const {\n      tag = 'input',\n      ...props\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tag, { ...props,\n      value,\n      onBlur: this.onBlur,\n      onChange: this.onChange\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/InputForms/TextInput.jsx?");

/***/ }),

/***/ "./src/IssueAdd.jsx":
/*!**************************!*\
  !*** ./src/IssueAdd.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/fa */ \"react-icons/fa\");\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _graphql_fetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphql_fetch.js */ \"./src/graphql_fetch.js\");\n\n\n\n\n\n\nclass IssueAdd extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor() {\n    super();\n    this.state = {\n      show: false\n    };\n    this.handleSubmit = this.handleSubmit.bind(this);\n    this.showModal = this.showModal.bind(this);\n    this.closeModal = this.closeModal.bind(this);\n    this.handleSubmit = this.handleSubmit.bind(this);\n  }\n\n  async handleSubmit(e) {\n    // Prevent from submitting the form to GET HTTP when Add button is clicked\n    e.preventDefault(); // Get inputted Form and store it to form\n\n    const form = document.forms.issueAdd; // Create issue based on form inputs\n\n    const issue = {\n      owner: form.owner.value,\n      title: form.title.value\n    };\n    const query = `mutation issueAdd($issue: IssueInputs!) {\n      issueAdd(issue: $issue) {\n          id\n      }\n  }`;\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(query, {\n      issue\n    });\n\n    if (data) {\n      const {\n        history\n      } = this.props;\n      history.push(`/edit/${data.issueAdd.id}`);\n      this.closeModal();\n    }\n  }\n\n  showModal() {\n    this.setState({\n      show: true\n    });\n    const {\n      show\n    } = this.state;\n    console.log(show);\n  }\n\n  closeModal() {\n    this.setState({\n      show: false\n    });\n  }\n\n  render() {\n    const createIssueTooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Tooltip\"], {\n      id: \"tooltip-create\"\n    }, \"Create Issue\");\n    const {\n      show\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Nav\"].Link, {\n      onClick: this.showModal\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"OverlayTrigger\"], {\n      placement: \"left\",\n      overlay: createIssueTooltip\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__[\"FaPlus\"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Modal\"], {\n      show: show,\n      onHide: this.closeModal\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Modal\"].Header, {\n      closeButton: true\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Add Issue\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Modal\"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"], {\n      name: \"issueAdd\",\n      onSubmit: this.handleSubmit\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Owner\")), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: \"input\",\n      type: \"text\",\n      name: \"owner\",\n      placeholder: \"Type your Owner here\"\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Title\")), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: \"input\",\n      type: \"text\",\n      name: \"title\",\n      placeholder: \"Type your Title here\"\n    }), ' '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n      type: \"button\",\n      className: \"mb-2\",\n      variant: \"outline-primary\",\n      onClick: this.handleSubmit\n    }, \"Add\")))));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(IssueAdd));\n\n//# sourceURL=webpack:///./src/IssueAdd.jsx?");

/***/ }),

/***/ "./src/IssueDetail.jsx":
/*!*****************************!*\
  !*** ./src/IssueDetail.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IssueDetail; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _graphql_fetch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql_fetch.js */ \"./src/graphql_fetch.js\");\n\n\nclass IssueDetail extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor() {\n    super();\n    this.state = {\n      issue: {}\n    };\n  }\n\n  componentDidMount() {\n    this.loadData();\n  }\n\n  componentDidUpdate(prevProps) {\n    const {\n      match: {\n        params: {\n          id: prevId\n        }\n      }\n    } = prevProps;\n    const {\n      match: {\n        params: {\n          id\n        }\n      }\n    } = this.props;\n    if (prevId !== id) this.loadData();\n  }\n\n  async loadData() {\n    const {\n      match: {\n        params: {\n          id\n        }\n      }\n    } = this.props; // eslint-disable-next-line radix\n\n    const id2 = parseInt(id);\n    const query = `query issue($id2: Int!) {\n      issue(id: $id2) {\n        id description\n      }\n    }`;\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(query, {\n      id2\n    });\n\n    if (data) {\n      this.setState({\n        issue: data.issue\n      });\n    } else {\n      this.setState({\n        issue: {}\n      });\n    }\n  }\n\n  render() {\n    const {\n      issue: {\n        description\n      }\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Description\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, description));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/IssueDetail.jsx?");

/***/ }),

/***/ "./src/IssueEdit.jsx":
/*!***************************!*\
  !*** ./src/IssueEdit.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IssueEdit; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _InputForms_NumInput_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputForms/NumInput.jsx */ \"./src/InputForms/NumInput.jsx\");\n/* harmony import */ var _InputForms_DateInput_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InputForms/DateInput.jsx */ \"./src/InputForms/DateInput.jsx\");\n/* harmony import */ var _InputForms_TextInput_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InputForms/TextInput.jsx */ \"./src/InputForms/TextInput.jsx\");\n/* harmony import */ var _graphql_fetch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graphql_fetch.js */ \"./src/graphql_fetch.js\");\n\n\n\n\n\n\n\nclass IssueEdit extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor() {\n    super();\n    this.state = {\n      issue: {},\n      invalidFields: {},\n      showingValidation: false\n    };\n    this.onChange = this.onChange.bind(this);\n    this.onValidityChange = this.onValidityChange.bind(this);\n    this.handleSubmit = this.handleSubmit.bind(this);\n    this.dismissValidation = this.dismissValidation.bind(this);\n    this.showValidation = this.showValidation.bind(this);\n  }\n\n  componentDidMount() {\n    this.loadData();\n  }\n\n  componentDidUpdate(prevProps) {\n    const {\n      match: {\n        params: {\n          id: prevId\n        }\n      }\n    } = prevProps;\n    const {\n      match: {\n        params: {\n          id\n        }\n      }\n    } = this.props;\n\n    if (prevId !== id) {\n      this.loadData();\n    }\n  }\n\n  onChange(e, naturalValue) {\n    const {\n      name,\n      value: textValue\n    } = e.target;\n    const value = naturalValue === undefined ? textValue : naturalValue;\n    this.setState(prevState => ({\n      issue: { ...prevState.issue,\n        [name]: value\n      }\n    }));\n  }\n\n  onValidityChange(e, valid) {\n    const {\n      name\n    } = e.target;\n    this.setState(prevState => {\n      const invalidFields = { ...prevState.invalidFields,\n        [name]: !valid\n      };\n      if (valid) delete invalidFields[name];\n      return {\n        invalidFields\n      };\n    });\n  }\n\n  async handleSubmit(e) {\n    e.preventDefault();\n    const {\n      issue,\n      invalidFields\n    } = this.state;\n    if (Object.keys(invalidFields).length !== 0) return;\n    const {\n      id,\n      created,\n      ...changes\n    } = issue;\n    const query = `mutation issueUpdate(\n      $id: Int!,\n      $changes: IssueUpdateInputs!\n    ) {\n        issueUpdate(id: $id, changes: $changes) {\n          id title status owner\n          effort created due description\n      }\n    }`;\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(query, {\n      id,\n      changes\n    });\n\n    if (data) {\n      this.setState({\n        issue: data.issueUpdate\n      });\n      this.showValidation();\n    }\n  }\n\n  async loadData() {\n    const query = `query issue($id: Int!){\n      issue(id: $id) {\n        id title owner status description\n        effort created due\n      }\n    }`;\n    let {\n      match: {\n        params: {\n          id\n        }\n      }\n    } = this.props;\n    id = Number.parseInt(id, 10);\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(query, {\n      id\n    });\n    this.setState({\n      issue: data ? data.issue : {},\n      invalidFields: {}\n    });\n  }\n\n  showValidation() {\n    this.setState({\n      showingValidation: true\n    });\n  }\n\n  dismissValidation() {\n    this.setState({\n      showingValidation: false\n    });\n  }\n\n  render() {\n    const {\n      issue: {\n        id\n      }\n    } = this.state;\n    const {\n      invalidFields,\n      showingValidation\n    } = this.state;\n    let validationMessage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Alert\"], {\n      variant: \"success\",\n      show: showingValidation,\n      onClose: this.dismissValidation,\n      dismissible: true\n    }, `Issue ID ${id} updated successfully!`);\n\n    if (Object.keys(invalidFields).length !== 0 && showingValidation) {\n      validationMessage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Alert\"], {\n        variant: \"danger\",\n        show: showingValidation,\n        onClose: this.dismissValidation,\n        dismissible: true\n      }, `Issue ID ${id} failed to update!`);\n    }\n\n    const {\n      match: {\n        params: {\n          id: propId\n        }\n      }\n    } = this.props;\n\n    if (id == null) {\n      if (propId != null) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, `Can't find issue with ID ${propId}`);\n      }\n\n      return null;\n    }\n\n    const {\n      issue: {\n        title,\n        status\n      }\n    } = this.state;\n    const {\n      issue: {\n        owner,\n        effort,\n        description\n      }\n    } = this.state;\n    const {\n      issue: {\n        created,\n        due\n      }\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Container\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"], {\n      onSubmit: this.handleSubmit\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"].Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, `Edit Issue with ID ${id}`))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Row\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n      lg: 3,\n      md: 4,\n      sm: 4,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Owner\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: _InputForms_TextInput_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n      name: \"owner\",\n      value: owner,\n      onChange: this.onChange,\n      key: id,\n      required: true\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n      lg: 7,\n      md: 8,\n      sm: 8,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Title\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: _InputForms_TextInput_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n      size: 50,\n      name: \"title\",\n      value: title,\n      onChange: this.onChange,\n      key: id,\n      required: true\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n      lg: 2,\n      md: 12,\n      sm: 12,\n      xs: 12\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Status\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: \"select\",\n      name: \"status\",\n      value: status,\n      onChange: this.onChange\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"New\"\n    }, \"New\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"Assigned\"\n    }, \"Assigned\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"Fixed\"\n    }, \"Fixed\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"Closed\"\n    }, \"Closed\"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Row\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Created\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      placeholder: `${created.toDateString()}`,\n      readOnly: true\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Due Date\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: _InputForms_DateInput_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n      name: \"due\",\n      value: due,\n      onChange: this.onChange,\n      onValidityChange: this.onValidityChange,\n      key: id,\n      required: true\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Effort\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: _InputForms_NumInput_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n      name: \"effort\",\n      value: effort,\n      onChange: this.onChange,\n      key: id\n    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Label, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, \"Description\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      as: _InputForms_TextInput_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n      tag: \"textarea\",\n      rows: 8,\n      cols: 50,\n      name: \"description\",\n      value: description,\n      onChange: this.onChange,\n      key: id\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Group, null, validationMessage), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n      variant: \"outline-primary\",\n      type: \"submit\"\n    }, \"Submit\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: `/edit/${id - 1}`\n    }, \"Prev\"), ' | ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n      to: `/edit/${id + 1}`\n    }, \"Next\")))));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/IssueEdit.jsx?");

/***/ }),

/***/ "./src/IssueFilter.jsx":
/*!*****************************!*\
  !*** ./src/IssueFilter.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! url-search-params */ \"url-search-params\");\n/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n // eslint-disable-next-line react/prefer-stateless-function\n\nclass IssueFilter extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor({\n    location: {\n      search\n    }\n  }) {\n    super();\n    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_3___default.a(search);\n    this.state = {\n      status: params.get('status') || '',\n      effortMin: params.get('effortMin') || '',\n      effortMax: params.get('effortMax') || '',\n      changed: false,\n      isFilterOpened: false\n    };\n    this.onChangeStatus = this.onChangeStatus.bind(this);\n    this.onChangeEffortMin = this.onChangeEffortMin.bind(this);\n    this.onChangeEffortMax = this.onChangeEffortMax.bind(this);\n    this.applyFilter = this.applyFilter.bind(this);\n    this.clearAllFilters = this.clearAllFilters.bind(this);\n  }\n\n  componentDidUpdate(prevProps) {\n    const {\n      location: {\n        search: prevSearch\n      }\n    } = prevProps;\n    const {\n      location: {\n        search\n      }\n    } = this.props;\n    if (search !== prevSearch) this.showOriginalFilter();\n  }\n\n  onChangeStatus(e) {\n    this.setState({\n      status: e.target.value,\n      changed: true\n    });\n  }\n\n  onChangeEffortMin(e) {\n    const effortString = e.target.value;\n\n    if (effortString.match(/^\\d*$/)) {\n      this.setState({\n        effortMin: e.target.value,\n        changed: true\n      });\n    }\n  }\n\n  onChangeEffortMax(e) {\n    const effortString = e.target.value;\n\n    if (effortString.match(/^\\d*$/)) {\n      this.setState({\n        effortMax: e.target.value,\n        changed: true\n      });\n    }\n  }\n\n  applyFilter() {\n    const {\n      status,\n      effortMin,\n      effortMax\n    } = this.state;\n    const {\n      history\n    } = this.props;\n    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_3___default.a();\n    if (status) params.set('status', status);\n    if (effortMin) params.set('effortMin', effortMin);\n    if (effortMax) params.set('effortMax', effortMax);\n    const search = params.toString() ? `?${params.toString()}` : '';\n    history.push({\n      pathname: '/issues',\n      search\n    });\n  }\n\n  showOriginalFilter() {\n    const {\n      location: {\n        search\n      }\n    } = this.props;\n    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_3___default.a(search);\n    this.setState({\n      status: params.get('status') || '',\n      effortMin: params.get('effortMin') || '',\n      effortMax: params.get('effortMax') || '',\n      changed: false\n    });\n  }\n\n  clearAllFilters() {\n    this.setState({\n      status: '',\n      effortMin: '',\n      effortMax: '',\n      changed: false\n    });\n    const {\n      history\n    } = this.props;\n    history.push({\n      pathname: '/issues',\n      search: ''\n    });\n  }\n\n  render() {\n    // const { location: { search } } = this.props;\n    // const params = new URLSearchParams(search);\n    const {\n      status,\n      changed,\n      effortMax,\n      effortMin,\n      isFilterOpened\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"], {\n      bg: \"dark\",\n      text: \"white\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"].Header, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n      style: {\n        backgroundColor: 'transparent',\n        border: 'transparent'\n      },\n      block: true,\n      onClick: () => this.setState({\n        isFilterOpened: !isFilterOpened\n      })\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, \"Filter\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Collapse\"], {\n      in: isFilterOpened\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Card\"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Row\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n      sm: 12,\n      md: 6,\n      lg: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormGroup\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormLabel\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\", null, \"Status\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormControl\"], {\n      as: \"select\",\n      value: status,\n      onChange: this.onChangeStatus\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"\"\n    }, \"(All)\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"New\"\n    }, \"New\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"Assigned\"\n    }, \"Assigned\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n      value: \"Closed\"\n    }, \"Closed\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n      sm: 12,\n      md: 6,\n      lg: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormGroup\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormLabel\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\", null, \"Effort Between\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"InputGroup\"], {\n      className: \"mb-3\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      value: effortMin,\n      onChange: this.onChangeEffortMin\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"InputGroup\"].Prepend, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"InputGroup\"].Text, null, \"and\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Control, {\n      value: effortMax,\n      onChange: this.onChangeEffortMax\n    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n      sm: 12,\n      md: 12,\n      lg: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormLabel\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h5\", null, \"\\xA0\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"FormGroup\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n      variant: \"primary\",\n      onClick: this.applyFilter\n    }, \"Apply\"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n      variant: \"primary\",\n      onClick: this.showOriginalFilter,\n      disabled: !changed\n    }, \"Reset\"), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n      variant: \"danger\",\n      onClick: this.clearAllFilters\n    }, \"Clear all filters\"), ' ')))))));\n  }\n\n} // Default Class doesn't have any Routes => no location, history component\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(IssueFilter));\n\n//# sourceURL=webpack:///./src/IssueFilter.jsx?");

/***/ }),

/***/ "./src/IssueList.jsx":
/*!***************************!*\
  !*** ./src/IssueList.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IssueList; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url-search-params */ \"url-search-params\");\n/* harmony import */ var url_search_params__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url_search_params__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _IssueFilter_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IssueFilter.jsx */ \"./src/IssueFilter.jsx\");\n/* harmony import */ var _IssueTable_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IssueTable.jsx */ \"./src/IssueTable.jsx\");\n/* harmony import */ var _IssueDetail_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IssueDetail.jsx */ \"./src/IssueDetail.jsx\");\n/* harmony import */ var _Clock_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Clock.jsx */ \"./src/Clock.jsx\");\n/* harmony import */ var _graphql_fetch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./graphql_fetch.js */ \"./src/graphql_fetch.js\");\n\n\n\n\n\n\n\n\nclass IssueList extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor() {\n    super();\n    this.state = {\n      issues: []\n    };\n    this.createIssue = this.createIssue.bind(this);\n    this.closeIssue = this.closeIssue.bind(this);\n    this.deleteIssue = this.deleteIssue.bind(this);\n  }\n\n  componentDidMount() {\n    this.loadData();\n  }\n\n  componentDidUpdate(prevProps) {\n    const {\n      location: {\n        search: prevSearch\n      }\n    } = prevProps;\n    const {\n      location: {\n        search\n      }\n    } = this.props;\n    if (prevSearch !== search) this.loadData();\n  }\n\n  async loadData() {\n    const {\n      location: {\n        search\n      }\n    } = this.props;\n    const params = new url_search_params__WEBPACK_IMPORTED_MODULE_2___default.a(search);\n    const vars = {};\n    if (params.get('status')) vars.status = params.get('status');\n    const effortMin = parseInt(params.get('effortMin'), 10);\n    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;\n    const effortMax = parseInt(params.get('effortMax'), 10);\n    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;\n    const query = `query issueList(\n      $status: StatusType\n      $effortMin: Int\n      $effortMax: Int\n      ){\n            issueList(\n              status: $status\n              effortMin: $effortMin\n              effortMax: $effortMax\n              ) {\n                id\n                status\n                title\n                owner\n                effort\n                created\n                due\n            }\n        }`;\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(query, vars);\n\n    if (data) {\n      this.setState({\n        issues: data.issueList\n      });\n    }\n  }\n\n  async createIssue(issue) {\n    const query = `mutation issueAdd($issue: IssueInputs!) {\n            issueAdd(issue: $issue) {\n                id\n            }\n        }`;\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(query, {\n      issue\n    });\n\n    if (data) {\n      this.loadData();\n    }\n  }\n\n  async closeIssue(index) {\n    const query = `mutation issueClose($id: Int!) {\n      issueUpdate(id: $id, changes: { status: Closed }) {\n        id title status owner effort created due description\n      }\n    }`;\n    const {\n      issues\n    } = this.state;\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(query, {\n      id: issues[index].id\n    });\n\n    if (data) {\n      this.setState(prevState => {\n        const newList = [...prevState.issues];\n        newList[index] = data.issueUpdate;\n        return {\n          issues: newList\n        };\n      });\n    } else {\n      this.loadData();\n    }\n  }\n\n  async deleteIssue(index) {\n    const query = `mutation issueDelete($id: Int!) {\n      issueDelete(id: $id)\n    }`;\n    const {\n      issues\n    } = this.state;\n    const {\n      location: {\n        pathname,\n        search\n      },\n      history\n    } = this.props;\n    const {\n      id\n    } = issues[index];\n    const data = await Object(_graphql_fetch_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(query, {\n      id\n    });\n\n    if (data && data.issueDelete) {\n      this.setState(prevState => {\n        const newList = [...prevState.issues];\n\n        if (pathname === `/issues/${id}`) {\n          history.push({\n            pathname: '/issues',\n            search\n          });\n        }\n\n        newList.splice(index, 1);\n        return {\n          issues: newList\n        };\n      });\n    } else {\n      this.loadData();\n    }\n  }\n\n  render() {\n    const {\n      issues\n    } = this.state;\n    const {\n      match\n    } = this.props;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueFilter_jsx__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueTable_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      issues: issues,\n      closeIssue: this.closeIssue,\n      deleteIssue: this.deleteIssue\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Route\"], {\n      path: `${match.path}/:id`,\n      component: _IssueDetail_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Clock_jsx__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/IssueList.jsx?");

/***/ }),

/***/ "./src/IssueReport.jsx":
/*!*****************************!*\
  !*** ./src/IssueReport.jsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IssueReport; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction IssueReport() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Placeholder for Issue Report\"));\n}\n\n//# sourceURL=webpack:///./src/IssueReport.jsx?");

/***/ }),

/***/ "./src/IssueTable.jsx":
/*!****************************!*\
  !*** ./src/IssueTable.jsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IssueTable; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ \"react-icons/fa\");\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst IssueRow = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"withRouter\"])(({\n  issue,\n  location: {\n    search\n  },\n  closeIssue,\n  index,\n  deleteIssue\n}) => {\n  const selectLocation = {\n    pathname: `/issues/${issue.id}`,\n    search\n  }; //* Tooltips\n\n  const closeTooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Tooltip\"], {\n    id: \"tooltip-close\",\n    placement: \"top\"\n  }, \"Close Issue\");\n  const deleteTooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Tooltip\"], {\n    id: \"tooltip-delete\",\n    placement: \"top\"\n  }, \"Delete Issue\");\n  const descriptionTooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Tooltip\"], {\n    id: \"tooltip-description\",\n    placement: \"top\"\n  }, \"Show Description\");\n  const editTooltip = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Tooltip\"], {\n    id: \"tooltip-edit\",\n    placement: \"top\"\n  }, \"Edit Issue\");\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, issue.id)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, issue.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, issue.owner), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, issue.created.toDateString()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, issue.effort)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, issue.due ? issue.due.toDateString() : ' '), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, issue.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"td\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"Link\"], {\n    to: `/edit/${issue.id}`\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"OverlayTrigger\"], {\n    overlay: editTooltip\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], {\n    size: \"sm\",\n    variant: \"primary\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__[\"FaRegEdit\"], null)))), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__[\"NavLink\"], {\n    to: selectLocation\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"OverlayTrigger\"], {\n    overlay: descriptionTooltip\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], {\n    size: \"sm\",\n    variant: \"primary\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__[\"FaRegStickyNote\"], null)))), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"OverlayTrigger\"], {\n    overlay: closeTooltip\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], {\n    variant: \"success\",\n    size: \"sm\",\n    onClick: () => closeIssue(index)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__[\"FaRegWindowClose\"], null))), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"OverlayTrigger\"], {\n    overlay: deleteTooltip\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], {\n    variant: \"danger\",\n    size: \"sm\",\n    onClick: () => deleteIssue(index)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__[\"FaRegTrashAlt\"], null))))));\n});\nfunction IssueTable({\n  issues,\n  closeIssue,\n  deleteIssue\n}) {\n  const issueRows = issues.map((issue, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IssueRow, {\n    key: issue.id,\n    issue: issue,\n    closeIssue: closeIssue,\n    deleteIssue: deleteIssue,\n    index: index\n  })); // console.log(this.state);\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"Table\"], {\n    striped: true,\n    bordered: true,\n    hover: true,\n    size: \"lg\",\n    variant: \"dark\",\n    responsive: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"thead\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tr\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"ID\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Status\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Owner\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Date Created\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Effort\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Due Date\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Title\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"th\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"center\", null, \"Tools\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"tbody\", null, issueRows));\n}\n\n//# sourceURL=webpack:///./src/IssueTable.jsx?");

/***/ }),

/***/ "./src/Page.jsx":
/*!**********************!*\
  !*** ./src/Page.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Page; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/fa */ \"react-icons/fa\");\n/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-bootstrap */ \"react-router-bootstrap\");\n/* harmony import */ var react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Contents_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Contents.jsx */ \"./src/Contents.jsx\");\n/* harmony import */ var _IssueAdd_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IssueAdd.jsx */ \"./src/IssueAdd.jsx\");\n\n\n\n\n\n\n\nfunction Navigation() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Navbar\"], {\n    expand: \"lg\",\n    bg: \"dark\",\n    variant: \"dark\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Navbar\"].Brand, null, \"Issue Tracker\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"], {\n    className: \"mr-auto\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Item, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"LinkContainer\"], {\n    exact: true,\n    to: \"/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Link, null, \"Home\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Item, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"LinkContainer\"], {\n    to: \"/issues\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Link, null, \"Issue List\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Item, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"LinkContainer\"], {\n    to: \"/report\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"].Link, null, \"Report\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Nav\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueAdd_jsx__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"NavDropdown\"], {\n    alignRight: true,\n    id: \"user-dropdown\",\n    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_2__[\"FaChevronDown\"], null)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_bootstrap__WEBPACK_IMPORTED_MODULE_3__[\"LinkContainer\"], {\n    to: \"/about\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"NavDropdown\"].Item, null, \"About\"))))));\n}\n\nfunction Footer() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: \"text-center\"\n  }, \"Helo\"));\n}\n\nfunction Page() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__[\"Container\"], {\n    fluid: true,\n    style: {\n      paddingLeft: '45px',\n      paddingRight: '45px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Navigation, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Contents_jsx__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Footer, null)));\n}\n\n//# sourceURL=webpack:///./src/Page.jsx?");

/***/ }),

/***/ "./src/graphql_fetch.js":
/*!******************************!*\
  !*** ./src/graphql_fetch.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return graphQLFetch; });\n/* eslint-disable no-alert */\n// Convert ISO Date to Locale Date using JSON.parse()\nconst dateRegex = new RegExp('\\\\d\\\\d\\\\d\\\\d-\\\\d\\\\d-\\\\d\\\\d');\n\nfunction jsonDateReviver(key, value) {\n  if (dateRegex.test(value)) return new Date(value);\n  return value;\n} // Fetch GraphQL Data\n\n\nasync function graphQLFetch(query, variables = {}) {\n  try {\n    const response = await fetch(__UI_API_ENDPOINT__, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        query,\n        variables\n      })\n    });\n    const body = await response.text();\n    const result = JSON.parse(body, jsonDateReviver);\n\n    if (result.errors) {\n      const error = result.errors[0];\n\n      if (error.extensions.code === 'BAD_USER_INPUT') {\n        const details = error.extensions.exception.errors.join('\\n ');\n        alert(`${error.message}:\\n ${details}`);\n      } else {\n        alert(`${error.extensions.code}:\\n ${error.message}`);\n      }\n    }\n\n    return result.data;\n  } catch (e) {\n    alert(`Error in sending data to server: ${e.message()}`);\n    return null;\n  }\n}\n\n//# sourceURL=webpack:///./src/graphql_fetch.js?");

/***/ }),

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ \"path\");\n\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nconst nodeExternals = __webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\");\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst serverConfig = {\n  mode: 'development',\n  entry: {\n    server: ['./server/server.js']\n  },\n  target: 'node',\n  externals: [nodeExternals()],\n  output: {\n    filename: 'server.js',\n    path: path.resolve(__dirname, 'dist'),\n    publicPath: '/'\n  },\n  module: {\n    rules: [{\n      test: /\\.jsx?$/,\n      exclude: /node_modules/,\n      use: {\n        loader: 'babel-loader',\n        options: {\n          presets: [['@babel/preset-env', {\n            targets: {\n              node: '10'\n            }\n          }], '@babel/preset-react']\n        }\n      }\n    }]\n  }\n};\nconst browserConfig = {\n  mode: 'development',\n  entry: {\n    app: ['./browser/App.jsx']\n  },\n  output: {\n    filename: '[name].bundle.js',\n    path: path.resolve(__dirname, 'public'),\n    publicPath: '/'\n  },\n  module: {\n    rules: [{\n      test: /\\.jsx?$/,\n      exclude: /node_modules/,\n      use: {\n        loader: 'babel-loader',\n        options: {\n          presets: [['@babel/preset-env', {\n            targets: {\n              ie: '11',\n              edge: '15',\n              safari: '10',\n              firefox: '50',\n              chrome: '49'\n            }\n          }], '@babel/preset-react']\n        }\n      }\n    }]\n  },\n  optimization: {\n    splitChunks: {\n      name: 'vendor',\n      chunks: 'all'\n    }\n  },\n  devtool: 'source-map',\n  plugins: [new webpack.DefinePlugin({\n    __UI_API_ENDPOINT__: `'${process.env.UI_API_ENDPOINT}'`\n  })]\n};\nmodule.exports = [browserConfig, serverConfig];\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./webpack.config.js?");

/***/ }),

/***/ 0:
/*!*********************************************************************!*\
  !*** multi ./server/server.js ./node_modules/webpack/hot/poll?1000 ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./server/server.js */\"./server/server.js\");\nmodule.exports = __webpack_require__(/*! ./node_modules/webpack/hot/poll?1000 */\"./node_modules/webpack/hot/poll.js?1000\");\n\n\n//# sourceURL=webpack:///multi_./server/server.js_./node_modules/webpack/hot/poll?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http-proxy-middleware":
/*!****************************************!*\
  !*** external "http-proxy-middleware" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http-proxy-middleware\");\n\n//# sourceURL=webpack:///external_%22http-proxy-middleware%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-bootstrap\");\n\n//# sourceURL=webpack:///external_%22react-bootstrap%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-icons/fa":
/*!*********************************!*\
  !*** external "react-icons/fa" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-icons/fa\");\n\n//# sourceURL=webpack:///external_%22react-icons/fa%22?");

/***/ }),

/***/ "react-router-bootstrap":
/*!*****************************************!*\
  !*** external "react-router-bootstrap" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-bootstrap\");\n\n//# sourceURL=webpack:///external_%22react-router-bootstrap%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"source-map-support\");\n\n//# sourceURL=webpack:///external_%22source-map-support%22?");

/***/ }),

/***/ "url-search-params":
/*!************************************!*\
  !*** external "url-search-params" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url-search-params\");\n\n//# sourceURL=webpack:///external_%22url-search-params%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-node-externals\");\n\n//# sourceURL=webpack:///external_%22webpack-node-externals%22?");

/***/ })

/******/ });