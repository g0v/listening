$ = jQuery.noConflict();

/*!
 * Projekktor II - HTML5 Media Player, Projekktor Core Version: V1.0.28 r103
 * http://www.projekktor.com
 * Copyright 2010, 2011, Sascha Kluger, Spinning Airwhale Media, http://www.spinningairwhale.com
 * GNU General Public License
 * http://www.projekktor.com/license/
 */
jQuery(function($){if($.browser.msie){(function(){if(!
/*@cc_on!@*/
0){return}var e="audio,video,source".split(",");for(var i=0;i<e.length;i++){document.createElement(e[i])}})();if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj,start){for(var i=(start||0),j=this.length;i<j;i++){if(this[i]==obj){return i}}return -1}}}var projekktors=[];function Iterator(arr){this.length=arr.length;this.each=function(fn){$.each(arr,fn)};this.size=function(){return arr.length}}if($.prop==undefined||$().jquery<"1.6"){$.fn.prop=function(arga,argb){return $(this).attr(arga,argb)}}projekktor=$p=function(){var arg=arguments[0],instances=[],plugins=[];if(!arguments.length){return projekktors[0]||null}if(typeof arg=="number"){return projekktors[arg]}if(typeof arg=="string"){if(arg=="*"){return new Iterator(projekktors)}for(var i=0;i<projekktors.length;i++){try{if(projekktors[i].getId()==arg.id){instances.push(projekktors[i]);continue}}catch(e){}try{for(var j=0;j<$(arg).length;j++){if(projekktors[i].env.playerDom.get(0)==$(arg).get(j)){instances.push(projekktors[i]);continue}}}catch(e){}try{if(projekktors[i].getParent()==arg){instances.push(projekktors[i]);continue}}catch(e){}try{if(projekktors[i].getId()==arg){instances.push(projekktors[i]);continue}}catch(e){}}if(instances.length>0){return(instances.length==1)?instances[0]:new Iterator(instances)}}if(instances.length==0){var cfg=arguments[1]||{};var callback=arguments[2]||{};if(typeof arg=="string"){var count=0,playerA;$.each($(arg),function(){playerA=new PPlayer($(this),cfg,callback);projekktors.push(playerA);count++});return(count>1)?new Iterator(projekktors):playerA}else{if(arg){projekktors.push(new PPlayer(arg,cfg,callback));return new Iterator(projekktors)}}}return null;function PPlayer(srcNode,cfg,onReady){this.config=new projekktorConfig("1.0.28");this._persCfg=["playbackQuality","enableNativePlayback","enableFlashFallback","volume"];this.env={muted:false,inFullscreen:false,playerDom:null,mediaContainer:null,agent:"standard",mouseIsOver:false,loading:false,autoSize:false,className:"",onReady:onReady};this.media=[];this._plugins=[];this._queue=[];this._cuePoints={};this.listeners=[];this.playerModel={};this._isReady=false;this._compTableCache=false;this._currentItem=null;this._playlistServer="";this._id="";this._reelUpdate=function(obj){this.env.loading=true;var ref=this,data=obj||[{}];this.media=[];try{for(var props in data.config){if(typeof data.config[props].indexOf("objectfunction")>-1){continue}this.config[props]=eval(data.config[props])}if(data.config!=null){$p.utils.log("Updated config var: "+props+" to "+this.config[props]);this._promote("configModified");delete (data.config)}}catch(e){}var files=data.playlist||data;for(var item in files){if(typeof files[item]=="function"||typeof files[item]==null){continue}if(files[item]){var itemIdx=this._addItem(this._prepareMedia({file:files[item],config:files[item].config||{},errorCode:files[item].errorCode}))}$.each(files[item].cuepoints||[],function(){this.item=itemIdx;ref.setCuePoint(this)})}if(itemIdx==null){this._addItem(this._prepareMedia({file:"",config:{},errorCode:97}))}this.env.loading=false;this._promote("scheduled",this.getItemCount());this._syncPlugins(function(){ref.setActiveItem(0)})};this._addItem=function(data,idx,replace){var resultIdx=0;if(this.media.length===1&&this.media[0].mediaModel=="NA"){this._detachplayerModel();this.media=[]}if(idx===undefined||idx<0||idx>this.media.length-1){this.media.push(data);resultIdx=this.media.length-1}else{this.media.splice(idx,(replace===true)?1:0,data);resultIdx=idx}if(this.env.loading===false){this._promote("scheduleModified",this.getItemCount())}return resultIdx};this._removeItem=function(idx){var resultIdx=0;if(this.media.length===1){if(this.media[0].mediaModel=="NA"){return 0}else{this.media[0]=this._prepareMedia({file:""});return 0}}if(idx===undefined||idx<0||idx>this.media.length-1){this.media.pop();resultIdx=this.media.length}else{this.media.splice(idx,1);resultIdx=idx}if(this.env.loading===false){this._promote("scheduleModified",this.getItemCount())}return resultIdx};this._prepareMedia=function(data){var ref=this,mediaFiles=[],qualities=[],extTypes={},typesModels={},priority=[],modelSets=[];result={},extRegEx=[];for(var i in $p.mmap){platforms=(typeof $p.mmap[i]["platform"]=="object")?$p.mmap[i]["platform"]:[$p.mmap[i]["platform"]];$.each(platforms,function(_na,platform){if(!ref._canPlay($p.mmap[i].type,platform,data.config.streamType||"http")){return true}$p.mmap[i].level=ref.config._platforms.indexOf(platform);$p.mmap[i].level=($p.mmap[i].level<0)?100:$p.mmap[i].level;extRegEx.push("."+$p.mmap[i].ext);if(!extTypes[$p.mmap[i].ext]){extTypes[$p.mmap[i].ext]=new Array()}extTypes[$p.mmap[i].ext].push($p.mmap[i]);if(!typesModels[$p.mmap[i].type]){typesModels[$p.mmap[i].type]=new Array()}typesModels[$p.mmap[i].type].push($p.mmap[i])})}extRegEx="^.*.("+extRegEx.join("|")+")$";if(typeof data.file=="string"){data.file=[{src:data.file}];if(typeof data.type=="string"){data.file=[{src:data.file,type:data.type}]
}}if($.isEmptyObject(data)||data.file===false||data.file===null){data.file=[{src:null}]}for(var index in data.file){if(index=="config"){continue}if(typeof data.file[index]=="string"){data.file[index]={src:data.file[index]}}if(data.file[index].src==null){continue}if(data.file[index].type!=null&&data.file[index].type!==""){try{var codecMatch=data.file[index].type.split(" ").join("").split(/[\;]codecs=.([a-zA-Z0-9\,]*)[\'|\"]/i);if(codecMatch[1]!==undefined){data.file[index].codec=codecMatch[1];data.file[index].type=codecMatch[0]}}catch(e){}}else{data.file[index].type=this._getTypeFromFileExtension(data.file[index].src)}if(typesModels[data.file[index].type]){typesModels[data.file[index].type].sort(function(a,b){return a.level-b.level});modelSets.push(typesModels[data.file[index].type][0])}}if(modelSets.length==0){modelSets=typesModels["none/none"]}else{modelSets.sort(function(a,b){return a.level-b.level});var bestMatch=modelSets[0].level;modelSets=$.grep(modelSets,function(value){return value.level==bestMatch})}var types=[];$.each(modelSets||[],function(){types.push(this.type)});var modelSet=(modelSets&&modelSets.length>0)?modelSets[0]:{type:"none/none",model:"NA",errorCode:11};types=$p.utils.unique(types);for(var index in data.file){if($.inArray(data.file[index].type,types)<0&&modelSet.type!="none/none"){continue}data.file[index].src=(!$.isEmptyObject(data.config)&&data.config.streamType=="http")?$p.utils.toAbsoluteURL(data.file[index].src):data.file[index].src;if((data.file[index].quality||null)==null){data.file[index].quality="default"}qualities.push(data.file[index].quality);mediaFiles.push(data.file[index])}var _setQual=[];$.each(this.getConfig("playbackQualities"),function(){_setQual.push(this.key||"default")});result={ID:data.config.id||$p.utils.randomId(8),type:"video/mp4",file:mediaFiles,qualities:$p.utils.intersect($p.utils.unique(_setQual),$p.utils.unique(qualities)),mediaModel:modelSet.model||"NA",errorCode:modelSet.errorCode||data.errorCode||7,config:data.config||{}};return result};this._modelUpdateListener=function(type,value){var ref=this;if(!this.playerModel.init){return}if(type!="time"&&type!="progress"){$p.utils.log("Update: '"+type,this.playerModel.getSrc(),this.playerModel.getModelName(),value)}switch(type){case"state":this._promote("state",value);switch(value){case"IDLE":break;case"AWAKENING":var modelRef=this.playerModel;this._syncPlugins(function(){if(modelRef.getState("AWAKENING")){modelRef.displayItem(true)}});break;case"BUFFERING":case"PLAYING":break;case"ERROR":this._addGUIListeners();this._promote("error",{});break;case"STOPPED":this._promote("stopped",{});break;case"PAUSED":if(this.getConfig("disablePause")===true){this.playerModel.applyCommand("play",0)}break;case"COMPLETED":if(this._currentItem+1>=this.media.length&&!this.getConfig("loop")){this.setFullscreen(false);this._promote("done",{})}this.setActiveItem("next");break}break;case"buffer":this._promote("buffer",value);break;case"modelReady":this._promote("item",ref._currentItem);break;case"displayReady":this._promote("displayReady",true);var modelRef=this.playerModel;this._syncPlugins(function(){ref._promote("ready");ref._addGUIListeners();if(!modelRef.getState("IDLE")){modelRef.start()}});break;case"qualityChange":this.setConfig({playbackQuality:value});this._promote("qualityChange",value);break;case"FFreinit":break;case"seek":this._promote("seek",value);break;case"volume":this.setConfig({volume:value});this._promote("volume",value);if(value<=0){this.env.muted=true;this._promote("mute",value)}else{if(this.env.muted==true){this.env.muted=false;this._promote("unmute",value)}}break;case"playlist":this.setFile(value.file,value.type);break;case"config":this.setConfig(value);break;case"scaled":if(this.env.autoSize===true){this.env.playerDom.css({height:value.realHeight+"px",width:value.realWidth+"px"});this._promote("resize",value);this.env.autoSize=false;break}this._promote("scaled",value);break;default:this._promote(type,value);break}};this._syncPlugins=function(callback){var ref=this;this.env.loading=true;(function(){try{if(ref._plugins.length>0){for(var i=0;i<ref._plugins.length;i++){if(!ref._plugins[i].isReady()){setTimeout(arguments.callee,50);return}}}ref.env.loading=false;ref._promote("pluginsReady",{});try{callback()}catch(e){}}catch(e){}})()};this._MD=function(event){projekktor("#"+event.currentTarget.id.replace("_media",""))._displayMousedownListener(event)};this._addGUIListeners=function(){var ref=this;this._removeGUIListeners();if(this.getDC().get(0).addEventListener){this.getDC().get(0).addEventListener("mousedown",this._MD,true)}else{this.getDC().mousedown(function(event){ref._displayMousedownListener(event)})}this.getDC().mousemove(function(event){ref._displayMousemoveListener(event)}).mouseenter(function(event){ref._displayMouseEnterListener(event)}).mouseleave(function(event){ref._displayMouseLeaveListener(event)});$(window).bind("resize.projekktor"+this.getId(),function(){ref.playerModel.applyCommand("resize")}).bind("touchstart",function(){ref._windowTouchListener(event)
});if(this.config.enableKeyboard===true){$(document.documentElement).unbind("keydown.pp"+this._id);$(document.documentElement).bind("keydown.pp"+this._id,function(evt){ref._keyListener(evt)})}};this._removeGUIListeners=function(){$("#"+this.getId()).unbind();this.getDC().unbind();if(this.getDC().get(0).removeEventListener){this.getDC().get(0).removeEventListener("mousedown",this._MD,true)}else{this.getDC().get(0).detachEvent("onmousedown",this._MD)}$(window).unbind("resize.projekktor"+this.getId())};this._registerPlugins=function(){var plugins=$.merge($.merge([],this.config._plugins),this.config._addplugins);if(this._plugins.length>0){return}if(plugins.length==0){return}for(var i=0;i<plugins.length;i++){var pluginName="projekktor"+plugins[i].charAt(0).toUpperCase()+plugins[i].slice(1);try{typeof eval(pluginName)}catch(e){continue}var pluginObj=$.extend(true,{},new projekktorPluginInterface(),eval(pluginName).prototype);pluginObj.name=plugins[i].toLowerCase();pluginObj.pp=this;pluginObj.playerDom=this.env.playerDom;pluginObj._init(this.config["plugin_"+plugins[i].toLowerCase()]||{});this._plugins.push(pluginObj)}};this.removePlugin=function(rmvPl){if(this._plugins.length==0){return}var pluginsToRemove=rmvPl||$.merge($.merge([],this.config._plugins),this.config._addplugins),pluginsRegistered=this._plugins.length;for(var j=0;j<pluginsToRemove.length;j++){for(var k=0;k<pluginsRegistered;k++){if(this._plugins[k]!=undefined){if(this._plugins[k].name==pluginsToRemove[j].toLowerCase()){this._plugins[k].deconstruct();this._plugins.splice(k,1)}}}}};this._promote=function(evt,value){var event=evt,pluginData={};if(typeof event=="object"){if(!event._plugin){return}value.PLUGIN=event._plugin+"";value.EVENT=event._event+"";event="pluginevent"}if(event!="time"&&event!="progress"&&event!="mousemove"){$p.utils.log("Event: ["+event+"]",value)}if(this._plugins.length>0){for(var i in this._plugins){try{this._plugins[i][event+"Handler"](value,this)}catch(e){}try{this._plugins[i]["eventHandler"](event,value,this)}catch(e){}}}if(this.listeners.length>0){for(var i in this.listeners){try{if(this.listeners[i]["event"]==event||this.listeners[i]["event"]=="*"){this.listeners[i]["callback"](value,this)}}catch(e){}}}};this._detachplayerModel=function(){this._removeGUIListeners();try{this.playerModel.destroy();this._promote("detach",{})}catch(e){}};this._displayMousedownListener=function(evt){if(!this.env.mouseIsOver){return false}if("TEXTAREA|INPUT".indexOf(evt.target.tagName.toUpperCase())>-1){return false}switch(evt.which){case 1:this._promote("leftclick",evt);return true;case 2:this._promote("middleclick",evt);return false;case 3:if($(evt.target).hasClass("context")){break}evt.stopPropagation();evt.preventDefault();$(document).bind("contextmenu",function(evt){$(document).unbind("contextmenu");return false});this._promote("rightclick",evt);return false}};this._displayMousemoveListener=function(evt){if("|TEXTAREA|INPUT".indexOf("|"+evt.target.tagName.toUpperCase())>-1){this.env.mouseIsOver=false;return}this.env.mouseIsOver=true;this._promote("mousemove",{});evt.stopPropagation()};this._windowTouchListener=function(evt){if(evt.touches){if(evt.touches.length>0){if(($(document.elementFromPoint(evt.touches[0].pageX,evt.touches[0].pageY)).attr("id")||"").indexOf(this.getDC().attr("id"))==0){if(this.env.mouseIsOver==false){this._promote("mouseenter",{})}this.env.mouseIsOver=true;this._promote("mousemove",{});evt.stopPropagation()}else{if(this.env.mouseIsOver){this._promote("mouseleave",{});this.env.mouseIsOver=false}}}}};this._displayMouseEnterListener=function(evt){this._promote("mouseenter",{});this.env.mouseIsOver=true;evt.stopPropagation()};this._displayMouseLeaveListener=function(evt){this._promote("mouseleave",{});this.env.mouseIsOver=false;evt.stopPropagation()};this._keyListener=function(evt){if(!this.env.mouseIsOver){return}evt.stopPropagation();evt.preventDefault();$p.utils.log("Keypress: "+evt.keyCode);this._promote("key",evt);switch(evt.keyCode){case 32:this.setPlayPause();break;case 27:this.setFullscreen(false);break;case 13:this.setFullscreen(true);break;case 39:this.setPlayhead("+5");break;case 37:this.setPlayhead("-5");break;case 38:this.setVolume("+5");break;case 40:this.setVolume("-5");break;case 123:break;case 68:this.setDebug();break}};this._enterFullViewport=function(forcePlayer,addClass){var win=this.getIframeWindow()||$(window),target=this.getIframe()||this.getDC();if(forcePlayer){win=$(window);target=this.getDC()}target.data("fsdata",{scrollTop:win.scrollTop(),scrollLeft:win.scrollLeft(),targetStyle:target.attr("style"),bodyOverflow:$(win[0].document.body).css("overflow"),iframeWidth:target.attr("width")||0,iframeHeight:target.attr("height")||0});win.scrollTop(0).scrollLeft(0);$(win[0].document.body).css("overflow","hidden");target.css({position:"absolute",display:"block",top:0,left:0,width:"100%",height:"100%",zIndex:9999,margin:0,padding:0});if(addClass!==false){this.getDC().addClass("fullscreen")}return target};this._exitFullViewport=function(forcePlayer){var win=this.getIframeWindow()||$(window),target=this.getIframe()||this.getDC();
if(forcePlayer){win=$(window);target=this.getDC()}var fsData=target.data("fsdata")||{};win.scrollTop(fsData.scrollTop).scrollLeft(fsData.scrollLef);$(win[0].document.body).css("overflow",fsData.bodyOverflow);if(fsData.iframeWidth>0&&!forcePlayer){target.attr("width",fsData.iframeWidth+"px");target.attr("height",fsData.iframeHeight+"px")}target.attr("style",(fsData.targetStyle==null)?"":fsData.targetStyle);this.getDC().removeClass("fullscreen");return(this.getIframe())?parent.window.document:document};this.getPlayerVer=function(){return this.config._version};this.getItemConfig=function(name,itemIdx){return this.getConfig(name,itemIdx)};this.getConfig=function(name,itemIdx){var idx=itemIdx||this._currentItem,result=this.config["_"+name]||this.config[name]||null;if($.inArray(name,this._persCfg)>-1){if(this._cookie(name)!==null){result=this._cookie(name)}}if(this.config["_"+name]==undefined){try{if(this.media[idx]["config"][name]!==undefined){result=this.media[idx]["config"][name]}}catch(e){}}if(name.indexOf("plugin_")>-1){try{if(this.media[idx]["config"][name]){result=$.extend(true,{},this.config[name],this.media[idx]["config"][name])}}catch(e){}}if(result==null){return null}if(typeof result=="object"&&result.length===null){result=$.extend(true,{},result||{})}else{if(typeof result=="object"){result=$.extend(true,[],result||[])}}if(typeof result=="string"){switch(result){case"true":result=true;break;case"false":result=false;break;case"NaN":case"undefined":case"null":result=null;break}}return result};this.getDC=function(){return this.env.playerDom};this.getState=function(isThis){var result=null;try{result=this.playerModel.getState()}catch(e){result="IDLE"}if(isThis!=null){return(result==isThis.toUpperCase())}return result};this.getLoadProgress=function(){try{return this.playerModel.getLoadProgress()}catch(e){return 0}};this.getKbPerSec=function(){try{return this.playerModel.getKbPerSec()}catch(e){return 0}};this.getItemCount=function(){return(this.media.length==1&&this.media[0].mediaModel=="na")?0:this.media.length};this.getItemId=function(idx){return this.media[idx||this._currentItem].ID||null};this.getItemIdx=function(){return this._currentItem};this.getPlaylist=function(){return this.getItem("*")};this.getItem=function(){if(this.media.length==1&&this.media[0].mediaModel=="na"){return[]}switch(arguments[0]||"current"){case"next":return $.extend(true,[],this.media[this._currentItem+1]);case"prev":return $.extend(true,[],this.media[this._currentItem-1]);case"current":return $.extend(true,[],this.media[this._currentItem]);case"*":return $.extend(true,[],this.media);default:return $.extend(true,[],this.media[arguments[0]||this._currentItem])}};this.getVolume=function(){return(this.getConfig("fixedVolume")===true)?this.config.volume:this.getConfig("volume")};this.getTrackId=function(){if(this.getConfig("trackId")){return this.config.trackId}if(this._playlistServer!=null){return"pl"+this._currentItem}return null};this.getLoadPlaybackProgress=function(){try{return this.playerModel.getLoadPlaybackProgress()}catch(e){return 0}};this.getDuration=function(){try{return this.playerModel.getDuration()}catch(e){return 0}};this.getPosition=function(){try{return this.playerModel.getPosition()||0}catch(e){return 0}};this.getMaxPosition=function(){try{return this.playerModel.getMaxPosition()||0}catch(e){return 0}};this.getTimeLeft=function(){try{return this.playerModel.getDuration()-this.playerModel.getPosition()}catch(e){return this.media[this._currentItem].duration}};this.getInFullscreen=function(){return this.getNativeFullscreenSupport().isFullScreen()};this.getMediaContainer=function(){if(this.env.mediaContainer==null){this.env.mediaContainer=$("#"+this.getMediaId())}if(this.env.mediaContainer.length==0){if(this.env.playerDom.find("."+this.config._cssClassPrefix+"display").length>0){this.env.mediaContainer=$(document.createElement("div")).attr({id:this.getId()+"_media"}).css({overflow:"hidden",height:"100%",width:"100%",top:0,left:0,padding:0,margin:0,display:"block"}).appendTo(this.env.playerDom.find("."+this.config._cssClassPrefix+"display"))}else{this.env.mediaContainer=$(document.createElement("div")).attr({id:this.getMediaId()}).css({width:"1px",height:"1px"}).appendTo($(document.body))}}return this.env.mediaContainer};this.getMediaId=function(){return this.getId()+"_media"};this.getMediaType=function(){return this.media[this._currentItem].type};this.getUsesFlash=function(){return(this.playerModel.flashVersion!=false)};this.getModel=function(){try{return this.media[this._currentItem].mediaModel.toUpperCase()}catch(e){return"NA"}};this.getIframeWindow=function(){try{var result=parent.location.host||false;return(result===false)?false:$(parent.window)}catch(e){return false}};this.getIframe=function(){try{var result=window.$(frameElement)||[];return(result.length==0)?false:result}catch(e){return false}};this.getPlaybackQuality=function(){return this.playerModel.getPlaybackQuality()||this.getAppropriateQuality()};this.getPlaybackQualities=function(){try{return $.extend(true,[],this.media[this._currentItem].qualities||[])
}catch(e){return[]}};this.getFlashVersion=function(typ){try{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");try{axo.AllowScriptAccess="always"}catch(e){return"6,0,0"}}catch(e){}return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1].match(/\d+/g)[0]}catch(e){try{if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){return(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1].match(/\d+/g)[0]}}catch(e){}}return 0};this.getAndroidVersion=function(type){var agent=navigator.userAgent.toLowerCase();try{return parseInt(agent.match(/android\s+(([\d\.]+))?/)[1])}catch(e){return 0}};this.getIosVersion=function(type){var agent=navigator.userAgent.toLowerCase(),start=agent.indexOf("os ");if((agent.indexOf("iphone")>-1||agent.indexOf("ipad")>-1)&&start>-1){return parseInt(agent.substr(start+3,3).replace("_","."))}return 0};this.getNativeVersion=function(type){if(type=="*"){return(this.getCanPlayNatively())?1:0}try{var testObject=document.createElement((type.indexOf("video")>-1)?"video":"audio");if(testObject.canPlayType!=false){switch(testObject.canPlayType(type)){case"no":case"":break;case"maybe":if($.browser.opera){if($.browser.version.slice(0,2)<11){break}}case"probably":default:return 1}}}catch(e){return 0}};this.getBrowserVersion=function(type){return 1};this.getIsMobileClient=function(what){var uagent=navigator.userAgent.toLowerCase();var mobileAgents=["android","windows ce","blackberry","palm","mobile"];for(var i=0;i<mobileAgents.length;i++){if(uagent.indexOf(mobileAgents[i])>-1){return(what)?(mobileAgents[i].toUpperCase()==what.toUpperCase()):true}}return false};this.getCanPlay=function(type,platform,streamType){return this._canPlay(type,platform,streamType)};this.getCanPlayNatively=function(type){return this._canPlay(type,"NATIVE")};this._canPlay=function(type,platform,streamType){var ref=this,checkIn=[],checkFor=[],st=streamType||"http",pltfrm=(typeof platform=="object")?platform:[platform];if(this._compTableCache==false){this._compTableCache=this._testMediaSupport()}$.each(pltfrm,function(key,plt){if(plt!=null){plt=plt.toUpperCase()}$.each(ref._compTableCache[st]||[],function(key,val){if(plt!=null){if(key!=plt){return true}}checkIn=$.merge(checkIn,this)})});if(checkIn.length==0){return false}switch(typeof type){case"undefined":if(checkIn.length>0){return true}case"string":if(type=="*"){return checkIn}checkFor.push(type);break;case"array":checkFor=type;break}for(var i in checkFor){if($.inArray(checkFor[i],checkIn)>-1){return true}}return false};this.getPlatforms=function(){var result=[],plt=this.getConfig("platforms");for(var i=0;i<plt.length;i++){var capped=$p.utils.capitalise(plt[i].toUpperCase());try{if(this["get"+capped+"Version"]("*")>0){if(this.getConfig("enable"+capped+"Platform")===false){continue}result.push(capped)}}catch(e){}}return result};this.getNativeFullscreenSupport=function(){var ref=this,fullScreenApi={supportsFullScreen:"semi",isFullScreen:function(){try{return ref.getDC().hasClass("fullscreen")}catch(e){return false}},requestFullScreen:function(){ref._enterFullViewport();ref.playerModel.applyCommand("fullscreen",true)},cancelFullScreen:function(){ref._exitFullViewport();ref.playerModel.applyCommand("fullscreen",false)},prefix:"",ref:this},browserPrefixes="webkit moz o ms khtml".split(" ");if(typeof document.cancelFullScreen!="undefined"){fullScreenApi.supportsFullScreen=true}else{for(var i=0,il=browserPrefixes.length;i<il;i++){fullScreenApi.prefix=browserPrefixes[i];if(typeof document.createElement("video")[fullScreenApi.prefix+"EnterFullscreen"]!="undefined"){fullScreenApi.supportsFullScreen="media"}if(typeof document[fullScreenApi.prefix+"CancelFullScreen"]!="undefined"){fullScreenApi.supportsFullScreen="dom";if(fullScreenApi.prefix=="moz"&&typeof document[fullScreenApi.prefix+"FullScreenEnabled"]=="undefined"){fullScreenApi.supportsFullScreen=false}}if(fullScreenApi.supportsFullScreen!==false&&fullScreenApi.supportsFullScreen!=="semi"){break}}}if(fullScreenApi.supportsFullScreen=="semi"){return fullScreenApi}fullScreenApi.isFullScreen=function(){var dest=(ref.getIframe())?parent.window.document:document;switch(this.prefix){case"":return dest.fullScreen;case"webkit":return dest.webkitIsFullScreen;default:return dest[this.prefix+"FullScreen"]}};if(fullScreenApi.supportsFullScreen=="dom"){fullScreenApi.requestFullScreen=function(){if(this.isFullScreen()){return}var target=ref._enterFullViewport(),apiRef=this,dest=(ref.getIframe())?parent.window.document:document;$(dest).unbind(this.prefix+"fullscreenchange.projekktor");$(dest).bind(this.prefix+"fullscreenchange.projekktor",function(evt){$(evt.target).unbind(this.prefix+"fullscreenchange.projekktor");if(!apiRef.isFullScreen()){apiRef.ref._exitFullViewport();apiRef.ref.playerModel.applyCommand("fullscreen",false)}else{apiRef.ref.playerModel.applyCommand("fullscreen",apiRef.isFullScreen())
}});if(this.prefix===""){target.get(0).requestFullScreen()}else{target.get(0)[this.prefix+"RequestFullScreen"]()}};fullScreenApi.cancelFullScreen=function(){$((ref.getIframe())?parent.window.document:document).unbind(this.prefix+"fullscreenchange.projekktor");var target=ref._exitFullViewport();if(this.prefix===""){target.cancelFullScreen()}else{target[this.prefix+"CancelFullScreen"]()}ref.playerModel.applyCommand("fullscreen",false)};return fullScreenApi}fullScreenApi.requestFullScreen=function(el){ref.playerModel.getMediaElement().get(0)[this.prefix+"EnterFullscreen"]()};fullScreenApi.dest={};fullScreenApi.cancelFullScreen=function(){};return fullScreenApi};this.getId=function(){return this._id};this.getHasGUI=function(){try{return this.playerModel.getHasGUI()}catch(e){return false}};this.getCssPrefix=function(){return this.config._cssClassPrefix};this.getPlayerDimensions=function(){return{width:this.config._width,height:this.config._height}};this.getMediaDimensions=function(){return{width:this.config._width,height:this.config._height}};this.getAppropriateQuality=function(){if(this.media.length==0){return[]}var wid=this.env.playerDom.width(),hei=this.env.playerDom.height(),ratio=$p.utils.roundNumber(wid/hei,2),quals=this.media[this._currentItem].qualities||[],temp={};$.each(this.getConfig("playbackQualities")||[],function(){if($.inArray(this.key,quals)<0){return true}if((this.minHeight||0)>hei&&temp.minHeight<=hei){return true}if((temp.minHeight||0)>this.minHeight){return true}if(typeof this.minWidth=="number"){if(this.minWidth===0&&this.minHeight>hei){return true}if(this.minWidth>wid){return true}temp=this}else{if(typeof this.minWidth=="object"){var ref=this;$.each(this.minWidth,function(){if((this.ratio||100)>ratio){return true}if(this.minWidth>wid){return true}temp=ref;return true})}}return true});return temp.key||"default"};this.getFromUrl=function(url,dest,callback,customParser,dataType){var data=null,ref=this;if(dest==ref&&callback=="_reelUpdate"){this._promote("scheduleLoading",1+this.getItemCount())}if(callback.substr(0,1)!="_"){window[callback]=function(data){try{delete window[callback]}catch(e){}dest[callback](data)}}else{if(dataType.indexOf("jsonp")>-1){this["_jsonp"+callback]=function(data){dest[callback](data)}}}if(dataType){if($.parseJSON==undefined&&dataType.indexOf("json")>-1){this._raiseError("Projekktor requires at least jQuery 1.4.2 in order to handle JSON playlists.");return this}dataType=(dataType.indexOf("/")>-1)?dataType.split("/")[1]:dataType}$.ajax({url:url,complete:function(xhr,status){if(dataType==undefined){try{if(xhr.getResponseHeader("Content-Type").indexOf("xml")>-1){dataType="xml"}if(xhr.getResponseHeader("Content-Type").indexOf("json")>-1){dataType="json"}if(xhr.getResponseHeader("Content-Type").indexOf("html")>-1){dataType="html"}}catch(e){}}data=$p.utils.cleanResponse(xhr.responseText,dataType);try{data=customParser(data,xhr.responseText)}catch(e){}if(status!="error"&&dataType!="jsonp"){try{dest[callback](data)}catch(e){}}},error:function(data){if(dest[callback]&&dataType!="jsonp"){dest[callback](false)}},cache:true,async:!this.getIsMobileClient(),dataType:dataType,jsonpCallback:(callback.substr(0,1)!="_")?false:"projekktor('"+this.getId()+"')._jsonp"+callback,jsonp:(callback.substr(0,1)!="_")?false:"callback"});return this};this.setActiveItem=function(mixedData){var newItem=0,lastItem=this._currentItem,ref=this;if(typeof mixedData=="string"){switch(mixedData){case"previous":if(this.getConfig("disallowSkip")==true&&!this.getState("COMPLETED")){return this}newItem=this._currentItem-1;break;case"next":if(this.getConfig("disallowSkip")==true&&!this.getState("COMPLETED")){return this}newItem=this._currentItem+1;break;default:case"poster":result=0;break}}else{if(typeof mixedData=="number"){newItem=parseInt(mixedData)}else{newItem=0}}if(newItem!=this._currentItem){if(this.getConfig("disallowSkip")==true&&(this.getState("PLAYING")||this.getState("PAUSED"))){return this}}this._detachplayerModel();this.env.loading=false;var ap=false;if(newItem===0&&(lastItem==null||lastItem==newItem)&&(this.config._autoplay===true||"DESTROYING|AWAKENING".indexOf(this.getState())>-1)){ap=true}else{if(this.getItemCount()>1&&newItem!=lastItem&&lastItem!=null&&this.config._continuous===true&&newItem<this.getItemCount()){ap=true}}if(newItem>=this.getItemCount()||newItem<0){ap=this.config._loop;newItem=0}this._currentItem=newItem;var wasFullscreen=this.getInFullscreen();this.getDC().attr("class",this.env.className);if(wasFullscreen){this.getDC().addClass("fullscreen")}var newModel=this.media[this._currentItem].mediaModel.toUpperCase();if(!$p.models[newModel]){newModel="NA";this.media[this._currentItem].mediaModel=newModel;this.media[this._currentItem].errorCode=8}else{if(this.getConfig("className")!=null){this.getDC().addClass(this.getConfig("cssClassPrefix")+this.getConfig("className"))}this.getDC().addClass(this.getConfig("cssClassPrefix")+(this.getConfig("streamType")||"http"))}this.playerModel=new playerModel();
$.extend(this.playerModel,$p.models[newModel].prototype);this._promote("syncing","display");this._enqueue(function(){try{ref._applyCuePoints()}catch(e){}});this.playerModel._init({media:$.extend(true,{},this.media[this._currentItem]),model:newModel,pp:this,environment:$.extend(true,{},this.env),autoplay:ap,quality:this.getAppropriateQuality()});return this};this.getIsLastItem=function(){return((this._currentItem==this.media.length-1)&&this.config._loop!==true)};this.getIsFirstItem=function(){return((this._currentItem==0)&&this.config._loop!==true)};this.setPlay=function(){this._enqueue("play",false);return this};this.setPause=function(){this._enqueue("pause",false);return this};this.setStop=function(toZero){var ref=this;if(this.getState("IDLE")){return this}if(toZero){this._enqueue(function(){ref._currentItem=0;ref.setActiveItem(0)})}else{this._enqueue("stop",false)}return this};this.setPlayPause=function(){if(!this.getState("PLAYING")){this.setPlay()}else{this.setPause()}return this};this.setVolume=function(vol,fadeDelay){if(this.getConfig("fixedVolume")==true){return this}var initalVolume=this.getVolume();if(typeof vol=="string"){var dir=vol.substr(0,1);vol=parseFloat(vol.substr(1));vol=(vol>1)?vol/100:vol;if(dir=="+"){vol=this.getVolume()+vol}else{if(dir=="-"){vol=this.getVolume()-vol}else{vol=this.getVolume()}}}if(typeof vol=="number"){vol=(vol>1)?1:vol;vol=(vol<0)?0:vol}else{return this}if(vol>initalVolume&&fadeDelay){if(vol-initalVolume>0.03){for(var i=initalVolume;i<=vol;i=i+0.03){this._enqueue("volume",i,fadeDelay)}this._enqueue("volume",vol,fadeDelay);return this}}else{if(vol<initalVolume&&fadeDelay){if(initalVolume-vol>0.03){for(var i=initalVolume;i>=vol;i=i-0.03){this._enqueue("volume",i,fadeDelay)}this._enqueue("volume",vol,fadeDelay);return this}}}this._enqueue("volume",vol);return this};this.setPlayhead=function(position){if(this.getConfig("disallowSkip")==true){return this}if(typeof position=="string"){var dir=position.substr(0,1);position=parseFloat(position.substr(1));if(dir=="+"){position=this.getPosition()+position}else{if(dir=="-"){position=this.getPosition()-position}else{position=this.getPosition()}}}if(typeof position=="number"){this._enqueue("seek",position)}return this};this.setPlayerPoster=function(url){var ref=this;this._enqueue(function(){ref.setConfig({poster:url},0)});this._enqueue(function(){ref.playerModel.setPosterLive()});return this};this.setItemConfig=function(){return this.setConfig(arguments)};this.setConfig=function(){var ref=this,args=arguments;this._enqueue(function(){ref._setConfig(args[0]||null,args[1]||null)});return this};this._setConfig=function(){if(!arguments.length){return result}var confObj=arguments[0],dest="*",value=false;if(typeof confObj!="object"){return this}if(arguments[1]=="string"||arguments[1]=="number"){dest=arguments[1]}else{dest=this._currentItem}for(var i in confObj){if($.inArray(i,this._persCfg)>-1){this._cookie(i,(typeof confObj[i]=="string")?confObj[i]:eval(confObj[i]))}if(this.config["_"+i]!=null){continue}try{value=eval(confObj[i])}catch(e){value=confObj[i]}if(dest=="*"){$.each(this.media,function(){if(this.config==null){this.config={}}this.config[i]=value});continue}if(this.media[dest]==undefined){return this}if(this.media[dest]["config"]==null){this.media[dest]["config"]={}}this.media[dest]["config"][i]=value}return this};this.setFullscreen=function(goFull){if(this.getConfig("isCrossDomain")){return this}var nativeFullscreen=this.getNativeFullscreenSupport(),ref=this;goFull=(goFull==null)?!nativeFullscreen.isFullScreen():goFull;if(goFull==nativeFullscreen.isFullScreen()){return this}if(goFull==true){nativeFullscreen.requestFullScreen()}else{nativeFullscreen.cancelFullScreen()}return this};this.setResize=function(){this._modelUpdateListener("resize");return this};this.setSize=function(data){var w=data.width||this.config._width,h=data.height||this.config._height;if(w.indexOf("px")==-1&&w.indexOf("%")==-1){data.width+="px"}if(h.indexOf("px")==-1&&h.indexOf("%")==-1){data.height+="px"}this.getDC().css({width:data.width,height:data.height});this.config._width=this.getDC().width();this.config._height=this.getDC().height();this._modelUpdateListener("resize")};this.setLoop=function(value){this.config._loop=value||!this.config._loop};this.setDebug=function(value){$p.utils.logging=value||!$p.utils.logging;if($p.utils.logging){$p.utils.log("DEBUG MODE for player #"+this.getId())}};this.addListener=function(evt,callback){var ref=this;this._enqueue(function(){ref._addListener(evt,callback)});return this};this._addListener=function(evt,callback){var listenerObj={event:evt,callback:callback};this.listeners.push(listenerObj);return this};this.removeListener=function(evt,callback){var len=this.listeners.length;for(var i=0;i<len;i++){if(this.listeners[i]==undefined){continue}if(this.listeners[i].event!=evt&&evt!=="*"){continue}if(this.listeners[i].callback!=callback&&callback!=null){continue}this.listeners.splice(i,1)}return this};this.setItem=function(){var itemData=arguments[0];
var affectedIdx=0;this._clearqueue();if(this.env.loading===true){}if(itemData==null){affectedIdx=this._removeItem(arguments[1]);if(affectedIdx===this._currentItem){this.setActiveItem("previous")}}else{affectedIdx=this._addItem(this._prepareMedia({file:itemData,config:itemData.config||{}}),arguments[1],arguments[2]);if(affectedIdx===this._currentItem){this.setActiveItem(this._currentItem)}}return this};this.setFile=function(){var fileNameOrObject=arguments[0]||"",dataType=arguments[1]||this._getTypeFromFileExtension(fileNameOrObject),result=[];if(this.env.loading===true){return this}this._clearqueue();this.env.loading=true;this._detachplayerModel();if(typeof fileNameOrObject=="object"){$p.utils.log("Applying incoming JS Object",fileNameOrObject);this._reelUpdate(fileNameOrObject);return this}result[0]={};result[0].file={};result[0].file.src=fileNameOrObject||"";result[0].file.type=dataType||this._getTypeFromFileExtension(splt[0]);if(result[0].file.type.indexOf("/xml")>-1||result[0].file.type.indexOf("/json")>-1){$p.utils.log("Loading external data from "+result[0].file.src+" supposed to be "+result[0].file.type);this._playlistServer=result[0].file.src;this.getFromUrl(result[0].file.src,this,"_reelUpdate",this.getConfig("reelParser"),result[0].file.type);return this}$p.utils.log("Applying incoming single file:"+result[0].file.src,result);this._reelUpdate(result);return this};this.setPlaybackQuality=function(quality){var qual=quality||this.getAppropriateQuality();if($.inArray(qual,this.media[this._currentItem].qualities||[])>-1){this.playerModel.applyCommand("quality",qual)}return this};this.openUrl=function(cfg){cfg=cfg||{url:"",target:"",pause:false};if(cfg.url==""){return}if(cfg.pause===true){this.setPause()}window.open(cfg.url,cfg.target).focus();return this};this.selfDestruct=function(){var ref=this;this._enqueue(function(){ref._selfDestruct()});return this},this._selfDestruct=function(){var ref=this;$(this).unbind();this.removePlugin();this.playerModel.destroy();this._removeGUIListeners();this.env.playerDom.replaceWith($(this.env.srcNode).clone());$.each(projekktors,function(idx){try{if(this.getId()==ref.getId()||this.getId()==ref.getId()||this.getParent()==ref.getId()){projekktors.splice(idx,1);return}}catch(e){}});return this};this.reset=function(){var ref=this;this._clearqueue();this._enqueue(function(){ref._reset()});return this},this._reset=function(){var cleanConfig={},ref=this;$(this).unbind();this.setFullscreen(false);this.removePlugin();this._removeGUIListeners();this.env.mediaContainer=null;for(var i in this.config){cleanConfig[(i.substr(0,1)=="_")?i.substr(1):i]=this.config[i]}if(typeof this.env.onReady==="function"){this._enqueue(ref.env.onReady(ref))}this._init(this.env.playerDom,cleanConfig);return this},this.setCuePoint=function(obj){var item=(obj.item!==undefined)?obj.item:this.getItemIdx(),ref=this,cuePoint={id:obj.id||$p.utils.randomId(8),group:obj.group||$p.utils.randomId(8),item:item,on:$p.utils.toSeconds(obj.on)||0,off:$p.utils.toSeconds(obj.off)||$p.utils.toSeconds(obj.on)||0,value:obj.value||null,callback:obj.callback||function(){},precision:(obj.precision==null)?0:obj.precision,_listeners:[],_unlocked:false,_active:false,_lastTime:0,isAvailable:function(){return this._unlocked},_stateListener:function(state,player){if(state=="STOPPED"){if(this._active){this.callback(false,this,player)}this._active=false}},_timeListener:function(time,player){var timeIdx=(this.precision==0)?Math.round(time):$p.utils.roundNumber(time,this.precision),ref=this;if(this._unlocked===false){var approxMaxTimeLoaded=player.getDuration()*player.getLoadProgress()/100;if(this.on<=approxMaxTimeLoaded){$.each(this._listeners.unlock||[],function(){this(ref,player)});this._unlocked=true}else{return}}if(this._lastTime==timeIdx){return}var nat=(timeIdx-this._lastTime<=1&&timeIdx-this._lastTime>0);if(((timeIdx>=this.on&&timeIdx<=this.off)||(timeIdx>=this.on&&this.on==this.off&&timeIdx<=this.on+1))&&this._active!==true){this._active=true;$p.utils.log("Cue Point: [ON "+this.on+"] at "+timeIdx,this);try{this.callback({enabled:true,value:this.value,seeked:!nat,player:player})}catch(e){}}else{if((timeIdx<this.on||timeIdx>this.off)&&this.off!=this.on&&this._active==true){this._active=false;$p.utils.log("Cue Point: [OFF] at "+this.off,this);try{this.callback({enabled:false,value:this.value,seeked:!nat,player:player})}catch(e){}}else{if(this.off==this.on&&this._active&&new Number(timeIdx-this.on).toPrecision(this.precision)>1){this._active=false}}}this._lastTime=timeIdx},addListener:function(event,func){if(this._listeners[event]==null){this._listeners[event]=[]}this._listeners[event].push(func||function(){})}};if(obj.unlockCallback!=null){cuePoint.addListener("unlock",obj.unlockCallback)}if(this._cuePoints[item]==null){this._cuePoints[item]=[]}this._cuePoints[item].push(cuePoint);return this},this.getCuePoints=function(idx){return $.extend({},this._cuePoints[idx||this._currentItem],this._cuePoints["*"])},this.getCuePointById=function(id,idx){var result=false;
$.each(this.getCuePoints(idx),function(){if(this.id==id){result=this}});return result},this.removeCuePoint=function(group,idx){var cuePoints=this.getCuePoints(idx)||[];if(cuePoints.length==0){return}for(var j=0;j<cuePoints.length;j++){if(cuePoints[j].group===group){this.removeListener("time",cuePoints[j].timeEventHandler);this.removeListener("state",cuePoints[j].stateEventHandler);cuePoints.splice(j,1)}}},this._applyCuePoints=function(){var ref=this;if(this._cuePoints[this._currentItem]==null&&this._cuePoints["*"]==null){return}$.each($.merge(this._cuePoints[this._currentItem]||[],this._cuePoints["*"]||[]),function(key,cuePointObj){cuePointObj.timeEventHandler=function(time,player){try{cuePointObj._timeListener(time,player)}catch(e){}},cuePointObj.stateEventHandler=function(state,player){try{cuePointObj._stateListener(state,player)}catch(e){}},ref.addListener("time",cuePointObj.timeEventHandler);ref.addListener("state",cuePointObj.stateEventHandler);ref.addListener("item",function(){ref.removeListener("time",cuePointObj.timeEventHandler);ref.removeListener("state",cuePointObj.stateEventHandler)})})},this._enqueue=function(command,params,delay){if(command==null){return}this._queue.push({command:command,params:params,delay:delay});this._processQueue()};this._clearqueue=function(command,params){if(this._isReady!==true){return}this._queue=[]};this._processQueue=function(){var ref=this,modelReady=false;if(this._processing===true){return}if(this.env.loading===true){return}this._processing=true;(function(){try{modelReady=ref.playerModel.getIsReady()}catch(e){}if(ref.env.loading!==true&&modelReady){try{var msg=ref._queue.shift();if(msg!=null){if(typeof msg.command=="string"){if(msg.delay>0){setTimeout(function(){ref.playerModel.applyCommand(msg.command,msg.params)},msg.delay)}else{ref.playerModel.applyCommand(msg.command,msg.params)}}else{msg.command(ref)}}}catch(e){}if(ref._queue.length==0){if(ref._isReady===false){ref._isReady=true}ref._processing=false;return}arguments.callee();return}setTimeout(arguments.callee,100)})()};this._cookie=function(key,value){if(document.cookie===undefined){return null}if(document.cookie===false){return null}if(key==null){return null}if(arguments.length>1&&(value===null||typeof value!=="object")){var t=new Date();t.setDate(t.getDate()+this.config._cookieExpiry);return(document.cookie=encodeURIComponent(this.config._cookieName+"_"+key)+"="+encodeURIComponent(value)+"; expires="+t.toUTCString()+"; path=/")}var result,returnthis=(result=new RegExp("(?:^|; )"+encodeURIComponent(this.config._cookieName+"_"+key)+"=([^;]*)").exec(document.cookie))?decodeURIComponent(result[1]):null;return(returnthis=="true"||returnthis=="false")?eval(returnthis):returnthis};this._getTypeFromFileExtension=function(url){var fileExt="",extRegEx=[],extTypes={},extRegEx=[];for(var i in $p.mmap){extRegEx.push("."+$p.mmap[i].ext);extTypes[$p.mmap[i].ext]=$p.mmap[i]}extRegEx="^.*.("+extRegEx.join("|")+")";try{fileExt=url.match(new RegExp(extRegEx))[1];fileExt=(!fileExt)?"NaN":fileExt.replace(".","")}catch(e){fileExt="NaN"}return extTypes[fileExt].type};this._testMediaSupport=function(){var result={},streamType="",ref=this;for(var i=0;i<$p.mmap.length;i++){platforms=(typeof $p.mmap[i]["platform"]=="object")?$p.mmap[i]["platform"]:[$p.mmap[i]["platform"]];$.each(platforms,function(_na,platform){if(platform==null){return true}var platform=platform.toUpperCase();streamType=$p.mmap[i]["streamType"]||["http"];$.each(streamType,function(key,st){if(result[st]==null){result[st]={}}if(result[st][platform]==null){result[st][platform]=[]}if($.inArray($p.mmap[i]["type"],result[st][platform])>-1){return true}var capped=$p.utils.capitalise(platform),version=$p.models[$p.mmap[i]["model"].toUpperCase()].prototype[(platform.toLowerCase())+"Version"]||1;try{if(ref["get"+capped+"Version"]($p.mmap[i]["type"])>=version){if(ref.config["_enable"+capped+"Platform"]!=false){result[st][platform].push($p.mmap[i]["type"]);if($p.mmap[i]["fixed"]==true){return false}}return true}}catch(e){$p.utils.log("ERROR","get"+capped+"Version not found")}})})}return result};this._raiseError=function(txt){this.env.playerDom.html(txt).css({color:"#fdfdfd",backgroundColor:"#333",lineHeight:this.config.height+"px",textAlign:"center",display:"block"});this._promote("error")};this._readMediaTag=function(domNode){var result={},htmlTag="",attr=[],ref=this;if(domNode[0].tagName.toUpperCase()!="VIDEO"&&domNode[0].tagName.toUpperCase()!="AUDIO"){return false}if(!this.getConfig("ignoreAttributes")){result={autoplay:((domNode.attr("autoplay")!==undefined||domNode.prop("autoplay")!==undefined)&&domNode.prop("autoplay")!==false)?true:false,controls:((domNode.attr("controls")!==undefined||domNode.prop("controls")!==undefined)&&domNode.prop("controls")!==false)?true:false,loop:((domNode.attr("autoplay")!==undefined||domNode.prop("loop")!==undefined)&&domNode.prop("loop")!==false)?true:false,title:(domNode.attr("title")!==undefined&&domNode.attr("title")!==false)?domNode.attr("title"):"",poster:(domNode.attr("poster")!==undefined&&domNode.attr("poster")!==false)?domNode.attr("poster"):"",width:(domNode.attr("width")!==undefined&&domNode.attr("width")!==false)?domNode.attr("width"):false,height:(domNode.attr("height")!==undefined&&domNode.attr("height")!==false)?domNode.attr("height"):false}
}if($.browser.msie){htmlTag=$($("<div></div>").html($(domNode).clone())).html();attr=["autoplay","controls","loop"];for(var i=0;i<attr.length;i++){if(htmlTag.indexOf(attr[i])==-1){continue}result[attr[i]]=true}}domNode.prop("autoplay",false);result.playlist=[];result.playlist[0]=[];if(srcNode.attr("src")){result.playlist[0].push({src:srcNode.attr("src"),type:srcNode.attr("type")||this._getTypeFromFileExtension(srcNode.attr("src"))})}if($.browser.msie&&$.browser.version<9){var childNode=srcNode;do{childNode=childNode.next("source");if(childNode.attr("src")){result.playlist[0].push({src:childNode.attr("src"),type:childNode.attr("type")||this._getTypeFromFileExtension(childNode.attr("src"))})}}while(childNode.attr("src"))}else{srcNode.children("source").each(function(){if($(this).attr("src")){result.playlist[0].push({src:$(this).attr("src"),type:$(this).attr("type")||ref._getTypeFromFileExtension($(this).attr("src"))})}})}try{domNode[0].pause();domNode.find("source").remove();domNode.prop("src","");domNode[0].load()}catch(e){}return result};this._applyDimensions=function(){if(this.config._height!==false&&this.config._width!==false){if(this.config._width<=this.config._minWidth&&this.config._iframe!=true){this.config._width=this.config._minWidth;this.env.autoSize=true}if(this.config._height<=this.config._minHeight&&this.config._iframe!=true){this.config._height=this.config._minHeight;this.env.autoSize=true}}this.env.playerDom.css({"max-width":"100%"});if(this.config._height!==false){this.env.playerDom.css("height",this.config._height+"px")}if(this.config._width!==false){this.env.playerDom.css("width",this.config._width+"px")}};this._init=function(customNode,customCfg){var theNode=customNode||srcNode,theCfg=customCfg||cfg,cfgBySource=this._readMediaTag(theNode);this.env.srcNode=$.extend(true,{},theNode);this.env.className=theNode.attr("class");if(cfgBySource!==false){this.env.playerDom=$("<div/>").attr({"class":theNode[0].className,style:theNode.attr("style")});theNode.replaceWith(this.env.playerDom)}else{cfgBySource={width:theNode.attr("width")||theNode.css("width")||theNode.width(),height:theNode.attr("height")||theNode.css("height")||theNode.height()};this.env.playerDom=theNode}theCfg=$.extend(true,{},cfgBySource,theCfg);for(var i in theCfg){if(this.config["_"+i]!=null){this.config["_"+i]=theCfg[i]}else{if(i.indexOf("plugin_")>-1){this.config[i]=$.extend(this.config[i],theCfg[i])}else{this.config[i]=theCfg[i]}}}$p.utils.logging=this.config._debug;if(this.getIsMobileClient()){this.config._autoplay=false;this.config.fixedVolume=true}this._id=theNode[0].id||$p.utils.randomId(8);this.env.playerDom.attr("id",this._id);if(this.config._theme){switch(typeof this.config._theme){case"string":break;case"object":this._applyTheme(this.config._theme)}}else{this._start(false)}return this};this._start=function(data){var ref=this,files=[];this._applyDimensions();this._registerPlugins();if(this.config._iframe===true){if(this.getIframeWindow()){this.getIframeWindow().ready(function(){ref._enterFullViewport(true,false)})}else{ref._enterFullViewport(true,false)}}if(this.getIframeWindow()===false){this.config._isCrossDomain=true}if(typeof onReady==="function"){this._enqueue(function(){onReady(ref)})}for(var i in this.config._playlist[0]){if(this.config._playlist[0][i].type){if(this.config._playlist[0][i].type.indexOf("/json")>-1||this.config._playlist[0][i].type.indexOf("/xml")>-1){this.setFile(this.config._playlist[0][i].src,this.config._playlist[0][i].type);return this}}}this.setFile(this.config._playlist);return this};this._applyTheme=function(data){var ref=this;if(data===false){this._raiseError("The Projekktor theme-set specified could not be loaded.");return false}if(typeof data.css=="string"){$("head").append('<style type="text/css">'+$p.utils.parseTemplate(data.css,{rp:data.baseURL})+"</style>")}if(typeof data.html=="string"){this.env.playerDom.html($p.utils.parseTemplate(data.html,{p:this.config._cssClassPrefix}))}this.env.playerDom.addClass(data.id).addClass(data.variation);if(typeof data.config=="object"){for(var i in data.config){if(this.config["_"+i]!=null){this.config["_"+i]=data.config[i]}else{if(i.indexOf("plugin_")>-1){this.config[i]=$.extend(true,{},this.config[i],data.config[i])}else{this.config[i]=data.config[i]}}}if(typeof data.config.plugins=="object"){for(var i=0;i<data.config.plugins.length;i++){try{typeof eval("projekktor"+data.config.plugins[i])}catch(e){this._raiseError("The applied theme requires the following Projekktor plugin(s): <b>"+data.config.plugins.join(", ")+"</b>");return false}}}}if(data.onReady){this._enqueue(function(player){eval(data.onReady)})}return this._start()};return this._init()}};$p.mmap=[];$p.models={};$p.newModel=function(obj,ext){var result=false,extend=($p.models[ext]&&ext!=undefined)?$p.models[ext].prototype:{};if(typeof obj!="object"){return result}if(!obj.modelId){return result}if($p.models[obj.modelId]){return result}$p.models[obj.modelId]=function(){};$p.models[obj.modelId].prototype=$.extend({},extend,obj);
for(var i=0;i<obj.iLove.length;i++){obj.iLove[i].model=obj.modelId.toLowerCase();$p.mmap.push(obj.iLove[i])}return true}});var projekktorConfig=function(a){this._version=a};jQuery(function(a){$p.utils={imageDummy:function(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABBJREFUeNpi/v//PwNAgAEACQsDAUdpTjcAAAAASUVORK5CYII="},capitalise:function(b){return b.charAt(0).toUpperCase()+b.slice(1).toLowerCase()},blockSelection:function(b){if(!b){return false}if(a.browser.mozilla){b.css("MozUserSelect","none")}else{if(a.browser.msie){b.bind("selectstart",function(){return false})}else{b.mousedown(function(){return false})}}return b},unique:function(b){var d=[];for(var c=b.length;c--;){var e=b[c];if(a.inArray(e,d)===-1){d.unshift(e)}}return d},intersect:function(d,c){var b=[];a.each(d,function(f){try{if(a.inArray(c,d[f])>-1){b.push(d[f])}}catch(g){}try{if(a.inArray(d[f],c)>-1){b.push(d[f])}}catch(g){}});return b},roundNumber:function(b,c){if(b<=0||isNaN(b)){return 0}return Math.round(b*Math.pow(10,c))/Math.pow(10,c)},randomId:function(f){var e="abcdefghiklmnopqrstuvwxyz",b="";for(var d=0;d<f;d++){var c=Math.floor(Math.random()*e.length);b+=e.substring(c,c+1)}return b},toAbsoluteURL:function(e){var b=location,d,j,g,c;if(e==null||e==""){return""}if(/^\w+:/.test(e)){return e}d=b.protocol+"//"+b.host;if(e.indexOf("/")==0){return d+e}j=b.pathname.replace(/\/[^\/]*$/,"");g=e.match(/\.\.\//g);if(g){e=e.substring(g.length*3);for(c=g.length;c--;){j=j.substring(0,j.lastIndexOf("/"))}}return d+j+"/"+e},strip:function(b){return b.replace(/^\s+|\s+$/g,"")},toSeconds:function(b){var c=0;if(typeof b!="string"){return b}if(b){var d=b.split(":");for(i=0;i<d.length;i++){c=c*60+parseFloat(d[i].replace(",","."))}}return parseFloat(c)},toTimeString:function(e,h){var c=Math.floor(e/(60*60)),f=e%(60*60),d=Math.floor(f/60),b=f%60,g=Math.floor(b);if(c<10){c="0"+c}if(d<10){d="0"+d}if(g<10){g="0"+g}return(h===true)?c+":"+d:c+":"+d+":"+g},embeddFlash:function(d,c,k){var f=c.FlashVars||{},m="",e="",l="",g="",h=d,b="";if(c.src.indexOf("?")==-1){c.src+="?"}else{c.src+="&"}for(var j in f){if(typeof f[j]!="function"){g=f[j];c.src+=j+"="+encodeURIComponent(g)+"&"}}c.src.replace(/&$/,"");e='<object id="'+c.id+'" codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"  name="'+c.name+'" width="'+c.width+'" height="'+c.height+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="'+c.src+'"></param><param name="allowScriptAccess" value="'+c.allowScriptAccess+'"></param><param name="allowFullScreen" value="'+c.allowFullScreen+'"></param><param name="wmode" value="'+c.wmode+'"></param>';l="<embed ";for(var j in c){if(j.toUpperCase()==="FLASHVARS"){continue}if(typeof c[j]!="function"){l+=j+'="'+c[j]+'" '}}l+=' pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>';m=e+l;m+="</object>";if(a.browser.mozilla||a.browser.webkit||a.browser.opera){m=l}if(h===null){return m}h.get(0).innerHTML=m;if(k!==false){h.append(a("<div/>").attr("id",c.id+"_cc").css({width:"100%",height:"100%",backgroundColor:(a.browser.msie&&jQuery.browser.version<9)?"#000":"transparent",filter:"alpha(opacity = 0.1)",position:"absolute",top:0,left:0}))}return a("#"+c.id)[0]},parseTemplate:function(c,e,d){if(e===undefined||e.length==0||typeof e!="object"){return c}for(var b in e){c=c.replace(new RegExp("%{"+b+"}","gi"),((d===true)?window.encodeURIComponent(e[b]):e[b]))}c=c.replace(/%{(.*?)}/gi,"");return c},stretch:function(f,g,n,l,d,h){if(g==null){return false}if((g instanceof a)==false){g=a(g)}if(g.data("od")==null){g.data("od",{width:g.width(),height:g.height()})}var e=(d!==undefined)?d:g.data("od").width,b=(h!==undefined)?h:g.data("od").height,j=(n/e),m=(l/b),c=n,k=l;switch(f){case"none":c=e;k=b;break;case"fill":if(j>m){c=e*j;k=b*j}else{if(j<m){c=e*m;k=b*m}}break;case"aspectratio":default:if(j>m){c=e*m;k=b*m}else{if(j<m){c=e*j;k=b*j}}break}n=$p.utils.roundNumber((c/n)*100,0);l=$p.utils.roundNumber((k/l)*100,0);if(n==0||l==0){return false}g.css({margin:0,padding:0,width:n+"%",height:l+"%",left:(100-n)/2+"%",top:(100-l)/2+"%"});if(g.data("od").width!=g.width()||g.data("od").height!=g.height()){return true}return false},parseUri:function(f){var e={strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},b=e.parser[e.strictMode?"strict":"loose"].exec(f),d={},c=14;while(c--){d[e.key[c]]=b[c]||""}d[e.q.name]={};d[e.key[12]].replace(e.q.parser,function(h,g,j){if(g){d[e.q.name][g]=j}});return d},log:function(){if(this.logging==false){return}this.history=this.history||[];this.history.push(arguments);
if(window.console){console.log(Array.prototype.slice.call(arguments))}},cleanResponse:function(d,b){var c=false;switch(b){case"html":case"xml":if(window.DOMParser){c=new DOMParser();c=c.parseFromString(d,"text/xml")}else{c=new ActiveXObject("Microsoft.XMLDOM");c.async="false";c.loadXML(d)}break;case"json":c=d;if(typeof c=="string"){c=a.parseJSON(c)}break;case"jsonp":break;default:c=d;break}return c},logging:false}});var projekktorPluginInterface=function(){};jQuery(function(a){projekktorPluginInterface.prototype={pluginReady:false,name:"",pp:{},config:{},playerDom:null,canvas:{media:null,projekktor:null},_appliedDOMObj:[],_init:function(b){this.config=a.extend(true,this.config,b);this.initialize()},getConfig:function(c,d){var b=null,e=d||null;if(this.pp.getConfig("plugin_"+this.name)!=null){b=this.pp.getConfig("plugin_"+this.name)[c]||null}if(b==null){b=this.pp.getConfig(c)}if(b==null){b=this.config[c]}if(typeof b=="object"&&b.length===null){b=a.extend(true,{},b,this.config[c])}else{if(typeof b=="object"){b=a.extend(true,[],b||[],this.config[c]||[])}}return(b==null)?e:b},sendEvent:function(b,c){this.pp._promote({_plugin:this.name,_event:b},c)},deconstruct:function(){this.pluginReady=false;a.each(this._appliedDOMObj,function(){a(this).remove()})},applyToPlayer:function(e,d){var b=this.getConfig("cssClassPrefix");if(!e){return null}if(this.playerDom.find("."+b+e.attr("class")).length==0){var c=e.attr("class");e.removeClass(c);e.addClass(b+c);if(d===true){e.prependTo(this.playerDom)}else{e.appendTo(this.playerDom)}this._appliedDOMObj.push(e);return e}var c=e.attr("class");e=this.playerDom.find("."+b+e.attr("class"));e.removeClass(c);e.addClass(b+c);return e},getElement:function(b){return this.pp.env.playerDom.find("."+this.getConfig("cssClassPrefix")+b)},setActive:function(d,b){var c=(typeof d=="object")?d:this.getElement(d);if(b!=false){c.addClass("active").removeClass("inactive")}else{c.addClass("inactive").removeClass("active")}c.css("display","");return c},initialize:function(){},isReady:function(){return this.pluginReady}}});projekktorConfig.prototype = {"_cookieName":"qwprojaaekktor","_cookieExpiry":356,"_plugins":["Display","Controlbar"],"_addplugins":[],"_reelParser":null,"_cssClassPrefix":"pp","_platforms":["browser","android","ios","native","flash"],"_iframe":false,"_ignoreAttributes":false,"_loop":false,"_autoplay":false,"_continuous":true,"_playlist":[],"_theme":{"id":"projekktor","baseURL":".\/"},"_themeRepo":false,"_messages":{"0":"An error occurred.","1":"You aborted the media playback. ","2":"A network error caused the media download to fail part-way. ","3":"The media playback was aborted due to a corruption problem. ","4":"The media (%{title}) could not be loaded because the server or network failed.","5":"Sorry, your browser does not support the media format of the requested file.","6":"Your client is in lack of the Flash Plugin V%{flashver} or higher.","7":"No media scheduled.","8":"! Invalid media model configured !","9":"File (%{file}) not found.","10":"Invalid or missing quality settings for %{title}.","11":"Invalid streamType and\/or streamServer settings for %{title}.","12":"Invalid or inconsistent quality setup for %{title}.","80":"The requested file does not exist.","97":"No media scheduled.","98":"Invalid or malformed playlist data!","99":"Click display to proceed. ","100":"PLACEHOLDER","500":"This Youtube video has been removed or set to private","501":"The Youtube user owning this video disabled embedding.","502":"Invalid Youtube Video-Id specified."},"_debug":false,"_width":0,"_height":0,"_minHeight":40,"_minWidth":40,"_enableNativePlatform":true,"_enableFlashPlatform":true,"_enableIosPlatform":true,"_enableBrowserPlatform":true,"_isCrossDomain":false,"ID":0,"title":null,"poster":false,"controls":false,"start":false,"stop":false,"volume":0.5,"cover":"","disablePause":false,"disallowSkip":false,"fixedVolume":false,"imageScaling":"aspectratio","videoScaling":"aspectratio","playerFlashMP4":"jarisplayer.swf","playerFlashMP3":"jarisplayer.swf","streamType":"http","streamServer":"","useYTIframeAPI":true,"enableKeyboard":true,"enableFullscreen":true,"playbackQuality":"medium","_playbackQualities":[{"key":"small","minHeight":240,"minWidth":240},{"key":"medium","minHeight":360,"minWidth":[{"ratio":1.77,"minWidth":640},{"ratio":1.33,"minWidth":480}]},{"key":"large","minHeight":480,"minWidth":[{"ratio":1.77,"minWidth":853},{"ratio":1.33,"minWidth":640}]},{"key":"hd1080","minHeight":1080,"minWidth":[{"ratio":1.77,"minWidth":1920},{"ratio":1.33,"minWidth":1440}]},{"key":"hd720","minHeight":720,"minWidth":[{"ratio":1.77,"minWidth":1280},{"ratio":1.33,"minWidth":960}]},{"key":"highres","minHeight":1081,"minWidth":0}],"enableTestcard":true,"skipTestcard":false,"duration":0,"className":""};jQuery(function(a){$p.newModel({modelId:"VIDEOFLASH",flashVersion:9,iLove:[{ext:"flv",type:"video/x-flv",platform:"flash",streamType:["http","pseudo","rtmp"],fixed:true},{ext:"flv",type:"video/flv",platform:"flash",streamType:["http","pseudo","rtmp"],fixed:true},{ext:"mp4",type:"video/mp4",platform:"flash",streamType:["http","pseudo","rtmp"],fixed:"maybe"},{ext:"mov",type:"video/quicktime",streamType:["http","pseudo","rtmp"],platform:"flash"},{ext:"m4v",type:"video/mp4",platform:"flash",streamType:["http","pseudo","rtmp"],fixed:"maybe"},{ext:"f4m",type:"video/abst",platform:"flash",streamType:["httpVideoLive"]}],_eventMap:{onprogress:"progressListener",ontimeupdate:"timeListener",ondatainitialized:"metaDataListener",onconnectionsuccess:"startListener",onplaypause:"_playpauseListener",onplaybackfinished:"endedListener",onmute:"volumeListener",onvolumechange:"volumeListener",onbuffering:"waitingListener",onnotbuffering:"canplayListener",onconnectionfailed:"errorListener"},isPseudoStream:false,allowRandomSeek:false,flashVerifyMethod:"api_get",_jarisVolume:0,applyMedia:function(b){var c={id:this.pp.getMediaId()+"_flash",name:this.pp.getMediaId()+"_flash",src:this.pp.getConfig("playerFlashMP4"),width:"100%",height:"100%",allowScriptAccess:"always",allowFullScreen:"false",allowNetworking:"all",wmode:(a.browser.msie)?"transparent":"opaque",bgcolor:"#000000",FlashVars:{type:"video",streamtype:(this.pp.getConfig("streamType")!="rtmp")?"file":"rtmp",server:(this.pp.getConfig("streamType")=="rtmp")?this.pp.getConfig("streamServer"):"",autostart:"false",hardwarescaling:"true",controls:"false",jsapi:"true",aspectratio:this.pp.getConfig("videoScaling")}};switch(this.pp.getConfig("streamType")){case"rtmp":this.allowRandomSeek=true;this.media.loadProgress=100;break;case"pseudo":this.isPseudoStream=true;this.allowRandomSeek=true;this.media.loadProgress=100;break}this.createFlash(c,b)},applySrc:function(){var c=this,b=this.getSource();this.mediaElement.api_source(b[0].src);this.seekedListener();if(this.getState("PLAYING")){this.setPlay();if(c.isPseudoStream!==true){this.setSeek(this.media.position||0)}}},addListeners:function(){if(this.mediaElement==null){return}var b=this;a.each(this._eventMap,function(c,d){b.mediaElement.api_addlistener(c,"projekktor('"+b.pp.getId()+"').playerModel."+d)})},removeListeners:function(){try{this.mediaElement.api_removelistener("*")}catch(b){}},flashReadyListener:function(){this.applySrc();this.displayReady()},errorListener:function(b){this.setTestcard(4)},volumeListener:function(b){if(this._jarisVolume!=b.volume){this._jarisVolume=b.volume;this.sendUpdate("volume",b.volume)}},_playpauseListener:function(b){if(b.isplaying){if(this.getModelName().indexOf("AUDIO")>-1){this.setSeek(this.media.position)}this.playingListener()}else{this.pauseListener()}},metaDataListener:function(c){this.applyCommand("volume",this.pp.getConfig("volume"));try{this.mediaElement.api_seek(this.media.position||0)}catch(b){}this._setState("playing");if(this.modelId.indexOf("AUDIO")>-1){this.mediaElement.api_removelistener("ondatainitialized");return}try{this.videoWidth=c.width;this.videoHeight=c.height;this.sendUpdate("scaled",{width:this.videoWidth,height:this.videoHeight})}catch(b){}},startListener:function(c){this.applyCommand("volume",this.pp.getConfig("volume"));try{this.mediaElement.api_seek(this.media.position||0)}catch(b){}this._setState("playing")},setSeek:function(c){if(this.isPseudoStream){this.media.offset=c;this.timeListener({position:0});this.applySrc()}else{try{this.mediaElement.api_seek(c)}catch(b){}this.seekedListener();this.timeListener({position:c})}},setVolume:function(b){this._volume=b;try{this.mediaElement.api_volume(b)}catch(c){return false}return b},setPause:function(b){try{this.mediaElement.api_pause()}catch(c){}},setPlay:function(b){try{this.mediaElement.api_play()}catch(c){}},getVolume:function(){return this._jarisVolume},detachMedia:function(){try{a(this.mediaElement).remove()}catch(b){}}});$p.newModel({modelId:"AUDIOFLASH",iLove:[{ext:"mp3",type:"audio/mp3",platform:"flash",streamType:["http"]},{ext:"mp3",type:"audio/mpeg",platform:"flash",streamType:["http"]},{ext:"m4a",type:"audio/mp4",platform:"flash",streamType:["http"]}],applyMedia:function(b){$p.utils.blockSelection(b);this.imageElement=this.applyImage(this.pp.getConfig("cover")||this.pp.getConfig("poster"),b);var c=a("#"+this.pp.getMediaId()+"_flash_container");if(c.length==0){c=a(document.createElement("div")).css({width:"1px",height:"1px"}).attr("id",this.pp.getMediaId()+"_flash_container").prependTo(this.pp.getDC())}var d={id:this.pp.getMediaId()+"_flash",name:this.pp.getMediaId()+"_flash",src:this.pp.getConfig("playerFlashMP3"),width:"1px",height:"1px",allowScriptAccess:"always",allowFullScreen:"false",allowNetworking:"all",wmode:"transparent",bgcolor:"#000000",FlashVars:{type:"audio",streamtype:"file",server:"",autostart:"false",hardwarescaling:"false",controls:"false",jsapi:"true"}};this.createFlash(d,c,false)}},"VIDEOFLASH")});jQuery(function(a){$p.newModel({modelId:"VIDEO",androidVersion:2,iosVersion:3,nativeVersion:0,iLove:[{ext:"mp4",type:"video/mp4",platform:["ios","android","native"],streamType:["http","pseudo","httpVideo"],fixed:"maybe"},{ext:"ogv",type:"video/ogg",platform:"native",streamType:["http","httpVideo"]},{ext:"webm",type:"video/webm",platform:"native",streamType:["http","httpVideo"]},{ext:"ogg",type:"video/ogg",platform:"native",streamType:["http","httpVideo"]},{ext:"anx",type:"video/ogg",platform:"native",streamType:["http","httpVideo"]}],_eventMap:{pause:"pauseListener",play:"playingListener",volumechange:"volumeListener",progress:"progressListener",timeupdate:"timeListener",ended:"_ended",waiting:"waitingListener",canplaythrough:"canplayListener",canplay:"canplayListener",error:"errorListener",suspend:"suspendListener",seeked:"seekedListener",loadstart:null},allowRandomSeek:false,videoWidth:0,videoHeight:0,wasPersistent:true,isPseudoStream:false,applyMedia:function(c){var b=this;if(this.media.type.indexOf("/ogg")>-1||this.media.type.indexOf("/webm")>-1){this.allowRandomSeek=true}if(a("#"+this.pp.getMediaId()+"_html").length==0){this.wasPersistent=false;c.html("").append(a("<video/>").attr({id:this.pp.getMediaId()+"_html",poster:(this.pp.getIsMobileClient("ANDROID"))?this.getPoster():$p.utils.imageDummy(),loop:false,autoplay:false,"x-webkit-airplay":"allow"}).prop({controls:(this.hasGUI||(this.pp.getIsMobileClient()&&this.pp.getItemIdx()>0)),volume:this.getVolume()}).css({width:"100%",height:"100%",position:"absolute",top:0,left:0}))}this.mediaElement=a("#"+this.pp.getMediaId()+"_html");this.applySrc()},applySrc:function(){var f=this,c=f.getState("PLAYING"),b=f.getState("AWAKENING"),d=this.getSource();this.removeListener("error");this.removeListener("play");this.removeListener("loadstart");this.removeListener("canplay");this.mediaElement.find("source").remove();a.each(d,function(){a(document.createElement("source")).appendTo(f.mediaElement).attr({src:this.src,type:this.type})});var e=function(){f.removeListener("canplay","qs");f.removeListener("loadstart","qs");f.addListeners("error");f.addListeners("play");f.addListeners("loadstart");f.addListeners("canplay");f.mediaElement=a("#"+f.pp.getMediaId()+"_html");if(b){f.displayReady();return}if(f.getState("SEEKING")){if(f._isPlaying){f.setPlay()}f.seekedListener();return}if(!f.isPseudoStream){f.setSeek(f.media.position||0)}if(f._isPlaying){f.setPlay()}};if(!a.browser.msie){this.mediaElement.bind("loadstart.projekktorqs"+this.pp.getId(),e)}else{this.mediaElement.bind("canplay.projekktorqs"+this.pp.getId(),e)}this.mediaElement[0].load()},detachMedia:function(){try{this.mediaElement[0].pause()}catch(b){}},addListeners:function(e,c){if(this.mediaElement==null){return}var f=(c!=null)?".projekktor"+c+this.pp.getId():".projekktor"+this.pp.getId(),d=this,b=(e==null)?"*":e;a.each(this._eventMap,function(g,h){if((g==b||b=="*")&&h!=null){d.mediaElement.bind(g+f,function(i){d[h](this,i)})}})},removeListener:function(b,c){if(this.mediaElement==null){return}var e=(c!=null)?".projekktor"+c+this.pp.getId():".projekktor"+this.pp.getId(),d=this;a.each(this._eventMap,function(f,g){if(f==b){d.mediaElement.unbind(f+e)}})},_ended:function(){var d=this.mediaElement[0].duration,b=(Math.round(this.media.position)===Math.round(d)),c=((d-this.media.maxpos)<2)&&(this.media.position===0)||false;if(b||c||this.isPseudoStream){this.endedListener(this)}else{this.pauseListener(this)}},playingListener:function(c){var b=this;(function(){try{if(b.mediaElement[0].networkState==b.mediaElement[0].NETWORK_NO_SOURCE&&b.getDuration()==0){b.setTestcard(80);return}if(b.getDuration()==0){setTimeout(arguments.callee,500)}}catch(d){}})();this._setState("playing")},errorListener:function(d,b){try{switch(event.target.error.code){case event.target.error.MEDIA_ERR_ABORTED:this.setTestcard(1);break;case event.target.error.MEDIA_ERR_NETWORK:this.setTestcard(2);break;case event.target.error.MEDIA_ERR_DECODE:this.setTestcard(3);break;case event.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:this.setTestcard(4);break;default:this.setTestcard(5);break}}catch(c){}},canplayListener:function(c){var b=this;if(this.pp.getConfig("streamType")=="pseudo"){a.each(this.media.file,function(){if(this.src.indexOf(b.mediaElement[0].currentSrc)>-1){if(this.type=="video/mp4"){b.isPseudoStream=true;b.allowRandomSeek=true;b.media.loadProgress=100;return false}}})}this._setBufferState("full")},setPlay:function(){try{this.mediaElement[0].play()}catch(b){}},setPause:function(){try{this.mediaElement[0].pause()}catch(b){}},setVolume:function(b){this._volume=b;try{this.mediaElement.prop("volume",b)}catch(c){return false}return b},setSeek:function(c){if(this.isPseudoStream){this.media.position=0;this.media.offset=c;this.timeListener();this.applySrc();return}var b=this;(function(){try{b.mediaElement[0].currentTime=c;b.timeListener({position:c})}catch(d){if(b.mediaElement!=null){setTimeout(arguments.callee,100)}}})()},setFullscreen:function(b){if(this.element=="audio"){return
}this._scaleVideo()},setResize:function(){if(this.element=="audio"){return}this._scaleVideo(false)},getSrc:function(){try{return this.mediaElement[0].currentSrc||null}catch(b){return null}}});$p.newModel({modelId:"AUDIO",iLove:[{ext:"ogg",type:"audio/ogg",platform:"native",streamType:["http"]},{ext:"oga",type:"audio/ogg",platform:"native",streamType:["http"]},{ext:"mp3",type:"audio/mp3",platform:["ios","android","native"],streamType:["http"]},{ext:"mp3",type:"audio/mpeg",platform:["ios","android","native"],streamType:["http"]}],imageElement:{},applyMedia:function(c){var b=this;$p.utils.blockSelection(c);this.imageElement=this.applyImage(this.pp.getConfig("cover")||this.pp.getConfig("poster"),c);this.imageElement.css({border:"0px"});var d=a("#"+this.pp.getMediaId()+"_audio_container");if(d.length==0){d=a(document.createElement("div")).css({width:"1px",height:"1px"}).attr("id",this.pp.getMediaId()+"_audio_container").prependTo(this.pp.getDC())}d.html("").append(a("<audio/>").attr({id:this.pp.getMediaId()+"_html",poster:(this.pp.getIsMobileClient("ANDROID"))?this.getPoster():$p.utils.imageDummy(),loop:false,autoplay:false,"x-webkit-airplay":"allow"}).prop({controls:false,volume:this.getVolume()}).css({width:"1px",height:"1px",position:"absolute",top:0,left:0}));this.mediaElement=a("#"+this.pp.getMediaId()+"_html");this.applySrc()},setPosterLive:function(){if(this.imageElement.parent){var b=this.imageElement.parent(),c=this;if(this.imageElement.attr("src")==c.pp.getConfig("poster")){return}this.imageElement.fadeOut("fast",function(){a(this).remove();c.imageElement=c.applyImage(c.pp.getConfig("poster"),b)})}}},"VIDEO");$p.newModel({modelId:"VIDEOHLS",androidVersion:3,iosVersion:4,iLove:[{ext:"m3u8",type:"application/x-mpegURL",platform:["ios","android"],streamType:["http","httpVideo","httpVideoLive"]},{ext:"m3u",type:"application/x-mpegURL",platform:["ios","android"],streamType:["http","httpVideo","httpVideoLive"]},{ext:"ts",type:"video/MP2T",platforms:["ios","android"],streamType:["http","httpVideo","httpVideoLive"]}]},"VIDEO")});jQuery(function(a){$p.newModel({modelId:"IMAGE",iLove:[{ext:"jpg",type:"image/jpeg",platform:"browser",streamType:["http"]},{ext:"gif",type:"image/gif",platform:"browser",streamType:["http"]},{ext:"png",type:"image/png",platform:"browser",streamType:["http"]}],allowRandomSeek:true,_position:0,_duration:0,applyMedia:function(b){this.mediaElement=this.applyImage(this.media.file[0].src,b.html(""));this._duration=this.pp.getConfig("duration");this._position=-1;this.displayReady();this._position=-0.5},setPlay:function(){var b=this;this._setBufferState("full");this.progressListener(100);this.playingListener();if(this._duration==0){b._setState("completed");return}(function(){if(b._position>=b._duration){b._setState("completed");return}if(!b.getState("PLAYING")){return}b.timeListener({duration:b._duration,position:b._position});setTimeout(arguments.callee,500);b._position+=0.5})()},detachMedia:function(){this.mediaElement.remove()},setPause:function(){this.pauseListener()},setSeek:function(b){if(b<this._duration){this._position=b}}});$p.newModel({modelId:"HTML",iLove:[{ext:"html",type:"text/html",platform:"browser",streamType:["http"]}],applyMedia:function(c){var b=this;this.mediaElement=a(document.createElement("iframe")).attr({id:this.pp.getMediaId()+"_iframe",name:this.pp.getMediaId()+"_iframe",src:this.media.file[0].src,scrolling:"no",frameborder:"0",width:"100%",height:"100%"}).css({overflow:"hidden",border:"0px",width:"100%",height:"100%"}).appendTo(c.html(""));this.mediaElement.load(function(d){b.success()});this.mediaElement.error(function(d){b.remove()});this._duration=this.pp.getConfig("duration")},success:function(){this.displayReady()},remove:function(){this.mediaElement.remove()}},"IMAGE")});jQuery(function(a){$p.newModel({modelId:"YTVIDEO",iLove:[{ext:"youtube.com",type:"video/youtube",platform:"flash",fixed:"maybe"}],allowRandomSeek:true,useIframeAPI:true,flashVerifyMethod:"cueVideoById",_ffFix:false,_updateTimer:null,init:function(c){var b=this;this.useIframeAPI=this.pp.getConfig("useYTIframeAPI")||this.pp.getIsMobileClient();this.hasGUI=this.pp.getIsMobileClient();if(!this.useIframeAPI){this.requiresFlash=8;this.ready();return}var d=this.pp.getId();if(window.ProjekktorYoutubePlayerAPIReady!==true){a.getScript("http://www.youtube.com/player_api");(function(){try{if(window.ProjekktorYoutubePlayerAPIReady==true){b.ready();return}setTimeout(arguments.callee,50)}catch(f){setTimeout(arguments.callee,50)}})()}else{this.ready()}window.onYouTubePlayerAPIReady=function(){window.ProjekktorYoutubePlayerAPIReady=true}},applyMedia:function(f){this._setBufferState("empty");var e=this,c=(this.modelId=="YTAUDIO")?1:"100%",b=(this.modelId=="YTAUDIO")?1:"100%";if(this.modelId=="YTAUDIO"){this.imageElement=this.applyImage(this.pp.getPoster(),f)}if(this.useIframeAPI){f.html("").append(a("<div/>").attr("id",this.pp.getId()+"_media_youtube").css({width:"100%",height:"100%",position:"absolute",top:0,left:0}));var d=a("<div/>").attr("id",this.pp.getId()+"_media_youtube_cc").css({width:"100%",height:"100%",backgroundColor:(a.browser.msie)?"#000":"transparent",filter:"alpha(opacity = 0.1)",position:"absolute",top:0,left:0});f.append(d);this.mediaElement=new YT.Player(this.pp.getId()+"_media_youtube",{width:(this.pp.getIsMobileClient())?this.pp.config._width:c,height:(this.pp.getIsMobileClient())?this.pp.config._height:b,playerVars:{autoplay:0,disablekb:0,version:3,start:0,controls:(this.pp.getIsMobileClient())?1:0,showinfo:0,enablejsapi:1,start:(this.media.position||0),origin:window.location.href,wmode:"transparent",modestbranding:1},videoId:this.youtubeGetId(),events:{onReady:function(h){e.onReady(h)},onStateChange:function(h){e.stateChange(h)},onError:function(h){e.errorListener(h)}}})}else{var g={id:this.pp.getId()+"_media_youtube",name:this.pp.getId()+"_media_youtube",src:"http://www.youtube.com/apiplayer",width:(this.pp.getIsMobileClient())?this.pp.config._width:c,height:(this.pp.getIsMobileClient())?this.pp.config._height:b,bgcolor:"#000000",allowScriptAccess:"always",wmode:"transparent",FlashVars:{enablejsapi:1,autoplay:0,version:3,modestbranding:1,showinfo:0}};this.createFlash(g,f)}},flashReadyListener:function(){this._youtubeResizeFix();this.addListeners();this.mediaElement.cueVideoById(this.youtubeGetId(),this.media.position||0,this._playbackQuality)},_youtubeResizeFix:function(){this.applyCommand("volume",this.pp.getConfig("volume"))},addListeners:function(){this.mediaElement.addEventListener("onStateChange","projekktor('"+this.pp.getId()+"').playerModel.stateChange");this.mediaElement.addEventListener("onError","projekktor('"+this.pp.getId()+"').playerModel.errorListener");this.mediaElement.addEventListener("onPlaybackQualityChange","projekktor('"+this.pp.getId()+"').playerModel.qualityChangeListener")},setSeek:function(c){try{this.mediaElement.seekTo(c,true);if(!this.getState("PLAYING")){this.timeListener({position:this.mediaElement.getCurrentTime(),duration:this.mediaElement.getDuration()})}}catch(b){}},setVolume:function(b){try{this.mediaElement.setVolume(b*100)}catch(c){}},setPause:function(b){try{this.mediaElement.pauseVideo()}catch(c){}},setPlay:function(b){try{this.mediaElement.playVideo()}catch(c){}},setQuality:function(c){try{this.mediaElement.setPlaybackQuality(c)}catch(b){}},getVolume:function(){try{return this.mediaElement.getVolume()}catch(b){}return 0},getPoster:function(){return this.media.config["poster"]||this.pp.config.poster||"http://img.youtube.com/vi/"+this.youtubeGetId()+"/0.jpg"},getPlaybackQuality:function(){try{return this.mediaElement.getPlaybackQuality()}catch(b){return false}},getSrc:function(){return this.youtubeGetId()||null},errorListener:function(b){switch((b.data==undefined)?b:b.data){case 100:this.setTestcard(500);break;case 101:case 150:this.setTestcard(501);break;case 2:this.setTestcard(502);break}},stateChange:function(b){clearTimeout(this._updateTimer);if(this.mediaElement===null||this.getState("COMPLETED")){return}switch((b.data==undefined)?b:b.data){case -1:this.setPlay();this.ffFix=true;break;case 0:if(this.getState("AWAKENING")){break}this._setBufferState("full");this.endedListener({});break;case 1:this._setBufferState("full");if((this.media.position||0)>0&&(a.browser.mozilla)&&this.ffFix){this.ffFix=false;this.setSeek(this.media.position)}this.playingListener({});this.canplayListener({});this.updateInfo();break;case 2:this.pauseListener({});break;case 3:this.waitingListener({});break;case 5:if(this.useIframeAPI!==true){this.onReady()}break}},onReady:function(){this.setVolume(this.pp.getVolume());a("#"+this.pp.getId()+"_media").attr("ALLOWTRANSPARENCY",true).attr({scrolling:"no",frameborder:0}).css({overflow:"hidden",display:"block",border:"0"});if(this.media.title||this.pp.config.title||this.pp.getIsMobileClient()){this.displayReady();
return}var b=this;a.ajax({url:"http://gdata.youtube.com/feeds/api/videos/"+this.youtubeGetId()+"?v=2&alt=jsonc",async:false,complete:function(f,c){try{data=f.responseText;if(typeof data=="string"){data=a.parseJSON(data)}if(data.data.title){b.sendUpdate("config",{title:data.data.title+" ("+data.data.uploader+")"})}}catch(d){}b.displayReady()}})},youtubeGetId:function(){return encodeURIComponent(this.media.file[0].src.replace(/^[^v]+v.(.{11}).*/,"$1"))},updateInfo:function(){var b=this;clearTimeout(this._updateTimer);(function(){if(b.mediaElement==null){clearTimeout(b._updateTimer);return}try{if(b.getState("PLAYING")){b.timeListener({position:b.mediaElement.getCurrentTime(),duration:b.mediaElement.getDuration()});b.progressListener({loaded:b.mediaElement.getVideoBytesLoaded(),total:b.mediaElement.getVideoBytesTotal()});b._updateTimer=setTimeout(arguments.callee,500)}}catch(c){}})()}});$p.newModel({modelId:"YTAUDIO",iLove:[{ext:"youtube.com",type:"audio/youtube",platform:"flash",fixed:"maybe"}]},"YTVIDEO")});var playerModel=function(){};jQuery(function(a){playerModel.prototype={modelId:"player",iLove:[],_currentState:null,_currentBufferState:null,_ap:false,_volume:0,_quality:"default",_displayReady:false,_isPlaying:false,_id:null,_KbPerSec:0,_bandWidthTimer:null,_isPoster:false,_isFullscreen:false,hasGUI:false,allowRandomSeek:false,flashVerifyMethod:"api_get",mediaElement:null,pp:{},media:{duration:0,position:0,maxpos:0,offset:0,file:false,poster:"",ended:false,loadProgress:0,errorCode:0},_init:function(b){this.pp=b.pp||null;this.media=a.extend(true,{},this.media,b.media);this._ap=b.autoplay;this._id=$p.utils.randomId(8);this._quality=b.quality||this._quality;this._volume=this.pp.getVolume("volume");this._playbackQuality=this.pp.getPlaybackQuality();this.init()},init:function(b){this.ready()},ready:function(){this.sendUpdate("modelReady");if(this._ap){this._setState("awakening")}else{this.displayItem(false)}},displayItem:function(b){if(b!==true||this.getState("STOPPED")){this._setState("idle");this.applyImage(this.getPoster(),this.pp.getMediaContainer().html(""));this._isPoster=true;this.displayReady();return}a("#"+this.pp.getMediaId()+"_image").remove();if(this.hasGUI){this.pp.env.playerDom.children().not("."+this.pp.getConfig("cssClassPrefix")+"display").addClass("inactive").removeClass("active")}this._displayReady=false;this._isPoster=false;a("#"+this.pp.getId()+"_testcard_media").remove();this.applyMedia(this.pp.getMediaContainer())},applyMedia:function(){},sendUpdate:function(b,c){this.pp._modelUpdateListener(b,c)},displayReady:function(){this._displayReady=true;this.pp._modelUpdateListener("displayReady")},start:function(){var b=this;if(this.mediaElement==null&&this.modelId!="PLAYLIST"){return}if(this.getState("STARTING")){return}this._setState("STARTING");if(!this.getState("STOPPED")){this.addListeners()}if(this.pp.getIsMobileClient("ANDROID")&&!this.getState("PLAYING")){setTimeout(function(){b.setPlay()},500)}this.setPlay()},addListeners:function(){},removeListeners:function(){try{this.mediaElement.unbind(".projekktor"+this.pp.getId())}catch(b){}},detachMedia:function(){},destroy:function(){this.removeListeners();this._setState("destroying");this.detachMedia();this.media.loadProgress=0;this.media.playProgress=0;this.media.position=0;this.media.duration=0},reInit:function(){if(this.flashVersion!=false||!(a.browser.mozilla)||this.getState("ERROR")||this.pp.getConfig("bypassFlashFFFix")===true){return}this.sendUpdate("FFreinit");this.removeListeners();this.displayItem((!this.getState("IDLE")))},applyCommand:function(c,b){switch(c){case"quality":this.setQuality(b);break;case"play":if(this.getState("ERROR")){break}if(this.getState("IDLE")){this._setState("awakening");break}this.setPlay();break;case"pause":if(this.getState("ERROR")){break}this.setPause();break;case"volume":if(this.getState("ERROR")){break}if(!this.setVolume(b)){this._volume=b;this.sendUpdate("volume",b)}break;case"stop":this.setStop();break;case"seek":if(this.getState("ERROR")){break}if(this.getState("SEEKING")){break}if(this.media.loadProgress==-1){break}this._setState("seeking");this.sendUpdate("seek",b);this.setSeek(b);break;case"fullscreen":if(b==this._isFullscreen){break}this._isFullscreen=b;this.sendUpdate("fullscreen",b);this.setFullscreen(b);this.reInit();break;case"resize":this.setResize();this.sendUpdate("resize",b);break}},setSeek:function(b){},setPlay:function(){},setPause:function(){},setStop:function(){this.detachMedia();this._setState("stopped");this.displayItem(false)},setVolume:function(b){},setFullscreen:function(b){this.setResize()},setResize:function(){var b=this.pp.getMediaContainer();this.sendUpdate("scaled",{realWidth:this.videoWidth||null,realHeight:this.videoHeight||null,displayWidth:b.width(),displayHeight:b.height()})},setPosterLive:function(){},setQuality:function(c){var b=[];if(this._quality==c){return}this._quality=c;if(this.getState("PLAYING")||this.getState("PAUSED")){this.applySrc()}this.qualityChangeListener()},applySrc:function(){},getSource:function(){var b=[],d=this.media.offset||this.pp.getConfig("start")||false,c=this;a.each(this.media.file||[],function(){if(c._quality!=this.quality&&c._quality!=null){return true}var e=(c.pp.getConfig("streamType")=="pseudo")?c.pp.getConfig("startParameter"):false;if(!e||!d){b.push(this);return true}var f=$p.utils.parseUri(this.src),h=f.protocol+"://"+f.host+f.path,g=[];a.each(f.queryKey,function(i,j){if(i==e){return true}g.push(i+"="+j)});h+=(g.length>0)?"?"+g.join("&")+"&"+e+"="+d:"?"+e+"="+d;this.src=h;b.push(this);return true});if(b.length==0){this.setTestcard(12)}else{return b}},getVolume:function(){if(this.mediaElement==null){return this._volume}return(this.mediaElement.prop("muted")==true)?0:this.mediaElement.prop("volume")},getLoadProgress:function(){return this.media.loadProgress||0},getLoadPlaybackProgress:function(){return this.media.playProgress||0},getPosition:function(){return this.media.position||0},getDuration:function(){return this.media.duration||0},getMaxPosition:function(){return this.media.maxpos||0
},getPlaybackQuality:function(){return(a.inArray(this._quality,this.media.qualities)>-1)?this._quality:"default"},getInFullscreen:function(){return this.pp.getInFullscreen()},getKbPerSec:function(){return this._KbPerSec},getState:function(c){var b=(this._currentState==null)?"IDLE":this._currentState;if(c!=null){return(b==c.toUpperCase())}return b},getSrc:function(){return this.media.file||null},getModelName:function(){return this.modelId||null},getHasGUI:function(){return(this.hasGUI&&!this._isPoster)},getIsReady:function(){return this._displayReady},getPoster:function(){return this.pp.getConfig("poster")},getMediaElement:function(){return this.mediaElement||a("<video/>")},timeListener:function(e){if(e==null){return}var b=parseFloat(e.position)||parseFloat(e.currentTime)||this.media.position||0,d=parseFloat(e.duration)||null,c=0;if(isNaN(d+b)){return}if(d!=null&&(d!=this.media.duration&&!this.isPseudoStream)||(this.isPseudoStream&&this.media.duration==0)){this.media.duration=d;this.sendUpdate("durationChange",d)}this.media.position=this.media.offset+b;this.media.maxpos=Math.max(this.media.maxpos||0,this.media.position||0);this.media.playProgress=parseFloat((this.media.position>0&&this.media.duration>0)?this.media.position*100/this.media.duration:0);this.sendUpdate("time",this.media.position);this.loadProgressUpdate()},loadProgressUpdate:function(){try{var d=this.mediaElement[0];if(typeof d.buffered!=="object"){return}if(typeof d.buffered.length<=0){return}var b=Math.round(d.buffered.end(d.buffered.length-1)*100)/100,c=b*100/this.media.duration;if(c==this.media.loadProgress){return}this.media.loadProgress=(this.allowRandomSeek===true)?100:-1;this.media.loadProgress=(this.media.loadProgress<100||this.media.loadProgress==undefined)?c:100;this.sendUpdate("progress",this.media.loadProgress)}catch(f){}},progressListener:function(h,c){try{if(typeof this.mediaElement[0].buffered=="object"){if(this.mediaElement[0].buffered.length>0){this.mediaElement.unbind("progress");return}}}catch(g){}if(this._bandWidthTimer==null){this._bandWidthTimer=(new Date()).getTime()}var f=0,d=0;try{if(!isNaN(c.loaded/c.total)){f=c.loaded;d=c.total}else{if(c.originalEvent&&!isNaN(c.originalEvent.loaded/c.originalEvent.total)){f=c.originalEvent.loaded;d=c.originalEvent.total}}}catch(g){if(h&&!isNaN(h.loaded/h.total)){f=h.loaded;d=h.total}}var b=(f>0&&d>0)?f*100/d:0;if(Math.round(b)>Math.round(this.media.loadProgress)){this._KbPerSec=((f/1024)/(((new Date()).getTime()-this._bandWidthTimer)/1000))}b=(this.media.loadProgress!==100)?b:100;b=(this.allowRandomSeek===true)?100:b;if(this.media.loadProgress!=b){this.media.loadProgress=b;this.sendUpdate("progress",b)}if(this.media.loadProgress>=100&&this.allowRandomSeek==false){this._setBufferState("full")}},qualityChangeListener:function(){this.sendUpdate("qualityChange",this._quality)},endedListener:function(b){if(this.mediaElement===null){return}if(this.media.maxpos<=0){return}if(this.getState()=="STARTING"){return}this._setState("completed")},waitingListener:function(b){this._setBufferState("empty")},canplayListener:function(b){this._setBufferState("full")},canplaythroughListener:function(b){this._setBufferState("full")},suspendListener:function(b){this._setBufferState("full")},playingListener:function(b){if(this.getSrc()==null){}this._setState("playing")},startListener:function(b){this.applyCommand("volume",this.pp.getConfig("volume"));if(!this.isPseudoStream){this.setSeek(this.media.position||0)}this._setState("playing")},pauseListener:function(b){this._setState("paused")},seekedListener:function(){if(this._isPlaying){this._setState("PLAYING")}else{this._setState("PAUSED")}},volumeListener:function(b){this.sendUpdate("volume",this.getVolume())},flashReadyListener:function(){this._displayReady=true},errorListener:function(b,c){},metaDataListener:function(c){try{this.videoWidth=c.videoWidth;this.videoHeight=c.videoHeight}catch(b){}this._scaleVideo()},setTestcard:function(f,b){var e=this.pp.getMediaContainer(),d=this.pp.getConfig("messages"),c=(d[f]!=undefined)?d[f]:d[0];c=(b!=undefined&&b!="")?b:c;if(this.pp.getItemCount()>1){c+=d[99]}if(c.length<3){c="ERROR"}if(f==100){c=b}c=$p.utils.parseTemplate(c,a.extend({},this.media,{title:this.pp.getConfig("title")}));e.html("").css({width:"100%",height:"100%"});this.mediaElement=a(document.createElement("div")).addClass(this.pp.getConfig("cssClassPrefix")+"testcard").attr("id",this.pp.getId()+"_testcard_media").appendTo(e);if(c.length>0){a(document.createElement("p")).appendTo(this.mediaElement).html(c)}this._setState("error")},applyImage:function(e,c){var g=a(document.createElement("img")).hide(),f=this;$p.utils.blockSelection(g);if(e==""||e==undefined){return a(document.createElement("span")).attr({id:this.pp.getMediaId()+"_image"}).appendTo(c)}g.html("").appendTo(c).attr({id:this.pp.getMediaId()+"_image",src:e,alt:this.pp.getConfig("title")||""}).css({position:"absolute"});g.error(function(h){a(this).remove()});var b=function(h){h.realWidth=h.prop("width");
h.realHeight=h.prop("height");h.width=function(){return h.realWidth};h.height=function(){return h.realHeight}};if(a.browser.msie){(function(){try{if(g[0].complete==true){g.show();b(g);$p.utils.stretch(f.pp.getConfig("imageScaling"),g,c.width(),c.height());return}setTimeout(arguments.callee,100)}catch(h){setTimeout(arguments.callee,100)}})()}else{g.load(function(h){g.show();b(g);$p.utils.stretch(f.pp.getConfig("imageScaling"),g,c.width(),c.height())})}var d=function(j,h){return;if(h.is(":visible")===false){f.pp.removeListener("fullscreen",arguments.callee)}b(j);var i=h.width(),k=h.height(),l=j.width(),n=j.height();if($p.utils.stretch(f.pp.getConfig("imageScaling"),j,h.width(),h.height())){try{f.sendUpdate("scaled",{realWidth:j._originalDimensions.width,realHeight:j._originalDimensions.height,displayWidth:f.mediaElement.width(),displayHeight:f.mediaElement.height()})}catch(m){}}};this.pp.addListener("fullscreen",function(){d(g,c)});this.pp.addListener("resize",function(){d(g,c)});return g},createFlash:function(d,b,c){this.mediaElement=$p.utils.embeddFlash(b.html(""),d,c);this._waitforPlayer()},_waitforPlayer:function(){if(this._displayReady==true){return}this._setBufferState("empty");var c=this,b=0;(function(){if(b>6&&a.browser.mozilla){b=0;var d=a(c.mediaElement).parent(),g=a(c.mediaElement).clone();d.html("").append(g);c.mediaElement=g.get(0)}var d=c.mediaElement;b++;try{if(d==undefined){setTimeout(arguments.callee,200)}else{if(d[c.flashVerifyMethod]==undefined){setTimeout(arguments.callee,200)}else{c._setBufferState("full");c.flashReadyListener()}}}catch(f){setTimeout(arguments.callee,200)}})()},_setState:function(c){var b=this;c=c.toUpperCase();if(this._currentState!=c){if(this._currentState=="PAUSED"&&c=="PLAYING"){this.sendUpdate("resume",this.media);this._isPlaying=true}if((this._currentState=="IDLE"||this._currentState=="STARTING")&&c=="PLAYING"){this.sendUpdate("start",this.media);this._isPlaying=true}if(c=="PAUSED"){this._isPlaying=false}if(c=="ERROR"){this.setPlay=function(){b.sendUpdate("start")}}this._currentState=c.toUpperCase();this.sendUpdate("state",this._currentState)}},_setBufferState:function(b){if(this._currentBufferState!=b.toUpperCase()){this._currentBufferState=b.toUpperCase();this.sendUpdate("buffer",this._currentBufferState)}},_scaleVideo:function(h){var d=this.pp.getMediaContainer();if(this.pp.getIsMobileClient()){return}try{var f=d.width(),i=d.height(),b=this.videoWidth,c=this.videoHeight;if($p.utils.stretch(this.pp.getConfig("videoScaling"),this.mediaElement,f,i,b,c)){this.sendUpdate("scaled",{realWidth:b,realHeight:c,displayWidth:f,displayHeight:i})}}catch(g){}}}});jQuery(function(a){$p.newModel({modelId:"NA",iLove:[{ext:"NaN",type:"none/none",platform:"browser"}],hasGUI:true,applyMedia:function(c){c.html("");var b=this;this.mouseClick=function(){b.pp.removeListener("leftclick",arguments.callee);b._setState("completed")};this.displayReady();if(this.pp.getConfig("skipTestcard")&&this.pp.getItemCount>1){b._setState("completed");return}if(this.pp.getConfig("enableTestcard")&&!this.pp.getIsMobileClient()){this.setTestcard((this.media.file[0].src!==null&&this.media.errorCode===7)?5:this.media.errorCode);this.pp.addListener("leftclick",mouseClick)}else{this.applyCommand("stop");window.location.href=this.media.file[0].src}},detachMedia:function(){this.pp.removeListener("leftclick",this.mouseClick)}})});jQuery(function(a){$p.newModel({modelId:"PLAYLIST",iLove:[{ext:"json",type:"text/json",platform:"browser"},{ext:"jsonp",type:"text/jsonp",platform:"browser"},{ext:"xml",type:"text/xml",platform:"browser"},{ext:"json",type:"application/json",platform:"browser"},{ext:"jsonp",type:"application/jsonp",platform:"browser"},{ext:"xml",type:"application/xml",platform:"browser"}],applyMedia:function(b){this.displayReady()},setPlay:function(){this.sendUpdate("playlist",this.media)}})});var projekktorDisplay=function(){};jQuery(function(a){projekktorDisplay.prototype={logo:null,logoIsFading:false,display:null,displayClicks:0,buffIcn:null,buffIcnSprite:null,bufferDelayTimer:null,_controlsDims:null,config:{displayClick:{callback:"setPlayPause",value:null},displayPlayingClick:{callback:"setPlayPause",value:null},displayDblClick:{callback:null,value:null},staticControls:false,bufferIconDelay:1000,designMode:false,spriteUrl:"",spriteWidth:50,spriteHeight:50,spriteTiles:25,spriteOffset:1,spriteCountUp:false,logoImage:"",logoDelay:1,logoPosition:"tl",logoClick:false},initialize:function(){var b=this;this.display=this.applyToPlayer(a(document.createElement("div")).addClass("display"));this.buffIcn=this.applyToPlayer(a(document.createElement("div")).addClass("buffering")).addClass("inactive");if(this.config.spriteUrl!=""){this.buffIcnSprite=a(document.createElement("div")).appendTo(this.buffIcn).css({width:this.config.spriteWidth,height:this.config.spriteHeight,marginLeft:((this.buffIcn.width()-this.config.spriteWidth)/2)+"px",marginTop:((this.buffIcn.height()-this.config.spriteHeight)/2)+"px",backgroundColor:"transparent",backgroundImage:"url("+this.config.spriteUrl+")",backgroundRepeat:"no-repeat",backgroundPosition:"0 0"}).addClass("inactive")}this.startButton=this.applyToPlayer(a(document.createElement("div")).addClass("start")).addClass("inactive");this.pp.getMediaContainer();this.logo=this.applyToPlayer(a("<img/>").addClass("logo").addClass("inactive").attr("src",$p.utils.imageDummy()).css("position","absolute").css(((this.getConfig("logoPosition").indexOf("r")>-1)?"right":"left"),"2%").css(((this.getConfig("logoPosition").indexOf("t")>-1)?"top":"bottom"),"2%"));this.pluginReady=true},displayReadyHandler:function(){var b=this;this.startButton.unbind().click(function(){b.pp.setPlay()});this.hideStartButton();if(this.getConfig("designMode")){this.shofBufferIcon()}},syncingHandler:function(){this.showBufferIcon();if(this.pp.getState("IDLE")){this.hideStartButton()}},readyHandler:function(){this.hideBufferIcon();if(this.pp.getState("IDLE")){this.showStartButton()}},bufferHandler:function(b){if(!this.pp.getState("PLAYING")&&!this.pp.getState("AWAKENING")){return}if(b=="EMPTY"){this.showBufferIcon()}else{this.hideBufferIcon()}},stateHandler:function(b){switch(b){case"STARTING":this.showBufferIcon();this.hideStartButton();break;case"PLAYING":this.hideBufferIcon();this.hideStartButton();break;case"IDLE":this.showStartButton();break;case"AWAKENING":this.hideStartButton();break;case"ERROR":this.logo.addClass("inactive").removeClass("active");this.hideBufferIcon();this.hideStartButton();break;case"COMPLETED":this.hideBufferIcon();break;default:this.hideStartButton()}},stoppedHandler:function(){this.hideBufferIcon()},scheduleLoadingHandler:function(){this.hideStartButton();this.showBufferIcon()},scheduledHandler:function(){if(!this.getConfig("autoplay")){tthis.showStartButton()}this.hideBufferIcon()},itemHandler:function(){var b=this;this.logoIsFading=false;this.logoImage=this.getConfig("logoImage");this.logo.stop(true,true).addClass("inactive").removeClass("active").attr("src",$p.utils.imageDummy()).unbind()},timeHandler:function(){if(this.logoImage==false){return}if(this.pp.getIsMobileClient("android")){return}var b=this.pp.getPosition(),d=this.pp.getDuration(),c=this;if(!this.logoIsFading&&b+this.config.logoDelay+1<d){if(b>this.config.logoDelay&&d>(this.config.logoDelay*2)){this.logoIsFading=true;this.logo.css({cursor:(this.getConfig("logoClick")!=null)?"pointer":"normal"}).unbind().bind("touchstart",function(){c._clickHandler("logo")}).error(function(){c.logoImage=false;a(this).attr("src",$p.utils.imageDummy()).addClass("inactive").removeClass("active")}).load(function(){c.logo.fadeIn("slow",function(){a(this).addClass("active").removeClass("inactive");c.logoIsFading=false})}).click(function(){c._clickHandler("logo")}).attr("src",this.logoImage)}}if(!this.logoIsFading){if(b+this.config.logoDelay+1>d){this.logoIsFading=true;this.logo.fadeOut("slow",function(){a(this).addClass("inactive").removeClass("active");c.logoIsFading=false})}}},plugineventHandler:function(c){if(c.PLUGIN=="controlbar"&&c.EVENT=="show"&&this.getConfig("staticControls")){var b=c.height*100/this.pp.getDC().height();this.display.height((100-b)+"%").data("sc",true)}},leftclickHandler:function(b){var c=this;if(a(b.target).attr("id").indexOf("_media")==-1){return}switch(this.pp.getState()){case"ERROR":this.pp.setActiveItem("next");return;case"IDLE":this.pp.setPlay();return}if(this.pp.getHasGUI()==true){return}this.displayClicks++;if(this.displayClicks>0){setTimeout(function(){if(c.displayClicks==1){if(c.pp.getState()=="PLAYING"){c._clickHandler("displayPlaying")}else{c._clickHandler("display")}}else{if(c.displayClicks==2){c._clickHandler("displayDbl")}}c.displayClicks=0},250)}return},showStartButton:function(){this.startButton.addClass("active").removeClass("inactive")},hideStartButton:function(){this.startButton.addClass("inactive").removeClass("active")
},hideBufferIcon:function(){var b=this;if(this.getConfig("designMode")){return}clearTimeout(this.bufferDelayTimer);this.buffIcn.stop(true,true);this.buffIcn.fadeOut("fast",function(){a(this).addClass("inactive").removeClass("active").css("display","")})},showBufferIcon:function(b){var c=this;clearTimeout(this.bufferDelayTimer);if(this.pp.getHasGUI()){return}if((this.pp.getModel()==="YTAUDIO"||this.pp.getModel()==="YTVIDEO")&&!this.pp.getState("IDLE")){b=true}if(b!=true&&this.getConfig("bufferIconDelay")>0){this.bufferDelayTimer=setTimeout(function(){c.showBufferIcon(true)},this.getConfig("bufferIconDelay"));return}this.buffIcn.stop(true,true);if(this.buffIcn.hasClass("active")){return}this.buffIcn.fadeIn("fast",function(){if(c.buffIcnSprite==null){return}var d=(c.config.spriteCountUp==true)?0:(c.config.spriteHeight+c.config.spriteOffset)*(c.config.spriteTiles-1),e=d;c.buffIcnSprite.addClass("active").removeClass("inactive").css("display","");(function(){if(!c.buffIcn.is(":visible")){return}c.buffIcnSprite.css("backgroundPosition","0px -"+e+"px");if(c.config.spriteCountUp==true){e+=c.config.spriteHeight+c.config.spriteOffset}else{e-=c.config.spriteHeight+c.config.spriteOffset}if(e>(d+c.config.spriteHeight)*c.config.spriteTiles||e<c.config.spriteOffset){e=d}setTimeout(arguments.callee,60)})()})},_clickHandler:function(c){try{this.pp[this.getConfig(c+"Click").callback](this.getConfig(c+"Click").value)}catch(b){try{this.getConfig(c+"Click")(this.getConfig(c+"Click").value)}catch(b){}}return false}}});var projekktorControlbar=function(){};jQuery(function(a){projekktorControlbar.prototype={_cTimer:null,_noCHide:false,_cFading:false,_vSliderAct:false,_storeVol:0,_timeTags:{},cb:null,_pos:{left:0,right:0},controlElements:{},controlElementsConfig:{cb:null,playhead:{on:null,call:null},loaded:null,scrubber:null,scrubberdrag:{on:["mousedown"],call:"scrubberdragStartDragListener"},play:{on:["touchstart","click"],call:"playClk"},pause:{on:["touchstart","click"],call:"pauseClk"},stop:{on:["touchstart","click"],call:"stopClk"},prev:{on:["touchstart","click"],call:"prevClk"},next:{on:["touchstart","click"],call:"nextClk"},rewind:{on:["touchstart","click"],call:"rewindClk"},forward:{on:["touchstart","click"],call:"forwardClk"},fsexit:{on:["touchstart","click"],call:"exitFullscreenClk"},fsenter:{on:["touchstart","click"],call:"enterFullscreenClk"},loquality:{on:["touchstart","click"],call:"setQualityClk"},hiquality:{on:["touchstart","click"],call:"setQualityClk"},vslider:{on:["touchstart","click"],call:"vsliderClk"},vmarker:{on:["touchstart","click"],call:"vsliderClk"},vknob:{on:["mousedown"],call:"vknobStartDragListener"},mute:{on:["touchstart","click"],call:"muteClk"},unmute:{on:["touchstart","click"],call:"unmuteClk"},vmax:{on:["touchstart","click"],call:"vmaxClk"},open:{on:["touchstart","click"],call:"openCloseClk"},close:{on:["touchstart","click"],call:"openCloseClk"},loop:{on:["touchstart","click"],call:"loopClk"},draghandle:{on:["mousedown"],call:"handleStartDragListener"},controls:null,title:null,sec_dur:null,min_dur:null,hr_dur:null,sec_elp:null,min_elp:null,hr_elp:null,sec_rem:null,min_rem:null,hr_rem:null},config:{disableFade:false,toggleMute:false,showCuePoints:false,fadeDelay:2500,showOnStart:false,showOnIdle:false,controlsTemplate:'<ul class="left"><li><div %{play}></div><div %{pause}></div></li><li><div %{title}></div></li></ul><ul class="right"><li><div %{fsexit}></div><div %{fsenter}></div></li><li><div %{vmax}></div></li><li><div %{vslider}><div %{vmarker}></div><div %{vknob}></div></div></li><li><div %{mute}></div></li><li><div %{timeleft}>%{hr_elp}:%{min_elp}:%{sec_elp} | %{hr_dur}:%{min_dur}:%{sec_dur}</div></li><li><div %{next}></div></li><li><div %{prev}></div></li></ul><ul class="bottom"><li><div %{scrubber}><div %{loaded}></div><div %{playhead}></div><div %{scrubberdrag}></div></div></li></ul>'},initialize:function(){var f=this,e=this.playerDom.html(),c=true,b=this.getConfig("cssClassPrefix");for(var d in this.controlElementsConfig){if(e.match(new RegExp(b+d,"gi"))){c=false;break}}if(c){this.cb=this.applyToPlayer(a(document.createElement("div")).addClass("controls"));this.applyTemplate(this.cb,this.getConfig("controlsTemplate"))}else{this.cb=this.playerDom.find("."+b+"controls")}for(var d in this.controlElementsConfig){this.controlElements[d]=a(this.playerDom).find("."+b+d);$p.utils.blockSelection(this.controlElements[d])}this.addGuiListeners();this._storeVol=this.getConfig("volume");this.updateDisplay();this.hidecb(true);this.pluginReady=true},applyTemplate:function(c,f){var d=this,b=this.getConfig("cssClassPrefix");if(f){var e=f.match(/\%{[a-zA-Z_]*\}/gi);if(e!=null){a.each(e,function(g,h){var i=h.replace(/\%{|}/gi,"");if(h.match(/\_/gi)){f=f.replace(h,'<span class="'+b+i+'"></span>')}else{f=f.replace(h,'class="'+b+i+'"')}})}c.html(f)}},itemHandler:function(b){this.pluginReady=true;this.hidecb(true);this.drawTitle();this.displayQualityToggle()},startHandler:function(){if(this.getConfig("showOnStart")==true){this.showcb(true)}else{this.hidecb(true)}},readyHandler:function(b){clearTimeout(this._cTimer);this.cb.removeClass("fade");if(this.getConfig("showOnIdle")){this.showcb(true)}if(!this.getConfig("disableFade")){this.cb.addClass("fade")}else{this.sendEvent("show",{width:this.cb.width(),height:this.cb.height()})}this.pluginReady=true},durationChangeHandler:function(b){this.sendEvent("show",{width:this.cb.width(),height:this.cb.height()});this.displayCuePoints(b)},updateDisplay:function(){var b=this,c=this.pp.getState();clearTimeout(this._cTimer);if(this.pp.getHasGUI()){return}if(this.getConfig("controls")==false){this.hidecb(true);return}if(this.pp.getItemCount()<2||this.getConfig("disallowSkip")){this._active("prev",false);this._active("next",false)}else{this._active("prev",true);this._active("next",true)}if(this.pp.getItemIdx()<1){this._active("prev",false)}if(this.pp.getItemIdx()>=this.pp.getItemCount()-1){this._active("next",false)}if(this.getConfig("disablePause")){this._active("play",false);this._active("pause",false)}else{if(c==="PLAYING"){this.drawPauseButton()}if(c==="PAUSED"){this.drawPlayButton()}if(c==="IDLE"){this.drawPlayButton()}}this._active("stop",c!=="IDLE");this._active("forward",c!=="IDLE");this._active("rewind",c!=="IDLE");if(this.pp.getInFullscreen()===true){this.drawExitFullscreenButton()}else{this.drawEnterFullscreenButton()}if(!this.getConfig("enableFullscreen")||this.getConfig("isCrossDomain")){this._active("fsexit",false);this._active("fsenter",false)}this._active("loop",this.pp.getConfig("loop"));
this.displayQualityToggle();this.displayTime();this.displayVolume(this.pp.getVolume()||this._storeVol)},stateHandler:function(b){this.updateDisplay();if("STOPPED|DONE|IDLE".indexOf(b)>-1){this._noCHide=false;this.hidecb(true);return}if("STOPPED|AWAKENING|IDLE|DONE".indexOf(b)>-1){this.displayTime(0,0,0);this.displayProgress(0)}else{this.displayProgress()}},scheduleModifiedHandler:function(){if(this.pp.getState()==="IDLE"){return}this.updateDisplay();this.displayTime();this.displayProgress()},volumeHandler:function(b){this.displayVolume(b)},progressHandler:function(b){this.displayProgress()},timeHandler:function(b){this.displayTime();this.displayProgress()},qualityChangeHandler:function(b){this.displayQualityToggle(b)},fullscreenHandler:function(d){var c=this,b=this.getConfig("cssClassPrefix");clearTimeout(this._cTimer);this._noCHide=false;this._cFading=false;this._vSliderAct=false;if(!this.getConfig("controls")){return}if(!this.getConfig("enableFullscreen")||this.getConfig("isCrossDomain")){return}if(d){this.cb.addClass("fullscreen");this.drawExitFullscreenButton()}else{this.cb.removeClass("fullscreen");this.drawEnterFullscreenButton()}if(this.pp.getState()=="IDLE"&&!this.getConfig("showOnIdle")){this.hidecb(true)}else{this._cTimer=setTimeout(function(){c.hidecb()},this.getConfig("fadeDelay"))}if(this.getConfig("disableFade")){this.sendEvent("show",{width:this.cb.width(),height:this.cb.height()})}},scaledHandler:function(){if(this.getConfig("disableFade")){this.sendEvent("show",{width:this.cb.width(),height:this.cb.height()})}},addGuiListeners:function(){var b=this;a.each(this.controlElementsConfig,function(c,d){if(!d){return true}if(d.on==null){return true}a.each(d.on,function(h,e){var f=("on"+e in window.document);if(!f){var g=document.createElement("div");g.setAttribute("on"+e,"return;");f=(typeof g["on"+e]=="function")}if(f){b.controlElements[c].bind(e,function(i){b.clickCatcher(i,d.call,b.controlElements[c])});return false}})});this.cb.mouseenter(function(c){b.controlsMouseEnterListener(c)});this.cb.mouseleave(function(c){b.controlsMouseLeaveListener(c)})},clickCatcher:function(b,d,c){if(a.browser.msie){b.cancelBubble=true}else{b.stopPropagation();b.preventDefault()}this[d](b,c);return false},drawTitle:function(){var b=this;this.controlElements.title.html(this.getConfig("title",""))},hidecb:function(c){clearTimeout(this._cTimer);var b=this.getConfig("cssClassPrefix"),d=this;if(this.cb==null){return}this.cb.stop(true,true);if(this.getConfig("disableFade")||this._noCHide||!this.cb.is(":visible")){return}if(c===true){this._cFading=false;this.cb.removeClass("active").addClass("inactive").css("display","");return}if(this.getConfig("controls")==false||this.pp.getHasGUI()||!this.cb.hasClass("fade")){this.cb.removeClass("active").addClass("inactive");return}this.cb.fadeOut("slow",function(){a(this).removeClass("active").addClass("inactive").css("display","");d._cFading=false})},showcb:function(c){clearTimeout(this._cTimer);if(this.pp.getHasGUI()||this.getConfig("controls")==false){this.cb.removeClass("active").addClass("inactive").css("display","");return}var d=this,b=this.getConfig("cssClassPrefix");if(this.cb==null){return}if("IDLE|AWAKENING|ERROR".indexOf(this.pp.getState())>-1&&c!=true){return}this.cb.stop(true,true);if((!this.cb.hasClass("fade")||c==true)){this.cb.removeClass("inactive").addClass("active").css("display","");return}if(this.cb.is(":visible")||this._cFading==true){this._cTimer=setTimeout(function(){d.hidecb()},this.getConfig("fadeDelay"));return}this._cFading=true;this.cb.fadeIn("slow",function(){d._cFading=false;a(this).removeClass("inactive").addClass("active").css("display","")})},displayTime:function(f,c,j){if(this.pp.getHasGUI()){return}try{var d=(f!=undefined)?f:this.pp.getLoadPlaybackProgress(),h=(c!=undefined)?c:this.pp.getDuration(),b=(j!=undefined)?j:this.pp.getPosition()}catch(g){var d=f||0,h=c||0,b=j||0}this.controlElements.playhead.data("pct",d).css({width:d+"%"});var i=a.extend({},this._clockDigits(h,"dur"),this._clockDigits(b,"elp"),this._clockDigits(h-b,"rem"));a.each(this.controlElements,function(e,k){if(i[e]){a.each(k,function(){a(this).html(i[e])})}})},displayProgress:function(){this.controlElements.loaded.css("width",this.pp.getLoadProgress()+"%")},displayVolume:function(f){if(this._vSliderAct==true){return}if(f==null){return}var b=this.cb.is(":visible"),e=this,d=this.getConfig("fixedVolume"),c=(this.controlElements.mute.hasClass("toggle")||this.controlElements.unmute.hasClass("toggle")||this.getConfig("toggleMute"));this._active("mute",!d);this._active("unmute",!d);this._active("vmax",!d);this._active("vknob",!d);this._active("vmarker",!d);this._active("vslider",!d);this.controlElements.vmarker.css("width",f*100+"%");this.controlElements.vknob.css("left",f*100+"%");if(c){switch(parseFloat(f)){case 0:this._active("mute",false);this._active("unmute",true);this._active("vmax",true);break;default:this._active("mute",true);this._active("unmute",false);this._active("vmax",false);
break}}if(b){this.cb.fadeTo(1,0.99).fadeTo(1,1)}},displayCuePoints:function(c){var b=this;if(!this.getConfig("showCuePoints")){return}a.each(this.pp.getCuePoints()||[],function(){var d=Math.max((this.off-this.on)*100/c,Math.round(c/100),1),g=(this.on*100/c)-((d/2)*100/c),f=this,e=b.pp,h=a(document.createElement("div")).addClass(b.getConfig("cssClassPrefix")+"cuepoint").addClass("inactive").css("left",g+"%").css("width",d+"%");this.addListener("unlock",function(){a(h).removeClass("inactive").addClass("active");h.click(function(){b.pp.setPlayhead(h.data("on"))})});a(".ppscrubber").append(h)})},drawPauseButton:function(b){this._active("pause",true);this._active("play",false)},drawPlayButton:function(b){this._active("pause",false);this._active("play",true)},drawEnterFullscreenButton:function(b){this._active("fsexit",false);this._active("fsenter",true)},drawExitFullscreenButton:function(b){this._active("fsexit",true);this._active("fsenter",false)},displayQualityToggle:function(d){var f=this.getConfig("playbackQualities"),e=this.pp.getPlaybackQualities(),b=this.getConfig("cssClassPrefix");best=[];if(e.length<2||f.length<2){this._active("loquality",false).removeClass().addClass(b+"loquality").data("qual","");this._active("hiquality",false).removeClass().addClass(b+"hiquality").data("qual","");return}f.sort(function(h,g){return h.minHeight-g.minHeight});for(var c=f.length;c--;c>0){if(a.inArray(f[c].key,e)>-1){best.push(f[c].key)}if(best.length>1){break}}if(best[0]==this.pp.getPlaybackQuality()){this._active("loquality",true).addClass("qual"+best[1]).data("qual",best[1]);this._active("hiquality",false).addClass("qual"+best[0]).data("qual",best[0])}else{this._active("loquality",false).addClass("qual"+best[1]).data("qual",best[1]);this._active("hiquality",true).addClass("qual"+best[0]).data("qual",best[0])}},setQualityClk:function(b){this.pp.setPlaybackQuality(a(b.target).data("qual"))},playClk:function(b){this.pp.setPlay()},pauseClk:function(b){this.pp.setPause()},stopClk:function(b){this.pp.setStop()},controlsMouseEnterListener:function(b){this._noCHide=true},controlsMouseLeaveListener:function(b){this._noCHide=false},controlsClk:function(b){},mousemoveHandler:function(b){if(this.pp.getState("STARTING")){return}if(this.pp.getIsMobileClient()){this._noCHide=true}this.showcb()},mouseleaveHandler:function(b){var c=this;clearTimeout(this._cTimer);this._noCHide=false;this._cTimer=setTimeout(function(){c.hidecb()},800)},prevClk:function(b){this.pp.setActiveItem("previous")},nextClk:function(b){this.pp.setActiveItem("next")},forwardClk:function(b){this.pp.setPlayhead("+10")},rewindClk:function(b){this.pp.setPlayhead("-10")},muteClk:function(b){this._storeVol=(this.pp.getVolume()==0)?this.getConfig("volume"):this.pp.getVolume();this.pp.setVolume(0)},unmuteClk:function(b){if(this._storeVol<=0){this._storeVol=1}this.pp.setVolume(this._storeVol)},vmaxClk:function(b){this.pp.setVolume(1)},enterFullscreenClk:function(b){this.pp.setFullscreen(true)},exitFullscreenClk:function(b){this.pp.setFullscreen(false)},openCloseClk:function(b){var c=this;a(a(b.currentTarget).attr("class").split(/\s+/)).each(function(d,e){if(e.indexOf("toggle")==-1){return}c.playerDom.find("."+e.substring(6)).slideToggle("slow",function(){c.pp.setResize()});c.controlElements.open.toggle();c.controlElements.close.toggle()})},loopClk:function(b){this.pp.setLoop(a(b.currentTarget).hasClass("inactive")||false);this.updateDisplay()},startClk:function(b){this.pp.setPlay()},vmarkerClk:function(b){vsliderClk(b)},vsliderClk:function(c){if(this._vSliderAct==true){return}var g=(this.pp.getInFullscreen()===true&&this.controlElements.vslider.length>1)?1:0,e=a(this.controlElements.vslider[g]),b=e.width(),d=(c.originalEvent.touches)?c.originalEvent.touches[0].pageX:c.originalEvent.pageX,f=d-e.offset().left;if(f<0||f=="NaN"||f==undefined){result=0}else{result=(f/b)}this.pp.setVolume(result);this._storeVol=result},scrubberdragStartDragListener:function(b){if(this.getConfig("disallowSkip")==true){return}this._sSliderAct=true;var e=this,f=(this.pp.getInFullscreen()===true&&this.controlElements.scrubber.length>1)?1:0,c=a(this.controlElements.scrubberdrag[f]),g=a(this.controlElements.loaded[f]),d=0,k=Math.abs(parseInt(c.offset().left)-b.clientX),i=function(m){var l=Math.abs(c.offset().left-m.clientX);l=(l>c.width())?c.width():l;l=(l>g.width())?g.width():l;l=(l<0)?0:l;l=Math.abs(l/c.width())*e.pp.getDuration();if(l>0&&l!=d){d=l;e.pp.setPlayhead(d)}},h=function(l){if(a.browser.msie){l.cancelBubble=true}else{l.stopPropagation()}e.playerDom.unbind("mouseup.slider");c.unbind("mousemove",j);c.unbind("mouseup",h);e._sSliderAct=false;return false},j=function(l){clearTimeout(e._cTimer);if(a.browser.msie){l.cancelBubble=true}else{l.stopPropagation()}i(l);return false};this.playerDom.bind("mouseup.slider",h);c.mouseup(h);c.mousemove(j);i(b)},vknobStartDragListener:function(b,c){this._vSliderAct=true;var f=this,g=(this.pp.getInFullscreen()===true&&this.controlElements.vslider.length>1)?1:0,e=a(c[g]),d=a(this.controlElements.vslider[g]),d=a(this.controlElements.vslider[g]),k=Math.abs(parseInt(e.position().left)-b.clientX),h=0,i=function(l){f.playerDom.unbind("mouseup",i);
d.unbind("mousemove",j);d.unbind("mouseup",i);e.unbind("mousemove",j);e.unbind("mouseup",i);f._vSliderAct=false;return false},j=function(l){clearTimeout(f._cTimer);var m=(l.clientX-k);m=(m>d.width()-e.width()/2)?d.width()-(e.width()/2):m;m=(m<0)?0:m;e.css("left",m+"px");h=Math.abs(m/(d.width()-(e.width()/2)));f.pp.setVolume(h);f._storeVol=h;a(f.controlElements.vmarker[g]).css("width",h*100+"%");return false};this.playerDom.mouseup(i);d.mousemove(j);d.mouseup(i);e.mousemove(j);e.mouseup(i)},handleStartDragListener:function(d,g){var h=this;var f=Math.abs(parseInt(this.cb.position().left)-d.clientX);var c=Math.abs(parseInt(this.cb.position().top)-d.clientY);var b=function(i){if(a.browser.msie){i.cancelBubble=true}else{i.stopPropagation()}h.playerDom.unbind("mouseup",b);h.playerDom.unbind("mouseout",b);h.playerDom.unbind("mousemove",e);return false};var e=function(j){if(a.browser.msie){j.cancelBubble=true}else{j.stopPropagation()}clearTimeout(h._cTimer);var k=(j.clientX-f);k=(k>h.playerDom.width()-h.cb.width())?h.playerDom.width()-h.cb.width():k;k=(k<0)?0:k;h.cb.css("left",k+"px");var i=(j.clientY-c);i=(i>h.playerDom.height()-h.cb.height())?h.playerDom.height()-h.cb.height():i;i=(i<0)?0:i;h.cb.css("top",i+"px");return false};this.playerDom.mousemove(e);this.playerDom.mouseup(b)},errorHandler:function(b){this.hidecb(true)},_active:function(d,b){var c=this.controlElements[d];if(b==true){c.addClass("active").removeClass("inactive")}else{c.addClass("inactive").removeClass("active")}return c},_clockDigits:function(e,i){if(e<0||isNaN(e)||e==undefined){e=0}var g=Math.floor(e/(60*60));var h=e%(60*60);var d=Math.floor(h/60);var c=h%60;var f=Math.floor(c);var b={};b["min_"+i]=(d<10)?"0"+d:d;b["sec_"+i]=(f<10)?"0"+f:f;b["hr_"+i]=(g<10)?"0"+g:g;return b}}});

