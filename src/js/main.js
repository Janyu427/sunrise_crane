
import $ from "jquery";
import bootstrap from "bootstrap";
import popper from "popper.js";
import {Workbox} from "workbox-window";

(function(){
    let init = () => {
        serviceWorkerHanlder();
        lazyLoadHanlder();
        pwaHanlder();
        gtagHanlder();
        setMenuToggle();
        setCloseNavbar();
        setDownArrow();
        setScrollActive();
        setCopyRightYear();
        setGoTop();
        // setHeaderFade();

        $(window).off("resize");
        $(window).on("resize", function(){
            setCloseNavbar();
        });
    };

    let serviceWorkerHanlder = () => {
        if("serviceWorker" in navigator){
            let workbx = new Workbox("service-worker.js");

            workbx.addEventListener("installed", event => {
                if(event.isUpdate){
                    window.location.reload(true);
                }
            });

            workbx.register();
        }
    };

    let lazyLoadHanlder = () => {
        if("loading" in HTMLImageElement.prototype){
            let images = document.querySelectorAll("img[loading='lazy']");

            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
        else{
            let script = document.createElement("script");

            script.src = "./js/lib/lazysizes.min.js";
            document.body.appendChild(script);
        }
    };

    let pwaHanlder = () => {
        try{
            let installPromptEvent = null;

            let subscribeUserChoice = () => {
                installPromptEvent.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome == "accepted") {
                        gtag("event", "click", {
                            "event_category": "addToHome",
                            "event_label": "add"
                        });
                    }
                    else {
                        gtag("event", "click", {
                            "event_category": "addToHome",
                            "event_label": "cancel"
                        });
                    }
                });
            };

            let addToHomeScreen = () => {
                let pwaPrompt = localStorage.getItem("pwa_prompt");

                if(!pwaPrompt){
                    pwaPrompt = 0;
                }
                else{
                    pwaPrompt = parseInt(pwaPrompt);

                    if(isNaN(pwaPrompt)){
                        pwaPrompt = 0;
                    }
                }

                let now = new Date().getTime();

                if((now - pwaPrompt) >= 48 * 60 * 60 * 1000){
                    installPromptEvent.prompt();
                    subscribeUserChoice();
                    localStorage.setItem("pwa_prompt", now);

                    gtag("event", "popup", {
                        "event_category": "addToHome"
                    });
                }

                removeEventListener("click", addToHomeScreen);
                removeEventListener("beforeinstallprompt", beforeinstallprompt);
            };

            let beforeinstallprompt = (event) => {
                event.preventDefault();

                installPromptEvent = event;

                if(installPromptEvent.prompt){
                    setTimeout(() => {
                        addEventListener("click", addToHomeScreen);
                    }, 3 * 60 * 1000);
                }
            };

            addEventListener("beforeinstallprompt", beforeinstallprompt);
        }
        catch(ex){
            console.error(ex);
        }
    };

    let setHeaderFade = () => {
        let windows = $(window);
        let nav = $(".nav_bar");

        windows.on("scroll", function(){
            if(windows.scrollTop()){
                nav.addClass("black");
            }
            else{
                nav.removeClass("black");
            }
        });
    };

    let setMenuToggle = () => {
        let menuContainer = $(".nav_bar .burger");
        let menu = $(".nav_bar .tag_container");

        menuContainer.off("click");
        menuContainer.on("click", function(){
            menu.toggleClass("showing");
            menuContainer.toggleClass("close_burger");
        });
    };

    let setCloseNavbar = () => {
        let closeSelector = $(".nav_bar .tag_container .item");
        let menuContainer = $(".nav_bar .burger");
        let menu = $(".nav_bar .tag_container");
        let deviceWidth = screen.width;

        if(deviceWidth <= 1024){
            closeSelector.on("click", function(){
                menu.removeClass("showing");
                menuContainer.removeClass("close_burger");
            });
        }
    };

    let setDownArrow = () => {
        let downButton = $("header .down_arrow");

        downButton.on("click", function(){
            let me = $(this);
            let gethref = me.data("href");
            let gethrefSeletor = $(gethref);
            let htmlSelector = $("body, html");

            htmlSelector.animate({
                scrollTop: gethrefSeletor.position().top - 90
            }, 500);

            return false;
        });
    };

    let setScrollActive = () => {
        let documentSeletor = $(document);
        let listItem = $(".tag_container .list .item");
        documentSeletor.on("scroll", setOnScroll);

        listItem.on("click", function(event){
            event.preventDefault();
            documentSeletor.off("scroll");

            listItem.each(function(){
                $(this).removeClass("active");
            });

            $(this).addClass("active");

            let target = this.hash;
            let menu = target;
            let htmlSelector = $("html, body");

            target = $(menu);

            htmlSelector.stop().animate({
                scrollTop: target.offset().top - 50
            }, 700, "swing", function(){
                documentSeletor.on("scroll", setOnScroll);
            });
        });
    };

    let setOnScroll = event => {
        let documentSeletor = $(document);
        let listItem = $(".tag_container .list .item");
        let scrollPos = documentSeletor.scrollTop();

        listItem.each(function(){
            let currLink = $(this);
            let refElement = $(currLink.attr("href"));

            if(refElement.position().top - 55 <= scrollPos && refElement.position().top - 55 + refElement.height() > scrollPos){
                listItem.removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    };

    let setCopyRightYear = () => {
        let yearContainer = $(".copy_right .span_year");
        let getFullYear = new Date().getFullYear();

        yearContainer.html(getFullYear);
    };

    let setGoTop = () => {
        let windows = $(window);
        let gotop = $(".gotop");
        let htmlSelector = $("body, html");

        windows.on("scroll", function(){
            (windows.scrollTop() > 400) ? gotop.fadeIn(400) : gotop.fadeOut(300);

            gotop.off("click");
            gotop.on("click", function(){
                htmlSelector.animate({
                    scrollTop: 0
                });
            });
        });
    };

    let gtagHanlder = () => {
        $(".logo_btn .logo_img").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "logo"
            });
        });

        $(".tag_container .list .item:eq(0)").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "about_us"
            });
        });

        $(".tag_container .list .item:eq(1)").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "profession_service"
            });
        });

        $(".tag_container .list .item:eq(2)").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "project_gallery"
            });
        });

        $(".tag_container .list .item:eq(3)").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "project_performance"
            });
        });

        $(".tag_container .list .item:eq(4)").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "contact_us"
            });
        });

        $(".down_arrow").on("click", function(){
            gtag("event", "click", {
                "event_category": "header",
                "event_label": "down_arrow"
            });
        });

        $(".contact_section .content_container .list .contact_link:eq(0)").on("click", function(){
            gtag("event", "click", {
                "event_category": "contact",
                "event_label": "company_phone"
            });
        });

        $(".contact_section .content_container .list .contact_link:eq(1)").on("click", function(){
            gtag("event", "click", {
                "event_category": "contact",
                "event_label": "telephone"
            });
        });

        $(".contact_section .content_container .list .contact_link:eq(2)").on("click", function(){
            gtag("event", "click", {
                "event_category": "contact",
                "event_label": "fax"
            });
        });

        $(".contact_section .content_container .list .contact_link:eq(3)").on("click", function(){
            gtag("event", "click", {
                "event_category": "contact",
                "event_label": "company_number"
            });
        });

        $(".contact_section .content_container .list .contact_link:eq(4)").on("click", function(){
            gtag("event", "click", {
                "event_category": "contact",
                "event_label": "email"
            });
        });

        $(".contact_section .content_container .list .contact_link:eq(5)").on("click", function(){
            gtag("event", "click", {
                "event_category": "contact",
                "event_label": "address"
            });
        });

        $(".copy_right_section .copy_right .self_link").on("click", function(){
            gtag("event", "click", {
                "event_category": "footer",
                "event_label": "logo_text"
            });
        });

        $(".copy_right_section .copy_right .author").on("click", function(){
            gtag("event", "click", {
                "event_category": "footer",
                "event_label": "author"
            });
        });

        $(".gotop").on("click", function(){
            gtag("event", "click", {
                "event_category": "top",
                "event_label": "go_top"
            });
        });
    };

    init()
})();
