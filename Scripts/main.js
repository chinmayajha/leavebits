/**
 * @author Sanjiv Sutar 
 * @Org Fractalink Design Studio
 * @Date 25th May 2011
 * 
 */

var FI ={};

//globalNav functionality
FI.globalNav = {
	init:function(){
		if(FI.globalNav.checkActive())
		{
			$(".headerWrapper").css({backgroundPosition:"right -167px"})	
		}
		var cSubNav = "";
		var curIndx = 0;
		$(".mainNav > li").hover(function(){
			$(".subNavD").remove()
			$(".navOvrlay").remove();
			if(FI.globalNav.checkActive())
			{
				$(".headerWrapper").css({backgroundPosition:"right -167px"})	
			}else{
				$(".headerWrapper").css({backgroundPosition:"right 0"})
			}
			
			$(".mainNav > li").removeClass("active")
			$(this).addClass("active");
			curIndx = $(".mainNav > li").index(this)
			if(FI.globalNav.checkActive())
			{
				$(".headerWrapper").css({backgroundPosition:"right -167px"})	
			}
			cSubNav = $(this).find(".subNavWrapper").html()
			if(cSubNav != null)
				$("body").append("<div class='subNavD'>"+cSubNav+"</div>")
			var l = $(this).offset().left
			var t = $(".mainNav").offset().top
			//alert($(this).offset().left+$(this).width())
			
			$(".subNavD").css({"left":l,"top":t+36,"width":"auto","zIndex":"999"}).slideDown()
			
			if($(this).offset().left+$(".subNavD").width() > $(".mainNav").offset().left+$(".mainNav").width())
			{
				$(".subNavD .subNavCont > ul").width(($(".subNavD .subNavCont > ul > li").width()*$(".subNavD .subNavCont > ul > li").length)+20)
				$(".subNavD").css({"left":l-(($(".subNavD").width()-$(this).width())+3),"top":t+36,"width":"auto","zIndex":"999"}).slideDown()
			}else{
				$(".subNavD").css({"left":l,"top":t+36,"width":"auto","zIndex":"999"}).slideDown()
			}
			
			$(".navOvrlay").remove()
		},function(){
			/*$(".navOvrlay").remove();
			$(".mainNav > li").removeClass("active")
			if(FI.globalNav.checkActive())
			{
				$(".headerWrapper").css({backgroundPosition:"right -197px"})	
			}else{
				$(".headerWrapper").css({backgroundPosition:"right 0"})
			}
			$(this).append(cSubNav)
			$(".subNavWrapper").removeClass("bd")
			$(".subNavWrapper").hide()*/
			if($(".subNavWrapper",this).length != 0)
			{
				$(".subNavD").mouseleave(function(){
					$(".navOvrlay").remove();
					$(".mainNav > li").removeClass("active")
					if(FI.globalNav.checkActive())
					{
						$(".headerWrapper").css({backgroundPosition:"right -167px"})	
					}else{
						$(".headerWrapper").css({backgroundPosition:"right 0"})
					}
					//$(".mainNav > li").eq(curIndx).append(cSubNav)
					//$(".subNavWrapper").removeClass("bd")
					$(".subNavD").remove()
				})				
			}else{
				$(".navOvrlay").remove();
					$(".mainNav > li").removeClass("active")
					if(FI.globalNav.checkActive())
					{
						$(".headerWrapper").css({backgroundPosition:"right -167px"})	
					}else{
						$(".headerWrapper").css({backgroundPosition:"right 0"})
					}
					//$(".mainNav > li").eq(curIndx).append(cSubNav)
					//$(".subNavWrapper").removeClass("bd")
					$(".subNavD").remove()
			}
			$(".logoWrapper, .bannerCarouselWrapper").hover(function(){
				$(".navOvrlay").remove();
					$(".mainNav > li").removeClass("active")
					if(FI.globalNav.checkActive())
					{
						$(".headerWrapper").css({backgroundPosition:"right -197px"})	
					}else{
						$(".headerWrapper").css({backgroundPosition:"right 0"})
					}
					//$(".mainNav > li").eq(curIndx).append(cSubNav)
					//$(".subNavWrapper").removeClass("bd")
					$(".subNavD").remove()
			})
		})
		
	},
	checkActive:function(){
		var act = false;
		$(".mainNav > li").each(function(e){
			if($(this).hasClass("active"))
			{
				act = true;		
			}
		})
		return act;
	}
}