/*!
 * jQuery MsgBox - for jQuery 1.3+
 * http://codecanyon.net/item/jquery-msgbox/92626?ref=aeroalquimia
 *
 * Copyright 2010, Eduardo Daniel Sada
 * You need to buy a license if you want use this script.
 * http://codecanyon.net/wiki/buying/howto-buying/licensing/
 *
 * Version: 1.3.2 (Jun 21 2011)
 *
 * Includes jQuery Easing v1.1.2
 * http://gsgd.co.uk/sandbox/jquery.easIng.php
 * Copyright (c) 2007 George Smith
 * Released under the MIT License.
 */

(function($) {
  
  var ie6 = (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7 && parseInt(jQuery.browser.version, 10) > 4);
  
  if ($.proxy === undefined)
  {
    $.extend({
      proxy: function( fn, thisObject ) {
        if ( fn )
        {
          proxy = function() { return fn.apply( thisObject || this, arguments ); };
        };
        return proxy;
      }
    });
  };

  $.extend( jQuery.easing,
  {
    easeOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
  });

  $.extend($.expr[':'], {
    value: function(a) {
      return $(a).val();
    }
  });

  $.extend({
    MsgBoxObject: {
      defaults    : {
                      name            : 'jquery-msgbox',
                      zIndex          : 10000,
                      width           : 420,
                      height          : 'auto',
                      background      : '#FFFFFF',
                      modal           : true,
                      overlay         : {
                                        'background-color'  : '#000000',
                                        'opacity'           : 0.5
                                        },
                      showDuration    : 200,
                      closeDuration   : 100,
                      moveDuration    : 500,
                      shake           : {
                                        'distance'   : 10,
                                        'duration'   : 100,
                                        'transition' : 'easeOutBack',
                                        'loops'      : 2
                                      },
                      form            : {
                                        'active'  : false,
                                        'action'  : '#',
                                        'method'  : 'post'
                                        },
                      emergefrom      : 'top'
                    },
      options     : {},
      esqueleto   : {
                      msgbox  : [],
                      wrapper : [],
                      form    : [],
                      buttons : [],
                      inputs  : []
                    },
      visible     : false,
      i           : 0,
      animation   : false,
      
      config : function(options) {
        this.options = $.extend(true, this.options, options);
        this.overlay.element.css(this.options.overlay);
        this.overlay.options.hideOnClick = !this.options.modal;
        this.esqueleto.msgbox.css({'width':this.options.width, 'height':this.options.height, 'background-color': this.options.background});
        this.moveBox();
      },

      overlay : {
        create: function(options) {
          this.options = options;
          this.element = $('<div id="'+new Date().getTime()+'"></div>');
          this.element.css($.extend({}, {
            'position'  : 'fixed',
            'top'       : 0,
            'left'      : 0,
            'opacity'   : 0,
            'display'   : 'none',
            'z-index'   : this.options.zIndex
          }, this.options.style));

          this.element.click( $.proxy(function(event) {
            if (this.options.hideOnClick)
            {
              if ($.isFunction(this.options.callback))
              {
                this.options.callback();
              }
              else
              {
                this.hide();
              }
            }
            event.preventDefault();
          }, this));
          
          this.hidden = true;
          this.inject();
          return this;
        },

        inject: function() {
          this.target = $(document.body);
          this.target.append(this.element);

          if(ie6)
          {
            this.element.css({'position': 'absolute'});
            var zIndex = parseInt(this.element.css('zIndex'));
            if (!zIndex)
            {
              zIndex = 1;
              var pos = this.element.css('position');
              if (pos == 'static' || !pos)
              {
                this.element.css({'position': 'relative'});
              }
              this.element.css({'zIndex': zIndex});
            }
            zIndex = (!!(this.options.zIndex || this.options.zIndex === 0) && zIndex > this.options.zIndex) ? this.options.zIndex : zIndex - 1;
            if (zIndex < 0)
            {
              zIndex = 1;
            }
            this.shim = $('<iframe id="IF_'+new Date().getTime()+'" scrolling="no" frameborder=0 src=""></div>');
            this.shim.css({
              zIndex    : zIndex,
              position  : 'absolute',
              top       : 0,
              left      : 0,
              border    : 'none',
              width     : 0,
              height    : 0,
              opacity   : 0
            });
            this.shim.insertAfter(this.element);
            $('html, body').css({
              'height'      : '100%',
              'width'       : '100%',
              'margin-left' : 0,
              'margin-right': 0
            });
          }
        },

        resize: function(x, y) {
          this.element.css({ 'height': 0, 'width': 0 });
          if (this.shim) this.shim.css({ 'height': 0, 'width': 0 });

          var win = { x: $(document).width(), y: $(document).height() };
          
          this.element.css({
            'width'   : '100%',
            'height'  : y ? y : win.y
          });

          if (this.shim)
          {
            this.shim.css({ 'height': 0, 'width': 0 });
            this.shim.css({
              'position': 'absolute',
              'left'    : 0,
              'top'     : 0,
              'width'   : this.element.width(),
              'height'  : y ? y : win.y
            });
          }
          return this;
        },

        show: function() {
          if (!this.hidden) return this;
          if (this.transition) this.transition.stop();
          this.target.bind('resize', $.proxy(this.resize, this));
          this.resize();
          if (this.shim) this.shim.css({'display': 'block'});
          this.hidden = false;

          this.transition = this.element.fadeIn(this.options.showDuration, $.proxy(function(){
            this.element.trigger('show');
          }, this));
          
          return this;
        },

        hide: function() {
          if (this.hidden) return this;
          if (this.transition) this.transition.stop();
          this.target.unbind('resize');
          if (this.shim) this.shim.css({'display': 'none'});
          this.hidden = true;

          this.transition = this.element.fadeOut(this.options.closeDuration, $.proxy(function(){
            this.element.trigger('hide');
            this.element.css({ 'height': 0, 'width': 0 });
          }, this));

          return this;
        }
      },

      create: function() {
        this.options = $.extend(true, this.defaults, this.options);

        this.overlay.create({
          style         : this.options.overlay,
          hideOnClick   : !this.options.modal,
          zIndex        : this.options.zIndex-1,
          showDuration  : this.options.showDuration,
          closeDuration : this.options.closeDuration
        });
                
        this.esqueleto.msgbox = $('<div class="'+this.options.name+'"></div>');
        this.esqueleto.msgbox.css({
          'display'   : 'none',
          'position'  : 'absolute',
          'top'       : 0,
          'left'      : 0,
          'width'     : this.options.width,
          'height'    : this.options.height,
          'z-index'   : this.options.zIndex,
          'word-wrap' : 'break-word',
          '-moz-box-shadow'         : '0 0 15px rgba(0, 0, 0, 0.5)',
          '-webkit-box-shadow'      : '0 0 15px rgba(0, 0, 0, 0.5)',
          'box-shadow'              : '0 0 15px rgba(0, 0, 0, 0.5)',
          '-moz-border-radius'      : '6px',
          '-webkit-border-radius'   : '6px',
          'border-radius'           : '6px',
          'background-color'        : this.options.background
        });
        
        this.esqueleto.wrapper = $('<div class="'+this.options.name+'-wrapper"></div>');
        this.esqueleto.msgbox.append(this.esqueleto.wrapper);
        
        this.esqueleto.form = $('<form action="'+this.options.formaction+'" method="post"></form>');
        this.esqueleto.wrapper.append(this.esqueleto.form);


        this.esqueleto.wrapper.css({
          height       : (ie6 ? 80 : 'auto'),
          'min-height' : 80,
          'zoom'       : 1
        });
        
        $('body').append(this.esqueleto.msgbox);

        this.addevents();
        return this.esqueleto.msgbox;
      },
      
      addevents: function() {
        $(window).bind('resize', $.proxy(function() {
          if (this.visible)
          {
            this.overlay.resize();
            this.moveBox();
          }
        }, this));

        $(window).bind('scroll', $.proxy(function() {
          if (this.visible)
          {
            this.moveBox();
          }
        }, this));

        this.esqueleto.msgbox.bind('keydown', $.proxy(function(event) {
          if (event.keyCode == 27)
          {
            this.close(false);
          }
        }, this));
        
        this.esqueleto.form.bind('submit', $.proxy(function(event) {
          $('input[type=submit]:first, button[type=submit]:first, button:first', this.esqueleto.form).trigger('click');
          if (!options.form.active) {
            event.preventDefault();
          }
        }, this));

        // heredamos los eventos, desde el overlay:
        this.overlay.element.bind('show', $.proxy(function() { $(this).triggerHandler('show'); }, this));
        this.overlay.element.bind('hide', $.proxy(function() { $(this).triggerHandler('close'); }, this));

      },

      show: function(txt, options, callback) {
        var types = ['alert', 'info', 'error', 'prompt', 'confirm'];
      
        this.esqueleto.msgbox.queue(this.options.name, $.proxy(function( next ) {
        
          options = $.extend(true, {
            type  : 'alert',
            form  : {
                      'active' : false
                    }
          }, options || {});
          
          if (typeof options.buttons === "undefined")
          {
            if (options.type == 'confirm' || options.type == 'prompt')
            {
              var buttons = [
                {type: 'submit', value: 'Accept'},
                {type: 'cancel', value: 'Cancel'}
              ];
            }
            else
            {
              var buttons = [
                {type: 'submit', value: 'Accept'}
              ];
            };
          }
          else
          {
            var buttons = options.buttons;
          };
          
          if (typeof options.inputs === "undefined" && options.type == 'prompt')
          {
            var inputs = [
              {type: 'text', name: 'prompt', value: ''}
            ];
          }
          else
          {
            var inputs = options.inputs;
          };
          
          this.callback = $.isFunction(callback) ? callback : function(e) {};
          
          if (typeof inputs !== "undefined")
          {
            this.esqueleto.inputs = $('<div class="'+this.options.name+'-inputs"></div>');
            this.esqueleto.form.append(this.esqueleto.inputs);

            $.each(inputs, $.proxy(function(i, input) {
              if (input.type == 'checkbox')
              {
                iLabel = input.label ? '<label class="'+this.options.name+'-label">' : '';
                fLabel = input.label ? input.label+'</label>' : '';
                input.value = input.value === undefined ? '1' : input.value;
                iName  = input.name === undefined ? this.options.name+'-label-'+i : input.name;
                this.esqueleto.inputs.append($(iLabel+'<input type="'+input.type+'" style="display:inline; width:auto;" name="'+iName+'" value="'+input.value+'" autocomplete="off"/> '+fLabel));
              }
              else
              {
                iLabel = input.label ? '<label class="'+this.options.name+'-label">'+input.label : '';
                fLabel = input.label ? '</label>' : '';
                input.value = input.value === undefined ? '' : input.value;
                iRequired   = input.required === undefined || input.required == false ? '' : 'required="true"';
                iName  = input.name === undefined ? this.options.name+'-label-'+i : input.name;
                this.esqueleto.inputs.append($(iLabel+'<input type="'+input.type+'" name="'+iName+'" value="'+input.value+'" autocomplete="off" '+iRequired+'/>'+fLabel));
              }
            }, this));
          }

          this.esqueleto.buttons = $('<div class="'+this.options.name+'-buttons"></div>');
          this.esqueleto.form.append(this.esqueleto.buttons);
          
          if (options.form.active) {
            this.esqueleto.form.attr('action', options.form.action === undefined ? '#' : options.form.action);
            this.esqueleto.form.attr('method', options.form.method === undefined ? 'post' : options.form.method);
            this.options.form.active = true;
          } else {
            this.esqueleto.form.attr('action', '#');
            this.esqueleto.form.attr('method', 'post');
            this.options.form.active = false;
          }
          
          if (options.type != 'prompt')
          {
            $.each(buttons, $.proxy(function(i, button) {
              if (button.type == 'submit')
              {
                this.esqueleto.buttons.append($('<button class="button light classic" type="submit">'+button.value+'</button>').bind('click', $.proxy(function(e) { this.close(button.value); e.preventDefault(); }, this)));
              }
              else if (button.type == 'cancel')
              {
                this.esqueleto.buttons.append($('<button class="button light classic" type="button">'+button.value+'</button>').bind('click', $.proxy(function(e) { this.close(false); e.preventDefault(); }, this)));
              }
            }, this));
          }
          else if (options.type == 'prompt')
          {
            $.each(buttons, $.proxy(function(i, button) {
              if (button.type == 'submit')
              {
                this.esqueleto.buttons.append($('<button type="submit">'+button.value+'</button>').bind('click', $.proxy(function(e) {
                  if ($('input[required="true"]:not(:value)').length>0)
                  {
                    $('input[required="true"]:not(:value):first').focus();
                    this.shake();
                  }
                  else if (this.options.form.active)
                  {
                    return true;
                  }
                  else
                  {
                    this.close(this.toArguments($('input', this.esqueleto.inputs)));
                  }

                  e.preventDefault();
                }, this)));
              }
              else if (button.type == 'cancel')
              {
                this.esqueleto.buttons.append($('<button type="button">'+button.value+'</button>').bind('click', $.proxy(function(e) { this.close(false); e.preventDefault(); }, this)));
              };
            }, this));
          };

          this.esqueleto.form.prepend(txt);
          
          $.each(types, $.proxy(function(i, e) {
            this.esqueleto.wrapper.removeClass(this.options.name+'-'+e);
          }, this));
          this.esqueleto.wrapper.addClass(this.options.name+'-'+options.type);

          this.moveBox(); // set initial position

          this.visible = true;
          this.overlay.show();

          this.esqueleto.msgbox.css({
            display : 'block',
            left    : ( ($(document).width() - this.options.width) / 2)
          });

          this.moveBox();

          setTimeout($.proxy(function() { var b = $('input, button', this.esqueleto.msgbox); if (b.length) { b.get(0).focus();} }, this), this.options.moveDuration);
        }, this));


        this.i++;
        
        if (this.i==1)
        {
          this.esqueleto.msgbox.dequeue(this.options.name);
        }

      },
      
      toArguments: function(array) {
        return $.map(array, function(a) {
          return $(a).val();
        });
      },
      
      moveBox: function() {
        var size   = { x: $(window).width(),      y: $(window).height() };
        var scroll = { x: $(window).scrollLeft(), y: $(window).scrollTop() };
        var height = this.esqueleto.msgbox.outerHeight();
        var y      = 0;
        var x      = 0;

        // vertically center
        y = scroll.x + ((size.x - this.options.width) / 2);
        
        if (this.options.emergefrom == "bottom")
        {
          x = (scroll.y + size.y + 80);
        }
        else // top
        {
          x = (scroll.y - height) - 80;
        }

        if (this.visible)
        {

          if (this.animation)
          {
            this.animation.stop;
          }

          this.animation = this.esqueleto.msgbox.animate({
            left  : y,
            top   : scroll.y + ((size.y - height) / 2)
          }, {
            duration  : this.options.moveDuration,
            queue     : false,
            easing    : 'easeOutBack'
          });

        }
        else
        {
          this.esqueleto.msgbox.css({
            top     : x,
            left    : y
          });
        }
      },
      
      close: function(param) {
        this.esqueleto.msgbox.css({
          display : 'none',
          top     : 0
        });
        
        this.visible = false;
        
        if ($.isFunction(this.callback))
        {
          this.callback.apply(this, $.makeArray(param));
        }
        
        setTimeout($.proxy(function() {
          this.i--;
          this.esqueleto.msgbox.dequeue(this.options.name);
        }, this), this.options.closeDuration);
        
        if (this.i==1) 
        {
          this.overlay.hide();
        }
        
        this.moveBox();
        
        this.esqueleto.form.empty();
      },

      shake: function() {
        var x = this.options.shake.distance;
        var d = this.options.shake.duration;
        var t = this.options.shake.transition;
        var o = this.options.shake.loops;
        var l = this.esqueleto.msgbox.position().left;
        var e = this.esqueleto.msgbox;

        for (i=0; i<o; i++)
        {
         e.animate({left: l+x}, d, t);
         e.animate({left: l-x}, d, t);
        };

        e.animate({left: l+x}, d, t);
        e.animate({left: l},   d, t);
      }

    },
    
    msgbox: function(txt, options, callback) {
      if (typeof txt == "object")
      {
        $.MsgBoxObject.config(txt);
      }
      else
      {
        return $.MsgBoxObject.show(txt, options, callback);
      }
    }
    
  });
  
  $(function() {
    if (parseFloat($.fn.jquery) > 1.2) {
      $.MsgBoxObject.create();
    } else {
      throw "The jQuery version that was loaded is too old. MsgBox requires jQuery 1.3+";
    }
  });
})(jQuery);

