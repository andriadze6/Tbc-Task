$(document).ready(function() {
    let selectedDropDown = null;
    let menueClick = false;
    let isDragging =false;
    let offerSlider = {
        sliderName: "offer",
        OSC:0,
        SliderAmount:5,
        transferX:0,
        IndicatortransferX:0,
        displaysliderAmount:3,
        startX:0,
        Dim: [],
    }
    let product = {
        sliderName: "product",
        OSC:0,
        SliderAmount: 4,
        transferX:0,
        IndicatortransferX:0,
        displaysliderAmount:3,
        startX:0,
    }
    let award = {
        sliderName: "award",
        OSC:0,
        SliderAmount:4,
        transferX:0,
        IndicatortransferX:0,
        displaysliderAmount:3,
        startX:0,
    }
    setIndicatorWidth()

    function setIndicatorWidth(){

        offerSlider.IndicatorDiv = offerSlider.SliderAmount - offerSlider.displaysliderAmount + 1;
        award.IndicatorDiv = award.SliderAmount - award.displaysliderAmount + 1;

        let offerIdicatorWidth = 100 / offerSlider.IndicatorDiv
        $("#offer-slider-Idicator").css("width", `${offerIdicatorWidth}%`)

        let awardIdicatorWidth = 100 / award.IndicatorDiv
        $("#award-slider-Idicator").css("width", `${awardIdicatorWidth}%`)
    }
    
    $(".header-Name").on("click", function() {
        if (this != selectedDropDown) {
            // Current Elements
            selectedDropDown = this;
            $(".header-dropDown-wrapper").show()
            let headerElement = $(this).closest(".header-elemnets");
            let Line = $(headerElement).find(".menu-listLine");
            let dropDownMenu = $(headerElement).find(".dropdown-menu");       
            // Hide Elements if element was not click first Time
            if(menueClick){     
                $(".header-dropDown-conteiner").removeClass("show");
                $(".menu-listLine").removeClass("active");
                $(".dropdown-menu").removeClass("show");
            }else{
                $(".header-dropDown-wrapper").show()
            }
            $(Line).addClass("active");
            $(dropDownMenu).addClass("show");
            setTimeout(() => {
                $(".header-dropDown-conteiner").addClass("show");
            }, 700);
            menueClick = true
        } else {
            $(".header-dropDown-wrapper").hide();
            $(".menu-listLine").removeClass("active");
            $(".dropdown-menu").removeClass("show");
            $(".header-dropDown-conteiner").removeClass("show");
            $(".header-dropDown-wrapper").hide()
            selectedDropDown = null;
            menueClick = false
        }
    });

    function nextSlider(event, obj){
        obj.OSC++
        $(`#${obj.sliderName}-slider-prev`).css('color', '#182cc0')
        $(`#${obj.sliderName}-slider-prev`).prop('disabled', false);
        let clickAmount = obj.SliderAmount - obj.displaysliderAmount;
        if(obj.OSC <= clickAmount){
            let divWidth = Number($(`.Slider`).width())
            obj.transferX = obj.transferX + (divWidth + 30)
            let width = $(".Slider-Conteiner").width();
            $(`#${obj.sliderName}-Slider-Conteiner`).css("transform", `translate3d(-${obj.transferX}px, 0px, 0px)`)
            obj.IndicatortransferX = obj.IndicatortransferX + ((width) / obj.IndicatorDiv)
            $(`#${obj.sliderName}-slider-Idicator`).css("transform", `translate3d(${obj.transferX}px, 0px, 0px)`)
            if(obj.OSC == clickAmount){
                $(event).css('color', '#555f62')
                $(event).prop('disabled', true);
            }
        }
    }

    function preSlider(event, obj){
        obj.OSC--
        $(`#${obj.sliderName}-slider-next`).css('color', '#182cc0')
        $(`#${obj.sliderName}-slider-next`).prop('disabled', false);
        if(obj.OSC >= 0){
            let divWidth = Number($(`.Slider`).width())
            obj.transferX = obj.transferX - (divWidth + 30)
            let width = $(".Slider-Conteiner").width();
            $(`#${obj.sliderName}-Slider-Conteiner`).css("transform", `translate3d(-${obj.transferX}px, 0px, 0px)`)
            obj.IndicatortransferX = obj.IndicatortransferX - ((width) / obj.IndicatorDiv)
            $(`#${obj.sliderName}-slider-Idicator`).css("transform", `translate3d(${obj.IndicatortransferX}px, 0px, 0px)`)
            if(obj.OSC == 0){
                $(event).css('color', '#555f62')
                $(event).prop('disabled', true);
            }
        }
    }

    // $('.Slider-Conteiner').on('mousedown', function mouseState(e) {
    //     e.preventDefault();
    //     let id = $(this).attr("id")
    //     $(`#${id}`).css('cursor', 'grabbing');
    //     isDragging = true
    //     setX(this, e)
    //     console.log("hold");
        
    // });
    // $(".Slider-Conteiner").on('mousemove.drag', function(e) {
    //     e.preventDefault();
    //     if(isDragging){
    //         let id = $(this).attr("id")
    //         let [slider] = [...id.split("-")]
    //         let deltaX = 0;
    //         let transferX = 0;
    //         let SliderAmount = 0
    //         switch (slider) {
    //             case ("offer"):
    //                 obj = offerSlider
    //                 deltaX = e.clientX - offerSlider.startX
    //                 transferX = offerSlider.transferX + deltaX
    //                 SliderAmount = offerSlider.SliderAmount;
    //                 break;   
    //             case ("product"):
    //                 obj = product
    //                 deltaX = e.clientX - product.startX
    //                 transferX = product.transferX + deltaX
    //                 SliderAmount = product.SliderAmount
    //                 break;
    //             case ("award"):
    //                 obj = award
    //                 deltaX = e.clientX - award.startX
    //                 transferX = award.transferX + deltaX
    //                 SliderAmount = award.SliderAmount
    //                 break;
    //             default:
    //                 break;
    //         }
    //         $(`#${id}`).css('transform', `translate3d(-${transferX}px, 0px, 0px)`);
    //         // if(deltaX > 0){
    //         //     let divWidth = Number($(`.Slider`).width())
    //         //     let preDim = 0;
    //         //     for (let index = 1; index <= SliderAmount; index++) {
    //         //         let distance = (divWidth + 30)* (index - 1) + divWidth / 2
    //         //         if(transferX > preDim && transferX < distance){
    //         //             let realtransferX = distance - divWidth / 2;
    //         //             $(`#${id}`).css('transform', `translate3d(-${realtransferX}px, 0px, 0px)`);
    //         //             obj.transferX = realtransferX
    //         //             break;
    //         //         }
    //         //         preDim = distance
    //         //     }
                
    //     }   // }
    // })
    // window.addEventListener('mouseup', function() {
    //     isDragging = false;
    //   });
    $('.Slider-Conteiner').on('mouseup', function() {
        if (isDragging) {
            console.log("release");
            isDragging = false;
            $('body').css('cursor', 'default');
            offerSlider.startX = 0;
            product.startX = 0;
            award.startX = 0;

            // Detach the mousemove and mouseup events
            $(document).off('mousemove.drag');
            $(document).off('mouseup.drag');
        }
    });

    // $(".Slider-Conteiner").mousemove(function(e) {
    //     if(isDragging){
    //         let id = $(this).attr("id")
    //         let [slider] = [...id.split("-")]
    //         let deltaX = 0;
    //         let transferX = 0;
    //         let SliderAmount = 0
    //         switch (slider) {
    //             case ("offer"):
    //                 obj = offerSlider
    //                 deltaX = e.clientX - offerSlider.startX
    //                 transferX = offerSlider.transferX + deltaX
    //                 SliderAmount = offerSlider.SliderAmount;
    //                 break;   
    //             case ("product"):
    //                 obj = product
    //                 deltaX = e.clientX - product.startX
    //                 transferX = product.transferX + deltaX
    //                 SliderAmount = product.SliderAmount
    //                 break;
    //             case ("award"):
    //                 obj = award
    //                 deltaX = e.clientX - award.startX
    //                 transferX = award.transferX + deltaX
    //                 SliderAmount = award.SliderAmount
    //                 break;
    //             default:
    //                 break;
    //         }
    //         $(`#${id}`).css('transform', `translate3d(-${transferX}px, 0px, 0px)`);
    //         // if(deltaX > 0){
    //         //     let divWidth = Number($(`.Slider`).width())
    //         //     let preDim = 0;
    //         //     for (let index = 1; index <= SliderAmount; index++) {
    //         //         let distance = (divWidth + 30)* (index - 1) + divWidth / 2
    //         //         if(transferX > preDim && transferX < distance){
    //         //             let realtransferX = distance - divWidth / 2;
    //         //             $(`#${id}`).css('transform', `translate3d(-${realtransferX}px, 0px, 0px)`);
    //         //             obj.transferX = realtransferX
    //         //             break;
    //         //         }
    //         //         preDim = distance
    //         //     }
                
    //         // }
    //     }
    // });


    // function setX(elemnt, event){
    //     let id = $(elemnt).attr("id").split("-")
    //     let [slider] = [...id]
    //     let offSet = $(elemnt).offset().left;
    //     switch (slider) {
    //         case ("offer"):
    //             offerSlider.startX = event.clientX - offSet
    //             break;   
    //         case ("product"):
    //             product.startX = event.clientX - offSet
    //             break;
    //         case ("award"):
    //             award.startX = event.clientX - offSet
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
    $("#offer-slider-next").on("click", function(){
        nextSlider(this,offerSlider)
    })
    $("#offer-slider-prev").on("click", function(){
        preSlider(this,offerSlider)
    })

    $("#product-slider-next").on("click", function(){
        nextSlider(this,product)
    })
    $("#product-slider-prev").on("click", function(){
        preSlider(this,product)
    })

    $("#award-slider-next").on("click", function(){
        nextSlider(this,award)
    })
    $("#award-slider-prev").on("click", function(){
        preSlider(this,award)
    })
    $(".footer_dropdown-arrow").on("click", function(){
        let prDiv = $(this).closest(".mobile-footerC")
        let divToShow = $(prDiv).find(".li-con")
        if(!$(divToShow[0]).hasClass("li-show")){
            $(prDiv).find(".li-con").addClass("li-show")
        }
        else{
            $(prDiv).find(".li-con").removeClass("li-show")
        }
    })
    $("#mobile-menu").on("click", function(e){
        $('html, body').animate({
            scrollTop: $("footer").offset().top
        }, 5000); 
    })
});