//carousel functionality

FI.customCarousel = {
	initVar:{
		dt:"",
		mskWidth:626,
		mskHeight:327,
		timer:"",
		ato:true,
		currIndx:0
	},
	init:function(){
		FI.customCarousel.createStructure(".carouselData")
	},
	createStructure:function(dt){
		$(".bannerMsg").remove()
		FI.customCarousel.initVar.dt = dt;
		$(".carousel").append("<div class='msk'></div>")
		$(".carousel .msk").append("<ul></ul>")
		$(".carousel").append("<ul class='carouselLedg'></ul>")
		//jQuery.metadata.setType("class");
		$(".msk").width(FI.customCarousel.initVar.mskWidth).height(FI.customCarousel.initVar.mskHeight)
		$(".msk ul").height((FI.customCarousel.initVar.mskHeight)*$(dt).find("li").length)
		
		$(dt).find("> li").each(function(e){
			
			var data = $(this).find(".desc").metadata();
			$(".msk ul").append("<li><a href='javascript:void(0)' class='qts'>read more</a></li>")
			$(".carouselLedg").append('<li>'+
					'<h3 class="title">'+$(this).find(".title").text()+'</h3>'+
					'<ul class="timePlace">'+$(this).find(".timePlace").html()+'</ul>'+
					'<p class="desc {pth:'+"'"+data.pth+"'"+'}">'+$(this).find(".desc").text()+'</p>'+
					'<div class="hiddenCont">'+$(this).find(".hiddenCont").html()+'</div>'+
				'</li>'
			)
		})
		//$(".msk ul li").eq(0).attr("style","background:url("+$(".desc").eq(0).metadata().pth+") no-repeat 6px 6px")
		$(".msk ul li").each(function(e){
			$(this).attr("style","background:url("+$(".desc").eq(e).metadata().pth+") no-repeat 6px 6px")
		})
		$(".carouselLedg li").eq(0).addClass("sel")
		$(".carouselLedg > li:last").addClass("lst")
		$(".carouselLedg li").css("cursor","pointer")
		$(dt).remove()
		//$(".prevBtn").css("opacity",".5")
		$(".carouselLedg > li").click(function(){
			var indx = $(".carouselLedg > li").index(this);
			$(".carouselLedg li").removeClass("sel")
			$(this).addClass("sel")
			FI.customCarousel.initVar.ato = false;
			clearTimeout(FI.customCarousel.initVar.timer)
			FI.customCarousel.animate(indx)
		})
		$(".msk ul li").hide()
		$(".msk ul li").eq(0).css("zIndex","7")
		setTimeout(function(){
			$(".msk ul li").eq(0).show()
		},3000)
		setTimeout(function(){
			FI.customCarousel.animate(1)
		},6000)
		
		/*$(".nextBtn").click(function(){
			indx = (FI.customCarousel.initVar.currIndx < $(".msk ul li").length-1)? FI.customCarousel.initVar.currIndx+1:$(".msk ul li").length-1
			FI.customCarousel.animate(indx)
			$(".carouselLedg li").removeClass("sel")
			$(".carouselLedg li").eq(indx).addClass("sel")
		})
		$(".prevBtn").click(function(){
			indx = (FI.customCarousel.initVar.currIndx > 0)? FI.customCarousel.initVar.currIndx-1:0
			FI.customCarousel.animate(indx)
			$(".carouselLedg li").removeClass("sel")
			$(".carouselLedg li").eq(indx).addClass("sel")
		})*/
		$(".msk ul .qts").click(function(){
			var indx = $(".msk ul .qts").index(this)
			$(this).colorbox({width:"650px", height:"400px", inline:true, href:"#nws"+indx});
		})
	},
	animate:function(indx){
		var pos = indx * (FI.customCarousel.initVar.mskHeight)
		$(".msk ul").css({"position":"relative"})
		/*$(".msk ul").animate({
			top:-pos
		},500)*/
		$(".msk ul li").each(function(e){
			$(this).css("z-index",$(".msk ul li").length-e)
		})
		
		
		
		
		//alert($(".desc").eq(0).metadata().pth)
		$(".msk ul li.preSlide").css({"zIndex":"6"})
		$(".msk ul li").eq(indx).attr("style","background:url("+$(".desc").eq(indx).metadata().pth+") no-repeat 6px 6px")
		$(".msk ul li").css("display","block")
		$(".msk ul li").eq(indx).css({display:"none","zIndex":"7"})
		$(".msk ul li").removeClass("preSlide")
		$(".msk ul li").eq(indx).fadeIn(1000,function(){
			$(this).addClass("preSlide")
		})
		
		if(FI.customCarousel.initVar.ato)
		{
			$(".carouselLedg > li").removeClass("sel")
			$(".carouselLedg > li").eq(indx).addClass("sel")
			indx = (indx < 3)? indx+1:0;	
		}
		
		FI.customCarousel.initVar.currIndx = indx
		if(FI.customCarousel.initVar.ato)	
		FI.customCarousel.initVar.timer = setTimeout(function(){FI.customCarousel.animate(FI.customCarousel.initVar.currIndx)},5000)
	}
}