jQuery.base64 = (function($) {
  
  var _PADCHAR = "=",
    _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    _VERSION = "1.0";


  function _getbyte64( s, i ) {
    // This is oddly fast, except on Chrome/V8.
    // Minimal or no improvement in performance by using a
    // object with properties mapping chars to value (eg. 'A': 0)

    var idx = _ALPHA.indexOf( s.charAt( i ) );

    if ( idx === -1 ) {
      throw "Cannot decode base64";
    }

    return idx;
  }
  
  
  function _decode( s ) {
    var pads = 0,
      i,
      b10,
      imax = s.length,
      x = [];

    s = String( s );
    
    if ( imax === 0 ) {
      return s;
    }

    if ( imax % 4 !== 0 ) {
      throw "Cannot decode base64";
    }

    if ( s.charAt( imax - 1 ) === _PADCHAR ) {
      pads = 1;

      if ( s.charAt( imax - 2 ) === _PADCHAR ) {
        pads = 2;
      }

      // either way, we want to ignore this last block
      imax -= 4;
    }

    for ( i = 0; i < imax; i += 4 ) {
      b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 ) | _getbyte64( s, i + 3 );
      x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff, b10 & 0xff ) );
    }

    switch ( pads ) {
      case 1:
        b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 );
        x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff ) );
        break;

      case 2:
        b10 = ( _getbyte64( s, i ) << 18) | ( _getbyte64( s, i + 1 ) << 12 );
        x.push( String.fromCharCode( b10 >> 16 ) );
        break;
    }

    return x.join( "" );
  }
  
  
  function _getbyte( s, i ) {
    var x = s.charCodeAt( i );

    if ( x > 255 ) {
      throw "INVALID_CHARACTER_ERR: DOM Exception 5";
    }
    
    return x;
  }


  function _encode( s ) {
    if ( arguments.length !== 1 ) {
      throw "SyntaxError: exactly one argument required";
    }

    s = String( s );

    var i,
      b10,
      x = [],
      imax = s.length - s.length % 3;

    if ( s.length === 0 ) {
      return s;
    }

    for ( i = 0; i < imax; i += 3 ) {
      b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 ) | _getbyte( s, i + 2 );
      x.push( _ALPHA.charAt( b10 >> 18 ) );
      x.push( _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) );
      x.push( _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) );
      x.push( _ALPHA.charAt( b10 & 0x3f ) );
    }

    switch ( s.length - imax ) {
      case 1:
        b10 = _getbyte( s, i ) << 16;
        x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _PADCHAR + _PADCHAR );
        break;

      case 2:
        b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 );
        x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) + _PADCHAR );
        break;
    }

    return x.join( "" );
  }


  return {
    decode: _decode,
    encode: _encode,
    VERSION: _VERSION
  };
      
}( jQuery ) );

