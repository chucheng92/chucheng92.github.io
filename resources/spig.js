/*
*作者木木
*
*http://www.dao-gu.com
*/

// voice begin
var music = new Array("01.mp3","02.mp3","03.mp3","04.mp3","05.mp3","14.mp3","15.mp3","16.mp3","17.mp3","18.mp3","19.mp3","20.mp3","21.mp3","22.mp3","23.mp3","24.mp3","25.mp3","26.mp3","27.mp3","30.mp3","37.mp3","39.mp3","45.mp3","46.mp3","47.mp3","48.mp3","49.mp3","50.mp3","70.mp3","71.mp3","09.mp3");
var petbgm;
//play
function playSound(i){
    petbgm=getCookie("petbgm");
    if (petbgm==1){
        document.getElementById("sound").src ="http://lemonjing.github.io/resources/voice/CHINO_"+ music[i];
    }
    else if (petbgm==""){
        document.getElementById("sound").src ="http://lemonjing.github.io/resources/voice/CHINO_"+ music[i];
    }
}
//get cookie
function getCookie(c_name){
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

//setcookie
function setCookie(c_name,value,expiredays){
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/")
}

//check cookie
function checkCookie(){
petbg=getCookie('petbg')
if (petbg!=null && petbg!=""){
    changebg(petbg);}
}

//change bgm
function changebgm(){
    petbgm=getCookie('petbgm')
    if (petbgm!="null" && petbgm!=""){
        if (petbgm == "0"){
            setCookie('petbgm',"1",365);
        }
        if (petbgm == "1"){
            setCookie('petbgm',"0",365);
        }
    }else{
        setCookie('petbgm',"0",365);
    }
}

//  voice end

//右键菜单
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        if(e.which==3){
            playSound(5);
        showMessage("秘密通道:<br>    <a href="\"http://lemonjing.github.io\"" title="\"首页\"">首页</a>  <a href="\"http://lemonjing.github.io/img\"" title="\"图库\"">图库</a>  <a href="\"http://lemonjing.github.io/comment\"" title="\"留言\"">留言</a> ",10000);
}
});
$("#spig").bind("contextmenu", function(e) {
    return false;
});
});

//鼠标在消息上时
jQuery(document).ready(function ($) {
    $("#message").hover(function () {
       $("#message").fadeTo("100", 1);
     });
});