//small Carousel
FI.sCarousel = {
    initVar: {
        currIndx: 0,
        mskWidth: 0
    },
    init: function (obj) {
        $(obj).each(function () {
            $(this).append("<div class='msk'></div><div class='cntrl'><a href='javascript:void(0)' class='prevBtn'></a><a href='javascript:void(0)' class='nextBtn'></a></div>")
            var msk = $(this).find(".msk")
            var cObj = this
            $(msk).append($(this).find(".cData"))
            $(msk).find(".cData li").width($(msk).find(".cData li").find(".imgFrame").width() + 2).css("float", "left");
            $(msk).find(".cData").width(($(msk).find(".cData li").width() * $(msk).find(".cData li").length)+1)
            $(msk).width($(msk).find(".cData li").width()).css({ "overflow": "hidden", "position": "relative" })
            FI.sCarousel.initVar.mskWidth = $(msk).width()
            $(this).find(".cntrl").append("<ul class='lgnd'></ul>")
            for (var i = 0; i < $(msk).find(".cData li").length; i++) {
                $(this).find(".cntrl ul").append("<li></li>")
            }
            $(this).find(".cntrl .lgnd").css({
                "left": ($(this).find(".cntrl").width() - $(this).find(".cntrl .lgnd").width())/2
            })
            $(this).find(".cntrl ul li").eq(0).addClass("active")
            $(this).find(".cntrl .prevBtn").css("opacity", ".5")
            $(this).find(".cntrl .nextBtn").click(function () {
                indx = (FI.sCarousel.initVar.currIndx < $(msk).find(".cData li").length - 1) ? FI.sCarousel.initVar.currIndx + 1 : $(msk).find(".cData li").length - 1;
                FI.sCarousel.animateCarousel(cObj, indx)
            })
            $(this).find(".cntrl .prevBtn").click(function () {
                indx = (FI.sCarousel.initVar.currIndx > 0) ? FI.sCarousel.initVar.currIndx - 1 : 0
                FI.sCarousel.animateCarousel(cObj, indx)
            })

        })
    },
    animateCarousel: function (obj, indx) {
        var pos = indx * (FI.sCarousel.initVar.mskWidth)
        $(obj).find(".msk ul").css({ "position": "relative" })
        $(obj).find(".msk ul").animate({
            left: -pos
        }, 500)
        //alert($(".desc").eq(0).metadata().pth)
        $(obj).find(".cntrl ul li").removeClass("active")
        $(obj).find(".cntrl ul li").eq(indx).addClass("active")
        //$(".msk ul li").eq(indx).attr("style","background:url("+$(".desc").eq(indx).metadata().pth+") no-repeat 7px 7px")

        if (indx > 0) {
            $(obj).find(".cntrl .prevBtn").css("opacity", "1")
        } else {
            $(obj).find(".cntrl .prevBtn").css("opacity", ".5")
        }
        if (indx < $(".msk .cData li").length - 1) {
            $(obj).find(".cntrl .nextBtn").css("opacity", "1")
        } else {
            $(obj).find(".cntrl .nextBtn").css("opacity", ".5")
        }

        FI.sCarousel.initVar.currIndx = indx
    }
}