(function($) {

	/* Minimizing function - me */
	$.fn.minimize = function(){

		var $content = $($(this).data('content'));

		$(this).data('opened', '1');
		$(this).data('minheight', $content.find('header').outerHeight());

		$(this).click(function(){

			if($(this).data('opened') == '1'){

				$(this).data('opened', '0');
				$content.stop().animate({'height': $(this).data('minheight')}, $(this).data('speed'), 'easeOutQuart');
				$(this).addClass('minimized');

			} else {

				$(this).data('opened', '1');
				var getH = $content.css('height', 'auto').height();
				$content.css('height', $(this).data('minheight')).stop().animate({'height': getH}, $(this).data('speed'), 'easeInQuart', function(){
					$content.height('auto');
				});
				$(this).removeClass('minimized');

			}

			return false;

		});

	}

	/* Easy Toggle component - me */
	$.fn.toggle = function(){

		var $selToggle = $(this).children('li').eq(0);
		$selToggle.addClass('opened');

		$(this).find('li').click(function(){
			if(!$(this).hasClass('opened')) {
				openBox($selToggle);
				openBox($(this));
			}
			return false;
		});
		
		$(this).find('li').children('a').click(function(){
			if(!$(this).parent().hasClass('opened')) {
				openBox($selToggle);
				openBox($(this).parent());
			}
      return false;
		});

    $(this).find('div').find('a').click(function(){
      document.location.href = $(this).attr('href');
      return false;
    });
		
		function openBox($li){
			$selToggle = $li;
			if(!$li.hasClass('opened')){
				$li.addClass('opened')
					.css('height', 'auto')
					.find('div').slideDown(300);
			} else {
				$li.removeClass('opened')
					.find('div').slideUp(300, function(){
						$(this).parent().css({'height': 30});
					});
			}
		}

	}

	/* Easy Tabs component - me */
	$.fn.tabs = function(tabsContent){
	
		var $tabs = $(this).find(tabsContent);
		var $selButton = $(this).find('ul.filters li:first-child a');
		var $selTab = $(this).find('div.tabsContent div:first-child, div.postTabs div:first-child');
		$selButton.addClass('selected');
		$selTab.addClass('selected');
			
		$(this).find('ul.filters').find('a').click(function(){
			
			$selButton.removeClass('selected');
			$selButton = $(this);
			$selButton.addClass('selected');
				
			$selTab.removeClass('selected');
			$selTab.fadeOut(200);
			$selTab = $tabs.children('div').eq($selButton.parent().index());
			$selTab.addClass('selected');
			$selTab.delay(200).fadeIn(350);
			
			return false;
			
		});
	
	}
	
	/* Easy Testimonials component - me */
	$.fn.testimonials = function(){
		
		var index = 0;
		var $list = $(this).children('ul').children();
		
		$(this).find('a.btnNext').click(function(){
			$list.eq(index).fadeOut(200);
			if(++index==$list.length) index=0;
			$list.eq(index).delay(200).fadeIn(200);
			return false;
		});
		
		$(this).find('a.btnPrev').click(function(){
			$list.eq(index).fadeOut(200);
			if(--index<0) index=$list.length-1;
			$list.eq(index).delay(200).fadeIn(200);
			return false;
		});
		
	}

	/* Portfolio Grid Viewer - me (codename:mars) */
	$.fn.marsPortfolio = function(autoCloseSidebar){

		var $folio = $(this);
		var $body = $('body');
		var $items = $folio.children('a.folioItem');
		var $projectHolder = $('#content > div');
		var $projectHover = $('#projectHover');
		var $btnNext = $projectHover.find('.btnNext');
		var $btnPrev = $projectHover.find('.btnPrev');
		var $btnClose = $projectHover.find('.btnClose');
		var $project = null;
		var $cr1 = $cr2 = $cr3 = $cr4 = $cr5 = null;

		$items.append('<span class="folioPlus"></span>');
		$items.append('<span class="folioShadow"></span>');

		var sP = ($body.hasClass('admin-bar') ? 28 : 0);

		var itemWidth = iW = 360;
		var itemHeight = iH = 270;
		var itemPadding = 70;

		var zI = 10, maxP = (itemWidth*itemHeight)*$items.size(), firstProject = true, fSafe = true, fHash = true, byHash = false, oTitle = document.title, catArr = new Array(), sTop = 0;

		var mobileM = ($('#mobileCheck').css('display') == 'block' ? true : false);
		var touchM = "ontouchstart" in window;

		/* Setup Sorting */

		var k1 = 1000000, k2=0;
		$items.each(function(){
			var $item = $(this);
			$folio.find('.folioCategories li').each(function(){
				if($item.data('type') == $(this).text())
					$item.data($(this).text(), --k1);
				else 
					$item.data($(this).text(), --k2);
			});
		});

		var sortingObject = new Object(), oi = 0;
		$folio.find('.folioCategories li').each(function(){
			var type = $(this).text();
			catArr.push(type);
			sortingObject[type] = function($elem){
				return parseInt($elem.data(type));
			}
		});

		/* Setup filtering */

		$selectedFilter = $('li.selected a[data-filter]').parent().parent();
		$('a[data-filter], option[data-filter]').click(function(event){

			var $this = $(this);

		    if($projectHolder.hasClass('openedP')){
		    	closeAndStay();
		    	setTimeout(function(){
		    		rightSorting($this);
		    	}, 501);
		    } else {
		    	rightSorting($this);
		    }

      		event.preventDefault();
      		return false;

		});

		function rightSorting($this){

		    if($this.attr('title') != 'nofilter'){

		        $items.addClass('noHover');
		        setTimeout(function(){
		        	$items.removeClass('noHover');
		   		}, 1000);

	        	$('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');

  				var selector = $this.data('filter');

				if(selector != '*')
					document.location.hash = '#/category/' + selector;
				else
					document.location.hash = '#';

	  			$selectedFilter.removeClass('selected');
	  			$selectedFilter = $this.parent().parent();
	  			$selectedFilter.addClass('selected');

	  			$items.removeClass('disableResize');

	  			$folio.width($(document).width()-sideW);

	  			if(selector != '*'){

	  	 			$folio.isotope({ 
	  	 				sortBy: selector,
	  					sortAscending: false
	  	 			});

	  		 		$items.each(function(){
	  					$(this).bind('mouseover', itemOver).bind('mouseout', itemOut).bind('click', itemClick);
	  		 			if($(this).hasClass(selector)){
	  		 				$(this).removeClass('disabled').animate({'opacity': 1}, 300);
	  		 			} else {
	  		 				$(this).addClass('disabled').animate({'opacity': .1}, 300);
	  						$(this).unbind('mouseover').unbind('mouseout').unbind('click');
	  						$(this).click(function(){
	  							return false;
	  						})
	  		 			}
	  		 		});

	  	 		} else { 

	  	 			$folio.isotope({ 
	  	 				sortBy: 'original-order',
	  					sortAscending: true
	  	 			});

	  	 			$items.removeClass('disabled').animate({'opacity': 1}, 300);
	  				$items.bind('mouseover', itemOver).bind('mouseout', itemOut).bind('click', itemClick);

	  	 		}

      		} 

		}


		/* Setup hash init & change */

		var init = false;
		checkHash();

		if(window.addEventListener) window.addEventListener('hashchange', checkHash, false);

		function checkHash(){
			if(fHash || byHash) {
				fHash = false;
				if(document.location.hash != '' && document.location.hash != '#'){

					if(document.location.hash.indexOf('category') <0 ){

						$items.each(function(){
							if(document.location.hash == '#/'+$(this).data('name')) {
								if(!$projectHolder.hasClass('openedP')){
									openProject($(this).attr('href'), $(this).data('name'));
									byHash = true;
								}else{ 
									closeAndOpen($(this).attr('href'), $(this).data('name'));
									byHash = true;
								}
								init=true;
							} 
						});

					} else {

						var cat = document.location.hash.slice(document.location.hash.indexOf('category')+9, document.location.hash.length);

						if($.inArray(cat, catArr) >= 0 ){
							resizeFolio();
							$('a[data-filter=' + cat + ']').trigger('click');
						}

					}

				} else if((document.location.hash == '#' || document.location.hash == '') && $projectHolder.hasClass('openedP')){
					closeAndStay();
					byHash = true;
				}
			} else {
				fHash = true;
			}
		}

		/* Setup hover */

		$items.bind('mouseover', itemOver).bind('mouseout', itemOut).bind('click', itemClick);
		function itemOut(){

			if(!touchM && !mobileM && !$(this).hasClass('noHover')){
				var $this = $(this);
				$(this).children('img').stop().animate({'opacity': .5, 'marginTop': 0}, 200, 'easeOutQuad');
				$(this).children('span.folioPlus').stop().animate({'opacity': 0, 'bottom': -53}, 200, 'easeOutQuad');
				$(this).children('div.folioTextHolder').stop().animate({'height': 0, 'bottom': 0}, 200, 'easeOutQuad');
				$(this).find('div.folioText').stop().animate({'opacity': 0, 'top': -150}, 200, 'easeOutQuad');
				$(this).children('span.folioShadow').stop().animate({'opacity': 0, 'marginTop': 0, 'height': '0'}, 300, 'easeOutQuad', function(){
					$this.css('zIndex', 1);
				});
			}
		}
		function itemOver(){  
			if(!touchM && !mobileM && !$(this).hasClass('noHover')){
				$(this).css('zIndex', ++zI);
				$(this).children('img.folioThumb').stop().animate({'opacity': 1, 'marginTop': -70}, 300, 'easeOutQuad');
				$(this).children('span.folioPlus').stop().animate({'opacity': 1, 'bottom': iH/2-30}, 300, 'easeOutQuad');
				$(this).children('span.folioShadow').stop().animate({'opacity': 1, 'marginTop': -70, 'height': iH+140}, 300, 'easeOutQuad');
				$(this).children('div.folioTextHolder').stop().animate({'height': iH/2+itemPadding, 'bottom': -70}, 300, 'easeOutQuad');
				$(this).find('div.folioText').stop().animate({'opacity': 1, 'top': 0}, 350, 'easeOutSine');
			}

		}
		function itemClick(){

			if(!$(this).hasClass('disabled')){

				$(this).addClass('disabled');
				var $this = $(this);

				setTimeout(function(){
					$this.removeClass('disabled');
				}, 500);

				byHash = false;
				fHash = false;
				openProject($(this).attr('href'), $(this).data('name'));

				$(this).children('img').stop().animate({'opacity': .5, 'marginTop': 0}, 100, 'easeOutQuad');
				$(this).children('span.folioPlus').stop().animate({'opacity': 0, 'bottom': -53}, 100, 'easeOutQuad');
				$(this).children('div.folioTextHolder').stop().animate({'height': 0, 'bottom': 0}, 100, 'easeOutQuad');
				$(this).find('div.folioText').stop().animate({'opacity': 0, 'top': -150}, 100, 'easeOutQuad');
				$(this).children('span.folioShadow').stop().animate({'opacity': 0, 'marginTop': 0, 'height': '0'}, 100, 'easeOutQuad');

				if(mobileM)
					$('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');

			}

			return false;

		}
		function itemFuzzyClick(){
			return false;
		}

    $('#projectHover').click(function(){
      closeAndStay();
      return false;
    })

		/* Setup Resize */

		var sideW = $('body').hasClass('Stick') ? 280 : 0;
		$.topBoss = $('body').hasClass('Stick') ? 'opened' : 'closed';

		resizeFolio();
		$(window).resize(function(){
			resizeFolio();
		});

		$('#sidebar #close').click(function(){
			resizeFolio();
		});

		function resizeFolio(){

			sideW = $.topBoss == 'closed' ? 0 : 280;

			mobileM = ($('#mobileCheck').css('display') == 'block' ? true : false);

			if(mobileM) sideW = 0;

			var sW = $(document).width()-sideW, sH = $(window).height();

			if($(document).width() < 640){
				itemWidth = 480;
				itemHeight = 360;
			} else {
				itemWidth = 360;
				itemHeight = 270;
			}

			iW = Math.floor(sW / Math.ceil(sW / itemWidth));
			iH = Math.floor(iW/4*3);
			$items.css({'width': iW, 'height': iH});

			if(iW < 260)
				$items.find('p').css('height', '50');
			else
				$items.find('p').css('height', 'auto');

			$folio.width(sW);

			$folio.isotope({
				itemSelector: '.folioItem',
				getSortData: sortingObject,
				animationEngine: 'jquery',
				resizable: false
			});

			$items.addClass('disableResize');

			if(!mobileM)
				$projectHover.height($(document).height() - 140 - sP);
			else
				$projectHover.height($(document).height());

			if(mobileM && $cr1 != null && $cr1.length > 0){
				$cr1.width($(window).width());
				$cr1.height($(window).width()*0.8);
				$cr2.width($(window).width());
				$cr2.height($(window).width()*0.8);
				$cr3.width($(window).width());
				$cr3.height($(window).width()*0.8);
				$cr5.width($(window).width());
				$cr5.height($(window).width()*0.8);
				$cr4.css('marginTop', $cr1.height());
			} else if(!mobileM && $cr1 != null && $cr1.length > 0){
				$cr1.width('600px');
				$cr1.height('480px');
				$cr2.width('600px');
				$cr2.height('480px');
				$cr3.width('600px');
				$cr3.height('480px');
				$cr5.width('600px');
				$cr5.height('480px');
				$cr4.css('marginTop', 'auto');
			}

			if($project)
				if($projectHolder.hasClass('openedP')) {
					if(sH > $project.height() + 280 + sP)
						$project.css('marginTop', (sH-$project.height() - 280 - sP)/2);
					else if(sH < $projectHolder.outerHeight() + 280 + sP && $project.css('marginTop') > 0)
						$project.css('marginTop', 0);
				}

		}

		/* Setup navigation buttons */

		$btnNext.click(function(){
			if(fSafe) {
				fSafe = false;
				byHash = false;
				closeAndOpen($(this).attr('href'), $(this).data('name'));
			}
			return false;
		});

		$btnPrev.click(function(){
			if(fSafe) {
				fSafe = false;
				byHash = false;
				closeAndOpen($(this).attr('href'), $(this).data('name'));
			}
			return false;
		});

		$btnClose.click(function(){
			byHash = false;
			closeAndStay();
			return false;
		});

		/* Setup loading */

		function openProject(href, title){

      sTop = $('html').scrollTop();

			if(firstProject){
				firstProject = false;

				$projectHolder.addClass('openedP');
				
				$body.css('overflowY', 'scroll');

				var pHH2 = (mobileM ? $(document).height() : $(document).height() - 140 - sP);

				$projectHover.height(0).fadeIn(0).animate({'height': pHH2}, 200, 'easeInQuad', function(){
					continueLoading(href);
					$items.css('zIndex', 6);
				});

			} else {
				$projectHolder.addClass('openedP');
				continueLoading(href);
			}

			fHash = false;
			document.location.hash = '#/'+title;

		}

		function continueLoading(href){

      $.ajax({
        url: href,
        dataType: 'html'
      }).done(function(data){

        var pwd = $(data).find('#pwd').text();

        if(pwd == ''){

          $btnNext.css('display', '');
          $btnPrev.css('display', '');
          $btnClose.css('display', '');

          finishLoading(data);

        } else {

          $btnNext.css('display', 'none');
          $btnPrev.css('display', 'none');
          $btnClose.css('display', 'none');

          $.msgbox('This is a protected post. In order to view it, please enter a password:', {
          type : 'prompt',
          buttons : [
            {type: 'submit', value:'Ok'},
            {type: 'cancel', value:'Cancel'}
          ]}, function(event) {
            if(event == $.base64.decode(pwd))
              finishLoading(data);
            else
              closeAndStay();
          });

        }

      });

		}

		function finishLoading(data){

			$project = $(data).find('.project');
      $projectHolder.prepend($project);

      document.title = $(data).find('#title').text();

      if($('#postSlider').length  > 0){
          $("#postSlider").slides({
          effect: 'fade',
          pagination: false,
          next: 'sliderBtnNext',
          prev: 'sliderBtnPrev',
          generatePagination: false,
          customPagination: 'sliderPagination',
          crossfade:true
        });
      }  

      FB.XFBML.parse(document.getElementById('shareLinks'));
      twttr.widgets.load();
      
      if($('#projectVideo').length > 0) {
        projekktor('#projectVideo');
      }

      if($('.nano > .content').css('position', 'static').height() > 436){
        $('.nano > .content').css('overflowY', 'scroll');
        $('.nano').nanoScroller();
      }
      $('.nano > .content').css('position', 'absolute');

      if(touchM){
        $('#postSlider').touchSwipe(function(dir){
          if(dir == 'right')
            $('#postSlider .sliderBtnPrev').trigger('click');
          else if(dir == 'left')
            $('#postSlider .sliderBtnNext').trigger('click');
        })
      }

      $cr1 = $('#postSlider');
      $cr2 = $('#postSlider .slides_control');
      $cr3 = $('#postSlider .slides_control > div');
      $cr4 = $('section.projectContent');
      $cr5 = $('#postSlider .slides_container');
      
      resizeFolio();

      $project.find('a').hoverFadeColor();
      $project.find('.close').bind('click', closeAndStay);

      var $prevLink = $project.find('#nextProject a');
      var $nextLink = $project.find('#previousProject a');

      if($prevLink.length>0)
        $btnPrev.removeClass('disabled').attr('href', $prevLink.attr('href')).data('name', $prevLink.text());
      else
        $btnPrev.addClass('disabled');

      if($nextLink.length>0)
        $btnNext.removeClass('disabled').attr('href', $nextLink.attr('href')).data('name',$nextLink.text());
      else
        $btnNext.addClass('disabled');

      $project.css('left', '150%').stop().animate({'left': '50%'}, 500, 'easeInOutCubic', function(){
        fSafe = true;
      });

		}

		function closeAndOpen(href, title){
			$project.stop().animate({'left': '-50%'}, 300, 'easeOutQuart', function(){
				$project.remove();
				openProject(href, title);
			});
		}

		function closeAndStay(){

      document.location.hash = '#';
      document.title = oTitle;

      $('html,body').animate({scrollTop: sTop}, 500, 'easeInQuad');

			if($project != null)

				$project.stop().animate({'left': '-50%'}, 500, 'easeOutQuart', function(){
					$project.remove();
					resizeFolio();

					$body.css('overflowY', 'auto');
					$projectHolder.removeClass('openedP');
					$items.css('zIndex', 10);
					$folio.css('width', 'auto');
				});

			$projectHover.delay(200).fadeOut(200);
			firstProject = true; 

		}

	}

	/* Gallery Grid Viewer - me (codename:mars) */
	$.fn.marsGallery = function(autoCloseSidebar){

		if($('body').hasClass('page-template-template-gallery-php'))
			$('#content').append('<ul id="supersized"></ul>');

		var $folio = $(this);
		var $body = $('body');
		var $items = $folio.children('a.folioItem');
		var $projectHolder = $('#content > div');
		var $projectHover = $('#projectHover');
		var $projectControls = $('#supersizedControls');
		var $supersized = $('#supersized');
		var $btnNext = $('a.btnNext');
		var $btnPrev = $('a.btnPrev');
		var $project = null;

		var sP = ($body.hasClass('admin-bar') ? 28 : 0);

		$items.append('<span class="folioPlus"></span>');
		$items.append('<span class="folioShadow"></span>');

		var itemWidth = iW = 240;
		var itemHeight = iH = 180;
		var itemPadding = 70;

		var zI = 10, maxP = (itemWidth*itemHeight)*$items.size(), firstProject = true, fSafe = true, fHash = true, byHash = false, oTitle = document.title, catArr = new Array(), sTop = 0;

		var mobileM = ($('#mobileCheck').css('display') == 'block' ? true : false);
		var touchM = "ontouchstart" in window;

		/* Setup Sorting */

		var k1 = 0, k2=0;
		$items.each(function(){
			var $item = $(this);
			$folio.find('.folioCategories li').each(function(){
				if($item.data('type') == $(this).text())
					$item.data($(this).text(), ++k1);
				else 
					$item.data($(this).text(), --k2);
			});
		});

		var sortingObject = new Object(), oi = 0;
		$folio.find('.folioCategories li').each(function(){
			var type = $(this).text();
			catArr.push(type);
			sortingObject[type] = function($elem){
				return parseInt($elem.data(type));
			}
		});

		/* Setup filtering */

		$selectedFilter = $('li.selected a[data-filter]').parent().parent();
		$('a[data-filter]').click(function(event){

	      $('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');

	      	if($folio.hasClass('galleryOpened')){
	        	setTimeout(closeAndStay, 1000);
	      	};

	      	$items.addClass('noHover');
	      	setTimeout(function(){
	    		$items.removeClass('noHover');
	    	}, 1000);
      
			var selector = $(this).data('filter');

			if(selector != '*')
				document.location.hash = '#/category/' + selector;
			else
				document.location.hash = '#';

			$selectedFilter.removeClass('selected');
			$selectedFilter = $(this).parent().parent();
			$selectedFilter.addClass('selected');

			$items.removeClass('disableResize');

			if(selector != '*'){

	 			$folio.isotope({ 
	 				sortBy: selector,
					sortAscending: false
	 			});

		 		$items.each(function(){
		 			if($(this).hasClass(selector)){
		 				$(this).removeClass('disabled').animate({'opacity': 1}, 300);
						$(this).unbind().bind('mouseover', itemOver).bind('mouseout', itemOut).bind('click', itemClick);
		 			} else {
		 				$(this).addClass('disabled').animate({'opacity': .1}, 300);
						$(this).unbind();
						$(this).click(function(){
							return false;
						})
		 			}
		 		});

	 		} else { 

	 			$folio.isotope({ 
	 				sortBy: 'original-order',
					sortAscending: true
	 			});

	 			$items.removeClass('disabled').animate({'opacity': 1}, 300);
				$items.unbind().bind('mouseover', itemOver).bind('mouseout', itemOut).bind('click', itemClick);

	 		}

			event.preventDefault();
			return false;

		});

		/* Setup hash init & change */

		var init = false;
		checkHash();

		if(window.addEventListener) window.addEventListener('hashchange', checkHash, false);

		function checkHash(){
			if(fHash || byHash) {
				fHash = false;
				if(document.location.hash != '' && document.location.hash != '#'){

					if(document.location.hash.indexOf('category') <0 ){

						$items.each(function(){
							if(document.location.hash == '#/'+$(this).data('name')) {
								if(!$folio.hasClass('galleryOpened')){
									openProject($(this).attr('href'), $(this).data('name'));
									byHash = true;
								} else { 
									closeAndOpen($(this).attr('href'), $(this).data('name'));
									byHash = true;
								}
								init=true;
							} 
						});

					} else {

						var cat = document.location.hash.slice(document.location.hash.indexOf('category')+9, document.location.hash.length);

						if($.inArray(cat, catArr) >= 0){
							resizeFolio();
							$('a[data-filter=' + cat + ']').trigger('click');
						}

					}

				} else if((document.location.hash == '#' || document.location.hash == '') && $folio.hasClass('galleryOpened')){
					closeAndStay();
					byHash = true;
				}
			} else {
				fHash = true;
			}
		}

		/* Setup hover */

		$items.bind('mouseover', itemOver).bind('mouseout', itemOut).bind('click', itemClick);
		function itemOver(){

			if(!touchM && !mobileM && !$(this).hasClass('noHover')){

				var icW = iW;
				var icH = iH;

				$(this).css('zIndex', ++zI);

				$(this).children('img.folioThumb').stop().animate({'opacity': 1}, 300, 'easeOutQuad');
				$(this).children('span.folioPlus').stop().animate({'opacity': 1, 'top': icH/2-45}, 300, 'easeOutQuad');
				$(this).children('span.folioShadow').stop().animate({'opacity': 1}, 300, 'easeOutQuad');
				$(this).children('div.folioTextHolder').stop().animate({'opacity': 1}, 300, 'easeOutQuad');
				$(this).find('div.folioText').stop().animate({'opacity': 1, 'top': icH/2}, 350, 'easeOutSine');

			}

		}
		function itemOut(){

			if(!touchM && !mobileM && !$(this).hasClass('noHover')){

				var $this = $(this);

				$(this).children('img.folioThumb').stop().animate({'opacity': .5}, 200, 'easeOutQuad');
				$(this).children('span.folioPlus').stop().animate({'opacity': 0, 'top': -23}, 200, 'easeOutQuad');
				$(this).children('span.folioShadow').stop().animate({'opacity': 0}, 200, 'easeOutQuad');
				$(this).children('div.folioTextHolder').stop().animate({'opacity': 0}, 200, 'easeOutQuad');
				$(this).find('div.folioText').stop().animate({'opacity': 0, 'top': 200}, 250, 'easeOutSine', function(){
					$this.css('zIndex', 1);
				});

			}

		}

		var clickFail = true;
		function itemClick(){
			if(clickFail) {
				clickFail = false;
				byHash = false;
				fHash = false;
				openProject($(this).attr('href'), $(this).data('name'));
				setTimeout(function(){
					clickFail = true;
				}, 1000);
				if(mobileM)
					$('html,body').animate({scrollTop: 0}, 500, 'easeInQuad');
			} 
			return false;
		}

		
		/* Setup Resize */

		var sideW = $('body').hasClass('Stick') ? 280 : 0;
		$.topBoss = $('body').hasClass('Stick') ? 'opened' : 'closed';
		$('body').addClass('topBoss');

		resizeFolio();
		$(window).resize(function(){
			resizeFolio();
		});
		
		$('#sidebar #close').click(function(){
			resizeFolio();
		});

		function resizeFolio(){

			sideW = $.topBoss == 'closed' ? 0 : 280;
			
			mobileM = ($('#mobileCheck').css('display') == 'block' ? true : false);
			
			if(mobileM) sideW = 0;
			
			var sW = $(window).width()-sideW, sH = $(window).height();

			iW = Math.floor(sW / Math.ceil(sW / itemWidth));
			iH = Math.floor(iW/4*3);
			$items.css({'width': iW, 'height': iH});

			$folio.width($(document).width()-sideW);

			$folio.isotope({
				itemSelector: '.folioItem',
				getSortData: sortingObject,
				animationEngine: 'jquery',
				resizable: false
			});

			$items.addClass('disableResize');

			if(!mobileM)
				$projectHover.height($(window).height() - 140 - sP);
			else 
				$projectHover.height($(window).height());

			$projectControls.height($(window).height() - 140 - sP);

			if($folio.hasClass('galleryOpened'))
				$folio.css('height', $(window).height() - 280 - sP*2);

		}

		/* Setup navigation buttons */

		$btnNext.click(function(){
			if(fSafe) {
				fSafe = false;
				byHash = false;
				closeAndOpen($(this).attr('href'), $(this).data('name'));
			}
			return false;
		});

		$btnPrev.click(function(){
			if(fSafe) {
				fSafe = false;
				byHash = false;
				closeAndOpen($(this).attr('href'), $(this).data('name'));
			}
			return false;
		});

		$('.btnClose').click(function(){
			byHash = false;
			closeAndStay();
			return false;
		});

		/* Setup loading */

		function openProject(href, title){

      sTop = $('html').scrollTop();

			if(firstProject){
				firstProject = false;

				$folio.addClass('galleryOpened');
				$body.addClass('galleryOpened');

				$folio.animate({'height':$(window).height() - 280 - sP*2}, 200, 'easeInQuad');
				var phH = $projectHover.height();

				$('#topFooter').css('zIndex', 99999);
				$('#bottomFooter').css('zIndex', 99999);

				$supersized.css('zIndex', 99998);

				$projectHover.height(0).fadeIn(0).animate({'height': phH}, 200, 'easeInQuad', function(){
					continueLoading(href);
					$items.css('zIndex', 6);
				});

			} else {
				continueLoading(href);
			}

			fHash = false;
			document.location.hash = '#/'+title;

		}

		function continueLoading(href){
			$.ajax({
				url: href,
				dataType: 'html'
			}).done(function(data){

				$project = $(data).find('.project');

				document.title = $(data).find('#title').text();

				$projectControls.append($(data).find('.galleryContent'));

				FB.XFBML.parse(document.getElementById('shareLinks'));
				twttr.widgets.load();

				var imgArray = new Array();

				$project.find('#projectSlides').children('img').each(function(){

					imgArray.push({
						image: $(this).attr('src'),
						title: $(this).attr('title')
					})

				});

				var fitPortrait = $('body').hasClass('Fit') ? 1 : 0;

				$.supersized({
					slides: imgArray,
					transition: 1,
					transition_speed: 1000,
					horizontal_center: 12,
					image_protect: 0,
					fit_portrait: fitPortrait,
					fit_landscape: 0,
					fit_always: 0
				});

				var $prevLink = $project.find('#nextProject a');
				var $nextLink = $project.find('#previousProject a');

        if(touchM){
          $('#supersizedControls').touchSwipe(function(dir){
            if(dir == 'right')
              api.prevSlide();
            else if(dir == 'left')
              api.nextSlide();
          })
        }

				if($prevLink.length>0)
					$btnPrev.removeClass('disabled').attr('href', $prevLink.attr('href')).data('name', $prevLink.text());
				else
					$btnPrev.addClass('disabled');

				if($nextLink.length>0)
					$btnNext.removeClass('disabled').attr('href', $nextLink.attr('href')).data('name',$nextLink.text());
				else
					$btnNext.addClass('disabled');

				$('.galleryContent').find('.close').click(function(){
					byHash = false;
					closeAndStay();
					return false;
				});

				setTimeout(function(){
					fSafe = true;
				}, 500);

			});

		}

		function closeAndOpen(href, title){

			$projectControls.find('#slideList').fadeOut();
			$body.find('.galleryContent').delay(100).fadeOut(200);
			$supersized.delay(200).fadeOut(400, function(){

   				clearInterval($.supersized.vars.slideshow_interval);
   				$.supersized.vars.current_slide = 0;
   				$.supersized.vars.in_animation = false;
   				$.supersized.vars.is_paused = false;
   				$.supersized.vars.slideshow_interval = null;
   				$.supersized.vars.options.slides = null;

				$projectControls.find('li:not(#playPause)').remove();
				$body.find('.galleryContent').remove();
				$supersized.empty();

    			$('#progressBar').stop().animate({height: 0}, 100, 'easeOutQuad');

				openProject(href, title);

			});

		}

		function closeAndStay(){

      $('html,body').animate({scrollTop: sTop}, 500, 'easeInQuad');

			document.location.hash = '#';
			document.title = oTitle;

			$folio.removeClass('galleryOpened');
			$body.removeClass('galleryOpened');
			resizeFolio();

			$projectControls.find('.slideProjects a').stop().fadeOut(0);
			$projectControls.find('#slideList').stop().fadeOut(200);
			$body.find('.galleryContent').delay(100).fadeOut(200);
			$supersized.delay(200).fadeOut(400, function(){

				$projectControls.find('li:not(#playPause)').remove();
				$body.find('.galleryContent').remove();
				$supersized.empty();
				if($.supersized.vars.slideshow_interval){
   					clearInterval($.supersized.vars.slideshow_interval);
				};
    			$('#progressBar').stop().animate({height: 0}, 100, 'easeOutQuad');
				$('#topFooter').css('zIndex', 7);
				$('#bottomFooter').css('zIndex', 7);

				$supersized.css('zIndex', -999);				
				$projectControls.css('zIndex', -999);
				
			});

			$projectHover.fadeOut(100);

			firstProject = true;
			$items.css('zIndex', 10);

		}

	}

	/* Easy Twitter component - queness.com & me */

	$.fn.twitter = function(username, count){
	
		var $twitHolder = $(this);
		var tHr = ''
	
		$.getJSON("http://twitter.com/statuses/user_timeline.json?screen_name="+username+"&count="+count+"&callback=?",
			 function(data){
			  $.each(data, function(i,item){
			  
				if(i==0) $twitHolder.empty();
				
			   $twitHolder.append(clean(item.text) + '<span class="twitFooter">' + timeAgo(item.created_at) + '</span>');
			   
			});
		});
	
	};

	function timeAgo(dateString) {
        var rightNow = new Date();
        var then = new Date(dateString);
         
        if ($.browser.msie) {
            // IE can't parse these crazy Ruby dates
            then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
        }
 
        var diff = rightNow - then;
 
        var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
 
        if (isNaN(diff) || diff < 0) {
            return ""; // return blank string if unknown
        }
 
        if (diff < second * 2) {
            // within 2 seconds
            return "right now";
        }
 
        if (diff < minute) {
            return Math.floor(diff / second) + " seconds ago";
        }
 
        if (diff < minute * 2) {
            return "1 minute ago";
        }
 
        if (diff < hour) {
            return Math.floor(diff / minute) + " minutes ago";
        }
 
        if (diff < hour * 2) {
            return "1 hour ago";
        }
 
        if (diff < day) {
            return  Math.floor(diff / hour) + " hours ago";
        }
 
        if (diff > day && diff < day * 2) {
            return "yesterday";
        }
 
        if (diff < day * 365) {
            return Math.floor(diff / day) + " days ago";
        }
 
        else {
            return "over a year ago";
        }
    }
	  
	function link(tweet) {
        return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function(link, m1, m2, m3, m4) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
        });
    };
	
	function at(tweet){
		return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
        });
	}
	
	function list(tweet){
        return tweet.replace(/\B[@@]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
          return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
        });
	
	}
	
	function hash(tweet){
        return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
          return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
        });
	
	}
	
	function clean(tweet){
        return hash(at(list(link(tweet))));
	}

	/* styledSelect script - Petr Stanicek (pixy@pixy.cz) */ 

	jQuery.fn.styledSelect = function(options) {
		var isFF2 = jQuery.browser.mozilla && jQuery.browser.version.indexOf('1.8.')==0;
		var prefs = {
			coverClass : 'select-replace-cover',
			innerClass : 'select-replace',
			adjustPosition : { top:0, left:0 },
			selectOpacity : 0
			}
		if (options) jQuery.extend(prefs,options);
		return this.each( function() {
			if (isFF2) return false;
			var selElm = jQuery(this);
			selElm.wrap('<span><'+'/span>');
			selElm.after('<span><'+'/span>');
			var selReplace = selElm.next();
			var selCover = selElm.parent();
			selElm.css({
				'opacity':prefs.selectOpacity,
				'visibility':'visible',
				'position':'absolute',
				'top':0,
				'left':0,
				'display':'inline',
				'z-index':1
				});
			selCover.addClass(prefs.coverClass).css({
				'display':'inline-block',
				'position':'relative',
				'top':prefs.adjustPosition.top,
				'left':prefs.adjustPosition.left,
				'z-index':0,
				'vertical-align':'middle',
				'text-align':'left'
				});
			selReplace.addClass(prefs.innerClass).css({
				'display':'block',
				'white-space':'nowrap'
				});

			selElm.bind('change',function() {
				jQuery(this).next().text(this.options[this.selectedIndex].text);
				}).bind('resize',function() {
				jQuery(this).parent().width( jQuery(this).width()+'px' );
				});
			selElm.trigger('change').trigger('resize');
		});
	}

})(jQuery);