//鼠标在上方时
jQuery(document).ready(function ($) {
    //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
    $(".mumu").mouseover(function () {
		var res;
       $(".mumu").fadeTo("800", 0.3);
       msgs = ["欧尼酱，", "天气小贴士，", "", "","我隐身了，你看不到我", "呐，知道吗，樱花飘落的速度是每秒五厘米哦", "只要微笑就可以了。", "我会隐身哦！嘿嘿！", "别动手动脚的，把手拿开！", "把手拿开我才出来！", "不要从别人口中认识我，请用真心认识我"];
       //msgs = [weather.c[0],weather.c [2] ,weather.c [5] ,weather.c [7]];
	   var i = Math.floor(Math.random() * msgs.length);
	   
	   if (i==0){
		   res = msgs[i]+weather.c[0];
		   showMessage(res);
	   } else if (i==1){
			res = msgs[i]+weather.c[2];
			showMessage(res);
		 } else if (i==2){
			res = msgs[i]+weather.c[5];
		    showMessage(res);
	       } else if (i==3){
				res = msgs[i]+weather.c[7];
				showMessage(res);
			}	 
	   else {
			showMessage(msgs[i]);
	   }
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});

//开始
jQuery(document).ready(function ($) {
    if (isindex) { //如果是主页
        var now = (new Date()).getHours();
        if (now > 0 && now <= 6)="" {="" showmessage(visitor="" +="" '="" 你是夜猫子呀？还不睡觉，明天起的来么你？',="" 6000);="" playsound(math.ceil(math.random()*(26-21)+21));="" }="" else="" if="" (now=""> 6 && now <= 11)="" {="" showmessage(visitor="" +="" '="" 早上好，早起的鸟儿有虫吃噢！早起的虫儿被鸟吃，你是鸟儿还是虫儿？嘻嘻！',="" 6000);="" playsound(math.round(math.random()));="" }="" else="" if="" (now=""> 11 && now <= 14)="" {="" showmessage(visitor="" +="" '="" 中午了，吃饭了么？不要饿着了，饿死了谁来挺我呀！',="" 6000);="" playsound(2);="" }="" else="" if="" (now=""> 14 && now <= 16)="" {="" showmessage(visitor="" +="" '="" 下午的时光真难熬！还好有你在！',="" 6000);="" playsound(29);="" }="" else="" if="" (now=""> 16 && now <= 160="" 1000="" 20)="" {="" playsound(5);="" showmessage(visitor="" +="" '="" 又不好好看书工作，跑来上网啊0.0',="" 6000);="" }="" else="" 快来逗我玩吧！',="" playsound(math.ceil(math.random()*(26-21)+21));="" showmessage('欢迎'="" visitor="" '来到小の情绪阅读="" title="" ',="" 10000);="" $(".spig").animate({="" top:="" $(".spig").offset().top="" 300,="" left:="" document.body.offsetwidth="" -="" },="" queue:="" false,="" duration:="" });="" window.settimeout(function="" ()="" showmessage("下面播报明日天气<iframe="" name="\"xidie\"" src="\"http://t.xidie.com/skin/2010-0601.html\"frameborder=\“0\”" scrolling="\"no\"" height="\"15px\"" width="\"130px\"" allowtransparency="\"true\"">", 10000);
//    },
//	4000);
});

//鼠标在某些元素上方时
jQuery(document).ready(function ($) {
    $('h2 a').click(function () {//标题被点击时
        showMessage('正在用吃奶的劲加载《<span style="color:#0099cc;">' + $(this).text() + '</span>》请稍候');
    });
    $('h2 a').mouseover(function () {
        showMessage('要看看《<span style="color:#0099cc;">' + $(this).text() + '</span>》这篇文章么？');
    });
    $('#prev-page').mouseover(function(){
        showMessage('要翻到上一页吗?');
    });
    $('#next-page').mouseover(function(){
        showMessage('要翻到下一页吗?');
    });
    $('#index-links li a').mouseover(function () {
        showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛');
    });
    $('.comments').mouseover(function () {
        showMessage('<span style="color:#0099cc;">' + visitor + '</span> 向评论栏出发吧！');
    });
    $('#submit').mouseover(function () {
        showMessage('确认提交了么？');
    });
    $('#s').focus(function () {
        showMessage('输入你想搜索的关键词再按Enter(回车)键就可以搜索啦!');
    });
    $('#go-prev').mouseover(function () {
        showMessage('点它可以后退哦！');
    });
    $('#go-next').mouseover(function () {
        showMessage('点它可以前进哦！');
    });
    $('#refresh').mouseover(function () {
        showMessage('点它可以重新载入此页哦！');
    });
    $('#go-home').mouseover(function () {
        showMessage('点它就可以回到首页啦！');
    });
    $('#addfav').mouseover(function () {
        showMessage('点它可以把此页加入书签哦！');
    });
    $('#nav-two a').mouseover(function () {
        showMessage('嘘，从这里可以进入控制面板的哦！');
    });
    $('.post-category a').mouseover(function () {
        showMessage('点击查看此分类下得所有文章');
    });
    $('.post-heat a').mouseover(function () {
        showMessage('点它可以直接跳到评论列表处.');
    });
    $('#tho-shareto span a').mouseover(function () {
        showMessage('你知道吗?点它可以分享本文到'+$(this).attr('title'));
    });
    $('#switch-to-wap').mouseover(function(){
        showMessage('点击可以切换到手机版博客版面');
    });
});


//无聊讲点什么
jQuery(document).ready(function ($) {

    window.setInterval(function () {
		var res;
        msgs = ["欧尼酱，", "天气小贴士，", "我并不羡慕别人的人生，这就是所谓幸福。", "不要从别人口中认识我，请用真心认识我", "陪我聊天吧！", "一定是红线下的太乱,才不小心把我和你绑在一起了。。。却没系稳~~~ ...","不相信自己的人连努力的价值都没有。","前天是小兔子，昨天是小鹿，今天是你", "在回忆里留下微笑，是为了不让你哭泣...", "生活就像愤怒的小鸟，失败后总有几只猪在笑。", "我并不羡慕别人的人生，这就是所谓幸福。", "低头不是认输, 是要看清自己的路。仰头不是骄傲, 是要看见自己的天空。--科比", "与你生命等价的东西，这个世界上根本没有。", "对不起，风太大....我没有听清楚", "也许我们都没有长大，只是世界变小了。", "呐，知道吗，樱花飘落的速度是每秒五厘米哦~", "Yestoday is history tomorrow is a mystery,but today is a gift.", "好无聊哦，你都不陪我玩！", "…@……!………", "^%#&*!@*(&#)(!)(", "我可爱吧！嘻嘻!~^_^!~~","谁淫荡呀?~谁淫荡?，你淫荡呀!~~你淫荡！~~","从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，讲：“从前有座……”"];
		var i = Math.floor(Math.random() * msgs.length);
		if (i==0){
		   res = msgs[i]+weather.c[0];
		   showMessage(res,10000);
	   } else if (i==1){
			res = msgs[i]+weather.c[2];
			showMessage(res,10000);
		 } else if (i==2){
			res = msgs[i]+weather.c[5];
		    showMessage(res,10000);
	       } else if (i==3){
			res = msgs[i]+weather.c[7];
		    showMessage(res,10000);
	       }	 
	   else {
			showMessage(msgs[i],10000);
	   }
    }, 35000);
});

//无聊动动
jQuery(document).ready(function ($) {
    window.setInterval(function () {
        msgs = ["欧尼酱，陪我玩吧。", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
		var i = Math.floor(Math.random() * msgs.length);
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetheight/2*(1+s[i1])
        },
			{
			    duration: 2000,
			    complete: showMessage(msgs[i])
			});
    }, 45000);
});


//评论资料
jQuery(document).ready(function ($) {
    $("#author").click(function () {
        showMessage("留下你的尊姓大名！");
        $(".spig").animate({
            top: $("#author").offset().top - 70,
            left: $("#author").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
    $("#email").click(function () {
        showMessage("留下你的邮箱，不然就是无头像人士了！");
        $(".spig").animate({
            top: $("#email").offset().top - 70,
            left: $("#email").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
    $("#url").click(function () {

        showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
        $(".spig").animate({
            top: $("#url").offset().top - 70,
            left: $("#url").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
    $("#comment").click(function () {
        showMessage("认真填写哦！不然会被认作垃圾评论的！我的乖乖~");
        $(".spig").animate({
            top: $("#comment").offset().top - 70,
            left: $("#comment").offset().left - 170
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
});

var spig_top = 50;
//滚动条移动
jQuery(document).ready(function ($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate({
            top: $(window).scrollTop() + f +300
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
});

//鼠标点击时
jQuery(document).ready(function ($) {
    var stat_click = 0;
    $(".mumu").click(function () {
        if (!ismove) {
            stat_click++;
            if (stat_click == 1){
                msgs = ["哇…呵呵，想吓我吗？"];
                playSound(17);
                var i = Math.floor(Math.random() * msgs.length);
            } else if (stat_click >=2 && stat_click<=3) {="" msgs="["我要生气了哦"];" playsound(18);="" var="" i="Math.floor(Math.random()" *="" msgs.length);="" }="" else="" if="" (stat_click="">= 4 && stat_click <=7 )="" {="" msgs="["这样的话，只能使用武力了！"];" playsound(20);="" var="" i="Math.floor(Math.random()" *="" msgs.length);="" showmessage(msgs[i]);="" }="" else="" if="" (stat_click=""> 7) {
                msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！OH，My ladygaga"];
                playSound(28);
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            } else {
                playSound(20);
                msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "别摸我，大男人，有什么好摸的！", "惹不起你，我还躲不起你么？", "不要摸我了，我会告诉老婆来打你的！", "干嘛动我呀！小心我咬你！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            }
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetheight/2*(1+s[i1])
            },
			{
			    duration: 500,
			    complete: showMessage(msgs[i])
			});
        } else {
            ismove = false;
        }
    });
});
//显示消息函数 
function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#message").hide().stop();
    jQuery("#message").html(a);
    jQuery("#message").fadeIn();
    jQuery("#message").fadeTo("1", 1);
    jQuery("#message").fadeOut(b);
};

//拖动
var _move = false;
var ismove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
     });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x; 
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if(x >= 0 && x <= wx="" &&="" y=""> 0 && y </=></=7></=3)></=></=></=></=></=>