//news list functionality
FI.newsScroller = {
	initVar:{
		currIndx:0,
		currentObj:"",
		timer:""
	},
	init:function(obj){
		$(obj).height(65)

		FI.newsScroller.initVar.currentObj = obj
		$(obj).find(".newsList").wrap("<div class='mask'></div>")
		$(obj).append("<div class='navCtrl'><a href='javascript:void(0)' class='prevBtn'></a><div class='navLedg'>1 of 10</div><a  href='javascript:void(0)' class='nextBtn'></a></div>")
		$(obj).find(".newsList li").width($(obj).find(".mask").width())
		//$(obj).find(".newsList").width($(obj).find(".mask").width()*$(obj).find(".newsList li").length)
		FI.newsScroller.animateNews(0)
		$(".navCtrl .nextBtn").click(function(){
			clearTimeout(FI.newsScroller.initVar.timer)
			FI.newsScroller.animateNews(FI.newsScroller.initVar.currIndx)
		})
		$(".navCtrl .prevBtn").click(function(){
			clearTimeout(FI.newsScroller.initVar.timer)
			if(FI.newsScroller.initVar.currIndx>1)
			FI.newsScroller.initVar.currIndx-=2
			FI.newsScroller.animateNews(FI.newsScroller.initVar.currIndx)
		})
		$(".newsList li a").click(function(){
			var indx = $(".newsList a").index(this)
			$(this).colorbox({width:"650px", height:"400px", inline:true, href:"#cont"+indx});
		})
	},
	animateNews:function(indx){
		//var pos = indx * ($(FI.newsScroller.initVar.currentObj).find(".mask").width())
		$(FI.newsScroller.initVar.currentObj).find(".newsList li").fadeOut()
		$(FI.newsScroller.initVar.currentObj).find(".newsList li").eq(indx).fadeIn()
		if(indx > 0)
			{
				$(".navCtrl .prevBtn").css("opacity","1")
			}else{
				$(".navCtrl .prevBtn").css("opacity",".5")
			}
			if(indx < $(FI.newsScroller.initVar.currentObj).find(".newsList li").length-1)
			{
				$(".navCtrl .nextBtn").css("opacity","1")
			}else{
				$(".navCtrl .nextBtn").css("opacity",".5")
			}
		$(".navCtrl .navLedg").text(parseInt(indx)+1+" of "+$(FI.newsScroller.initVar.currentObj).find(".newsList li").length)
		indx = (indx < $(FI.newsScroller.initVar.currentObj).find(".newsList li").length-1)? parseInt(indx)+1 : 0;
		FI.newsScroller.initVar.currIndx = indx;
		FI.newsScroller.initVar.timer = setTimeout(function(){FI.newsScroller.animateNews(FI.newsScroller.initVar.currIndx)},3000)
		
	}
}

//course finder show hide
FI.courseFinder = {
	init:function(obj){
		$(obj).find(".frmCtrls").hide();
		$(obj).find("h2").click(function(){
			if($(this).hasClass("on"))
			{
				$(this).removeClass("on");
				$(obj).find(".frmCtrls").slideUp()
			}else{
				$(this).addClass("on");
				$(obj).find(".frmCtrls").slideDown()
			}
		})
	}
}