/*
* Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function($){
	$.fn.slides = function( option ) {
		// override defaults with specified option
		option = $.extend( {}, $.fn.slides.option, option );

		return this.each(function(){
			// wrap slides in control container, make sure slides are block level
			$('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');
			
			var elem = $(this),
				control = $('.slides_control',elem),
				total = control.children().size(),
				width = control.children().outerWidth(),
				height = control.children().outerHeight(),
				start = option.start - 1,
				effect = option.effect.indexOf(',') < 0 ? option.effect : option.effect.replace(' ', '').split(',')[0],
				paginationEffect = option.effect.indexOf(',') < 0 ? effect : option.effect.replace(' ', '').split(',')[1],
				next = 0, prev = 0, number = 0, current = 0, loaded, active, clicked, position, direction, imageParent, pauseTimeout, playInterval;
			
			// is there only one slide?
			if (total < 2) {
				// Fade in .slides_container
				$('.' + option.container, $(this)).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
					// let the script know everything is loaded
					loaded = true;
					// call the loaded funciton
					option.slidesLoaded();
				});
				// Hide the next/previous buttons
				$('.' + option.next + ', .' + option.prev).fadeOut(0);
				return false;
			}

			updateCustomPagination();

			// animate slides
			function animate(direction, effect, clicked) {
				if (!active && loaded) {
					active = true;
					// start of animation
					option.animationStart(current + 1);
					switch(direction) {
						case 'next':
							// change current slide to previous
							prev = current;
							// get next from current + 1
							next = current + 1;
							// if last slide, set next to first slide
							next = total === next ? 0 : next;
							// set position of next slide to right of previous
							position = width*2;
							// distance to slide based on width of slides
							direction = -width*2;
							// store new current slide
							current = next;
						break;
						case 'prev':
							// change current slide to previous
							prev = current;
							// get next from current - 1
							next = current - 1;
							// if first slide, set next to last slide
							next = next === -1 ? total-1 : next;								
							// set position of next slide to left of previous
							position = 0;								
							// distance to slide based on width of slides
							direction = 0;		
							// store new current slide
							current = next;
						break;
						case 'pagination':
							// get next from pagination item clicked, convert to number
							next = parseInt(clicked,10);
							// get previous from pagination item with class of current
							prev = $('.' + option.paginationClass + ' li.'+ option.currentClass +' a', elem).attr('href').match('[^#/]+$');
							// if next is greater then previous set position of next slide to right of previous
							if (next > prev) {
								position = width*2;
								direction = -width*2;
							} else {
							// if next is less then previous set position of next slide to left of previous
								position = 0;
								direction = 0;
							}
							// store new current slide
							current = next;
						break;
					}

					updateCustomPagination();

					// fade animation
					if (effect === 'fade') {
						// fade animation with crossfade
						if (option.crossfade) {
							// put hidden next above current
							control.children(':eq('+ next +')', elem).css({
								zIndex: 10
							// fade in next
							}).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
								if (option.autoHeight) {
									// animate container to height of next
									control.animate({
										height: control.children(':eq('+ next +')', elem).outerHeight()
									}, option.autoHeightSpeed, function(){
										// hide previous
										control.children(':eq('+ prev +')', elem).css({
											display: 'none',
											zIndex: 0
										});								
										// reset z index
										control.children(':eq('+ next +')', elem).css({
											zIndex: 0
										});									
										// end of animation
										option.animationComplete(next + 1);
										active = false;
									});
								} else {
									// hide previous
									control.children(':eq('+ prev +')', elem).css({
										display: 'none',
										zIndex: 0
									});									
									// reset zindex
									control.children(':eq('+ next +')', elem).css({
										zIndex: 0
									});									
									// end of animation
									option.animationComplete(next + 1);
									active = false;
								}
							});
						} else {
							// fade animation with no crossfade
							control.children(':eq('+ prev +')', elem).fadeOut(option.fadeSpeed,  option.fadeEasing, function(){
								// animate to new height
								if (option.autoHeight) {
									control.animate({
										// animate container to height of next
										height: control.children(':eq('+ next +')', elem).outerHeight()
									}, option.autoHeightSpeed,
									// fade in next slide
									function(){
										control.children(':eq('+ next +')', elem).fadeIn(option.fadeSpeed, option.fadeEasing);
									});
								} else {
								// if fixed height
									control.children(':eq('+ next +')', elem).fadeIn(option.fadeSpeed, option.fadeEasing, function(){
										// fix font rendering in ie, lame
										if($.browser.msie) {
											$(this).get(0).style.removeAttribute('filter');
										}
									});
								}									
								// end of animation
								option.animationComplete(next + 1);
								active = false;
							});
						}
					// slide animation
					} else {
						// move next slide to right of previous
						control.children(':eq('+ next +')').css({
							left: position,
							display: 'block'
						});
						// animate to new height
						if (option.autoHeight) {
							control.animate({
								left: direction,
								height: control.children(':eq('+ next +')').outerHeight()
							},option.slideSpeed, option.slideEasing, function(){
								control.css({
									left: -width
								});
								control.children(':eq('+ next +')').css({
									left: width,
									zIndex: 5
								});
								// reset previous slide
								control.children(':eq('+ prev +')').css({
									left: width,
									display: 'none',
									zIndex: 0
								});
								// end of animation
								option.animationComplete(next + 1);
								active = false;
							});
							// if fixed height
							} else {
								// animate control
								control.animate({
									left: direction
								},option.slideSpeed, option.slideEasing, function(){
									// after animation reset control position
									control.css({
										left: -width
									});
									// reset and show next
									control.children(':eq('+ next +')').css({
										left: width,
										zIndex: 5
									});
									// reset previous slide
									control.children(':eq('+ prev +')').css({
										left: width,
										display: 'none',
										zIndex: 0
									});
									// end of animation
									option.animationComplete(next + 1);
									active = false;
								});
							}
						}
					// set current state for pagination
					if (option.pagination) {
						// remove current class from all
						$('.'+ option.paginationClass +' li.' + option.currentClass, elem).removeClass(option.currentClass);
						// add current class to next
						$('.' + option.paginationClass + ' li:eq('+ next +')', elem).addClass(option.currentClass);
					}
				}
			} // end animate function
			
			function stop() {
				// clear interval from stored id
				clearInterval(elem.data('interval'));
			}
		
			function updateCustomPagination(){
				$('.'+option.customPagination).text((current+1) + '  of  ' +total);
			}

			function pause() {
				if (option.pause) {
					// clear timeout and interval
					clearTimeout(elem.data('pause'));
					clearInterval(elem.data('interval'));
					// pause slide show for option.pause amount
					pauseTimeout = setTimeout(function() {
						// clear pause timeout
						clearTimeout(elem.data('pause'));
						// start play interval after pause
						playInterval = setInterval(	function(){
							animate("next", effect);
						},option.play);
						// store play interval
						elem.data('interval',playInterval);
					},option.pause);
					// store pause interval
					elem.data('pause',pauseTimeout);
				} else {
					// if no pause, just stop
					stop();
				}
			}
				
			// 2 or more slides required
			if (total < 2) {
				return;
			}
			
			// error corection for start slide
			if (start < 0) {
				start = 0;
			}
			
			if (start > total) {
				start = total - 1;
			}
					
			// change current based on start option number
			if (option.start) {
				current = start;
			}
			
			// randomizes slide order
			if (option.randomize) {
				control.randomize();
			}
			
			// make sure overflow is hidden, width is set
			$('.' + option.container, elem).css({
				overflow: 'hidden',
				// fix for ie
				position: 'relative'
			});
			
			// set css for slides
			control.children().css({
				position: 'absolute',
				top: 0, 
				left: control.children().outerWidth(),
				zIndex: 0,
				display: 'none'
			 });
			
			// set css for control div
			control.css({
				position: 'relative',
				// size of control 3 x slide width
				width: (width * 3),
				// set height to slide height
				height: height,
				// center control to slide
				left: -width
			});
			
			// show slides
			$('.' + option.container, elem).css({
				display: 'block'
			});

			// if autoHeight true, get and set height of first slide
			if (option.autoHeight) {
				control.children().css({
					height: 'auto'
				});
				control.animate({
					height: control.children(':eq('+ start +')').outerHeight()
				},option.autoHeightSpeed);
			}
			
			// checks if image is loaded
			if (option.preload && control.find('img:eq(' + start + ')').length) {
				// adds preload image
				$('.' + option.container, elem).css({
					background: 'url(' + option.preloadImage + ') no-repeat 50% 50%'
				});
				
				// gets image src, with cache buster
				var img = control.find('img:eq(' + start + ')').attr('src') + '?' + (new Date()).getTime();
				
				// check if the image has a parent
				if ($('img', elem).parent().attr('class') != 'slides_control') {
					// If image has parent, get tag name
					imageParent = control.children(':eq(0)')[0].tagName.toLowerCase();
				} else {
					// Image doesn't have parent, use image tag name
					imageParent = control.find('img:eq(' + start + ')');
				}

				// checks if image is loaded
				control.find('img:eq(' + start + ')').attr('src', img).load(function() {
					// once image is fully loaded, fade in
					control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
						$(this).css({
							zIndex: 5
						});
						// removes preload image
						$('.' + option.container, elem).css({
							background: ''
						});
						// let the script know everything is loaded
						loaded = true;
						// call the loaded funciton
						option.slidesLoaded();
					});
				});
			} else {
				// if no preloader fade in start slide
				control.children(':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
					// let the script know everything is loaded
					loaded = true;
					// call the loaded funciton
					option.slidesLoaded();
				});
			}
			
			// click slide for next
			if (option.bigTarget) {
				// set cursor to pointer
				control.children().css({
					cursor: 'pointer'
				});
				// click handler
				control.children().click(function(){
					// animate to next on slide click
					animate('next', effect);
					return false;
				});									
			}
			
			// pause on mouseover
			if (option.hoverPause && option.play) {
				control.bind('mouseover',function(){
					// on mouse over stop
					stop();
				});
				control.bind('mouseleave',function(){
					// on mouse leave start pause timeout
					pause();
				});
			}
			
			// generate next/prev buttons
			if (option.generateNextPrev) {
				$('.' + option.container, elem).after('<a href="#" class="'+ option.prev +'">Prev</a>');
				$('.' + option.prev, elem).after('<a href="#" class="'+ option.next +'">Next</a>');
			}
			
			// next button
			$('.' + option.next ,elem).click(function(e){
				e.preventDefault();
				if (option.play) {
					pause();
				}
				animate('next', effect);
			});
			
			// previous button
			$('.' + option.prev, elem).click(function(e){
				e.preventDefault();
				if (option.play) {
					 pause();
				}
				animate('prev', effect);
			});
			
			// generate pagination
			if (option.generatePagination) {
				// create unordered list
				if (option.prependPagination) {
					elem.prepend('<ul class='+ option.paginationClass +'></ul>');
				} else {
					elem.append('<ul class='+ option.paginationClass +'></ul>');
				}
				// for each slide create a list item and link
				control.children().each(function(){
					$('.' + option.paginationClass, elem).append('<li><a href="#'+ number +'">'+ (number+1) +'</a></li>');
					number++;
				});
			} else {
				// if pagination exists, add href w/ value of item number to links
				$('.' + option.paginationClass + ' li a', elem).each(function(){
					$(this).attr('href', '#' + number);
					number++;
				});
			}
			
			// add current class to start slide pagination
			$('.' + option.paginationClass + ' li:eq('+ start +')', elem).addClass(option.currentClass);
			
			// click handling 
			$('.' + option.paginationClass + ' li a', elem ).click(function(){
				// pause slideshow
				if (option.play) {
					 pause();
				}
				// get clicked, pass to animate function					
				clicked = $(this).attr('href').match('[^#/]+$');
				// if current slide equals clicked, don't do anything
				if (current != clicked) {
					animate('pagination', paginationEffect, clicked);
				}
				return false;
			});
			
			// click handling 
			$('a.link', elem).click(function(){
				// pause slideshow
				if (option.play) {
					 pause();
				}
				// get clicked, pass to animate function					
				clicked = $(this).attr('href').match('[^#/]+$') - 1;
				// if current slide equals clicked, don't do anything
				if (current != clicked) {
					animate('pagination', paginationEffect, clicked);
				}
				return false;
			});
		
			if (option.play) {
				// set interval
				playInterval = setInterval(function() {
					animate('next', effect);
				}, option.play);
				// store interval id
				elem.data('interval',playInterval);
			}
		});
	};
	
	// default options
	$.fn.slides.option = {
		preload: false, // boolean, Set true to preload images in an image based slideshow
		preloadImage: '/img/loading.gif', // string, Name and location of loading image for preloader. Default is "/img/loading.gif"
		container: 'slides_container', // string, Class name for slides container. Default is "slides_container"
		generateNextPrev: false, // boolean, Auto generate next/prev buttons
		next: 'next', // string, Class name for next button
		prev: 'prev', // string, Class name for previous button
		pagination: true, // boolean, If you're not using pagination you can set to false, but don't have to
		generatePagination: true, // boolean, Auto generate pagination
		prependPagination: false, // boolean, prepend pagination
		paginationClass: 'pagination', // string, Class name for pagination
		currentClass: 'current', // string, Class name for current class
		fadeSpeed: 350, // number, Set the speed of the fading animation in milliseconds
		fadeEasing: '', // string, must load jQuery's easing plugin before http://gsgd.co.uk/sandbox/jquery/easing/
		slideSpeed: 350, // number, Set the speed of the sliding animation in milliseconds
		slideEasing: '', // string, must load jQuery's easing plugin before http://gsgd.co.uk/sandbox/jquery/easing/
		start: 1, // number, Set the speed of the sliding animation in milliseconds
		effect: 'slide', // string, '[next/prev], [pagination]', e.g. 'slide, fade' or simply 'fade' for both
		crossfade: false, // boolean, Crossfade images in a image based slideshow
		randomize: false, // boolean, Set to true to randomize slides
		play: 0, // number, Autoplay slideshow, a positive number will set to true and be the time between slide animation in milliseconds
		pause: 0, // number, Pause slideshow on click of next/prev or pagination. A positive number will set to true and be the time of pause in milliseconds
		hoverPause: false, // boolean, Set to true and hovering over slideshow will pause it
		autoHeight: false, // boolean, Set to true to auto adjust height
		autoHeightSpeed: 350, // number, Set auto height animation time in milliseconds
		bigTarget: false, // boolean, Set to true and the whole slide will link to next slide on click
		animationStart: function(){}, // Function called at the start of animation
		animationComplete: function(){}, // Function called at the completion of animation
		slidesLoaded: function() {} // Function is called when slides is fully loaded
	};
	
	// Randomize slide order on load
	$.fn.randomize = function(callback) {
		function randomizeOrder() { return(Math.round(Math.random())-0.5); }
			return($(this).each(function() {
			var $this = $(this);
			var $children = $this.children();
			var childCount = $children.length;
			if (childCount > 1) {
				$children.hide();
				var indices = [];
				for (i=0;i<childCount;i++) { indices[indices.length] = i; }
				indices = indices.sort(randomizeOrder);
				$.each(indices,function(j,k) { 
					var $child = $children.eq(k);
					var $clone = $child.clone(true);
					$clone.show().appendTo($this);
					if (callback !== undefined) {
						callback($child, $clone);
					}
				$child.remove();
			});
			}
		}));
	};
})(jQuery);

/**
 * Isotope v1.5.19
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */

