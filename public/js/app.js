

if(document.querySelector(".flag").innerHTML=="yes"){
    console.log("yes")
        document.querySelector(".real").style.visibility="visible";
        const innerElement = document.querySelector('#inner');
        var currentHeight = parseInt(innerElement.style.height) || 0;
        var newHeight = currentHeight + 127; // Adjust the height increment as needed
        setTimeout(function(){
            
            document.querySelectorAll(".element")[3].classList.add("visible")},700)
            setTimeout(function(){
            
                document.querySelectorAll(".element")[2].classList.add("visible")},800)
            setTimeout(function(){
            
                    document.querySelectorAll(".element")[1].classList.add("visible")},900)
            setTimeout(function(){
            
                        document.querySelectorAll(".element")[0].classList.add("visible")},1000)
        setTimeout(function(){
            document.querySelector(".flash").classList.add("f");
            document.querySelector(".city").classList.add("f");
            innerElement.style.height = newHeight + 'px';
            document.querySelector(".day4").classList.add("visible")},1000)
        setTimeout(function(){
            currentHeight = parseInt(innerElement.style.height) || 0;
            newHeight = currentHeight + 127;
            innerElement.style.height = newHeight + 'px';
            document.querySelector(".day3").classList.add("visible")},2000)
        setTimeout(function(){
            currentHeight = parseInt(innerElement.style.height) || 0;
            newHeight = currentHeight + 135;
            innerElement.style.height = newHeight + 'px';
            document.querySelector(".day2").classList.add("visible")},3000)
        setTimeout(function(){
            // currentHeight = parseInt(innerElement.style.height) || 0;
            // newHeight = currentHeight + 50;
            // innerElement.style.height = newHeight + 'px';
            document.querySelector(".day1").classList.add("visible")},3500)



}