//default js styling
FI.defaultStyling = {
    init: function () {
        $(".contentFix h2, h1").each(function (e) {
            if ($(this).find("a").length != 0) {
                var txt = $(this).find("a").text()
                var ind = $(this).find("a").text().indexOf(" ", 0);
                if (ind != -1) {
                    $(this).find("a").html("<span>" + txt.slice(0, ind) + "</span> " + txt.slice(ind))
                } else {
                    $(this).find("a").html("<span>" + txt + "</span> ")
                }
            } else {

                var txt = $(this).text()
                 var ind = $(this).text().indexOf(" ", 0);
                if (ind != -1) {
                    $(this).html("<span>" + txt.slice(0, ind) + "</span>" + txt.slice(ind))
                } else {
                    $(this).html("<span>" + txt + "</span>")
                }

            }


        })
        $(".threeCol img, .oneCol img, .twoCol img").each(function () {
            //var obj = this.parent;
            if ($(this).parent().hasClass("bannerCont") == false) {
                if ($(this).parent().get(0).nodeName == "A") {
                    if ($(this).parent().hasClass("logo") != true && $(this).hasClass("vOverlay") != true) {
                        $(this).parent().wrap("<div class='imgFrame'></div>")
                    }

                } else {
                    $(this).wrap("<div class='imgFrame'></div>")
                }
                $(this).parents(".imgFrame").width($(this).width() + 6)
                $(this).parents(".imgFrame").height($(this).height() + 6)
            }

        })
        //show more btn styling
        $(".hModuleWrapper .showMore").addClass("off").attr("href", "javascript:void(0)").wrapInner("<span>")
	
	$(".desc table").addClass("tableGrid").attr({
			'cell-padding': 0,
			'cell-spacing': 0,
			'border': 0,
			'width': '100%'
		});

    }
}
FI.showHideCont = {
 	init:function(){
		var dataBack = [];
		var datapH = []
		var dataH = []
		
		//$(".profileDescription .desc").html();
		$(".hModuleWrapper").each(function(e){
			dataBack[e] = $(".desc", this).html();
			dataH[e] = $(".desc", this).height();
			$(this).find(".desc").html(dataBack[e].slice(0,350)+"...</p>")
			//$(this).find(".desc").height($(this).find(".desc").height()).css("overflow","hidden")
			datapH[e] = $(this).find(".desc").height()
		})
		//$(".showMore").remove()
		//$(".hModuleWrapper").append("<a href='javascript:void(0)' class='showMore off'><span>show more</span></a>")
		$(".showMore").addClass("off")
		$(".showMore").click(function(){
			var indx = $(".showMore").index(this)
			if ($(this).hasClass("on")) {
				$(".hModuleWrapper .desc").eq(indx).html(dataBack[indx].slice(0,350)+"...</p>")
				
				$(this).find("span").text("show more")
				$(this).removeClass("on").addClass("off")
			}
			else{
				$(".hModuleWrapper .desc").eq(indx).html(dataBack[indx])
					$(".showMore").eq(indx).find("span").text("show less")
					$(".showMore").eq(indx).addClass("on").removeClass("off")
				
			}
		})

		
	}
 }
//footer link functionality
FI.footerLinkAni={
	init:function(){
		$(".footerFix > ul").height($(".footerFix ul").height())
		$(".footerFix > ul").hide()
		$(".footerFix h2").removeClass("on")
		$(".footerFix h2").click(function(){
			if($(this).hasClass("on")==true)
			{
				$(this).removeClass("on").next().slideUp()
			}else{
				$(this).addClass("on").next().slideDown()
			}
		})
	}
}