/*jshint asi: true, browser: true, curly: true, eqeqeq: true, forin: false, immed: false, newcap: true, noempty: true, strict: true, undef: true */
/*global jQuery: false */

(function( window, $, undefined ){

  'use strict';

  // get global vars
  var document = window.document;
  var Modernizr = window.Modernizr;

  // helper function
  var capitalize = function( str ) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // ========================= getStyleProperty by kangax ===============================
  // http://perfectionkills.com/feature-testing-css-properties/

  var prefixes = 'Moz Webkit O Ms'.split(' ');

  var getStyleProperty = function( propName ) {
    var style = document.documentElement.style,
        prefixed;

    // test standard property first
    if ( typeof style[propName] === 'string' ) {
      return propName;
    }

    // capitalize
    propName = capitalize( propName );

    // test vendor specific properties
    for ( var i=0, len = prefixes.length; i < len; i++ ) {
      prefixed = prefixes[i] + propName;
      if ( typeof style[ prefixed ] === 'string' ) {
        return prefixed;
      }
    }
  };

  var transformProp = getStyleProperty('transform'),
      transitionProp = getStyleProperty('transitionProperty');


  // ========================= miniModernizr ===============================
  // <3<3<3 and thanks to Faruk and Paul for doing the heavy lifting

  /*!
   * Modernizr v1.6ish: miniModernizr for Isotope
   * http://www.modernizr.com
   *
   * Developed by:
   * - Faruk Ates  http://farukat.es/
   * - Paul Irish  http://paulirish.com/
   *
   * Copyright (c) 2009-2010
   * Dual-licensed under the BSD or MIT licenses.
   * http://www.modernizr.com/license/
   */

  /*
   * This version whittles down the script just to check support for
   * CSS transitions, transforms, and 3D transforms.
  */

  var tests = {
    csstransforms: function() {
      return !!transformProp;
    },

    csstransforms3d: function() {
      var test = !!getStyleProperty('perspective');
      // double check for Chrome's false positive
      if ( test ) {
        var vendorCSSPrefixes = ' -o- -moz- -ms- -webkit- -khtml- '.split(' '),
            mediaQuery = '@media (' + vendorCSSPrefixes.join('transform-3d),(') + 'modernizr)',
            $style = $('<style>' + mediaQuery + '{#modernizr{height:3px}}' + '</style>')
                        .appendTo('head'),
            $div = $('<div id="modernizr" />').appendTo('html');

        test = $div.height() === 3;

        $div.remove();
        $style.remove();
      }
      return test;
    },

    csstransitions: function() {
      return !!transitionProp;
    }
  };

  var testName;

  if ( Modernizr ) {
    // if there's a previous Modernzir, check if there are necessary tests
    for ( testName in tests) {
      if ( !Modernizr.hasOwnProperty( testName ) ) {
        // if test hasn't been run, use addTest to run it
        Modernizr.addTest( testName, tests[ testName ] );
      }
    }
  } else {
    // or create new mini Modernizr that just has the 3 tests
    Modernizr = window.Modernizr = {
      _version : '1.6ish: miniModernizr for Isotope'
    };

    var classes = ' ';
    var result;

    // Run through tests
    for ( testName in tests) {
      result = tests[ testName ]();
      Modernizr[ testName ] = result;
      classes += ' ' + ( result ?  '' : 'no-' ) + testName;
    }

    // Add the new classes to the <html> element.
    $('html').addClass( classes );
  }


  // ========================= isoTransform ===============================

  /**
   *  provides hooks for .css({ scale: value, translate: [x, y] })
   *  Progressively enhanced CSS transforms
   *  Uses hardware accelerated 3D transforms for Safari
   *  or falls back to 2D transforms.
   */

  if ( Modernizr.csstransforms ) {

        // i.e. transformFnNotations.scale(0.5) >> 'scale3d( 0.5, 0.5, 1)'
    var transformFnNotations = Modernizr.csstransforms3d ?
      { // 3D transform functions
        translate : function ( position ) {
          return 'translate3d(' + position[0] + 'px, ' + position[1] + 'px, 0) ';
        },
        scale : function ( scale ) {
          return 'scale3d(' + scale + ', ' + scale + ', 1) ';
        }
      } :
      { // 2D transform functions
        translate : function ( position ) {
          return 'translate(' + position[0] + 'px, ' + position[1] + 'px) ';
        },
        scale : function ( scale ) {
          return 'scale(' + scale + ') ';
        }
      }
    ;

    var setIsoTransform = function ( elem, name, value ) {
          // unpack current transform data
      var data =  $.data( elem, 'isoTransform' ) || {},
          newData = {},
          fnName,
          transformObj = {},
          transformValue;

      // i.e. newData.scale = 0.5
      newData[ name ] = value;
      // extend new value over current data
      $.extend( data, newData );

      for ( fnName in data ) {
        transformValue = data[ fnName ];
        transformObj[ fnName ] = transformFnNotations[ fnName ]( transformValue );
      }

      // get proper order
      // ideally, we could loop through this give an array, but since we only have
      // a couple transforms we're keeping track of, we'll do it like so
      var translateFn = transformObj.translate || '',
          scaleFn = transformObj.scale || '',
          // sorting so translate always comes first
          valueFns = translateFn + scaleFn;

      // set data back in elem
      $.data( elem, 'isoTransform', data );

      // set name to vendor specific property
      elem.style[ transformProp ] = valueFns;
    };

    // ==================== scale ===================

    $.cssNumber.scale = true;

    $.cssHooks.scale = {
      set: function( elem, value ) {
        // uncomment this bit if you want to properly parse strings
        // if ( typeof value === 'string' ) {
        //   value = parseFloat( value );
        // }
        setIsoTransform( elem, 'scale', value );
      },
      get: function( elem, computed ) {
        var transform = $.data( elem, 'isoTransform' );
        return transform && transform.scale ? transform.scale : 1;
      }
    };

    $.fx.step.scale = function( fx ) {
      $.cssHooks.scale.set( fx.elem, fx.now+fx.unit );
    };


    // ==================== translate ===================

    $.cssNumber.translate = true;

    $.cssHooks.translate = {
      set: function( elem, value ) {

        // uncomment this bit if you want to properly parse strings
        // if ( typeof value === 'string' ) {
        //   value = value.split(' ');
        // }
        //
        // var i, val;
        // for ( i = 0; i < 2; i++ ) {
        //   val = value[i];
        //   if ( typeof val === 'string' ) {
        //     val = parseInt( val );
        //   }
        // }

        setIsoTransform( elem, 'translate', value );
      },

      get: function( elem, computed ) {
        var transform = $.data( elem, 'isoTransform' );
        return transform && transform.translate ? transform.translate : [ 0, 0 ];
      }
    };

  }

  // ========================= get transition-end event ===============================
  var transitionEndEvent, transitionDurProp;

  if ( Modernizr.csstransitions ) {
    transitionEndEvent = {
      WebkitTransitionProperty: 'webkitTransitionEnd',  // webkit
      MozTransitionProperty: 'transitionend',
      OTransitionProperty: 'oTransitionEnd',
      transitionProperty: 'transitionEnd'
    }[ transitionProp ];

    transitionDurProp = getStyleProperty('transitionDuration');
  }

  // ========================= smartresize ===============================

  /*
   * smartresize: debounced resize event for jQuery
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery.smartresize.js
   *
   * Copyright 2011 @louis_remi
   * Licensed under the MIT license.
   */

  var $event = $.event,
      resizeTimeout;

  $event.special.smartresize = {
    setup: function() {
      $(this).bind( "resize", $event.special.smartresize.handler );
    },
    teardown: function() {
      $(this).unbind( "resize", $event.special.smartresize.handler );
    },
    handler: function( event, execAsap ) {
      // Save the context
      var context = this,
          args = arguments;

      // set correct event type
      event.type = "smartresize";

      if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
      resizeTimeout = setTimeout(function() {
        jQuery.event.handle.apply( context, args );
      }, execAsap === "execAsap"? 0 : 100 );
    }
  };

  $.fn.smartresize = function( fn ) {
    return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
  };



// ========================= Isotope ===============================


  // our "Widget" object constructor
  $.Isotope = function( options, element, callback ){
    this.element = $( element );

    this._create( options );
    this._init( callback );
  };

  // styles of container element we want to keep track of
  var isoContainerStyles = [ 'width', 'height' ];

  var $window = $(window);

  $.Isotope.settings = {
    resizable: false,
    layoutMode : 'masonry',
    containerClass : 'isotope',
    itemClass : 'isotope-item',
    hiddenClass : 'isotope-hidden',
    hiddenStyle: { opacity: 0, scale: 0.001 },
    visibleStyle: { opacity: 1, scale: 1 },
    containerStyle: {
      position: 'relative',
      overflow: 'hidden'
    },
    animationEngine: 'best-available',
    animationOptions: {
      queue: false,
      duration: 800
    },
    sortBy : 'original-order',
    sortAscending : true,
    resizesContainer : true,
    transformsEnabled: !$.browser.opera, // disable transforms in Opera
    itemPositionDataEnabled: false
  };

  $.Isotope.prototype = {

    // sets up widget
    _create : function( options ) {

      this.options = $.extend( {}, $.Isotope.settings, options );

      this.styleQueue = [];
      this.elemCount = 0;

      // get original styles in case we re-apply them in .destroy()
      var elemStyle = this.element[0].style;
      this.originalStyle = {};
      // keep track of container styles
      var containerStyles = isoContainerStyles.slice(0);
      for ( var prop in this.options.containerStyle ) {
        containerStyles.push( prop );
      }
      for ( var i=0, len = containerStyles.length; i < len; i++ ) {
        prop = containerStyles[i];
        this.originalStyle[ prop ] = elemStyle[ prop ] || '';
      }
      // apply container style from options
      this.element.css( this.options.containerStyle );

      this._updateAnimationEngine();
      this._updateUsingTransforms();

      // sorting
      var originalOrderSorter = {
        'original-order' : function( $elem, instance ) {
          instance.elemCount ++;
          return instance.elemCount;
        },
        random : function() {
          return Math.random();
        }
      };

      this.options.getSortData = $.extend( this.options.getSortData, originalOrderSorter );

      // need to get atoms
      this.reloadItems();

      // get top left position of where the bricks should be
      this.offset = {
        left: parseInt( ( this.element.css('padding-left') || 0 ), 10 ),
        top: parseInt( ( this.element.css('padding-top') || 0 ), 10 )
      };

      // add isotope class first time around
      var instance = this;
      setTimeout( function() {
        instance.element.addClass( instance.options.containerClass );
      }, 0 );

      // bind resize method
      if ( this.options.resizable ) {
        $window.bind( 'smartresize.isotope', function() {
          instance.resize();
        });
      }

      // dismiss all click events from hidden events
      this.element.delegate( '.' + this.options.hiddenClass, 'click', function(){
        return false;
      });

    },

    _getAtoms : function( $elems ) {
      var selector = this.options.itemSelector,
          // filter & find
          $atoms = selector ? $elems.filter( selector ).add( $elems.find( selector ) ) : $elems,
          // base style for atoms
          atomStyle = { position: 'absolute' };

      if ( this.usingTransforms ) {
        atomStyle.left = 0;
        atomStyle.top = 0;
      }

      $atoms.css( atomStyle ).addClass( this.options.itemClass );

      this.updateSortData( $atoms, true );

      return $atoms;
    },

    // _init fires when your instance is first created
    // (from the constructor above), and when you
    // attempt to initialize the widget again (by the bridge)
    // after it has already been initialized.
    _init : function( callback ) {

      this.$filteredAtoms = this._filter( this.$allAtoms );
      this._sort();
      this.reLayout( callback );

    },

    option : function( opts ){
      // change options AFTER initialization:
      // signature: $('#foo').bar({ cool:false });
      if ( $.isPlainObject( opts ) ){
        this.options = $.extend( true, this.options, opts );

        // trigger _updateOptionName if it exists
        var updateOptionFn;
        for ( var optionName in opts ) {
          updateOptionFn = '_update' + capitalize( optionName );
          if ( this[ updateOptionFn ] ) {
            this[ updateOptionFn ]();
          }
        }
      }
    },

    // ====================== updaters ====================== //
    // kind of like setters

    _updateAnimationEngine : function() {
      var animationEngine = this.options.animationEngine.toLowerCase().replace( /[ _\-]/g, '');
      var isUsingJQueryAnimation;
      // set applyStyleFnName
      switch ( animationEngine ) {
        case 'css' :
        case 'none' :
          isUsingJQueryAnimation = false;
          break;
        case 'jquery' :
          isUsingJQueryAnimation = true;
          break;
        default : // best available
          isUsingJQueryAnimation = !Modernizr.csstransitions;
      }
      this.isUsingJQueryAnimation = isUsingJQueryAnimation;
      this._updateUsingTransforms();
    },

    _updateTransformsEnabled : function() {
      this._updateUsingTransforms();
    },

    _updateUsingTransforms : function() {
      var usingTransforms = this.usingTransforms = this.options.transformsEnabled &&
        Modernizr.csstransforms && Modernizr.csstransitions && !this.isUsingJQueryAnimation;

      // prevent scales when transforms are disabled
      if ( !usingTransforms ) {
        delete this.options.hiddenStyle.scale;
        delete this.options.visibleStyle.scale;
      }

      this.getPositionStyles = usingTransforms ? this._translate : this._positionAbs;
    },


    // ====================== Filtering ======================

    _filter : function( $atoms ) {
      var filter = this.options.filter === '' ? '*' : this.options.filter;

      if ( !filter ) {
        return $atoms;
      }

      var hiddenClass    = this.options.hiddenClass,
          hiddenSelector = '.' + hiddenClass,
          $hiddenAtoms   = $atoms.filter( hiddenSelector ),
          $atomsToShow   = $hiddenAtoms;

      if ( filter !== '*' ) {
        $atomsToShow = $hiddenAtoms.filter( filter );
        var $atomsToHide = $atoms.not( hiddenSelector ).not( filter ).addClass( hiddenClass );
        this.styleQueue.push({ $el: $atomsToHide, style: this.options.hiddenStyle });
      }

      this.styleQueue.push({ $el: $atomsToShow, style: this.options.visibleStyle });
      $atomsToShow.removeClass( hiddenClass );

      return $atoms.filter( filter );
    },

    // ====================== Sorting ======================

    updateSortData : function( $atoms, isIncrementingElemCount ) {
      var instance = this,
          getSortData = this.options.getSortData,
          $this, sortData;
      $atoms.each(function(){
        $this = $(this);
        sortData = {};
        // get value for sort data based on fn( $elem ) passed in
        for ( var key in getSortData ) {
          if ( !isIncrementingElemCount && key === 'original-order' ) {
            // keep original order original
            sortData[ key ] = $.data( this, 'isotope-sort-data' )[ key ];
          } else {
            sortData[ key ] = getSortData[ key ]( $this, instance );
          }
        }
        // apply sort data to element
        $.data( this, 'isotope-sort-data', sortData );
      });
    },

    // used on all the filtered atoms
    _sort : function() {

      var sortBy = this.options.sortBy,
          getSorter = this._getSorter,
          sortDir = this.options.sortAscending ? 1 : -1,
          sortFn = function( alpha, beta ) {
            var a = getSorter( alpha, sortBy ),
                b = getSorter( beta, sortBy );
            // fall back to original order if data matches
            if ( a === b && sortBy !== 'original-order') {
              a = getSorter( alpha, 'original-order' );
              b = getSorter( beta, 'original-order' );
            }
            return ( ( a > b ) ? 1 : ( a < b ) ? -1 : 0 ) * sortDir;
          };

      this.$filteredAtoms.sort( sortFn );
    },

    _getSorter : function( elem, sortBy ) {
      return $.data( elem, 'isotope-sort-data' )[ sortBy ];
    },

    // ====================== Layout Helpers ======================

    _translate : function( x, y ) {
      return { translate : [ x, y ] };
    },

    _positionAbs : function( x, y ) {
      return { left: x, top: y };
    },

    _pushPosition : function( $elem, x, y ) {
      x = Math.round( x + this.offset.left );
      y = Math.round( y + this.offset.top );
      var position = this.getPositionStyles( x, y );
      this.styleQueue.push({ $el: $elem, style: position });
      if ( this.options.itemPositionDataEnabled ) {
        $elem.data('isotope-item-position', {x: x, y: y} );
      }
    },


    // ====================== General Layout ======================

    // used on collection of atoms (should be filtered, and sorted before )
    // accepts atoms-to-be-laid-out to start with
    layout : function( $elems, callback ) {

      var layoutMode = this.options.layoutMode;

      // layout logic
      this[ '_' +  layoutMode + 'Layout' ]( $elems );

      // set the size of the container
      if ( this.options.resizesContainer ) {
        var containerStyle = this[ '_' +  layoutMode + 'GetContainerSize' ]();
        this.styleQueue.push({ $el: this.element, style: containerStyle });
      }

      this._processStyleQueue( $elems, callback );

      this.isLaidOut = true;
    },

    _processStyleQueue : function( $elems, callback ) {
      // are we animating the layout arrangement?
      // use plugin-ish syntax for css or animate
      var styleFn = !this.isLaidOut ? 'css' : (
            this.isUsingJQueryAnimation ? 'animate' : 'css'
          ),
          animOpts = this.options.animationOptions,
          onLayout = this.options.onLayout,
          objStyleFn, processor,
          triggerCallbackNow, callbackFn;

       if($elems.hasClass('disableResize'))
       		styleFn = 'css';

      // default styleQueue processor, may be overwritten down below
      processor = function( i, obj ) {
        obj.$el[ styleFn ]( obj.style, animOpts );
      };

      if ( this._isInserting && this.isUsingJQueryAnimation ) {
        // if using styleQueue to insert items
        processor = function( i, obj ) {
          // only animate if it not being inserted
          objStyleFn = obj.$el.hasClass('no-transition') ? 'css' : styleFn;
          obj.$el[ objStyleFn ]( obj.style, animOpts );
        };

      } else if ( callback || onLayout || animOpts.complete ) {
        // has callback
        var isCallbackTriggered = false,
            // array of possible callbacks to trigger
            callbacks = [ callback, onLayout, animOpts.complete ],
            instance = this;
        triggerCallbackNow = true;
        // trigger callback only once
        callbackFn = function() {
          if ( isCallbackTriggered ) {
            return;
          }
          var hollaback;
          for (var i=0, len = callbacks.length; i < len; i++) {
            hollaback = callbacks[i];
            if ( typeof hollaback === 'function' ) {
              hollaback.call( instance.element, $elems, instance );
            }
          }
          isCallbackTriggered = true;
        };

        if ( this.isUsingJQueryAnimation && styleFn === 'animate' ) {
          // add callback to animation options
          animOpts.complete = callbackFn;
          triggerCallbackNow = false;

        } else if ( Modernizr.csstransitions ) {
          // detect if first item has transition
          var i = 0,
              firstItem = this.styleQueue[0],
              testElem = firstItem && firstItem.$el,
              styleObj;
          // get first non-empty jQ object
          while ( !testElem || !testElem.length ) {
            styleObj = this.styleQueue[ i++ ];
            // HACK: sometimes styleQueue[i] is undefined
            if ( !styleObj ) {
              return;
            }
            testElem = styleObj.$el;
          }
          // get transition duration of the first element in that object
          // yeah, this is inexact
          var duration = parseFloat( getComputedStyle( testElem[0] )[ transitionDurProp ] );
          if ( duration > 0 ) {
            processor = function( i, obj ) {
              obj.$el[ styleFn ]( obj.style, animOpts )
                // trigger callback at transition end
                .one( transitionEndEvent, callbackFn );
            };
            triggerCallbackNow = false;
          }
        }
      }

      // process styleQueuex
    	$.each( this.styleQueue, processor );

      if ( triggerCallbackNow ) {
        callbackFn();
      }

      // clear out queue for next time
      this.styleQueue = [];
    },


    resize : function() {
      if ( this[ '_' + this.options.layoutMode + 'ResizeChanged' ]() ) {
       // this.reLayout();
      }
    },


    reLayout : function( callback ) {

      this[ '_' +  this.options.layoutMode + 'Reset' ]();
      this.layout( this.$filteredAtoms, callback );

    },

    // ====================== Convenience methods ======================

    // ====================== Adding items ======================

    // adds a jQuery object of items to a isotope container
    addItems : function( $content, callback ) {
      var $newAtoms = this._getAtoms( $content );
      // add new atoms to atoms pools
      this.$allAtoms = this.$allAtoms.add( $newAtoms );

      if ( callback ) {
        callback( $newAtoms );
      }
    },

    // convienence method for adding elements properly to any layout
    // positions items, hides them, then animates them back in <--- very sezzy
    insert : function( $content, callback ) {
      // position items
      this.element.append( $content );

      var instance = this;
      this.addItems( $content, function( $newAtoms ) {
        var $newFilteredAtoms = instance._filter( $newAtoms );
        instance._addHideAppended( $newFilteredAtoms );
        instance._sort();
        instance.reLayout();
        instance._revealAppended( $newFilteredAtoms, callback );
      });

    },

    // convienence method for working with Infinite Scroll
    appended : function( $content, callback ) {
      var instance = this;
      this.addItems( $content, function( $newAtoms ) {
        instance._addHideAppended( $newAtoms );
        instance.layout( $newAtoms );
        instance._revealAppended( $newAtoms, callback );
      });
    },

    // adds new atoms, then hides them before positioning
    _addHideAppended : function( $newAtoms ) {
      this.$filteredAtoms = this.$filteredAtoms.add( $newAtoms );
      $newAtoms.addClass('no-transition');

      this._isInserting = true;

      // apply hidden styles
      this.styleQueue.push({ $el: $newAtoms, style: this.options.hiddenStyle });
    },

    // sets visible style on new atoms
    _revealAppended : function( $newAtoms, callback ) {
      var instance = this;
      // apply visible style after a sec
      setTimeout( function() {
        // enable animation
        $newAtoms.removeClass('no-transition');
        // reveal newly inserted filtered elements
        instance.styleQueue.push({ $el: $newAtoms, style: instance.options.visibleStyle });
        instance._isInserting = false;
        instance._processStyleQueue( $newAtoms, callback );
      }, 10 );
    },

    // gathers all atoms
    reloadItems : function() {
      this.$allAtoms = this._getAtoms( this.element.children() );
    },

    // removes elements from Isotope widget
    remove: function( $content, callback ) {
      // remove elements from Isotope instance in callback
      var instance = this;
      // remove() as a callback, for after transition / animation
      var removeContent = function() {
        instance.$allAtoms = instance.$allAtoms.not( $content );
        $content.remove();
        if ( callback ) {
          callback.call( instance.element );
        }
      };

      if ( $content.filter( ':not(.' + this.options.hiddenClass + ')' ).length ) {
        // if any non-hidden content needs to be removed
        this.styleQueue.push({ $el: $content, style: this.options.hiddenStyle });
        this.$filteredAtoms = this.$filteredAtoms.not( $content );
        this._sort();
        this.reLayout( removeContent );
      } else {
        // remove it now
        removeContent();
      }

    },

    shuffle : function( callback ) {
      this.updateSortData( this.$allAtoms );
      this.options.sortBy = 'random';
      this._sort();
      this.reLayout( callback );
    },

    // destroys widget, returns elements and container back (close) to original style
    destroy : function() {

      var usingTransforms = this.usingTransforms;
      var options = this.options;

      this.$allAtoms
        .removeClass( options.hiddenClass + ' ' + options.itemClass )
        .each(function(){
          var style = this.style;
          style.position = '';
          style.top = '';
          style.left = '';
          style.opacity = '';
          if ( usingTransforms ) {
            style[ transformProp ] = '';
          }
        });

      // re-apply saved container styles
      var elemStyle = this.element[0].style;
      for ( var prop in this.originalStyle ) {
        elemStyle[ prop ] = this.originalStyle[ prop ];
      }

      this.element
        .unbind('.isotope')
        .undelegate( '.' + options.hiddenClass, 'click' )
        .removeClass( options.containerClass )
        .removeData('isotope');

      $window.unbind('.isotope');

    },


    // ====================== LAYOUTS ======================

    // calculates number of rows or columns
    // requires columnWidth or rowHeight to be set on namespaced object
    // i.e. this.masonry.columnWidth = 200
    _getSegments : function( isRows ) {
      var namespace = this.options.layoutMode,
          measure  = isRows ? 'rowHeight' : 'columnWidth',
          size     = isRows ? 'height' : 'width',
          segmentsName = isRows ? 'rows' : 'cols',
          containerSize = this.element[ size ](),
          segments,
                    // i.e. options.masonry && options.masonry.columnWidth
          segmentSize = this.options[ namespace ] && this.options[ namespace ][ measure ] ||
                    // or use the size of the first item, i.e. outerWidth
                    this.$filteredAtoms[ 'outer' + capitalize(size) ](true) ||
                    // if there's no items, use size of container
                    containerSize;

      segments = Math.floor( containerSize / segmentSize );
      segments = Math.max( segments, 1 );

      // i.e. this.masonry.cols = ....
      this[ namespace ][ segmentsName ] = segments;
      // i.e. this.masonry.columnWidth = ...
      this[ namespace ][ measure ] = segmentSize;

    },

    _checkIfSegmentsChanged : function( isRows ) {
      var namespace = this.options.layoutMode,
          segmentsName = isRows ? 'rows' : 'cols',
          prevSegments = this[ namespace ][ segmentsName ];
      // update cols/rows
      this._getSegments( isRows );
      // return if updated cols/rows is not equal to previous
      return ( this[ namespace ][ segmentsName ] !== prevSegments );
    },

    // ====================== Masonry ======================

    _masonryReset : function() {
      // layout-specific props
      this.masonry = {};
      // FIXME shouldn't have to call this again
      this._getSegments();
      var i = this.masonry.cols;
      this.masonry.colYs = [];
      while (i--) {
        this.masonry.colYs.push( 0 );
      }
    },

    _masonryLayout : function( $elems ) {
      var instance = this,
          props = instance.masonry;
      $elems.each(function(){
        var $this  = $(this),
            //how many columns does this brick span
            colSpan = Math.ceil( $this.outerWidth(true) / props.columnWidth );
        colSpan = Math.min( colSpan, props.cols );

        if ( colSpan === 1 ) {
          // if brick spans only one column, just like singleMode
          instance._masonryPlaceBrick( $this, props.colYs );
        } else {
          // brick spans more than one column
          // how many different places could this brick fit horizontally
          var groupCount = props.cols + 1 - colSpan,
              groupY = [],
              groupColY,
              i;

          // for each group potential horizontal position
          for ( i=0; i < groupCount; i++ ) {
            // make an array of colY values for that one group
            groupColY = props.colYs.slice( i, i+colSpan );
            // and get the max value of the array
            groupY[i] = Math.max.apply( Math, groupColY );
          }

          instance._masonryPlaceBrick( $this, groupY );
        }
      });
    },

    // worker method that places brick in the columnSet
    //   with the the minY
    _masonryPlaceBrick : function( $brick, setY ) {
      // get the minimum Y value from the columns
      var minimumY = Math.min.apply( Math, setY ),
          shortCol = 0;

      // Find index of short column, the first from the left
      for (var i=0, len = setY.length; i < len; i++) {
        if ( setY[i] === minimumY ) {
          shortCol = i;
          break;
        }
      }

      // position the brick
      var x = this.masonry.columnWidth * shortCol,
          y = minimumY;
      this._pushPosition( $brick, x, y );

      // apply setHeight to necessary columns
      var setHeight = minimumY + $brick.outerHeight(true),
          setSpan = this.masonry.cols + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.masonry.colYs[ shortCol + i ] = setHeight;
      }

    },

    _masonryGetContainerSize : function() {
      var containerHeight = Math.max.apply( Math, this.masonry.colYs );
      return { height: containerHeight };
    },

    _masonryResizeChanged : function() {
      return this._checkIfSegmentsChanged();
    },

    // ====================== fitRows ======================

    _fitRowsReset : function() {
      this.fitRows = {
        x : 0,
        y : 0,
        height : 0
      };
    },

    _fitRowsLayout : function( $elems ) {
      var instance = this,
          containerWidth = this.element.width(),
          props = this.fitRows;

      $elems.each( function() {
        var $this = $(this),
            atomW = $this.outerWidth(true),
            atomH = $this.outerHeight(true);

        if ( props.x !== 0 && atomW + props.x > containerWidth ) {
          // if this element cannot fit in the current row
          props.x = 0;
          props.y = props.height;
        }

        // position the atom
        instance._pushPosition( $this, props.x, props.y );

        props.height = Math.max( props.y + atomH, props.height );
        props.x += atomW;

      });
    },

    _fitRowsGetContainerSize : function () {
      return { height : this.fitRows.height };
    },

    _fitRowsResizeChanged : function() {
      return true;
    },


    // ====================== cellsByRow ======================

    _cellsByRowReset : function() {
      this.cellsByRow = {
        index : 0
      };
      // get this.cellsByRow.columnWidth
      this._getSegments();
      // get this.cellsByRow.rowHeight
      this._getSegments(true);
    },

    _cellsByRowLayout : function( $elems ) {
      var instance = this,
          props = this.cellsByRow;
      $elems.each( function(){
        var $this = $(this),
            col = props.index % props.cols,
            row = Math.floor( props.index / props.cols ),
            x = ( col + 0.5 ) * props.columnWidth - $this.outerWidth(true) / 2,
            y = ( row + 0.5 ) * props.rowHeight - $this.outerHeight(true) / 2;
        instance._pushPosition( $this, x, y );
        props.index ++;
      });
    },

    _cellsByRowGetContainerSize : function() {
      return { height : Math.ceil( this.$filteredAtoms.length / this.cellsByRow.cols ) * this.cellsByRow.rowHeight + this.offset.top };
    },

    _cellsByRowResizeChanged : function() {
      return this._checkIfSegmentsChanged();
    },


    // ====================== straightDown ======================

    _straightDownReset : function() {
      this.straightDown = {
        y : 0
      };
    },

    _straightDownLayout : function( $elems ) {
      var instance = this;
      $elems.each( function( i ){
        var $this = $(this);
        instance._pushPosition( $this, 0, instance.straightDown.y );
        instance.straightDown.y += $this.outerHeight(true);
      });
    },

    _straightDownGetContainerSize : function() {
      return { height : this.straightDown.y };
    },

    _straightDownResizeChanged : function() {
      return true;
    },


    // ====================== masonryHorizontal ======================

    _masonryHorizontalReset : function() {
      // layout-specific props
      this.masonryHorizontal = {};
      // FIXME shouldn't have to call this again
      this._getSegments( true );
      var i = this.masonryHorizontal.rows;
      this.masonryHorizontal.rowXs = [];
      while (i--) {
        this.masonryHorizontal.rowXs.push( 0 );
      }
    },

    _masonryHorizontalLayout : function( $elems ) {
      var instance = this,
          props = instance.masonryHorizontal;
      $elems.each(function(){
        var $this  = $(this),
            //how many rows does this brick span
            rowSpan = Math.ceil( $this.outerHeight(true) / props.rowHeight );
        rowSpan = Math.min( rowSpan, props.rows );

        if ( rowSpan === 1 ) {
          // if brick spans only one column, just like singleMode
          instance._masonryHorizontalPlaceBrick( $this, props.rowXs );
        } else {
          // brick spans more than one row
          // how many different places could this brick fit horizontally
          var groupCount = props.rows + 1 - rowSpan,
              groupX = [],
              groupRowX, i;

          // for each group potential horizontal position
          for ( i=0; i < groupCount; i++ ) {
            // make an array of colY values for that one group
            groupRowX = props.rowXs.slice( i, i+rowSpan );
            // and get the max value of the array
            groupX[i] = Math.max.apply( Math, groupRowX );
          }

          instance._masonryHorizontalPlaceBrick( $this, groupX );
        }
      });
    },

    _masonryHorizontalPlaceBrick : function( $brick, setX ) {
      // get the minimum Y value from the columns
      var minimumX  = Math.min.apply( Math, setX ),
          smallRow  = 0;
      // Find index of smallest row, the first from the top
      for (var i=0, len = setX.length; i < len; i++) {
        if ( setX[i] === minimumX ) {
          smallRow = i;
          break;
        }
      }

      // position the brick
      var x = minimumX,
          y = this.masonryHorizontal.rowHeight * smallRow;
      this._pushPosition( $brick, x, y );

      // apply setHeight to necessary columns
      var setWidth = minimumX + $brick.outerWidth(true),
          setSpan = this.masonryHorizontal.rows + 1 - len;
      for ( i=0; i < setSpan; i++ ) {
        this.masonryHorizontal.rowXs[ smallRow + i ] = setWidth;
      }
    },

    _masonryHorizontalGetContainerSize : function() {
      var containerWidth = Math.max.apply( Math, this.masonryHorizontal.rowXs );
      return { width: containerWidth };
    },

    _masonryHorizontalResizeChanged : function() {
      return this._checkIfSegmentsChanged(true);
    },


    // ====================== fitColumns ======================

    _fitColumnsReset : function() {
      this.fitColumns = {
        x : 0,
        y : 0,
        width : 0
      };
    },

    _fitColumnsLayout : function( $elems ) {
      var instance = this,
          containerHeight = this.element.height(),
          props = this.fitColumns;
      $elems.each( function() {
        var $this = $(this),
            atomW = $this.outerWidth(true),
            atomH = $this.outerHeight(true);

        if ( props.y !== 0 && atomH + props.y > containerHeight ) {
          // if this element cannot fit in the current column
          props.x = props.width;
          props.y = 0;
        }

        // position the atom
        instance._pushPosition( $this, props.x, props.y );

        props.width = Math.max( props.x + atomW, props.width );
        props.y += atomH;

      });
    },

    _fitColumnsGetContainerSize : function () {
      return { width : this.fitColumns.width };
    },

    _fitColumnsResizeChanged : function() {
      return true;
    },



    // ====================== cellsByColumn ======================

    _cellsByColumnReset : function() {
      this.cellsByColumn = {
        index : 0
      };
      // get this.cellsByColumn.columnWidth
      this._getSegments();
      // get this.cellsByColumn.rowHeight
      this._getSegments(true);
    },

    _cellsByColumnLayout : function( $elems ) {
      var instance = this,
          props = this.cellsByColumn;
      $elems.each( function(){
        var $this = $(this),
            col = Math.floor( props.index / props.rows ),
            row = props.index % props.rows,
            x = ( col + 0.5 ) * props.columnWidth - $this.outerWidth(true) / 2,
            y = ( row + 0.5 ) * props.rowHeight - $this.outerHeight(true) / 2;
        instance._pushPosition( $this, x, y );
        props.index ++;
      });
    },

    _cellsByColumnGetContainerSize : function() {
      return { width : Math.ceil( this.$filteredAtoms.length / this.cellsByColumn.rows ) * this.cellsByColumn.columnWidth };
    },

    _cellsByColumnResizeChanged : function() {
      return this._checkIfSegmentsChanged(true);
    },

    // ====================== straightAcross ======================

    _straightAcrossReset : function() {
      this.straightAcross = {
        x : 0
      };
    },

    _straightAcrossLayout : function( $elems ) {
      var instance = this;
      $elems.each( function( i ){
        var $this = $(this);
        instance._pushPosition( $this, instance.straightAcross.x, 0 );
        instance.straightAcross.x += $this.outerWidth(true);
      });
    },

    _straightAcrossGetContainerSize : function() {
      return { width : this.straightAcross.x };
    },

    _straightAcrossResizeChanged : function() {
      return true;
    }

  };


  // ======================= imagesLoaded Plugin ===============================
  /*!
   * jQuery imagesLoaded plugin v1.1.0
   * http://github.com/desandro/imagesloaded
   *
   * MIT License. by Paul Irish et al.
   */


  // $('#my-container').imagesLoaded(myFunction)
  // or
  // $('img').imagesLoaded(myFunction)

  // execute a callback when all images have loaded.
  // needed because .load() doesn't work on cached images

  // callback function gets image collection as argument
  //  `this` is the container

  $.fn.imagesLoaded = function( callback ) {
    var $this = this,
        $images = $this.find('img').add( $this.filter('img') ),
        len = $images.length,
        blank = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
        loaded = [];

    function triggerCallback() {
      callback.call( $this, $images );
    }

    function imgLoaded( event ) {
      var img = event.target;
      if ( img.src !== blank && $.inArray( img, loaded ) === -1 ){
        loaded.push( img );
        if ( --len <= 0 ){
          setTimeout( triggerCallback );
          $images.unbind( '.imagesLoaded', imgLoaded );
        }
      }
    }

    // if no images, trigger immediately
    if ( !len ) {
      triggerCallback();
    }

    $images.bind( 'load.imagesLoaded error.imagesLoaded',  imgLoaded ).each( function() {
      // cached images don't fire load sometimes, so we reset src.
      var src = this.src;
      // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
      // data uri bypasses webkit log warning (thx doug jones)
      this.src = blank;
      this.src = src;
    });

    return $this;
  };


  // helper function for logging errors
  // $.error breaks jQuery chaining
  var logError = function( message ) {
    if ( window.console ) {
      window.console.error( message );
    }
  };

  // =======================  Plugin bridge  ===============================
  // leverages data method to either create or return $.Isotope constructor
  // A bit from jQuery UI
  //   https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js
  // A bit from jcarousel
  //   https://github.com/jsor/jcarousel/blob/master/lib/jquery.jcarousel.js

  $.fn.isotope = function( options, callback ) {
    if ( typeof options === 'string' ) {
      // call method
      var args = Array.prototype.slice.call( arguments, 1 );

      this.each(function(){
        var instance = $.data( this, 'isotope' );
        if ( !instance ) {
          logError( "cannot call methods on isotope prior to initialization; " +
              "attempted to call method '" + options + "'" );
          return;
        }
        if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
          logError( "no such method '" + options + "' for isotope instance" );
          return;
        }
        // apply method
        instance[ options ].apply( instance, args );
      });
    } else {
      this.each(function() {
        var instance = $.data( this, 'isotope' );
        if ( instance ) {
          // apply options & init
          instance.option( options );
          instance._init( callback );
        } else {
          // initialize new instance
          $.data( this, 'isotope', new $.Isotope( options, this, callback ) );
        }
      });
    }
    // return jQuery object
    // so plugin methods do not have to
    return this;
  };

})( window, jQuery );

