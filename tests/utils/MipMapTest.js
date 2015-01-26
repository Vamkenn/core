var BitmapData = require("awayjs-core/lib/base/BitmapData");
var Matrix = require("awayjs-core/lib/geom/Matrix");
var Rectangle = require("awayjs-core/lib/geom/Rectangle");
var URLLoader = require("awayjs-core/lib/net/URLLoader");
var URLLoaderDataFormat = require("awayjs-core/lib/net/URLLoaderDataFormat");
var URLRequest = require("awayjs-core/lib/net/URLRequest");
var Event = require("awayjs-core/lib/events/Event");
var ParserUtils = require("awayjs-core/lib/parsers/ParserUtils");
var TextureUtils = require("awayjs-core/lib/utils/TextureUtils");
var MipMapTest = (function () {
    function MipMapTest() {
        //---------------------------------------
        // Load a PNG
        var _this = this;
        this._rect = new Rectangle();
        this._matrix = new Matrix();
        var mipUrlRequest = new URLRequest('assets/1024x1024.png');
        this.mipLoader = new URLLoader();
        this.mipLoader.dataFormat = URLLoaderDataFormat.BLOB;
        this.mipLoader.load(mipUrlRequest);
        this.mipLoader.addEventListener(Event.COMPLETE, function (event) { return _this.mipImgLoaded(event); });
        document.onmousedown = function (e) { return _this.onMouseDown(e); };
    }
    MipMapTest.prototype.mipImgLoaded = function (event) {
        var _this = this;
        var loader = event.target;
        var image = ParserUtils.blobToImage(loader.data);
        image.onload = function (event) { return _this.onImageLoad(event); };
    };
    MipMapTest.prototype.onImageLoad = function (event) {
        var image = event.target;
        alert('Each click will generate a level of MipMap');
        this.sourceBitmap = new BitmapData(1024, 1024, true, 0xff0000);
        this.sourceBitmap.drawImage(image, this.sourceBitmap.rect, this.sourceBitmap.rect);
        this.sourceBitmap.canvas.style.position = 'absolute';
        this.sourceBitmap.canvas.style.left = '0px';
        this.sourceBitmap.canvas.style.top = '1030px';
        //document.body.appendChild( this.sourceBitmap.canvas );
        this.mipMap = new BitmapData(1024, 1024, true, 0xff0000);
        this.mipMap.canvas.style.position = 'absolute';
        this.mipMap.canvas.style.left = '0px';
        this.mipMap.canvas.style.top = '0px';
        document.body.appendChild(this.mipMap.canvas);
        this._rect.width = this.sourceBitmap.width;
        this._rect.height = this.sourceBitmap.height;
        this.w = this.sourceBitmap.width;
        this.h = this.sourceBitmap.height;
    };
    MipMapTest.prototype.onMouseDown = function (e) {
        this.generateMipMap(this.sourceBitmap, this.mipMap);
    };
    MipMapTest.prototype.generateMipMap = function (source, mipmap, alpha, side) {
        if (mipmap === void 0) { mipmap = null; }
        if (alpha === void 0) { alpha = false; }
        if (side === void 0) { side = -1; }
        var c = this.w;
        var i;
        console['time']('MipMap' + c);
        if ((this.w >= 1) || (this.h >= 1)) {
            if (alpha)
                mipmap.fillRect(this._rect, 0);
            this._matrix.a = this._rect.width / source.width;
            this._matrix.d = this._rect.height / source.height;
            mipmap.width = this.w;
            mipmap.height = this.h;
            mipmap.copyPixels(source, source.rect, new Rectangle(0, 0, this.w, this.h));
            this.w >>= 1;
            this.h >>= 1;
            this._rect.width = this.w > 1 ? this.w : 1;
            this._rect.height = this.h > 1 ? this.h : 1;
        }
        console.log('TextureUtils.isBitmapDataValid: ', TextureUtils.isBitmapDataValid(mipmap));
        console['timeEnd']('MipMap' + c);
    };
    return MipMapTest;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL21pcG1hcHRlc3QudHMiXSwibmFtZXMiOlsiTWlwTWFwVGVzdCIsIk1pcE1hcFRlc3QuY29uc3RydWN0b3IiLCJNaXBNYXBUZXN0Lm1pcEltZ0xvYWRlZCIsIk1pcE1hcFRlc3Qub25JbWFnZUxvYWQiLCJNaXBNYXBUZXN0Lm9uTW91c2VEb3duIiwiTWlwTWFwVGVzdC5nZW5lcmF0ZU1pcE1hcCJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxVQUFVLFdBQWEsaUNBQWlDLENBQUMsQ0FBQztBQUNqRSxJQUFPLE1BQU0sV0FBYyw2QkFBNkIsQ0FBQyxDQUFDO0FBQzFELElBQU8sU0FBUyxXQUFhLGdDQUFnQyxDQUFDLENBQUM7QUFDL0QsSUFBTyxTQUFTLFdBQWEsK0JBQStCLENBQUMsQ0FBQztBQUM5RCxJQUFPLG1CQUFtQixXQUFXLHlDQUF5QyxDQUFDLENBQUM7QUFDaEYsSUFBTyxVQUFVLFdBQWEsZ0NBQWdDLENBQUMsQ0FBQztBQUNoRSxJQUFPLEtBQUssV0FBYyw4QkFBOEIsQ0FBQyxDQUFDO0FBQzFELElBQU8sV0FBVyxXQUFhLHFDQUFxQyxDQUFDLENBQUM7QUFDdEUsSUFBTyxZQUFZLFdBQWEsb0NBQW9DLENBQUMsQ0FBQztBQUV0RSxJQUFNLFVBQVU7SUFXZkEsU0FYS0EsVUFBVUE7UUFhZEMseUNBQXlDQTtRQUN6Q0EsYUFBYUE7UUFkZkEsaUJBZ0dDQTtRQTFGUUEsVUFBS0EsR0FBeUJBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBQzlDQSxZQUFPQSxHQUFvQkEsSUFBSUEsTUFBTUEsRUFBRUEsQ0FBQ0E7UUFTL0NBLElBQUlBLGFBQWFBLEdBQUdBLElBQUlBLFVBQVVBLENBQUVBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7UUFDNURBLElBQUlBLENBQUNBLFNBQVNBLEdBQUlBLElBQUlBLFNBQVNBLEVBQUVBLENBQUNBO1FBQ2xDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxtQkFBbUJBLENBQUNBLElBQUlBLENBQUNBO1FBQ3JEQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFFQSxhQUFhQSxDQUFFQSxDQUFDQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxDQUFFQSxLQUFLQSxDQUFDQSxRQUFRQSxFQUFHQSxVQUFDQSxLQUFXQSxJQUFLQSxPQUFBQSxLQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUF4QkEsQ0FBd0JBLENBQUVBLENBQUNBO1FBRTlGQSxRQUFRQSxDQUFDQSxXQUFXQSxHQUFHQSxVQUFFQSxDQUFDQSxJQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFFQSxDQUFDQSxDQUFFQSxFQUFyQkEsQ0FBcUJBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQUVPRCxpQ0FBWUEsR0FBcEJBLFVBQXFCQSxLQUFXQTtRQUFoQ0UsaUJBS0NBO1FBSEFBLElBQUlBLE1BQU1BLEdBQW9DQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUMzREEsSUFBSUEsS0FBS0EsR0FBc0JBLFdBQVdBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3BFQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxVQUFFQSxLQUFLQSxJQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxXQUFXQSxDQUFFQSxLQUFLQSxDQUFFQSxFQUF6QkEsQ0FBeUJBLENBQUNBO0lBQ3ZEQSxDQUFDQTtJQUVPRixnQ0FBV0EsR0FBbkJBLFVBQXFCQSxLQUFLQTtRQUV6QkcsSUFBSUEsS0FBS0EsR0FBeUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBO1FBQy9EQSxLQUFLQSxDQUFFQSw0Q0FBNENBLENBQUNBLENBQUNBO1FBRXJEQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUEwQkEsSUFBSUEsVUFBVUEsQ0FBRUEsSUFBSUEsRUFBR0EsSUFBSUEsRUFBR0EsSUFBSUEsRUFBR0EsUUFBUUEsQ0FBRUEsQ0FBQ0E7UUFDM0ZBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFNBQVNBLENBQUVBLEtBQUtBLEVBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLEVBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLElBQUlBLENBQUVBLENBQUNBO1FBQ3ZGQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxRQUFRQSxHQUFJQSxVQUFVQSxDQUFDQTtRQUN0REEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsR0FBUUEsS0FBS0EsQ0FBQ0E7UUFDakRBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEdBQVNBLFFBQVFBLENBQUNBO1FBRXBEQSxBQUVBQSx3REFGd0RBO1FBRXhEQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxVQUFVQSxDQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFHQSxRQUFRQSxDQUFFQSxDQUFDQTtRQUM5REEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsR0FBSUEsVUFBVUEsQ0FBQ0E7UUFDaERBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLEdBQVFBLEtBQUtBLENBQUNBO1FBQzNDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxHQUFTQSxLQUFLQSxDQUFDQTtRQUUzQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBRUEsQ0FBQ0E7UUFFaERBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQU1BLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEtBQUtBLENBQUNBO1FBQzlDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFLQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUUvQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLENBQUNBO0lBRW5DQSxDQUFDQTtJQUVPSCxnQ0FBV0EsR0FBbkJBLFVBQXFCQSxDQUFDQTtRQUVyQkksSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBRUEsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBSUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBRUEsQ0FBQ0E7SUFDekRBLENBQUNBO0lBRU1KLG1DQUFjQSxHQUFyQkEsVUFBdUJBLE1BQW1CQSxFQUFHQSxNQUEwQkEsRUFBRUEsS0FBcUJBLEVBQUVBLElBQWdCQTtRQUFuRUssc0JBQTBCQSxHQUExQkEsYUFBMEJBO1FBQUVBLHFCQUFxQkEsR0FBckJBLGFBQXFCQTtRQUFFQSxvQkFBZ0JBLEdBQWhCQSxRQUFlQSxDQUFDQTtRQUUvR0EsSUFBSUEsQ0FBQ0EsR0FBVUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdEJBLElBQUlBLENBQVFBLENBQUNBO1FBRWJBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBRTlCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVyQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQ1RBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBRWhDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNqREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFFbkRBLE1BQU1BLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1lBQ3RCQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0QkEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBRUEsTUFBTUEsRUFBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBR0EsSUFBSUEsU0FBU0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsRUFBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsRUFBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUEsQ0FBRUEsQ0FBQ0E7WUFFckZBLElBQUlBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ2JBLElBQUlBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRWJBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUVBLElBQUlBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUM1Q0EsQ0FBQ0E7UUFFREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsa0NBQWtDQSxFQUFHQSxZQUFZQSxDQUFDQSxpQkFBaUJBLENBQUVBLE1BQU1BLENBQUVBLENBQUNBLENBQUNBO1FBRTVGQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUVsQ0EsQ0FBQ0E7SUFDRkwsaUJBQUNBO0FBQURBLENBaEdBLEFBZ0dDQSxJQUFBIiwiZmlsZSI6InV0aWxzL01pcE1hcFRlc3QuanMiLCJzb3VyY2VSb290IjoiLi90ZXN0cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaXRtYXBEYXRhXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2Jhc2UvQml0bWFwRGF0YVwiKTtcbmltcG9ydCBNYXRyaXhcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiKTtcbmltcG9ydCBSZWN0YW5nbGVcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZ2VvbS9SZWN0YW5nbGVcIik7XG5pbXBvcnQgVVJMTG9hZGVyXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJcIik7XG5pbXBvcnQgVVJMTG9hZGVyRGF0YUZvcm1hdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL25ldC9VUkxMb2FkZXJEYXRhRm9ybWF0XCIpO1xuaW1wb3J0IFVSTFJlcXVlc3RcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvbmV0L1VSTFJlcXVlc3RcIik7XG5pbXBvcnQgRXZlbnRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvRXZlbnRcIik7XG5pbXBvcnQgUGFyc2VyVXRpbHNcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcGFyc2Vycy9QYXJzZXJVdGlsc1wiKTtcbmltcG9ydCBUZXh0dXJlVXRpbHNcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvdXRpbHMvVGV4dHVyZVV0aWxzXCIpO1xuXG5jbGFzcyBNaXBNYXBUZXN0XG57XG5cblx0cHJpdmF0ZSBtaXBMb2FkZXIgICAgICAgOiBVUkxMb2FkZXI7XG5cdHByaXZhdGUgc291cmNlQml0bWFwICAgIDogQml0bWFwRGF0YTtcblx0cHJpdmF0ZSBtaXBNYXAgICAgICAgICAgOiBCaXRtYXBEYXRhO1xuXHRwcml2YXRlIF9yZWN0ICAgICAgICAgICA6IFJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoKTtcblx0cHJpdmF0ZSBfbWF0cml4ICAgICAgICAgOiBNYXRyaXggPSBuZXcgTWF0cml4KCk7XG5cdHByaXZhdGUgdyAgICAgICAgICAgICAgIDogbnVtYmVyO1xuXHRwcml2YXRlIGggICAgICAgICAgICAgICA6IG51bWJlcjtcblxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdC8vIExvYWQgYSBQTkdcblxuXHRcdHZhciBtaXBVcmxSZXF1ZXN0ID0gbmV3IFVSTFJlcXVlc3QoICdhc3NldHMvMTAyNHgxMDI0LnBuZycpO1xuXHRcdHRoaXMubWlwTG9hZGVyICA9IG5ldyBVUkxMb2FkZXIoKTtcblx0XHR0aGlzLm1pcExvYWRlci5kYXRhRm9ybWF0ID0gVVJMTG9hZGVyRGF0YUZvcm1hdC5CTE9CO1xuXHRcdHRoaXMubWlwTG9hZGVyLmxvYWQoIG1pcFVybFJlcXVlc3QgKTtcblx0XHR0aGlzLm1pcExvYWRlci5hZGRFdmVudExpc3RlbmVyKCBFdmVudC5DT01QTEVURSAsIChldmVudDpFdmVudCkgPT4gdGhpcy5taXBJbWdMb2FkZWQoZXZlbnQpICk7XG5cblx0XHRkb2N1bWVudC5vbm1vdXNlZG93biA9ICggZSApID0+IHRoaXMub25Nb3VzZURvd24oIGUgKTtcblx0fVxuXG5cdHByaXZhdGUgbWlwSW1nTG9hZGVkKGV2ZW50OkV2ZW50KVxuXHR7XG5cdFx0dmFyIGxvYWRlciAgOiBVUkxMb2FkZXIgICAgICAgID0gPFVSTExvYWRlciA+IGV2ZW50LnRhcmdldDtcblx0XHR2YXIgaW1hZ2UgOiBIVE1MSW1hZ2VFbGVtZW50ID0gUGFyc2VyVXRpbHMuYmxvYlRvSW1hZ2UobG9hZGVyLmRhdGEpO1xuXHRcdGltYWdlLm9ubG9hZCA9ICggZXZlbnQgKSA9PiB0aGlzLm9uSW1hZ2VMb2FkKCBldmVudCApO1xuXHR9XG5cblx0cHJpdmF0ZSBvbkltYWdlTG9hZCAoZXZlbnQpXG5cdHtcblx0XHR2YXIgaW1hZ2UgOiBIVE1MSW1hZ2VFbGVtZW50ID0gPEhUTUxJbWFnZUVsZW1lbnQ+IGV2ZW50LnRhcmdldDtcblx0XHRhbGVydCggJ0VhY2ggY2xpY2sgd2lsbCBnZW5lcmF0ZSBhIGxldmVsIG9mIE1pcE1hcCcpO1xuXG5cdFx0dGhpcy5zb3VyY2VCaXRtYXAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBCaXRtYXBEYXRhKCAxMDI0ICwgMTAyNCAsIHRydWUgLCAweGZmMDAwMCApO1xuXHRcdHRoaXMuc291cmNlQml0bWFwLmRyYXdJbWFnZSggaW1hZ2UgLCB0aGlzLnNvdXJjZUJpdG1hcC5yZWN0ICwgdGhpcy5zb3VyY2VCaXRtYXAucmVjdCApO1xuXHRcdHRoaXMuc291cmNlQml0bWFwLmNhbnZhcy5zdHlsZS5wb3NpdGlvbiAgPSAnYWJzb2x1dGUnO1xuXHRcdHRoaXMuc291cmNlQml0bWFwLmNhbnZhcy5zdHlsZS5sZWZ0ICAgICAgPSAnMHB4Jztcblx0XHR0aGlzLnNvdXJjZUJpdG1hcC5jYW52YXMuc3R5bGUudG9wICAgICAgID0gJzEwMzBweCc7XG5cblx0XHQvL2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIHRoaXMuc291cmNlQml0bWFwLmNhbnZhcyApO1xuXG5cdFx0dGhpcy5taXBNYXAgPSBuZXcgQml0bWFwRGF0YSggMTAyNCAsIDEwMjQgLCB0cnVlICwgMHhmZjAwMDAgKTtcblx0XHR0aGlzLm1pcE1hcC5jYW52YXMuc3R5bGUucG9zaXRpb24gID0gJ2Fic29sdXRlJztcblx0XHR0aGlzLm1pcE1hcC5jYW52YXMuc3R5bGUubGVmdCAgICAgID0gJzBweCc7XG5cdFx0dGhpcy5taXBNYXAuY2FudmFzLnN0eWxlLnRvcCAgICAgICA9ICcwcHgnO1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCggdGhpcy5taXBNYXAuY2FudmFzICk7XG5cblx0XHR0aGlzLl9yZWN0LndpZHRoICAgID0gdGhpcy5zb3VyY2VCaXRtYXAud2lkdGg7XG5cdFx0dGhpcy5fcmVjdC5oZWlnaHQgICA9IHRoaXMuc291cmNlQml0bWFwLmhlaWdodDtcblxuXHRcdHRoaXMudyA9IHRoaXMuc291cmNlQml0bWFwLndpZHRoO1xuXHRcdHRoaXMuaCA9IHRoaXMuc291cmNlQml0bWFwLmhlaWdodDtcblxuXHR9XG5cblx0cHJpdmF0ZSBvbk1vdXNlRG93biggZSApXG5cdHtcblx0XHR0aGlzLmdlbmVyYXRlTWlwTWFwKCB0aGlzLnNvdXJjZUJpdG1hcCAsICB0aGlzLm1pcE1hcCApO1xuXHR9XG5cdFxuXHRwdWJsaWMgZ2VuZXJhdGVNaXBNYXAoIHNvdXJjZSA6IEJpdG1hcERhdGEgLCBtaXBtYXAgOiBCaXRtYXBEYXRhID0gbnVsbCwgYWxwaGE6Ym9vbGVhbiA9IGZhbHNlLCBzaWRlOm51bWJlciA9IC0xKVxuXHR7XG5cdFx0dmFyIGM6bnVtYmVyID0gdGhpcy53O1xuXHRcdHZhciBpOm51bWJlcjtcblxuXHRcdGNvbnNvbGVbJ3RpbWUnXSgnTWlwTWFwJyArIGMpO1xuXHRcdFxuXHRcdGlmICgodGhpcy53ID49IDEgKSB8fCAodGhpcy5oID49IDEpKSB7XG5cblx0XHRcdGlmIChhbHBoYSlcblx0XHRcdFx0bWlwbWFwLmZpbGxSZWN0KHRoaXMuX3JlY3QsIDApO1xuXG5cdFx0XHR0aGlzLl9tYXRyaXguYSA9IHRoaXMuX3JlY3Qud2lkdGggLyBzb3VyY2Uud2lkdGg7XG5cdFx0XHR0aGlzLl9tYXRyaXguZCA9IHRoaXMuX3JlY3QuaGVpZ2h0IC8gc291cmNlLmhlaWdodDtcblxuXHRcdFx0bWlwbWFwLndpZHRoID0gdGhpcy53O1xuXHRcdFx0bWlwbWFwLmhlaWdodD0gdGhpcy5oO1xuXHRcdFx0bWlwbWFwLmNvcHlQaXhlbHMoIHNvdXJjZSAsIHNvdXJjZS5yZWN0ICwgbmV3IFJlY3RhbmdsZSggMCAsIDAgLCB0aGlzLncgLCB0aGlzLmggKSApO1xuXG5cdFx0XHR0aGlzLncgPj49IDE7XG5cdFx0XHR0aGlzLmggPj49IDE7XG5cblx0XHRcdHRoaXMuX3JlY3Qud2lkdGggPSB0aGlzLncgPiAxPyB0aGlzLncgOiAxO1xuXHRcdFx0dGhpcy5fcmVjdC5oZWlnaHQgPSB0aGlzLmggPiAxPyB0aGlzLmggOiAxO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKCAnVGV4dHVyZVV0aWxzLmlzQml0bWFwRGF0YVZhbGlkOiAnICwgVGV4dHVyZVV0aWxzLmlzQml0bWFwRGF0YVZhbGlkKCBtaXBtYXAgKSk7XG5cblx0XHRjb25zb2xlWyd0aW1lRW5kJ10oJ01pcE1hcCcgKyBjKTtcblxuXHR9XG59Il19