/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function getPixel(imgData, index) {
  return imgData.data.subarray(index*4, index*4+4); // Uint8ClampedArray(4) [R,G,B,A]
}

function getPixelXY(imgData, x, y) {
  return getPixel(imgData, y*imgData.width+x);
}

(function($) {
    $.fn.borderManip = function (imgUrl){
        this.each(function() {
            var cvs = document.createElement('canvas');
            var img = new Image();
            img.src = imgUrl;

            var pos = $(this).position();
            cvs.width = $(this).width();
            cvs.height = $(this).height();

            var ctx = cvs.getContext('2d');
            ctx.drawImage(img, pos.left, pos.top, cvs.width, cvs.height, 0, 0, cvs.width, cvs.height);

            var idt = ctx.getImageData(0, 0, cvs.width, cvs.height);
            var sum =0;
            for (var x=0;x<cvs.width;x++){
                for (var y=0;y<cvs.height;y++){
                    var c = getPixelXY(idt, x, y);
                    sum += c[0] + c[1] + c[2];
                }
            }   
            var avg = sum /= cvs.width * cvs.height;
            $(this).removeClass('lightbg');
            if (avg > 382.5){    //765 combined rgb val, 382.5 is the mid val
                //$(this).css('text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;');
                $(this).addClass('lightbg');
            }
            else{
                //$(this).css('text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff !important;');
                $(this).addClass('darkbg');
            }
            $(document).remove('canvas');
        });
    }
})(jQuery);