/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Site	: www.buildinternet.com/project/supersized
	
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License
	
*/

(function($){

	/* Place Supersized Elements
	----------------------------*/
    
    $.supersized = function(options){
    	
    	/* Variables
		----------------------------*/
    	var el = '#supersized',
        	base = this;
        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;
        vars = $.supersized.vars;

        // Add a reverse reference to the DOM object
        base.$el.data("supersized", base);
        api = base.$el.data('supersized');
		
		base.init = function(){
        	// Combine options and vars
        	$.supersized.vars = $.extend($.supersized.vars, $.supersized.themeVars);
        	$.supersized.vars.options = $.extend({},$.supersized.defaultOptions, $.supersized.themeOptions, options);
            base.options = $.supersized.vars.options;
            
            base._build();
        };
        
        
        /* Build Elements
		----------------------------*/
        base._build = function(){
        	// Add in slide markers
        	var thisSlide = 0,
        		slideSet = '',
				markers = '',
				markerContent,
				thumbMarkers = '',
				thumbImage;
				
			while(thisSlide <= base.options.slides.length-1){
				//Determine slide link content
				switch(base.options.slide_links){
					case 'num':
						markerContent = thisSlide+1;
						break;
					case 'name':
						markerContent = base.options.slides[thisSlide].title;
						break;
					case 'blank':
						markerContent = '';
						break;
				}
				
				slideSet = slideSet+'<li class="slide-'+thisSlide+'"></li>';
				
				if(thisSlide == base.options.start_slide-1){
					// Slide links
					if (base.options.slide_links)markers = markers+'<li class="slide-link-'+thisSlide+' current-slide"><a>'+markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.options.thumb_links){
						base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
						thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+' current-thumb"><img src="'+thumbImage+'"/></li>';
					};
				}else{
					// Slide links
					if (base.options.slide_links) markers = markers+'<li class="slide-link-'+thisSlide+'" ><a>'+markerContent+'</a></li>';
					// Slide Thumbnail Links
					if (base.options.thumb_links){
						base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
						thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+'"><img src="'+thumbImage+'"/></li>';
					};
				}
				thisSlide++;
			}
			
			if (base.options.slide_links) $(vars.slide_list).append(markers);
			if (base.options.thumb_links && vars.thumb_tray.length){
				$(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace('#','')+'">'+thumbMarkers+'</ul>');
			}
			
			$(base.el).append(slideSet);
			
			// Add in thumbnails
			if (base.options.thumbnail_navigation){
				// Load previous thumbnail
				vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
				$(vars.prev_thumb).show().html($("<img/>").attr("src", base.options.slides[prevThumb].image));
				
				// Load next thumbnail
				vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
				$(vars.next_thumb).show().html($("<img/>").attr("src", base.options.slides[nextThumb].image));
			}
			
            base._start(); // Get things started
        };
        
        
        /* Initialize
		----------------------------*/
    	base._start = function(){
			
			// Determine if starting slide random
			if (base.options.start_slide){
				vars.current_slide = base.options.start_slide - 1;
			}else{
				vars.current_slide = Math.floor(Math.random()*base.options.slides.length);	// Generate random slide number
			}
			
			// If links should open in new window
			var linkTarget = base.options.new_window ? ' target="_blank"' : '';
			
			// Set slideshow quality (Supported only in FF and IE, no Webkit)
			if (base.options.performance == 3){
				base.$el.addClass('speed'); 		// Faster transitions
			} else if ((base.options.performance == 1) || (base.options.performance == 2)){
				base.$el.addClass('quality');	// Higher image quality
			}
						
			// Shuffle slide order if needed		
			if (base.options.random){
				arr = base.options.slides;
				for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
			    base.options.slides = arr;
			}
			
			/*-----Load initial set of images-----*/
	
			if (base.options.slides.length > 1){
				if(base.options.slides.length > 2){
					// Set previous image
					vars.current_slide - 1 < 0  ? loadPrev = base.options.slides.length - 1 : loadPrev = vars.current_slide - 1;	// If slide is 1, load last slide as previous
					var imageLink = (base.options.slides[loadPrev].url) ? "href='" + base.options.slides[loadPrev].url + "'" : "";
				
					var imgPrev = $('<img src="'+base.options.slides[loadPrev].image+'"/>');
					var slidePrev = base.el+' li:eq('+loadPrev+')';
					imgPrev.appendTo(slidePrev).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading prevslide');
				
					imgPrev.load(function(){
						var oldDisplay = $('#supersized').css('display');
						$('#supersized').css('display', 'block');
						$(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
						$('#supersized').css('display', oldDisplay);
						base.resizeNow();	// Resize background image
					});	// End Load
				}
			} else {
				// Slideshow turned off if there is only one slide
				base.options.slideshow = 0;
			}
			
			// Set current image
			imageLink = (api.getField('url')) ? "href='" + api.getField('url') + "'" : "";
			var img = $('<img src="'+api.getField('image')+'"/>');
			
			var slideCurrent= base.el+' li:eq('+vars.current_slide+')';
			img.appendTo(slideCurrent).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading activeslide');
			
			img.load(function(){
				base._origDim($(this));
				base.resizeNow();	// Resize background image
				base.launch();
				if( typeof theme != 'undefined' && typeof theme._init == "function" ) theme._init();	// Load Theme
			});
			
			if (base.options.slides.length > 1){
				// Set next image
				vars.current_slide == base.options.slides.length - 1 ? loadNext = 0 : loadNext = vars.current_slide + 1;	// If slide is last, load first slide as next
				imageLink = (base.options.slides[loadNext].url) ? "href='" + base.options.slides[loadNext].url + "'" : "";
				
				var imgNext = $('<img src="'+base.options.slides[loadNext].image+'"/>');
				var slideNext = base.el+' li:eq('+loadNext+')';
				imgNext.appendTo(slideNext).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading');
				
				imgNext.load(function(){
					var oldDisplay = $('#supersized').css('display');
					$('#supersized').css('display', 'block');
					$(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
					$('#supersized').css('display', oldDisplay);
					base.resizeNow();	// Resize background image
				});	// End Load
			}
			/*-----End load initial images-----*/
			
			//  Hide elements to be faded in
			base.$el.css('visibility','hidden');
			$('.load-item').hide();
			
    	};
		
		
		/* Launch Supersized
		----------------------------*/
		base.launch = function(){
		
			base.$el.css('visibility','visible').hide().fadeIn(500);
			$('#supersized-loader').remove();		//Hide loading animation
			
			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');
			$('.load-item').show();
			
			// Keyboard Navigation
			if (base.options.keyboard_nav){
				$(document.documentElement).keyup(function (event) {
				
					if(vars.in_animation) return false;		// Abort if currently animating
					
					// Left Arrow or Down Arrow
					if ((event.keyCode == 37) || (event.keyCode == 40)) {
						clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.prevSlide();
					
					// Right Arrow or Up Arrow
					} else if ((event.keyCode == 39) || (event.keyCode == 38)) {
						clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.nextSlide();
					
					// Spacebar	
					} else if (event.keyCode == 32 && !vars.hover_pause) {
						clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
						base.playToggle();
					}
				
				});
			}
			
			// Pause when hover on image
			if (base.options.slideshow && base.options.pause_hover){
				$(base.el).hover(function() {
					if(vars.in_animation) return false;		// Abort if currently animating
			   			vars.hover_pause = true;	// Mark slideshow paused from hover
			   			if(!vars.is_paused){
			   				vars.hover_pause = 'resume';	// It needs to resume afterwards
			   				base.playToggle();
			   			}
			   	}, function() {
					if(vars.hover_pause == 'resume'){
						base.playToggle();
						vars.hover_pause = false;
					}
			   	});
			}
			
			if (base.options.slide_links){
				// Slide marker clicked
				$(vars.slide_list+'> li').click(function(){

					if($(this).attr('id') != 'playPause') {
				
						index = $(vars.slide_list+'> li').index(this);
						targetSlide = index;
						
						base.goTo(targetSlide);
						return false;

					}
					
				});
			}
			
			// Thumb marker clicked
			if (base.options.thumb_links){
				$(vars.thumb_list+'> li').click(function(){
				
					index = $(vars.thumb_list+'> li').index(this);
					targetSlide = index + 1;
					
					api.goTo(targetSlide);
					return false;
					
				});
			}
			
			// Start slideshow if enabled
			if (base.options.slideshow && base.options.slides.length > 1){
	    		
	    		// Start slideshow if autoplay enabled
	    		if (base.options.autoplay && base.options.slides.length > 1){
	    			vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);	// Initiate slide interval
				}else{
					vars.is_paused = true;	// Mark as paused
				}
				
				//Prevent navigation items from being dragged					
				$('.load-item img').bind("contextmenu mousedown",function(){
					return false;
				});
								
			}
			
			// Adjust image when browser is resized
			$(window).resize(function(){
	    		base.resizeNow();
			});
    		
    	};
        
        
        /* Resize Images
		----------------------------*/
		base.resizeNow = function(){
			
			return base.$el.each(function() {
		  		//  Resize each image seperately
		  		$('img', base.el).each(function(){
		  			
					thisSlide = $(this);
					var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);	// Define image ratio
					
					// Gather browser size
					var browserwidth = base.$el.width(),
						browserheight = base.$el.height(),
						offset;
					
					/*-----Resize Image-----*/
					if (base.options.fit_always){	// Fit always is enabled
						if ((browserheight/browserwidth) > ratio){
							resizeWidth();
						} else {
							resizeHeight();
						}
					}else{	// Normal Resize
						if ((browserheight <= base.options.min_height) && (browserwidth <= base.options.min_width)){	// If window smaller than minimum width and height
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);		// If portraits are set to fit
							}
						
						} else if (browserwidth <= base.options.min_width){		// If window only smaller than minimum width
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);		// If portraits are set to fit
							}
							
						} else if (browserheight <= base.options.min_height){	// If window only smaller than minimum height
						
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();		// If portraits are set to fit
							}
						
						} else {	// If larger than minimums
							
							if ((browserheight/browserwidth) > ratio){
								base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();	// If landscapes are set to fit
							} else {
								base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		// If portraits are set to fit
							}
							
						}
					}
					/*-----End Image Resize-----*/
					
					
					/*-----Resize Functions-----*/
					
					function resizeWidth(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.width() < browserwidth || thisSlide.width() < base.options.min_width ){
								if (thisSlide.width() * ratio >= base.options.min_height){
									thisSlide.width(base.options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
						    	}else{
						    		resizeHeight();
						    	}
						    }
						}else{
							if (base.options.min_height >= browserheight && !base.options.fit_landscape){	// If minimum height needs to be considered
								if (browserwidth * ratio >= base.options.min_height || (browserwidth * ratio >= base.options.min_height && ratio <= 1)){	// If resizing would push below minimum height or image is a landscape
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								} else if (ratio > 1){		// Else the image is portrait
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								} else if (thisSlide.width() < browserwidth) {
									thisSlide.width(browserwidth);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.width(browserwidth);
								thisSlide.height(browserwidth * ratio);
							}
						}
					};
					
					function resizeHeight(minimum){
						if (minimum){	// If minimum height needs to be considered
							if(thisSlide.height() < browserheight){
								if (thisSlide.height() / ratio >= base.options.min_width){
									thisSlide.height(base.options.min_height);
									thisSlide.width(thisSlide.height() / ratio);
								}else{
									resizeWidth(true);
								}
							}
						}else{	// Otherwise, resized as normal
							if (base.options.min_width >= browserwidth){	// If minimum width needs to be considered
								if (browserheight / ratio >= base.options.min_width || ratio > 1){	// If resizing would push below minimum width or image is a portrait
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								} else if (ratio <= 1){		// Else the image is landscape
									thisSlide.width(base.options.min_width);
						    		thisSlide.height(thisSlide.width() * ratio);
								}
							}else{	// Otherwise, resize as normal
								thisSlide.height(browserheight);
								thisSlide.width(browserheight / ratio);
							}
						}
					};
					
					/*-----End Resize Functions-----*/
					
					if (thisSlide.parents('li').hasClass('image-loading')){
						$('.image-loading').removeClass('image-loading');
					}
					
					// Horizontally Center
					if (base.options.horizontal_center){
						$(this).css('left', (browserwidth - $(this).width())/2);
					}
					
					// Vertically Center
					if (base.options.vertical_center){
						$(this).css('top', (browserheight - $(this).height())/2);
					}
					
				});
				
				// Basic image drag and right click protection
				if (base.options.image_protect){
					
					$('img', base.el).bind("contextmenu mousedown",function(){
						return false;
					});
				
				}
				
				return false;
				
			});
			
		};
        
        
        /* Next Slide
		----------------------------*/
		base.nextSlide = function(){
			
			if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
				else vars.in_animation = true;		// Otherwise set animation marker
				
		    clearInterval(vars.slideshow_interval);	// Stop slideshow
		    
		    var slides = base.options.slides,					// Pull in slides array
				liveslide = base.$el.find('.activeslide');		// Find active slide
				$('.prevslide').removeClass('prevslide');
				liveslide.removeClass('activeslide').addClass('prevslide');	// Remove active class & update previous slide
					
			// Get the slide number of new slide
			vars.current_slide + 1 == base.options.slides.length ? vars.current_slide = 0 : vars.current_slide++;
			
		    var nextslide = $(base.el+' li:eq('+vars.current_slide+')'),
		    	prevslide = base.$el.find('.prevslide');
			
			// If hybrid mode is on drop quality for transition
			if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');	
			
			
			/*-----Load Image-----*/
			
			loadSlide = false;

			vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

			var targetList = base.el+' li:eq('+loadSlide+')';
			if (!$(targetList).html()){
				
				// If links should open in new window
				var linkTarget = base.options.new_window ? ' target="_blank"' : '';
				
				imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
				var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
				
				img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
				
				img.load(function(){
					base._origDim($(this));
					base.resizeNow();
				});	// End Load
			};
						
			// Update thumbnails (if enabled)
			if (base.options.thumbnail_navigation == 1){
			
				// Load previous thumbnail
				vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
				$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));
			
				// Load next thumbnail
				nextThumb = loadSlide;
				$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
				
			}
			
			
			
			/*-----End Load Image-----*/
			
			
			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');
			
			//Update slide markers
			if (base.options.slide_links){
				$('.current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li' ).eq(vars.current_slide+1).addClass('current-slide');
			}
		    
		    nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide
		    
	    	switch(base.options.transition){
	    		case 0: case 'none':	// No transition
	    		    nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
	    		    break;
	    		case 1: case 'fade':	// Fade
	    		    nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 2: case 'slideTop':	// Slide Top
	    		    nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 3: case 'slideRight':	// Slide Right
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 4: case 'slideBottom': // Slide Bottom
	    			nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 5: case 'slideLeft':  // Slide Left
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 6: case 'carouselRight':	// Carousel Right
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
	    			break;
	    		case 7: case 'carouselLeft':   // Carousel Left
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({ left: base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
	    			break;
	    	}
		    return false;	
		};
		
		
		/* Previous Slide
		----------------------------*/
		base.prevSlide = function(){
		
			if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
				else vars.in_animation = true;		// Otherwise set animation marker
			
			clearInterval(vars.slideshow_interval);	// Stop slideshow
			
			var slides = base.options.slides,					// Pull in slides array
				liveslide = base.$el.find('.activeslide');		// Find active slide
				$('.prevslide').removeClass('prevslide');
				liveslide.removeClass('activeslide').addClass('prevslide');		// Remove active class & update previous slide
			
			// Get current slide number
			vars.current_slide == 0 ?  vars.current_slide = base.options.slides.length - 1 : vars.current_slide-- ;
				
		    var nextslide =  $(base.el+' li:eq('+vars.current_slide+')'),
		    	prevslide =  base.$el.find('.prevslide');
			
			// If hybrid mode is on drop quality for transition
			if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');	
			
			
			/*-----Load Image-----*/
			
			loadSlide = vars.current_slide;
			
			var targetList = base.el+' li:eq('+loadSlide+')';
			if (!$(targetList).html()){
				// If links should open in new window
				var linkTarget = base.options.new_window ? ' target="_blank"' : '';
				imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
				var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
				
				img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
				
				img.load(function(){
					base._origDim($(this));
					base.resizeNow();
				});	// End Load
			};
			
			// Update thumbnails (if enabled)
			if (base.options.thumbnail_navigation == 1){
			
				// Load previous thumbnail
				//prevThumb = loadSlide;
				loadSlide == 0 ? prevThumb = base.options.slides.length - 1 : prevThumb = loadSlide - 1;
				$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));
				
				// Load next thumbnail
				vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
				$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
			}
			
			/*-----End Load Image-----*/
			
			
			// Call theme function for before slide transition
			if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('prev');
			
			//Update slide markers
			if (base.options.slide_links){
				$('.current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li' ).eq(vars.current_slide+1).addClass('current-slide');
			}
			
		    nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide
		    
		    switch(base.options.transition){
	    		case 0: case 'none':	// No transition
	    		    nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
	    		    break;
	    		case 1: case 'fade':	// Fade
	    		  	nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 2: case 'slideTop':	// Slide Top (reverse)
	    		    nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    		    break;
	    		case 3: case 'slideRight':	// Slide Right (reverse)
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 4: case 'slideBottom': // Slide Bottom (reverse)
	    			nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 5: case 'slideLeft':  // Slide Left (reverse)
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
	    			break;
	    		case 6: case 'carouselRight':	// Carousel Right (reverse)
	    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({left : 0}, 0 ).animate({ left: base.$el.width(), avoidTransforms : false}, base.options.transition_speed );
	    			break;
	    		case 7: case 'carouselLeft':   // Carousel Left (reverse)
	    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
					liveslide.animate({left : 0}, 0 ).animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
	    			break;
	    	}
		    return false;	
		};
		
		
		/* Play/Pause Toggle
		----------------------------*/
		base.playToggle = function(){
		
			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
			
			if (vars.is_paused){
				
				vars.is_paused = false;
				
				// Call theme function for play
				if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('play');
				
				// Resume slideshow
	        	vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
	        	  
        	}else{
        		
        		vars.is_paused = true;
        		
        		// Call theme function for pause
        		if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('pause');
        		
        		// Stop slideshow
        		clearInterval(vars.slideshow_interval);	
       		
       		}
		    
		    return false;
    		
    	};
    	
    	
    	/* Go to specific slide
		----------------------------*/
    	base.goTo = function(targetSlide){
			if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
			
			var totalSlides = base.options.slides.length;
			
			// If target outside range
			if(targetSlide < 0){
				targetSlide = totalSlides;
			}else if(targetSlide > totalSlides){
				targetSlide = 1;
			}
			targetSlide = totalSlides - targetSlide + 1;
			
			clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
			
			// Call theme function for goTo trigger
			if (typeof theme != 'undefined' && typeof theme.goTo == "function" ) theme.goTo();
			
			if (vars.current_slide == totalSlides - targetSlide){
				if(!(vars.is_paused)){
					vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
				} 
				return false;
			}
			
			// If ahead of current position
			if(totalSlides - targetSlide > vars.current_slide ){
				
				// Adjust for new next slide
				vars.current_slide = totalSlides-targetSlide-1;
				vars.update_images = 'next';
				base._placeSlide(vars.update_images);
				
			//Otherwise it's before current position
			}else if(totalSlides - targetSlide < vars.current_slide){
				
				// Adjust for new prev slide
				vars.current_slide = totalSlides-targetSlide+1;
				vars.update_images = 'prev';
			    base._placeSlide(vars.update_images);
			    
			}
			
			// set active markers
			if (base.options.slide_links){
				$(vars.slide_list +'> .current-slide').removeClass('current-slide');
				$(vars.slide_list +'> li').eq((totalSlides-targetSlide)+1).addClass('current-slide');
			}
			
			if (base.options.thumb_links){
				$(vars.thumb_list +'> .current-thumb').removeClass('current-thumb');
				$(vars.thumb_list +'> li').eq((totalSlides-targetSlide)).addClass('current-thumb');
			}
			
		};
        
        
        /* Place Slide
		----------------------------*/
        base._placeSlide = function(place){
    			
			// If links should open in new window
			var linkTarget = base.options.new_window ? ' target="_blank"' : '';
			
			loadSlide = false;
			
			if (place == 'next'){
				
				vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide
				
				var targetList = base.el+' li:eq('+loadSlide+')';
				
				if (!$(targetList).html()){
					// If links should open in new window
					var linkTarget = base.options.new_window ? ' target="_blank"' : '';
					
					imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
					var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
					
					img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
					
					img.load(function(){
						base._origDim($(this));
						base.resizeNow();
					});	// End Load
				};
				
				base.nextSlide();
				
			}else if (place == 'prev'){
			
				vars.current_slide - 1 < 0  ? loadSlide = base.options.slides.length - 1 : loadSlide = vars.current_slide - 1;	// Determine next slide
				
				var targetList = base.el+' li:eq('+loadSlide+')';
				
				if (!$(targetList).html()){
					// If links should open in new window
					var linkTarget = base.options.new_window ? ' target="_blank"' : '';
					
					imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
					var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 
					
					img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');
					
					img.load(function(){
						base._origDim($(this));
						base.resizeNow();
					});	// End Load
				};
				base.prevSlide();
			}
			
		};
		
		
		/* Get Original Dimensions
		----------------------------*/
		base._origDim = function(targetSlide){
			var oldDisplay = $('#supersized').css('display');
			$('#supersized').css('display', 'block');
			targetSlide.data('origWidth', targetSlide.width()).data('origHeight', targetSlide.height());
			$('#supersized').css('display', oldDisplay);
		};
		
		
		/* After Slide Animation
		----------------------------*/
		base.afterAnimation = function(){
			
			// If hybrid mode is on swap back to higher image quality
			if (base.options.performance == 1){
		    	base.$el.removeClass('speed').addClass('quality');
			}
			
			// Update previous slide
			if (vars.update_images){
				vars.current_slide - 1 < 0  ? setPrev = base.options.slides.length - 1 : setPrev = vars.current_slide-1;
				vars.update_images = false;
				$('.prevslide').removeClass('prevslide');
				$(base.el+' li:eq('+setPrev+')').addClass('prevslide');
			}
			
			vars.in_animation = false;
			
			// Resume slideshow
			if (!vars.is_paused && base.options.slideshow){
				vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
				if (base.options.stop_loop && vars.current_slide == base.options.slides.length - 1 ) base.playToggle();
			}
			
			// Call theme function for after slide transition
			if (typeof theme != 'undefined' && typeof theme.afterAnimation == "function" ) theme.afterAnimation();
			
			return false;
		
		};
		
		base.getField = function(field){
			return base.options.slides[vars.current_slide][field];
		};
		
        // Make it go!
        base.init();
	};
	
	
	/* Global Variables
	----------------------------*/
	$.supersized.vars = {
	
		// Elements							
		thumb_tray			:	'#thumb-tray',	// Thumbnail tray
		thumb_list			:	'#thumb-list',	// Thumbnail list
		slide_list          :   '#slide-list',	// Slide link list
		
		// Internal variables
		current_slide			:	0,			// Current slide number
		in_animation 			:	false,		// Prevents animations from stacking
		is_paused 				: 	false,		// Tracks paused on/off
		hover_pause				:	false,		// If slideshow is paused from hover
		slideshow_interval		:	false,		// Stores slideshow timer					
		update_images 			: 	false,		// Trigger to update images after slide jump
		options					:	{}			// Stores assembled options list
		
	};
	
	
	/* Default Options
	----------------------------*/
	$.supersized.defaultOptions = {
    
    	// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Stops slideshow on last slide
		random					: 	0,			// Randomize slide order (Ignores start slide)
		slide_interval          :   5000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	750,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   1,			// Keyboard navigation on/off
		performance				:	2,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed //  (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_landscape			:   0,			// Landscape images will not exceed browser width
		fit_portrait         	:   0,			// Portrait images will not exceed browser height  			   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		horizontal_center       :   1,			// Horizontally center background
		vertical_center         :   1,			// Vertically center background
		
												   
		// Components							
		slide_links				:	'num',			// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	0,			// Individual thumb links for each slide
		thumbnail_navigation    :   0			// Thumbnail navigation
    	
    };
    
    $.fn.supersized = function(options){
        return this.each(function(){
            (new $.supersized(options));
        });
    };
		
})(jQuery);