FI.acc = {
	init:function(obj){
		$(obj).find(".desc").each(function(){
			$(this).height($(this).height())
		})
		var lc = window.location.href;
		var ix = 0
		if(lc.search("id")!=-1)
		{
			ix = lc.slice(lc.lastIndexOf("=")+1)
		}
		
		$(obj).find(".desc").hide()
		//$(obj).find(".accHead").eq(ix).addClass("on")
		//$(obj).find(".desc").eq(ix).slideDown(500)
		$(obj).find(".accHead").click(function(){
			var indx = $(obj).find(".accHead").index(this);
			
			if($(this).hasClass("on")){
				$(obj).find(".accHead").eq(indx).removeClass("on");
				$(obj).find(".desc").eq(indx).slideUp();
			}
			else{
				$(obj).find(".desc").slideUp()
				$(obj).find(".accHead").removeClass("on")
				$(obj).find(".accHead").eq(indx).addClass("on")
				$(obj).find(".desc").eq(indx).slideDown(500)
			}
			
		})
	}
}

FI.tableAlter = {
	init:function(obj){
		$(obj).each(function(){
			$(this).find("tr:odd").addClass("odd")
		})
	}
}

function browserDetect() {
    var ua = $.browser;
    var noteElement = document.createElement("div")
    $(noteElement).addClass("note");
    $(noteElement).prependTo(document.body);

    if (ua.msie && ua.version.slice(0, 3) == 6.0) {
        $(".note").html("<div class='browserNote'><div class='browserWrapper'><p>Please note that you are currently running <strong>IE 6.0</strong>. We would request you to kindly upgrade to a <strong>IE 7.0 or above</strong> to view this  site properly. <br/>You can also view this in <strong>Mozila Firefox, Chrome or Safari</strong>.</p><ul><li><a href='#' class='closeNote'>Close this Message</a></li><li class='last'><a href='http://windows.microsoft.com/en-IN/internet-explorer/downloads/ie-9/worldwide-languages' target='_blank'>Upgrade to IE 9.0</li></ul></div></div>");
    }
    else {
        return false;
    }

    var closeBtn = $(".closeNote")
    $(closeBtn).click(function () {
        $(".note").remove();
    });
}

function noImage(){
	var horMod = $(".hModuleWrapper");
	//alert("here")
	$(horMod).each(function(){
		var imgEl = $("img", this);
		var heading = $(".desc h2", this);
		if($(imgEl).length===0){
			//alert("here")
			$(heading).css({
				'width':500
			})
		}
	})
}


// dom ready function
$(document).ready(function () {
    browserDetect();
    noImage();
    FI.globalNav.init();
    if ($(".carouselData").length != 0) {
        FI.customCarousel.init();
    }

    FI.defaultStyling.init();
    FI.footerLinkAni.init();

    if ($(".showMore").length != 0) {
        FI.showHideCont.init();
    }
    if ($(".sCarousel").length != 0) {
        FI.sCarousel.init(".sCarousel")
    }
    if ($(".acc").length != 0) {
        FI.acc.init(".acc");
    }

    if ($(".newsListWrapper").length != 0) {
        FI.newsScroller.init(".newsListWrapper")
    }

    if ($(".courseFinderBox").length != 0) {
        FI.courseFinder.init(".courseFinderBox")
    }
    if ($(".galleryColBox").length != 0) {
        $(".galleryColBox").colorbox()

    }
    if ($(".videoLink").length != 0) {
        $(".videoLink").colorbox({ current: "video {current} of {total}", width: 520, height: 450, onComplete: function () {
            if ($(this).hasClass("videoLink")) {
                var videoLink = $(this).attr("href");
                $("#cboxLoadedContent").html("<div id='mediaplayer'></div>");

                jwplayer("mediaplayer").setup({
                    flashplayer: "jwplayer/player.swf",
                    file: videoLink,
                    'width': '470',
                    'height': '320'
                });
            }
        } 
        });
    }
    $(".bannerMsg").remove()

    if ($(".tableGrid").length != 0)
        FI.tableAlter.init(".tableGrid")
})