/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Theme 	: Shutter 1.1
	
	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

*/
/*

	Supersized - Fullscreen Slideshow jQuery Plugin
	Version : 3.2.7
	Theme 	: Shutter 1.1
	
	Site	: www.buildinternet.com/project/supersized
	Author	: Sam Dunn
	Company : One Mighty Roar (www.onemightyroar.com)
	License : MIT License / GPL License

*/

var firstInit = true;

(function($){
	
	theme = {
	 	
	 	
	 	/* Initial Placement
		----------------------------*/
	 	_init : function(){

			$('#supersizedControls').css('zIndex', 99999);
			$('.slideProjects').children('a').delay(500).fadeTo(300, 1);
			$('.page-template-template-gallery-php .galleryContent').delay(650).fadeTo(300, 1, function(){
				$('.minimize').minimize($(this));
			});
			$('.page-template-template-slideshow-php .galleryContent').delay(0).fadeTo(0, 1, function(){
				$('.minimize').minimize($(this));
			});
			$('#slideList').delay(1000).fadeTo(300, 1);

    		if (api.options.autoplay){
    			if (api.options.progress_bar) theme.progressBar();
			}

	 		if(firstInit){

	 		// Center Slide Links
	 		if (api.options.slide_links) $(vars.slide_list).css('margin-left', -$(vars.slide_list).width()/2);
	 		
			// Start progressbar if autoplay enabled
			
			
			/* Thumbnail Tray
			----------------------------*/
			// Hide tray off screen
			$(vars.thumb_tray).animate({bottom : -$(vars.thumb_tray).height()}, 0 );
			
			// Thumbnail Tray Toggle
			$(vars.tray_button).toggle(function(){
				$(vars.thumb_tray).stop().animate({bottom : 0, avoidTransforms : true}, 300 );
				if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", vars.image_path + "button-tray-down.png");
				return false;
			}, function() {
				$(vars.thumb_tray).stop().animate({bottom : -$(vars.thumb_tray).height(), avoidTransforms : true}, 300 );
				if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", vars.image_path + "button-tray-up.png");
				return false;
			});
			
			// Make thumb tray proper size
			$(vars.thumb_list).width($('> li', vars.thumb_list).length * $('> li', vars.thumb_list).outerWidth(true));	//Adjust to true width of thumb markers
			
			// Display total slides
			if ($(vars.slide_total).length){
				$(vars.slide_total).html(api.options.slides.length);
			}
			
			
			/* Thumbnail Tray Navigation
			----------------------------*/	
			if (api.options.thumb_links){
				//Hide thumb arrows if not needed
				if ($(vars.thumb_list).width() <= $(vars.thumb_tray).width()){
					$(vars.thumb_back +','+vars.thumb_forward).fadeOut(0);
				}
				
				// Thumb Intervals
        		vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);
        		vars.thumb_page = 0;
        		
        		// Cycle thumbs forward
        		$(vars.thumb_forward).click(function(){
        			if (vars.thumb_page - vars.thumb_interval <= -$(vars.thumb_list).width()){
        				vars.thumb_page = 0;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
        			}else{
        				vars.thumb_page = vars.thumb_page - vars.thumb_interval;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
        			}
        		});
        		
        		// Cycle thumbs backwards
        		$(vars.thumb_back).click(function(){
        			if (vars.thumb_page + vars.thumb_interval > 0){
        				vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
        				if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
					}else{
        				vars.thumb_page = vars.thumb_page + vars.thumb_interval;
        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
        			}
        		});
				
			}
			
			
			/* Navigation Items
			----------------------------*/
		    $(vars.next_slide).click(function() {
		    	api.nextSlide();
		    });
		    
		    $(vars.prev_slide).click(function() {
		    	api.prevSlide();
		    });
		    
		    	// Full Opacity on Hover
		    	if(jQuery.support.opacity){
			    	$(vars.prev_slide +','+vars.next_slide).mouseover(function() {
					   $(this).stop().animate({opacity:1},100);
					}).mouseout(function(){
					   $(this).stop().animate({opacity:0.6},100);
					});
				}
			
			if (api.options.thumbnail_navigation){
				// Next thumbnail clicked
				$(vars.next_thumb).click(function() {
			    	api.nextSlide();
			    });
			    // Previous thumbnail clicked
			    $(vars.prev_thumb).click(function() {
			    	api.prevSlide();
			    });
			}
			
		    $(vars.play_button).click(function() {
				api.playToggle();	
				return false;					    
		    });
			
			
			/* Thumbnail Mouse Scrub
			----------------------------*/
    		if (api.options.mouse_scrub){
				$(vars.thumb_tray).mousemove(function(e) {
					var containerWidth = $(vars.thumb_tray).width(),
						listWidth = $(vars.thumb_list).width();
					if (listWidth > containerWidth){
						var mousePos = 1,
							diff = e.pageX - mousePos;
						if (diff > 10 || diff < -10) { 
						    mousePos = e.pageX; 
						    newX = (containerWidth - listWidth) * (e.pageX/containerWidth);
						    diff = parseInt(Math.abs(parseInt($(vars.thumb_list).css('left'))-newX )).toFixed(0);
						    $(vars.thumb_list).stop().animate({'left':newX}, {duration:diff*3, easing:'easeOutExpo'});
						}
					}
				});
			}
			
			
			/* Window Resize
			----------------------------*/
			$(window).resize(function(){
				
				// Delay progress bar on resize
				if (api.options.progress_bar && !vars.in_animation){
					if (vars.slideshow_interval) clearInterval(vars.slideshow_interval);
					if (api.options.slides.length - 1 > 0) clearInterval(vars.slideshow_interval);
					
					$(vars.progress_bar).stop().animate({height:0}, 100, 'easeOutQuad' );
					
					if (!vars.progressDelay && api.options.slideshow){
						// Delay slideshow from resuming so Chrome can refocus images
						vars.progressDelay = setTimeout(function() {
								if (!vars.is_paused){
									theme.progressBar();
									vars.slideshow_interval = setInterval(api.nextSlide, api.options.slide_interval);
								}
								vars.progressDelay = false;
						}, 1000);
					}
				}
				
				// Thumb Links
				if (api.options.thumb_links && vars.thumb_tray.length){
					// Update Thumb Interval & Page
					vars.thumb_page = 0;	
					vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);
					
					// Adjust thumbnail markers
					if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()){
						$(vars.thumb_back +','+vars.thumb_forward).fadeIn('fast');
						$(vars.thumb_list).stop().animate({'left':0}, 200);
					}else{
						$(vars.thumb_back +','+vars.thumb_forward).fadeOut('fast');
					}
					
				}
			});	

			firstInit = false;

		}
			
								
	 	},
	 	
	 	
	 	/* Go To Slide
		----------------------------*/
	 	goTo : function(){
	 		if (api.options.progress_bar && !vars.is_paused){
				$(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );
				theme.progressBar();
			}
		},
	 	
	 	/* Play & Pause Toggle
		----------------------------*/
	 	playToggle : function(state){

	 		
	 		if (state =='play'){
	 			// If image, swap to pause
	 			$('#playPause').removeClass('paused');
				if (api.options.progress_bar && !vars.is_paused) theme.progressBar();
	 		}else if (state == 'pause'){
	 			// If image, swap to play
	 			$('#playPause').addClass('paused');
        		if (api.options.progress_bar && vars.is_paused)$(vars.progress_bar).stop().animate({height : 0}, 100, 'easeOutQuad' );
	 		}
	 		
	 	},
	 	
	 	
	 	/* Before Slide Transition
		----------------------------*/
	 	beforeAnimation : function(direction){
		    if (api.options.progress_bar && !vars.is_paused) 
    			$(vars.progress_bar).stop().animate({height: 0}, 200, 'easeOutQuad');
		  	
		  	/* Update Fields
		  	----------------------------*/
		  	// Update slide caption
		   	if ($(vars.slide_caption).length){
		   		(api.getField('title')) ? $(vars.slide_caption).html(api.getField('title')) : $(vars.slide_caption).html('');
		   	}
		    // Update slide number
			if (vars.slide_current.length){
			    $(vars.slide_current).html(vars.current_slide + 1);
			}
		    
		    
		    // Highlight current thumbnail and adjust row position
		    if (api.options.thumb_links){
		    
				$('.current-thumb').removeClass('current-thumb');
				$('li', vars.thumb_list).eq(vars.current_slide).addClass('current-thumb');
				
				// If thumb out of view
				if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()){
					// If next slide direction
					if (direction == 'next'){
						if (vars.current_slide == 0){
							vars.thumb_page = 0;
							$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						} else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left >= vars.thumb_interval){
	        				vars.thumb_page = vars.thumb_page - vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						}
					// If previous slide direction
					}else if(direction == 'prev'){
						if (vars.current_slide == api.options.slides.length - 1){
							vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
							if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
							$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						} else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left < 0){
							if (vars.thumb_page + vars.thumb_interval > 0) return false;
	        				vars.thumb_page = vars.thumb_page + vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						}
					}
				}
				
				
			}
		    
	 	},
	 	
	 	
	 	/* After Slide Transition
		----------------------------*/
	 	afterAnimation : function(){
	 		if (api.options.progress_bar && !vars.is_paused) theme.progressBar();	//  Start progress bar
	 	},
	 	
	 	
	 	/* Progress Bar
		----------------------------*/
		progressBar : function(){
    		$(vars.progress_bar).stop().animate({height: '100%'}, api.options.slide_interval, 'linear');
    	}
	 	
	 
	 };
	 
	 
	 /* Theme Specific Variables
	 ----------------------------*/
	 $.supersized.themeVars = {
	 	
	 	// Internal Variables
		progress_delay		:	false,				// Delay after resize before resuming slideshow
		thumb_page 			: 	false,				// Thumbnail page
		thumb_interval 		: 	false,				// Thumbnail interval
		image_path			:	'img/',				// Default image path
													
		// General Elements							
		play_button			:	'#playPause',		// Play/Pause button
		next_slide			:	'#nextslide',		// Next slide button
		prev_slide			:	'#prevslide',		// Prev slide button
		next_thumb			:	'#nextthumb',		// Next slide thumb button
		prev_thumb			:	'#prevthumb',		// Prev slide thumb button
		
		slide_caption		:	'#slidecaption',	// Slide caption
		slide_current		:	'.slidenumber',		// Current slide number
		slide_total			:	'.totalslides',		// Total Slides
		slide_list			:	'#slideList',		// Slide jump list							
		
		thumb_tray			:	'#thumb-tray',		// Thumbnail tray
		thumb_list			:	'#thumb-list',		// Thumbnail list
		thumb_forward		:	'#thumb-forward',	// Cycles forward through thumbnail list
		thumb_back			:	'#thumb-back',		// Cycles backwards through thumbnail list
		tray_arrow			:	'#tray-arrow',		// Thumbnail tray button arrow
		tray_button			:	'#tray-button',		// Thumbnail tray button
		
		progress_bar		:	'#progressBar'		// Progress bar
	 												
	 };												
	
	 /* Theme Specific Options
	 ----------------------------*/												
	 $.supersized.themeOptions = {					
	 						   
		progress_bar		:	1,		// Timer for each slide											
		mouse_scrub			:	0		// Thumbnails move with mouse
		
	 };
	
	
})(jQuery);

/*
* jQuery Mobile Framework 1.1.0 db342b1f315c282692791aa870455901fdb46a55
* http://jquerymobile.com
*
* Copyright 2011 (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
*/

/*
* Stripped the touch swipe logic from jQuery Mobile and turned it into this plugin
* Copyright 2012 (c) CodingJack - http://codecanyon.net/user/CodingJack
* Dual licensed under the MIT or GPL Version 2 licenses.
*/

/* USAGE

// listen both left and right signals, the String "left" or "right" will be passed as an argument to the callback
* $(element).touchSwipe(callback); 

// second parameter is optional and will invoke "event.stopImmediatePropagation()" 
// use this if you need to prevent other mouse events from firing on the same object when a swipe gesture is detected
* $(element).touchSwipe(callback, true);

// listen for only the left swipe event
* $(element).touchSwipeLeft(callback); 

// listen for only the right swipe event
* $(element).touchSwipeRight(callback); 

// unbind both left and right swipe events
* $(element).unbindSwipe(); 

// unbind only left swipe event
* $(element).unbindSwipeLeft(); 

// unbind only right swipe event
* $(element).unbindSwipeRight();
 

// SPECIAL NOTES 
* all methods return "this" for chaining
* before a plugin event is added, "unbind" is called first to make sure events are never erroneously duplicated
 
*/

(function($) {
  
  var touchStopEvent, touchMoveEvent, touchStartEvent,
  horizontalDistanceThreshold = 30,
  verticalDistanceThreshold = 75, 
  scrollSupressionThreshold = 10, 
  durationThreshold = 1000;
  
  if("ontouchend" in document) {
  
    touchStopEvent = "touchend.cj_swp";
    touchMoveEvent = "touchmove.cj_swp";
    touchStartEvent = "touchstart.cj_swp";
    
  }
  else {
  
    touchStopEvent = "mouseup.cj_swp";
    touchMoveEvent = "mousemove.cj_swp";
    touchStartEvent = "mousedown.cj_swp";
    
  }
  
  $.fn.touchSwipe = function(cb, prevent) {
    
    if(prevent) this.data("stopPropagation", true);
    if(cb) return this.each(swipeBoth, [cb]);
    
  }
  
  $.fn.touchSwipeLeft = function(cb, prevent) {
    
    if(prevent) this.data("stopPropagation", true);
    if(cb) return this.each(swipeLeft , [cb]);
    
  }
  
  $.fn.touchSwipeRight = function(cb, prevent) {
    
    if(prevent) this.data("stopPropagation", true);
    if(cb) return this.each(swipeRight, [cb]);

  }
  
  function swipeBoth(cb) {
    
    $(this).touchSwipeLeft(cb).touchSwipeRight(cb);
    
  }
  
  function swipeLeft(cb) {
    
    var $this = $(this);
    
    if(!$this.data("swipeLeft")) $this.data("swipeLeft", cb);
    
    if(!$this.data("swipeRight")) addSwipe($this);
    
  }
  
  function swipeRight(cb) {
  
    var $this = $(this);
    
    if(!$this.data("swipeRight")) $this.data("swipeRight", cb);
    
    if(!$this.data("swipeLeft")) addSwipe($this);
    
  }
  
  $.fn.unbindSwipeLeft = function() {
    
    this.removeData("swipeLeft");
    
    if(!this.data("swipeRight")) this.unbindSwipe(true);
    
  }
  
  $.fn.unbindSwipeRight = function() {
    
    this.removeData("swipeRight");
    
    if(!this.data("swipeLeft")) this.unbindSwipe(true);
    
  }
  
  $.fn.unbindSwipe = function(changeData) {
    
    if(!changeData) this.removeData("swipeLeft swipeRight stopPropagation");
    
    return this.unbind(touchStartEvent + " " + touchMoveEvent + " " + touchStopEvent);
    
  }
  
  function addSwipe($this) {
    
    $this.unbindSwipe(true).bind(touchStartEvent, touchStart);
    
  }
  
  function touchStart(event) {
    
    var time = new Date().getTime(),
    data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
    $this = $(this).bind(touchMoveEvent, moveHandler).one(touchStopEvent, touchEnded),
    pageX = data.pageX,
    pageY = data.pageY,
    newPageX, 
    newPageY,
    newTime;
    
    if($this.data("stopPropagation")) event.stopImmediatePropagation();
      
    function touchEnded(event) {
      
      $this.unbind(touchMoveEvent);

      if(time && newTime) {
        
        if(newTime - time < durationThreshold && Math.abs(pageX - newPageX) > horizontalDistanceThreshold && Math.abs(pageY - newPageY) < verticalDistanceThreshold) {
          
          if(pageX > newPageX) {
            
            if($this.data("swipeLeft")) $this.data("swipeLeft")("left");
            
          }
          else {
            
            if($this.data("swipeRight")) $this.data("swipeRight")("right");
            
          }
        
        }
        
      }
      
      time = newTime = null;
      
    }
    
    function moveHandler(event) {

      if(time) {

        data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        newTime = new Date().getTime();
        newPageX = data.pageX;
        newPageY = data.pageY;
  
        if(Math.abs(pageX - newPageX) > scrollSupressionThreshold) event.preventDefault();
        
      }
      
    }
    
  }
  
})(jQuery);

// Generated by CoffeeScript 1.3.3

(function($, window, document) {
  "use strict";

  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, MOUSEDOWN, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, defaults, getBrowserScrollbarWidth;
  defaults = {
    paneClass: 'pane',
    sliderClass: 'slider',
    sliderMinHeight: 20,
    contentClass: 'content',
    iOSNativeScrolling: false,
    preventPageScrolling: false,
    disableResize: false
  };
  SCROLLBAR = 'scrollbar';
  SCROLL = 'scroll';
  MOUSEDOWN = 'mousedown';
  MOUSEMOVE = 'mousemove';
  MOUSEWHEEL = 'mousewheel';
  MOUSEUP = 'mouseup';
  RESIZE = 'resize';
  DRAG = 'drag';
  UP = 'up';
  PANEDOWN = 'panedown';
  DOMSCROLL = 'DOMMouseScroll';
  DOWN = 'down';
  WHEEL = 'wheel';
  TOUCHMOVE = 'touchmove';
  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;
  BROWSER_SCROLLBAR_WIDTH = null;
  getBrowserScrollbarWidth = function() {
    var outer, outerStyle, scrollbarWidth;
    outer = document.createElement('div');
    outerStyle = outer.style;
    outerStyle.position = 'absolute';
    outerStyle.width = '100px';
    outerStyle.height = '100px';
    outerStyle.overflow = SCROLL;
    outerStyle.top = '-9999px';
    document.body.appendChild(outer);
    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
    return scrollbarWidth;
  };
  NanoScroll = (function() {

    function NanoScroll(el, options) {
      this.options = options;
      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
      this.el = $(el);
      this.doc = $(document);
      this.win = $(window);
      this.generate();
      this.createEvents();
      this.addEvents();
      this.reset();
    }

    NanoScroll.prototype.preventScrolling = function(e, direction) {
      switch (e.type) {
        case DOMSCROLL:
          if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
            e.preventDefault();
          }
          break;
        case MOUSEWHEEL:
          if (!e.originalEvent) {
            return;
          }
          if (!e.originalEvent.wheelDelta) {
            return;
          }
          if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
            e.preventDefault();
          }
      }
    };

    NanoScroll.prototype.createEvents = function() {
      var _this = this;
      this.events = {
        down: function(e) {
          _this.isBeingDragged = true;
          _this.offsetY = e.clientY - _this.slider.offset().top;
          _this.pane.addClass('active');
          _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
          return false;
        },
        drag: function(e) {
          _this.sliderY = e.clientY - _this.el.offset().top - _this.offsetY;
          _this.scroll();
          return false;
        },
        up: function(e) {
          _this.isBeingDragged = false;
          _this.pane.removeClass('active');
          _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
          return false;
        },
        resize: function(e) {
          _this.reset();
        },
        panedown: function(e) {
          _this.sliderY = e.offsetY - (_this.sliderHeight * 0.5);
          _this.scroll();
          _this.events.down(e);
          return false;
        },
        scroll: function(e) {
          var maxScrollTop, maxSliderTop, scrollTop, sliderTop;
          if (_this.isBeingDragged) {
            return;
          }
          maxScrollTop = _this.content[0].scrollHeight - _this.content[0].clientHeight;
          scrollTop = _this.content[0].scrollTop;
          maxSliderTop = _this.paneHeight - _this.sliderHeight;
          sliderTop = scrollTop * maxSliderTop / maxScrollTop;
          _this.slider.css({
            top: sliderTop
          });
          if (e == null) {
            return;
          }
          if (scrollTop >= maxScrollTop) {
            if (_this.options.preventPageScrolling) {
              _this.preventScrolling(e, DOWN);
            }
            _this.el.trigger('scrollend');
          } else if (scrollTop === 0) {
            if (_this.options.preventPageScrolling) {
              _this.preventScrolling(e, UP);
            }
            _this.el.trigger('scrolltop');
          }
        },
        wheel: function(e) {
          if (e == null) {
            return;
          }
          _this.sliderY += -e.wheelDeltaY || -e.delta;
          _this.scroll();
          return false;
        }
      };
    };

    NanoScroll.prototype.addEvents = function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) {
        this.win.bind(RESIZE, events[RESIZE]);
      }
      this.slider.bind(MOUSEDOWN, events[DOWN]);
      this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind(MOUSEWHEEL, events[WHEEL]).bind(DOMSCROLL, events[WHEEL]);
      this.content.bind(MOUSEWHEEL, events[SCROLL]).bind(DOMSCROLL, events[SCROLL]).bind(TOUCHMOVE, events[SCROLL]);
    };

    NanoScroll.prototype.removeEvents = function() {
      var events;
      events = this.events;
      if (!this.options.disableResize) {
        this.win.unbind(RESIZE, events[RESIZE]);
      }
      this.slider.unbind(MOUSEDOWN, events[DOWN]);
      this.pane.unbind(MOUSEDOWN, events[PANEDOWN]).unbind(MOUSEWHEEL, events[WHEEL]).unbind(DOMSCROLL, events[WHEEL]);
      this.content.unbind(MOUSEWHEEL, events[SCROLL]).unbind(DOMSCROLL, events[SCROLL]).unbind(TOUCHMOVE, events[SCROLL]);
    };

    NanoScroll.prototype.generate = function() {
      var contentClass, cssRule, options, paneClass, sliderClass;
      options = this.options;
      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
      this.el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
      this.content = $(this.el.children("." + contentClass)[0]);
      this.slider = this.el.find("." + sliderClass);
      this.pane = this.el.find("." + paneClass);
      if (BROWSER_SCROLLBAR_WIDTH) {
        cssRule = {
          right: -BROWSER_SCROLLBAR_WIDTH
        };
        this.el.addClass('has-scrollbar');
      }
      if (options.iOSNativeScrolling) {
        if (cssRule == null) {
          cssRule = {};
        }
        cssRule.WebkitOverflowScrolling = 'touch';
      }
      if (cssRule != null) {
        this.content.css(cssRule);
      }
      return this;
    };

    NanoScroll.prototype.elementsExist = function() {
      return this.el.find("." + this.options.paneClass).length;
    };

    NanoScroll.prototype.restore = function() {
      this.stopped = false;
      this.pane.show();
      return this.addEvents();
    };

    NanoScroll.prototype.reset = function() {
      var content, contentHeight, contentStyle, contentStyleOverflowY, maxSliderTop, paneBottom, paneHeight, paneOuterHeight, paneTop, sliderHeight, sliderMinHeight;
      if (!this.elementsExist()) {
        this.generate().stop();
      }
      if (this.stopped) {
        this.restore();
      }
      content = this.content[0];
      contentStyle = content.style;
      contentStyleOverflowY = contentStyle.overflowY;
      if (BROWSER_IS_IE7) {
        this.content.css({
          height: this.content.height()
        });
      }
      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
      paneHeight = this.pane.outerHeight();
      paneTop = parseInt(this.pane.css('top'), 10);
      paneBottom = parseInt(this.pane.css('bottom'), 10);
      paneOuterHeight = paneHeight + paneTop + paneBottom;
      sliderMinHeight = this.options.sliderMinHeight;
      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneOuterHeight);
      sliderHeight = sliderHeight > this.options.sliderMinHeight ? sliderHeight : this.options.sliderMinHeight;
      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
      }
      maxSliderTop = paneOuterHeight - sliderHeight;
      this.contentHeight = contentHeight;
      this.paneHeight = paneHeight;
      this.paneOuterHeight = paneOuterHeight;
      this.sliderHeight = sliderHeight;
      this.maxSliderTop = maxSliderTop;
      this.slider.height(sliderHeight);
      this.events.scroll();
      this.pane.show();
      if (this.paneOuterHeight >= content.scrollHeight && contentStyleOverflowY !== SCROLL) {
        this.pane.hide();
      } else if (this.el.height() === content.scrollHeight && contentStyleOverflowY === SCROLL) {
        this.slider.hide();
      } else {
        this.slider.show();
      }
      return this;
    };

    NanoScroll.prototype.scroll = function() {
      this.sliderY = Math.max(0, this.sliderY);
      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
      this.content.scrollTop((this.paneHeight - this.contentHeight + BROWSER_SCROLLBAR_WIDTH) * this.sliderY / this.maxSliderTop * -1);
      this.slider.css({
        top: this.sliderY
      });
      return this;
    };

    NanoScroll.prototype.scrollBottom = function(offsetY) {
      this.reset();
      this.content.scrollTop(this.contentHeight - this.content.height() - offsetY).trigger(MOUSEWHEEL);
      return this;
    };

    NanoScroll.prototype.scrollTop = function(offsetY) {
      this.reset();
      this.content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
      return this;
    };

    NanoScroll.prototype.scrollTo = function(node) {
      var fraction, new_slider, offset;
      this.reset();
      offset = $(node).offset().top;
      if (offset > this.maxSliderTop) {
        fraction = offset / this.contentHeight;
        new_slider = this.maxSliderTop * fraction;
        this.sliderY = new_slider;
        this.scroll();
      }
      return this;
    };

    NanoScroll.prototype.stop = function() {
      this.stopped = true;
      this.removeEvents();
      this.pane.hide();
      return this;
    };

    return NanoScroll;

  })();
  $.fn.nanoScroller = function(settings) {
    var options, scroll, scrollBottom, scrollTo, scrollTop, stop;
    if (settings != null) {
      scrollBottom = settings.scrollBottom, scrollTop = settings.scrollTop, scrollTo = settings.scrollTo, scroll = settings.scroll, stop = settings.stop;
    }
    options = $.extend({}, defaults, settings);
    this.each(function() {
      var me, scrollbar;
      me = this;
      scrollbar = $.data(me, SCROLLBAR);
      if (!scrollbar) {
        scrollbar = new NanoScroll(me, options);
        $.data(me, SCROLLBAR, scrollbar);
      } else {
        $.extend(scrollbar.options, settings);
      }
      if (scrollBottom) {
        return scrollbar.scrollBottom(scrollBottom);
      }
      if (scrollTop) {
        return scrollbar.scrollTop(scrollTop);
      }
      if (scrollTo) {
        return scrollbar.scrollTo(scrollTo);
      }
      if (scroll === 'bottom') {
        return scrollbar.scrollBottom(0);
      }
      if (scroll === 'top') {
        return scrollbar.scrollTop(0);
      }
      if (scroll instanceof $) {
        return scrollbar.scrollTo(scroll);
      }
      if (stop) {
        return scrollbar.stop();
      }
      return scrollbar.reset();
    });
  };
})(jQuery, window, document);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
		jQuery.fx.step[attr] = function(fx){
			if ( fx.state == 0 ) {
				fx.start = getColor( fx.elem, attr );
				fx.end = getRGB( fx.end );
			}

			fx.elem.style[attr] = "rgb(" + [
				Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
				Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
			].join(",") + ")";
		}
	});

	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/

	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
		var result;

		// Check if we're already dealing with an array of colors
		if ( color && color.constructor == Array && color.length == 3 )
			return color;

		// Look for rgb(num,num,num)
		if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
			return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

		// Look for rgb(num%,num%,num%)
		if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
			return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];

		// Look for #a0b1c2
		if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
			return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];

		// Look for #fff
		if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
			return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];

		// Otherwise, we're most likely dealing with a named color
		return colors[jQuery.trim(color).toLowerCase()];
	}
	
	function getColor(elem, attr) {
		var color;

		do {
			color = jQuery.curCSS(elem, attr);

			// Keep going until we find an element that has color, or we hit the body
			if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") )
				break; 

			attr = "backgroundColor";
		} while ( elem = elem.parentNode );

		return getRGB(color);
	};
	
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/
	
})(jQuery);


/*!
 * hoverFadeC0 v1.1
 * http://www.roslindesign.com
 *
 * Copyright 2011, Alex Urquhart-Taylor
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
  */

(function($) {
	$.fn.hoverFadeColor = function(settings) {
		var config = {
			'color': null,
			'fadeToSpeed': 300,
			'fadeFromSpeed': 300
		};

		if (settings)
			$.extend(config, settings);

		this.each( function() {
			var originalColor = $(this).css("color");
			var hovercolor=config.color;

			$(this).hover( function() {

				hoverElem=this;
				if (hovercolor==null && $.browser.msie && $.browser.version.substr(0,1)<9) {

					setTimeout( function() {
						if(hovercolor==null) {
							hovercolor = $(hoverElem).css("color");
						}

						$(hoverElem).css('color',originalColor);

						$(hoverElem).stop().animate({
							color: hovercolor
						}, config.fadeToSpeed);
					},0);
				} else {
					if(hovercolor==null) {
						hovercolor = $(hoverElem).css("color");
					}

					$(hoverElem).css('color',originalColor);

					$(hoverElem).stop().animate({
						color: hovercolor
					}, config.fadeToSpeed);
				}
			}, function() {

				$(hoverElem).stop().animate({

					color: originalColor
				}, config.fadeFromSpeed);
			});
		});
		return this;
	};
})(jQuery);

(function( $ ){
  var methods = {
    init: function(options) {
      var settings = {
        color: $(this).css("background-color"),
        reach: 20,
        speed: 1000,
        pause: 0,
        glow: true,
        repeat: true,
        onHover: false
      };
      $(this).css({
        "-moz-outline-radius": $(this).css("border-top-left-radius"),
        "-webkit-outline-radius": $(this).css("border-top-left-radius"),
        "outline-radius": $(this).css("border-top-left-radius")
      });

      if (options) {
        $.extend(settings, options);
      }
      settings.color = $("<div style='background:" + settings.color + "'></div>").css("background-color");
      if(settings.repeat !== true && !isNaN(settings.repeat) && settings.repeat > 0) {
        settings.repeat -=1;
      }

      return this.each(function() {
        if(settings.onHover) {
          $(this).bind("mouseover", function () {pulse(settings, this, 0);})
                 .bind("mouseout", function (){$(this).pulsate("destroy");});
        } else {
          pulse(settings, this, 0);
        }
      });
    },
    destroy: function() {
      return this.each(function() {
        clearTimeout(this.timer);
        $(this).css("outline",0);
      });
    }
  };

  var pulse = function(options, el, count) {
    var reach = options.reach,
        count = count>reach ? 0 : count,
        opacity = (reach-count)/reach,
        colorarr = options.color.split(","),
        color = "rgba(" + colorarr[0].split("(")[1] + "," + colorarr[1] + "," + colorarr[2].split(")")[0] + "," + opacity + ")",
        cssObj = {
          "outline": "2px solid " + color
        };
    if(options.glow) {
      cssObj["box-shadow"] = "0px 0px " + parseInt((count/1.5)) + "px " + color;
      if($.browser.webkit) {
        cssObj["outline-offset"] = count + "px";
        cssObj["outline-radius"] = "100 px";
      }
    } else {
      cssObj["outline-offset"] = count + "px";
    }
    $(el).css(cssObj);

    var innerfunc = function () {
      if(count>=reach && !options.repeat) {
        $(el).pulse("destroy");
        return false;
      } else if(count>=reach && options.repeat !== true && !isNaN(options.repeat) && options.repeat > 0) {
        options.repeat = options.repeat-1;
      } else if(options.pause && count>=reach) {
        pause(options, el, count+1);
        return false;
      }
      pulse(options, el, count+1);
    };

    el.timer = setTimeout(innerfunc, options.speed/reach);
  };

  var pause = function (options, el, count) {
    innerfunc = function () {
      pulse(options, el, count);
    };
    setTimeout(innerfunc, options.pause);
  };

  $.fn.pulsate = function( method ) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.pulsate' );
    }

  };
})( jQuery );