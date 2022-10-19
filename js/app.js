/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      578: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (
                (e =
                  Object.assign ||
                  function (e) {
                    for (var t, s = 1, i = arguments.length; s < i; s++)
                      for (var n in (t = arguments[s]))
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    return e;
                  }),
                e.apply(this, arguments)
              );
            },
            t = {
              scale: 1,
              zoom: !0,
              actualSize: !0,
              showZoomInOutIcons: !1,
              actualSizeIcons: { zoomIn: "lg-zoom-in", zoomOut: "lg-zoom-out" },
              enableZoomAfter: 300,
              zoomPluginStrings: {
                zoomIn: "Zoom in",
                zoomOut: "Zoom out",
                viewActualSize: "View actual size",
              },
            },
            s = {
              afterAppendSlide: "lgAfterAppendSlide",
              init: "lgInit",
              hasVideo: "lgHasVideo",
              containerResize: "lgContainerResize",
              updateSlides: "lgUpdateSlides",
              afterAppendSubHtml: "lgAfterAppendSubHtml",
              beforeOpen: "lgBeforeOpen",
              afterOpen: "lgAfterOpen",
              slideItemLoad: "lgSlideItemLoad",
              beforeSlide: "lgBeforeSlide",
              afterSlide: "lgAfterSlide",
              posterClick: "lgPosterClick",
              dragStart: "lgDragStart",
              dragMove: "lgDragMove",
              dragEnd: "lgDragEnd",
              beforeNextSlide: "lgBeforeNextSlide",
              beforePrevSlide: "lgBeforePrevSlide",
              beforeClose: "lgBeforeClose",
              afterClose: "lgAfterClose",
              rotateLeft: "lgRotateLeft",
              rotateRight: "lgRotateRight",
              flipHorizontal: "lgFlipHorizontal",
              flipVertical: "lgFlipVertical",
              autoplay: "lgAutoplay",
              autoplayStart: "lgAutoplayStart",
              autoplayStop: "lgAutoplayStop",
            };
          return (function () {
            function i(s, i) {
              return (
                (this.core = s),
                (this.$LG = i),
                (this.settings = e(e({}, t), this.core.settings)),
                this
              );
            }
            return (
              (i.prototype.buildTemplates = function () {
                var e = this.settings.showZoomInOutIcons
                  ? '<button id="' +
                    this.core.getIdName("lg-zoom-in") +
                    '" type="button" aria-label="' +
                    this.settings.zoomPluginStrings.zoomIn +
                    '" class="lg-zoom-in lg-icon"></button><button id="' +
                    this.core.getIdName("lg-zoom-out") +
                    '" type="button" aria-label="' +
                    this.settings.zoomPluginStrings.zoomIn +
                    '" class="lg-zoom-out lg-icon"></button>'
                  : "";
                this.settings.actualSize &&
                  (e +=
                    '<button id="' +
                    this.core.getIdName("lg-actual-size") +
                    '" type="button" aria-label="' +
                    this.settings.zoomPluginStrings.viewActualSize +
                    '" class="' +
                    this.settings.actualSizeIcons.zoomIn +
                    ' lg-icon"></button>'),
                  this.core.outer.addClass("lg-use-transition-for-zoom"),
                  this.core.$toolbar.first().append(e);
              }),
              (i.prototype.enableZoom = function (e) {
                var t = this,
                  s = this.settings.enableZoomAfter + e.detail.delay;
                this.$LG("body").first().hasClass("lg-from-hash") &&
                e.detail.delay
                  ? (s = 0)
                  : this.$LG("body").first().removeClass("lg-from-hash"),
                  (this.zoomableTimeout = setTimeout(function () {
                    t.isImageSlide(t.core.index) &&
                      (t.core
                        .getSlideItem(e.detail.index)
                        .addClass("lg-zoomable"),
                      e.detail.index === t.core.index && t.setZoomEssentials());
                  }, s + 30));
              }),
              (i.prototype.enableZoomOnSlideItemLoad = function () {
                this.core.LGel.on(
                  s.slideItemLoad + ".zoom",
                  this.enableZoom.bind(this)
                );
              }),
              (i.prototype.getDragCords = function (e) {
                return { x: e.pageX, y: e.pageY };
              }),
              (i.prototype.getSwipeCords = function (e) {
                return { x: e.touches[0].pageX, y: e.touches[0].pageY };
              }),
              (i.prototype.getDragAllowedAxises = function (e, t) {
                var s = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first()
                    .get(),
                  i = 0,
                  n = 0,
                  a = s.getBoundingClientRect();
                e
                  ? ((i = s.offsetHeight * e), (n = s.offsetWidth * e))
                  : t
                  ? ((i = a.height + t * a.height), (n = a.width + t * a.width))
                  : ((i = a.height), (n = a.width));
                var r = i > this.containerRect.height;
                return { allowX: n > this.containerRect.width, allowY: r };
              }),
              (i.prototype.setZoomEssentials = function () {
                this.containerRect = this.core.$content
                  .get()
                  .getBoundingClientRect();
              }),
              (i.prototype.zoomImage = function (e, t, s, i) {
                if (!(Math.abs(t) <= 0)) {
                  var n,
                    a,
                    r = this.containerRect.width / 2 + this.containerRect.left,
                    o =
                      this.containerRect.height / 2 +
                      this.containerRect.top +
                      this.scrollTop;
                  1 === e && (this.positionChanged = !1);
                  var l = this.getDragAllowedAxises(0, t),
                    d = l.allowY,
                    c = l.allowX;
                  this.positionChanged &&
                    ((n = this.left / (this.scale - t)),
                    (a = this.top / (this.scale - t)),
                    (this.pageX = r - n),
                    (this.pageY = o - a),
                    (this.positionChanged = !1));
                  var p,
                    u,
                    h = this.getPossibleSwipeDragCords(t),
                    m = r - this.pageX,
                    f = o - this.pageY;
                  if (e - t > 1) {
                    var g = (e - t) / Math.abs(t);
                    (p =
                      (m =
                        (t < 0 ? -m : m) + this.left * (g + (t < 0 ? -1 : 1))) /
                      g),
                      (u =
                        (f =
                          (t < 0 ? -f : f) +
                          this.top * (g + (t < 0 ? -1 : 1))) / g);
                  } else (p = m * (g = (e - t) * t)), (u = f * g);
                  s &&
                    (c
                      ? this.isBeyondPossibleLeft(p, h.minX)
                        ? (p = h.minX)
                        : this.isBeyondPossibleRight(p, h.maxX) && (p = h.maxX)
                      : e > 1 &&
                        (p < h.minX
                          ? (p = h.minX)
                          : p > h.maxX && (p = h.maxX)),
                    d
                      ? this.isBeyondPossibleTop(u, h.minY)
                        ? (u = h.minY)
                        : this.isBeyondPossibleBottom(u, h.maxY) && (u = h.maxY)
                      : e > 1 &&
                        (u < h.minY
                          ? (u = h.minY)
                          : u > h.maxY && (u = h.maxY))),
                    this.setZoomStyles({ x: p, y: u, scale: e }),
                    (this.left = p),
                    (this.top = u),
                    i &&
                      e >= this.getCurrentImageActualSizeScale() &&
                      this.setZoomImageSize();
                }
              }),
              (i.prototype.resetImageTranslate = function (e) {
                if (this.isImageSlide(e)) {
                  var t = this.core.getSlideItem(e).find(".lg-image").first();
                  (this.imageReset = !1),
                    t.removeClass(
                      "reset-transition reset-transition-y reset-transition-x"
                    ),
                    this.core.outer.removeClass("lg-actual-size"),
                    t.css("width", "auto").css("height", "auto"),
                    setTimeout(function () {
                      t.removeClass("no-transition");
                    }, 10);
                }
              }),
              (i.prototype.setZoomImageSize = function () {
                var e = this,
                  t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first();
                setTimeout(function () {
                  t.addClass("no-transition"), (e.imageReset = !0);
                }, 500),
                  setTimeout(function () {
                    var s = e.getDragAllowedAxises(e.scale);
                    t
                      .css("width", t.get().naturalWidth + "px")
                      .css("height", t.get().naturalHeight + "px"),
                      e.core.outer.addClass("lg-actual-size"),
                      s.allowX && s.allowY
                        ? t.addClass("reset-transition")
                        : s.allowX && !s.allowY
                        ? t.addClass("reset-transition-x")
                        : !s.allowX &&
                          s.allowY &&
                          t.addClass("reset-transition-y");
                  }, 550);
              }),
              (i.prototype.setZoomStyles = function (e) {
                var t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-wrap")
                    .first(),
                  s = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first(),
                  i = this.core.outer.find(".lg-current .lg-dummy-img").first();
                (this.scale = e.scale),
                  s.css(
                    "transform",
                    "scale3d(" + e.scale + ", " + e.scale + ", 1)"
                  ),
                  i.css(
                    "transform",
                    "scale3d(" + e.scale + ", " + e.scale + ", 1)"
                  );
                var n = "translate3d(" + e.x + "px, " + e.y + "px, 0)";
                t.css("transform", n);
              }),
              (i.prototype.setActualSize = function (e, t) {
                var s = this,
                  i = this.core.galleryItems[this.core.index];
                this.resetImageTranslate(e),
                  setTimeout(function () {
                    if (
                      i.src &&
                      !s.core.outer.hasClass("lg-first-slide-loading")
                    ) {
                      var e = s.getCurrentImageActualSizeScale(),
                        n = s.scale;
                      s.core.outer.hasClass("lg-zoomed")
                        ? (s.scale = 1)
                        : (s.scale = s.getScale(e)),
                        s.setPageCords(t),
                        s.beginZoom(s.scale),
                        s.zoomImage(s.scale, s.scale - n, !0, !0),
                        setTimeout(function () {
                          s.core.outer
                            .removeClass("lg-grabbing")
                            .addClass("lg-grab");
                        }, 10);
                    }
                  }, 50);
              }),
              (i.prototype.getNaturalWidth = function (e) {
                var t = this.core.getSlideItem(e).find(".lg-image").first(),
                  s = this.core.galleryItems[e].width;
                return s ? parseFloat(s) : t.get().naturalWidth;
              }),
              (i.prototype.getActualSizeScale = function (e, t) {
                return e >= t ? e / t || 2 : 1;
              }),
              (i.prototype.getCurrentImageActualSizeScale = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first()
                    .get().offsetWidth,
                  t = this.getNaturalWidth(this.core.index) || e;
                return this.getActualSizeScale(t, e);
              }),
              (i.prototype.getPageCords = function (e) {
                var t = {};
                if (e)
                  (t.x = e.pageX || e.touches[0].pageX),
                    (t.y = e.pageY || e.touches[0].pageY);
                else {
                  var s = this.core.$content.get().getBoundingClientRect();
                  (t.x = s.width / 2 + s.left),
                    (t.y = s.height / 2 + this.scrollTop + s.top);
                }
                return t;
              }),
              (i.prototype.setPageCords = function (e) {
                var t = this.getPageCords(e);
                (this.pageX = t.x), (this.pageY = t.y);
              }),
              (i.prototype.manageActualPixelClassNames = function () {
                this.core
                  .getElementById("lg-actual-size")
                  .removeClass(this.settings.actualSizeIcons.zoomIn)
                  .addClass(this.settings.actualSizeIcons.zoomOut);
              }),
              (i.prototype.beginZoom = function (e) {
                return (
                  this.core.outer.removeClass(
                    "lg-zoom-drag-transition lg-zoom-dragging"
                  ),
                  e > 1
                    ? (this.core.outer.addClass("lg-zoomed"),
                      this.manageActualPixelClassNames())
                    : this.resetZoom(),
                  e > 1
                );
              }),
              (i.prototype.getScale = function (e) {
                var t = this.getCurrentImageActualSizeScale();
                return e < 1 ? (e = 1) : e > t && (e = t), e;
              }),
              (i.prototype.init = function () {
                var e = this;
                if (this.settings.zoom) {
                  this.buildTemplates(), this.enableZoomOnSlideItemLoad();
                  var t = null;
                  this.core.outer.on("dblclick.lg", function (t) {
                    e.$LG(t.target).hasClass("lg-image") &&
                      e.setActualSize(e.core.index, t);
                  }),
                    this.core.outer.on("touchstart.lg", function (s) {
                      var i = e.$LG(s.target);
                      1 === s.touches.length &&
                        i.hasClass("lg-image") &&
                        (t
                          ? (clearTimeout(t),
                            (t = null),
                            s.preventDefault(),
                            e.setActualSize(e.core.index, s))
                          : (t = setTimeout(function () {
                              t = null;
                            }, 300)));
                    }),
                    this.core.LGel.on(
                      s.containerResize +
                        ".zoom " +
                        s.rotateRight +
                        ".zoom " +
                        s.rotateLeft +
                        ".zoom " +
                        s.flipHorizontal +
                        ".zoom " +
                        s.flipVertical +
                        ".zoom",
                      function () {
                        if (
                          e.core.lgOpened &&
                          e.isImageSlide(e.core.index) &&
                          !e.core.touchAction
                        ) {
                          var t = e.core
                            .getSlideItem(e.core.index)
                            .find(".lg-img-wrap")
                            .first();
                          (e.top = 0),
                            (e.left = 0),
                            e.setZoomEssentials(),
                            e.setZoomSwipeStyles(t, { x: 0, y: 0 }),
                            (e.positionChanged = !0);
                        }
                      }
                    ),
                    this.$LG(window).on(
                      "scroll.lg.zoom.global" + this.core.lgId,
                      function () {
                        e.core.lgOpened &&
                          (e.scrollTop = e.$LG(window).scrollTop());
                      }
                    ),
                    this.core
                      .getElementById("lg-zoom-out")
                      .on("click.lg", function () {
                        if (e.isImageSlide(e.core.index)) {
                          var t = 0;
                          e.imageReset &&
                            (e.resetImageTranslate(e.core.index), (t = 50)),
                            setTimeout(function () {
                              var t = e.scale - e.settings.scale;
                              t < 1 && (t = 1),
                                e.beginZoom(t),
                                e.zoomImage(t, -e.settings.scale, !0, !0);
                            }, t);
                        }
                      }),
                    this.core
                      .getElementById("lg-zoom-in")
                      .on("click.lg", function () {
                        e.zoomIn();
                      }),
                    this.core
                      .getElementById("lg-actual-size")
                      .on("click.lg", function () {
                        e.setActualSize(e.core.index);
                      }),
                    this.core.LGel.on(s.beforeOpen + ".zoom", function () {
                      e.core.outer.find(".lg-item").removeClass("lg-zoomable");
                    }),
                    this.core.LGel.on(s.afterOpen + ".zoom", function () {
                      (e.scrollTop = e.$LG(window).scrollTop()),
                        (e.pageX = e.core.outer.width() / 2),
                        (e.pageY = e.core.outer.height() / 2 + e.scrollTop),
                        (e.scale = 1);
                    }),
                    this.core.LGel.on(s.afterSlide + ".zoom", function (t) {
                      var s = t.detail.prevIndex;
                      (e.scale = 1),
                        (e.positionChanged = !1),
                        e.resetZoom(s),
                        e.resetImageTranslate(s),
                        e.isImageSlide(e.core.index) && e.setZoomEssentials();
                    }),
                    this.zoomDrag(),
                    this.pinchZoom(),
                    this.zoomSwipe(),
                    (this.zoomableTimeout = !1),
                    (this.positionChanged = !1);
                }
              }),
              (i.prototype.zoomIn = function () {
                if (this.isImageSlide(this.core.index)) {
                  var e = this.scale + this.settings.scale;
                  (e = this.getScale(e)),
                    this.beginZoom(e),
                    this.zoomImage(e, this.settings.scale, !0, !0);
                }
              }),
              (i.prototype.resetZoom = function (e) {
                this.core.outer.removeClass(
                  "lg-zoomed lg-zoom-drag-transition"
                );
                var t = this.core.getElementById("lg-actual-size"),
                  s = this.core.getSlideItem(
                    void 0 !== e ? e : this.core.index
                  );
                t
                  .removeClass(this.settings.actualSizeIcons.zoomOut)
                  .addClass(this.settings.actualSizeIcons.zoomIn),
                  s.find(".lg-img-wrap").first().removeAttr("style"),
                  s.find(".lg-image").first().removeAttr("style"),
                  (this.scale = 1),
                  (this.left = 0),
                  (this.top = 0),
                  this.setPageCords();
              }),
              (i.prototype.getTouchDistance = function (e) {
                return Math.sqrt(
                  (e.touches[0].pageX - e.touches[1].pageX) *
                    (e.touches[0].pageX - e.touches[1].pageX) +
                    (e.touches[0].pageY - e.touches[1].pageY) *
                      (e.touches[0].pageY - e.touches[1].pageY)
                );
              }),
              (i.prototype.pinchZoom = function () {
                var e = this,
                  t = 0,
                  s = !1,
                  i = 1,
                  n = 0,
                  a = this.core.getSlideItem(this.core.index);
                this.core.outer.on("touchstart.lg", function (s) {
                  if (
                    ((a = e.core.getSlideItem(e.core.index)),
                    e.isImageSlide(e.core.index) && 2 === s.touches.length)
                  ) {
                    if (
                      (s.preventDefault(),
                      e.core.outer.hasClass("lg-first-slide-loading"))
                    )
                      return;
                    (i = e.scale || 1),
                      e.core.outer.removeClass(
                        "lg-zoom-drag-transition lg-zoom-dragging"
                      ),
                      e.setPageCords(s),
                      e.resetImageTranslate(e.core.index),
                      (e.core.touchAction = "pinch"),
                      (t = e.getTouchDistance(s));
                  }
                }),
                  this.core.$inner.on("touchmove.lg", function (r) {
                    if (
                      2 === r.touches.length &&
                      "pinch" === e.core.touchAction &&
                      (e.$LG(r.target).hasClass("lg-item") ||
                        a.get().contains(r.target))
                    ) {
                      r.preventDefault();
                      var o = e.getTouchDistance(r),
                        l = t - o;
                      if ((!s && Math.abs(l) > 5 && (s = !0), s)) {
                        n = e.scale;
                        var d = Math.max(1, i + 0.02 * -l);
                        e.scale = Math.round(100 * (d + Number.EPSILON)) / 100;
                        var c = e.scale - n;
                        e.zoomImage(
                          e.scale,
                          Math.round(100 * (c + Number.EPSILON)) / 100,
                          !1,
                          !1
                        );
                      }
                    }
                  }),
                  this.core.$inner.on("touchend.lg", function (i) {
                    if (
                      "pinch" === e.core.touchAction &&
                      (e.$LG(i.target).hasClass("lg-item") ||
                        a.get().contains(i.target))
                    ) {
                      if (((s = !1), (t = 0), e.scale <= 1)) e.resetZoom();
                      else {
                        var n = e.getCurrentImageActualSizeScale();
                        if (e.scale >= n) {
                          var r = n - e.scale;
                          0 === r && (r = 0.01), e.zoomImage(n, r, !1, !0);
                        }
                        e.manageActualPixelClassNames(),
                          e.core.outer.addClass("lg-zoomed");
                      }
                      e.core.touchAction = void 0;
                    }
                  });
              }),
              (i.prototype.touchendZoom = function (e, t, s, i, n) {
                var a = t.x - e.x,
                  r = t.y - e.y,
                  o = Math.abs(a) / n + 1,
                  l = Math.abs(r) / n + 1;
                o > 2 && (o += 1), l > 2 && (l += 1), (a *= o), (r *= l);
                var d = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-wrap")
                    .first(),
                  c = {};
                (c.x = this.left + a), (c.y = this.top + r);
                var p = this.getPossibleSwipeDragCords();
                (Math.abs(a) > 15 || Math.abs(r) > 15) &&
                  (i &&
                    (this.isBeyondPossibleTop(c.y, p.minY)
                      ? (c.y = p.minY)
                      : this.isBeyondPossibleBottom(c.y, p.maxY) &&
                        (c.y = p.maxY)),
                  s &&
                    (this.isBeyondPossibleLeft(c.x, p.minX)
                      ? (c.x = p.minX)
                      : this.isBeyondPossibleRight(c.x, p.maxX) &&
                        (c.x = p.maxX)),
                  i ? (this.top = c.y) : (c.y = this.top),
                  s ? (this.left = c.x) : (c.x = this.left),
                  this.setZoomSwipeStyles(d, c),
                  (this.positionChanged = !0));
              }),
              (i.prototype.getZoomSwipeCords = function (e, t, s, i, n) {
                var a = {};
                if (i) {
                  if (
                    ((a.y = this.top + (t.y - e.y)),
                    this.isBeyondPossibleTop(a.y, n.minY))
                  ) {
                    var r = n.minY - a.y;
                    a.y = n.minY - r / 6;
                  } else if (this.isBeyondPossibleBottom(a.y, n.maxY)) {
                    var o = a.y - n.maxY;
                    a.y = n.maxY + o / 6;
                  }
                } else a.y = this.top;
                if (s) {
                  if (
                    ((a.x = this.left + (t.x - e.x)),
                    this.isBeyondPossibleLeft(a.x, n.minX))
                  ) {
                    var l = n.minX - a.x;
                    a.x = n.minX - l / 6;
                  } else if (this.isBeyondPossibleRight(a.x, n.maxX)) {
                    var d = a.x - n.maxX;
                    a.x = n.maxX + d / 6;
                  }
                } else a.x = this.left;
                return a;
              }),
              (i.prototype.isBeyondPossibleLeft = function (e, t) {
                return e >= t;
              }),
              (i.prototype.isBeyondPossibleRight = function (e, t) {
                return e <= t;
              }),
              (i.prototype.isBeyondPossibleTop = function (e, t) {
                return e >= t;
              }),
              (i.prototype.isBeyondPossibleBottom = function (e, t) {
                return e <= t;
              }),
              (i.prototype.isImageSlide = function (e) {
                var t = this.core.galleryItems[e];
                return "image" === this.core.getSlideType(t);
              }),
              (i.prototype.getPossibleSwipeDragCords = function (e) {
                var t = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-image")
                    .first(),
                  s = this.core.mediaContainerPosition.bottom,
                  i = t.get().getBoundingClientRect(),
                  n = i.height,
                  a = i.width;
                return (
                  e && ((n += e * n), (a += e * a)),
                  {
                    minY: (n - this.containerRect.height) / 2,
                    maxY: (this.containerRect.height - n) / 2 + s,
                    minX: (a - this.containerRect.width) / 2,
                    maxX: (this.containerRect.width - a) / 2,
                  }
                );
              }),
              (i.prototype.setZoomSwipeStyles = function (e, t) {
                e.css(
                  "transform",
                  "translate3d(" + t.x + "px, " + t.y + "px, 0)"
                );
              }),
              (i.prototype.zoomSwipe = function () {
                var e,
                  t,
                  s = this,
                  i = {},
                  n = {},
                  a = !1,
                  r = !1,
                  o = !1,
                  l = new Date(),
                  d = (new Date(), this.core.getSlideItem(this.core.index));
                this.core.$inner.on("touchstart.lg", function (n) {
                  if (
                    s.isImageSlide(s.core.index) &&
                    ((d = s.core.getSlideItem(s.core.index)),
                    (s.$LG(n.target).hasClass("lg-item") ||
                      d.get().contains(n.target)) &&
                      1 === n.touches.length &&
                      s.core.outer.hasClass("lg-zoomed"))
                  ) {
                    n.preventDefault(),
                      (l = new Date()),
                      (s.core.touchAction = "zoomSwipe"),
                      (t = s.core
                        .getSlideItem(s.core.index)
                        .find(".lg-img-wrap")
                        .first());
                    var a = s.getDragAllowedAxises(0);
                    (o = a.allowY),
                      ((r = a.allowX) || o) && (i = s.getSwipeCords(n)),
                      (e = s.getPossibleSwipeDragCords()),
                      s.core.outer.addClass(
                        "lg-zoom-dragging lg-zoom-drag-transition"
                      );
                  }
                }),
                  this.core.$inner.on("touchmove.lg", function (l) {
                    if (
                      1 === l.touches.length &&
                      "zoomSwipe" === s.core.touchAction &&
                      (s.$LG(l.target).hasClass("lg-item") ||
                        d.get().contains(l.target))
                    ) {
                      l.preventDefault(),
                        (s.core.touchAction = "zoomSwipe"),
                        (n = s.getSwipeCords(l));
                      var c = s.getZoomSwipeCords(i, n, r, o, e);
                      (Math.abs(n.x - i.x) > 15 || Math.abs(n.y - i.y) > 15) &&
                        ((a = !0), s.setZoomSwipeStyles(t, c));
                    }
                  }),
                  this.core.$inner.on("touchend.lg", function (e) {
                    if (
                      "zoomSwipe" === s.core.touchAction &&
                      (s.$LG(e.target).hasClass("lg-item") ||
                        d.get().contains(e.target))
                    ) {
                      if (
                        (e.preventDefault(),
                        (s.core.touchAction = void 0),
                        s.core.outer.removeClass("lg-zoom-dragging"),
                        !a)
                      )
                        return;
                      a = !1;
                      var t = new Date().valueOf() - l.valueOf();
                      s.touchendZoom(i, n, r, o, t);
                    }
                  });
              }),
              (i.prototype.zoomDrag = function () {
                var e,
                  t,
                  s,
                  i,
                  n = this,
                  a = {},
                  r = {},
                  o = !1,
                  l = !1,
                  d = !1,
                  c = !1;
                this.core.outer.on("mousedown.lg.zoom", function (t) {
                  if (n.isImageSlide(n.core.index)) {
                    var r = n.core.getSlideItem(n.core.index);
                    if (
                      n.$LG(t.target).hasClass("lg-item") ||
                      r.get().contains(t.target)
                    ) {
                      (e = new Date()),
                        (i = n.core
                          .getSlideItem(n.core.index)
                          .find(".lg-img-wrap")
                          .first());
                      var l = n.getDragAllowedAxises(0);
                      (c = l.allowY),
                        (d = l.allowX),
                        n.core.outer.hasClass("lg-zoomed") &&
                          n.$LG(t.target).hasClass("lg-object") &&
                          (d || c) &&
                          (t.preventDefault(),
                          (a = n.getDragCords(t)),
                          (s = n.getPossibleSwipeDragCords()),
                          (o = !0),
                          n.core.outer
                            .removeClass("lg-grab")
                            .addClass(
                              "lg-grabbing lg-zoom-drag-transition lg-zoom-dragging"
                            ));
                    }
                  }
                }),
                  this.$LG(window).on(
                    "mousemove.lg.zoom.global" + this.core.lgId,
                    function (e) {
                      if (o) {
                        (l = !0), (r = n.getDragCords(e));
                        var t = n.getZoomSwipeCords(a, r, d, c, s);
                        n.setZoomSwipeStyles(i, t);
                      }
                    }
                  ),
                  this.$LG(window).on(
                    "mouseup.lg.zoom.global" + this.core.lgId,
                    function (s) {
                      if (o) {
                        if (
                          ((t = new Date()),
                          (o = !1),
                          n.core.outer.removeClass("lg-zoom-dragging"),
                          l && (a.x !== r.x || a.y !== r.y))
                        ) {
                          r = n.getDragCords(s);
                          var i = t.valueOf() - e.valueOf();
                          n.touchendZoom(a, r, d, c, i);
                        }
                        l = !1;
                      }
                      n.core.outer
                        .removeClass("lg-grabbing")
                        .addClass("lg-grab");
                    }
                  );
              }),
              (i.prototype.closeGallery = function () {
                this.resetZoom();
              }),
              (i.prototype.destroy = function () {
                this.$LG(window).off(".lg.zoom.global" + this.core.lgId),
                  this.core.LGel.off(".lg.zoom"),
                  this.core.LGel.off(".zoom"),
                  clearTimeout(this.zoomableTimeout),
                  (this.zoomableTimeout = !1);
              }),
              i
            );
          })();
        })();
      },
    },
    t = {};
  function s(i) {
    var n = t[i];
    if (void 0 !== n) return n.exports;
    var a = (t[i] = { exports: {} });
    return e[i].call(a.exports, a, a.exports, s), a.exports;
  }
  (() => {
    "use strict";
    function e(e) {
      this.type = e;
    }
    (e.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(s[0].trim())),
          (i.breakpoint = s[1] ? s[1].trim() : "767"),
          (i.place = s[2] ? s[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          i = String.prototype.split.call(s, ","),
          n = window.matchMedia(i[0]),
          a = i[1],
          r = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === a;
          });
        n.addListener(function () {
          e.mediaHandler(n, r);
        }),
          this.mediaHandler(n, r);
      }
    }),
      (e.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const s = t[e];
            (s.index = this.indexInParent(s.parent, s.element)),
              this.moveTo(s.place, s.element, s.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const s = t[e];
            s.element.classList.contains(this.daClassname) &&
              this.moveBack(s.parent, s.element, s.index);
          }
      }),
      (e.prototype.moveTo = function (e, t, s) {
        t.classList.add(this.daClassname),
          "last" === e || e >= s.children.length
            ? s.insertAdjacentElement("beforeend", t)
            : "first" !== e
            ? s.children[e].insertAdjacentElement("beforebegin", t)
            : s.insertAdjacentElement("afterbegin", t);
      }),
      (e.prototype.moveBack = function (e, t, s) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[s]
            ? e.children[s].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (e.prototype.indexInParent = function (e, t) {
        const s = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(s, t);
      }),
      (e.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    new e("max").init();
    const t = document.querySelectorAll("[data-animation]");
    if (t.length > 0) {
      function cs(e) {
        for (let e = 0; e < t.length; e++) {
          const s = t[e],
            n = s.offsetHeight,
            a = i(s).top,
            r = 4;
          let o = window.innerHeight - n / r;
          n > window.innerHeight &&
            (o = window.innerHeight - window.innerHeight / r),
            pageYOffset > a - o && pageYOffset < a + n
              ? s.classList.add("animate")
              : s.getAttribute("data-animation", "not-repeat") ||
                s.classList.remove("animate");
        }
      }
      window.addEventListener("scroll", cs),
        setTimeout(() => {
          cs();
        }, 300);
    }
    function i(e) {
      const t = e.getBoundingClientRect(),
        s = window.pageXOffset || document.documentElement.scrollLeft,
        i = window.pageYOffset || document.documentElement.scrollTop;
      return { top: t.top + i, left: t.left + s };
    }
    let n = !0,
      a = (e = 500) => {
        let t = document.querySelector("body");
        if (n) {
          let s = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (n = !1),
            setTimeout(function () {
              n = !0;
            }, e);
        }
      };
    function r(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    let o = (e, t = !1, s = 500, i = 0) => {
      const n = document.querySelector(e);
      if (n) {
        let o = "",
          l = 0;
        t &&
          ((o = "header.header"), (l = document.querySelector(o).offsetHeight));
        let d = {
          speedAsDuration: !0,
          speed: s,
          header: o,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (a(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(n, "", d);
        else {
          let e = n.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
        }
        r(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else r(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    const l = { inputMaskModule: null, selectModule: null };
    let d = {
      getErrors(e) {
        let t = 0,
          s = e.querySelectorAll("*[data-required]");
        return (
          s.length &&
            s.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : ("checkbox" !== e.type || e.checked) && e.value
            ? this.removeError(e)
            : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.parentElement.classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error")
            );
      },
      formClean(e) {
        e.reset(),
          setTimeout(() => {
            let t = e.querySelectorAll("input,textarea");
            for (let e = 0; e < t.length; e++) {
              const s = t[e];
              s.parentElement.classList.remove("_form-focus"),
                s.classList.remove("_form-focus"),
                d.removeError(s),
                (s.value = s.dataset.placeholder);
            }
            let s = e.querySelectorAll(".checkbox__input");
            if (s.length > 0)
              for (let e = 0; e < s.length; e++) {
                s[e].checked = !1;
              }
            if (l.selectModule) {
              let t = e.querySelectorAll(".select");
              if (t.length)
                for (let e = 0; e < t.length; e++) {
                  const s = t[e].querySelector("select");
                  l.selectModule.selectBuild(s);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function c(e) {
      if (null == e) return window;
      if ("[object Window]" !== e.toString()) {
        var t = e.ownerDocument;
        return (t && t.defaultView) || window;
      }
      return e;
    }
    function p(e) {
      return e instanceof c(e).Element || e instanceof Element;
    }
    function u(e) {
      return e instanceof c(e).HTMLElement || e instanceof HTMLElement;
    }
    function h(e) {
      return (
        "undefined" != typeof ShadowRoot &&
        (e instanceof c(e).ShadowRoot || e instanceof ShadowRoot)
      );
    }
    var m = Math.max,
      f = Math.min,
      g = Math.round;
    function v() {
      var e = navigator.userAgentData;
      return null != e && e.brands
        ? e.brands
            .map(function (e) {
              return e.brand + "/" + e.version;
            })
            .join(" ")
        : navigator.userAgent;
    }
    function y() {
      return !/^((?!chrome|android).)*safari/i.test(v());
    }
    function b(e, t, s) {
      void 0 === t && (t = !1), void 0 === s && (s = !1);
      var i = e.getBoundingClientRect(),
        n = 1,
        a = 1;
      t &&
        u(e) &&
        ((n = (e.offsetWidth > 0 && g(i.width) / e.offsetWidth) || 1),
        (a = (e.offsetHeight > 0 && g(i.height) / e.offsetHeight) || 1));
      var r = (p(e) ? c(e) : window).visualViewport,
        o = !y() && s,
        l = (i.left + (o && r ? r.offsetLeft : 0)) / n,
        d = (i.top + (o && r ? r.offsetTop : 0)) / a,
        h = i.width / n,
        m = i.height / a;
      return {
        width: h,
        height: m,
        top: d,
        right: l + h,
        bottom: d + m,
        left: l,
        x: l,
        y: d,
      };
    }
    function w(e) {
      var t = c(e);
      return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
    }
    function x(e) {
      return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function C(e) {
      return ((p(e) ? e.ownerDocument : e.document) || window.document)
        .documentElement;
    }
    function S(e) {
      return b(C(e)).left + w(e).scrollLeft;
    }
    function E(e) {
      return c(e).getComputedStyle(e);
    }
    function T(e) {
      var t = E(e),
        s = t.overflow,
        i = t.overflowX,
        n = t.overflowY;
      return /auto|scroll|overlay|hidden/.test(s + n + i);
    }
    function $(e, t, s) {
      void 0 === s && (s = !1);
      var i,
        n,
        a = u(t),
        r =
          u(t) &&
          (function (e) {
            var t = e.getBoundingClientRect(),
              s = g(t.width) / e.offsetWidth || 1,
              i = g(t.height) / e.offsetHeight || 1;
            return 1 !== s || 1 !== i;
          })(t),
        o = C(t),
        l = b(e, r, s),
        d = { scrollLeft: 0, scrollTop: 0 },
        p = { x: 0, y: 0 };
      return (
        (a || (!a && !s)) &&
          (("body" !== x(t) || T(o)) &&
            (d =
              (i = t) !== c(i) && u(i)
                ? { scrollLeft: (n = i).scrollLeft, scrollTop: n.scrollTop }
                : w(i)),
          u(t)
            ? (((p = b(t, !0)).x += t.clientLeft), (p.y += t.clientTop))
            : o && (p.x = S(o))),
        {
          x: l.left + d.scrollLeft - p.x,
          y: l.top + d.scrollTop - p.y,
          width: l.width,
          height: l.height,
        }
      );
    }
    function M(e) {
      var t = b(e),
        s = e.offsetWidth,
        i = e.offsetHeight;
      return (
        Math.abs(t.width - s) <= 1 && (s = t.width),
        Math.abs(t.height - i) <= 1 && (i = t.height),
        { x: e.offsetLeft, y: e.offsetTop, width: s, height: i }
      );
    }
    function I(e) {
      return "html" === x(e)
        ? e
        : e.assignedSlot || e.parentNode || (h(e) ? e.host : null) || C(e);
    }
    function O(e) {
      return ["html", "body", "#document"].indexOf(x(e)) >= 0
        ? e.ownerDocument.body
        : u(e) && T(e)
        ? e
        : O(I(e));
    }
    function z(e, t) {
      var s;
      void 0 === t && (t = []);
      var i = O(e),
        n = i === (null == (s = e.ownerDocument) ? void 0 : s.body),
        a = c(i),
        r = n ? [a].concat(a.visualViewport || [], T(i) ? i : []) : i,
        o = t.concat(r);
      return n ? o : o.concat(z(I(r)));
    }
    function P(e) {
      return ["table", "td", "th"].indexOf(x(e)) >= 0;
    }
    function L(e) {
      return u(e) && "fixed" !== E(e).position ? e.offsetParent : null;
    }
    function k(e) {
      for (var t = c(e), s = L(e); s && P(s) && "static" === E(s).position; )
        s = L(s);
      return s &&
        ("html" === x(s) || ("body" === x(s) && "static" === E(s).position))
        ? t
        : s ||
            (function (e) {
              var t = /firefox/i.test(v());
              if (/Trident/i.test(v()) && u(e) && "fixed" === E(e).position)
                return null;
              var s = I(e);
              for (
                h(s) && (s = s.host);
                u(s) && ["html", "body"].indexOf(x(s)) < 0;

              ) {
                var i = E(s);
                if (
                  "none" !== i.transform ||
                  "none" !== i.perspective ||
                  "paint" === i.contain ||
                  -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                  (t && "filter" === i.willChange) ||
                  (t && i.filter && "none" !== i.filter)
                )
                  return s;
                s = s.parentNode;
              }
              return null;
            })(e) ||
            t;
    }
    var A = "top",
      D = "bottom",
      B = "right",
      G = "left",
      H = "auto",
      N = [A, D, B, G],
      _ = "start",
      R = "end",
      j = "viewport",
      X = "popper",
      Y = N.reduce(function (e, t) {
        return e.concat([t + "-" + _, t + "-" + R]);
      }, []),
      q = [].concat(N, [H]).reduce(function (e, t) {
        return e.concat([t, t + "-" + _, t + "-" + R]);
      }, []),
      F = [
        "beforeRead",
        "read",
        "afterRead",
        "beforeMain",
        "main",
        "afterMain",
        "beforeWrite",
        "write",
        "afterWrite",
      ];
    function V(e) {
      var t = new Map(),
        s = new Set(),
        i = [];
      function n(e) {
        s.add(e.name),
          []
            .concat(e.requires || [], e.requiresIfExists || [])
            .forEach(function (e) {
              if (!s.has(e)) {
                var i = t.get(e);
                i && n(i);
              }
            }),
          i.push(e);
      }
      return (
        e.forEach(function (e) {
          t.set(e.name, e);
        }),
        e.forEach(function (e) {
          s.has(e.name) || n(e);
        }),
        i
      );
    }
    var W = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function U() {
      for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
        t[s] = arguments[s];
      return !t.some(function (e) {
        return !(e && "function" == typeof e.getBoundingClientRect);
      });
    }
    function Z(e) {
      void 0 === e && (e = {});
      var t = e,
        s = t.defaultModifiers,
        i = void 0 === s ? [] : s,
        n = t.defaultOptions,
        a = void 0 === n ? W : n;
      return function (e, t, s) {
        void 0 === s && (s = a);
        var n,
          r,
          o = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, W, a),
            modifiersData: {},
            elements: { reference: e, popper: t },
            attributes: {},
            styles: {},
          },
          l = [],
          d = !1,
          c = {
            state: o,
            setOptions: function (s) {
              var n = "function" == typeof s ? s(o.options) : s;
              u(),
                (o.options = Object.assign({}, a, o.options, n)),
                (o.scrollParents = {
                  reference: p(e)
                    ? z(e)
                    : e.contextElement
                    ? z(e.contextElement)
                    : [],
                  popper: z(t),
                });
              var r = (function (e) {
                var t = V(e);
                return F.reduce(function (e, s) {
                  return e.concat(
                    t.filter(function (e) {
                      return e.phase === s;
                    })
                  );
                }, []);
              })(
                (function (e) {
                  var t = e.reduce(function (e, t) {
                    var s = e[t.name];
                    return (
                      (e[t.name] = s
                        ? Object.assign({}, s, t, {
                            options: Object.assign({}, s.options, t.options),
                            data: Object.assign({}, s.data, t.data),
                          })
                        : t),
                      e
                    );
                  }, {});
                  return Object.keys(t).map(function (e) {
                    return t[e];
                  });
                })([].concat(i, o.options.modifiers))
              );
              return (
                (o.orderedModifiers = r.filter(function (e) {
                  return e.enabled;
                })),
                o.orderedModifiers.forEach(function (e) {
                  var t = e.name,
                    s = e.options,
                    i = void 0 === s ? {} : s,
                    n = e.effect;
                  if ("function" == typeof n) {
                    var a = n({ state: o, name: t, instance: c, options: i }),
                      r = function () {};
                    l.push(a || r);
                  }
                }),
                c.update()
              );
            },
            forceUpdate: function () {
              if (!d) {
                var e = o.elements,
                  t = e.reference,
                  s = e.popper;
                if (U(t, s)) {
                  (o.rects = {
                    reference: $(t, k(s), "fixed" === o.options.strategy),
                    popper: M(s),
                  }),
                    (o.reset = !1),
                    (o.placement = o.options.placement),
                    o.orderedModifiers.forEach(function (e) {
                      return (o.modifiersData[e.name] = Object.assign(
                        {},
                        e.data
                      ));
                    });
                  for (var i = 0; i < o.orderedModifiers.length; i++)
                    if (!0 !== o.reset) {
                      var n = o.orderedModifiers[i],
                        a = n.fn,
                        r = n.options,
                        l = void 0 === r ? {} : r,
                        p = n.name;
                      "function" == typeof a &&
                        (o =
                          a({ state: o, options: l, name: p, instance: c }) ||
                          o);
                    } else (o.reset = !1), (i = -1);
                }
              }
            },
            update:
              ((n = function () {
                return new Promise(function (e) {
                  c.forceUpdate(), e(o);
                });
              }),
              function () {
                return (
                  r ||
                    (r = new Promise(function (e) {
                      Promise.resolve().then(function () {
                        (r = void 0), e(n());
                      });
                    })),
                  r
                );
              }),
            destroy: function () {
              u(), (d = !0);
            },
          };
        if (!U(e, t)) return c;
        function u() {
          l.forEach(function (e) {
            return e();
          }),
            (l = []);
        }
        return (
          c.setOptions(s).then(function (e) {
            !d && s.onFirstUpdate && s.onFirstUpdate(e);
          }),
          c
        );
      };
    }
    var K = { passive: !0 };
    function Q(e) {
      return e.split("-")[0];
    }
    function J(e) {
      return e.split("-")[1];
    }
    function ee(e) {
      return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
    }
    function te(e) {
      var t,
        s = e.reference,
        i = e.element,
        n = e.placement,
        a = n ? Q(n) : null,
        r = n ? J(n) : null,
        o = s.x + s.width / 2 - i.width / 2,
        l = s.y + s.height / 2 - i.height / 2;
      switch (a) {
        case A:
          t = { x: o, y: s.y - i.height };
          break;
        case D:
          t = { x: o, y: s.y + s.height };
          break;
        case B:
          t = { x: s.x + s.width, y: l };
          break;
        case G:
          t = { x: s.x - i.width, y: l };
          break;
        default:
          t = { x: s.x, y: s.y };
      }
      var d = a ? ee(a) : null;
      if (null != d) {
        var c = "y" === d ? "height" : "width";
        switch (r) {
          case _:
            t[d] = t[d] - (s[c] / 2 - i[c] / 2);
            break;
          case R:
            t[d] = t[d] + (s[c] / 2 - i[c] / 2);
        }
      }
      return t;
    }
    var se = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function ie(e) {
      var t,
        s = e.popper,
        i = e.popperRect,
        n = e.placement,
        a = e.variation,
        r = e.offsets,
        o = e.position,
        l = e.gpuAcceleration,
        d = e.adaptive,
        p = e.roundOffsets,
        u = e.isFixed,
        h = r.x,
        m = void 0 === h ? 0 : h,
        f = r.y,
        v = void 0 === f ? 0 : f,
        y = "function" == typeof p ? p({ x: m, y: v }) : { x: m, y: v };
      (m = y.x), (v = y.y);
      var b = r.hasOwnProperty("x"),
        w = r.hasOwnProperty("y"),
        x = G,
        S = A,
        T = window;
      if (d) {
        var $ = k(s),
          M = "clientHeight",
          I = "clientWidth";
        if (
          ($ === c(s) &&
            "static" !== E(($ = C(s))).position &&
            "absolute" === o &&
            ((M = "scrollHeight"), (I = "scrollWidth")),
          n === A || ((n === G || n === B) && a === R))
        )
          (S = D),
            (v -=
              (u && $ === T && T.visualViewport
                ? T.visualViewport.height
                : $[M]) - i.height),
            (v *= l ? 1 : -1);
        if (n === G || ((n === A || n === D) && a === R))
          (x = B),
            (m -=
              (u && $ === T && T.visualViewport
                ? T.visualViewport.width
                : $[I]) - i.width),
            (m *= l ? 1 : -1);
      }
      var O,
        z = Object.assign({ position: o }, d && se),
        P =
          !0 === p
            ? (function (e) {
                var t = e.x,
                  s = e.y,
                  i = window.devicePixelRatio || 1;
                return { x: g(t * i) / i || 0, y: g(s * i) / i || 0 };
              })({ x: m, y: v })
            : { x: m, y: v };
      return (
        (m = P.x),
        (v = P.y),
        l
          ? Object.assign(
              {},
              z,
              (((O = {})[S] = w ? "0" : ""),
              (O[x] = b ? "0" : ""),
              (O.transform =
                (T.devicePixelRatio || 1) <= 1
                  ? "translate(" + m + "px, " + v + "px)"
                  : "translate3d(" + m + "px, " + v + "px, 0)"),
              O)
            )
          : Object.assign(
              {},
              z,
              (((t = {})[S] = w ? v + "px" : ""),
              (t[x] = b ? m + "px" : ""),
              (t.transform = ""),
              t)
            )
      );
    }
    const ne = {
      name: "applyStyles",
      enabled: !0,
      phase: "write",
      fn: function (e) {
        var t = e.state;
        Object.keys(t.elements).forEach(function (e) {
          var s = t.styles[e] || {},
            i = t.attributes[e] || {},
            n = t.elements[e];
          u(n) &&
            x(n) &&
            (Object.assign(n.style, s),
            Object.keys(i).forEach(function (e) {
              var t = i[e];
              !1 === t
                ? n.removeAttribute(e)
                : n.setAttribute(e, !0 === t ? "" : t);
            }));
        });
      },
      effect: function (e) {
        var t = e.state,
          s = {
            popper: {
              position: t.options.strategy,
              left: "0",
              top: "0",
              margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
          };
        return (
          Object.assign(t.elements.popper.style, s.popper),
          (t.styles = s),
          t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow),
          function () {
            Object.keys(t.elements).forEach(function (e) {
              var i = t.elements[e],
                n = t.attributes[e] || {},
                a = Object.keys(
                  t.styles.hasOwnProperty(e) ? t.styles[e] : s[e]
                ).reduce(function (e, t) {
                  return (e[t] = ""), e;
                }, {});
              u(i) &&
                x(i) &&
                (Object.assign(i.style, a),
                Object.keys(n).forEach(function (e) {
                  i.removeAttribute(e);
                }));
            });
          }
        );
      },
      requires: ["computeStyles"],
    };
    const ae = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (e) {
        var t = e.state,
          s = e.options,
          i = e.name,
          n = s.offset,
          a = void 0 === n ? [0, 0] : n,
          r = q.reduce(function (e, s) {
            return (
              (e[s] = (function (e, t, s) {
                var i = Q(e),
                  n = [G, A].indexOf(i) >= 0 ? -1 : 1,
                  a =
                    "function" == typeof s
                      ? s(Object.assign({}, t, { placement: e }))
                      : s,
                  r = a[0],
                  o = a[1];
                return (
                  (r = r || 0),
                  (o = (o || 0) * n),
                  [G, B].indexOf(i) >= 0 ? { x: o, y: r } : { x: r, y: o }
                );
              })(s, t.rects, a)),
              e
            );
          }, {}),
          o = r[t.placement],
          l = o.x,
          d = o.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += l),
          (t.modifiersData.popperOffsets.y += d)),
          (t.modifiersData[i] = r);
      },
    };
    var re = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function oe(e) {
      return e.replace(/left|right|bottom|top/g, function (e) {
        return re[e];
      });
    }
    var le = { start: "end", end: "start" };
    function de(e) {
      return e.replace(/start|end/g, function (e) {
        return le[e];
      });
    }
    function ce(e, t) {
      var s = t.getRootNode && t.getRootNode();
      if (e.contains(t)) return !0;
      if (s && h(s)) {
        var i = t;
        do {
          if (i && e.isSameNode(i)) return !0;
          i = i.parentNode || i.host;
        } while (i);
      }
      return !1;
    }
    function pe(e) {
      return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height,
      });
    }
    function ue(e, t, s) {
      return t === j
        ? pe(
            (function (e, t) {
              var s = c(e),
                i = C(e),
                n = s.visualViewport,
                a = i.clientWidth,
                r = i.clientHeight,
                o = 0,
                l = 0;
              if (n) {
                (a = n.width), (r = n.height);
                var d = y();
                (d || (!d && "fixed" === t)) &&
                  ((o = n.offsetLeft), (l = n.offsetTop));
              }
              return { width: a, height: r, x: o + S(e), y: l };
            })(e, s)
          )
        : p(t)
        ? (function (e, t) {
            var s = b(e, !1, "fixed" === t);
            return (
              (s.top = s.top + e.clientTop),
              (s.left = s.left + e.clientLeft),
              (s.bottom = s.top + e.clientHeight),
              (s.right = s.left + e.clientWidth),
              (s.width = e.clientWidth),
              (s.height = e.clientHeight),
              (s.x = s.left),
              (s.y = s.top),
              s
            );
          })(t, s)
        : pe(
            (function (e) {
              var t,
                s = C(e),
                i = w(e),
                n = null == (t = e.ownerDocument) ? void 0 : t.body,
                a = m(
                  s.scrollWidth,
                  s.clientWidth,
                  n ? n.scrollWidth : 0,
                  n ? n.clientWidth : 0
                ),
                r = m(
                  s.scrollHeight,
                  s.clientHeight,
                  n ? n.scrollHeight : 0,
                  n ? n.clientHeight : 0
                ),
                o = -i.scrollLeft + S(e),
                l = -i.scrollTop;
              return (
                "rtl" === E(n || s).direction &&
                  (o += m(s.clientWidth, n ? n.clientWidth : 0) - a),
                { width: a, height: r, x: o, y: l }
              );
            })(C(e))
          );
    }
    function he(e, t, s, i) {
      var n =
          "clippingParents" === t
            ? (function (e) {
                var t = z(I(e)),
                  s =
                    ["absolute", "fixed"].indexOf(E(e).position) >= 0 && u(e)
                      ? k(e)
                      : e;
                return p(s)
                  ? t.filter(function (e) {
                      return p(e) && ce(e, s) && "body" !== x(e);
                    })
                  : [];
              })(e)
            : [].concat(t),
        a = [].concat(n, [s]),
        r = a[0],
        o = a.reduce(function (t, s) {
          var n = ue(e, s, i);
          return (
            (t.top = m(n.top, t.top)),
            (t.right = f(n.right, t.right)),
            (t.bottom = f(n.bottom, t.bottom)),
            (t.left = m(n.left, t.left)),
            t
          );
        }, ue(e, r, i));
      return (
        (o.width = o.right - o.left),
        (o.height = o.bottom - o.top),
        (o.x = o.left),
        (o.y = o.top),
        o
      );
    }
    function me(e) {
      return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
    }
    function fe(e, t) {
      return t.reduce(function (t, s) {
        return (t[s] = e), t;
      }, {});
    }
    function ge(e, t) {
      void 0 === t && (t = {});
      var s = t,
        i = s.placement,
        n = void 0 === i ? e.placement : i,
        a = s.strategy,
        r = void 0 === a ? e.strategy : a,
        o = s.boundary,
        l = void 0 === o ? "clippingParents" : o,
        d = s.rootBoundary,
        c = void 0 === d ? j : d,
        u = s.elementContext,
        h = void 0 === u ? X : u,
        m = s.altBoundary,
        f = void 0 !== m && m,
        g = s.padding,
        v = void 0 === g ? 0 : g,
        y = me("number" != typeof v ? v : fe(v, N)),
        w = h === X ? "reference" : X,
        x = e.rects.popper,
        S = e.elements[f ? w : h],
        E = he(p(S) ? S : S.contextElement || C(e.elements.popper), l, c, r),
        T = b(e.elements.reference),
        $ = te({
          reference: T,
          element: x,
          strategy: "absolute",
          placement: n,
        }),
        M = pe(Object.assign({}, x, $)),
        I = h === X ? M : T,
        O = {
          top: E.top - I.top + y.top,
          bottom: I.bottom - E.bottom + y.bottom,
          left: E.left - I.left + y.left,
          right: I.right - E.right + y.right,
        },
        z = e.modifiersData.offset;
      if (h === X && z) {
        var P = z[n];
        Object.keys(O).forEach(function (e) {
          var t = [B, D].indexOf(e) >= 0 ? 1 : -1,
            s = [A, D].indexOf(e) >= 0 ? "y" : "x";
          O[e] += P[s] * t;
        });
      }
      return O;
    }
    function ve(e, t, s) {
      return m(e, f(t, s));
    }
    const ye = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function (e) {
        var t = e.state,
          s = e.options,
          i = e.name,
          n = s.mainAxis,
          a = void 0 === n || n,
          r = s.altAxis,
          o = void 0 !== r && r,
          l = s.boundary,
          d = s.rootBoundary,
          c = s.altBoundary,
          p = s.padding,
          u = s.tether,
          h = void 0 === u || u,
          g = s.tetherOffset,
          v = void 0 === g ? 0 : g,
          y = ge(t, {
            boundary: l,
            rootBoundary: d,
            padding: p,
            altBoundary: c,
          }),
          b = Q(t.placement),
          w = J(t.placement),
          x = !w,
          C = ee(b),
          S = "x" === C ? "y" : "x",
          E = t.modifiersData.popperOffsets,
          T = t.rects.reference,
          $ = t.rects.popper,
          I =
            "function" == typeof v
              ? v(Object.assign({}, t.rects, { placement: t.placement }))
              : v,
          O =
            "number" == typeof I
              ? { mainAxis: I, altAxis: I }
              : Object.assign({ mainAxis: 0, altAxis: 0 }, I),
          z = t.modifiersData.offset
            ? t.modifiersData.offset[t.placement]
            : null,
          P = { x: 0, y: 0 };
        if (E) {
          if (a) {
            var L,
              H = "y" === C ? A : G,
              N = "y" === C ? D : B,
              R = "y" === C ? "height" : "width",
              j = E[C],
              X = j + y[H],
              Y = j - y[N],
              q = h ? -$[R] / 2 : 0,
              F = w === _ ? T[R] : $[R],
              V = w === _ ? -$[R] : -T[R],
              W = t.elements.arrow,
              U = h && W ? M(W) : { width: 0, height: 0 },
              Z = t.modifiersData["arrow#persistent"]
                ? t.modifiersData["arrow#persistent"].padding
                : { top: 0, right: 0, bottom: 0, left: 0 },
              K = Z[H],
              te = Z[N],
              se = ve(0, T[R], U[R]),
              ie = x
                ? T[R] / 2 - q - se - K - O.mainAxis
                : F - se - K - O.mainAxis,
              ne = x
                ? -T[R] / 2 + q + se + te + O.mainAxis
                : V + se + te + O.mainAxis,
              ae = t.elements.arrow && k(t.elements.arrow),
              re = ae
                ? "y" === C
                  ? ae.clientTop || 0
                  : ae.clientLeft || 0
                : 0,
              oe = null != (L = null == z ? void 0 : z[C]) ? L : 0,
              le = j + ne - oe,
              de = ve(h ? f(X, j + ie - oe - re) : X, j, h ? m(Y, le) : Y);
            (E[C] = de), (P[C] = de - j);
          }
          if (o) {
            var ce,
              pe = "x" === C ? A : G,
              ue = "x" === C ? D : B,
              he = E[S],
              me = "y" === S ? "height" : "width",
              fe = he + y[pe],
              ye = he - y[ue],
              be = -1 !== [A, G].indexOf(b),
              we = null != (ce = null == z ? void 0 : z[S]) ? ce : 0,
              xe = be ? fe : he - T[me] - $[me] - we + O.altAxis,
              Ce = be ? he + T[me] + $[me] - we - O.altAxis : ye,
              Se =
                h && be
                  ? (function (e, t, s) {
                      var i = ve(e, t, s);
                      return i > s ? s : i;
                    })(xe, he, Ce)
                  : ve(h ? xe : fe, he, h ? Ce : ye);
            (E[S] = Se), (P[S] = Se - he);
          }
          t.modifiersData[i] = P;
        }
      },
      requiresIfExists: ["offset"],
    };
    const be = {
      name: "arrow",
      enabled: !0,
      phase: "main",
      fn: function (e) {
        var t,
          s = e.state,
          i = e.name,
          n = e.options,
          a = s.elements.arrow,
          r = s.modifiersData.popperOffsets,
          o = Q(s.placement),
          l = ee(o),
          d = [G, B].indexOf(o) >= 0 ? "height" : "width";
        if (a && r) {
          var c = (function (e, t) {
              return me(
                "number" !=
                  typeof (e =
                    "function" == typeof e
                      ? e(
                          Object.assign({}, t.rects, { placement: t.placement })
                        )
                      : e)
                  ? e
                  : fe(e, N)
              );
            })(n.padding, s),
            p = M(a),
            u = "y" === l ? A : G,
            h = "y" === l ? D : B,
            m =
              s.rects.reference[d] +
              s.rects.reference[l] -
              r[l] -
              s.rects.popper[d],
            f = r[l] - s.rects.reference[l],
            g = k(a),
            v = g ? ("y" === l ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
            y = m / 2 - f / 2,
            b = c[u],
            w = v - p[d] - c[h],
            x = v / 2 - p[d] / 2 + y,
            C = ve(b, x, w),
            S = l;
          s.modifiersData[i] = (((t = {})[S] = C), (t.centerOffset = C - x), t);
        }
      },
      effect: function (e) {
        var t = e.state,
          s = e.options.element,
          i = void 0 === s ? "[data-popper-arrow]" : s;
        null != i &&
          ("string" != typeof i || (i = t.elements.popper.querySelector(i))) &&
          ce(t.elements.popper, i) &&
          (t.elements.arrow = i);
      },
      requires: ["popperOffsets"],
      requiresIfExists: ["preventOverflow"],
    };
    function we(e, t, s) {
      return (
        void 0 === s && (s = { x: 0, y: 0 }),
        {
          top: e.top - t.height - s.y,
          right: e.right - t.width + s.x,
          bottom: e.bottom - t.height + s.y,
          left: e.left - t.width - s.x,
        }
      );
    }
    function xe(e) {
      return [A, B, D, G].some(function (t) {
        return e[t] >= 0;
      });
    }
    var Ce = Z({
        defaultModifiers: [
          {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (e) {
              var t = e.state,
                s = e.instance,
                i = e.options,
                n = i.scroll,
                a = void 0 === n || n,
                r = i.resize,
                o = void 0 === r || r,
                l = c(t.elements.popper),
                d = [].concat(
                  t.scrollParents.reference,
                  t.scrollParents.popper
                );
              return (
                a &&
                  d.forEach(function (e) {
                    e.addEventListener("scroll", s.update, K);
                  }),
                o && l.addEventListener("resize", s.update, K),
                function () {
                  a &&
                    d.forEach(function (e) {
                      e.removeEventListener("scroll", s.update, K);
                    }),
                    o && l.removeEventListener("resize", s.update, K);
                }
              );
            },
            data: {},
          },
          {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function (e) {
              var t = e.state,
                s = e.name;
              t.modifiersData[s] = te({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement,
              });
            },
            data: {},
          },
          {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (e) {
              var t = e.state,
                s = e.options,
                i = s.gpuAcceleration,
                n = void 0 === i || i,
                a = s.adaptive,
                r = void 0 === a || a,
                o = s.roundOffsets,
                l = void 0 === o || o,
                d = {
                  placement: Q(t.placement),
                  variation: J(t.placement),
                  popper: t.elements.popper,
                  popperRect: t.rects.popper,
                  gpuAcceleration: n,
                  isFixed: "fixed" === t.options.strategy,
                };
              null != t.modifiersData.popperOffsets &&
                (t.styles.popper = Object.assign(
                  {},
                  t.styles.popper,
                  ie(
                    Object.assign({}, d, {
                      offsets: t.modifiersData.popperOffsets,
                      position: t.options.strategy,
                      adaptive: r,
                      roundOffsets: l,
                    })
                  )
                )),
                null != t.modifiersData.arrow &&
                  (t.styles.arrow = Object.assign(
                    {},
                    t.styles.arrow,
                    ie(
                      Object.assign({}, d, {
                        offsets: t.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1,
                        roundOffsets: l,
                      })
                    )
                  )),
                (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                  "data-popper-placement": t.placement,
                }));
            },
            data: {},
          },
          ne,
          ae,
          {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function (e) {
              var t = e.state,
                s = e.options,
                i = e.name;
              if (!t.modifiersData[i]._skip) {
                for (
                  var n = s.mainAxis,
                    a = void 0 === n || n,
                    r = s.altAxis,
                    o = void 0 === r || r,
                    l = s.fallbackPlacements,
                    d = s.padding,
                    c = s.boundary,
                    p = s.rootBoundary,
                    u = s.altBoundary,
                    h = s.flipVariations,
                    m = void 0 === h || h,
                    f = s.allowedAutoPlacements,
                    g = t.options.placement,
                    v = Q(g),
                    y =
                      l ||
                      (v === g || !m
                        ? [oe(g)]
                        : (function (e) {
                            if (Q(e) === H) return [];
                            var t = oe(e);
                            return [de(e), t, de(t)];
                          })(g)),
                    b = [g].concat(y).reduce(function (e, s) {
                      return e.concat(
                        Q(s) === H
                          ? (function (e, t) {
                              void 0 === t && (t = {});
                              var s = t,
                                i = s.placement,
                                n = s.boundary,
                                a = s.rootBoundary,
                                r = s.padding,
                                o = s.flipVariations,
                                l = s.allowedAutoPlacements,
                                d = void 0 === l ? q : l,
                                c = J(i),
                                p = c
                                  ? o
                                    ? Y
                                    : Y.filter(function (e) {
                                        return J(e) === c;
                                      })
                                  : N,
                                u = p.filter(function (e) {
                                  return d.indexOf(e) >= 0;
                                });
                              0 === u.length && (u = p);
                              var h = u.reduce(function (t, s) {
                                return (
                                  (t[s] = ge(e, {
                                    placement: s,
                                    boundary: n,
                                    rootBoundary: a,
                                    padding: r,
                                  })[Q(s)]),
                                  t
                                );
                              }, {});
                              return Object.keys(h).sort(function (e, t) {
                                return h[e] - h[t];
                              });
                            })(t, {
                              placement: s,
                              boundary: c,
                              rootBoundary: p,
                              padding: d,
                              flipVariations: m,
                              allowedAutoPlacements: f,
                            })
                          : s
                      );
                    }, []),
                    w = t.rects.reference,
                    x = t.rects.popper,
                    C = new Map(),
                    S = !0,
                    E = b[0],
                    T = 0;
                  T < b.length;
                  T++
                ) {
                  var $ = b[T],
                    M = Q($),
                    I = J($) === _,
                    O = [A, D].indexOf(M) >= 0,
                    z = O ? "width" : "height",
                    P = ge(t, {
                      placement: $,
                      boundary: c,
                      rootBoundary: p,
                      altBoundary: u,
                      padding: d,
                    }),
                    L = O ? (I ? B : G) : I ? D : A;
                  w[z] > x[z] && (L = oe(L));
                  var k = oe(L),
                    R = [];
                  if (
                    (a && R.push(P[M] <= 0),
                    o && R.push(P[L] <= 0, P[k] <= 0),
                    R.every(function (e) {
                      return e;
                    }))
                  ) {
                    (E = $), (S = !1);
                    break;
                  }
                  C.set($, R);
                }
                if (S)
                  for (
                    var j = function (e) {
                        var t = b.find(function (t) {
                          var s = C.get(t);
                          if (s)
                            return s.slice(0, e).every(function (e) {
                              return e;
                            });
                        });
                        if (t) return (E = t), "break";
                      },
                      X = m ? 3 : 1;
                    X > 0;
                    X--
                  ) {
                    if ("break" === j(X)) break;
                  }
                t.placement !== E &&
                  ((t.modifiersData[i]._skip = !0),
                  (t.placement = E),
                  (t.reset = !0));
              }
            },
            requiresIfExists: ["offset"],
            data: { _skip: !1 },
          },
          ye,
          be,
          {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function (e) {
              var t = e.state,
                s = e.name,
                i = t.rects.reference,
                n = t.rects.popper,
                a = t.modifiersData.preventOverflow,
                r = ge(t, { elementContext: "reference" }),
                o = ge(t, { altBoundary: !0 }),
                l = we(r, i),
                d = we(o, n, a),
                c = xe(l),
                p = xe(d);
              (t.modifiersData[s] = {
                referenceClippingOffsets: l,
                popperEscapeOffsets: d,
                isReferenceHidden: c,
                hasPopperEscaped: p,
              }),
                (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                  "data-popper-reference-hidden": c,
                  "data-popper-escaped": p,
                }));
            },
          },
        ],
      }),
      Se = "tippy-content",
      Ee = "tippy-backdrop",
      Te = "tippy-arrow",
      $e = "tippy-svg-arrow",
      Me = { passive: !0, capture: !0 },
      Ie = function () {
        return document.body;
      };
    function Oe(e, t, s) {
      if (Array.isArray(e)) {
        var i = e[t];
        return null == i ? (Array.isArray(s) ? s[t] : s) : i;
      }
      return e;
    }
    function ze(e, t) {
      var s = {}.toString.call(e);
      return 0 === s.indexOf("[object") && s.indexOf(t + "]") > -1;
    }
    function Pe(e, t) {
      return "function" == typeof e ? e.apply(void 0, t) : e;
    }
    function Le(e, t) {
      return 0 === t
        ? e
        : function (i) {
            clearTimeout(s),
              (s = setTimeout(function () {
                e(i);
              }, t));
          };
      var s;
    }
    function ke(e) {
      return [].concat(e);
    }
    function Ae(e, t) {
      -1 === e.indexOf(t) && e.push(t);
    }
    function De(e) {
      return e.split("-")[0];
    }
    function Be(e) {
      return [].slice.call(e);
    }
    function Ge(e) {
      return Object.keys(e).reduce(function (t, s) {
        return void 0 !== e[s] && (t[s] = e[s]), t;
      }, {});
    }
    function He() {
      return document.createElement("div");
    }
    function Ne(e) {
      return ["Element", "Fragment"].some(function (t) {
        return ze(e, t);
      });
    }
    function _e(e) {
      return ze(e, "MouseEvent");
    }
    function Re(e) {
      return !(!e || !e._tippy || e._tippy.reference !== e);
    }
    function je(e) {
      return Ne(e)
        ? [e]
        : (function (e) {
            return ze(e, "NodeList");
          })(e)
        ? Be(e)
        : Array.isArray(e)
        ? e
        : Be(document.querySelectorAll(e));
    }
    function Xe(e, t) {
      e.forEach(function (e) {
        e && (e.style.transitionDuration = t + "ms");
      });
    }
    function Ye(e, t) {
      e.forEach(function (e) {
        e && e.setAttribute("data-state", t);
      });
    }
    function qe(e) {
      var t,
        s = ke(e)[0];
      return null != s && null != (t = s.ownerDocument) && t.body
        ? s.ownerDocument
        : document;
    }
    function Fe(e, t, s) {
      var i = t + "EventListener";
      ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
        e[i](t, s);
      });
    }
    function Ve(e, t) {
      for (var s = t; s; ) {
        var i;
        if (e.contains(s)) return !0;
        s =
          null == s.getRootNode || null == (i = s.getRootNode())
            ? void 0
            : i.host;
      }
      return !1;
    }
    var We = { isTouch: !1 },
      Ue = 0;
    function Ze() {
      We.isTouch ||
        ((We.isTouch = !0),
        window.performance && document.addEventListener("mousemove", Ke));
    }
    function Ke() {
      var e = performance.now();
      e - Ue < 20 &&
        ((We.isTouch = !1), document.removeEventListener("mousemove", Ke)),
        (Ue = e);
    }
    function Qe() {
      var e = document.activeElement;
      if (Re(e)) {
        var t = e._tippy;
        e.blur && !t.state.isVisible && e.blur();
      }
    }
    var Je =
      !!("undefined" != typeof window && "undefined" != typeof document) &&
      !!window.msCrypto;
    var et = {
        animateFill: !1,
        followCursor: !1,
        inlinePositioning: !1,
        sticky: !1,
      },
      tt = Object.assign(
        {
          appendTo: Ie,
          aria: { content: "auto", expanded: "auto" },
          delay: 0,
          duration: [300, 250],
          getReferenceClientRect: null,
          hideOnClick: !0,
          ignoreAttributes: !1,
          interactive: !1,
          interactiveBorder: 2,
          interactiveDebounce: 0,
          moveTransition: "",
          offset: [0, 10],
          onAfterUpdate: function () {},
          onBeforeUpdate: function () {},
          onCreate: function () {},
          onDestroy: function () {},
          onHidden: function () {},
          onHide: function () {},
          onMount: function () {},
          onShow: function () {},
          onShown: function () {},
          onTrigger: function () {},
          onUntrigger: function () {},
          onClickOutside: function () {},
          placement: "top",
          plugins: [],
          popperOptions: {},
          render: null,
          showOnCreate: !1,
          touch: !0,
          trigger: "mouseenter focus",
          triggerTarget: null,
        },
        et,
        {
          allowHTML: !1,
          animation: "fade",
          arrow: !0,
          content: "",
          inertia: !1,
          maxWidth: 350,
          role: "tooltip",
          theme: "",
          zIndex: 9999,
        }
      ),
      st = Object.keys(tt);
    function it(e) {
      var t = (e.plugins || []).reduce(function (t, s) {
        var i,
          n = s.name,
          a = s.defaultValue;
        n && (t[n] = void 0 !== e[n] ? e[n] : null != (i = tt[n]) ? i : a);
        return t;
      }, {});
      return Object.assign({}, e, t);
    }
    function nt(e, t) {
      var s = Object.assign(
        {},
        t,
        { content: Pe(t.content, [e]) },
        t.ignoreAttributes
          ? {}
          : (function (e, t) {
              return (
                t ? Object.keys(it(Object.assign({}, tt, { plugins: t }))) : st
              ).reduce(function (t, s) {
                var i = (e.getAttribute("data-tippy-" + s) || "").trim();
                if (!i) return t;
                if ("content" === s) t[s] = i;
                else
                  try {
                    t[s] = JSON.parse(i);
                  } catch (e) {
                    t[s] = i;
                  }
                return t;
              }, {});
            })(e, t.plugins)
      );
      return (
        (s.aria = Object.assign({}, tt.aria, s.aria)),
        (s.aria = {
          expanded:
            "auto" === s.aria.expanded ? t.interactive : s.aria.expanded,
          content:
            "auto" === s.aria.content
              ? t.interactive
                ? null
                : "describedby"
              : s.aria.content,
        }),
        s
      );
    }
    function at(e, t) {
      e.innerHTML = t;
    }
    function rt(e) {
      var t = He();
      return (
        !0 === e
          ? (t.className = Te)
          : ((t.className = $e), Ne(e) ? t.appendChild(e) : at(t, e)),
        t
      );
    }
    function ot(e, t) {
      Ne(t.content)
        ? (at(e, ""), e.appendChild(t.content))
        : "function" != typeof t.content &&
          (t.allowHTML ? at(e, t.content) : (e.textContent = t.content));
    }
    function lt(e) {
      var t = e.firstElementChild,
        s = Be(t.children);
      return {
        box: t,
        content: s.find(function (e) {
          return e.classList.contains(Se);
        }),
        arrow: s.find(function (e) {
          return e.classList.contains(Te) || e.classList.contains($e);
        }),
        backdrop: s.find(function (e) {
          return e.classList.contains(Ee);
        }),
      };
    }
    function dt(e) {
      var t = He(),
        s = He();
      (s.className = "tippy-box"),
        s.setAttribute("data-state", "hidden"),
        s.setAttribute("tabindex", "-1");
      var i = He();
      function n(s, i) {
        var n = lt(t),
          a = n.box,
          r = n.content,
          o = n.arrow;
        i.theme
          ? a.setAttribute("data-theme", i.theme)
          : a.removeAttribute("data-theme"),
          "string" == typeof i.animation
            ? a.setAttribute("data-animation", i.animation)
            : a.removeAttribute("data-animation"),
          i.inertia
            ? a.setAttribute("data-inertia", "")
            : a.removeAttribute("data-inertia"),
          (a.style.maxWidth =
            "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth),
          i.role ? a.setAttribute("role", i.role) : a.removeAttribute("role"),
          (s.content === i.content && s.allowHTML === i.allowHTML) ||
            ot(r, e.props),
          i.arrow
            ? o
              ? s.arrow !== i.arrow &&
                (a.removeChild(o), a.appendChild(rt(i.arrow)))
              : a.appendChild(rt(i.arrow))
            : o && a.removeChild(o);
      }
      return (
        (i.className = Se),
        i.setAttribute("data-state", "hidden"),
        ot(i, e.props),
        t.appendChild(s),
        s.appendChild(i),
        n(e.props, e.props),
        { popper: t, onUpdate: n }
      );
    }
    dt.$$tippy = !0;
    var ct = 1,
      pt = [],
      ut = [];
    function ht(e, t) {
      var s,
        i,
        n,
        a,
        r,
        o,
        l,
        d,
        c = nt(e, Object.assign({}, tt, it(Ge(t)))),
        p = !1,
        u = !1,
        h = !1,
        m = !1,
        f = [],
        g = Le(V, c.interactiveDebounce),
        v = ct++,
        y = (d = c.plugins).filter(function (e, t) {
          return d.indexOf(e) === t;
        }),
        b = {
          id: v,
          reference: e,
          popper: He(),
          popperInstance: null,
          props: c,
          state: {
            isEnabled: !0,
            isVisible: !1,
            isDestroyed: !1,
            isMounted: !1,
            isShown: !1,
          },
          plugins: y,
          clearDelayTimeouts: function () {
            clearTimeout(s), clearTimeout(i), cancelAnimationFrame(n);
          },
          setProps: function (t) {
            0;
            if (b.state.isDestroyed) return;
            k("onBeforeUpdate", [b, t]), q();
            var s = b.props,
              i = nt(e, Object.assign({}, s, Ge(t), { ignoreAttributes: !0 }));
            (b.props = i),
              Y(),
              s.interactiveDebounce !== i.interactiveDebounce &&
                (B(), (g = Le(V, i.interactiveDebounce)));
            s.triggerTarget && !i.triggerTarget
              ? ke(s.triggerTarget).forEach(function (e) {
                  e.removeAttribute("aria-expanded");
                })
              : i.triggerTarget && e.removeAttribute("aria-expanded");
            D(), L(), C && C(s, i);
            b.popperInstance &&
              (K(),
              J().forEach(function (e) {
                requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
              }));
            k("onAfterUpdate", [b, t]);
          },
          setContent: function (e) {
            b.setProps({ content: e });
          },
          show: function () {
            0;
            var e = b.state.isVisible,
              t = b.state.isDestroyed,
              s = !b.state.isEnabled,
              i = We.isTouch && !b.props.touch,
              n = Oe(b.props.duration, 0, tt.duration);
            if (e || t || s || i) return;
            if (I().hasAttribute("disabled")) return;
            if ((k("onShow", [b], !1), !1 === b.props.onShow(b))) return;
            (b.state.isVisible = !0), M() && (x.style.visibility = "visible");
            L(), _(), b.state.isMounted || (x.style.transition = "none");
            if (M()) {
              var a = z(),
                r = a.box,
                l = a.content;
              Xe([r, l], 0);
            }
            (o = function () {
              var e;
              if (b.state.isVisible && !m) {
                if (
                  ((m = !0),
                  x.offsetHeight,
                  (x.style.transition = b.props.moveTransition),
                  M() && b.props.animation)
                ) {
                  var t = z(),
                    s = t.box,
                    i = t.content;
                  Xe([s, i], n), Ye([s, i], "visible");
                }
                A(),
                  D(),
                  Ae(ut, b),
                  null == (e = b.popperInstance) || e.forceUpdate(),
                  k("onMount", [b]),
                  b.props.animation &&
                    M() &&
                    (function (e, t) {
                      j(e, t);
                    })(n, function () {
                      (b.state.isShown = !0), k("onShown", [b]);
                    });
              }
            }),
              (function () {
                var e,
                  t = b.props.appendTo,
                  s = I();
                e =
                  (b.props.interactive && t === Ie) || "parent" === t
                    ? s.parentNode
                    : Pe(t, [s]);
                e.contains(x) || e.appendChild(x);
                (b.state.isMounted = !0), K(), !1;
              })();
          },
          hide: function () {
            0;
            var e = !b.state.isVisible,
              t = b.state.isDestroyed,
              s = !b.state.isEnabled,
              i = Oe(b.props.duration, 1, tt.duration);
            if (e || t || s) return;
            if ((k("onHide", [b], !1), !1 === b.props.onHide(b))) return;
            (b.state.isVisible = !1),
              (b.state.isShown = !1),
              (m = !1),
              (p = !1),
              M() && (x.style.visibility = "hidden");
            if ((B(), R(), L(!0), M())) {
              var n = z(),
                a = n.box,
                r = n.content;
              b.props.animation && (Xe([a, r], i), Ye([a, r], "hidden"));
            }
            A(),
              D(),
              b.props.animation
                ? M() &&
                  (function (e, t) {
                    j(e, function () {
                      !b.state.isVisible &&
                        x.parentNode &&
                        x.parentNode.contains(x) &&
                        t();
                    });
                  })(i, b.unmount)
                : b.unmount();
          },
          hideWithInteractivity: function (e) {
            0;
            O().addEventListener("mousemove", g), Ae(pt, g), g(e);
          },
          enable: function () {
            b.state.isEnabled = !0;
          },
          disable: function () {
            b.hide(), (b.state.isEnabled = !1);
          },
          unmount: function () {
            0;
            b.state.isVisible && b.hide();
            if (!b.state.isMounted) return;
            Q(),
              J().forEach(function (e) {
                e._tippy.unmount();
              }),
              x.parentNode && x.parentNode.removeChild(x);
            (ut = ut.filter(function (e) {
              return e !== b;
            })),
              (b.state.isMounted = !1),
              k("onHidden", [b]);
          },
          destroy: function () {
            0;
            if (b.state.isDestroyed) return;
            b.clearDelayTimeouts(),
              b.unmount(),
              q(),
              delete e._tippy,
              (b.state.isDestroyed = !0),
              k("onDestroy", [b]);
          },
        };
      if (!c.render) return b;
      var w = c.render(b),
        x = w.popper,
        C = w.onUpdate;
      x.setAttribute("data-tippy-root", ""),
        (x.id = "tippy-" + b.id),
        (b.popper = x),
        (e._tippy = b),
        (x._tippy = b);
      var S = y.map(function (e) {
          return e.fn(b);
        }),
        E = e.hasAttribute("aria-expanded");
      return (
        Y(),
        D(),
        L(),
        k("onCreate", [b]),
        c.showOnCreate && ee(),
        x.addEventListener("mouseenter", function () {
          b.props.interactive && b.state.isVisible && b.clearDelayTimeouts();
        }),
        x.addEventListener("mouseleave", function () {
          b.props.interactive &&
            b.props.trigger.indexOf("mouseenter") >= 0 &&
            O().addEventListener("mousemove", g);
        }),
        b
      );
      function T() {
        var e = b.props.touch;
        return Array.isArray(e) ? e : [e, 0];
      }
      function $() {
        return "hold" === T()[0];
      }
      function M() {
        var e;
        return !(null == (e = b.props.render) || !e.$$tippy);
      }
      function I() {
        return l || e;
      }
      function O() {
        var e = I().parentNode;
        return e ? qe(e) : document;
      }
      function z() {
        return lt(x);
      }
      function P(e) {
        return (b.state.isMounted && !b.state.isVisible) ||
          We.isTouch ||
          (a && "focus" === a.type)
          ? 0
          : Oe(b.props.delay, e ? 0 : 1, tt.delay);
      }
      function L(e) {
        void 0 === e && (e = !1),
          (x.style.pointerEvents = b.props.interactive && !e ? "" : "none"),
          (x.style.zIndex = "" + b.props.zIndex);
      }
      function k(e, t, s) {
        var i;
        (void 0 === s && (s = !0),
        S.forEach(function (s) {
          s[e] && s[e].apply(s, t);
        }),
        s) && (i = b.props)[e].apply(i, t);
      }
      function A() {
        var t = b.props.aria;
        if (t.content) {
          var s = "aria-" + t.content,
            i = x.id;
          ke(b.props.triggerTarget || e).forEach(function (e) {
            var t = e.getAttribute(s);
            if (b.state.isVisible) e.setAttribute(s, t ? t + " " + i : i);
            else {
              var n = t && t.replace(i, "").trim();
              n ? e.setAttribute(s, n) : e.removeAttribute(s);
            }
          });
        }
      }
      function D() {
        !E &&
          b.props.aria.expanded &&
          ke(b.props.triggerTarget || e).forEach(function (e) {
            b.props.interactive
              ? e.setAttribute(
                  "aria-expanded",
                  b.state.isVisible && e === I() ? "true" : "false"
                )
              : e.removeAttribute("aria-expanded");
          });
      }
      function B() {
        O().removeEventListener("mousemove", g),
          (pt = pt.filter(function (e) {
            return e !== g;
          }));
      }
      function G(t) {
        if (!We.isTouch || (!h && "mousedown" !== t.type)) {
          var s = (t.composedPath && t.composedPath()[0]) || t.target;
          if (!b.props.interactive || !Ve(x, s)) {
            if (
              ke(b.props.triggerTarget || e).some(function (e) {
                return Ve(e, s);
              })
            ) {
              if (We.isTouch) return;
              if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0)
                return;
            } else k("onClickOutside", [b, t]);
            !0 === b.props.hideOnClick &&
              (b.clearDelayTimeouts(),
              b.hide(),
              (u = !0),
              setTimeout(function () {
                u = !1;
              }),
              b.state.isMounted || R());
          }
        }
      }
      function H() {
        h = !0;
      }
      function N() {
        h = !1;
      }
      function _() {
        var e = O();
        e.addEventListener("mousedown", G, !0),
          e.addEventListener("touchend", G, Me),
          e.addEventListener("touchstart", N, Me),
          e.addEventListener("touchmove", H, Me);
      }
      function R() {
        var e = O();
        e.removeEventListener("mousedown", G, !0),
          e.removeEventListener("touchend", G, Me),
          e.removeEventListener("touchstart", N, Me),
          e.removeEventListener("touchmove", H, Me);
      }
      function j(e, t) {
        var s = z().box;
        function i(e) {
          e.target === s && (Fe(s, "remove", i), t());
        }
        if (0 === e) return t();
        Fe(s, "remove", r), Fe(s, "add", i), (r = i);
      }
      function X(t, s, i) {
        void 0 === i && (i = !1),
          ke(b.props.triggerTarget || e).forEach(function (e) {
            e.addEventListener(t, s, i),
              f.push({ node: e, eventType: t, handler: s, options: i });
          });
      }
      function Y() {
        var e;
        $() &&
          (X("touchstart", F, { passive: !0 }),
          X("touchend", W, { passive: !0 })),
          ((e = b.props.trigger), e.split(/\s+/).filter(Boolean)).forEach(
            function (e) {
              if ("manual" !== e)
                switch ((X(e, F), e)) {
                  case "mouseenter":
                    X("mouseleave", W);
                    break;
                  case "focus":
                    X(Je ? "focusout" : "blur", U);
                    break;
                  case "focusin":
                    X("focusout", U);
                }
            }
          );
      }
      function q() {
        f.forEach(function (e) {
          var t = e.node,
            s = e.eventType,
            i = e.handler,
            n = e.options;
          t.removeEventListener(s, i, n);
        }),
          (f = []);
      }
      function F(e) {
        var t,
          s = !1;
        if (b.state.isEnabled && !Z(e) && !u) {
          var i = "focus" === (null == (t = a) ? void 0 : t.type);
          (a = e),
            (l = e.currentTarget),
            D(),
            !b.state.isVisible &&
              _e(e) &&
              pt.forEach(function (t) {
                return t(e);
              }),
            "click" === e.type &&
            (b.props.trigger.indexOf("mouseenter") < 0 || p) &&
            !1 !== b.props.hideOnClick &&
            b.state.isVisible
              ? (s = !0)
              : ee(e),
            "click" === e.type && (p = !s),
            s && !i && te(e);
        }
      }
      function V(e) {
        var t = e.target,
          s = I().contains(t) || x.contains(t);
        if ("mousemove" !== e.type || !s) {
          var i = J()
            .concat(x)
            .map(function (e) {
              var t,
                s = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
              return s
                ? {
                    popperRect: e.getBoundingClientRect(),
                    popperState: s,
                    props: c,
                  }
                : null;
            })
            .filter(Boolean);
          (function (e, t) {
            var s = t.clientX,
              i = t.clientY;
            return e.every(function (e) {
              var t = e.popperRect,
                n = e.popperState,
                a = e.props.interactiveBorder,
                r = De(n.placement),
                o = n.modifiersData.offset;
              if (!o) return !0;
              var l = "bottom" === r ? o.top.y : 0,
                d = "top" === r ? o.bottom.y : 0,
                c = "right" === r ? o.left.x : 0,
                p = "left" === r ? o.right.x : 0,
                u = t.top - i + l > a,
                h = i - t.bottom - d > a,
                m = t.left - s + c > a,
                f = s - t.right - p > a;
              return u || h || m || f;
            });
          })(i, e) && (B(), te(e));
        }
      }
      function W(e) {
        Z(e) ||
          (b.props.trigger.indexOf("click") >= 0 && p) ||
          (b.props.interactive ? b.hideWithInteractivity(e) : te(e));
      }
      function U(e) {
        (b.props.trigger.indexOf("focusin") < 0 && e.target !== I()) ||
          (b.props.interactive &&
            e.relatedTarget &&
            x.contains(e.relatedTarget)) ||
          te(e);
      }
      function Z(e) {
        return !!We.isTouch && $() !== e.type.indexOf("touch") >= 0;
      }
      function K() {
        Q();
        var t = b.props,
          s = t.popperOptions,
          i = t.placement,
          n = t.offset,
          a = t.getReferenceClientRect,
          r = t.moveTransition,
          l = M() ? lt(x).arrow : null,
          d = a
            ? {
                getBoundingClientRect: a,
                contextElement: a.contextElement || I(),
              }
            : e,
          c = {
            name: "$$tippy",
            enabled: !0,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: function (e) {
              var t = e.state;
              if (M()) {
                var s = z().box;
                ["placement", "reference-hidden", "escaped"].forEach(function (
                  e
                ) {
                  "placement" === e
                    ? s.setAttribute("data-placement", t.placement)
                    : t.attributes.popper["data-popper-" + e]
                    ? s.setAttribute("data-" + e, "")
                    : s.removeAttribute("data-" + e);
                }),
                  (t.attributes.popper = {});
              }
            },
          },
          p = [
            { name: "offset", options: { offset: n } },
            {
              name: "preventOverflow",
              options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
            },
            { name: "flip", options: { padding: 5 } },
            { name: "computeStyles", options: { adaptive: !r } },
            c,
          ];
        M() &&
          l &&
          p.push({ name: "arrow", options: { element: l, padding: 3 } }),
          p.push.apply(p, (null == s ? void 0 : s.modifiers) || []),
          (b.popperInstance = Ce(
            d,
            x,
            Object.assign({}, s, {
              placement: i,
              onFirstUpdate: o,
              modifiers: p,
            })
          ));
      }
      function Q() {
        b.popperInstance &&
          (b.popperInstance.destroy(), (b.popperInstance = null));
      }
      function J() {
        return Be(x.querySelectorAll("[data-tippy-root]"));
      }
      function ee(e) {
        b.clearDelayTimeouts(), e && k("onTrigger", [b, e]), _();
        var t = P(!0),
          i = T(),
          n = i[0],
          a = i[1];
        We.isTouch && "hold" === n && a && (t = a),
          t
            ? (s = setTimeout(function () {
                b.show();
              }, t))
            : b.show();
      }
      function te(e) {
        if (
          (b.clearDelayTimeouts(), k("onUntrigger", [b, e]), b.state.isVisible)
        ) {
          if (
            !(
              b.props.trigger.indexOf("mouseenter") >= 0 &&
              b.props.trigger.indexOf("click") >= 0 &&
              ["mouseleave", "mousemove"].indexOf(e.type) >= 0 &&
              p
            )
          ) {
            var t = P(!1);
            t
              ? (i = setTimeout(function () {
                  b.state.isVisible && b.hide();
                }, t))
              : (n = requestAnimationFrame(function () {
                  b.hide();
                }));
          }
        } else R();
      }
    }
    function mt(e, t) {
      void 0 === t && (t = {});
      var s = tt.plugins.concat(t.plugins || []);
      document.addEventListener("touchstart", Ze, Me),
        window.addEventListener("blur", Qe);
      var i = Object.assign({}, t, { plugins: s }),
        n = je(e).reduce(function (e, t) {
          var s = t && ht(t, i);
          return s && e.push(s), e;
        }, []);
      return Ne(e) ? n[0] : n;
    }
    (mt.defaultProps = tt),
      (mt.setDefaultProps = function (e) {
        Object.keys(e).forEach(function (t) {
          tt[t] = e[t];
        });
      }),
      (mt.currentInput = We);
    Object.assign({}, ne, {
      effect: function (e) {
        var t = e.state,
          s = {
            popper: {
              position: t.options.strategy,
              left: "0",
              top: "0",
              margin: "0",
            },
            arrow: { position: "absolute" },
            reference: {},
          };
        Object.assign(t.elements.popper.style, s.popper),
          (t.styles = s),
          t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow);
      },
    });
    mt.setDefaultProps({ render: dt });
    var ft, gt;
    mt("[data-tippy-content]", {}),
      (ft = void 0),
      (gt = function () {
        function e(e) {
          return (
            null !== e &&
            "object" == typeof e &&
            "constructor" in e &&
            e.constructor === Object
          );
        }
        function t(s, i) {
          void 0 === s && (s = {}),
            void 0 === i && (i = {}),
            Object.keys(i).forEach((n) => {
              void 0 === s[n]
                ? (s[n] = i[n])
                : e(i[n]) &&
                  e(s[n]) &&
                  Object.keys(i[n]).length > 0 &&
                  t(s[n], i[n]);
            });
        }
        const s = {
          body: {},
          addEventListener() {},
          removeEventListener() {},
          activeElement: { blur() {}, nodeName: "" },
          querySelector: () => null,
          querySelectorAll: () => [],
          getElementById: () => null,
          createEvent: () => ({ initEvent() {} }),
          createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => [],
          }),
          createElementNS: () => ({}),
          importNode: () => null,
          location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
          },
        };
        function i() {
          const e = "undefined" != typeof document ? document : {};
          return t(e, s), e;
        }
        const n = {
          document: s,
          navigator: { userAgent: "" },
          location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
          },
          history: { replaceState() {}, pushState() {}, go() {}, back() {} },
          CustomEvent: function () {
            return this;
          },
          addEventListener() {},
          removeEventListener() {},
          getComputedStyle: () => ({ getPropertyValue: () => "" }),
          Image() {},
          Date() {},
          screen: {},
          setTimeout() {},
          clearTimeout() {},
          matchMedia: () => ({}),
          requestAnimationFrame: (e) =>
            "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
          cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e);
          },
        };
        function a() {
          const e = "undefined" != typeof window ? window : {};
          return t(e, n), e;
        }
        class r extends Array {
          constructor(e) {
            "number" == typeof e
              ? super(e)
              : (super(...(e || [])),
                (function (e) {
                  const t = e.__proto__;
                  Object.defineProperty(e, "__proto__", {
                    get: () => t,
                    set(e) {
                      t.__proto__ = e;
                    },
                  });
                })(this));
          }
        }
        function o(e) {
          void 0 === e && (e = []);
          const t = [];
          return (
            e.forEach((e) => {
              Array.isArray(e) ? t.push(...o(e)) : t.push(e);
            }),
            t
          );
        }
        function l(e, t) {
          return Array.prototype.filter.call(e, t);
        }
        function d(e, t) {
          const s = a(),
            n = i();
          let o = [];
          if (!t && e instanceof r) return e;
          if (!e) return new r(o);
          if ("string" == typeof e) {
            const s = e.trim();
            if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
              let e = "div";
              0 === s.indexOf("<li") && (e = "ul"),
                0 === s.indexOf("<tr") && (e = "tbody"),
                (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) ||
                  (e = "tr"),
                0 === s.indexOf("<tbody") && (e = "table"),
                0 === s.indexOf("<option") && (e = "select");
              const t = n.createElement(e);
              t.innerHTML = s;
              for (let e = 0; e < t.childNodes.length; e += 1)
                o.push(t.childNodes[e]);
            } else
              o = (function (e, t) {
                if ("string" != typeof e) return [e];
                const s = [],
                  i = t.querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                return s;
              })(e.trim(), t || n);
          } else if (e.nodeType || e === s || e === n) o.push(e);
          else if (Array.isArray(e)) {
            if (e instanceof r) return e;
            o = e;
          }
          return new r(
            (function (e) {
              const t = [];
              for (let s = 0; s < e.length; s += 1)
                -1 === t.indexOf(e[s]) && t.push(e[s]);
              return t;
            })(o)
          );
        }
        d.fn = r.prototype;
        const c = {
          addClass: function () {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
              t[s] = arguments[s];
            const i = o(t.map((e) => e.split(" ")));
            return (
              this.forEach((e) => {
                e.classList.add(...i);
              }),
              this
            );
          },
          removeClass: function () {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
              t[s] = arguments[s];
            const i = o(t.map((e) => e.split(" ")));
            return (
              this.forEach((e) => {
                e.classList.remove(...i);
              }),
              this
            );
          },
          hasClass: function () {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
              t[s] = arguments[s];
            const i = o(t.map((e) => e.split(" ")));
            return (
              l(
                this,
                (e) => i.filter((t) => e.classList.contains(t)).length > 0
              ).length > 0
            );
          },
          toggleClass: function () {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
              t[s] = arguments[s];
            const i = o(t.map((e) => e.split(" ")));
            this.forEach((e) => {
              i.forEach((t) => {
                e.classList.toggle(t);
              });
            });
          },
          attr: function (e, t) {
            if (1 === arguments.length && "string" == typeof e)
              return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
              if (2 === arguments.length) this[s].setAttribute(e, t);
              else
                for (const t in e)
                  (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
            return this;
          },
          removeAttr: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this;
          },
          transform: function (e) {
            for (let t = 0; t < this.length; t += 1)
              this[t].style.transform = e;
            return this;
          },
          transition: function (e) {
            for (let t = 0; t < this.length; t += 1)
              this[t].style.transitionDuration =
                "string" != typeof e ? `${e}ms` : e;
            return this;
          },
          on: function () {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
              t[s] = arguments[s];
            let [i, n, a, r] = t;
            function o(e) {
              const t = e.target;
              if (!t) return;
              const s = e.target.dom7EventData || [];
              if ((s.indexOf(e) < 0 && s.unshift(e), d(t).is(n))) a.apply(t, s);
              else {
                const e = d(t).parents();
                for (let t = 0; t < e.length; t += 1)
                  d(e[t]).is(n) && a.apply(e[t], s);
              }
            }
            function l(e) {
              const t = (e && e.target && e.target.dom7EventData) || [];
              t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t);
            }
            "function" == typeof t[1] && (([i, a, r] = t), (n = void 0)),
              r || (r = !1);
            const c = i.split(" ");
            let p;
            for (let e = 0; e < this.length; e += 1) {
              const t = this[e];
              if (n)
                for (p = 0; p < c.length; p += 1) {
                  const e = c[p];
                  t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                    t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                    t.dom7LiveListeners[e].push({
                      listener: a,
                      proxyListener: o,
                    }),
                    t.addEventListener(e, o, r);
                }
              else
                for (p = 0; p < c.length; p += 1) {
                  const e = c[p];
                  t.dom7Listeners || (t.dom7Listeners = {}),
                    t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                    t.dom7Listeners[e].push({ listener: a, proxyListener: l }),
                    t.addEventListener(e, l, r);
                }
            }
            return this;
          },
          off: function () {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
              t[s] = arguments[s];
            let [i, n, a, r] = t;
            "function" == typeof t[1] && (([i, a, r] = t), (n = void 0)),
              r || (r = !1);
            const o = i.split(" ");
            for (let e = 0; e < o.length; e += 1) {
              const t = o[e];
              for (let e = 0; e < this.length; e += 1) {
                const s = this[e];
                let i;
                if (
                  (!n && s.dom7Listeners
                    ? (i = s.dom7Listeners[t])
                    : n && s.dom7LiveListeners && (i = s.dom7LiveListeners[t]),
                  i && i.length)
                )
                  for (let e = i.length - 1; e >= 0; e -= 1) {
                    const n = i[e];
                    (a && n.listener === a) ||
                    (a &&
                      n.listener &&
                      n.listener.dom7proxy &&
                      n.listener.dom7proxy === a)
                      ? (s.removeEventListener(t, n.proxyListener, r),
                        i.splice(e, 1))
                      : a ||
                        (s.removeEventListener(t, n.proxyListener, r),
                        i.splice(e, 1));
                  }
              }
            }
            return this;
          },
          trigger: function () {
            const e = a();
            for (var t = arguments.length, s = new Array(t), i = 0; i < t; i++)
              s[i] = arguments[i];
            const n = s[0].split(" "),
              r = s[1];
            for (let t = 0; t < n.length; t += 1) {
              const i = n[t];
              for (let t = 0; t < this.length; t += 1) {
                const n = this[t];
                if (e.CustomEvent) {
                  const t = new e.CustomEvent(i, {
                    detail: r,
                    bubbles: !0,
                    cancelable: !0,
                  });
                  (n.dom7EventData = s.filter((e, t) => t > 0)),
                    n.dispatchEvent(t),
                    (n.dom7EventData = []),
                    delete n.dom7EventData;
                }
              }
            }
            return this;
          },
          transitionEnd: function (e) {
            const t = this;
            return (
              e &&
                t.on("transitionend", function s(i) {
                  i.target === this &&
                    (e.call(this, i), t.off("transitionend", s));
                }),
              this
            );
          },
          outerWidth: function (e) {
            if (this.length > 0) {
              if (e) {
                const e = this.styles();
                return (
                  this[0].offsetWidth +
                  parseFloat(e.getPropertyValue("margin-right")) +
                  parseFloat(e.getPropertyValue("margin-left"))
                );
              }
              return this[0].offsetWidth;
            }
            return null;
          },
          outerHeight: function (e) {
            if (this.length > 0) {
              if (e) {
                const e = this.styles();
                return (
                  this[0].offsetHeight +
                  parseFloat(e.getPropertyValue("margin-top")) +
                  parseFloat(e.getPropertyValue("margin-bottom"))
                );
              }
              return this[0].offsetHeight;
            }
            return null;
          },
          styles: function () {
            const e = a();
            return this[0] ? e.getComputedStyle(this[0], null) : {};
          },
          offset: function () {
            if (this.length > 0) {
              const e = a(),
                t = i(),
                s = this[0],
                n = s.getBoundingClientRect(),
                r = t.body,
                o = s.clientTop || r.clientTop || 0,
                l = s.clientLeft || r.clientLeft || 0,
                d = s === e ? e.scrollY : s.scrollTop,
                c = s === e ? e.scrollX : s.scrollLeft;
              return { top: n.top + d - o, left: n.left + c - l };
            }
            return null;
          },
          css: function (e, t) {
            const s = a();
            let i;
            if (1 === arguments.length) {
              if ("string" != typeof e) {
                for (i = 0; i < this.length; i += 1)
                  for (const t in e) this[i].style[t] = e[t];
                return this;
              }
              if (this[0])
                return s.getComputedStyle(this[0], null).getPropertyValue(e);
            }
            if (2 === arguments.length && "string" == typeof e) {
              for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
              return this;
            }
            return this;
          },
          each: function (e) {
            return e
              ? (this.forEach((t, s) => {
                  e.apply(t, [t, s]);
                }),
                this)
              : this;
          },
          html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this;
          },
          text: function (e) {
            if (void 0 === e)
              return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this;
          },
          is: function (e) {
            const t = a(),
              s = i(),
              n = this[0];
            let o, l;
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
              if (n.matches) return n.matches(e);
              if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
              if (n.msMatchesSelector) return n.msMatchesSelector(e);
              for (o = d(e), l = 0; l < o.length; l += 1)
                if (o[l] === n) return !0;
              return !1;
            }
            if (e === s) return n === s;
            if (e === t) return n === t;
            if (e.nodeType || e instanceof r) {
              for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
                if (o[l] === n) return !0;
              return !1;
            }
            return !1;
          },
          index: function () {
            let e,
              t = this[0];
            if (t) {
              for (e = 0; null !== (t = t.previousSibling); )
                1 === t.nodeType && (e += 1);
              return e;
            }
          },
          eq: function (e) {
            if (void 0 === e) return this;
            const t = this.length;
            if (e > t - 1) return d([]);
            if (e < 0) {
              const s = t + e;
              return d(s < 0 ? [] : [this[s]]);
            }
            return d([this[e]]);
          },
          append: function () {
            let e;
            const t = i();
            for (let s = 0; s < arguments.length; s += 1) {
              e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
              for (let s = 0; s < this.length; s += 1)
                if ("string" == typeof e) {
                  const i = t.createElement("div");
                  for (i.innerHTML = e; i.firstChild; )
                    this[s].appendChild(i.firstChild);
                } else if (e instanceof r)
                  for (let t = 0; t < e.length; t += 1)
                    this[s].appendChild(e[t]);
                else this[s].appendChild(e);
            }
            return this;
          },
          prepend: function (e) {
            const t = i();
            let s, n;
            for (s = 0; s < this.length; s += 1)
              if ("string" == typeof e) {
                const i = t.createElement("div");
                for (
                  i.innerHTML = e, n = i.childNodes.length - 1;
                  n >= 0;
                  n -= 1
                )
                  this[s].insertBefore(i.childNodes[n], this[s].childNodes[0]);
              } else if (e instanceof r)
                for (n = 0; n < e.length; n += 1)
                  this[s].insertBefore(e[n], this[s].childNodes[0]);
              else this[s].insertBefore(e, this[s].childNodes[0]);
            return this;
          },
          next: function (e) {
            return this.length > 0
              ? e
                ? this[0].nextElementSibling &&
                  d(this[0].nextElementSibling).is(e)
                  ? d([this[0].nextElementSibling])
                  : d([])
                : this[0].nextElementSibling
                ? d([this[0].nextElementSibling])
                : d([])
              : d([]);
          },
          nextAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return d([]);
            for (; s.nextElementSibling; ) {
              const i = s.nextElementSibling;
              e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
            }
            return d(t);
          },
          prev: function (e) {
            if (this.length > 0) {
              const t = this[0];
              return e
                ? t.previousElementSibling && d(t.previousElementSibling).is(e)
                  ? d([t.previousElementSibling])
                  : d([])
                : t.previousElementSibling
                ? d([t.previousElementSibling])
                : d([]);
            }
            return d([]);
          },
          prevAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return d([]);
            for (; s.previousElementSibling; ) {
              const i = s.previousElementSibling;
              e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
            }
            return d(t);
          },
          parent: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1)
              null !== this[s].parentNode &&
                (e
                  ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
                  : t.push(this[s].parentNode));
            return d(t);
          },
          parents: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
              let i = this[s].parentNode;
              for (; i; )
                e ? d(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
            }
            return d(t);
          },
          closest: function (e) {
            let t = this;
            return void 0 === e
              ? d([])
              : (t.is(e) || (t = t.parents(e).eq(0)), t);
          },
          find: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
              const i = this[s].querySelectorAll(e);
              for (let e = 0; e < i.length; e += 1) t.push(i[e]);
            }
            return d(t);
          },
          children: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
              const i = this[s].children;
              for (let s = 0; s < i.length; s += 1)
                (e && !d(i[s]).is(e)) || t.push(i[s]);
            }
            return d(t);
          },
          filter: function (e) {
            return d(l(this, e));
          },
          remove: function () {
            for (let e = 0; e < this.length; e += 1)
              this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this;
          },
        };
        function p(e, t) {
          return void 0 === t && (t = 0), setTimeout(e, t);
        }
        function u() {
          return Date.now();
        }
        function h(e, t) {
          void 0 === t && (t = "x");
          const s = a();
          let i, n, r;
          const o = (function (e) {
            const t = a();
            let s;
            return (
              t.getComputedStyle && (s = t.getComputedStyle(e, null)),
              !s && e.currentStyle && (s = e.currentStyle),
              s || (s = e.style),
              s
            );
          })(e);
          return (
            s.WebKitCSSMatrix
              ? ((n = o.transform || o.webkitTransform),
                n.split(",").length > 6 &&
                  (n = n
                    .split(", ")
                    .map((e) => e.replace(",", "."))
                    .join(", ")),
                (r = new s.WebKitCSSMatrix("none" === n ? "" : n)))
              : ((r =
                  o.MozTransform ||
                  o.OTransform ||
                  o.MsTransform ||
                  o.msTransform ||
                  o.transform ||
                  o
                    .getPropertyValue("transform")
                    .replace("translate(", "matrix(1, 0, 0, 1,")),
                (i = r.toString().split(","))),
            "x" === t &&
              (n = s.WebKitCSSMatrix
                ? r.m41
                : 16 === i.length
                ? parseFloat(i[12])
                : parseFloat(i[4])),
            "y" === t &&
              (n = s.WebKitCSSMatrix
                ? r.m42
                : 16 === i.length
                ? parseFloat(i[13])
                : parseFloat(i[5])),
            n || 0
          );
        }
        function m(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            "Object" === Object.prototype.toString.call(e).slice(8, -1)
          );
        }
        function f(e) {
          return "undefined" != typeof window && void 0 !== window.HTMLElement
            ? e instanceof HTMLElement
            : e && (1 === e.nodeType || 11 === e.nodeType);
        }
        function g() {
          const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
          for (let s = 1; s < arguments.length; s += 1) {
            const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
            if (null != i && !f(i)) {
              const s = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
              for (let t = 0, n = s.length; t < n; t += 1) {
                const n = s[t],
                  a = Object.getOwnPropertyDescriptor(i, n);
                void 0 !== a &&
                  a.enumerable &&
                  (m(e[n]) && m(i[n])
                    ? i[n].__swiper__
                      ? (e[n] = i[n])
                      : g(e[n], i[n])
                    : !m(e[n]) && m(i[n])
                    ? ((e[n] = {}),
                      i[n].__swiper__ ? (e[n] = i[n]) : g(e[n], i[n]))
                    : (e[n] = i[n]));
              }
            }
          }
          return e;
        }
        function v(e, t, s) {
          e.style.setProperty(t, s);
        }
        function y(e) {
          let { swiper: t, targetPosition: s, side: i } = e;
          const n = a(),
            r = -t.translate;
          let o,
            l = null;
          const d = t.params.speed;
          (t.wrapperEl.style.scrollSnapType = "none"),
            n.cancelAnimationFrame(t.cssModeFrameID);
          const c = s > r ? "next" : "prev",
            p = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
            u = () => {
              (o = new Date().getTime()), null === l && (l = o);
              const e = Math.max(Math.min((o - l) / d, 1), 0),
                a = 0.5 - Math.cos(e * Math.PI) / 2;
              let c = r + a * (s - r);
              if (
                (p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s))
              )
                return (
                  (t.wrapperEl.style.overflow = "hidden"),
                  (t.wrapperEl.style.scrollSnapType = ""),
                  setTimeout(() => {
                    (t.wrapperEl.style.overflow = ""),
                      t.wrapperEl.scrollTo({ [i]: c });
                  }),
                  void n.cancelAnimationFrame(t.cssModeFrameID)
                );
              t.cssModeFrameID = n.requestAnimationFrame(u);
            };
          u();
        }
        let b, w, x;
        function C() {
          return (
            b ||
              (b = (function () {
                const e = a(),
                  t = i();
                return {
                  smoothScroll:
                    t.documentElement &&
                    "scrollBehavior" in t.documentElement.style,
                  touch: !!(
                    "ontouchstart" in e ||
                    (e.DocumentTouch && t instanceof e.DocumentTouch)
                  ),
                  passiveListener: (function () {
                    let t = !1;
                    try {
                      const s = Object.defineProperty({}, "passive", {
                        get() {
                          t = !0;
                        },
                      });
                      e.addEventListener("testPassiveListener", null, s);
                    } catch (e) {}
                    return t;
                  })(),
                  gestures: "ongesturestart" in e,
                };
              })()),
            b
          );
        }
        function S(e) {
          return (
            void 0 === e && (e = {}),
            w ||
              (w = (function (e) {
                let { userAgent: t } = void 0 === e ? {} : e;
                const s = C(),
                  i = a(),
                  n = i.navigator.platform,
                  r = t || i.navigator.userAgent,
                  o = { ios: !1, android: !1 },
                  l = i.screen.width,
                  d = i.screen.height,
                  c = r.match(/(Android);?[\s\/]+([\d.]+)?/);
                let p = r.match(/(iPad).*OS\s([\d_]+)/);
                const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                  h = !p && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                  m = "Win32" === n;
                let f = "MacIntel" === n;
                return (
                  !p &&
                    f &&
                    s.touch &&
                    [
                      "1024x1366",
                      "1366x1024",
                      "834x1194",
                      "1194x834",
                      "834x1112",
                      "1112x834",
                      "768x1024",
                      "1024x768",
                      "820x1180",
                      "1180x820",
                      "810x1080",
                      "1080x810",
                    ].indexOf(`${l}x${d}`) >= 0 &&
                    ((p = r.match(/(Version)\/([\d.]+)/)),
                    p || (p = [0, 1, "13_0_0"]),
                    (f = !1)),
                  c && !m && ((o.os = "android"), (o.android = !0)),
                  (p || h || u) && ((o.os = "ios"), (o.ios = !0)),
                  o
                );
              })(e)),
            w
          );
        }
        function E() {
          return (
            x ||
              (x = (function () {
                const e = a();
                return {
                  isSafari: (function () {
                    const t = e.navigator.userAgent.toLowerCase();
                    return (
                      t.indexOf("safari") >= 0 &&
                      t.indexOf("chrome") < 0 &&
                      t.indexOf("android") < 0
                    );
                  })(),
                  isWebView:
                    /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                      e.navigator.userAgent
                    ),
                };
              })()),
            x
          );
        }
        Object.keys(c).forEach((e) => {
          Object.defineProperty(d.fn, e, { value: c[e], writable: !0 });
        });
        var T = {
            on(e, t, s) {
              const i = this;
              if (!i.eventsListeners || i.destroyed) return i;
              if ("function" != typeof t) return i;
              const n = s ? "unshift" : "push";
              return (
                e.split(" ").forEach((e) => {
                  i.eventsListeners[e] || (i.eventsListeners[e] = []),
                    i.eventsListeners[e][n](t);
                }),
                i
              );
            },
            once(e, t, s) {
              const i = this;
              if (!i.eventsListeners || i.destroyed) return i;
              if ("function" != typeof t) return i;
              function n() {
                i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                for (
                  var s = arguments.length, a = new Array(s), r = 0;
                  r < s;
                  r++
                )
                  a[r] = arguments[r];
                t.apply(i, a);
              }
              return (n.__emitterProxy = t), i.on(e, n, s);
            },
            onAny(e, t) {
              const s = this;
              if (!s.eventsListeners || s.destroyed) return s;
              if ("function" != typeof e) return s;
              const i = t ? "unshift" : "push";
              return (
                s.eventsAnyListeners.indexOf(e) < 0 &&
                  s.eventsAnyListeners[i](e),
                s
              );
            },
            offAny(e) {
              const t = this;
              if (!t.eventsListeners || t.destroyed) return t;
              if (!t.eventsAnyListeners) return t;
              const s = t.eventsAnyListeners.indexOf(e);
              return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
            },
            off(e, t) {
              const s = this;
              return !s.eventsListeners || s.destroyed
                ? s
                : s.eventsListeners
                ? (e.split(" ").forEach((e) => {
                    void 0 === t
                      ? (s.eventsListeners[e] = [])
                      : s.eventsListeners[e] &&
                        s.eventsListeners[e].forEach((i, n) => {
                          (i === t ||
                            (i.__emitterProxy && i.__emitterProxy === t)) &&
                            s.eventsListeners[e].splice(n, 1);
                        });
                  }),
                  s)
                : s;
            },
            emit() {
              const e = this;
              if (!e.eventsListeners || e.destroyed) return e;
              if (!e.eventsListeners) return e;
              let t, s, i;
              for (
                var n = arguments.length, a = new Array(n), r = 0;
                r < n;
                r++
              )
                a[r] = arguments[r];
              return (
                "string" == typeof a[0] || Array.isArray(a[0])
                  ? ((t = a[0]), (s = a.slice(1, a.length)), (i = e))
                  : ((t = a[0].events),
                    (s = a[0].data),
                    (i = a[0].context || e)),
                s.unshift(i),
                (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
                  e.eventsAnyListeners &&
                    e.eventsAnyListeners.length &&
                    e.eventsAnyListeners.forEach((e) => {
                      e.apply(i, [t, ...s]);
                    }),
                    e.eventsListeners &&
                      e.eventsListeners[t] &&
                      e.eventsListeners[t].forEach((e) => {
                        e.apply(i, s);
                      });
                }),
                e
              );
            },
          },
          $ = {
            updateSize: function () {
              const e = this;
              let t, s;
              const i = e.$el;
              (t =
                void 0 !== e.params.width && null !== e.params.width
                  ? e.params.width
                  : i[0].clientWidth),
                (s =
                  void 0 !== e.params.height && null !== e.params.height
                    ? e.params.height
                    : i[0].clientHeight),
                (0 === t && e.isHorizontal()) ||
                  (0 === s && e.isVertical()) ||
                  ((t =
                    t -
                    parseInt(i.css("padding-left") || 0, 10) -
                    parseInt(i.css("padding-right") || 0, 10)),
                  (s =
                    s -
                    parseInt(i.css("padding-top") || 0, 10) -
                    parseInt(i.css("padding-bottom") || 0, 10)),
                  Number.isNaN(t) && (t = 0),
                  Number.isNaN(s) && (s = 0),
                  Object.assign(e, {
                    width: t,
                    height: s,
                    size: e.isHorizontal() ? t : s,
                  }));
            },
            updateSlides: function () {
              const e = this;
              function t(t) {
                return e.isHorizontal()
                  ? t
                  : {
                      width: "height",
                      "margin-top": "margin-left",
                      "margin-bottom ": "margin-right",
                      "margin-left": "margin-top",
                      "margin-right": "margin-bottom",
                      "padding-left": "padding-top",
                      "padding-right": "padding-bottom",
                      marginRight: "marginBottom",
                    }[t];
              }
              function s(e, s) {
                return parseFloat(e.getPropertyValue(t(s)) || 0);
              }
              const i = e.params,
                { $wrapperEl: n, size: a, rtlTranslate: r, wrongRTL: o } = e,
                l = e.virtual && i.virtual.enabled,
                d = l ? e.virtual.slides.length : e.slides.length,
                c = n.children(`.${e.params.slideClass}`),
                p = l ? e.virtual.slides.length : c.length;
              let u = [];
              const h = [],
                m = [];
              let f = i.slidesOffsetBefore;
              "function" == typeof f && (f = i.slidesOffsetBefore.call(e));
              let g = i.slidesOffsetAfter;
              "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
              const y = e.snapGrid.length,
                b = e.slidesGrid.length;
              let w = i.spaceBetween,
                x = -f,
                C = 0,
                S = 0;
              if (void 0 === a) return;
              "string" == typeof w &&
                w.indexOf("%") >= 0 &&
                (w = (parseFloat(w.replace("%", "")) / 100) * a),
                (e.virtualSize = -w),
                r
                  ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
                  : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
                i.centeredSlides &&
                  i.cssMode &&
                  (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
                  v(e.wrapperEl, "--swiper-centered-offset-after", ""));
              const E = i.grid && i.grid.rows > 1 && e.grid;
              let T;
              E && e.grid.initSlides(p);
              const $ =
                "auto" === i.slidesPerView &&
                i.breakpoints &&
                Object.keys(i.breakpoints).filter(
                  (e) => void 0 !== i.breakpoints[e].slidesPerView
                ).length > 0;
              for (let n = 0; n < p; n += 1) {
                T = 0;
                const r = c.eq(n);
                if (
                  (E && e.grid.updateSlide(n, r, p, t),
                  "none" !== r.css("display"))
                ) {
                  if ("auto" === i.slidesPerView) {
                    $ && (c[n].style[t("width")] = "");
                    const a = getComputedStyle(r[0]),
                      o = r[0].style.transform,
                      l = r[0].style.webkitTransform;
                    if (
                      (o && (r[0].style.transform = "none"),
                      l && (r[0].style.webkitTransform = "none"),
                      i.roundLengths)
                    )
                      T = e.isHorizontal()
                        ? r.outerWidth(!0)
                        : r.outerHeight(!0);
                    else {
                      const e = s(a, "width"),
                        t = s(a, "padding-left"),
                        i = s(a, "padding-right"),
                        n = s(a, "margin-left"),
                        o = s(a, "margin-right"),
                        l = a.getPropertyValue("box-sizing");
                      if (l && "border-box" === l) T = e + n + o;
                      else {
                        const { clientWidth: s, offsetWidth: a } = r[0];
                        T = e + t + i + n + o + (a - s);
                      }
                    }
                    o && (r[0].style.transform = o),
                      l && (r[0].style.webkitTransform = l),
                      i.roundLengths && (T = Math.floor(T));
                  } else
                    (T = (a - (i.slidesPerView - 1) * w) / i.slidesPerView),
                      i.roundLengths && (T = Math.floor(T)),
                      c[n] && (c[n].style[t("width")] = `${T}px`);
                  c[n] && (c[n].swiperSlideSize = T),
                    m.push(T),
                    i.centeredSlides
                      ? ((x = x + T / 2 + C / 2 + w),
                        0 === C && 0 !== n && (x = x - a / 2 - w),
                        0 === n && (x = x - a / 2 - w),
                        Math.abs(x) < 0.001 && (x = 0),
                        i.roundLengths && (x = Math.floor(x)),
                        S % i.slidesPerGroup == 0 && u.push(x),
                        h.push(x))
                      : (i.roundLengths && (x = Math.floor(x)),
                        (S - Math.min(e.params.slidesPerGroupSkip, S)) %
                          e.params.slidesPerGroup ==
                          0 && u.push(x),
                        h.push(x),
                        (x = x + T + w)),
                    (e.virtualSize += T + w),
                    (C = T),
                    (S += 1);
                }
              }
              if (
                ((e.virtualSize = Math.max(e.virtualSize, a) + g),
                r &&
                  o &&
                  ("slide" === i.effect || "coverflow" === i.effect) &&
                  n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
                i.setWrapperSize &&
                  n.css({
                    [t("width")]: `${e.virtualSize + i.spaceBetween}px`,
                  }),
                E && e.grid.updateWrapperSize(T, u, t),
                !i.centeredSlides)
              ) {
                const t = [];
                for (let s = 0; s < u.length; s += 1) {
                  let n = u[s];
                  i.roundLengths && (n = Math.floor(n)),
                    u[s] <= e.virtualSize - a && t.push(n);
                }
                (u = t),
                  Math.floor(e.virtualSize - a) - Math.floor(u[u.length - 1]) >
                    1 && u.push(e.virtualSize - a);
              }
              if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
                const s =
                  e.isHorizontal() && r ? "marginLeft" : t("marginRight");
                c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({
                  [s]: `${w}px`,
                });
              }
              if (i.centeredSlides && i.centeredSlidesBounds) {
                let e = 0;
                m.forEach((t) => {
                  e += t + (i.spaceBetween ? i.spaceBetween : 0);
                }),
                  (e -= i.spaceBetween);
                const t = e - a;
                u = u.map((e) => (e < 0 ? -f : e > t ? t + g : e));
              }
              if (i.centerInsufficientSlides) {
                let e = 0;
                if (
                  (m.forEach((t) => {
                    e += t + (i.spaceBetween ? i.spaceBetween : 0);
                  }),
                  (e -= i.spaceBetween),
                  e < a)
                ) {
                  const t = (a - e) / 2;
                  u.forEach((e, s) => {
                    u[s] = e - t;
                  }),
                    h.forEach((e, s) => {
                      h[s] = e + t;
                    });
                }
              }
              if (
                (Object.assign(e, {
                  slides: c,
                  snapGrid: u,
                  slidesGrid: h,
                  slidesSizesGrid: m,
                }),
                i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
              ) {
                v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
                  v(
                    e.wrapperEl,
                    "--swiper-centered-offset-after",
                    e.size / 2 - m[m.length - 1] / 2 + "px"
                  );
                const t = -e.snapGrid[0],
                  s = -e.slidesGrid[0];
                (e.snapGrid = e.snapGrid.map((e) => e + t)),
                  (e.slidesGrid = e.slidesGrid.map((e) => e + s));
              }
              if (
                (p !== d && e.emit("slidesLengthChange"),
                u.length !== y &&
                  (e.params.watchOverflow && e.checkOverflow(),
                  e.emit("snapGridLengthChange")),
                h.length !== b && e.emit("slidesGridLengthChange"),
                i.watchSlidesProgress && e.updateSlidesOffset(),
                !(
                  l ||
                  i.cssMode ||
                  ("slide" !== i.effect && "fade" !== i.effect)
                ))
              ) {
                const t = `${i.containerModifierClass}backface-hidden`,
                  s = e.$el.hasClass(t);
                p <= i.maxBackfaceHiddenSlides
                  ? s || e.$el.addClass(t)
                  : s && e.$el.removeClass(t);
              }
            },
            updateAutoHeight: function (e) {
              const t = this,
                s = [],
                i = t.virtual && t.params.virtual.enabled;
              let n,
                a = 0;
              "number" == typeof e
                ? t.setTransition(e)
                : !0 === e && t.setTransition(t.params.speed);
              const r = (e) =>
                i
                  ? t.slides.filter(
                      (t) =>
                        parseInt(
                          t.getAttribute("data-swiper-slide-index"),
                          10
                        ) === e
                    )[0]
                  : t.slides.eq(e)[0];
              if (
                "auto" !== t.params.slidesPerView &&
                t.params.slidesPerView > 1
              )
                if (t.params.centeredSlides)
                  (t.visibleSlides || d([])).each((e) => {
                    s.push(e);
                  });
                else
                  for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                    const e = t.activeIndex + n;
                    if (e > t.slides.length && !i) break;
                    s.push(r(e));
                  }
              else s.push(r(t.activeIndex));
              for (n = 0; n < s.length; n += 1)
                if (void 0 !== s[n]) {
                  const e = s[n].offsetHeight;
                  a = e > a ? e : a;
                }
              (a || 0 === a) && t.$wrapperEl.css("height", `${a}px`);
            },
            updateSlidesOffset: function () {
              const e = this,
                t = e.slides;
              for (let s = 0; s < t.length; s += 1)
                t[s].swiperSlideOffset = e.isHorizontal()
                  ? t[s].offsetLeft
                  : t[s].offsetTop;
            },
            updateSlidesProgress: function (e) {
              void 0 === e && (e = (this && this.translate) || 0);
              const t = this,
                s = t.params,
                { slides: i, rtlTranslate: n, snapGrid: a } = t;
              if (0 === i.length) return;
              void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
              let r = -e;
              n && (r = e),
                i.removeClass(s.slideVisibleClass),
                (t.visibleSlidesIndexes = []),
                (t.visibleSlides = []);
              for (let e = 0; e < i.length; e += 1) {
                const o = i[e];
                let l = o.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                const d =
                    (r + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                    (o.swiperSlideSize + s.spaceBetween),
                  c =
                    (r - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                    (o.swiperSlideSize + s.spaceBetween),
                  p = -(r - l),
                  u = p + t.slidesSizesGrid[e];
                ((p >= 0 && p < t.size - 1) ||
                  (u > 1 && u <= t.size) ||
                  (p <= 0 && u >= t.size)) &&
                  (t.visibleSlides.push(o),
                  t.visibleSlidesIndexes.push(e),
                  i.eq(e).addClass(s.slideVisibleClass)),
                  (o.progress = n ? -d : d),
                  (o.originalProgress = n ? -c : c);
              }
              t.visibleSlides = d(t.visibleSlides);
            },
            updateProgress: function (e) {
              const t = this;
              if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = (t && t.translate && t.translate * s) || 0;
              }
              const s = t.params,
                i = t.maxTranslate() - t.minTranslate();
              let { progress: n, isBeginning: a, isEnd: r } = t;
              const o = a,
                l = r;
              0 === i
                ? ((n = 0), (a = !0), (r = !0))
                : ((n = (e - t.minTranslate()) / i),
                  (a = n <= 0),
                  (r = n >= 1)),
                Object.assign(t, { progress: n, isBeginning: a, isEnd: r }),
                (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
                  t.updateSlidesProgress(e),
                a && !o && t.emit("reachBeginning toEdge"),
                r && !l && t.emit("reachEnd toEdge"),
                ((o && !a) || (l && !r)) && t.emit("fromEdge"),
                t.emit("progress", n);
            },
            updateSlidesClasses: function () {
              const e = this,
                {
                  slides: t,
                  params: s,
                  $wrapperEl: i,
                  activeIndex: n,
                  realIndex: a,
                } = e,
                r = e.virtual && s.virtual.enabled;
              let o;
              t.removeClass(
                `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
              ),
                (o = r
                  ? e.$wrapperEl.find(
                      `.${s.slideClass}[data-swiper-slide-index="${n}"]`
                    )
                  : t.eq(n)),
                o.addClass(s.slideActiveClass),
                s.loop &&
                  (o.hasClass(s.slideDuplicateClass)
                    ? i
                        .children(
                          `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`
                        )
                        .addClass(s.slideDuplicateActiveClass)
                    : i
                        .children(
                          `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`
                        )
                        .addClass(s.slideDuplicateActiveClass));
              let l = o
                .nextAll(`.${s.slideClass}`)
                .eq(0)
                .addClass(s.slideNextClass);
              s.loop &&
                0 === l.length &&
                ((l = t.eq(0)), l.addClass(s.slideNextClass));
              let d = o
                .prevAll(`.${s.slideClass}`)
                .eq(0)
                .addClass(s.slidePrevClass);
              s.loop &&
                0 === d.length &&
                ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
                s.loop &&
                  (l.hasClass(s.slideDuplicateClass)
                    ? i
                        .children(
                          `.${s.slideClass}:not(.${
                            s.slideDuplicateClass
                          })[data-swiper-slide-index="${l.attr(
                            "data-swiper-slide-index"
                          )}"]`
                        )
                        .addClass(s.slideDuplicateNextClass)
                    : i
                        .children(
                          `.${s.slideClass}.${
                            s.slideDuplicateClass
                          }[data-swiper-slide-index="${l.attr(
                            "data-swiper-slide-index"
                          )}"]`
                        )
                        .addClass(s.slideDuplicateNextClass),
                  d.hasClass(s.slideDuplicateClass)
                    ? i
                        .children(
                          `.${s.slideClass}:not(.${
                            s.slideDuplicateClass
                          })[data-swiper-slide-index="${d.attr(
                            "data-swiper-slide-index"
                          )}"]`
                        )
                        .addClass(s.slideDuplicatePrevClass)
                    : i
                        .children(
                          `.${s.slideClass}.${
                            s.slideDuplicateClass
                          }[data-swiper-slide-index="${d.attr(
                            "data-swiper-slide-index"
                          )}"]`
                        )
                        .addClass(s.slideDuplicatePrevClass)),
                e.emitSlidesClasses();
            },
            updateActiveIndex: function (e) {
              const t = this,
                s = t.rtlTranslate ? t.translate : -t.translate,
                {
                  slidesGrid: i,
                  snapGrid: n,
                  params: a,
                  activeIndex: r,
                  realIndex: o,
                  snapIndex: l,
                } = t;
              let d,
                c = e;
              if (void 0 === c) {
                for (let e = 0; e < i.length; e += 1)
                  void 0 !== i[e + 1]
                    ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                      ? (c = e)
                      : s >= i[e] && s < i[e + 1] && (c = e + 1)
                    : s >= i[e] && (c = e);
                a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
              }
              if (n.indexOf(s) >= 0) d = n.indexOf(s);
              else {
                const e = Math.min(a.slidesPerGroupSkip, c);
                d = e + Math.floor((c - e) / a.slidesPerGroup);
              }
              if ((d >= n.length && (d = n.length - 1), c === r))
                return void (
                  d !== l && ((t.snapIndex = d), t.emit("snapIndexChange"))
                );
              const p = parseInt(
                t.slides.eq(c).attr("data-swiper-slide-index") || c,
                10
              );
              Object.assign(t, {
                snapIndex: d,
                realIndex: p,
                previousIndex: r,
                activeIndex: c,
              }),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
                o !== p && t.emit("realIndexChange"),
                (t.initialized || t.params.runCallbacksOnInit) &&
                  t.emit("slideChange");
            },
            updateClickedSlide: function (e) {
              const t = this,
                s = t.params,
                i = d(e).closest(`.${s.slideClass}`)[0];
              let n,
                a = !1;
              if (i)
                for (let e = 0; e < t.slides.length; e += 1)
                  if (t.slides[e] === i) {
                    (a = !0), (n = e);
                    break;
                  }
              if (!i || !a)
                return (
                  (t.clickedSlide = void 0), void (t.clickedIndex = void 0)
                );
              (t.clickedSlide = i),
                t.virtual && t.params.virtual.enabled
                  ? (t.clickedIndex = parseInt(
                      d(i).attr("data-swiper-slide-index"),
                      10
                    ))
                  : (t.clickedIndex = n),
                s.slideToClickedSlide &&
                  void 0 !== t.clickedIndex &&
                  t.clickedIndex !== t.activeIndex &&
                  t.slideToClickedSlide();
            },
          },
          M = {
            getTranslate: function (e) {
              void 0 === e && (e = this.isHorizontal() ? "x" : "y");
              const {
                params: t,
                rtlTranslate: s,
                translate: i,
                $wrapperEl: n,
              } = this;
              if (t.virtualTranslate) return s ? -i : i;
              if (t.cssMode) return i;
              let a = h(n[0], e);
              return s && (a = -a), a || 0;
            },
            setTranslate: function (e, t) {
              const s = this,
                {
                  rtlTranslate: i,
                  params: n,
                  $wrapperEl: a,
                  wrapperEl: r,
                  progress: o,
                } = s;
              let l,
                d = 0,
                c = 0;
              s.isHorizontal() ? (d = i ? -e : e) : (c = e),
                n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
                n.cssMode
                  ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                      s.isHorizontal() ? -d : -c)
                  : n.virtualTranslate ||
                    a.transform(`translate3d(${d}px, ${c}px, 0px)`),
                (s.previousTranslate = s.translate),
                (s.translate = s.isHorizontal() ? d : c);
              const p = s.maxTranslate() - s.minTranslate();
              (l = 0 === p ? 0 : (e - s.minTranslate()) / p),
                l !== o && s.updateProgress(e),
                s.emit("setTranslate", s.translate, t);
            },
            minTranslate: function () {
              return -this.snapGrid[0];
            },
            maxTranslate: function () {
              return -this.snapGrid[this.snapGrid.length - 1];
            },
            translateTo: function (e, t, s, i, n) {
              void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                void 0 === i && (i = !0);
              const a = this,
                { params: r, wrapperEl: o } = a;
              if (a.animating && r.preventInteractionOnTransition) return !1;
              const l = a.minTranslate(),
                d = a.maxTranslate();
              let c;
              if (
                ((c = i && e > l ? l : i && e < d ? d : e),
                a.updateProgress(c),
                r.cssMode)
              ) {
                const e = a.isHorizontal();
                if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                  if (!a.support.smoothScroll)
                    return (
                      y({
                        swiper: a,
                        targetPosition: -c,
                        side: e ? "left" : "top",
                      }),
                      !0
                    );
                  o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
                }
                return !0;
              }
              return (
                0 === t
                  ? (a.setTransition(0),
                    a.setTranslate(c),
                    s &&
                      (a.emit("beforeTransitionStart", t, n),
                      a.emit("transitionEnd")))
                  : (a.setTransition(t),
                    a.setTranslate(c),
                    s &&
                      (a.emit("beforeTransitionStart", t, n),
                      a.emit("transitionStart")),
                    a.animating ||
                      ((a.animating = !0),
                      a.onTranslateToWrapperTransitionEnd ||
                        (a.onTranslateToWrapperTransitionEnd = function (e) {
                          a &&
                            !a.destroyed &&
                            e.target === this &&
                            (a.$wrapperEl[0].removeEventListener(
                              "transitionend",
                              a.onTranslateToWrapperTransitionEnd
                            ),
                            a.$wrapperEl[0].removeEventListener(
                              "webkitTransitionEnd",
                              a.onTranslateToWrapperTransitionEnd
                            ),
                            (a.onTranslateToWrapperTransitionEnd = null),
                            delete a.onTranslateToWrapperTransitionEnd,
                            s && a.emit("transitionEnd"));
                        }),
                      a.$wrapperEl[0].addEventListener(
                        "transitionend",
                        a.onTranslateToWrapperTransitionEnd
                      ),
                      a.$wrapperEl[0].addEventListener(
                        "webkitTransitionEnd",
                        a.onTranslateToWrapperTransitionEnd
                      ))),
                !0
              );
            },
          };
        function I(e) {
          let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
          const { activeIndex: a, previousIndex: r } = t;
          let o = i;
          if (
            (o || (o = a > r ? "next" : a < r ? "prev" : "reset"),
            t.emit(`transition${n}`),
            s && a !== r)
          ) {
            if ("reset" === o) return void t.emit(`slideResetTransition${n}`);
            t.emit(`slideChangeTransition${n}`),
              "next" === o
                ? t.emit(`slideNextTransition${n}`)
                : t.emit(`slidePrevTransition${n}`);
          }
        }
        var O = {
            slideTo: function (e, t, s, i, n) {
              if (
                (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                "number" != typeof e && "string" != typeof e)
              )
                throw new Error(
                  `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
                );
              if ("string" == typeof e) {
                const t = parseInt(e, 10);
                if (!isFinite(t))
                  throw new Error(
                    `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
                  );
                e = t;
              }
              const a = this;
              let r = e;
              r < 0 && (r = 0);
              const {
                params: o,
                snapGrid: l,
                slidesGrid: d,
                previousIndex: c,
                activeIndex: p,
                rtlTranslate: u,
                wrapperEl: h,
                enabled: m,
              } = a;
              if (
                (a.animating && o.preventInteractionOnTransition) ||
                (!m && !i && !n)
              )
                return !1;
              const f = Math.min(a.params.slidesPerGroupSkip, r);
              let g = f + Math.floor((r - f) / a.params.slidesPerGroup);
              g >= l.length && (g = l.length - 1);
              const v = -l[g];
              if (o.normalizeSlideIndex)
                for (let e = 0; e < d.length; e += 1) {
                  const t = -Math.floor(100 * v),
                    s = Math.floor(100 * d[e]),
                    i = Math.floor(100 * d[e + 1]);
                  void 0 !== d[e + 1]
                    ? t >= s && t < i - (i - s) / 2
                      ? (r = e)
                      : t >= s && t < i && (r = e + 1)
                    : t >= s && (r = e);
                }
              if (a.initialized && r !== p) {
                if (
                  !a.allowSlideNext &&
                  v < a.translate &&
                  v < a.minTranslate()
                )
                  return !1;
                if (
                  !a.allowSlidePrev &&
                  v > a.translate &&
                  v > a.maxTranslate() &&
                  (p || 0) !== r
                )
                  return !1;
              }
              let b;
              if (
                (r !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
                a.updateProgress(v),
                (b = r > p ? "next" : r < p ? "prev" : "reset"),
                (u && -v === a.translate) || (!u && v === a.translate))
              )
                return (
                  a.updateActiveIndex(r),
                  o.autoHeight && a.updateAutoHeight(),
                  a.updateSlidesClasses(),
                  "slide" !== o.effect && a.setTranslate(v),
                  "reset" !== b &&
                    (a.transitionStart(s, b), a.transitionEnd(s, b)),
                  !1
                );
              if (o.cssMode) {
                const e = a.isHorizontal(),
                  s = u ? v : -v;
                if (0 === t) {
                  const t = a.virtual && a.params.virtual.enabled;
                  t &&
                    ((a.wrapperEl.style.scrollSnapType = "none"),
                    (a._immediateVirtual = !0)),
                    (h[e ? "scrollLeft" : "scrollTop"] = s),
                    t &&
                      requestAnimationFrame(() => {
                        (a.wrapperEl.style.scrollSnapType = ""),
                          (a._swiperImmediateVirtual = !1);
                      });
                } else {
                  if (!a.support.smoothScroll)
                    return (
                      y({
                        swiper: a,
                        targetPosition: s,
                        side: e ? "left" : "top",
                      }),
                      !0
                    );
                  h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
                }
                return !0;
              }
              return (
                a.setTransition(t),
                a.setTranslate(v),
                a.updateActiveIndex(r),
                a.updateSlidesClasses(),
                a.emit("beforeTransitionStart", t, i),
                a.transitionStart(s, b),
                0 === t
                  ? a.transitionEnd(s, b)
                  : a.animating ||
                    ((a.animating = !0),
                    a.onSlideToWrapperTransitionEnd ||
                      (a.onSlideToWrapperTransitionEnd = function (e) {
                        a &&
                          !a.destroyed &&
                          e.target === this &&
                          (a.$wrapperEl[0].removeEventListener(
                            "transitionend",
                            a.onSlideToWrapperTransitionEnd
                          ),
                          a.$wrapperEl[0].removeEventListener(
                            "webkitTransitionEnd",
                            a.onSlideToWrapperTransitionEnd
                          ),
                          (a.onSlideToWrapperTransitionEnd = null),
                          delete a.onSlideToWrapperTransitionEnd,
                          a.transitionEnd(s, b));
                      }),
                    a.$wrapperEl[0].addEventListener(
                      "transitionend",
                      a.onSlideToWrapperTransitionEnd
                    ),
                    a.$wrapperEl[0].addEventListener(
                      "webkitTransitionEnd",
                      a.onSlideToWrapperTransitionEnd
                    )),
                !0
              );
            },
            slideToLoop: function (e, t, s, i) {
              if (
                (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                "string" == typeof e)
              ) {
                const t = parseInt(e, 10);
                if (!isFinite(t))
                  throw new Error(
                    `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
                  );
                e = t;
              }
              const n = this;
              let a = e;
              return (
                n.params.loop && (a += n.loopedSlides), n.slideTo(a, t, s, i)
              );
            },
            slideNext: function (e, t, s) {
              void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
              const i = this,
                { animating: n, enabled: a, params: r } = i;
              if (!a) return i;
              let o = r.slidesPerGroup;
              "auto" === r.slidesPerView &&
                1 === r.slidesPerGroup &&
                r.slidesPerGroupAuto &&
                (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
              const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : o;
              if (r.loop) {
                if (n && r.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
              }
              return r.rewind && i.isEnd
                ? i.slideTo(0, e, t, s)
                : i.slideTo(i.activeIndex + l, e, t, s);
            },
            slidePrev: function (e, t, s) {
              void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
              const i = this,
                {
                  params: n,
                  animating: a,
                  snapGrid: r,
                  slidesGrid: o,
                  rtlTranslate: l,
                  enabled: d,
                } = i;
              if (!d) return i;
              if (n.loop) {
                if (a && n.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
              }
              function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
              }
              const p = c(l ? i.translate : -i.translate),
                u = r.map((e) => c(e));
              let h = r[u.indexOf(p) - 1];
              if (void 0 === h && n.cssMode) {
                let e;
                r.forEach((t, s) => {
                  p >= t && (e = s);
                }),
                  void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
              }
              let m = 0;
              if (
                (void 0 !== h &&
                  ((m = o.indexOf(h)),
                  m < 0 && (m = i.activeIndex - 1),
                  "auto" === n.slidesPerView &&
                    1 === n.slidesPerGroup &&
                    n.slidesPerGroupAuto &&
                    ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
                    (m = Math.max(m, 0)))),
                n.rewind && i.isBeginning)
              ) {
                const n =
                  i.params.virtual && i.params.virtual.enabled && i.virtual
                    ? i.virtual.slides.length - 1
                    : i.slides.length - 1;
                return i.slideTo(n, e, t, s);
              }
              return i.slideTo(m, e, t, s);
            },
            slideReset: function (e, t, s) {
              return (
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, s)
              );
            },
            slideToClosest: function (e, t, s, i) {
              void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === i && (i = 0.5);
              const n = this;
              let a = n.activeIndex;
              const r = Math.min(n.params.slidesPerGroupSkip, a),
                o = r + Math.floor((a - r) / n.params.slidesPerGroup),
                l = n.rtlTranslate ? n.translate : -n.translate;
              if (l >= n.snapGrid[o]) {
                const e = n.snapGrid[o];
                l - e > (n.snapGrid[o + 1] - e) * i &&
                  (a += n.params.slidesPerGroup);
              } else {
                const e = n.snapGrid[o - 1];
                l - e <= (n.snapGrid[o] - e) * i &&
                  (a -= n.params.slidesPerGroup);
              }
              return (
                (a = Math.max(a, 0)),
                (a = Math.min(a, n.slidesGrid.length - 1)),
                n.slideTo(a, e, t, s)
              );
            },
            slideToClickedSlide: function () {
              const e = this,
                { params: t, $wrapperEl: s } = e,
                i =
                  "auto" === t.slidesPerView
                    ? e.slidesPerViewDynamic()
                    : t.slidesPerView;
              let n,
                a = e.clickedIndex;
              if (t.loop) {
                if (e.animating) return;
                (n = parseInt(
                  d(e.clickedSlide).attr("data-swiper-slide-index"),
                  10
                )),
                  t.centeredSlides
                    ? a < e.loopedSlides - i / 2 ||
                      a > e.slides.length - e.loopedSlides + i / 2
                      ? (e.loopFix(),
                        (a = s
                          .children(
                            `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                          )
                          .eq(0)
                          .index()),
                        p(() => {
                          e.slideTo(a);
                        }))
                      : e.slideTo(a)
                    : a > e.slides.length - i
                    ? (e.loopFix(),
                      (a = s
                        .children(
                          `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                        )
                        .eq(0)
                        .index()),
                      p(() => {
                        e.slideTo(a);
                      }))
                    : e.slideTo(a);
              } else e.slideTo(a);
            },
          },
          z = {
            loopCreate: function () {
              const e = this,
                t = i(),
                { params: s, $wrapperEl: n } = e,
                a = n.children().length > 0 ? d(n.children()[0].parentNode) : n;
              a.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
              let r = a.children(`.${s.slideClass}`);
              if (s.loopFillGroupWithBlank) {
                const e = s.slidesPerGroup - (r.length % s.slidesPerGroup);
                if (e !== s.slidesPerGroup) {
                  for (let i = 0; i < e; i += 1) {
                    const e = d(t.createElement("div")).addClass(
                      `${s.slideClass} ${s.slideBlankClass}`
                    );
                    a.append(e);
                  }
                  r = a.children(`.${s.slideClass}`);
                }
              }
              "auto" !== s.slidesPerView ||
                s.loopedSlides ||
                (s.loopedSlides = r.length),
                (e.loopedSlides = Math.ceil(
                  parseFloat(s.loopedSlides || s.slidesPerView, 10)
                )),
                (e.loopedSlides += s.loopAdditionalSlides),
                e.loopedSlides > r.length &&
                  e.params.loopedSlidesLimit &&
                  (e.loopedSlides = r.length);
              const o = [],
                l = [];
              r.each((e, t) => {
                d(e).attr("data-swiper-slide-index", t);
              });
              for (let t = 0; t < e.loopedSlides; t += 1) {
                const e = t - Math.floor(t / r.length) * r.length;
                l.push(r.eq(e)[0]), o.unshift(r.eq(r.length - e - 1)[0]);
              }
              for (let e = 0; e < l.length; e += 1)
                a.append(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
              for (let e = o.length - 1; e >= 0; e -= 1)
                a.prepend(
                  d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass)
                );
            },
            loopFix: function () {
              const e = this;
              e.emit("beforeLoopFix");
              const {
                activeIndex: t,
                slides: s,
                loopedSlides: i,
                allowSlidePrev: n,
                allowSlideNext: a,
                snapGrid: r,
                rtlTranslate: o,
              } = e;
              let l;
              (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
              const d = -r[t] - e.getTranslate();
              t < i
                ? ((l = s.length - 3 * i + t),
                  (l += i),
                  e.slideTo(l, 0, !1, !0) &&
                    0 !== d &&
                    e.setTranslate((o ? -e.translate : e.translate) - d))
                : t >= s.length - i &&
                  ((l = -s.length + t + i),
                  (l += i),
                  e.slideTo(l, 0, !1, !0) &&
                    0 !== d &&
                    e.setTranslate((o ? -e.translate : e.translate) - d)),
                (e.allowSlidePrev = n),
                (e.allowSlideNext = a),
                e.emit("loopFix");
            },
            loopDestroy: function () {
              const { $wrapperEl: e, params: t, slides: s } = this;
              e
                .children(
                  `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
                )
                .remove(),
                s.removeAttr("data-swiper-slide-index");
            },
          };
        function P(e) {
          const t = this,
            s = i(),
            n = a(),
            r = t.touchEventsData,
            { params: o, touches: l, enabled: c } = t;
          if (!c) return;
          if (t.animating && o.preventInteractionOnTransition) return;
          !t.animating && o.cssMode && o.loop && t.loopFix();
          let p = e;
          p.originalEvent && (p = p.originalEvent);
          let h = d(p.target);
          if (
            "wrapper" === o.touchEventsTarget &&
            !h.closest(t.wrapperEl).length
          )
            return;
          if (
            ((r.isTouchEvent = "touchstart" === p.type),
            !r.isTouchEvent && "which" in p && 3 === p.which)
          )
            return;
          if (!r.isTouchEvent && "button" in p && p.button > 0) return;
          if (r.isTouched && r.isMoved) return;
          const m = !!o.noSwipingClass && "" !== o.noSwipingClass,
            f = e.composedPath ? e.composedPath() : e.path;
          m && p.target && p.target.shadowRoot && f && (h = d(f[0]));
          const g = o.noSwipingSelector
              ? o.noSwipingSelector
              : `.${o.noSwipingClass}`,
            v = !(!p.target || !p.target.shadowRoot);
          if (
            o.noSwiping &&
            (v
              ? (function (e, t) {
                  return (
                    void 0 === t && (t = this),
                    (function t(s) {
                      if (!s || s === i() || s === a()) return null;
                      s.assignedSlot && (s = s.assignedSlot);
                      const n = s.closest(e);
                      return n || s.getRootNode
                        ? n || t(s.getRootNode().host)
                        : null;
                    })(t)
                  );
                })(g, h[0])
              : h.closest(g)[0])
          )
            return void (t.allowClick = !0);
          if (o.swipeHandler && !h.closest(o.swipeHandler)[0]) return;
          (l.currentX =
            "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX),
            (l.currentY =
              "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY);
          const y = l.currentX,
            b = l.currentY,
            w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
            x = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
          if (w && (y <= x || y >= n.innerWidth - x)) {
            if ("prevent" !== w) return;
            e.preventDefault();
          }
          if (
            (Object.assign(r, {
              isTouched: !0,
              isMoved: !1,
              allowTouchCallbacks: !0,
              isScrolling: void 0,
              startMoving: void 0,
            }),
            (l.startX = y),
            (l.startY = b),
            (r.touchStartTime = u()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            o.threshold > 0 && (r.allowThresholdMove = !1),
            "touchstart" !== p.type)
          ) {
            let e = !0;
            h.is(r.focusableElements) &&
              ((e = !1), "SELECT" === h[0].nodeName && (r.isTouched = !1)),
              s.activeElement &&
                d(s.activeElement).is(r.focusableElements) &&
                s.activeElement !== h[0] &&
                s.activeElement.blur();
            const i = e && t.allowTouchMove && o.touchStartPreventDefault;
            (!o.touchStartForcePreventDefault && !i) ||
              h[0].isContentEditable ||
              p.preventDefault();
          }
          t.params.freeMode &&
            t.params.freeMode.enabled &&
            t.freeMode &&
            t.animating &&
            !o.cssMode &&
            t.freeMode.onTouchStart(),
            t.emit("touchStart", p);
        }
        function L(e) {
          const t = i(),
            s = this,
            n = s.touchEventsData,
            { params: a, touches: r, rtlTranslate: o, enabled: l } = s;
          if (!l) return;
          let c = e;
          if ((c.originalEvent && (c = c.originalEvent), !n.isTouched))
            return void (
              n.startMoving &&
              n.isScrolling &&
              s.emit("touchMoveOpposite", c)
            );
          if (n.isTouchEvent && "touchmove" !== c.type) return;
          const p =
              "touchmove" === c.type &&
              c.targetTouches &&
              (c.targetTouches[0] || c.changedTouches[0]),
            h = "touchmove" === c.type ? p.pageX : c.pageX,
            m = "touchmove" === c.type ? p.pageY : c.pageY;
          if (c.preventedByNestedSwiper)
            return (r.startX = h), void (r.startY = m);
          if (!s.allowTouchMove)
            return (
              d(c.target).is(n.focusableElements) || (s.allowClick = !1),
              void (
                n.isTouched &&
                (Object.assign(r, {
                  startX: h,
                  startY: m,
                  currentX: h,
                  currentY: m,
                }),
                (n.touchStartTime = u()))
              )
            );
          if (n.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
            if (s.isVertical()) {
              if (
                (m < r.startY && s.translate <= s.maxTranslate()) ||
                (m > r.startY && s.translate >= s.minTranslate())
              )
                return (n.isTouched = !1), void (n.isMoved = !1);
            } else if (
              (h < r.startX && s.translate <= s.maxTranslate()) ||
              (h > r.startX && s.translate >= s.minTranslate())
            )
              return;
          if (
            n.isTouchEvent &&
            t.activeElement &&
            c.target === t.activeElement &&
            d(c.target).is(n.focusableElements)
          )
            return (n.isMoved = !0), void (s.allowClick = !1);
          if (
            (n.allowTouchCallbacks && s.emit("touchMove", c),
            c.targetTouches && c.targetTouches.length > 1)
          )
            return;
          (r.currentX = h), (r.currentY = m);
          const f = r.currentX - r.startX,
            g = r.currentY - r.startY;
          if (
            s.params.threshold &&
            Math.sqrt(f ** 2 + g ** 2) < s.params.threshold
          )
            return;
          if (void 0 === n.isScrolling) {
            let e;
            (s.isHorizontal() && r.currentY === r.startY) ||
            (s.isVertical() && r.currentX === r.startX)
              ? (n.isScrolling = !1)
              : f * f + g * g >= 25 &&
                ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
                (n.isScrolling = s.isHorizontal()
                  ? e > a.touchAngle
                  : 90 - e > a.touchAngle));
          }
          if (
            (n.isScrolling && s.emit("touchMoveOpposite", c),
            void 0 === n.startMoving &&
              ((r.currentX === r.startX && r.currentY === r.startY) ||
                (n.startMoving = !0)),
            n.isScrolling)
          )
            return void (n.isTouched = !1);
          if (!n.startMoving) return;
          (s.allowClick = !1),
            !a.cssMode && c.cancelable && c.preventDefault(),
            a.touchMoveStopPropagation && !a.nested && c.stopPropagation(),
            n.isMoved ||
              (a.loop && !a.cssMode && s.loopFix(),
              (n.startTranslate = s.getTranslate()),
              s.setTransition(0),
              s.animating &&
                s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
              (n.allowMomentumBounce = !1),
              !a.grabCursor ||
                (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
                s.setGrabCursor(!0),
              s.emit("sliderFirstMove", c)),
            s.emit("sliderMove", c),
            (n.isMoved = !0);
          let v = s.isHorizontal() ? f : g;
          (r.diff = v),
            (v *= a.touchRatio),
            o && (v = -v),
            (s.swipeDirection = v > 0 ? "prev" : "next"),
            (n.currentTranslate = v + n.startTranslate);
          let y = !0,
            b = a.resistanceRatio;
          if (
            (a.touchReleaseOnEdges && (b = 0),
            v > 0 && n.currentTranslate > s.minTranslate()
              ? ((y = !1),
                a.resistance &&
                  (n.currentTranslate =
                    s.minTranslate() -
                    1 +
                    (-s.minTranslate() + n.startTranslate + v) ** b))
              : v < 0 &&
                n.currentTranslate < s.maxTranslate() &&
                ((y = !1),
                a.resistance &&
                  (n.currentTranslate =
                    s.maxTranslate() +
                    1 -
                    (s.maxTranslate() - n.startTranslate - v) ** b)),
            y && (c.preventedByNestedSwiper = !0),
            !s.allowSlideNext &&
              "next" === s.swipeDirection &&
              n.currentTranslate < n.startTranslate &&
              (n.currentTranslate = n.startTranslate),
            !s.allowSlidePrev &&
              "prev" === s.swipeDirection &&
              n.currentTranslate > n.startTranslate &&
              (n.currentTranslate = n.startTranslate),
            s.allowSlidePrev ||
              s.allowSlideNext ||
              (n.currentTranslate = n.startTranslate),
            a.threshold > 0)
          ) {
            if (!(Math.abs(v) > a.threshold || n.allowThresholdMove))
              return void (n.currentTranslate = n.startTranslate);
            if (!n.allowThresholdMove)
              return (
                (n.allowThresholdMove = !0),
                (r.startX = r.currentX),
                (r.startY = r.currentY),
                (n.currentTranslate = n.startTranslate),
                void (r.diff = s.isHorizontal()
                  ? r.currentX - r.startX
                  : r.currentY - r.startY)
              );
          }
          a.followFinger &&
            !a.cssMode &&
            (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
              a.watchSlidesProgress) &&
              (s.updateActiveIndex(), s.updateSlidesClasses()),
            s.params.freeMode &&
              a.freeMode.enabled &&
              s.freeMode &&
              s.freeMode.onTouchMove(),
            s.updateProgress(n.currentTranslate),
            s.setTranslate(n.currentTranslate));
        }
        function k(e) {
          const t = this,
            s = t.touchEventsData,
            {
              params: i,
              touches: n,
              rtlTranslate: a,
              slidesGrid: r,
              enabled: o,
            } = t;
          if (!o) return;
          let l = e;
          if (
            (l.originalEvent && (l = l.originalEvent),
            s.allowTouchCallbacks && t.emit("touchEnd", l),
            (s.allowTouchCallbacks = !1),
            !s.isTouched)
          )
            return (
              s.isMoved && i.grabCursor && t.setGrabCursor(!1),
              (s.isMoved = !1),
              void (s.startMoving = !1)
            );
          i.grabCursor &&
            s.isMoved &&
            s.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
          const d = u(),
            c = d - s.touchStartTime;
          if (t.allowClick) {
            const e = l.path || (l.composedPath && l.composedPath());
            t.updateClickedSlide((e && e[0]) || l.target),
              t.emit("tap click", l),
              c < 300 &&
                d - s.lastClickTime < 300 &&
                t.emit("doubleTap doubleClick", l);
          }
          if (
            ((s.lastClickTime = u()),
            p(() => {
              t.destroyed || (t.allowClick = !0);
            }),
            !s.isTouched ||
              !s.isMoved ||
              !t.swipeDirection ||
              0 === n.diff ||
              s.currentTranslate === s.startTranslate)
          )
            return (
              (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
            );
          let h;
          if (
            ((s.isTouched = !1),
            (s.isMoved = !1),
            (s.startMoving = !1),
            (h = i.followFinger
              ? a
                ? t.translate
                : -t.translate
              : -s.currentTranslate),
            i.cssMode)
          )
            return;
          if (t.params.freeMode && i.freeMode.enabled)
            return void t.freeMode.onTouchEnd({ currentPos: h });
          let m = 0,
            f = t.slidesSizesGrid[0];
          for (
            let e = 0;
            e < r.length;
            e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
          ) {
            const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== r[e + t]
              ? h >= r[e] && h < r[e + t] && ((m = e), (f = r[e + t] - r[e]))
              : h >= r[e] && ((m = e), (f = r[r.length - 1] - r[r.length - 2]));
          }
          let g = null,
            v = null;
          i.rewind &&
            (t.isBeginning
              ? (v =
                  t.params.virtual && t.params.virtual.enabled && t.virtual
                    ? t.virtual.slides.length - 1
                    : t.slides.length - 1)
              : t.isEnd && (g = 0));
          const y = (h - r[m]) / f,
            b = m < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
          if (c > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection &&
              (y >= i.longSwipesRatio
                ? t.slideTo(i.rewind && t.isEnd ? g : m + b)
                : t.slideTo(m)),
              "prev" === t.swipeDirection &&
                (y > 1 - i.longSwipesRatio
                  ? t.slideTo(m + b)
                  : null !== v && y < 0 && Math.abs(y) > i.longSwipesRatio
                  ? t.slideTo(v)
                  : t.slideTo(m));
          } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            !t.navigation ||
            (l.target !== t.navigation.nextEl &&
              l.target !== t.navigation.prevEl)
              ? ("next" === t.swipeDirection &&
                  t.slideTo(null !== g ? g : m + b),
                "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m))
              : l.target === t.navigation.nextEl
              ? t.slideTo(m + b)
              : t.slideTo(m);
          }
        }
        function A() {
          const e = this,
            { params: t, el: s } = e;
          if (s && 0 === s.offsetWidth) return;
          t.breakpoints && e.setBreakpoint();
          const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e;
          (e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses(),
            ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
            e.isEnd &&
            !e.isBeginning &&
            !e.params.centeredSlides
              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0),
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.run(),
            (e.allowSlidePrev = n),
            (e.allowSlideNext = i),
            e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
        }
        function D(e) {
          const t = this;
          t.enabled &&
            (t.allowClick ||
              (t.params.preventClicks && e.preventDefault(),
              t.params.preventClicksPropagation &&
                t.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation())));
        }
        function B() {
          const e = this,
            { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
          if (!i) return;
          let n;
          (e.previousTranslate = e.translate),
            e.isHorizontal()
              ? (e.translate = -t.scrollLeft)
              : (e.translate = -t.scrollTop),
            0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
          const a = e.maxTranslate() - e.minTranslate();
          (n = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
            n !== e.progress &&
              e.updateProgress(s ? -e.translate : e.translate),
            e.emit("setTranslate", e.translate, !1);
        }
        let G = !1;
        function H() {}
        const N = (e, t) => {
          const s = i(),
            {
              params: n,
              touchEvents: a,
              el: r,
              wrapperEl: o,
              device: l,
              support: d,
            } = e,
            c = !!n.nested,
            p = "on" === t ? "addEventListener" : "removeEventListener",
            u = t;
          if (d.touch) {
            const t = !(
              "touchstart" !== a.start ||
              !d.passiveListener ||
              !n.passiveListeners
            ) && { passive: !0, capture: !1 };
            r[p](a.start, e.onTouchStart, t),
              r[p](
                a.move,
                e.onTouchMove,
                d.passiveListener ? { passive: !1, capture: c } : c
              ),
              r[p](a.end, e.onTouchEnd, t),
              a.cancel && r[p](a.cancel, e.onTouchEnd, t);
          } else
            r[p](a.start, e.onTouchStart, !1),
              s[p](a.move, e.onTouchMove, c),
              s[p](a.end, e.onTouchEnd, !1);
          (n.preventClicks || n.preventClicksPropagation) &&
            r[p]("click", e.onClick, !0),
            n.cssMode && o[p]("scroll", e.onScroll),
            n.updateOnWindowResize
              ? e[u](
                  l.ios || l.android
                    ? "resize orientationchange observerUpdate"
                    : "resize observerUpdate",
                  A,
                  !0
                )
              : e[u]("observerUpdate", A, !0);
        };
        var _ = {
          attachEvents: function () {
            const e = this,
              t = i(),
              { params: s, support: n } = e;
            (e.onTouchStart = P.bind(e)),
              (e.onTouchMove = L.bind(e)),
              (e.onTouchEnd = k.bind(e)),
              s.cssMode && (e.onScroll = B.bind(e)),
              (e.onClick = D.bind(e)),
              n.touch && !G && (t.addEventListener("touchstart", H), (G = !0)),
              N(e, "on");
          },
          detachEvents: function () {
            N(this, "off");
          },
        };
        const R = (e, t) => e.grid && t.grid && t.grid.rows > 1;
        var j = {
            addClasses: function () {
              const e = this,
                {
                  classNames: t,
                  params: s,
                  rtl: i,
                  $el: n,
                  device: a,
                  support: r,
                } = e,
                o = (function (e, t) {
                  const s = [];
                  return (
                    e.forEach((e) => {
                      "object" == typeof e
                        ? Object.keys(e).forEach((i) => {
                            e[i] && s.push(t + i);
                          })
                        : "string" == typeof e && s.push(t + e);
                    }),
                    s
                  );
                })(
                  [
                    "initialized",
                    s.direction,
                    { "pointer-events": !r.touch },
                    { "free-mode": e.params.freeMode && s.freeMode.enabled },
                    { autoheight: s.autoHeight },
                    { rtl: i },
                    { grid: s.grid && s.grid.rows > 1 },
                    {
                      "grid-column":
                        s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                    },
                    { android: a.android },
                    { ios: a.ios },
                    { "css-mode": s.cssMode },
                    { centered: s.cssMode && s.centeredSlides },
                    { "watch-progress": s.watchSlidesProgress },
                  ],
                  s.containerModifierClass
                );
              t.push(...o),
                n.addClass([...t].join(" ")),
                e.emitContainerClasses();
            },
            removeClasses: function () {
              const { $el: e, classNames: t } = this;
              e.removeClass(t.join(" ")), this.emitContainerClasses();
            },
          },
          X = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !0,
            nested: !1,
            createElements: !1,
            enabled: !0,
            focusableElements:
              "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: !1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopedSlidesLimit: !0,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            rewind: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
            _emitClasses: !1,
          };
        function Y(e, t) {
          return function (s) {
            void 0 === s && (s = {});
            const i = Object.keys(s)[0],
              n = s[i];
            "object" == typeof n && null !== n
              ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
                  !0 === e[i] &&
                  (e[i] = { auto: !0 }),
                i in e && "enabled" in n
                  ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                    "object" != typeof e[i] ||
                      "enabled" in e[i] ||
                      (e[i].enabled = !0),
                    e[i] || (e[i] = { enabled: !1 }),
                    g(t, s))
                  : g(t, s))
              : g(t, s);
          };
        }
        const q = {
            eventsEmitter: T,
            update: $,
            translate: M,
            transition: {
              setTransition: function (e, t) {
                const s = this;
                s.params.cssMode || s.$wrapperEl.transition(e),
                  s.emit("setTransition", e, t);
              },
              transitionStart: function (e, t) {
                void 0 === e && (e = !0);
                const s = this,
                  { params: i } = s;
                i.cssMode ||
                  (i.autoHeight && s.updateAutoHeight(),
                  I({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start",
                  }));
              },
              transitionEnd: function (e, t) {
                void 0 === e && (e = !0);
                const s = this,
                  { params: i } = s;
                (s.animating = !1),
                  i.cssMode ||
                    (s.setTransition(0),
                    I({
                      swiper: s,
                      runCallbacks: e,
                      direction: t,
                      step: "End",
                    }));
              },
            },
            slide: O,
            loop: z,
            grabCursor: {
              setGrabCursor: function (e) {
                const t = this;
                if (
                  t.support.touch ||
                  !t.params.simulateTouch ||
                  (t.params.watchOverflow && t.isLocked) ||
                  t.params.cssMode
                )
                  return;
                const s =
                  "container" === t.params.touchEventsTarget
                    ? t.el
                    : t.wrapperEl;
                (s.style.cursor = "move"),
                  (s.style.cursor = e ? "grabbing" : "grab");
              },
              unsetGrabCursor: function () {
                const e = this;
                e.support.touch ||
                  (e.params.watchOverflow && e.isLocked) ||
                  e.params.cssMode ||
                  (e[
                    "container" === e.params.touchEventsTarget
                      ? "el"
                      : "wrapperEl"
                  ].style.cursor = "");
              },
            },
            events: _,
            breakpoints: {
              setBreakpoint: function () {
                const e = this,
                  {
                    activeIndex: t,
                    initialized: s,
                    loopedSlides: i = 0,
                    params: n,
                    $el: a,
                  } = e,
                  r = n.breakpoints;
                if (!r || (r && 0 === Object.keys(r).length)) return;
                const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
                if (!o || e.currentBreakpoint === o) return;
                const l = (o in r ? r[o] : void 0) || e.originalParams,
                  d = R(e, n),
                  c = R(e, l),
                  p = n.enabled;
                d && !c
                  ? (a.removeClass(
                      `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
                    ),
                    e.emitContainerClasses())
                  : !d &&
                    c &&
                    (a.addClass(`${n.containerModifierClass}grid`),
                    ((l.grid.fill && "column" === l.grid.fill) ||
                      (!l.grid.fill && "column" === n.grid.fill)) &&
                      a.addClass(`${n.containerModifierClass}grid-column`),
                    e.emitContainerClasses()),
                  ["navigation", "pagination", "scrollbar"].forEach((t) => {
                    const s = n[t] && n[t].enabled,
                      i = l[t] && l[t].enabled;
                    s && !i && e[t].disable(), !s && i && e[t].enable();
                  });
                const u = l.direction && l.direction !== n.direction,
                  h = n.loop && (l.slidesPerView !== n.slidesPerView || u);
                u && s && e.changeDirection(), g(e.params, l);
                const m = e.params.enabled;
                Object.assign(e, {
                  allowTouchMove: e.params.allowTouchMove,
                  allowSlideNext: e.params.allowSlideNext,
                  allowSlidePrev: e.params.allowSlidePrev,
                }),
                  p && !m ? e.disable() : !p && m && e.enable(),
                  (e.currentBreakpoint = o),
                  e.emit("_beforeBreakpoint", l),
                  h &&
                    s &&
                    (e.loopDestroy(),
                    e.loopCreate(),
                    e.updateSlides(),
                    e.slideTo(t - i + e.loopedSlides, 0, !1)),
                  e.emit("breakpoint", l);
              },
              getBreakpoint: function (e, t, s) {
                if (
                  (void 0 === t && (t = "window"),
                  !e || ("container" === t && !s))
                )
                  return;
                let i = !1;
                const n = a(),
                  r = "window" === t ? n.innerHeight : s.clientHeight,
                  o = Object.keys(e).map((e) => {
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                      const t = parseFloat(e.substr(1));
                      return { value: r * t, point: e };
                    }
                    return { value: e, point: e };
                  });
                o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                for (let e = 0; e < o.length; e += 1) {
                  const { point: a, value: r } = o[e];
                  "window" === t
                    ? n.matchMedia(`(min-width: ${r}px)`).matches && (i = a)
                    : r <= s.clientWidth && (i = a);
                }
                return i || "max";
              },
            },
            checkOverflow: {
              checkOverflow: function () {
                const e = this,
                  { isLocked: t, params: s } = e,
                  { slidesOffsetBefore: i } = s;
                if (i) {
                  const t = e.slides.length - 1,
                    s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                  e.isLocked = e.size > s;
                } else e.isLocked = 1 === e.snapGrid.length;
                !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                  !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                  t && t !== e.isLocked && (e.isEnd = !1),
                  t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
              },
            },
            classes: j,
            images: {
              loadImage: function (e, t, s, i, n, r) {
                const o = a();
                let l;
                function c() {
                  r && r();
                }
                d(e).parent("picture")[0] || (e.complete && n)
                  ? c()
                  : t
                  ? ((l = new o.Image()),
                    (l.onload = c),
                    (l.onerror = c),
                    i && (l.sizes = i),
                    s && (l.srcset = s),
                    t && (l.src = t))
                  : c();
              },
              preloadImages: function () {
                const e = this;
                function t() {
                  null != e &&
                    e &&
                    !e.destroyed &&
                    (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length &&
                      (e.params.updateOnImagesReady && e.update(),
                      e.emit("imagesReady")));
                }
                e.imagesToLoad = e.$el.find("img");
                for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                  const i = e.imagesToLoad[s];
                  e.loadImage(
                    i,
                    i.currentSrc || i.getAttribute("src"),
                    i.srcset || i.getAttribute("srcset"),
                    i.sizes || i.getAttribute("sizes"),
                    !0,
                    t
                  );
                }
              },
            },
          },
          F = {};
        class V {
          constructor() {
            let e, t;
            for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
              i[n] = arguments[n];
            if (
              (1 === i.length &&
              i[0].constructor &&
              "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
                ? (t = i[0])
                : ([e, t] = i),
              t || (t = {}),
              (t = g({}, t)),
              e && !t.el && (t.el = e),
              t.el && d(t.el).length > 1)
            ) {
              const e = [];
              return (
                d(t.el).each((s) => {
                  const i = g({}, t, { el: s });
                  e.push(new V(i));
                }),
                e
              );
            }
            const a = this;
            (a.__swiper__ = !0),
              (a.support = C()),
              (a.device = S({ userAgent: t.userAgent })),
              (a.browser = E()),
              (a.eventsListeners = {}),
              (a.eventsAnyListeners = []),
              (a.modules = [...a.__modules__]),
              t.modules &&
                Array.isArray(t.modules) &&
                a.modules.push(...t.modules);
            const r = {};
            a.modules.forEach((e) => {
              e({
                swiper: a,
                extendParams: Y(t, r),
                on: a.on.bind(a),
                once: a.once.bind(a),
                off: a.off.bind(a),
                emit: a.emit.bind(a),
              });
            });
            const o = g({}, X, r);
            return (
              (a.params = g({}, o, F, t)),
              (a.originalParams = g({}, a.params)),
              (a.passedParams = g({}, t)),
              a.params &&
                a.params.on &&
                Object.keys(a.params.on).forEach((e) => {
                  a.on(e, a.params.on[e]);
                }),
              a.params && a.params.onAny && a.onAny(a.params.onAny),
              (a.$ = d),
              Object.assign(a, {
                enabled: a.params.enabled,
                el: e,
                classNames: [],
                slides: d(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === a.params.direction,
                isVertical: () => "vertical" === a.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: a.params.allowSlideNext,
                allowSlidePrev: a.params.allowSlidePrev,
                touchEvents: (function () {
                  const e = [
                      "touchstart",
                      "touchmove",
                      "touchend",
                      "touchcancel",
                    ],
                    t = ["pointerdown", "pointermove", "pointerup"];
                  return (
                    (a.touchEventsTouch = {
                      start: e[0],
                      move: e[1],
                      end: e[2],
                      cancel: e[3],
                    }),
                    (a.touchEventsDesktop = {
                      start: t[0],
                      move: t[1],
                      end: t[2],
                    }),
                    a.support.touch || !a.params.simulateTouch
                      ? a.touchEventsTouch
                      : a.touchEventsDesktop
                  );
                })(),
                touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  focusableElements: a.params.focusableElements,
                  lastClickTime: u(),
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  isTouchEvent: void 0,
                  startMoving: void 0,
                },
                allowClick: !0,
                allowTouchMove: a.params.allowTouchMove,
                touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0,
                },
                imagesToLoad: [],
                imagesLoaded: 0,
              }),
              a.emit("_swiper"),
              a.params.init && a.init(),
              a
            );
          }
          enable() {
            const e = this;
            e.enabled ||
              ((e.enabled = !0),
              e.params.grabCursor && e.setGrabCursor(),
              e.emit("enable"));
          }
          disable() {
            const e = this;
            e.enabled &&
              ((e.enabled = !1),
              e.params.grabCursor && e.unsetGrabCursor(),
              e.emit("disable"));
          }
          setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate(),
              n = (s.maxTranslate() - i) * e + i;
            s.translateTo(n, void 0 === t ? 0 : t),
              s.updateActiveIndex(),
              s.updateSlidesClasses();
          }
          emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className
              .split(" ")
              .filter(
                (t) =>
                  0 === t.indexOf("swiper") ||
                  0 === t.indexOf(e.params.containerModifierClass)
              );
            e.emit("_containerClasses", t.join(" "));
          }
          getSlideClasses(e) {
            const t = this;
            return t.destroyed
              ? ""
              : e.className
                  .split(" ")
                  .filter(
                    (e) =>
                      0 === e.indexOf("swiper-slide") ||
                      0 === e.indexOf(t.params.slideClass)
                  )
                  .join(" ");
          }
          emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each((s) => {
              const i = e.getSlideClasses(s);
              t.push({ slideEl: s, classNames: i }),
                e.emit("_slideClass", s, i);
            }),
              e.emit("_slideClasses", t);
          }
          slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const {
              params: s,
              slides: i,
              slidesGrid: n,
              slidesSizesGrid: a,
              size: r,
              activeIndex: o,
            } = this;
            let l = 1;
            if (s.centeredSlides) {
              let e,
                t = i[o].swiperSlideSize;
              for (let s = o + 1; s < i.length; s += 1)
                i[s] &&
                  !e &&
                  ((t += i[s].swiperSlideSize), (l += 1), t > r && (e = !0));
              for (let s = o - 1; s >= 0; s -= 1)
                i[s] &&
                  !e &&
                  ((t += i[s].swiperSlideSize), (l += 1), t > r && (e = !0));
            } else if ("current" === e)
              for (let e = o + 1; e < i.length; e += 1)
                (t ? n[e] + a[e] - n[o] < r : n[e] - n[o] < r) && (l += 1);
            else
              for (let e = o - 1; e >= 0; e -= 1) n[o] - n[e] < r && (l += 1);
            return l;
          }
          update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: s } = e;
            function i() {
              const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
              e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
            }
            let n;
            s.breakpoints && e.setBreakpoint(),
              e.updateSize(),
              e.updateSlides(),
              e.updateProgress(),
              e.updateSlidesClasses(),
              e.params.freeMode && e.params.freeMode.enabled
                ? (i(), e.params.autoHeight && e.updateAutoHeight())
                : ((n =
                    ("auto" === e.params.slidesPerView ||
                      e.params.slidesPerView > 1) &&
                    e.isEnd &&
                    !e.params.centeredSlides
                      ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                      : e.slideTo(e.activeIndex, 0, !1, !0)),
                  n || i()),
              s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
              e.emit("update");
          }
          changeDirection(e, t) {
            void 0 === t && (t = !0);
            const s = this,
              i = s.params.direction;
            return (
              e || (e = "horizontal" === i ? "vertical" : "horizontal"),
              e === i ||
                ("horizontal" !== e && "vertical" !== e) ||
                (s.$el
                  .removeClass(`${s.params.containerModifierClass}${i}`)
                  .addClass(`${s.params.containerModifierClass}${e}`),
                s.emitContainerClasses(),
                (s.params.direction = e),
                s.slides.each((t) => {
                  "vertical" === e
                    ? (t.style.width = "")
                    : (t.style.height = "");
                }),
                s.emit("changeDirection"),
                t && s.update()),
              s
            );
          }
          changeLanguageDirection(e) {
            const t = this;
            (t.rtl && "rtl" === e) ||
              (!t.rtl && "ltr" === e) ||
              ((t.rtl = "rtl" === e),
              (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
              t.rtl
                ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`),
                  (t.el.dir = "rtl"))
                : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
                  (t.el.dir = "ltr")),
              t.update());
          }
          mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const s = d(e || t.params.el);
            if (!(e = s[0])) return !1;
            e.swiper = t;
            const n = () =>
              `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let a = (() => {
              if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                const t = d(e.shadowRoot.querySelector(n()));
                return (t.children = (e) => s.children(e)), t;
              }
              return s.children ? s.children(n()) : d(s).children(n());
            })();
            if (0 === a.length && t.params.createElements) {
              const e = i().createElement("div");
              (a = d(e)),
                (e.className = t.params.wrapperClass),
                s.append(e),
                s.children(`.${t.params.slideClass}`).each((e) => {
                  a.append(e);
                });
            }
            return (
              Object.assign(t, {
                $el: s,
                el: e,
                $wrapperEl: a,
                wrapperEl: a[0],
                mounted: !0,
                rtl:
                  "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                rtlTranslate:
                  "horizontal" === t.params.direction &&
                  ("rtl" === e.dir.toLowerCase() ||
                    "rtl" === s.css("direction")),
                wrongRTL: "-webkit-box" === a.css("display"),
              }),
              !0
            );
          }
          init(e) {
            const t = this;
            return (
              t.initialized ||
                !1 === t.mount(e) ||
                (t.emit("beforeInit"),
                t.params.breakpoints && t.setBreakpoint(),
                t.addClasses(),
                t.params.loop && t.loopCreate(),
                t.updateSize(),
                t.updateSlides(),
                t.params.watchOverflow && t.checkOverflow(),
                t.params.grabCursor && t.enabled && t.setGrabCursor(),
                t.params.preloadImages && t.preloadImages(),
                t.params.loop
                  ? t.slideTo(
                      t.params.initialSlide + t.loopedSlides,
                      0,
                      t.params.runCallbacksOnInit,
                      !1,
                      !0
                    )
                  : t.slideTo(
                      t.params.initialSlide,
                      0,
                      t.params.runCallbacksOnInit,
                      !1,
                      !0
                    ),
                t.attachEvents(),
                (t.initialized = !0),
                t.emit("init"),
                t.emit("afterInit")),
              t
            );
          }
          destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const s = this,
              { params: i, $el: n, $wrapperEl: a, slides: r } = s;
            return (
              void 0 === s.params ||
                s.destroyed ||
                (s.emit("beforeDestroy"),
                (s.initialized = !1),
                s.detachEvents(),
                i.loop && s.loopDestroy(),
                t &&
                  (s.removeClasses(),
                  n.removeAttr("style"),
                  a.removeAttr("style"),
                  r &&
                    r.length &&
                    r
                      .removeClass(
                        [
                          i.slideVisibleClass,
                          i.slideActiveClass,
                          i.slideNextClass,
                          i.slidePrevClass,
                        ].join(" ")
                      )
                      .removeAttr("style")
                      .removeAttr("data-swiper-slide-index")),
                s.emit("destroy"),
                Object.keys(s.eventsListeners).forEach((e) => {
                  s.off(e);
                }),
                !1 !== e &&
                  ((s.$el[0].swiper = null),
                  (function (e) {
                    const t = e;
                    Object.keys(t).forEach((e) => {
                      try {
                        t[e] = null;
                      } catch (e) {}
                      try {
                        delete t[e];
                      } catch (e) {}
                    });
                  })(s)),
                (s.destroyed = !0)),
              null
            );
          }
          static extendDefaults(e) {
            g(F, e);
          }
          static get extendedDefaults() {
            return F;
          }
          static get defaults() {
            return X;
          }
          static installModule(e) {
            V.prototype.__modules__ || (V.prototype.__modules__ = []);
            const t = V.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
          }
          static use(e) {
            return Array.isArray(e)
              ? (e.forEach((e) => V.installModule(e)), V)
              : (V.installModule(e), V);
          }
        }
        function W(e, t, s, n) {
          const a = i();
          return (
            e.params.createElements &&
              Object.keys(n).forEach((i) => {
                if (!s[i] && !0 === s.auto) {
                  let r = e.$el.children(`.${n[i]}`)[0];
                  r ||
                    ((r = a.createElement("div")),
                    (r.className = n[i]),
                    e.$el.append(r)),
                    (s[i] = r),
                    (t[i] = r);
                }
              }),
            s
          );
        }
        function U(e) {
          return (
            void 0 === e && (e = ""),
            `.${e
              .trim()
              .replace(/([\.:!\/])/g, "\\$1")
              .replace(/ /g, ".")}`
          );
        }
        function Z(e) {
          const t = this,
            { $wrapperEl: s, params: i } = t;
          if (
            (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
          )
            for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
          else s.append(e);
          i.loop && t.loopCreate(), i.observer || t.update();
        }
        function K(e) {
          const t = this,
            { params: s, $wrapperEl: i, activeIndex: n } = t;
          s.loop && t.loopDestroy();
          let a = n + 1;
          if ("object" == typeof e && "length" in e) {
            for (let t = 0; t < e.length; t += 1) e[t] && i.prepend(e[t]);
            a = n + e.length;
          } else i.prepend(e);
          s.loop && t.loopCreate(),
            s.observer || t.update(),
            t.slideTo(a, 0, !1);
        }
        function Q(e, t) {
          const s = this,
            { $wrapperEl: i, params: n, activeIndex: a } = s;
          let r = a;
          n.loop &&
            ((r -= s.loopedSlides),
            s.loopDestroy(),
            (s.slides = i.children(`.${n.slideClass}`)));
          const o = s.slides.length;
          if (e <= 0) return void s.prependSlide(t);
          if (e >= o) return void s.appendSlide(t);
          let l = r > e ? r + 1 : r;
          const d = [];
          for (let t = o - 1; t >= e; t -= 1) {
            const e = s.slides.eq(t);
            e.remove(), d.unshift(e);
          }
          if ("object" == typeof t && "length" in t) {
            for (let e = 0; e < t.length; e += 1) t[e] && i.append(t[e]);
            l = r > e ? r + t.length : r;
          } else i.append(t);
          for (let e = 0; e < d.length; e += 1) i.append(d[e]);
          n.loop && s.loopCreate(),
            n.observer || s.update(),
            n.loop ? s.slideTo(l + s.loopedSlides, 0, !1) : s.slideTo(l, 0, !1);
        }
        function J(e) {
          const t = this,
            { params: s, $wrapperEl: i, activeIndex: n } = t;
          let a = n;
          s.loop &&
            ((a -= t.loopedSlides),
            t.loopDestroy(),
            (t.slides = i.children(`.${s.slideClass}`)));
          let r,
            o = a;
          if ("object" == typeof e && "length" in e) {
            for (let s = 0; s < e.length; s += 1)
              (r = e[s]),
                t.slides[r] && t.slides.eq(r).remove(),
                r < o && (o -= 1);
            o = Math.max(o, 0);
          } else
            (r = e),
              t.slides[r] && t.slides.eq(r).remove(),
              r < o && (o -= 1),
              (o = Math.max(o, 0));
          s.loop && t.loopCreate(),
            s.observer || t.update(),
            s.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1);
        }
        function ee() {
          const e = this,
            t = [];
          for (let s = 0; s < e.slides.length; s += 1) t.push(s);
          e.removeSlide(t);
        }
        function te(e) {
          const {
            effect: t,
            swiper: s,
            on: i,
            setTranslate: n,
            setTransition: a,
            overwriteParams: r,
            perspective: o,
            recreateShadows: l,
            getEffectParams: d,
          } = e;
          let c;
          i("beforeInit", () => {
            if (s.params.effect !== t) return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`),
              o &&
                o() &&
                s.classNames.push(`${s.params.containerModifierClass}3d`);
            const e = r ? r() : {};
            Object.assign(s.params, e), Object.assign(s.originalParams, e);
          }),
            i("setTranslate", () => {
              s.params.effect === t && n();
            }),
            i("setTransition", (e, i) => {
              s.params.effect === t && a(i);
            }),
            i("transitionEnd", () => {
              if (s.params.effect === t && l) {
                if (!d || !d().slideShadows) return;
                s.slides.each((e) => {
                  s.$(e)
                    .find(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .remove();
                }),
                  l();
              }
            }),
            i("virtualUpdate", () => {
              s.params.effect === t &&
                (s.slides.length || (c = !0),
                requestAnimationFrame(() => {
                  c && s.slides && s.slides.length && (n(), (c = !1));
                }));
            });
        }
        function se(e, t) {
          return e.transformEl
            ? t
                .find(e.transformEl)
                .css({
                  "backface-visibility": "hidden",
                  "-webkit-backface-visibility": "hidden",
                })
            : t;
        }
        function ie(e) {
          let { swiper: t, duration: s, transformEl: i, allSlides: n } = e;
          const { slides: a, activeIndex: r, $wrapperEl: o } = t;
          if (t.params.virtualTranslate && 0 !== s) {
            let e,
              s = !1;
            (e = n ? (i ? a.find(i) : a) : i ? a.eq(r).find(i) : a.eq(r)),
              e.transitionEnd(() => {
                if (s) return;
                if (!t || t.destroyed) return;
                (s = !0), (t.animating = !1);
                const e = ["webkitTransitionEnd", "transitionend"];
                for (let t = 0; t < e.length; t += 1) o.trigger(e[t]);
              });
          }
        }
        function ne(e, t, s) {
          const i = "swiper-slide-shadow" + (s ? `-${s}` : ""),
            n = e.transformEl ? t.find(e.transformEl) : t;
          let a = n.children(`.${i}`);
          return (
            a.length ||
              ((a = d(
                `<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`
              )),
              n.append(a)),
            a
          );
        }
        Object.keys(q).forEach((e) => {
          Object.keys(q[e]).forEach((t) => {
            V.prototype[t] = q[e][t];
          });
        }),
          V.use([
            function (e) {
              let { swiper: t, on: s, emit: i } = e;
              const n = a();
              let r = null,
                o = null;
              const l = () => {
                  t &&
                    !t.destroyed &&
                    t.initialized &&
                    (i("beforeResize"), i("resize"));
                },
                d = () => {
                  t && !t.destroyed && t.initialized && i("orientationchange");
                };
              s("init", () => {
                t.params.resizeObserver && void 0 !== n.ResizeObserver
                  ? t &&
                    !t.destroyed &&
                    t.initialized &&
                    ((r = new ResizeObserver((e) => {
                      o = n.requestAnimationFrame(() => {
                        const { width: s, height: i } = t;
                        let n = s,
                          a = i;
                        e.forEach((e) => {
                          let {
                            contentBoxSize: s,
                            contentRect: i,
                            target: r,
                          } = e;
                          (r && r !== t.el) ||
                            ((n = i ? i.width : (s[0] || s).inlineSize),
                            (a = i ? i.height : (s[0] || s).blockSize));
                        }),
                          (n === s && a === i) || l();
                      });
                    })),
                    r.observe(t.el))
                  : (n.addEventListener("resize", l),
                    n.addEventListener("orientationchange", d));
              }),
                s("destroy", () => {
                  o && n.cancelAnimationFrame(o),
                    r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
                    n.removeEventListener("resize", l),
                    n.removeEventListener("orientationchange", d);
                });
            },
            function (e) {
              let { swiper: t, extendParams: s, on: i, emit: n } = e;
              const r = [],
                o = a(),
                l = function (e, t) {
                  void 0 === t && (t = {});
                  const s = new (o.MutationObserver ||
                    o.WebkitMutationObserver)((e) => {
                    if (1 === e.length) return void n("observerUpdate", e[0]);
                    const t = function () {
                      n("observerUpdate", e[0]);
                    };
                    o.requestAnimationFrame
                      ? o.requestAnimationFrame(t)
                      : o.setTimeout(t, 0);
                  });
                  s.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData:
                      void 0 === t.characterData || t.characterData,
                  }),
                    r.push(s);
                };
              s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                i("init", () => {
                  if (t.params.observer) {
                    if (t.params.observeParents) {
                      const e = t.$el.parents();
                      for (let t = 0; t < e.length; t += 1) l(e[t]);
                    }
                    l(t.$el[0], { childList: t.params.observeSlideChildren }),
                      l(t.$wrapperEl[0], { attributes: !1 });
                  }
                }),
                i("destroy", () => {
                  r.forEach((e) => {
                    e.disconnect();
                  }),
                    r.splice(0, r.length);
                });
            },
          ]);
        const ae = [
          function (e) {
            let t,
              { swiper: s, extendParams: i, on: n, emit: a } = e;
            function r(e, t) {
              const i = s.params.virtual;
              if (i.cache && s.virtual.cache[t]) return s.virtual.cache[t];
              const n = i.renderSlide
                ? d(i.renderSlide.call(s, e, t))
                : d(
                    `<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`
                  );
              return (
                n.attr("data-swiper-slide-index") ||
                  n.attr("data-swiper-slide-index", t),
                i.cache && (s.virtual.cache[t] = n),
                n
              );
            }
            function o(e) {
              const {
                  slidesPerView: t,
                  slidesPerGroup: i,
                  centeredSlides: n,
                } = s.params,
                { addSlidesBefore: o, addSlidesAfter: l } = s.params.virtual,
                {
                  from: d,
                  to: c,
                  slides: p,
                  slidesGrid: u,
                  offset: h,
                } = s.virtual;
              s.params.cssMode || s.updateActiveIndex();
              const m = s.activeIndex || 0;
              let f, g, v;
              (f = s.rtlTranslate
                ? "right"
                : s.isHorizontal()
                ? "left"
                : "top"),
                n
                  ? ((g = Math.floor(t / 2) + i + l),
                    (v = Math.floor(t / 2) + i + o))
                  : ((g = t + (i - 1) + l), (v = i + o));
              const y = Math.max((m || 0) - v, 0),
                b = Math.min((m || 0) + g, p.length - 1),
                w = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0);
              function x() {
                s.updateSlides(),
                  s.updateProgress(),
                  s.updateSlidesClasses(),
                  s.lazy && s.params.lazy.enabled && s.lazy.load(),
                  a("virtualUpdate");
              }
              if (
                (Object.assign(s.virtual, {
                  from: y,
                  to: b,
                  offset: w,
                  slidesGrid: s.slidesGrid,
                }),
                d === y && c === b && !e)
              )
                return (
                  s.slidesGrid !== u && w !== h && s.slides.css(f, `${w}px`),
                  s.updateProgress(),
                  void a("virtualUpdate")
                );
              if (s.params.virtual.renderExternal)
                return (
                  s.params.virtual.renderExternal.call(s, {
                    offset: w,
                    from: y,
                    to: b,
                    slides: (function () {
                      const e = [];
                      for (let t = y; t <= b; t += 1) e.push(p[t]);
                      return e;
                    })(),
                  }),
                  void (s.params.virtual.renderExternalUpdate
                    ? x()
                    : a("virtualUpdate"))
                );
              const C = [],
                S = [];
              if (e) s.$wrapperEl.find(`.${s.params.slideClass}`).remove();
              else
                for (let e = d; e <= c; e += 1)
                  (e < y || e > b) &&
                    s.$wrapperEl
                      .find(
                        `.${s.params.slideClass}[data-swiper-slide-index="${e}"]`
                      )
                      .remove();
              for (let t = 0; t < p.length; t += 1)
                t >= y &&
                  t <= b &&
                  (void 0 === c || e
                    ? S.push(t)
                    : (t > c && S.push(t), t < d && C.push(t)));
              S.forEach((e) => {
                s.$wrapperEl.append(r(p[e], e));
              }),
                C.sort((e, t) => t - e).forEach((e) => {
                  s.$wrapperEl.prepend(r(p[e], e));
                }),
                s.$wrapperEl.children(".swiper-slide").css(f, `${w}px`),
                x();
            }
            i({
              virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0,
              },
            }),
              (s.virtual = {
                cache: {},
                from: void 0,
                to: void 0,
                slides: [],
                offset: 0,
                slidesGrid: [],
              }),
              n("beforeInit", () => {
                s.params.virtual.enabled &&
                  ((s.virtual.slides = s.params.virtual.slides),
                  s.classNames.push(
                    `${s.params.containerModifierClass}virtual`
                  ),
                  (s.params.watchSlidesProgress = !0),
                  (s.originalParams.watchSlidesProgress = !0),
                  s.params.initialSlide || o());
              }),
              n("setTranslate", () => {
                s.params.virtual.enabled &&
                  (s.params.cssMode && !s._immediateVirtual
                    ? (clearTimeout(t),
                      (t = setTimeout(() => {
                        o();
                      }, 100)))
                    : o());
              }),
              n("init update resize", () => {
                s.params.virtual.enabled &&
                  s.params.cssMode &&
                  v(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`);
              }),
              Object.assign(s.virtual, {
                appendSlide: function (e) {
                  if ("object" == typeof e && "length" in e)
                    for (let t = 0; t < e.length; t += 1)
                      e[t] && s.virtual.slides.push(e[t]);
                  else s.virtual.slides.push(e);
                  o(!0);
                },
                prependSlide: function (e) {
                  const t = s.activeIndex;
                  let i = t + 1,
                    n = 1;
                  if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1)
                      e[t] && s.virtual.slides.unshift(e[t]);
                    (i = t + e.length), (n = e.length);
                  } else s.virtual.slides.unshift(e);
                  if (s.params.virtual.cache) {
                    const e = s.virtual.cache,
                      t = {};
                    Object.keys(e).forEach((s) => {
                      const i = e[s],
                        a = i.attr("data-swiper-slide-index");
                      a &&
                        i.attr("data-swiper-slide-index", parseInt(a, 10) + n),
                        (t[parseInt(s, 10) + n] = i);
                    }),
                      (s.virtual.cache = t);
                  }
                  o(!0), s.slideTo(i, 0);
                },
                removeSlide: function (e) {
                  if (null == e) return;
                  let t = s.activeIndex;
                  if (Array.isArray(e))
                    for (let i = e.length - 1; i >= 0; i -= 1)
                      s.virtual.slides.splice(e[i], 1),
                        s.params.virtual.cache && delete s.virtual.cache[e[i]],
                        e[i] < t && (t -= 1),
                        (t = Math.max(t, 0));
                  else
                    s.virtual.slides.splice(e, 1),
                      s.params.virtual.cache && delete s.virtual.cache[e],
                      e < t && (t -= 1),
                      (t = Math.max(t, 0));
                  o(!0), s.slideTo(t, 0);
                },
                removeAllSlides: function () {
                  (s.virtual.slides = []),
                    s.params.virtual.cache && (s.virtual.cache = {}),
                    o(!0),
                    s.slideTo(0, 0);
                },
                update: o,
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: n, emit: r } = e;
            const o = i(),
              l = a();
            function c(e) {
              if (!t.enabled) return;
              const { rtlTranslate: s } = t;
              let i = e;
              i.originalEvent && (i = i.originalEvent);
              const n = i.keyCode || i.charCode,
                a = t.params.keyboard.pageUpDown,
                d = a && 33 === n,
                c = a && 34 === n,
                p = 37 === n,
                u = 39 === n,
                h = 38 === n,
                m = 40 === n;
              if (
                !t.allowSlideNext &&
                ((t.isHorizontal() && u) || (t.isVertical() && m) || c)
              )
                return !1;
              if (
                !t.allowSlidePrev &&
                ((t.isHorizontal() && p) || (t.isVertical() && h) || d)
              )
                return !1;
              if (
                !(
                  i.shiftKey ||
                  i.altKey ||
                  i.ctrlKey ||
                  i.metaKey ||
                  (o.activeElement &&
                    o.activeElement.nodeName &&
                    ("input" === o.activeElement.nodeName.toLowerCase() ||
                      "textarea" === o.activeElement.nodeName.toLowerCase()))
                )
              ) {
                if (
                  t.params.keyboard.onlyInViewport &&
                  (d || c || p || u || h || m)
                ) {
                  let e = !1;
                  if (
                    t.$el.parents(`.${t.params.slideClass}`).length > 0 &&
                    0 === t.$el.parents(`.${t.params.slideActiveClass}`).length
                  )
                    return;
                  const i = t.$el,
                    n = i[0].clientWidth,
                    a = i[0].clientHeight,
                    r = l.innerWidth,
                    o = l.innerHeight,
                    d = t.$el.offset();
                  s && (d.left -= t.$el[0].scrollLeft);
                  const c = [
                    [d.left, d.top],
                    [d.left + n, d.top],
                    [d.left, d.top + a],
                    [d.left + n, d.top + a],
                  ];
                  for (let t = 0; t < c.length; t += 1) {
                    const s = c[t];
                    if (s[0] >= 0 && s[0] <= r && s[1] >= 0 && s[1] <= o) {
                      if (0 === s[0] && 0 === s[1]) continue;
                      e = !0;
                    }
                  }
                  if (!e) return;
                }
                t.isHorizontal()
                  ? ((d || c || p || u) &&
                      (i.preventDefault
                        ? i.preventDefault()
                        : (i.returnValue = !1)),
                    (((c || u) && !s) || ((d || p) && s)) && t.slideNext(),
                    (((d || p) && !s) || ((c || u) && s)) && t.slidePrev())
                  : ((d || c || h || m) &&
                      (i.preventDefault
                        ? i.preventDefault()
                        : (i.returnValue = !1)),
                    (c || m) && t.slideNext(),
                    (d || h) && t.slidePrev()),
                  r("keyPress", n);
              }
            }
            function p() {
              t.keyboard.enabled ||
                (d(o).on("keydown", c), (t.keyboard.enabled = !0));
            }
            function u() {
              t.keyboard.enabled &&
                (d(o).off("keydown", c), (t.keyboard.enabled = !1));
            }
            (t.keyboard = { enabled: !1 }),
              s({
                keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 },
              }),
              n("init", () => {
                t.params.keyboard.enabled && p();
              }),
              n("destroy", () => {
                t.keyboard.enabled && u();
              }),
              Object.assign(t.keyboard, { enable: p, disable: u });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            const r = a();
            let o;
            s({
              mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null,
              },
            }),
              (t.mousewheel = { enabled: !1 });
            let l,
              c = u();
            const h = [];
            function m() {
              t.enabled && (t.mouseEntered = !0);
            }
            function f() {
              t.enabled && (t.mouseEntered = !1);
            }
            function g(e) {
              return !(
                (t.params.mousewheel.thresholdDelta &&
                  e.delta < t.params.mousewheel.thresholdDelta) ||
                (t.params.mousewheel.thresholdTime &&
                  u() - c < t.params.mousewheel.thresholdTime) ||
                (!(e.delta >= 6 && u() - c < 60) &&
                  (e.direction < 0
                    ? (t.isEnd && !t.params.loop) ||
                      t.animating ||
                      (t.slideNext(), n("scroll", e.raw))
                    : (t.isBeginning && !t.params.loop) ||
                      t.animating ||
                      (t.slidePrev(), n("scroll", e.raw)),
                  (c = new r.Date().getTime()),
                  1))
              );
            }
            function v(e) {
              let s = e,
                i = !0;
              if (!t.enabled) return;
              const a = t.params.mousewheel;
              t.params.cssMode && s.preventDefault();
              let r = t.$el;
              if (
                ("container" !== t.params.mousewheel.eventsTarget &&
                  (r = d(t.params.mousewheel.eventsTarget)),
                !t.mouseEntered &&
                  !r[0].contains(s.target) &&
                  !a.releaseOnEdges)
              )
                return !0;
              s.originalEvent && (s = s.originalEvent);
              let c = 0;
              const m = t.rtlTranslate ? -1 : 1,
                f = (function (e) {
                  let t = 0,
                    s = 0,
                    i = 0,
                    n = 0;
                  return (
                    "detail" in e && (s = e.detail),
                    "wheelDelta" in e && (s = -e.wheelDelta / 120),
                    "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120),
                    "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                    "axis" in e &&
                      e.axis === e.HORIZONTAL_AXIS &&
                      ((t = s), (s = 0)),
                    (i = 10 * t),
                    (n = 10 * s),
                    "deltaY" in e && (n = e.deltaY),
                    "deltaX" in e && (i = e.deltaX),
                    e.shiftKey && !i && ((i = n), (n = 0)),
                    (i || n) &&
                      e.deltaMode &&
                      (1 === e.deltaMode
                        ? ((i *= 40), (n *= 40))
                        : ((i *= 800), (n *= 800))),
                    i && !t && (t = i < 1 ? -1 : 1),
                    n && !s && (s = n < 1 ? -1 : 1),
                    { spinX: t, spinY: s, pixelX: i, pixelY: n }
                  );
                })(s);
              if (a.forceToAxis)
                if (t.isHorizontal()) {
                  if (!(Math.abs(f.pixelX) > Math.abs(f.pixelY))) return !0;
                  c = -f.pixelX * m;
                } else {
                  if (!(Math.abs(f.pixelY) > Math.abs(f.pixelX))) return !0;
                  c = -f.pixelY;
                }
              else
                c =
                  Math.abs(f.pixelX) > Math.abs(f.pixelY)
                    ? -f.pixelX * m
                    : -f.pixelY;
              if (0 === c) return !0;
              a.invert && (c = -c);
              let v = t.getTranslate() + c * a.sensitivity;
              if (
                (v >= t.minTranslate() && (v = t.minTranslate()),
                v <= t.maxTranslate() && (v = t.maxTranslate()),
                (i =
                  !!t.params.loop ||
                  !(v === t.minTranslate() || v === t.maxTranslate())),
                i && t.params.nested && s.stopPropagation(),
                t.params.freeMode && t.params.freeMode.enabled)
              ) {
                const e = {
                    time: u(),
                    delta: Math.abs(c),
                    direction: Math.sign(c),
                  },
                  i =
                    l &&
                    e.time < l.time + 500 &&
                    e.delta <= l.delta &&
                    e.direction === l.direction;
                if (!i) {
                  (l = void 0), t.params.loop && t.loopFix();
                  let r = t.getTranslate() + c * a.sensitivity;
                  const d = t.isBeginning,
                    u = t.isEnd;
                  if (
                    (r >= t.minTranslate() && (r = t.minTranslate()),
                    r <= t.maxTranslate() && (r = t.maxTranslate()),
                    t.setTransition(0),
                    t.setTranslate(r),
                    t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses(),
                    ((!d && t.isBeginning) || (!u && t.isEnd)) &&
                      t.updateSlidesClasses(),
                    t.params.freeMode.sticky)
                  ) {
                    clearTimeout(o), (o = void 0), h.length >= 15 && h.shift();
                    const s = h.length ? h[h.length - 1] : void 0,
                      i = h[0];
                    if (
                      (h.push(e),
                      s && (e.delta > s.delta || e.direction !== s.direction))
                    )
                      h.splice(0);
                    else if (
                      h.length >= 15 &&
                      e.time - i.time < 500 &&
                      i.delta - e.delta >= 1 &&
                      e.delta <= 6
                    ) {
                      const s = c > 0 ? 0.8 : 0.2;
                      (l = e),
                        h.splice(0),
                        (o = p(() => {
                          t.slideToClosest(t.params.speed, !0, void 0, s);
                        }, 0));
                    }
                    o ||
                      (o = p(() => {
                        (l = e),
                          h.splice(0),
                          t.slideToClosest(t.params.speed, !0, void 0, 0.5);
                      }, 500));
                  }
                  if (
                    (i || n("scroll", s),
                    t.params.autoplay &&
                      t.params.autoplayDisableOnInteraction &&
                      t.autoplay.stop(),
                    r === t.minTranslate() || r === t.maxTranslate())
                  )
                    return !0;
                }
              } else {
                const s = {
                  time: u(),
                  delta: Math.abs(c),
                  direction: Math.sign(c),
                  raw: e,
                };
                h.length >= 2 && h.shift();
                const i = h.length ? h[h.length - 1] : void 0;
                if (
                  (h.push(s),
                  i
                    ? (s.direction !== i.direction ||
                        s.delta > i.delta ||
                        s.time > i.time + 150) &&
                      g(s)
                    : g(s),
                  (function (e) {
                    const s = t.params.mousewheel;
                    if (e.direction < 0) {
                      if (t.isEnd && !t.params.loop && s.releaseOnEdges)
                        return !0;
                    } else if (
                      t.isBeginning &&
                      !t.params.loop &&
                      s.releaseOnEdges
                    )
                      return !0;
                    return !1;
                  })(s))
                )
                  return !0;
              }
              return (
                s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1
              );
            }
            function y(e) {
              let s = t.$el;
              "container" !== t.params.mousewheel.eventsTarget &&
                (s = d(t.params.mousewheel.eventsTarget)),
                s[e]("mouseenter", m),
                s[e]("mouseleave", f),
                s[e]("wheel", v);
            }
            function b() {
              return t.params.cssMode
                ? (t.wrapperEl.removeEventListener("wheel", v), !0)
                : !t.mousewheel.enabled &&
                    (y("on"), (t.mousewheel.enabled = !0), !0);
            }
            function w() {
              return t.params.cssMode
                ? (t.wrapperEl.addEventListener(event, v), !0)
                : !!t.mousewheel.enabled &&
                    (y("off"), (t.mousewheel.enabled = !1), !0);
            }
            i("init", () => {
              !t.params.mousewheel.enabled && t.params.cssMode && w(),
                t.params.mousewheel.enabled && b();
            }),
              i("destroy", () => {
                t.params.cssMode && b(), t.mousewheel.enabled && w();
              }),
              Object.assign(t.mousewheel, { enable: b, disable: w });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            function a(e) {
              let s;
              return (
                e &&
                  ((s = d(e)),
                  t.params.uniqueNavElements &&
                    "string" == typeof e &&
                    s.length > 1 &&
                    1 === t.$el.find(e).length &&
                    (s = t.$el.find(e))),
                s
              );
            }
            function r(e, s) {
              const i = t.params.navigation;
              e &&
                e.length > 0 &&
                (e[s ? "addClass" : "removeClass"](i.disabledClass),
                e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
                t.params.watchOverflow &&
                  t.enabled &&
                  e[t.isLocked ? "addClass" : "removeClass"](i.lockClass));
            }
            function o() {
              if (t.params.loop) return;
              const { $nextEl: e, $prevEl: s } = t.navigation;
              r(s, t.isBeginning && !t.params.rewind),
                r(e, t.isEnd && !t.params.rewind);
            }
            function l(e) {
              e.preventDefault(),
                (!t.isBeginning || t.params.loop || t.params.rewind) &&
                  (t.slidePrev(), n("navigationPrev"));
            }
            function c(e) {
              e.preventDefault(),
                (!t.isEnd || t.params.loop || t.params.rewind) &&
                  (t.slideNext(), n("navigationNext"));
            }
            function p() {
              const e = t.params.navigation;
              if (
                ((t.params.navigation = W(
                  t,
                  t.originalParams.navigation,
                  t.params.navigation,
                  { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
                )),
                !e.nextEl && !e.prevEl)
              )
                return;
              const s = a(e.nextEl),
                i = a(e.prevEl);
              s && s.length > 0 && s.on("click", c),
                i && i.length > 0 && i.on("click", l),
                Object.assign(t.navigation, {
                  $nextEl: s,
                  nextEl: s && s[0],
                  $prevEl: i,
                  prevEl: i && i[0],
                }),
                t.enabled ||
                  (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass));
            }
            function u() {
              const { $nextEl: e, $prevEl: s } = t.navigation;
              e &&
                e.length &&
                (e.off("click", c),
                e.removeClass(t.params.navigation.disabledClass)),
                s &&
                  s.length &&
                  (s.off("click", l),
                  s.removeClass(t.params.navigation.disabledClass));
            }
            s({
              navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled",
              },
            }),
              (t.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null,
              }),
              i("init", () => {
                !1 === t.params.navigation.enabled ? h() : (p(), o());
              }),
              i("toEdge fromEdge lock unlock", () => {
                o();
              }),
              i("destroy", () => {
                u();
              }),
              i("enable disable", () => {
                const { $nextEl: e, $prevEl: s } = t.navigation;
                e &&
                  e[t.enabled ? "removeClass" : "addClass"](
                    t.params.navigation.lockClass
                  ),
                  s &&
                    s[t.enabled ? "removeClass" : "addClass"](
                      t.params.navigation.lockClass
                    );
              }),
              i("click", (e, s) => {
                const { $nextEl: i, $prevEl: a } = t.navigation,
                  r = s.target;
                if (
                  t.params.navigation.hideOnClick &&
                  !d(r).is(a) &&
                  !d(r).is(i)
                ) {
                  if (
                    t.pagination &&
                    t.params.pagination &&
                    t.params.pagination.clickable &&
                    (t.pagination.el === r || t.pagination.el.contains(r))
                  )
                    return;
                  let e;
                  i
                    ? (e = i.hasClass(t.params.navigation.hiddenClass))
                    : a && (e = a.hasClass(t.params.navigation.hiddenClass)),
                    n(!0 === e ? "navigationShow" : "navigationHide"),
                    i && i.toggleClass(t.params.navigation.hiddenClass),
                    a && a.toggleClass(t.params.navigation.hiddenClass);
                }
              });
            const h = () => {
              t.$el.addClass(t.params.navigation.navigationDisabledClass), u();
            };
            Object.assign(t.navigation, {
              enable: () => {
                t.$el.removeClass(t.params.navigation.navigationDisabledClass),
                  p(),
                  o();
              },
              disable: h,
              update: o,
              init: p,
              destroy: u,
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            const a = "swiper-pagination";
            let r;
            s({
              pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: (e) => e,
                formatFractionTotal: (e) => e,
                bulletClass: `${a}-bullet`,
                bulletActiveClass: `${a}-bullet-active`,
                modifierClass: `${a}-`,
                currentClass: `${a}-current`,
                totalClass: `${a}-total`,
                hiddenClass: `${a}-hidden`,
                progressbarFillClass: `${a}-progressbar-fill`,
                progressbarOppositeClass: `${a}-progressbar-opposite`,
                clickableClass: `${a}-clickable`,
                lockClass: `${a}-lock`,
                horizontalClass: `${a}-horizontal`,
                verticalClass: `${a}-vertical`,
                paginationDisabledClass: `${a}-disabled`,
              },
            }),
              (t.pagination = { el: null, $el: null, bullets: [] });
            let o = 0;
            function l() {
              return (
                !t.params.pagination.el ||
                !t.pagination.el ||
                !t.pagination.$el ||
                0 === t.pagination.$el.length
              );
            }
            function c(e, s) {
              const { bulletActiveClass: i } = t.params.pagination;
              e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
            }
            function p() {
              const e = t.rtl,
                s = t.params.pagination;
              if (l()) return;
              const i =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.slides.length
                    : t.slides.length,
                a = t.pagination.$el;
              let p;
              const u = t.params.loop
                ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup)
                : t.snapGrid.length;
              if (
                (t.params.loop
                  ? ((p = Math.ceil(
                      (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                    )),
                    p > i - 1 - 2 * t.loopedSlides &&
                      (p -= i - 2 * t.loopedSlides),
                    p > u - 1 && (p -= u),
                    p < 0 &&
                      "bullets" !== t.params.paginationType &&
                      (p = u + p))
                  : (p =
                      void 0 !== t.snapIndex
                        ? t.snapIndex
                        : t.activeIndex || 0),
                "bullets" === s.type &&
                  t.pagination.bullets &&
                  t.pagination.bullets.length > 0)
              ) {
                const i = t.pagination.bullets;
                let n, l, u;
                if (
                  (s.dynamicBullets &&
                    ((r = i
                      .eq(0)
                      [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                    a.css(
                      t.isHorizontal() ? "width" : "height",
                      r * (s.dynamicMainBullets + 4) + "px"
                    ),
                    s.dynamicMainBullets > 1 &&
                      void 0 !== t.previousIndex &&
                      ((o += p - (t.previousIndex - t.loopedSlides || 0)),
                      o > s.dynamicMainBullets - 1
                        ? (o = s.dynamicMainBullets - 1)
                        : o < 0 && (o = 0)),
                    (n = Math.max(p - o, 0)),
                    (l = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                    (u = (l + n) / 2)),
                  i.removeClass(
                    ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                      .map((e) => `${s.bulletActiveClass}${e}`)
                      .join(" ")
                  ),
                  a.length > 1)
                )
                  i.each((e) => {
                    const t = d(e),
                      i = t.index();
                    i === p && t.addClass(s.bulletActiveClass),
                      s.dynamicBullets &&
                        (i >= n &&
                          i <= l &&
                          t.addClass(`${s.bulletActiveClass}-main`),
                        i === n && c(t, "prev"),
                        i === l && c(t, "next"));
                  });
                else {
                  const e = i.eq(p),
                    a = e.index();
                  if ((e.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                    const e = i.eq(n),
                      r = i.eq(l);
                    for (let e = n; e <= l; e += 1)
                      i.eq(e).addClass(`${s.bulletActiveClass}-main`);
                    if (t.params.loop)
                      if (a >= i.length) {
                        for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                          i.eq(i.length - e).addClass(
                            `${s.bulletActiveClass}-main`
                          );
                        i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                          `${s.bulletActiveClass}-prev`
                        );
                      } else c(e, "prev"), c(r, "next");
                    else c(e, "prev"), c(r, "next");
                  }
                }
                if (s.dynamicBullets) {
                  const n = Math.min(i.length, s.dynamicMainBullets + 4),
                    a = (r * n - r) / 2 - u * r,
                    o = e ? "right" : "left";
                  i.css(t.isHorizontal() ? o : "top", `${a}px`);
                }
              }
              if (
                ("fraction" === s.type &&
                  (a
                    .find(U(s.currentClass))
                    .text(s.formatFractionCurrent(p + 1)),
                  a.find(U(s.totalClass)).text(s.formatFractionTotal(u))),
                "progressbar" === s.type)
              ) {
                let e;
                e = s.progressbarOpposite
                  ? t.isHorizontal()
                    ? "vertical"
                    : "horizontal"
                  : t.isHorizontal()
                  ? "horizontal"
                  : "vertical";
                const i = (p + 1) / u;
                let n = 1,
                  r = 1;
                "horizontal" === e ? (n = i) : (r = i),
                  a
                    .find(U(s.progressbarFillClass))
                    .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${r})`)
                    .transition(t.params.speed);
              }
              "custom" === s.type && s.renderCustom
                ? (a.html(s.renderCustom(t, p + 1, u)),
                  n("paginationRender", a[0]))
                : n("paginationUpdate", a[0]),
                t.params.watchOverflow &&
                  t.enabled &&
                  a[t.isLocked ? "addClass" : "removeClass"](s.lockClass);
            }
            function u() {
              const e = t.params.pagination;
              if (l()) return;
              const s =
                  t.virtual && t.params.virtual.enabled
                    ? t.virtual.slides.length
                    : t.slides.length,
                i = t.pagination.$el;
              let a = "";
              if ("bullets" === e.type) {
                let n = t.params.loop
                  ? Math.ceil(
                      (s - 2 * t.loopedSlides) / t.params.slidesPerGroup
                    )
                  : t.snapGrid.length;
                t.params.freeMode &&
                  t.params.freeMode.enabled &&
                  !t.params.loop &&
                  n > s &&
                  (n = s);
                for (let s = 0; s < n; s += 1)
                  e.renderBullet
                    ? (a += e.renderBullet.call(t, s, e.bulletClass))
                    : (a += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`);
                i.html(a), (t.pagination.bullets = i.find(U(e.bulletClass)));
              }
              "fraction" === e.type &&
                ((a = e.renderFraction
                  ? e.renderFraction.call(t, e.currentClass, e.totalClass)
                  : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
                i.html(a)),
                "progressbar" === e.type &&
                  ((a = e.renderProgressbar
                    ? e.renderProgressbar.call(t, e.progressbarFillClass)
                    : `<span class="${e.progressbarFillClass}"></span>`),
                  i.html(a)),
                "custom" !== e.type &&
                  n("paginationRender", t.pagination.$el[0]);
            }
            function h() {
              t.params.pagination = W(
                t,
                t.originalParams.pagination,
                t.params.pagination,
                { el: "swiper-pagination" }
              );
              const e = t.params.pagination;
              if (!e.el) return;
              let s = d(e.el);
              0 !== s.length &&
                (t.params.uniqueNavElements &&
                  "string" == typeof e.el &&
                  s.length > 1 &&
                  ((s = t.$el.find(e.el)),
                  s.length > 1 &&
                    (s = s.filter((e) => d(e).parents(".swiper")[0] === t.el))),
                "bullets" === e.type &&
                  e.clickable &&
                  s.addClass(e.clickableClass),
                s.addClass(e.modifierClass + e.type),
                s.addClass(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass
                ),
                "bullets" === e.type &&
                  e.dynamicBullets &&
                  (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
                  (o = 0),
                  e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type &&
                  e.progressbarOpposite &&
                  s.addClass(e.progressbarOppositeClass),
                e.clickable &&
                  s.on("click", U(e.bulletClass), function (e) {
                    e.preventDefault();
                    let s = d(this).index() * t.params.slidesPerGroup;
                    t.params.loop && (s += t.loopedSlides), t.slideTo(s);
                  }),
                Object.assign(t.pagination, { $el: s, el: s[0] }),
                t.enabled || s.addClass(e.lockClass));
            }
            function m() {
              const e = t.params.pagination;
              if (l()) return;
              const s = t.pagination.$el;
              s.removeClass(e.hiddenClass),
                s.removeClass(e.modifierClass + e.type),
                s.removeClass(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass
                ),
                t.pagination.bullets &&
                  t.pagination.bullets.removeClass &&
                  t.pagination.bullets.removeClass(e.bulletActiveClass),
                e.clickable && s.off("click", U(e.bulletClass));
            }
            i("init", () => {
              !1 === t.params.pagination.enabled ? f() : (h(), u(), p());
            }),
              i("activeIndexChange", () => {
                (t.params.loop || void 0 === t.snapIndex) && p();
              }),
              i("snapIndexChange", () => {
                t.params.loop || p();
              }),
              i("slidesLengthChange", () => {
                t.params.loop && (u(), p());
              }),
              i("snapGridLengthChange", () => {
                t.params.loop || (u(), p());
              }),
              i("destroy", () => {
                m();
              }),
              i("enable disable", () => {
                const { $el: e } = t.pagination;
                e &&
                  e[t.enabled ? "removeClass" : "addClass"](
                    t.params.pagination.lockClass
                  );
              }),
              i("lock unlock", () => {
                p();
              }),
              i("click", (e, s) => {
                const i = s.target,
                  { $el: a } = t.pagination;
                if (
                  t.params.pagination.el &&
                  t.params.pagination.hideOnClick &&
                  a &&
                  a.length > 0 &&
                  !d(i).hasClass(t.params.pagination.bulletClass)
                ) {
                  if (
                    t.navigation &&
                    ((t.navigation.nextEl && i === t.navigation.nextEl) ||
                      (t.navigation.prevEl && i === t.navigation.prevEl))
                  )
                    return;
                  const e = a.hasClass(t.params.pagination.hiddenClass);
                  n(!0 === e ? "paginationShow" : "paginationHide"),
                    a.toggleClass(t.params.pagination.hiddenClass);
                }
              });
            const f = () => {
              t.$el.addClass(t.params.pagination.paginationDisabledClass),
                t.pagination.$el &&
                  t.pagination.$el.addClass(
                    t.params.pagination.paginationDisabledClass
                  ),
                m();
            };
            Object.assign(t.pagination, {
              enable: () => {
                t.$el.removeClass(t.params.pagination.paginationDisabledClass),
                  t.pagination.$el &&
                    t.pagination.$el.removeClass(
                      t.params.pagination.paginationDisabledClass
                    ),
                  h(),
                  u(),
                  p();
              },
              disable: f,
              render: u,
              update: p,
              init: h,
              destroy: m,
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: n, emit: a } = e;
            const r = i();
            let o,
              l,
              c,
              u,
              h = !1,
              m = null,
              f = null;
            function g() {
              if (!t.params.scrollbar.el || !t.scrollbar.el) return;
              const { scrollbar: e, rtlTranslate: s, progress: i } = t,
                { $dragEl: n, $el: a } = e,
                r = t.params.scrollbar;
              let o = l,
                d = (c - l) * i;
              s
                ? ((d = -d),
                  d > 0 ? ((o = l - d), (d = 0)) : -d + l > c && (o = c + d))
                : d < 0
                ? ((o = l + d), (d = 0))
                : d + l > c && (o = c - d),
                t.isHorizontal()
                  ? (n.transform(`translate3d(${d}px, 0, 0)`),
                    (n[0].style.width = `${o}px`))
                  : (n.transform(`translate3d(0px, ${d}px, 0)`),
                    (n[0].style.height = `${o}px`)),
                r.hide &&
                  (clearTimeout(m),
                  (a[0].style.opacity = 1),
                  (m = setTimeout(() => {
                    (a[0].style.opacity = 0), a.transition(400);
                  }, 1e3)));
            }
            function v() {
              if (!t.params.scrollbar.el || !t.scrollbar.el) return;
              const { scrollbar: e } = t,
                { $dragEl: s, $el: i } = e;
              (s[0].style.width = ""),
                (s[0].style.height = ""),
                (c = t.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight),
                (u =
                  t.size /
                  (t.virtualSize +
                    t.params.slidesOffsetBefore -
                    (t.params.centeredSlides ? t.snapGrid[0] : 0))),
                (l =
                  "auto" === t.params.scrollbar.dragSize
                    ? c * u
                    : parseInt(t.params.scrollbar.dragSize, 10)),
                t.isHorizontal()
                  ? (s[0].style.width = `${l}px`)
                  : (s[0].style.height = `${l}px`),
                (i[0].style.display = u >= 1 ? "none" : ""),
                t.params.scrollbar.hide && (i[0].style.opacity = 0),
                t.params.watchOverflow &&
                  t.enabled &&
                  e.$el[t.isLocked ? "addClass" : "removeClass"](
                    t.params.scrollbar.lockClass
                  );
            }
            function y(e) {
              return t.isHorizontal()
                ? "touchstart" === e.type || "touchmove" === e.type
                  ? e.targetTouches[0].clientX
                  : e.clientX
                : "touchstart" === e.type || "touchmove" === e.type
                ? e.targetTouches[0].clientY
                : e.clientY;
            }
            function b(e) {
              const { scrollbar: s, rtlTranslate: i } = t,
                { $el: n } = s;
              let a;
              (a =
                (y(e) -
                  n.offset()[t.isHorizontal() ? "left" : "top"] -
                  (null !== o ? o : l / 2)) /
                (c - l)),
                (a = Math.max(Math.min(a, 1), 0)),
                i && (a = 1 - a);
              const r =
                t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * a;
              t.updateProgress(r),
                t.setTranslate(r),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            }
            function w(e) {
              const s = t.params.scrollbar,
                { scrollbar: i, $wrapperEl: n } = t,
                { $el: r, $dragEl: l } = i;
              (h = !0),
                (o =
                  e.target === l[0] || e.target === l
                    ? y(e) -
                      e.target.getBoundingClientRect()[
                        t.isHorizontal() ? "left" : "top"
                      ]
                    : null),
                e.preventDefault(),
                e.stopPropagation(),
                n.transition(100),
                l.transition(100),
                b(e),
                clearTimeout(f),
                r.transition(0),
                s.hide && r.css("opacity", 1),
                t.params.cssMode &&
                  t.$wrapperEl.css("scroll-snap-type", "none"),
                a("scrollbarDragStart", e);
            }
            function x(e) {
              const { scrollbar: s, $wrapperEl: i } = t,
                { $el: n, $dragEl: r } = s;
              h &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                b(e),
                i.transition(0),
                n.transition(0),
                r.transition(0),
                a("scrollbarDragMove", e));
            }
            function C(e) {
              const s = t.params.scrollbar,
                { scrollbar: i, $wrapperEl: n } = t,
                { $el: r } = i;
              h &&
                ((h = !1),
                t.params.cssMode &&
                  (t.$wrapperEl.css("scroll-snap-type", ""), n.transition("")),
                s.hide &&
                  (clearTimeout(f),
                  (f = p(() => {
                    r.css("opacity", 0), r.transition(400);
                  }, 1e3))),
                a("scrollbarDragEnd", e),
                s.snapOnRelease && t.slideToClosest());
            }
            function S(e) {
              const {
                  scrollbar: s,
                  touchEventsTouch: i,
                  touchEventsDesktop: n,
                  params: a,
                  support: o,
                } = t,
                l = s.$el;
              if (!l) return;
              const d = l[0],
                c = !(!o.passiveListener || !a.passiveListeners) && {
                  passive: !1,
                  capture: !1,
                },
                p = !(!o.passiveListener || !a.passiveListeners) && {
                  passive: !0,
                  capture: !1,
                };
              if (!d) return;
              const u = "on" === e ? "addEventListener" : "removeEventListener";
              o.touch
                ? (d[u](i.start, w, c), d[u](i.move, x, c), d[u](i.end, C, p))
                : (d[u](n.start, w, c), r[u](n.move, x, c), r[u](n.end, C, p));
            }
            function E() {
              const { scrollbar: e, $el: s } = t;
              t.params.scrollbar = W(
                t,
                t.originalParams.scrollbar,
                t.params.scrollbar,
                { el: "swiper-scrollbar" }
              );
              const i = t.params.scrollbar;
              if (!i.el) return;
              let n = d(i.el);
              t.params.uniqueNavElements &&
                "string" == typeof i.el &&
                n.length > 1 &&
                1 === s.find(i.el).length &&
                (n = s.find(i.el)),
                n.addClass(
                  t.isHorizontal() ? i.horizontalClass : i.verticalClass
                );
              let a = n.find(`.${t.params.scrollbar.dragClass}`);
              0 === a.length &&
                ((a = d(`<div class="${t.params.scrollbar.dragClass}"></div>`)),
                n.append(a)),
                Object.assign(e, {
                  $el: n,
                  el: n[0],
                  $dragEl: a,
                  dragEl: a[0],
                }),
                i.draggable &&
                  t.params.scrollbar.el &&
                  t.scrollbar.el &&
                  S("on"),
                n &&
                  n[t.enabled ? "removeClass" : "addClass"](
                    t.params.scrollbar.lockClass
                  );
            }
            function T() {
              const e = t.params.scrollbar,
                s = t.scrollbar.$el;
              s &&
                s.removeClass(
                  t.isHorizontal() ? e.horizontalClass : e.verticalClass
                ),
                t.params.scrollbar.el && t.scrollbar.el && S("off");
            }
            s({
              scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: "swiper-scrollbar-horizontal",
                verticalClass: "swiper-scrollbar-vertical",
              },
            }),
              (t.scrollbar = {
                el: null,
                dragEl: null,
                $el: null,
                $dragEl: null,
              }),
              n("init", () => {
                !1 === t.params.scrollbar.enabled ? $() : (E(), v(), g());
              }),
              n("update resize observerUpdate lock unlock", () => {
                v();
              }),
              n("setTranslate", () => {
                g();
              }),
              n("setTransition", (e, s) => {
                !(function (e) {
                  t.params.scrollbar.el &&
                    t.scrollbar.el &&
                    t.scrollbar.$dragEl.transition(e);
                })(s);
              }),
              n("enable disable", () => {
                const { $el: e } = t.scrollbar;
                e &&
                  e[t.enabled ? "removeClass" : "addClass"](
                    t.params.scrollbar.lockClass
                  );
              }),
              n("destroy", () => {
                T();
              });
            const $ = () => {
              t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
                t.scrollbar.$el &&
                  t.scrollbar.$el.addClass(
                    t.params.scrollbar.scrollbarDisabledClass
                  ),
                T();
            };
            Object.assign(t.scrollbar, {
              enable: () => {
                t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),
                  t.scrollbar.$el &&
                    t.scrollbar.$el.removeClass(
                      t.params.scrollbar.scrollbarDisabledClass
                    ),
                  E(),
                  v(),
                  g();
              },
              disable: $,
              updateSize: v,
              setTranslate: g,
              init: E,
              destroy: T,
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({ parallax: { enabled: !1 } });
            const n = (e, s) => {
                const { rtl: i } = t,
                  n = d(e),
                  a = i ? -1 : 1,
                  r = n.attr("data-swiper-parallax") || "0";
                let o = n.attr("data-swiper-parallax-x"),
                  l = n.attr("data-swiper-parallax-y");
                const c = n.attr("data-swiper-parallax-scale"),
                  p = n.attr("data-swiper-parallax-opacity");
                if (
                  (o || l
                    ? ((o = o || "0"), (l = l || "0"))
                    : t.isHorizontal()
                    ? ((o = r), (l = "0"))
                    : ((l = r), (o = "0")),
                  (o =
                    o.indexOf("%") >= 0
                      ? parseInt(o, 10) * s * a + "%"
                      : o * s * a + "px"),
                  (l =
                    l.indexOf("%") >= 0
                      ? parseInt(l, 10) * s + "%"
                      : l * s + "px"),
                  null != p)
                ) {
                  const e = p - (p - 1) * (1 - Math.abs(s));
                  n[0].style.opacity = e;
                }
                if (null == c) n.transform(`translate3d(${o}, ${l}, 0px)`);
                else {
                  const e = c - (c - 1) * (1 - Math.abs(s));
                  n.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`);
                }
              },
              a = () => {
                const { $el: e, slides: s, progress: i, snapGrid: a } = t;
                e
                  .children(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                  )
                  .each((e) => {
                    n(e, i);
                  }),
                  s.each((e, s) => {
                    let r = e.progress;
                    t.params.slidesPerGroup > 1 &&
                      "auto" !== t.params.slidesPerView &&
                      (r += Math.ceil(s / 2) - i * (a.length - 1)),
                      (r = Math.min(Math.max(r, -1), 1)),
                      d(e)
                        .find(
                          "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                        )
                        .each((e) => {
                          n(e, r);
                        });
                  });
              };
            i("beforeInit", () => {
              t.params.parallax.enabled &&
                ((t.params.watchSlidesProgress = !0),
                (t.originalParams.watchSlidesProgress = !0));
            }),
              i("init", () => {
                t.params.parallax.enabled && a();
              }),
              i("setTranslate", () => {
                t.params.parallax.enabled && a();
              }),
              i("setTransition", (e, s) => {
                t.params.parallax.enabled &&
                  (function (e) {
                    void 0 === e && (e = t.params.speed);
                    const { $el: s } = t;
                    s.find(
                      "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                    ).each((t) => {
                      const s = d(t);
                      let i =
                        parseInt(s.attr("data-swiper-parallax-duration"), 10) ||
                        e;
                      0 === e && (i = 0), s.transition(i);
                    });
                  })(s);
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            const r = a();
            s({
              zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed",
              },
            }),
              (t.zoom = { enabled: !1 });
            let o,
              l,
              c,
              p = 1,
              u = !1;
            const m = {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3,
              },
              f = {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {},
              },
              g = {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0,
              };
            let v = 1;
            function y(e) {
              if (e.targetTouches.length < 2) return 1;
              const t = e.targetTouches[0].pageX,
                s = e.targetTouches[0].pageY,
                i = e.targetTouches[1].pageX,
                n = e.targetTouches[1].pageY;
              return Math.sqrt((i - t) ** 2 + (n - s) ** 2);
            }
            function b(e) {
              const s = t.support,
                i = t.params.zoom;
              if (((l = !1), (c = !1), !s.gestures)) {
                if (
                  "touchstart" !== e.type ||
                  ("touchstart" === e.type && e.targetTouches.length < 2)
                )
                  return;
                (l = !0), (m.scaleStart = y(e));
              }
              (m.$slideEl && m.$slideEl.length) ||
              ((m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
              0 === m.$slideEl.length &&
                (m.$slideEl = t.slides.eq(t.activeIndex)),
              (m.$imageEl = m.$slideEl
                .find(`.${i.containerClass}`)
                .eq(0)
                .find("picture, img, svg, canvas, .swiper-zoom-target")
                .eq(0)),
              (m.$imageWrapEl = m.$imageEl.parent(`.${i.containerClass}`)),
              (m.maxRatio =
                m.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
              0 !== m.$imageWrapEl.length)
                ? (m.$imageEl && m.$imageEl.transition(0), (u = !0))
                : (m.$imageEl = void 0);
            }
            function w(e) {
              const s = t.support,
                i = t.params.zoom,
                n = t.zoom;
              if (!s.gestures) {
                if (
                  "touchmove" !== e.type ||
                  ("touchmove" === e.type && e.targetTouches.length < 2)
                )
                  return;
                (c = !0), (m.scaleMove = y(e));
              }
              m.$imageEl && 0 !== m.$imageEl.length
                ? (s.gestures
                    ? (n.scale = e.scale * p)
                    : (n.scale = (m.scaleMove / m.scaleStart) * p),
                  n.scale > m.maxRatio &&
                    (n.scale =
                      m.maxRatio - 1 + (n.scale - m.maxRatio + 1) ** 0.5),
                  n.scale < i.minRatio &&
                    (n.scale =
                      i.minRatio + 1 - (i.minRatio - n.scale + 1) ** 0.5),
                  m.$imageEl.transform(`translate3d(0,0,0) scale(${n.scale})`))
                : "gesturechange" === e.type && b(e);
            }
            function x(e) {
              const s = t.device,
                i = t.support,
                n = t.params.zoom,
                a = t.zoom;
              if (!i.gestures) {
                if (!l || !c) return;
                if (
                  "touchend" !== e.type ||
                  ("touchend" === e.type &&
                    e.changedTouches.length < 2 &&
                    !s.android)
                )
                  return;
                (l = !1), (c = !1);
              }
              m.$imageEl &&
                0 !== m.$imageEl.length &&
                ((a.scale = Math.max(
                  Math.min(a.scale, m.maxRatio),
                  n.minRatio
                )),
                m.$imageEl
                  .transition(t.params.speed)
                  .transform(`translate3d(0,0,0) scale(${a.scale})`),
                (p = a.scale),
                (u = !1),
                1 === a.scale && (m.$slideEl = void 0));
            }
            function C(e) {
              const s = t.zoom;
              if (!m.$imageEl || 0 === m.$imageEl.length) return;
              if (((t.allowClick = !1), !f.isTouched || !m.$slideEl)) return;
              f.isMoved ||
                ((f.width = m.$imageEl[0].offsetWidth),
                (f.height = m.$imageEl[0].offsetHeight),
                (f.startX = h(m.$imageWrapEl[0], "x") || 0),
                (f.startY = h(m.$imageWrapEl[0], "y") || 0),
                (m.slideWidth = m.$slideEl[0].offsetWidth),
                (m.slideHeight = m.$slideEl[0].offsetHeight),
                m.$imageWrapEl.transition(0));
              const i = f.width * s.scale,
                n = f.height * s.scale;
              if (!(i < m.slideWidth && n < m.slideHeight)) {
                if (
                  ((f.minX = Math.min(m.slideWidth / 2 - i / 2, 0)),
                  (f.maxX = -f.minX),
                  (f.minY = Math.min(m.slideHeight / 2 - n / 2, 0)),
                  (f.maxY = -f.minY),
                  (f.touchesCurrent.x =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX),
                  (f.touchesCurrent.y =
                    "touchmove" === e.type
                      ? e.targetTouches[0].pageY
                      : e.pageY),
                  !f.isMoved && !u)
                ) {
                  if (
                    t.isHorizontal() &&
                    ((Math.floor(f.minX) === Math.floor(f.startX) &&
                      f.touchesCurrent.x < f.touchesStart.x) ||
                      (Math.floor(f.maxX) === Math.floor(f.startX) &&
                        f.touchesCurrent.x > f.touchesStart.x))
                  )
                    return void (f.isTouched = !1);
                  if (
                    !t.isHorizontal() &&
                    ((Math.floor(f.minY) === Math.floor(f.startY) &&
                      f.touchesCurrent.y < f.touchesStart.y) ||
                      (Math.floor(f.maxY) === Math.floor(f.startY) &&
                        f.touchesCurrent.y > f.touchesStart.y))
                  )
                    return void (f.isTouched = !1);
                }
                e.cancelable && e.preventDefault(),
                  e.stopPropagation(),
                  (f.isMoved = !0),
                  (f.currentX =
                    f.touchesCurrent.x - f.touchesStart.x + f.startX),
                  (f.currentY =
                    f.touchesCurrent.y - f.touchesStart.y + f.startY),
                  f.currentX < f.minX &&
                    (f.currentX =
                      f.minX + 1 - (f.minX - f.currentX + 1) ** 0.8),
                  f.currentX > f.maxX &&
                    (f.currentX =
                      f.maxX - 1 + (f.currentX - f.maxX + 1) ** 0.8),
                  f.currentY < f.minY &&
                    (f.currentY =
                      f.minY + 1 - (f.minY - f.currentY + 1) ** 0.8),
                  f.currentY > f.maxY &&
                    (f.currentY =
                      f.maxY - 1 + (f.currentY - f.maxY + 1) ** 0.8),
                  g.prevPositionX || (g.prevPositionX = f.touchesCurrent.x),
                  g.prevPositionY || (g.prevPositionY = f.touchesCurrent.y),
                  g.prevTime || (g.prevTime = Date.now()),
                  (g.x =
                    (f.touchesCurrent.x - g.prevPositionX) /
                    (Date.now() - g.prevTime) /
                    2),
                  (g.y =
                    (f.touchesCurrent.y - g.prevPositionY) /
                    (Date.now() - g.prevTime) /
                    2),
                  Math.abs(f.touchesCurrent.x - g.prevPositionX) < 2 &&
                    (g.x = 0),
                  Math.abs(f.touchesCurrent.y - g.prevPositionY) < 2 &&
                    (g.y = 0),
                  (g.prevPositionX = f.touchesCurrent.x),
                  (g.prevPositionY = f.touchesCurrent.y),
                  (g.prevTime = Date.now()),
                  m.$imageWrapEl.transform(
                    `translate3d(${f.currentX}px, ${f.currentY}px,0)`
                  );
              }
            }
            function S() {
              const e = t.zoom;
              m.$slideEl &&
                t.previousIndex !== t.activeIndex &&
                (m.$imageEl &&
                  m.$imageEl.transform("translate3d(0,0,0) scale(1)"),
                m.$imageWrapEl &&
                  m.$imageWrapEl.transform("translate3d(0,0,0)"),
                (e.scale = 1),
                (p = 1),
                (m.$slideEl = void 0),
                (m.$imageEl = void 0),
                (m.$imageWrapEl = void 0));
            }
            function E(e) {
              const s = t.zoom,
                i = t.params.zoom;
              if (
                (m.$slideEl ||
                  (e &&
                    e.target &&
                    (m.$slideEl = d(e.target).closest(
                      `.${t.params.slideClass}`
                    )),
                  m.$slideEl ||
                    (t.params.virtual && t.params.virtual.enabled && t.virtual
                      ? (m.$slideEl = t.$wrapperEl.children(
                          `.${t.params.slideActiveClass}`
                        ))
                      : (m.$slideEl = t.slides.eq(t.activeIndex))),
                  (m.$imageEl = m.$slideEl
                    .find(`.${i.containerClass}`)
                    .eq(0)
                    .find("picture, img, svg, canvas, .swiper-zoom-target")
                    .eq(0)),
                  (m.$imageWrapEl = m.$imageEl.parent(`.${i.containerClass}`))),
                !m.$imageEl ||
                  0 === m.$imageEl.length ||
                  !m.$imageWrapEl ||
                  0 === m.$imageWrapEl.length)
              )
                return;
              let n, a, o, l, c, u, h, g, v, y, b, w, x, C, S, E, T, $;
              t.params.cssMode &&
                ((t.wrapperEl.style.overflow = "hidden"),
                (t.wrapperEl.style.touchAction = "none")),
                m.$slideEl.addClass(`${i.zoomedSlideClass}`),
                void 0 === f.touchesStart.x && e
                  ? ((n =
                      "touchend" === e.type
                        ? e.changedTouches[0].pageX
                        : e.pageX),
                    (a =
                      "touchend" === e.type
                        ? e.changedTouches[0].pageY
                        : e.pageY))
                  : ((n = f.touchesStart.x), (a = f.touchesStart.y)),
                (s.scale =
                  m.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
                (p = m.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio),
                e
                  ? ((T = m.$slideEl[0].offsetWidth),
                    ($ = m.$slideEl[0].offsetHeight),
                    (o = m.$slideEl.offset().left + r.scrollX),
                    (l = m.$slideEl.offset().top + r.scrollY),
                    (c = o + T / 2 - n),
                    (u = l + $ / 2 - a),
                    (v = m.$imageEl[0].offsetWidth),
                    (y = m.$imageEl[0].offsetHeight),
                    (b = v * s.scale),
                    (w = y * s.scale),
                    (x = Math.min(T / 2 - b / 2, 0)),
                    (C = Math.min($ / 2 - w / 2, 0)),
                    (S = -x),
                    (E = -C),
                    (h = c * s.scale),
                    (g = u * s.scale),
                    h < x && (h = x),
                    h > S && (h = S),
                    g < C && (g = C),
                    g > E && (g = E))
                  : ((h = 0), (g = 0)),
                m.$imageWrapEl
                  .transition(300)
                  .transform(`translate3d(${h}px, ${g}px,0)`),
                m.$imageEl
                  .transition(300)
                  .transform(`translate3d(0,0,0) scale(${s.scale})`);
            }
            function T() {
              const e = t.zoom,
                s = t.params.zoom;
              m.$slideEl ||
                (t.params.virtual && t.params.virtual.enabled && t.virtual
                  ? (m.$slideEl = t.$wrapperEl.children(
                      `.${t.params.slideActiveClass}`
                    ))
                  : (m.$slideEl = t.slides.eq(t.activeIndex)),
                (m.$imageEl = m.$slideEl
                  .find(`.${s.containerClass}`)
                  .eq(0)
                  .find("picture, img, svg, canvas, .swiper-zoom-target")
                  .eq(0)),
                (m.$imageWrapEl = m.$imageEl.parent(`.${s.containerClass}`))),
                m.$imageEl &&
                  0 !== m.$imageEl.length &&
                  m.$imageWrapEl &&
                  0 !== m.$imageWrapEl.length &&
                  (t.params.cssMode &&
                    ((t.wrapperEl.style.overflow = ""),
                    (t.wrapperEl.style.touchAction = "")),
                  (e.scale = 1),
                  (p = 1),
                  m.$imageWrapEl
                    .transition(300)
                    .transform("translate3d(0,0,0)"),
                  m.$imageEl
                    .transition(300)
                    .transform("translate3d(0,0,0) scale(1)"),
                  m.$slideEl.removeClass(`${s.zoomedSlideClass}`),
                  (m.$slideEl = void 0));
            }
            function $(e) {
              const s = t.zoom;
              s.scale && 1 !== s.scale ? T() : E(e);
            }
            function M() {
              const e = t.support;
              return {
                passiveListener: !(
                  "touchstart" !== t.touchEvents.start ||
                  !e.passiveListener ||
                  !t.params.passiveListeners
                ) && { passive: !0, capture: !1 },
                activeListenerWithCapture: !e.passiveListener || {
                  passive: !1,
                  capture: !0,
                },
              };
            }
            function I() {
              return `.${t.params.slideClass}`;
            }
            function O(e) {
              const { passiveListener: s } = M(),
                i = I();
              t.$wrapperEl[e]("gesturestart", i, b, s),
                t.$wrapperEl[e]("gesturechange", i, w, s),
                t.$wrapperEl[e]("gestureend", i, x, s);
            }
            function z() {
              o || ((o = !0), O("on"));
            }
            function P() {
              o && ((o = !1), O("off"));
            }
            function L() {
              const e = t.zoom;
              if (e.enabled) return;
              e.enabled = !0;
              const s = t.support,
                { passiveListener: i, activeListenerWithCapture: n } = M(),
                a = I();
              s.gestures
                ? (t.$wrapperEl.on(t.touchEvents.start, z, i),
                  t.$wrapperEl.on(t.touchEvents.end, P, i))
                : "touchstart" === t.touchEvents.start &&
                  (t.$wrapperEl.on(t.touchEvents.start, a, b, i),
                  t.$wrapperEl.on(t.touchEvents.move, a, w, n),
                  t.$wrapperEl.on(t.touchEvents.end, a, x, i),
                  t.touchEvents.cancel &&
                    t.$wrapperEl.on(t.touchEvents.cancel, a, x, i)),
                t.$wrapperEl.on(
                  t.touchEvents.move,
                  `.${t.params.zoom.containerClass}`,
                  C,
                  n
                );
            }
            function k() {
              const e = t.zoom;
              if (!e.enabled) return;
              const s = t.support;
              e.enabled = !1;
              const { passiveListener: i, activeListenerWithCapture: n } = M(),
                a = I();
              s.gestures
                ? (t.$wrapperEl.off(t.touchEvents.start, z, i),
                  t.$wrapperEl.off(t.touchEvents.end, P, i))
                : "touchstart" === t.touchEvents.start &&
                  (t.$wrapperEl.off(t.touchEvents.start, a, b, i),
                  t.$wrapperEl.off(t.touchEvents.move, a, w, n),
                  t.$wrapperEl.off(t.touchEvents.end, a, x, i),
                  t.touchEvents.cancel &&
                    t.$wrapperEl.off(t.touchEvents.cancel, a, x, i)),
                t.$wrapperEl.off(
                  t.touchEvents.move,
                  `.${t.params.zoom.containerClass}`,
                  C,
                  n
                );
            }
            Object.defineProperty(t.zoom, "scale", {
              get: () => v,
              set(e) {
                if (v !== e) {
                  const t = m.$imageEl ? m.$imageEl[0] : void 0,
                    s = m.$slideEl ? m.$slideEl[0] : void 0;
                  n("zoomChange", e, t, s);
                }
                v = e;
              },
            }),
              i("init", () => {
                t.params.zoom.enabled && L();
              }),
              i("destroy", () => {
                k();
              }),
              i("touchStart", (e, s) => {
                t.zoom.enabled &&
                  (function (e) {
                    const s = t.device;
                    m.$imageEl &&
                      0 !== m.$imageEl.length &&
                      (f.isTouched ||
                        (s.android && e.cancelable && e.preventDefault(),
                        (f.isTouched = !0),
                        (f.touchesStart.x =
                          "touchstart" === e.type
                            ? e.targetTouches[0].pageX
                            : e.pageX),
                        (f.touchesStart.y =
                          "touchstart" === e.type
                            ? e.targetTouches[0].pageY
                            : e.pageY)));
                  })(s);
              }),
              i("touchEnd", (e, s) => {
                t.zoom.enabled &&
                  (function () {
                    const e = t.zoom;
                    if (!m.$imageEl || 0 === m.$imageEl.length) return;
                    if (!f.isTouched || !f.isMoved)
                      return (f.isTouched = !1), void (f.isMoved = !1);
                    (f.isTouched = !1), (f.isMoved = !1);
                    let s = 300,
                      i = 300;
                    const n = g.x * s,
                      a = f.currentX + n,
                      r = g.y * i,
                      o = f.currentY + r;
                    0 !== g.x && (s = Math.abs((a - f.currentX) / g.x)),
                      0 !== g.y && (i = Math.abs((o - f.currentY) / g.y));
                    const l = Math.max(s, i);
                    (f.currentX = a), (f.currentY = o);
                    const d = f.width * e.scale,
                      c = f.height * e.scale;
                    (f.minX = Math.min(m.slideWidth / 2 - d / 2, 0)),
                      (f.maxX = -f.minX),
                      (f.minY = Math.min(m.slideHeight / 2 - c / 2, 0)),
                      (f.maxY = -f.minY),
                      (f.currentX = Math.max(
                        Math.min(f.currentX, f.maxX),
                        f.minX
                      )),
                      (f.currentY = Math.max(
                        Math.min(f.currentY, f.maxY),
                        f.minY
                      )),
                      m.$imageWrapEl
                        .transition(l)
                        .transform(
                          `translate3d(${f.currentX}px, ${f.currentY}px,0)`
                        );
                  })();
              }),
              i("doubleTap", (e, s) => {
                !t.animating &&
                  t.params.zoom.enabled &&
                  t.zoom.enabled &&
                  t.params.zoom.toggle &&
                  $(s);
              }),
              i("transitionEnd", () => {
                t.zoom.enabled && t.params.zoom.enabled && S();
              }),
              i("slideChange", () => {
                t.zoom.enabled &&
                  t.params.zoom.enabled &&
                  t.params.cssMode &&
                  S();
              }),
              Object.assign(t.zoom, {
                enable: L,
                disable: k,
                in: E,
                out: T,
                toggle: $,
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i, emit: n } = e;
            s({
              lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader",
              },
            }),
              (t.lazy = {});
            let r = !1,
              o = !1;
            function l(e, s) {
              void 0 === s && (s = !0);
              const i = t.params.lazy;
              if (void 0 === e) return;
              if (0 === t.slides.length) return;
              const a =
                  t.virtual && t.params.virtual.enabled
                    ? t.$wrapperEl.children(
                        `.${t.params.slideClass}[data-swiper-slide-index="${e}"]`
                      )
                    : t.slides.eq(e),
                r = a.find(
                  `.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`
                );
              !a.hasClass(i.elementClass) ||
                a.hasClass(i.loadedClass) ||
                a.hasClass(i.loadingClass) ||
                r.push(a[0]),
                0 !== r.length &&
                  r.each((e) => {
                    const r = d(e);
                    r.addClass(i.loadingClass);
                    const o = r.attr("data-background"),
                      c = r.attr("data-src"),
                      p = r.attr("data-srcset"),
                      u = r.attr("data-sizes"),
                      h = r.parent("picture");
                    t.loadImage(r[0], c || o, p, u, !1, () => {
                      if (null != t && t && (!t || t.params) && !t.destroyed) {
                        if (
                          (o
                            ? (r.css("background-image", `url("${o}")`),
                              r.removeAttr("data-background"))
                            : (p &&
                                (r.attr("srcset", p),
                                r.removeAttr("data-srcset")),
                              u &&
                                (r.attr("sizes", u),
                                r.removeAttr("data-sizes")),
                              h.length &&
                                h.children("source").each((e) => {
                                  const t = d(e);
                                  t.attr("data-srcset") &&
                                    (t.attr("srcset", t.attr("data-srcset")),
                                    t.removeAttr("data-srcset"));
                                }),
                              c &&
                                (r.attr("src", c), r.removeAttr("data-src"))),
                          r.addClass(i.loadedClass).removeClass(i.loadingClass),
                          a.find(`.${i.preloaderClass}`).remove(),
                          t.params.loop && s)
                        ) {
                          const e = a.attr("data-swiper-slide-index");
                          a.hasClass(t.params.slideDuplicateClass)
                            ? l(
                                t.$wrapperEl
                                  .children(
                                    `[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`
                                  )
                                  .index(),
                                !1
                              )
                            : l(
                                t.$wrapperEl
                                  .children(
                                    `.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`
                                  )
                                  .index(),
                                !1
                              );
                        }
                        n("lazyImageReady", a[0], r[0]),
                          t.params.autoHeight && t.updateAutoHeight();
                      }
                    }),
                      n("lazyImageLoad", a[0], r[0]);
                  });
            }
            function c() {
              const { $wrapperEl: e, params: s, slides: i, activeIndex: n } = t,
                a = t.virtual && s.virtual.enabled,
                r = s.lazy;
              let c = s.slidesPerView;
              function p(t) {
                if (a) {
                  if (
                    e.children(
                      `.${s.slideClass}[data-swiper-slide-index="${t}"]`
                    ).length
                  )
                    return !0;
                } else if (i[t]) return !0;
                return !1;
              }
              function u(e) {
                return a ? d(e).attr("data-swiper-slide-index") : d(e).index();
              }
              if (
                ("auto" === c && (c = 0),
                o || (o = !0),
                t.params.watchSlidesProgress)
              )
                e.children(`.${s.slideVisibleClass}`).each((e) => {
                  l(a ? d(e).attr("data-swiper-slide-index") : d(e).index());
                });
              else if (c > 1) for (let e = n; e < n + c; e += 1) p(e) && l(e);
              else l(n);
              if (r.loadPrevNext)
                if (
                  c > 1 ||
                  (r.loadPrevNextAmount && r.loadPrevNextAmount > 1)
                ) {
                  const e = r.loadPrevNextAmount,
                    t = Math.ceil(c),
                    s = Math.min(n + t + Math.max(e, t), i.length),
                    a = Math.max(n - Math.max(t, e), 0);
                  for (let e = n + t; e < s; e += 1) p(e) && l(e);
                  for (let e = a; e < n; e += 1) p(e) && l(e);
                } else {
                  const t = e.children(`.${s.slideNextClass}`);
                  t.length > 0 && l(u(t));
                  const i = e.children(`.${s.slidePrevClass}`);
                  i.length > 0 && l(u(i));
                }
            }
            function p() {
              const e = a();
              if (!t || t.destroyed) return;
              const s = t.params.lazy.scrollingElement
                  ? d(t.params.lazy.scrollingElement)
                  : d(e),
                i = s[0] === e,
                n = i ? e.innerWidth : s[0].offsetWidth,
                o = i ? e.innerHeight : s[0].offsetHeight,
                l = t.$el.offset(),
                { rtlTranslate: u } = t;
              let h = !1;
              u && (l.left -= t.$el[0].scrollLeft);
              const m = [
                [l.left, l.top],
                [l.left + t.width, l.top],
                [l.left, l.top + t.height],
                [l.left + t.width, l.top + t.height],
              ];
              for (let e = 0; e < m.length; e += 1) {
                const t = m[e];
                if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= o) {
                  if (0 === t[0] && 0 === t[1]) continue;
                  h = !0;
                }
              }
              const f = !(
                "touchstart" !== t.touchEvents.start ||
                !t.support.passiveListener ||
                !t.params.passiveListeners
              ) && { passive: !0, capture: !1 };
              h
                ? (c(), s.off("scroll", p, f))
                : r || ((r = !0), s.on("scroll", p, f));
            }
            i("beforeInit", () => {
              t.params.lazy.enabled &&
                t.params.preloadImages &&
                (t.params.preloadImages = !1);
            }),
              i("init", () => {
                t.params.lazy.enabled &&
                  (t.params.lazy.checkInView ? p() : c());
              }),
              i("scroll", () => {
                t.params.freeMode &&
                  t.params.freeMode.enabled &&
                  !t.params.freeMode.sticky &&
                  c();
              }),
              i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
                t.params.lazy.enabled &&
                  (t.params.lazy.checkInView ? p() : c());
              }),
              i("transitionStart", () => {
                t.params.lazy.enabled &&
                  (t.params.lazy.loadOnTransitionStart ||
                    (!t.params.lazy.loadOnTransitionStart && !o)) &&
                  (t.params.lazy.checkInView ? p() : c());
              }),
              i("transitionEnd", () => {
                t.params.lazy.enabled &&
                  !t.params.lazy.loadOnTransitionStart &&
                  (t.params.lazy.checkInView ? p() : c());
              }),
              i("slideChange", () => {
                const {
                  lazy: e,
                  cssMode: s,
                  watchSlidesProgress: i,
                  touchReleaseOnEdges: n,
                  resistanceRatio: a,
                } = t.params;
                e.enabled && (s || (i && (n || 0 === a))) && c();
              }),
              i("destroy", () => {
                t.$el &&
                  t.$el
                    .find(`.${t.params.lazy.loadingClass}`)
                    .removeClass(t.params.lazy.loadingClass);
              }),
              Object.assign(t.lazy, { load: c, loadInSlide: l });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            function n(e, t) {
              const s = (function () {
                let e, t, s;
                return (i, n) => {
                  for (t = -1, e = i.length; e - t > 1; )
                    (s = (e + t) >> 1), i[s] <= n ? (t = s) : (e = s);
                  return e;
                };
              })();
              let i, n;
              return (
                (this.x = e),
                (this.y = t),
                (this.lastIndex = e.length - 1),
                (this.interpolate = function (e) {
                  return e
                    ? ((n = s(this.x, e)),
                      (i = n - 1),
                      ((e - this.x[i]) * (this.y[n] - this.y[i])) /
                        (this.x[n] - this.x[i]) +
                        this.y[i])
                    : 0;
                }),
                this
              );
            }
            function a() {
              t.controller.control &&
                t.controller.spline &&
                ((t.controller.spline = void 0), delete t.controller.spline);
            }
            s({ controller: { control: void 0, inverse: !1, by: "slide" } }),
              (t.controller = { control: void 0 }),
              i("beforeInit", () => {
                t.controller.control = t.params.controller.control;
              }),
              i("update", () => {
                a();
              }),
              i("resize", () => {
                a();
              }),
              i("observerUpdate", () => {
                a();
              }),
              i("setTranslate", (e, s, i) => {
                t.controller.control && t.controller.setTranslate(s, i);
              }),
              i("setTransition", (e, s, i) => {
                t.controller.control && t.controller.setTransition(s, i);
              }),
              Object.assign(t.controller, {
                setTranslate: function (e, s) {
                  const i = t.controller.control;
                  let a, r;
                  const o = t.constructor;
                  function l(e) {
                    const s = t.rtlTranslate ? -t.translate : t.translate;
                    "slide" === t.params.controller.by &&
                      ((function (e) {
                        t.controller.spline ||
                          (t.controller.spline = t.params.loop
                            ? new n(t.slidesGrid, e.slidesGrid)
                            : new n(t.snapGrid, e.snapGrid));
                      })(e),
                      (r = -t.controller.spline.interpolate(-s))),
                      (r && "container" !== t.params.controller.by) ||
                        ((a =
                          (e.maxTranslate() - e.minTranslate()) /
                          (t.maxTranslate() - t.minTranslate())),
                        (r = (s - t.minTranslate()) * a + e.minTranslate())),
                      t.params.controller.inverse && (r = e.maxTranslate() - r),
                      e.updateProgress(r),
                      e.setTranslate(r, t),
                      e.updateActiveIndex(),
                      e.updateSlidesClasses();
                  }
                  if (Array.isArray(i))
                    for (let e = 0; e < i.length; e += 1)
                      i[e] !== s && i[e] instanceof o && l(i[e]);
                  else i instanceof o && s !== i && l(i);
                },
                setTransition: function (e, s) {
                  const i = t.constructor,
                    n = t.controller.control;
                  let a;
                  function r(s) {
                    s.setTransition(e, t),
                      0 !== e &&
                        (s.transitionStart(),
                        s.params.autoHeight &&
                          p(() => {
                            s.updateAutoHeight();
                          }),
                        s.$wrapperEl.transitionEnd(() => {
                          n &&
                            (s.params.loop &&
                              "slide" === t.params.controller.by &&
                              s.loopFix(),
                            s.transitionEnd());
                        }));
                  }
                  if (Array.isArray(n))
                    for (a = 0; a < n.length; a += 1)
                      n[a] !== s && n[a] instanceof i && r(n[a]);
                  else n instanceof i && s !== n && r(n);
                },
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null,
              },
            }),
              (t.a11y = { clicked: !1 });
            let n = null;
            function a(e) {
              const t = n;
              0 !== t.length && (t.html(""), t.html(e));
            }
            function r(e) {
              e.attr("tabIndex", "0");
            }
            function o(e) {
              e.attr("tabIndex", "-1");
            }
            function l(e, t) {
              e.attr("role", t);
            }
            function c(e, t) {
              e.attr("aria-roledescription", t);
            }
            function p(e, t) {
              e.attr("aria-label", t);
            }
            function u(e) {
              e.attr("aria-disabled", !0);
            }
            function h(e) {
              e.attr("aria-disabled", !1);
            }
            function m(e) {
              if (13 !== e.keyCode && 32 !== e.keyCode) return;
              const s = t.params.a11y,
                i = d(e.target);
              t.navigation &&
                t.navigation.$nextEl &&
                i.is(t.navigation.$nextEl) &&
                ((t.isEnd && !t.params.loop) || t.slideNext(),
                t.isEnd ? a(s.lastSlideMessage) : a(s.nextSlideMessage)),
                t.navigation &&
                  t.navigation.$prevEl &&
                  i.is(t.navigation.$prevEl) &&
                  ((t.isBeginning && !t.params.loop) || t.slidePrev(),
                  t.isBeginning
                    ? a(s.firstSlideMessage)
                    : a(s.prevSlideMessage)),
                t.pagination &&
                  i.is(U(t.params.pagination.bulletClass)) &&
                  i[0].click();
            }
            function f() {
              return (
                t.pagination &&
                t.pagination.bullets &&
                t.pagination.bullets.length
              );
            }
            function g() {
              return f() && t.params.pagination.clickable;
            }
            const v = (e, t, s) => {
                r(e),
                  "BUTTON" !== e[0].tagName &&
                    (l(e, "button"), e.on("keydown", m)),
                  p(e, s),
                  (function (e, t) {
                    e.attr("aria-controls", t);
                  })(e, t);
              },
              y = () => {
                t.a11y.clicked = !0;
              },
              b = () => {
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    t.a11y.clicked = !1;
                  });
                });
              },
              w = (e) => {
                if (t.a11y.clicked) return;
                const s = e.target.closest(`.${t.params.slideClass}`);
                if (!s || !t.slides.includes(s)) return;
                const i = t.slides.indexOf(s) === t.activeIndex,
                  n =
                    t.params.watchSlidesProgress &&
                    t.visibleSlides &&
                    t.visibleSlides.includes(s);
                i ||
                  n ||
                  (t.isHorizontal()
                    ? (t.el.scrollLeft = 0)
                    : (t.el.scrollTop = 0),
                  t.slideTo(t.slides.indexOf(s), 0));
              },
              x = () => {
                const e = t.params.a11y;
                e.itemRoleDescriptionMessage &&
                  c(d(t.slides), e.itemRoleDescriptionMessage),
                  e.slideRole && l(d(t.slides), e.slideRole);
                const s = t.params.loop
                  ? t.slides.filter(
                      (e) => !e.classList.contains(t.params.slideDuplicateClass)
                    ).length
                  : t.slides.length;
                e.slideLabelMessage &&
                  t.slides.each((i, n) => {
                    const a = d(i),
                      r = t.params.loop
                        ? parseInt(a.attr("data-swiper-slide-index"), 10)
                        : n;
                    p(
                      a,
                      e.slideLabelMessage
                        .replace(/\{\{index\}\}/, r + 1)
                        .replace(/\{\{slidesLength\}\}/, s)
                    );
                  });
              };
            i("beforeInit", () => {
              n = d(
                `<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`
              );
            }),
              i("afterInit", () => {
                t.params.a11y.enabled &&
                  (() => {
                    const e = t.params.a11y;
                    t.$el.append(n);
                    const s = t.$el;
                    e.containerRoleDescriptionMessage &&
                      c(s, e.containerRoleDescriptionMessage),
                      e.containerMessage && p(s, e.containerMessage);
                    const i = t.$wrapperEl,
                      a =
                        e.id ||
                        i.attr("id") ||
                        `swiper-wrapper-${
                          ((r = 16),
                          void 0 === r && (r = 16),
                          "x"
                            .repeat(r)
                            .replace(/x/g, () =>
                              Math.round(16 * Math.random()).toString(16)
                            ))
                        }`;
                    var r;
                    const o =
                      t.params.autoplay && t.params.autoplay.enabled
                        ? "off"
                        : "polite";
                    var l;
                    let d, u;
                    (l = a),
                      i.attr("id", l),
                      (function (e, t) {
                        e.attr("aria-live", t);
                      })(i, o),
                      x(),
                      t.navigation &&
                        t.navigation.$nextEl &&
                        (d = t.navigation.$nextEl),
                      t.navigation &&
                        t.navigation.$prevEl &&
                        (u = t.navigation.$prevEl),
                      d && d.length && v(d, a, e.nextSlideMessage),
                      u && u.length && v(u, a, e.prevSlideMessage),
                      g() &&
                        t.pagination.$el.on(
                          "keydown",
                          U(t.params.pagination.bulletClass),
                          m
                        ),
                      t.$el.on("focus", w, !0),
                      t.$el.on("pointerdown", y, !0),
                      t.$el.on("pointerup", b, !0);
                  })();
              }),
              i(
                "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
                () => {
                  t.params.a11y.enabled && x();
                }
              ),
              i("fromEdge toEdge afterInit lock unlock", () => {
                t.params.a11y.enabled &&
                  (function () {
                    if (t.params.loop || t.params.rewind || !t.navigation)
                      return;
                    const { $nextEl: e, $prevEl: s } = t.navigation;
                    s &&
                      s.length > 0 &&
                      (t.isBeginning ? (u(s), o(s)) : (h(s), r(s))),
                      e &&
                        e.length > 0 &&
                        (t.isEnd ? (u(e), o(e)) : (h(e), r(e)));
                  })();
              }),
              i("paginationUpdate", () => {
                t.params.a11y.enabled &&
                  (function () {
                    const e = t.params.a11y;
                    f() &&
                      t.pagination.bullets.each((s) => {
                        const i = d(s);
                        t.params.pagination.clickable &&
                          (r(i),
                          t.params.pagination.renderBullet ||
                            (l(i, "button"),
                            p(
                              i,
                              e.paginationBulletMessage.replace(
                                /\{\{index\}\}/,
                                i.index() + 1
                              )
                            ))),
                          i.is(`.${t.params.pagination.bulletActiveClass}`)
                            ? i.attr("aria-current", "true")
                            : i.removeAttr("aria-current");
                      });
                  })();
              }),
              i("destroy", () => {
                t.params.a11y.enabled &&
                  (function () {
                    let e, s;
                    n && n.length > 0 && n.remove(),
                      t.navigation &&
                        t.navigation.$nextEl &&
                        (e = t.navigation.$nextEl),
                      t.navigation &&
                        t.navigation.$prevEl &&
                        (s = t.navigation.$prevEl),
                      e && e.off("keydown", m),
                      s && s.off("keydown", m),
                      g() &&
                        t.pagination.$el.off(
                          "keydown",
                          U(t.params.pagination.bulletClass),
                          m
                        ),
                      t.$el.off("focus", w, !0),
                      t.$el.off("pointerdown", y, !0),
                      t.$el.off("pointerup", b, !0);
                  })();
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides",
                keepQuery: !1,
              },
            });
            let n = !1,
              r = {};
            const o = (e) =>
                e
                  .toString()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]+/g, "")
                  .replace(/--+/g, "-")
                  .replace(/^-+/, "")
                  .replace(/-+$/, ""),
              l = (e) => {
                const t = a();
                let s;
                s = e ? new URL(e) : t.location;
                const i = s.pathname
                    .slice(1)
                    .split("/")
                    .filter((e) => "" !== e),
                  n = i.length;
                return { key: i[n - 2], value: i[n - 1] };
              },
              d = (e, s) => {
                const i = a();
                if (!n || !t.params.history.enabled) return;
                let r;
                r = t.params.url ? new URL(t.params.url) : i.location;
                const l = t.slides.eq(s);
                let d = o(l.attr("data-history"));
                if (t.params.history.root.length > 0) {
                  let s = t.params.history.root;
                  "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
                    (d = `${s}/${e}/${d}`);
                } else r.pathname.includes(e) || (d = `${e}/${d}`);
                t.params.history.keepQuery && (d += r.search);
                const c = i.history.state;
                (c && c.value === d) ||
                  (t.params.history.replaceState
                    ? i.history.replaceState({ value: d }, null, d)
                    : i.history.pushState({ value: d }, null, d));
              },
              c = (e, s, i) => {
                if (s)
                  for (let n = 0, a = t.slides.length; n < a; n += 1) {
                    const a = t.slides.eq(n);
                    if (
                      o(a.attr("data-history")) === s &&
                      !a.hasClass(t.params.slideDuplicateClass)
                    ) {
                      const s = a.index();
                      t.slideTo(s, e, i);
                    }
                  }
                else t.slideTo(0, e, i);
              },
              p = () => {
                (r = l(t.params.url)), c(t.params.speed, r.value, !1);
              };
            i("init", () => {
              t.params.history.enabled &&
                (() => {
                  const e = a();
                  if (t.params.history) {
                    if (!e.history || !e.history.pushState)
                      return (
                        (t.params.history.enabled = !1),
                        void (t.params.hashNavigation.enabled = !0)
                      );
                    (n = !0),
                      (r = l(t.params.url)),
                      (r.key || r.value) &&
                        (c(0, r.value, t.params.runCallbacksOnInit),
                        t.params.history.replaceState ||
                          e.addEventListener("popstate", p));
                  }
                })();
            }),
              i("destroy", () => {
                t.params.history.enabled &&
                  (() => {
                    const e = a();
                    t.params.history.replaceState ||
                      e.removeEventListener("popstate", p);
                  })();
              }),
              i("transitionEnd _freeModeNoMomentumRelease", () => {
                n && d(t.params.history.key, t.activeIndex);
              }),
              i("slideChange", () => {
                n && t.params.cssMode && d(t.params.history.key, t.activeIndex);
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, emit: n, on: r } = e,
              o = !1;
            const l = i(),
              c = a();
            s({
              hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
            });
            const p = () => {
                n("hashChange");
                const e = l.location.hash.replace("#", "");
                if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                  const s = t.$wrapperEl
                    .children(`.${t.params.slideClass}[data-hash="${e}"]`)
                    .index();
                  if (void 0 === s) return;
                  t.slideTo(s);
                }
              },
              u = () => {
                if (o && t.params.hashNavigation.enabled)
                  if (
                    t.params.hashNavigation.replaceState &&
                    c.history &&
                    c.history.replaceState
                  )
                    c.history.replaceState(
                      null,
                      null,
                      `#${t.slides.eq(t.activeIndex).attr("data-hash")}` || ""
                    ),
                      n("hashSet");
                  else {
                    const e = t.slides.eq(t.activeIndex),
                      s = e.attr("data-hash") || e.attr("data-history");
                    (l.location.hash = s || ""), n("hashSet");
                  }
              };
            r("init", () => {
              t.params.hashNavigation.enabled &&
                (() => {
                  if (
                    !t.params.hashNavigation.enabled ||
                    (t.params.history && t.params.history.enabled)
                  )
                    return;
                  o = !0;
                  const e = l.location.hash.replace("#", "");
                  if (e) {
                    const s = 0;
                    for (let i = 0, n = t.slides.length; i < n; i += 1) {
                      const n = t.slides.eq(i);
                      if (
                        (n.attr("data-hash") || n.attr("data-history")) === e &&
                        !n.hasClass(t.params.slideDuplicateClass)
                      ) {
                        const e = n.index();
                        t.slideTo(e, s, t.params.runCallbacksOnInit, !0);
                      }
                    }
                  }
                  t.params.hashNavigation.watchState &&
                    d(c).on("hashchange", p);
                })();
            }),
              r("destroy", () => {
                t.params.hashNavigation.enabled &&
                  t.params.hashNavigation.watchState &&
                  d(c).off("hashchange", p);
              }),
              r("transitionEnd _freeModeNoMomentumRelease", () => {
                o && u();
              }),
              r("slideChange", () => {
                o && t.params.cssMode && u();
              });
          },
          function (e) {
            let t,
              { swiper: s, extendParams: n, on: a, emit: r } = e;
            function o() {
              if (!s.size)
                return (s.autoplay.running = !1), void (s.autoplay.paused = !1);
              const e = s.slides.eq(s.activeIndex);
              let i = s.params.autoplay.delay;
              e.attr("data-swiper-autoplay") &&
                (i = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
                clearTimeout(t),
                (t = p(() => {
                  let e;
                  s.params.autoplay.reverseDirection
                    ? s.params.loop
                      ? (s.loopFix(),
                        (e = s.slidePrev(s.params.speed, !0, !0)),
                        r("autoplay"))
                      : s.isBeginning
                      ? s.params.autoplay.stopOnLastSlide
                        ? d()
                        : ((e = s.slideTo(
                            s.slides.length - 1,
                            s.params.speed,
                            !0,
                            !0
                          )),
                          r("autoplay"))
                      : ((e = s.slidePrev(s.params.speed, !0, !0)),
                        r("autoplay"))
                    : s.params.loop
                    ? (s.loopFix(),
                      (e = s.slideNext(s.params.speed, !0, !0)),
                      r("autoplay"))
                    : s.isEnd
                    ? s.params.autoplay.stopOnLastSlide
                      ? d()
                      : ((e = s.slideTo(0, s.params.speed, !0, !0)),
                        r("autoplay"))
                    : ((e = s.slideNext(s.params.speed, !0, !0)),
                      r("autoplay")),
                    ((s.params.cssMode && s.autoplay.running) || !1 === e) &&
                      o();
                }, i));
            }
            function l() {
              return (
                void 0 === t &&
                !s.autoplay.running &&
                ((s.autoplay.running = !0), r("autoplayStart"), o(), !0)
              );
            }
            function d() {
              return (
                !!s.autoplay.running &&
                void 0 !== t &&
                (t && (clearTimeout(t), (t = void 0)),
                (s.autoplay.running = !1),
                r("autoplayStop"),
                !0)
              );
            }
            function c(e) {
              s.autoplay.running &&
                (s.autoplay.paused ||
                  (t && clearTimeout(t),
                  (s.autoplay.paused = !0),
                  0 !== e && s.params.autoplay.waitForTransition
                    ? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                        s.$wrapperEl[0].addEventListener(e, h);
                      })
                    : ((s.autoplay.paused = !1), o())));
            }
            function u() {
              const e = i();
              "hidden" === e.visibilityState && s.autoplay.running && c(),
                "visible" === e.visibilityState &&
                  s.autoplay.paused &&
                  (o(), (s.autoplay.paused = !1));
            }
            function h(e) {
              s &&
                !s.destroyed &&
                s.$wrapperEl &&
                e.target === s.$wrapperEl[0] &&
                (["transitionend", "webkitTransitionEnd"].forEach((e) => {
                  s.$wrapperEl[0].removeEventListener(e, h);
                }),
                (s.autoplay.paused = !1),
                s.autoplay.running ? o() : d());
            }
            function m() {
              s.params.autoplay.disableOnInteraction
                ? d()
                : (r("autoplayPause"), c()),
                ["transitionend", "webkitTransitionEnd"].forEach((e) => {
                  s.$wrapperEl[0].removeEventListener(e, h);
                });
            }
            function f() {
              s.params.autoplay.disableOnInteraction ||
                ((s.autoplay.paused = !1), r("autoplayResume"), o());
            }
            (s.autoplay = { running: !1, paused: !1 }),
              n({
                autoplay: {
                  enabled: !1,
                  delay: 3e3,
                  waitForTransition: !0,
                  disableOnInteraction: !0,
                  stopOnLastSlide: !1,
                  reverseDirection: !1,
                  pauseOnMouseEnter: !1,
                },
              }),
              a("init", () => {
                s.params.autoplay.enabled &&
                  (l(),
                  i().addEventListener("visibilitychange", u),
                  s.params.autoplay.pauseOnMouseEnter &&
                    (s.$el.on("mouseenter", m), s.$el.on("mouseleave", f)));
              }),
              a("beforeTransitionStart", (e, t, i) => {
                s.autoplay.running &&
                  (i || !s.params.autoplay.disableOnInteraction
                    ? s.autoplay.pause(t)
                    : d());
              }),
              a("sliderFirstMove", () => {
                s.autoplay.running &&
                  (s.params.autoplay.disableOnInteraction ? d() : c());
              }),
              a("touchEnd", () => {
                s.params.cssMode &&
                  s.autoplay.paused &&
                  !s.params.autoplay.disableOnInteraction &&
                  o();
              }),
              a("destroy", () => {
                s.$el.off("mouseenter", m),
                  s.$el.off("mouseleave", f),
                  s.autoplay.running && d(),
                  i().removeEventListener("visibilitychange", u);
              }),
              Object.assign(s.autoplay, {
                pause: c,
                run: o,
                start: l,
                stop: d,
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs",
              },
            });
            let n = !1,
              a = !1;
            function r() {
              const e = t.thumbs.swiper;
              if (!e || e.destroyed) return;
              const s = e.clickedIndex,
                i = e.clickedSlide;
              if (i && d(i).hasClass(t.params.thumbs.slideThumbActiveClass))
                return;
              if (null == s) return;
              let n;
              if (
                ((n = e.params.loop
                  ? parseInt(
                      d(e.clickedSlide).attr("data-swiper-slide-index"),
                      10
                    )
                  : s),
                t.params.loop)
              ) {
                let e = t.activeIndex;
                t.slides.eq(e).hasClass(t.params.slideDuplicateClass) &&
                  (t.loopFix(),
                  (t._clientLeft = t.$wrapperEl[0].clientLeft),
                  (e = t.activeIndex));
                const s = t.slides
                    .eq(e)
                    .prevAll(`[data-swiper-slide-index="${n}"]`)
                    .eq(0)
                    .index(),
                  i = t.slides
                    .eq(e)
                    .nextAll(`[data-swiper-slide-index="${n}"]`)
                    .eq(0)
                    .index();
                n = void 0 === s ? i : void 0 === i ? s : i - e < e - s ? i : s;
              }
              t.slideTo(n);
            }
            function o() {
              const { thumbs: e } = t.params;
              if (n) return !1;
              n = !0;
              const s = t.constructor;
              if (e.swiper instanceof s)
                (t.thumbs.swiper = e.swiper),
                  Object.assign(t.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1,
                  }),
                  Object.assign(t.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1,
                  });
              else if (m(e.swiper)) {
                const i = Object.assign({}, e.swiper);
                Object.assign(i, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }),
                  (t.thumbs.swiper = new s(i)),
                  (a = !0);
              }
              return (
                t.thumbs.swiper.$el.addClass(
                  t.params.thumbs.thumbsContainerClass
                ),
                t.thumbs.swiper.on("tap", r),
                !0
              );
            }
            function l(e) {
              const s = t.thumbs.swiper;
              if (!s || s.destroyed) return;
              const i =
                "auto" === s.params.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : s.params.slidesPerView;
              let n = 1;
              const a = t.params.thumbs.slideThumbActiveClass;
              if (
                (t.params.slidesPerView > 1 &&
                  !t.params.centeredSlides &&
                  (n = t.params.slidesPerView),
                t.params.thumbs.multipleActiveThumbs || (n = 1),
                (n = Math.floor(n)),
                s.slides.removeClass(a),
                s.params.loop || (s.params.virtual && s.params.virtual.enabled))
              )
                for (let e = 0; e < n; e += 1)
                  s.$wrapperEl
                    .children(`[data-swiper-slide-index="${t.realIndex + e}"]`)
                    .addClass(a);
              else
                for (let e = 0; e < n; e += 1)
                  s.slides.eq(t.realIndex + e).addClass(a);
              const r = t.params.thumbs.autoScrollOffset,
                o = r && !s.params.loop;
              if (t.realIndex !== s.realIndex || o) {
                let n,
                  a,
                  l = s.activeIndex;
                if (s.params.loop) {
                  s.slides.eq(l).hasClass(s.params.slideDuplicateClass) &&
                    (s.loopFix(),
                    (s._clientLeft = s.$wrapperEl[0].clientLeft),
                    (l = s.activeIndex));
                  const e = s.slides
                      .eq(l)
                      .prevAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                      .eq(0)
                      .index(),
                    i = s.slides
                      .eq(l)
                      .nextAll(`[data-swiper-slide-index="${t.realIndex}"]`)
                      .eq(0)
                      .index();
                  (n =
                    void 0 === e
                      ? i
                      : void 0 === i
                      ? e
                      : i - l == l - e
                      ? s.params.slidesPerGroup > 1
                        ? i
                        : l
                      : i - l < l - e
                      ? i
                      : e),
                    (a = t.activeIndex > t.previousIndex ? "next" : "prev");
                } else
                  (n = t.realIndex),
                    (a = n > t.previousIndex ? "next" : "prev");
                o && (n += "next" === a ? r : -1 * r),
                  s.visibleSlidesIndexes &&
                    s.visibleSlidesIndexes.indexOf(n) < 0 &&
                    (s.params.centeredSlides
                      ? (n =
                          n > l
                            ? n - Math.floor(i / 2) + 1
                            : n + Math.floor(i / 2) - 1)
                      : n > l && s.params.slidesPerGroup,
                    s.slideTo(n, e ? 0 : void 0));
              }
            }
            (t.thumbs = { swiper: null }),
              i("beforeInit", () => {
                const { thumbs: e } = t.params;
                e && e.swiper && (o(), l(!0));
              }),
              i("slideChange update resize observerUpdate", () => {
                l();
              }),
              i("setTransition", (e, s) => {
                const i = t.thumbs.swiper;
                i && !i.destroyed && i.setTransition(s);
              }),
              i("beforeDestroy", () => {
                const e = t.thumbs.swiper;
                e && !e.destroyed && a && e.destroy();
              }),
              Object.assign(t.thumbs, { init: o, update: l });
          },
          function (e) {
            let { swiper: t, extendParams: s, emit: i, once: n } = e;
            s({
              freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: 0.02,
              },
            }),
              Object.assign(t, {
                freeMode: {
                  onTouchStart: function () {
                    const e = t.getTranslate();
                    t.setTranslate(e),
                      t.setTransition(0),
                      (t.touchEventsData.velocities.length = 0),
                      t.freeMode.onTouchEnd({
                        currentPos: t.rtl ? t.translate : -t.translate,
                      });
                  },
                  onTouchMove: function () {
                    const { touchEventsData: e, touches: s } = t;
                    0 === e.velocities.length &&
                      e.velocities.push({
                        position: s[t.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime,
                      }),
                      e.velocities.push({
                        position: s[t.isHorizontal() ? "currentX" : "currentY"],
                        time: u(),
                      });
                  },
                  onTouchEnd: function (e) {
                    let { currentPos: s } = e;
                    const {
                        params: a,
                        $wrapperEl: r,
                        rtlTranslate: o,
                        snapGrid: l,
                        touchEventsData: d,
                      } = t,
                      c = u() - d.touchStartTime;
                    if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
                    else if (s > -t.maxTranslate())
                      t.slides.length < l.length
                        ? t.slideTo(l.length - 1)
                        : t.slideTo(t.slides.length - 1);
                    else {
                      if (a.freeMode.momentum) {
                        if (d.velocities.length > 1) {
                          const e = d.velocities.pop(),
                            s = d.velocities.pop(),
                            i = e.position - s.position,
                            n = e.time - s.time;
                          (t.velocity = i / n),
                            (t.velocity /= 2),
                            Math.abs(t.velocity) < a.freeMode.minimumVelocity &&
                              (t.velocity = 0),
                            (n > 150 || u() - e.time > 300) && (t.velocity = 0);
                        } else t.velocity = 0;
                        (t.velocity *= a.freeMode.momentumVelocityRatio),
                          (d.velocities.length = 0);
                        let e = 1e3 * a.freeMode.momentumRatio;
                        const s = t.velocity * e;
                        let c = t.translate + s;
                        o && (c = -c);
                        let p,
                          h = !1;
                        const m =
                          20 *
                          Math.abs(t.velocity) *
                          a.freeMode.momentumBounceRatio;
                        let f;
                        if (c < t.maxTranslate())
                          a.freeMode.momentumBounce
                            ? (c + t.maxTranslate() < -m &&
                                (c = t.maxTranslate() - m),
                              (p = t.maxTranslate()),
                              (h = !0),
                              (d.allowMomentumBounce = !0))
                            : (c = t.maxTranslate()),
                            a.loop && a.centeredSlides && (f = !0);
                        else if (c > t.minTranslate())
                          a.freeMode.momentumBounce
                            ? (c - t.minTranslate() > m &&
                                (c = t.minTranslate() + m),
                              (p = t.minTranslate()),
                              (h = !0),
                              (d.allowMomentumBounce = !0))
                            : (c = t.minTranslate()),
                            a.loop && a.centeredSlides && (f = !0);
                        else if (a.freeMode.sticky) {
                          let e;
                          for (let t = 0; t < l.length; t += 1)
                            if (l[t] > -c) {
                              e = t;
                              break;
                            }
                          (c =
                            Math.abs(l[e] - c) < Math.abs(l[e - 1] - c) ||
                            "next" === t.swipeDirection
                              ? l[e]
                              : l[e - 1]),
                            (c = -c);
                        }
                        if (
                          (f &&
                            n("transitionEnd", () => {
                              t.loopFix();
                            }),
                          0 !== t.velocity)
                        ) {
                          if (
                            ((e = o
                              ? Math.abs((-c - t.translate) / t.velocity)
                              : Math.abs((c - t.translate) / t.velocity)),
                            a.freeMode.sticky)
                          ) {
                            const s = Math.abs((o ? -c : c) - t.translate),
                              i = t.slidesSizesGrid[t.activeIndex];
                            e =
                              s < i
                                ? a.speed
                                : s < 2 * i
                                ? 1.5 * a.speed
                                : 2.5 * a.speed;
                          }
                        } else if (a.freeMode.sticky)
                          return void t.slideToClosest();
                        a.freeMode.momentumBounce && h
                          ? (t.updateProgress(p),
                            t.setTransition(e),
                            t.setTranslate(c),
                            t.transitionStart(!0, t.swipeDirection),
                            (t.animating = !0),
                            r.transitionEnd(() => {
                              t &&
                                !t.destroyed &&
                                d.allowMomentumBounce &&
                                (i("momentumBounce"),
                                t.setTransition(a.speed),
                                setTimeout(() => {
                                  t.setTranslate(p),
                                    r.transitionEnd(() => {
                                      t && !t.destroyed && t.transitionEnd();
                                    });
                                }, 0));
                            }))
                          : t.velocity
                          ? (i("_freeModeNoMomentumRelease"),
                            t.updateProgress(c),
                            t.setTransition(e),
                            t.setTranslate(c),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating ||
                              ((t.animating = !0),
                              r.transitionEnd(() => {
                                t && !t.destroyed && t.transitionEnd();
                              })))
                          : t.updateProgress(c),
                          t.updateActiveIndex(),
                          t.updateSlidesClasses();
                      } else {
                        if (a.freeMode.sticky) return void t.slideToClosest();
                        a.freeMode && i("_freeModeNoMomentumRelease");
                      }
                      (!a.freeMode.momentum || c >= a.longSwipesMs) &&
                        (t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses());
                    }
                  },
                },
              });
          },
          function (e) {
            let t,
              s,
              i,
              { swiper: n, extendParams: a } = e;
            a({ grid: { rows: 1, fill: "column" } }),
              (n.grid = {
                initSlides: (e) => {
                  const { slidesPerView: a } = n.params,
                    { rows: r, fill: o } = n.params.grid;
                  (s = t / r),
                    (i = Math.floor(e / r)),
                    (t =
                      Math.floor(e / r) === e / r ? e : Math.ceil(e / r) * r),
                    "auto" !== a && "row" === o && (t = Math.max(t, a * r));
                },
                updateSlide: (e, a, r, o) => {
                  const { slidesPerGroup: l, spaceBetween: d } = n.params,
                    { rows: c, fill: p } = n.params.grid;
                  let u, h, m;
                  if ("row" === p && l > 1) {
                    const s = Math.floor(e / (l * c)),
                      i = e - c * l * s,
                      n =
                        0 === s
                          ? l
                          : Math.min(Math.ceil((r - s * c * l) / c), l);
                    (m = Math.floor(i / n)),
                      (h = i - m * n + s * l),
                      (u = h + (m * t) / c),
                      a.css({ "-webkit-order": u, order: u });
                  } else
                    "column" === p
                      ? ((h = Math.floor(e / c)),
                        (m = e - h * c),
                        (h > i || (h === i && m === c - 1)) &&
                          ((m += 1), m >= c && ((m = 0), (h += 1))))
                      : ((m = Math.floor(e / s)), (h = e - m * s));
                  a.css(o("margin-top"), 0 !== m ? d && `${d}px` : "");
                },
                updateWrapperSize: (e, s, i) => {
                  const {
                      spaceBetween: a,
                      centeredSlides: r,
                      roundLengths: o,
                    } = n.params,
                    { rows: l } = n.params.grid;
                  if (
                    ((n.virtualSize = (e + a) * t),
                    (n.virtualSize = Math.ceil(n.virtualSize / l) - a),
                    n.$wrapperEl.css({
                      [i("width")]: `${n.virtualSize + a}px`,
                    }),
                    r)
                  ) {
                    s.splice(0, s.length);
                    const e = [];
                    for (let t = 0; t < s.length; t += 1) {
                      let i = s[t];
                      o && (i = Math.floor(i)),
                        s[t] < n.virtualSize + s[0] && e.push(i);
                    }
                    s.push(...e);
                  }
                },
              });
          },
          function (e) {
            let { swiper: t } = e;
            Object.assign(t, {
              appendSlide: Z.bind(t),
              prependSlide: K.bind(t),
              addSlide: Q.bind(t),
              removeSlide: J.bind(t),
              removeAllSlides: ee.bind(t),
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({ fadeEffect: { crossFade: !1, transformEl: null } }),
              te({
                effect: "fade",
                swiper: t,
                on: i,
                setTranslate: () => {
                  const { slides: e } = t,
                    s = t.params.fadeEffect;
                  for (let i = 0; i < e.length; i += 1) {
                    const e = t.slides.eq(i);
                    let n = -e[0].swiperSlideOffset;
                    t.params.virtualTranslate || (n -= t.translate);
                    let a = 0;
                    t.isHorizontal() || ((a = n), (n = 0));
                    const r = t.params.fadeEffect.crossFade
                      ? Math.max(1 - Math.abs(e[0].progress), 0)
                      : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                    se(s, e)
                      .css({ opacity: r })
                      .transform(`translate3d(${n}px, ${a}px, 0px)`);
                  }
                },
                setTransition: (e) => {
                  const { transformEl: s } = t.params.fadeEffect;
                  (s ? t.slides.find(s) : t.slides).transition(e),
                    ie({
                      swiper: t,
                      duration: e,
                      transformEl: s,
                      allSlides: !0,
                    });
                },
                overwriteParams: () => ({
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  watchSlidesProgress: !0,
                  spaceBetween: 0,
                  virtualTranslate: !t.params.cssMode,
                }),
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: 0.94,
              },
            });
            const n = (e, t, s) => {
              let i = s
                  ? e.find(".swiper-slide-shadow-left")
                  : e.find(".swiper-slide-shadow-top"),
                n = s
                  ? e.find(".swiper-slide-shadow-right")
                  : e.find(".swiper-slide-shadow-bottom");
              0 === i.length &&
                ((i = d(
                  `<div class="swiper-slide-shadow-${
                    s ? "left" : "top"
                  }"></div>`
                )),
                e.append(i)),
                0 === n.length &&
                  ((n = d(
                    `<div class="swiper-slide-shadow-${
                      s ? "right" : "bottom"
                    }"></div>`
                  )),
                  e.append(n)),
                i.length && (i[0].style.opacity = Math.max(-t, 0)),
                n.length && (n[0].style.opacity = Math.max(t, 0));
            };
            te({
              effect: "cube",
              swiper: t,
              on: i,
              setTranslate: () => {
                const {
                    $el: e,
                    $wrapperEl: s,
                    slides: i,
                    width: a,
                    height: r,
                    rtlTranslate: o,
                    size: l,
                    browser: c,
                  } = t,
                  p = t.params.cubeEffect,
                  u = t.isHorizontal(),
                  h = t.virtual && t.params.virtual.enabled;
                let m,
                  f = 0;
                p.shadow &&
                  (u
                    ? ((m = s.find(".swiper-cube-shadow")),
                      0 === m.length &&
                        ((m = d('<div class="swiper-cube-shadow"></div>')),
                        s.append(m)),
                      m.css({ height: `${a}px` }))
                    : ((m = e.find(".swiper-cube-shadow")),
                      0 === m.length &&
                        ((m = d('<div class="swiper-cube-shadow"></div>')),
                        e.append(m))));
                for (let e = 0; e < i.length; e += 1) {
                  const t = i.eq(e);
                  let s = e;
                  h && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                  let a = 90 * s,
                    r = Math.floor(a / 360);
                  o && ((a = -a), (r = Math.floor(-a / 360)));
                  const d = Math.max(Math.min(t[0].progress, 1), -1);
                  let c = 0,
                    m = 0,
                    g = 0;
                  s % 4 == 0
                    ? ((c = 4 * -r * l), (g = 0))
                    : (s - 1) % 4 == 0
                    ? ((c = 0), (g = 4 * -r * l))
                    : (s - 2) % 4 == 0
                    ? ((c = l + 4 * r * l), (g = l))
                    : (s - 3) % 4 == 0 && ((c = -l), (g = 3 * l + 4 * l * r)),
                    o && (c = -c),
                    u || ((m = c), (c = 0));
                  const v = `rotateX(${u ? 0 : -a}deg) rotateY(${
                    u ? a : 0
                  }deg) translate3d(${c}px, ${m}px, ${g}px)`;
                  d <= 1 &&
                    d > -1 &&
                    ((f = 90 * s + 90 * d), o && (f = 90 * -s - 90 * d)),
                    t.transform(v),
                    p.slideShadows && n(t, d, u);
                }
                if (
                  (s.css({
                    "-webkit-transform-origin": `50% 50% -${l / 2}px`,
                    "transform-origin": `50% 50% -${l / 2}px`,
                  }),
                  p.shadow)
                )
                  if (u)
                    m.transform(
                      `translate3d(0px, ${a / 2 + p.shadowOffset}px, ${
                        -a / 2
                      }px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`
                    );
                  else {
                    const e = Math.abs(f) - 90 * Math.floor(Math.abs(f) / 90),
                      t =
                        1.5 -
                        (Math.sin((2 * e * Math.PI) / 360) / 2 +
                          Math.cos((2 * e * Math.PI) / 360) / 2),
                      s = p.shadowScale,
                      i = p.shadowScale / t,
                      n = p.shadowOffset;
                    m.transform(
                      `scale3d(${s}, 1, ${i}) translate3d(0px, ${
                        r / 2 + n
                      }px, ${-r / 2 / i}px) rotateX(-90deg)`
                    );
                  }
                const g = c.isSafari || c.isWebView ? -l / 2 : 0;
                s.transform(
                  `translate3d(0px,0,${g}px) rotateX(${
                    t.isHorizontal() ? 0 : f
                  }deg) rotateY(${t.isHorizontal() ? -f : 0}deg)`
                ),
                  s[0].style.setProperty("--swiper-cube-translate-z", `${g}px`);
              },
              setTransition: (e) => {
                const { $el: s, slides: i } = t;
                i
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  t.params.cubeEffect.shadow &&
                    !t.isHorizontal() &&
                    s.find(".swiper-cube-shadow").transition(e);
              },
              recreateShadows: () => {
                const e = t.isHorizontal();
                t.slides.each((t) => {
                  const s = Math.max(Math.min(t.progress, 1), -1);
                  n(d(t), s, e);
                });
              },
              getEffectParams: () => t.params.cubeEffect,
              perspective: () => !0,
              overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              }),
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              flipEffect: {
                slideShadows: !0,
                limitRotation: !0,
                transformEl: null,
              },
            });
            const n = (e, s, i) => {
              let n = t.isHorizontal()
                  ? e.find(".swiper-slide-shadow-left")
                  : e.find(".swiper-slide-shadow-top"),
                a = t.isHorizontal()
                  ? e.find(".swiper-slide-shadow-right")
                  : e.find(".swiper-slide-shadow-bottom");
              0 === n.length &&
                (n = ne(i, e, t.isHorizontal() ? "left" : "top")),
                0 === a.length &&
                  (a = ne(i, e, t.isHorizontal() ? "right" : "bottom")),
                n.length && (n[0].style.opacity = Math.max(-s, 0)),
                a.length && (a[0].style.opacity = Math.max(s, 0));
            };
            te({
              effect: "flip",
              swiper: t,
              on: i,
              setTranslate: () => {
                const { slides: e, rtlTranslate: s } = t,
                  i = t.params.flipEffect;
                for (let a = 0; a < e.length; a += 1) {
                  const r = e.eq(a);
                  let o = r[0].progress;
                  t.params.flipEffect.limitRotation &&
                    (o = Math.max(Math.min(r[0].progress, 1), -1));
                  const l = r[0].swiperSlideOffset;
                  let d = -180 * o,
                    c = 0,
                    p = t.params.cssMode ? -l - t.translate : -l,
                    u = 0;
                  t.isHorizontal()
                    ? s && (d = -d)
                    : ((u = p), (p = 0), (c = -d), (d = 0)),
                    (r[0].style.zIndex = -Math.abs(Math.round(o)) + e.length),
                    i.slideShadows && n(r, o, i);
                  const h = `translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;
                  se(i, r).transform(h);
                }
              },
              setTransition: (e) => {
                const { transformEl: s } = t.params.flipEffect;
                (s ? t.slides.find(s) : t.slides)
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  ie({ swiper: t, duration: e, transformEl: s });
              },
              recreateShadows: () => {
                const e = t.params.flipEffect;
                t.slides.each((s) => {
                  const i = d(s);
                  let a = i[0].progress;
                  t.params.flipEffect.limitRotation &&
                    (a = Math.max(Math.min(s.progress, 1), -1)),
                    n(i, a, e);
                });
              },
              getEffectParams: () => t.params.flipEffect,
              perspective: () => !0,
              overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode,
              }),
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
                transformEl: null,
              },
            }),
              te({
                effect: "coverflow",
                swiper: t,
                on: i,
                setTranslate: () => {
                  const {
                      width: e,
                      height: s,
                      slides: i,
                      slidesSizesGrid: n,
                    } = t,
                    a = t.params.coverflowEffect,
                    r = t.isHorizontal(),
                    o = t.translate,
                    l = r ? e / 2 - o : s / 2 - o,
                    d = r ? a.rotate : -a.rotate,
                    c = a.depth;
                  for (let e = 0, t = i.length; e < t; e += 1) {
                    const t = i.eq(e),
                      s = n[e],
                      o = (l - t[0].swiperSlideOffset - s / 2) / s,
                      p =
                        "function" == typeof a.modifier
                          ? a.modifier(o)
                          : o * a.modifier;
                    let u = r ? d * p : 0,
                      h = r ? 0 : d * p,
                      m = -c * Math.abs(p),
                      f = a.stretch;
                    "string" == typeof f &&
                      -1 !== f.indexOf("%") &&
                      (f = (parseFloat(a.stretch) / 100) * s);
                    let g = r ? 0 : f * p,
                      v = r ? f * p : 0,
                      y = 1 - (1 - a.scale) * Math.abs(p);
                    Math.abs(v) < 0.001 && (v = 0),
                      Math.abs(g) < 0.001 && (g = 0),
                      Math.abs(m) < 0.001 && (m = 0),
                      Math.abs(u) < 0.001 && (u = 0),
                      Math.abs(h) < 0.001 && (h = 0),
                      Math.abs(y) < 0.001 && (y = 0);
                    const b = `translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${y})`;
                    if (
                      (se(a, t).transform(b),
                      (t[0].style.zIndex = 1 - Math.abs(Math.round(p))),
                      a.slideShadows)
                    ) {
                      let e = r
                          ? t.find(".swiper-slide-shadow-left")
                          : t.find(".swiper-slide-shadow-top"),
                        s = r
                          ? t.find(".swiper-slide-shadow-right")
                          : t.find(".swiper-slide-shadow-bottom");
                      0 === e.length && (e = ne(a, t, r ? "left" : "top")),
                        0 === s.length &&
                          (s = ne(a, t, r ? "right" : "bottom")),
                        e.length && (e[0].style.opacity = p > 0 ? p : 0),
                        s.length && (s[0].style.opacity = -p > 0 ? -p : 0);
                    }
                  }
                },
                setTransition: (e) => {
                  const { transformEl: s } = t.params.coverflowEffect;
                  (s ? t.slides.find(s) : t.slides)
                    .transition(e)
                    .find(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(e);
                },
                perspective: () => !0,
                overwriteParams: () => ({ watchSlidesProgress: !0 }),
              });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              creativeEffect: {
                transformEl: null,
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  opacity: 1,
                  scale: 1,
                },
                next: {
                  translate: [0, 0, 0],
                  rotate: [0, 0, 0],
                  opacity: 1,
                  scale: 1,
                },
              },
            });
            const n = (e) => ("string" == typeof e ? e : `${e}px`);
            te({
              effect: "creative",
              swiper: t,
              on: i,
              setTranslate: () => {
                const { slides: e, $wrapperEl: s, slidesSizesGrid: i } = t,
                  a = t.params.creativeEffect,
                  { progressMultiplier: r } = a,
                  o = t.params.centeredSlides;
                if (o) {
                  const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
                  s.transform(`translateX(calc(50% - ${e}px))`);
                }
                for (let s = 0; s < e.length; s += 1) {
                  const i = e.eq(s),
                    l = i[0].progress,
                    d = Math.min(
                      Math.max(i[0].progress, -a.limitProgress),
                      a.limitProgress
                    );
                  let c = d;
                  o ||
                    (c = Math.min(
                      Math.max(i[0].originalProgress, -a.limitProgress),
                      a.limitProgress
                    ));
                  const p = i[0].swiperSlideOffset,
                    u = [t.params.cssMode ? -p - t.translate : -p, 0, 0],
                    h = [0, 0, 0];
                  let m = !1;
                  t.isHorizontal() || ((u[1] = u[0]), (u[0] = 0));
                  let f = {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    scale: 1,
                    opacity: 1,
                  };
                  d < 0
                    ? ((f = a.next), (m = !0))
                    : d > 0 && ((f = a.prev), (m = !0)),
                    u.forEach((e, t) => {
                      u[t] = `calc(${e}px + (${n(f.translate[t])} * ${Math.abs(
                        d * r
                      )}))`;
                    }),
                    h.forEach((e, t) => {
                      h[t] = f.rotate[t] * Math.abs(d * r);
                    }),
                    (i[0].style.zIndex = -Math.abs(Math.round(l)) + e.length);
                  const g = u.join(", "),
                    v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                    y =
                      c < 0
                        ? `scale(${1 + (1 - f.scale) * c * r})`
                        : `scale(${1 - (1 - f.scale) * c * r})`,
                    b =
                      c < 0
                        ? 1 + (1 - f.opacity) * c * r
                        : 1 - (1 - f.opacity) * c * r,
                    w = `translate3d(${g}) ${v} ${y}`;
                  if ((m && f.shadow) || !m) {
                    let e = i.children(".swiper-slide-shadow");
                    if (
                      (0 === e.length && f.shadow && (e = ne(a, i)), e.length)
                    ) {
                      const t = a.shadowPerProgress
                        ? d * (1 / a.limitProgress)
                        : d;
                      e[0].style.opacity = Math.min(
                        Math.max(Math.abs(t), 0),
                        1
                      );
                    }
                  }
                  const x = se(a, i);
                  x.transform(w).css({ opacity: b }),
                    f.origin && x.css("transform-origin", f.origin);
                }
              },
              setTransition: (e) => {
                const { transformEl: s } = t.params.creativeEffect;
                (s ? t.slides.find(s) : t.slides)
                  .transition(e)
                  .find(".swiper-slide-shadow")
                  .transition(e),
                  ie({ swiper: t, duration: e, transformEl: s, allSlides: !0 });
              },
              perspective: () => t.params.creativeEffect.perspective,
              overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode,
              }),
            });
          },
          function (e) {
            let { swiper: t, extendParams: s, on: i } = e;
            s({
              cardsEffect: {
                slideShadows: !0,
                transformEl: null,
                rotate: !0,
                perSlideRotate: 2,
                perSlideOffset: 8,
              },
            }),
              te({
                effect: "cards",
                swiper: t,
                on: i,
                setTranslate: () => {
                  const { slides: e, activeIndex: s } = t,
                    i = t.params.cardsEffect,
                    { startTranslate: n, isTouched: a } = t.touchEventsData,
                    r = t.translate;
                  for (let o = 0; o < e.length; o += 1) {
                    const l = e.eq(o),
                      d = l[0].progress,
                      c = Math.min(Math.max(d, -4), 4);
                    let p = l[0].swiperSlideOffset;
                    t.params.centeredSlides &&
                      !t.params.cssMode &&
                      t.$wrapperEl.transform(
                        `translateX(${t.minTranslate()}px)`
                      ),
                      t.params.centeredSlides &&
                        t.params.cssMode &&
                        (p -= e[0].swiperSlideOffset);
                    let u = t.params.cssMode ? -p - t.translate : -p,
                      h = 0;
                    const m = -100 * Math.abs(c);
                    let f = 1,
                      g = -i.perSlideRotate * c,
                      v = i.perSlideOffset - 0.75 * Math.abs(c);
                    const y =
                        t.virtual && t.params.virtual.enabled
                          ? t.virtual.from + o
                          : o,
                      b =
                        (y === s || y === s - 1) &&
                        c > 0 &&
                        c < 1 &&
                        (a || t.params.cssMode) &&
                        r < n,
                      w =
                        (y === s || y === s + 1) &&
                        c < 0 &&
                        c > -1 &&
                        (a || t.params.cssMode) &&
                        r > n;
                    if (b || w) {
                      const e =
                        (1 - Math.abs((Math.abs(c) - 0.5) / 0.5)) ** 0.5;
                      (g += -28 * c * e),
                        (f += -0.5 * e),
                        (v += 96 * e),
                        (h = -25 * e * Math.abs(c) + "%");
                    }
                    if (
                      ((u =
                        c < 0
                          ? `calc(${u}px + (${v * Math.abs(c)}%))`
                          : c > 0
                          ? `calc(${u}px + (-${v * Math.abs(c)}%))`
                          : `${u}px`),
                      !t.isHorizontal())
                    ) {
                      const e = h;
                      (h = u), (u = e);
                    }
                    const x =
                        c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c),
                      C = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${
                        i.rotate ? g : 0
                      }deg)\n        scale(${x})\n      `;
                    if (i.slideShadows) {
                      let e = l.find(".swiper-slide-shadow");
                      0 === e.length && (e = ne(i, l)),
                        e.length &&
                          (e[0].style.opacity = Math.min(
                            Math.max((Math.abs(c) - 0.5) / 0.5, 0),
                            1
                          ));
                    }
                    (l[0].style.zIndex = -Math.abs(Math.round(d)) + e.length),
                      se(i, l).transform(C);
                  }
                },
                setTransition: (e) => {
                  const { transformEl: s } = t.params.cardsEffect;
                  (s ? t.slides.find(s) : t.slides)
                    .transition(e)
                    .find(".swiper-slide-shadow")
                    .transition(e),
                    ie({ swiper: t, duration: e, transformEl: s });
                },
                perspective: () => !0,
                overwriteParams: () => ({
                  watchSlidesProgress: !0,
                  virtualTranslate: !t.params.cssMode,
                }),
              });
          },
        ];
        return V.use(ae), V;
      }),
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = gt())
        : "function" == typeof define && define.amd
        ? define(gt)
        : ((ft =
            "undefined" != typeof globalThis ? globalThis : ft || self).Swiper =
            gt());
    let vt = !1;
    setTimeout(() => {
      if (vt) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    var yt = function () {
      return (
        (yt =
          Object.assign ||
          function (e) {
            for (var t, s = 1, i = arguments.length; s < i; s++)
              for (var n in (t = arguments[s]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          }),
        yt.apply(this, arguments)
      );
    };
    var bt = "lgAfterAppendSlide",
      wt = "lgInit",
      xt = "lgHasVideo",
      Ct = "lgContainerResize",
      St = "lgUpdateSlides",
      Et = "lgAfterAppendSubHtml",
      Tt = "lgBeforeOpen",
      $t = "lgAfterOpen",
      Mt = "lgSlideItemLoad",
      It = "lgBeforeSlide",
      Ot = "lgAfterSlide",
      zt = "lgPosterClick",
      Pt = "lgDragStart",
      Lt = "lgDragMove",
      kt = "lgDragEnd",
      At = "lgBeforeNextSlide",
      Dt = "lgBeforePrevSlide",
      Bt = "lgBeforeClose",
      Gt = "lgAfterClose",
      Ht = {
        mode: "lg-slide",
        easing: "ease",
        speed: 400,
        licenseKey: "0000-0000-000-0000",
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 300,
        container: "",
        startAnimationDuration: 400,
        zoomFromOrigin: !0,
        hideBarsDelay: 0,
        showBarsAfter: 1e4,
        slideDelay: 0,
        supportLegacyBrowser: !0,
        allowMediaOverlap: !1,
        videoMaxSize: "1280-720",
        loadYouTubePoster: !0,
        defaultCaptionHeight: 0,
        ariaLabelledby: "",
        ariaDescribedby: "",
        resetScrollPosition: !0,
        hideScrollbar: !1,
        closable: !0,
        swipeToClose: !0,
        closeOnTap: !0,
        showCloseIcon: !0,
        showMaximizeIcon: !1,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        trapFocus: !0,
        controls: !0,
        slideEndAnimation: !0,
        hideControlOnEnd: !1,
        mousewheel: !1,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 2,
        numberOfSlideItemsInDom: 10,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: 0,
        iframeWidth: "100%",
        iframeHeight: "100%",
        iframeMaxWidth: "100%",
        iframeMaxHeight: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: "",
        isMobile: void 0,
        mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
        plugins: [],
        strings: {
          closeGallery: "Close gallery",
          toggleMaximize: "Toggle maximize",
          previousSlide: "Previous slide",
          nextSlide: "Next slide",
          download: "Download",
          playVideo: "Play video",
        },
      };
    var Nt = (function () {
      function e(e) {
        return (
          (this.cssVenderPrefixes = [
            "TransitionDuration",
            "TransitionTimingFunction",
            "Transform",
            "Transition",
          ]),
          (this.selector = this._getSelector(e)),
          (this.firstElement = this._getFirstEl()),
          this
        );
      }
      return (
        (e.generateUUID = function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" == e ? t : (3 & t) | 8).toString(16);
            }
          );
        }),
        (e.prototype._getSelector = function (e, t) {
          return (
            void 0 === t && (t = document),
            "string" != typeof e
              ? e
              : ((t = t || document),
                "#" === e.substring(0, 1)
                  ? t.querySelector(e)
                  : t.querySelectorAll(e))
          );
        }),
        (e.prototype._each = function (e) {
          return this.selector
            ? (void 0 !== this.selector.length
                ? [].forEach.call(this.selector, e)
                : e(this.selector, 0),
              this)
            : this;
        }),
        (e.prototype._setCssVendorPrefix = function (e, t, s) {
          var i = t.replace(/-([a-z])/gi, function (e, t) {
            return t.toUpperCase();
          });
          -1 !== this.cssVenderPrefixes.indexOf(i)
            ? ((e.style[i.charAt(0).toLowerCase() + i.slice(1)] = s),
              (e.style["webkit" + i] = s),
              (e.style["moz" + i] = s),
              (e.style["ms" + i] = s),
              (e.style["o" + i] = s))
            : (e.style[i] = s);
        }),
        (e.prototype._getFirstEl = function () {
          return this.selector && void 0 !== this.selector.length
            ? this.selector[0]
            : this.selector;
        }),
        (e.prototype.isEventMatched = function (e, t) {
          var s = t.split(".");
          return e
            .split(".")
            .filter(function (e) {
              return e;
            })
            .every(function (e) {
              return -1 !== s.indexOf(e);
            });
        }),
        (e.prototype.attr = function (e, t) {
          return void 0 === t
            ? this.firstElement
              ? this.firstElement.getAttribute(e)
              : ""
            : (this._each(function (s) {
                s.setAttribute(e, t);
              }),
              this);
        }),
        (e.prototype.find = function (e) {
          return _t(this._getSelector(e, this.selector));
        }),
        (e.prototype.first = function () {
          return this.selector && void 0 !== this.selector.length
            ? _t(this.selector[0])
            : _t(this.selector);
        }),
        (e.prototype.eq = function (e) {
          return _t(this.selector[e]);
        }),
        (e.prototype.parent = function () {
          return _t(this.selector.parentElement);
        }),
        (e.prototype.get = function () {
          return this._getFirstEl();
        }),
        (e.prototype.removeAttr = function (e) {
          var t = e.split(" ");
          return (
            this._each(function (e) {
              t.forEach(function (t) {
                return e.removeAttribute(t);
              });
            }),
            this
          );
        }),
        (e.prototype.wrap = function (e) {
          if (!this.firstElement) return this;
          var t = document.createElement("div");
          return (
            (t.className = e),
            this.firstElement.parentNode.insertBefore(t, this.firstElement),
            this.firstElement.parentNode.removeChild(this.firstElement),
            t.appendChild(this.firstElement),
            this
          );
        }),
        (e.prototype.addClass = function (e) {
          return (
            void 0 === e && (e = ""),
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.add(e);
              });
            }),
            this
          );
        }),
        (e.prototype.removeClass = function (e) {
          return (
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.remove(e);
              });
            }),
            this
          );
        }),
        (e.prototype.hasClass = function (e) {
          return !!this.firstElement && this.firstElement.classList.contains(e);
        }),
        (e.prototype.hasAttribute = function (e) {
          return !!this.firstElement && this.firstElement.hasAttribute(e);
        }),
        (e.prototype.toggleClass = function (e) {
          return this.firstElement
            ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
            : this;
        }),
        (e.prototype.css = function (e, t) {
          var s = this;
          return (
            this._each(function (i) {
              s._setCssVendorPrefix(i, e, t);
            }),
            this
          );
        }),
        (e.prototype.on = function (t, s) {
          var i = this;
          return this.selector
            ? (t.split(" ").forEach(function (t) {
                Array.isArray(e.eventListeners[t]) ||
                  (e.eventListeners[t] = []),
                  e.eventListeners[t].push(s),
                  i.selector.addEventListener(t.split(".")[0], s);
              }),
              this)
            : this;
        }),
        (e.prototype.once = function (e, t) {
          var s = this;
          return (
            this.on(e, function () {
              s.off(e), t(e);
            }),
            this
          );
        }),
        (e.prototype.off = function (t) {
          var s = this;
          return this.selector
            ? (Object.keys(e.eventListeners).forEach(function (i) {
                s.isEventMatched(t, i) &&
                  (e.eventListeners[i].forEach(function (e) {
                    s.selector.removeEventListener(i.split(".")[0], e);
                  }),
                  (e.eventListeners[i] = []));
              }),
              this)
            : this;
        }),
        (e.prototype.trigger = function (e, t) {
          if (!this.firstElement) return this;
          var s = new CustomEvent(e.split(".")[0], { detail: t || null });
          return this.firstElement.dispatchEvent(s), this;
        }),
        (e.prototype.load = function (e) {
          var t = this;
          return (
            fetch(e)
              .then(function (e) {
                return e.text();
              })
              .then(function (e) {
                t.selector.innerHTML = e;
              }),
            this
          );
        }),
        (e.prototype.html = function (e) {
          return void 0 === e
            ? this.firstElement
              ? this.firstElement.innerHTML
              : ""
            : (this._each(function (t) {
                t.innerHTML = e;
              }),
              this);
        }),
        (e.prototype.append = function (e) {
          return (
            this._each(function (t) {
              "string" == typeof e
                ? t.insertAdjacentHTML("beforeend", e)
                : t.appendChild(e);
            }),
            this
          );
        }),
        (e.prototype.prepend = function (e) {
          return (
            this._each(function (t) {
              t.insertAdjacentHTML("afterbegin", e);
            }),
            this
          );
        }),
        (e.prototype.remove = function () {
          return (
            this._each(function (e) {
              e.parentNode.removeChild(e);
            }),
            this
          );
        }),
        (e.prototype.empty = function () {
          return (
            this._each(function (e) {
              e.innerHTML = "";
            }),
            this
          );
        }),
        (e.prototype.scrollTop = function (e) {
          return void 0 !== e
            ? ((document.body.scrollTop = e),
              (document.documentElement.scrollTop = e),
              this)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }),
        (e.prototype.scrollLeft = function (e) {
          return void 0 !== e
            ? ((document.body.scrollLeft = e),
              (document.documentElement.scrollLeft = e),
              this)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }),
        (e.prototype.offset = function () {
          if (!this.firstElement) return { left: 0, top: 0 };
          var e = this.firstElement.getBoundingClientRect(),
            t = _t("body").style().marginLeft;
          return {
            left: e.left - parseFloat(t) + this.scrollLeft(),
            top: e.top + this.scrollTop(),
          };
        }),
        (e.prototype.style = function () {
          return this.firstElement
            ? this.firstElement.currentStyle ||
                window.getComputedStyle(this.firstElement)
            : {};
        }),
        (e.prototype.width = function () {
          var e = this.style();
          return (
            this.firstElement.clientWidth -
            parseFloat(e.paddingLeft) -
            parseFloat(e.paddingRight)
          );
        }),
        (e.prototype.height = function () {
          var e = this.style();
          return (
            this.firstElement.clientHeight -
            parseFloat(e.paddingTop) -
            parseFloat(e.paddingBottom)
          );
        }),
        (e.eventListeners = {}),
        e
      );
    })();
    function _t(e) {
      return (
        (function () {
          if ("function" == typeof window.CustomEvent) return !1;
          window.CustomEvent = function (e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: null };
            var s = document.createEvent("CustomEvent");
            return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
          };
        })(),
        Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
        new Nt(e)
      );
    }
    var Rt = [
      "src",
      "sources",
      "subHtml",
      "subHtmlUrl",
      "html",
      "video",
      "poster",
      "slideName",
      "responsive",
      "srcset",
      "sizes",
      "iframe",
      "downloadUrl",
      "download",
      "width",
      "facebookShareUrl",
      "tweetText",
      "iframeTitle",
      "twitterShareUrl",
      "pinterestShareUrl",
      "pinterestText",
      "fbHtml",
      "disqusIdentifier",
      "disqusUrl",
    ];
    function jt(e) {
      return "href" === e
        ? "src"
        : (e = (e =
            (e = e.replace("data-", "")).charAt(0).toLowerCase() +
            e.slice(1)).replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          }));
    }
    var Xt = function (e, t, s, i) {
        void 0 === s && (s = 0);
        var n = _t(e).attr("data-lg-size") || i;
        if (n) {
          var a = n.split(",");
          if (a[1])
            for (var r = window.innerWidth, o = 0; o < a.length; o++) {
              var l = a[o];
              if (parseInt(l.split("-")[2], 10) > r) {
                n = l;
                break;
              }
              o === a.length - 1 && (n = l);
            }
          var d = n.split("-"),
            c = parseInt(d[0], 10),
            p = parseInt(d[1], 10),
            u = t.width(),
            h = t.height() - s,
            m = Math.min(u, c),
            f = Math.min(h, p),
            g = Math.min(m / c, f / p);
          return { width: c * g, height: p * g };
        }
      },
      Yt = function (e, t, s, i, n) {
        if (n) {
          var a = _t(e).find("img").first();
          if (a.get()) {
            var r = t.get().getBoundingClientRect(),
              o = r.width,
              l = t.height() - (s + i),
              d = a.width(),
              c = a.height(),
              p = a.style(),
              u =
                (o - d) / 2 -
                a.offset().left +
                (parseFloat(p.paddingLeft) || 0) +
                (parseFloat(p.borderLeft) || 0) +
                _t(window).scrollLeft() +
                r.left,
              h =
                (l - c) / 2 -
                a.offset().top +
                (parseFloat(p.paddingTop) || 0) +
                (parseFloat(p.borderTop) || 0) +
                _t(window).scrollTop() +
                s;
            return (
              "translate3d(" +
              (u *= -1) +
              "px, " +
              (h *= -1) +
              "px, 0) scale3d(" +
              d / n.width +
              ", " +
              c / n.height +
              ", 1)"
            );
          }
        }
      },
      qt = function (e, t, s, i, n, a) {
        return (
          '<div class="lg-video-cont lg-has-iframe" style="width:' +
          e +
          "; max-width:" +
          s +
          "; height: " +
          t +
          "; max-height:" +
          i +
          '">\n                    <iframe class="lg-object" frameborder="0" ' +
          (a ? 'title="' + a + '"' : "") +
          ' src="' +
          n +
          '"  allowfullscreen="true"></iframe>\n                </div>'
        );
      },
      Ft = function (e, t, s, i, n, a) {
        var r =
            "<img " +
            s +
            " " +
            (i ? 'srcset="' + i + '"' : "") +
            "  " +
            (n ? 'sizes="' + n + '"' : "") +
            ' class="lg-object lg-image" data-index="' +
            e +
            '" src="' +
            t +
            '" />',
          o = "";
        a &&
          (o = ("string" == typeof a ? JSON.parse(a) : a).map(function (e) {
            var t = "";
            return (
              Object.keys(e).forEach(function (s) {
                t += " " + s + '="' + e[s] + '"';
              }),
              "<source " + t + "></source>"
            );
          }));
        return "" + o + r;
      },
      Vt = function (e) {
        for (var t = [], s = [], i = "", n = 0; n < e.length; n++) {
          var a = e[n].split(" ");
          "" === a[0] && a.splice(0, 1), s.push(a[0]), t.push(a[1]);
        }
        for (var r = window.innerWidth, o = 0; o < t.length; o++)
          if (parseInt(t[o], 10) > r) {
            i = s[o];
            break;
          }
        return i;
      },
      Wt = function (e) {
        return !!e && !!e.complete && 0 !== e.naturalWidth;
      },
      Ut = function (e, t, s, i, n) {
        return (
          '<div class="lg-video-cont ' +
          (n && n.youtube
            ? "lg-has-youtube"
            : n && n.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
          '" style="' +
          s +
          '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
          i +
          '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
          i +
          '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
          (t || "") +
          '\n            <img class="lg-object lg-video-poster" src="' +
          e +
          '" />\n        </div>'
        );
      },
      Zt = function (e) {
        var t = e.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        return [].filter.call(t, function (e) {
          var t = window.getComputedStyle(e);
          return "none" !== t.display && "hidden" !== t.visibility;
        });
      },
      Kt = function (e, t, s, i) {
        var n = [],
          a = (function () {
            for (var e = 0, t = 0, s = arguments.length; t < s; t++)
              e += arguments[t].length;
            var i = Array(e),
              n = 0;
            for (t = 0; t < s; t++)
              for (var a = arguments[t], r = 0, o = a.length; r < o; r++, n++)
                i[n] = a[r];
            return i;
          })(Rt, t);
        return (
          [].forEach.call(e, function (e) {
            for (var t = {}, r = 0; r < e.attributes.length; r++) {
              var o = e.attributes[r];
              if (o.specified) {
                var l = jt(o.name),
                  d = "";
                a.indexOf(l) > -1 && (d = l), d && (t[d] = o.value);
              }
            }
            var c = _t(e),
              p = c.find("img").first().attr("alt"),
              u = c.attr("title"),
              h = i ? c.attr(i) : c.find("img").first().attr("src");
            (t.thumb = h),
              s && !t.subHtml && (t.subHtml = u || p || ""),
              (t.alt = p || u || ""),
              n.push(t);
          }),
          n
        );
      },
      Qt = function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      },
      Jt = function (e, t, s) {
        if (!e)
          return t
            ? { html5: !0 }
            : void console.error(
                "lightGallery :- data-src is not provided on slide item " +
                  (s + 1) +
                  ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
              );
        var i = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
          ),
          n = e.match(
            /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
          ),
          a = e.match(
            /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
          );
        return i
          ? { youtube: i }
          : n
          ? { vimeo: n }
          : a
          ? { wistia: a }
          : void 0;
      },
      es = 0,
      ts = (function () {
        function e(e, t) {
          if (
            ((this.lgOpened = !1),
            (this.index = 0),
            (this.plugins = []),
            (this.lGalleryOn = !1),
            (this.lgBusy = !1),
            (this.currentItemsInDom = []),
            (this.prevScrollTop = 0),
            (this.bodyPaddingRight = 0),
            (this.isDummyImageRemoved = !1),
            (this.dragOrSwipeEnabled = !1),
            (this.mediaContainerPosition = { top: 0, bottom: 0 }),
            !e)
          )
            return this;
          if (
            (es++,
            (this.lgId = es),
            (this.el = e),
            (this.LGel = _t(e)),
            this.generateSettings(t),
            this.buildModules(),
            this.settings.dynamic &&
              void 0 !== this.settings.dynamicEl &&
              !Array.isArray(this.settings.dynamicEl))
          )
            throw "When using dynamic mode, you must also define dynamicEl as an Array.";
          return (
            (this.galleryItems = this.getItems()),
            this.normalizeSettings(),
            this.init(),
            this.validateLicense(),
            this
          );
        }
        return (
          (e.prototype.generateSettings = function (e) {
            if (
              ((this.settings = yt(yt({}, Ht), e)),
              this.settings.isMobile &&
              "function" == typeof this.settings.isMobile
                ? this.settings.isMobile()
                : Qt())
            ) {
              var t = yt(
                yt({}, this.settings.mobileSettings),
                this.settings.mobileSettings
              );
              this.settings = yt(yt({}, this.settings), t);
            }
          }),
          (e.prototype.normalizeSettings = function () {
            this.settings.slideEndAnimation &&
              (this.settings.hideControlOnEnd = !1),
              this.settings.closable || (this.settings.swipeToClose = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              this.settings.dynamic && (this.zoomFromOrigin = !1),
              this.settings.container ||
                (this.settings.container = document.body),
              (this.settings.preload = Math.min(
                this.settings.preload,
                this.galleryItems.length
              ));
          }),
          (e.prototype.init = function () {
            var e = this;
            this.addSlideVideoInfo(this.galleryItems),
              this.buildStructure(),
              this.LGel.trigger(wt, { instance: this }),
              this.settings.keyPress && this.keyPress(),
              setTimeout(function () {
                e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
              }, 50),
              this.arrow(),
              this.settings.mousewheel && this.mousewheel(),
              this.settings.dynamic || this.openGalleryOnItemClick();
          }),
          (e.prototype.openGalleryOnItemClick = function () {
            for (
              var e = this,
                t = function (t) {
                  var i = s.items[t],
                    n = _t(i),
                    a = Nt.generateUUID();
                  n.attr("data-lg-id", a).on(
                    "click.lgcustom-item-" + a,
                    function (s) {
                      s.preventDefault();
                      var n = e.settings.index || t;
                      e.openGallery(n, i);
                    }
                  );
                },
                s = this,
                i = 0;
              i < this.items.length;
              i++
            )
              t(i);
          }),
          (e.prototype.buildModules = function () {
            var e = this;
            this.settings.plugins.forEach(function (t) {
              e.plugins.push(new t(e, _t));
            });
          }),
          (e.prototype.validateLicense = function () {
            this.settings.licenseKey
              ? "0000-0000-000-0000" === this.settings.licenseKey &&
                console.warn(
                  "lightGallery: " +
                    this.settings.licenseKey +
                    " license key is not valid for production use"
                )
              : console.error("Please provide a valid license key");
          }),
          (e.prototype.getSlideItem = function (e) {
            return _t(this.getSlideItemId(e));
          }),
          (e.prototype.getSlideItemId = function (e) {
            return "#lg-item-" + this.lgId + "-" + e;
          }),
          (e.prototype.getIdName = function (e) {
            return e + "-" + this.lgId;
          }),
          (e.prototype.getElementById = function (e) {
            return _t("#" + this.getIdName(e));
          }),
          (e.prototype.manageSingleSlideClassName = function () {
            this.galleryItems.length < 2
              ? this.outer.addClass("lg-single-item")
              : this.outer.removeClass("lg-single-item");
          }),
          (e.prototype.buildStructure = function () {
            var e = this;
            if (!(this.$container && this.$container.get())) {
              var t = "",
                s = "";
              this.settings.controls &&
                (t =
                  '<button type="button" id="' +
                  this.getIdName("lg-prev") +
                  '" aria-label="' +
                  this.settings.strings.previousSlide +
                  '" class="lg-prev lg-icon"> ' +
                  this.settings.prevHtml +
                  ' </button>\n                <button type="button" id="' +
                  this.getIdName("lg-next") +
                  '" aria-label="' +
                  this.settings.strings.nextSlide +
                  '" class="lg-next lg-icon"> ' +
                  this.settings.nextHtml +
                  " </button>"),
                ".lg-item" !== this.settings.appendSubHtmlTo &&
                  (s =
                    '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
              var i = "";
              this.settings.allowMediaOverlap && (i += "lg-media-overlap ");
              var n = this.settings.ariaLabelledby
                  ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                  : "",
                a = this.settings.ariaDescribedby
                  ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                  : "",
                r =
                  "lg-container " +
                  this.settings.addClass +
                  " " +
                  (document.body !== this.settings.container
                    ? "lg-inline"
                    : ""),
                o =
                  this.settings.closable && this.settings.showCloseIcon
                    ? '<button type="button" aria-label="' +
                      this.settings.strings.closeGallery +
                      '" id="' +
                      this.getIdName("lg-close") +
                      '" class="lg-close lg-icon"></button>'
                    : "",
                l = this.settings.showMaximizeIcon
                  ? '<button type="button" aria-label="' +
                    this.settings.strings.toggleMaximize +
                    '" id="' +
                    this.getIdName("lg-maximize") +
                    '" class="lg-maximize lg-icon"></button>'
                  : "",
                d =
                  '\n        <div class="' +
                  r +
                  '" id="' +
                  this.getIdName("lg-container") +
                  '" tabindex="-1" aria-modal="true" ' +
                  n +
                  " " +
                  a +
                  ' role="dialog"\n        >\n            <div id="' +
                  this.getIdName("lg-backdrop") +
                  '" class="lg-backdrop"></div>\n\n            <div id="' +
                  this.getIdName("lg-outer") +
                  '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                  i +
                  ' ">\n\n              <div id="' +
                  this.getIdName("lg-content") +
                  '" class="lg-content">\n                <div id="' +
                  this.getIdName("lg-inner") +
                  '" class="lg-inner">\n                </div>\n                ' +
                  t +
                  '\n              </div>\n                <div id="' +
                  this.getIdName("lg-toolbar") +
                  '" class="lg-toolbar lg-group">\n                    ' +
                  l +
                  "\n                    " +
                  o +
                  "\n                    </div>\n                    " +
                  (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                  '\n                <div id="' +
                  this.getIdName("lg-components") +
                  '" class="lg-components">\n                    ' +
                  (".lg-sub-html" === this.settings.appendSubHtmlTo ? s : "") +
                  "\n                </div>\n            </div>\n        </div>\n        ";
              _t(this.settings.container).append(d),
                document.body !== this.settings.container &&
                  _t(this.settings.container).css("position", "relative"),
                (this.outer = this.getElementById("lg-outer")),
                (this.$lgComponents = this.getElementById("lg-components")),
                (this.$backdrop = this.getElementById("lg-backdrop")),
                (this.$container = this.getElementById("lg-container")),
                (this.$inner = this.getElementById("lg-inner")),
                (this.$content = this.getElementById("lg-content")),
                (this.$toolbar = this.getElementById("lg-toolbar")),
                this.$backdrop.css(
                  "transition-duration",
                  this.settings.backdropDuration + "ms"
                );
              var c = this.settings.mode + " ";
              this.manageSingleSlideClassName(),
                this.settings.enableDrag && (c += "lg-grab "),
                this.outer.addClass(c),
                this.$inner.css(
                  "transition-timing-function",
                  this.settings.easing
                ),
                this.$inner.css(
                  "transition-duration",
                  this.settings.speed + "ms"
                ),
                this.settings.download &&
                  this.$toolbar.append(
                    '<a id="' +
                      this.getIdName("lg-download") +
                      '" target="_blank" rel="noopener" aria-label="' +
                      this.settings.strings.download +
                      '" download class="lg-download lg-icon"></a>'
                  ),
                this.counter(),
                _t(window).on(
                  "resize.lg.global" +
                    this.lgId +
                    " orientationchange.lg.global" +
                    this.lgId,
                  function () {
                    e.refreshOnResize();
                  }
                ),
                this.hideBars(),
                this.manageCloseGallery(),
                this.toggleMaximize(),
                this.initModules();
            }
          }),
          (e.prototype.refreshOnResize = function () {
            if (this.lgOpened) {
              var e = this.galleryItems[this.index].__slideVideoInfo;
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var t = this.mediaContainerPosition,
                s = t.top,
                i = t.bottom;
              if (
                ((this.currentImageSize = Xt(
                  this.items[this.index],
                  this.outer,
                  s + i,
                  e && this.settings.videoMaxSize
                )),
                e && this.resizeVideoSlide(this.index, this.currentImageSize),
                this.zoomFromOrigin && !this.isDummyImageRemoved)
              ) {
                var n = this.getDummyImgStyles(this.currentImageSize);
                this.outer
                  .find(".lg-current .lg-dummy-img")
                  .first()
                  .attr("style", n);
              }
              this.LGel.trigger(Ct);
            }
          }),
          (e.prototype.resizeVideoSlide = function (e, t) {
            var s = this.getVideoContStyle(t);
            this.getSlideItem(e).find(".lg-video-cont").attr("style", s);
          }),
          (e.prototype.updateSlides = function (e, t) {
            if (
              (this.index > e.length - 1 && (this.index = e.length - 1),
              1 === e.length && (this.index = 0),
              e.length)
            ) {
              var s = this.galleryItems[t].src;
              (this.galleryItems = e),
                this.updateControls(),
                this.$inner.empty(),
                (this.currentItemsInDom = []);
              var i = 0;
              this.galleryItems.some(function (e, t) {
                return e.src === s && ((i = t), !0);
              }),
                (this.currentItemsInDom = this.organizeSlideItems(i, -1)),
                this.loadContent(i, !0),
                this.getSlideItem(i).addClass("lg-current"),
                (this.index = i),
                this.updateCurrentCounter(i),
                this.LGel.trigger(St);
            } else this.closeGallery();
          }),
          (e.prototype.getItems = function () {
            if (((this.items = []), this.settings.dynamic))
              return this.settings.dynamicEl || [];
            if ("this" === this.settings.selector) this.items.push(this.el);
            else if (this.settings.selector)
              if ("string" == typeof this.settings.selector)
                if (this.settings.selectWithin) {
                  var e = _t(this.settings.selectWithin);
                  this.items = e.find(this.settings.selector).get();
                } else
                  this.items = this.el.querySelectorAll(this.settings.selector);
              else this.items = this.settings.selector;
            else this.items = this.el.children;
            return Kt(
              this.items,
              this.settings.extraProps,
              this.settings.getCaptionFromTitleOrAlt,
              this.settings.exThumbImage
            );
          }),
          (e.prototype.shouldHideScrollbar = function () {
            return (
              this.settings.hideScrollbar &&
              document.body === this.settings.container
            );
          }),
          (e.prototype.hideScrollbar = function () {
            if (this.shouldHideScrollbar()) {
              this.bodyPaddingRight = parseFloat(
                _t("body").style().paddingRight
              );
              var e = document.documentElement.getBoundingClientRect(),
                t = window.innerWidth - e.width;
              _t(document.body).css(
                "padding-right",
                t + this.bodyPaddingRight + "px"
              ),
                _t(document.body).addClass("lg-overlay-open");
            }
          }),
          (e.prototype.resetScrollBar = function () {
            this.shouldHideScrollbar() &&
              (_t(document.body).css(
                "padding-right",
                this.bodyPaddingRight + "px"
              ),
              _t(document.body).removeClass("lg-overlay-open"));
          }),
          (e.prototype.openGallery = function (e, t) {
            var s = this;
            if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
              (this.lgOpened = !0),
                this.outer.removeClass("lg-hide-items"),
                this.hideScrollbar(),
                this.$container.addClass("lg-show");
              var i = this.getItemsToBeInsertedToDom(e, e);
              this.currentItemsInDom = i;
              var n = "";
              i.forEach(function (e) {
                n = n + '<div id="' + e + '" class="lg-item"></div>';
              }),
                this.$inner.append(n),
                this.addHtml(e);
              var a = "";
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var r = this.mediaContainerPosition,
                o = r.top,
                l = r.bottom;
              this.settings.allowMediaOverlap ||
                this.setMediaContainerPosition(o, l);
              var d = this.galleryItems[e].__slideVideoInfo;
              this.zoomFromOrigin &&
                t &&
                ((this.currentImageSize = Xt(
                  t,
                  this.outer,
                  o + l,
                  d && this.settings.videoMaxSize
                )),
                (a = Yt(t, this.outer, o, l, this.currentImageSize))),
                (this.zoomFromOrigin && a) ||
                  (this.outer.addClass(this.settings.startClass),
                  this.getSlideItem(e).removeClass("lg-complete"));
              var c = this.settings.zoomFromOrigin
                ? 100
                : this.settings.backdropDuration;
              setTimeout(function () {
                s.outer.addClass("lg-components-open");
              }, c),
                (this.index = e),
                this.LGel.trigger(Tt),
                this.getSlideItem(e).addClass("lg-current"),
                (this.lGalleryOn = !1),
                (this.prevScrollTop = _t(window).scrollTop()),
                setTimeout(function () {
                  if (s.zoomFromOrigin && a) {
                    var t = s.getSlideItem(e);
                    t.css("transform", a),
                      setTimeout(function () {
                        t
                          .addClass("lg-start-progress lg-start-end-progress")
                          .css(
                            "transition-duration",
                            s.settings.startAnimationDuration + "ms"
                          ),
                          s.outer.addClass("lg-zoom-from-image");
                      }),
                      setTimeout(function () {
                        t.css("transform", "translate3d(0, 0, 0)");
                      }, 100);
                  }
                  setTimeout(function () {
                    s.$backdrop.addClass("in"),
                      s.$container.addClass("lg-show-in");
                  }, 10),
                    setTimeout(function () {
                      s.settings.trapFocus &&
                        document.body === s.settings.container &&
                        s.trapFocus();
                    }, s.settings.backdropDuration + 50),
                    (s.zoomFromOrigin && a) ||
                      setTimeout(function () {
                        s.outer.addClass("lg-visible");
                      }, s.settings.backdropDuration),
                    s.slide(e, !1, !1, !1),
                    s.LGel.trigger($t);
                }),
                document.body === this.settings.container &&
                  _t("html").addClass("lg-on");
            }
          }),
          (e.prototype.getMediaContainerPosition = function () {
            if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
            var e = this.$toolbar.get().clientHeight || 0,
              t = this.outer.find(".lg-components .lg-sub-html").get(),
              s =
                this.settings.defaultCaptionHeight ||
                (t && t.clientHeight) ||
                0,
              i = this.outer.find(".lg-thumb-outer").get();
            return { top: e, bottom: (i ? i.clientHeight : 0) + s };
          }),
          (e.prototype.setMediaContainerPosition = function (e, t) {
            void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              this.$content.css("top", e + "px").css("bottom", t + "px");
          }),
          (e.prototype.hideBars = function () {
            var e = this;
            setTimeout(function () {
              e.outer.removeClass("lg-hide-items"),
                e.settings.hideBarsDelay > 0 &&
                  (e.outer.on(
                    "mousemove.lg click.lg touchstart.lg",
                    function () {
                      e.outer.removeClass("lg-hide-items"),
                        clearTimeout(e.hideBarTimeout),
                        (e.hideBarTimeout = setTimeout(function () {
                          e.outer.addClass("lg-hide-items");
                        }, e.settings.hideBarsDelay));
                    }
                  ),
                  e.outer.trigger("mousemove.lg"));
            }, this.settings.showBarsAfter);
          }),
          (e.prototype.initPictureFill = function (e) {
            if (this.settings.supportLegacyBrowser)
              try {
                picturefill({ elements: [e.get()] });
              } catch (e) {
                console.warn(
                  "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                );
              }
          }),
          (e.prototype.counter = function () {
            if (this.settings.counter) {
              var e =
                '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                this.getIdName("lg-counter-current") +
                '" class="lg-counter-current">' +
                (this.index + 1) +
                ' </span> /\n                <span id="' +
                this.getIdName("lg-counter-all") +
                '" class="lg-counter-all">' +
                this.galleryItems.length +
                " </span></div>";
              this.outer.find(this.settings.appendCounterTo).append(e);
            }
          }),
          (e.prototype.addHtml = function (e) {
            var t, s;
            if (
              (this.galleryItems[e].subHtmlUrl
                ? (s = this.galleryItems[e].subHtmlUrl)
                : (t = this.galleryItems[e].subHtml),
              !s)
            )
              if (t) {
                var i = t.substring(0, 1);
                ("." !== i && "#" !== i) ||
                  (t =
                    this.settings.subHtmlSelectorRelative &&
                    !this.settings.dynamic
                      ? _t(this.items).eq(e).find(t).first().html()
                      : _t(t).first().html());
              } else t = "";
            if (".lg-item" !== this.settings.appendSubHtmlTo)
              s
                ? this.outer.find(".lg-sub-html").load(s)
                : this.outer.find(".lg-sub-html").html(t);
            else {
              var n = _t(this.getSlideItemId(e));
              s
                ? n.load(s)
                : n.append('<div class="lg-sub-html">' + t + "</div>");
            }
            null != t &&
              ("" === t
                ? this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .addClass("lg-empty-html")
                : this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .removeClass("lg-empty-html")),
              this.LGel.trigger(Et, { index: e });
          }),
          (e.prototype.preload = function (e) {
            for (
              var t = 1;
              t <= this.settings.preload &&
              !(t >= this.galleryItems.length - e);
              t++
            )
              this.loadContent(e + t, !1);
            for (var s = 1; s <= this.settings.preload && !(e - s < 0); s++)
              this.loadContent(e - s, !1);
          }),
          (e.prototype.getDummyImgStyles = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                margin-left: -" +
                  e.width / 2 +
                  "px;\n                margin-top: -" +
                  e.height / 2 +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getVideoContStyle = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getDummyImageContent = function (e, t, s) {
            var i;
            if ((this.settings.dynamic || (i = _t(this.items).eq(t)), i)) {
              var n = void 0;
              if (
                !(n = this.settings.exThumbImage
                  ? i.attr(this.settings.exThumbImage)
                  : i.find("img").first().attr("src"))
              )
                return "";
              var a =
                "<img " +
                s +
                ' style="' +
                this.getDummyImgStyles(this.currentImageSize) +
                '" class="lg-dummy-img" src="' +
                n +
                '" />';
              return (
                e.addClass("lg-first-slide"),
                this.outer.addClass("lg-first-slide-loading"),
                a
              );
            }
            return "";
          }),
          (e.prototype.setImgMarkup = function (e, t, s) {
            var i = this.galleryItems[s],
              n = i.alt,
              a = i.srcset,
              r = i.sizes,
              o = i.sources,
              l = n ? 'alt="' + n + '"' : "",
              d =
                '<picture class="lg-img-wrap"> ' +
                (this.isFirstSlideWithZoomAnimation()
                  ? this.getDummyImageContent(t, s, l)
                  : Ft(s, e, l, a, r, o)) +
                "</picture>";
            t.prepend(d);
          }),
          (e.prototype.onSlideObjectLoad = function (e, t, s, i) {
            var n = e.find(".lg-object").first();
            Wt(n.get()) || t
              ? s()
              : (n.on("load.lg error.lg", function () {
                  s && s();
                }),
                n.on("error.lg", function () {
                  i && i();
                }));
          }),
          (e.prototype.onLgObjectLoad = function (e, t, s, i, n, a) {
            var r = this;
            this.onSlideObjectLoad(
              e,
              a,
              function () {
                r.triggerSlideItemLoad(e, t, s, i, n);
              },
              function () {
                e.addClass("lg-complete lg-complete_"),
                  e.html(
                    '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                  );
              }
            );
          }),
          (e.prototype.triggerSlideItemLoad = function (e, t, s, i, n) {
            var a = this,
              r = this.galleryItems[t],
              o = n && "video" === this.getSlideType(r) && !r.poster ? i : 0;
            setTimeout(function () {
              e.addClass("lg-complete lg-complete_"),
                a.LGel.trigger(Mt, {
                  index: t,
                  delay: s || 0,
                  isFirstSlide: n,
                });
            }, o);
          }),
          (e.prototype.isFirstSlideWithZoomAnimation = function () {
            return !(
              this.lGalleryOn ||
              !this.zoomFromOrigin ||
              !this.currentImageSize
            );
          }),
          (e.prototype.addSlideVideoInfo = function (e) {
            var t = this;
            e.forEach(function (e, s) {
              (e.__slideVideoInfo = Jt(e.src, !!e.video, s)),
                e.__slideVideoInfo &&
                  t.settings.loadYouTubePoster &&
                  !e.poster &&
                  e.__slideVideoInfo.youtube &&
                  (e.poster =
                    "//img.youtube.com/vi/" +
                    e.__slideVideoInfo.youtube[1] +
                    "/maxresdefault.jpg");
            });
          }),
          (e.prototype.loadContent = function (e, t) {
            var s = this,
              i = this.galleryItems[e],
              n = _t(this.getSlideItemId(e)),
              a = i.poster,
              r = i.srcset,
              o = i.sizes,
              l = i.sources,
              d = i.src,
              c = i.video,
              p = c && "string" == typeof c ? JSON.parse(c) : c;
            if (i.responsive) {
              var u = i.responsive.split(",");
              d = Vt(u) || d;
            }
            var h = i.__slideVideoInfo,
              m = "",
              f = !!i.iframe,
              g = !this.lGalleryOn,
              v = 0;
            if (
              (g &&
                (v =
                  this.zoomFromOrigin && this.currentImageSize
                    ? this.settings.startAnimationDuration + 10
                    : this.settings.backdropDuration + 10),
              !n.hasClass("lg-loaded"))
            ) {
              if (h) {
                var y = this.mediaContainerPosition,
                  b = y.top,
                  w = y.bottom,
                  x = Xt(
                    this.items[e],
                    this.outer,
                    b + w,
                    h && this.settings.videoMaxSize
                  );
                m = this.getVideoContStyle(x);
              }
              if (f) {
                var C = qt(
                  this.settings.iframeWidth,
                  this.settings.iframeHeight,
                  this.settings.iframeMaxWidth,
                  this.settings.iframeMaxHeight,
                  d,
                  i.iframeTitle
                );
                n.prepend(C);
              } else if (a) {
                var S = "";
                g &&
                  this.zoomFromOrigin &&
                  this.currentImageSize &&
                  (S = this.getDummyImageContent(n, e, ""));
                C = Ut(a, S || "", m, this.settings.strings.playVideo, h);
                n.prepend(C);
              } else if (h) {
                C = '<div class="lg-video-cont " style="' + m + '"></div>';
                n.prepend(C);
              } else if ((this.setImgMarkup(d, n, e), r || l)) {
                var E = n.find(".lg-object");
                this.initPictureFill(E);
              }
              (a || h) &&
                this.LGel.trigger(xt, {
                  index: e,
                  src: d,
                  html5Video: p,
                  hasPoster: !!a,
                }),
                this.LGel.trigger(bt, { index: e }),
                this.lGalleryOn &&
                  ".lg-item" === this.settings.appendSubHtmlTo &&
                  this.addHtml(e);
            }
            var T = 0;
            v && !_t(document.body).hasClass("lg-from-hash") && (T = v),
              this.isFirstSlideWithZoomAnimation() &&
                (setTimeout(function () {
                  n.removeClass(
                    "lg-start-end-progress lg-start-progress"
                  ).removeAttr("style");
                }, this.settings.startAnimationDuration + 100),
                n.hasClass("lg-loaded") ||
                  setTimeout(function () {
                    if ("image" === s.getSlideType(i)) {
                      var t = i.alt,
                        c = t ? 'alt="' + t + '"' : "";
                      if (
                        (n
                          .find(".lg-img-wrap")
                          .append(Ft(e, d, c, r, o, i.sources)),
                        r || l)
                      ) {
                        var p = n.find(".lg-object");
                        s.initPictureFill(p);
                      }
                    }
                    ("image" === s.getSlideType(i) ||
                      ("video" === s.getSlideType(i) && a)) &&
                      (s.onLgObjectLoad(n, e, v, T, !0, !1),
                      s.onSlideObjectLoad(
                        n,
                        !(!h || !h.html5 || a),
                        function () {
                          s.loadContentOnFirstSlideLoad(e, n, T);
                        },
                        function () {
                          s.loadContentOnFirstSlideLoad(e, n, T);
                        }
                      ));
                  }, this.settings.startAnimationDuration + 100)),
              n.addClass("lg-loaded"),
              (this.isFirstSlideWithZoomAnimation() &&
                ("video" !== this.getSlideType(i) || a)) ||
                this.onLgObjectLoad(n, e, v, T, g, !(!h || !h.html5 || a)),
              (this.zoomFromOrigin && this.currentImageSize) ||
                !n.hasClass("lg-complete_") ||
                this.lGalleryOn ||
                setTimeout(function () {
                  n.addClass("lg-complete");
                }, this.settings.backdropDuration),
              (this.lGalleryOn = !0),
              !0 === t &&
                (n.hasClass("lg-complete_")
                  ? this.preload(e)
                  : n
                      .find(".lg-object")
                      .first()
                      .on("load.lg error.lg", function () {
                        s.preload(e);
                      }));
          }),
          (e.prototype.loadContentOnFirstSlideLoad = function (e, t, s) {
            var i = this;
            setTimeout(function () {
              t.find(".lg-dummy-img").remove(),
                t.removeClass("lg-first-slide"),
                i.outer.removeClass("lg-first-slide-loading"),
                (i.isDummyImageRemoved = !0),
                i.preload(e);
            }, s + 300);
          }),
          (e.prototype.getItemsToBeInsertedToDom = function (e, t, s) {
            var i = this;
            void 0 === s && (s = 0);
            var n = [],
              a = Math.max(s, 3);
            a = Math.min(a, this.galleryItems.length);
            var r = "lg-item-" + this.lgId + "-" + t;
            if (this.galleryItems.length <= 3)
              return (
                this.galleryItems.forEach(function (e, t) {
                  n.push("lg-item-" + i.lgId + "-" + t);
                }),
                n
              );
            if (e < (this.galleryItems.length - 1) / 2) {
              for (var o = e; o > e - a / 2 && o >= 0; o--)
                n.push("lg-item-" + this.lgId + "-" + o);
              var l = n.length;
              for (o = 0; o < a - l; o++)
                n.push("lg-item-" + this.lgId + "-" + (e + o + 1));
            } else {
              for (
                o = e;
                o <= this.galleryItems.length - 1 && o < e + a / 2;
                o++
              )
                n.push("lg-item-" + this.lgId + "-" + o);
              for (l = n.length, o = 0; o < a - l; o++)
                n.push("lg-item-" + this.lgId + "-" + (e - o - 1));
            }
            return (
              this.settings.loop &&
                (e === this.galleryItems.length - 1
                  ? n.push("lg-item-" + this.lgId + "-0")
                  : 0 === e &&
                    n.push(
                      "lg-item-" +
                        this.lgId +
                        "-" +
                        (this.galleryItems.length - 1)
                    )),
              -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + t),
              n
            );
          }),
          (e.prototype.organizeSlideItems = function (e, t) {
            var s = this,
              i = this.getItemsToBeInsertedToDom(
                e,
                t,
                this.settings.numberOfSlideItemsInDom
              );
            return (
              i.forEach(function (e) {
                -1 === s.currentItemsInDom.indexOf(e) &&
                  s.$inner.append('<div id="' + e + '" class="lg-item"></div>');
              }),
              this.currentItemsInDom.forEach(function (e) {
                -1 === i.indexOf(e) && _t("#" + e).remove();
              }),
              i
            );
          }),
          (e.prototype.getPreviousSlideIndex = function () {
            var e = 0;
            try {
              var t = this.outer.find(".lg-current").first().attr("id");
              e = parseInt(t.split("-")[3]) || 0;
            } catch (t) {
              e = 0;
            }
            return e;
          }),
          (e.prototype.setDownloadValue = function (e) {
            if (this.settings.download) {
              var t = this.galleryItems[e];
              if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                this.outer.addClass("lg-hide-download");
              else {
                var s = this.getElementById("lg-download");
                this.outer.removeClass("lg-hide-download"),
                  s.attr("href", t.downloadUrl || t.src),
                  t.download && s.attr("download", t.download);
              }
            }
          }),
          (e.prototype.makeSlideAnimation = function (e, t, s) {
            var i = this;
            this.lGalleryOn && s.addClass("lg-slide-progress"),
              setTimeout(
                function () {
                  i.outer.addClass("lg-no-trans"),
                    i.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-next-slide"),
                    "prev" === e
                      ? (t.addClass("lg-prev-slide"),
                        s.addClass("lg-next-slide"))
                      : (t.addClass("lg-next-slide"),
                        s.addClass("lg-prev-slide")),
                    setTimeout(function () {
                      i.outer.find(".lg-item").removeClass("lg-current"),
                        t.addClass("lg-current"),
                        i.outer.removeClass("lg-no-trans");
                    }, 50);
                },
                this.lGalleryOn ? this.settings.slideDelay : 0
              );
          }),
          (e.prototype.slide = function (e, t, s, i) {
            var n = this,
              a = this.getPreviousSlideIndex();
            if (
              ((this.currentItemsInDom = this.organizeSlideItems(e, a)),
              !this.lGalleryOn || a !== e)
            ) {
              var r = this.galleryItems.length;
              if (!this.lgBusy) {
                this.settings.counter && this.updateCurrentCounter(e);
                var o = this.getSlideItem(e),
                  l = this.getSlideItem(a),
                  d = this.galleryItems[e],
                  c = d.__slideVideoInfo;
                if (
                  (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                  this.setDownloadValue(e),
                  c)
                ) {
                  var p = this.mediaContainerPosition,
                    u = p.top,
                    h = p.bottom,
                    m = Xt(
                      this.items[e],
                      this.outer,
                      u + h,
                      c && this.settings.videoMaxSize
                    );
                  this.resizeVideoSlide(e, m);
                }
                if (
                  (this.LGel.trigger(It, {
                    prevIndex: a,
                    index: e,
                    fromTouch: !!t,
                    fromThumb: !!s,
                  }),
                  (this.lgBusy = !0),
                  clearTimeout(this.hideBarTimeout),
                  this.arrowDisable(e),
                  i || (e < a ? (i = "prev") : e > a && (i = "next")),
                  t)
                ) {
                  this.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-current lg-next-slide");
                  var f = void 0,
                    g = void 0;
                  r > 2
                    ? ((f = e - 1),
                      (g = e + 1),
                      ((0 === e && a === r - 1) || (e === r - 1 && 0 === a)) &&
                        ((g = 0), (f = r - 1)))
                    : ((f = 0), (g = 1)),
                    "prev" === i
                      ? this.getSlideItem(g).addClass("lg-next-slide")
                      : this.getSlideItem(f).addClass("lg-prev-slide"),
                    o.addClass("lg-current");
                } else this.makeSlideAnimation(i, o, l);
                this.lGalleryOn
                  ? setTimeout(function () {
                      n.loadContent(e, !0),
                        ".lg-item" !== n.settings.appendSubHtmlTo &&
                          n.addHtml(e);
                    }, this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay))
                  : this.loadContent(e, !0),
                  setTimeout(function () {
                    (n.lgBusy = !1),
                      l.removeClass("lg-slide-progress"),
                      n.LGel.trigger(Ot, {
                        prevIndex: a,
                        index: e,
                        fromTouch: t,
                        fromThumb: s,
                      });
                  }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                    (t ? 0 : this.settings.slideDelay));
              }
              this.index = e;
            }
          }),
          (e.prototype.updateCurrentCounter = function (e) {
            this.getElementById("lg-counter-current").html(e + 1 + "");
          }),
          (e.prototype.updateCounterTotal = function () {
            this.getElementById("lg-counter-all").html(
              this.galleryItems.length + ""
            );
          }),
          (e.prototype.getSlideType = function (e) {
            return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
          }),
          (e.prototype.touchMove = function (e, t, s) {
            var i = t.pageX - e.pageX,
              n = t.pageY - e.pageY,
              a = !1;
            if (
              (this.swipeDirection
                ? (a = !0)
                : Math.abs(i) > 15
                ? ((this.swipeDirection = "horizontal"), (a = !0))
                : Math.abs(n) > 15 &&
                  ((this.swipeDirection = "vertical"), (a = !0)),
              a)
            ) {
              var r = this.getSlideItem(this.index);
              if ("horizontal" === this.swipeDirection) {
                null == s || s.preventDefault(),
                  this.outer.addClass("lg-dragging"),
                  this.setTranslate(r, i, 0);
                var o = r.get().offsetWidth,
                  l = (15 * o) / 100 - Math.abs((10 * i) / 100);
                this.setTranslate(
                  this.outer.find(".lg-prev-slide").first(),
                  -o + i - l,
                  0
                ),
                  this.setTranslate(
                    this.outer.find(".lg-next-slide").first(),
                    o + i + l,
                    0
                  );
              } else if (
                "vertical" === this.swipeDirection &&
                this.settings.swipeToClose
              ) {
                null == s || s.preventDefault(),
                  this.$container.addClass("lg-dragging-vertical");
                var d = 1 - Math.abs(n) / window.innerHeight;
                this.$backdrop.css("opacity", d);
                var c = 1 - Math.abs(n) / (2 * window.innerWidth);
                this.setTranslate(r, 0, n, c, c),
                  Math.abs(n) > 100 &&
                    this.outer
                      .addClass("lg-hide-items")
                      .removeClass("lg-components-open");
              }
            }
          }),
          (e.prototype.touchEnd = function (e, t, s) {
            var i,
              n = this;
            "lg-slide" !== this.settings.mode &&
              this.outer.addClass("lg-slide"),
              setTimeout(function () {
                n.$container.removeClass("lg-dragging-vertical"),
                  n.outer
                    .removeClass("lg-dragging lg-hide-items")
                    .addClass("lg-components-open");
                var a = !0;
                if ("horizontal" === n.swipeDirection) {
                  i = e.pageX - t.pageX;
                  var r = Math.abs(e.pageX - t.pageX);
                  i < 0 && r > n.settings.swipeThreshold
                    ? (n.goToNextSlide(!0), (a = !1))
                    : i > 0 &&
                      r > n.settings.swipeThreshold &&
                      (n.goToPrevSlide(!0), (a = !1));
                } else if ("vertical" === n.swipeDirection) {
                  if (
                    ((i = Math.abs(e.pageY - t.pageY)),
                    n.settings.closable && n.settings.swipeToClose && i > 100)
                  )
                    return void n.closeGallery();
                  n.$backdrop.css("opacity", 1);
                }
                if (
                  (n.outer.find(".lg-item").removeAttr("style"),
                  a && Math.abs(e.pageX - t.pageX) < 5)
                ) {
                  var o = _t(s.target);
                  n.isPosterElement(o) && n.LGel.trigger(zt);
                }
                n.swipeDirection = void 0;
              }),
              setTimeout(function () {
                n.outer.hasClass("lg-dragging") ||
                  "lg-slide" === n.settings.mode ||
                  n.outer.removeClass("lg-slide");
              }, this.settings.speed + 100);
          }),
          (e.prototype.enableSwipe = function () {
            var e = this,
              t = {},
              s = {},
              i = !1,
              n = !1;
            this.settings.enableSwipe &&
              (this.$inner.on("touchstart.lg", function (s) {
                e.dragOrSwipeEnabled = !0;
                var i = e.getSlideItem(e.index);
                (!_t(s.target).hasClass("lg-item") &&
                  !i.get().contains(s.target)) ||
                  e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  1 !== s.touches.length ||
                  ((n = !0),
                  (e.touchAction = "swipe"),
                  e.manageSwipeClass(),
                  (t = {
                    pageX: s.touches[0].pageX,
                    pageY: s.touches[0].pageY,
                  }));
              }),
              this.$inner.on("touchmove.lg", function (a) {
                n &&
                  "swipe" === e.touchAction &&
                  1 === a.touches.length &&
                  ((s = {
                    pageX: a.touches[0].pageX,
                    pageY: a.touches[0].pageY,
                  }),
                  e.touchMove(t, s, a),
                  (i = !0));
              }),
              this.$inner.on("touchend.lg", function (a) {
                if ("swipe" === e.touchAction) {
                  if (i) (i = !1), e.touchEnd(s, t, a);
                  else if (n) {
                    var r = _t(a.target);
                    e.isPosterElement(r) && e.LGel.trigger(zt);
                  }
                  (e.touchAction = void 0), (n = !1);
                }
              }));
          }),
          (e.prototype.enableDrag = function () {
            var e = this,
              t = {},
              s = {},
              i = !1,
              n = !1;
            this.settings.enableDrag &&
              (this.outer.on("mousedown.lg", function (s) {
                e.dragOrSwipeEnabled = !0;
                var n = e.getSlideItem(e.index);
                (_t(s.target).hasClass("lg-item") ||
                  n.get().contains(s.target)) &&
                  (e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    (s.preventDefault(),
                    e.lgBusy ||
                      (e.manageSwipeClass(),
                      (t = { pageX: s.pageX, pageY: s.pageY }),
                      (i = !0),
                      (e.outer.get().scrollLeft += 1),
                      (e.outer.get().scrollLeft -= 1),
                      e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                      e.LGel.trigger(Pt))));
              }),
              _t(window).on("mousemove.lg.global" + this.lgId, function (a) {
                i &&
                  e.lgOpened &&
                  ((n = !0),
                  (s = { pageX: a.pageX, pageY: a.pageY }),
                  e.touchMove(t, s),
                  e.LGel.trigger(Lt));
              }),
              _t(window).on("mouseup.lg.global" + this.lgId, function (a) {
                if (e.lgOpened) {
                  var r = _t(a.target);
                  n
                    ? ((n = !1), e.touchEnd(s, t, a), e.LGel.trigger(kt))
                    : e.isPosterElement(r) && e.LGel.trigger(zt),
                    i &&
                      ((i = !1),
                      e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                }
              }));
          }),
          (e.prototype.triggerPosterClick = function () {
            var e = this;
            this.$inner.on("click.lg", function (t) {
              !e.dragOrSwipeEnabled &&
                e.isPosterElement(_t(t.target)) &&
                e.LGel.trigger(zt);
            });
          }),
          (e.prototype.manageSwipeClass = function () {
            var e = this.index + 1,
              t = this.index - 1;
            this.settings.loop &&
              this.galleryItems.length > 2 &&
              (0 === this.index
                ? (t = this.galleryItems.length - 1)
                : this.index === this.galleryItems.length - 1 && (e = 0)),
              this.outer
                .find(".lg-item")
                .removeClass("lg-next-slide lg-prev-slide"),
              t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
              this.getSlideItem(e).addClass("lg-next-slide");
          }),
          (e.prototype.goToNextSlide = function (e) {
            var t = this,
              s = this.settings.loop;
            e && this.galleryItems.length < 3 && (s = !1),
              this.lgBusy ||
                (this.index + 1 < this.galleryItems.length
                  ? (this.index++,
                    this.LGel.trigger(At, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : s
                  ? ((this.index = 0),
                    this.LGel.trigger(At, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-right-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-right-end");
                    }, 400)));
          }),
          (e.prototype.goToPrevSlide = function (e) {
            var t = this,
              s = this.settings.loop;
            e && this.galleryItems.length < 3 && (s = !1),
              this.lgBusy ||
                (this.index > 0
                  ? (this.index--,
                    this.LGel.trigger(Dt, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : s
                  ? ((this.index = this.galleryItems.length - 1),
                    this.LGel.trigger(Dt, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-left-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-left-end");
                    }, 400)));
          }),
          (e.prototype.keyPress = function () {
            var e = this;
            _t(window).on("keydown.lg.global" + this.lgId, function (t) {
              e.lgOpened &&
                !0 === e.settings.escKey &&
                27 === t.keyCode &&
                (t.preventDefault(),
                e.settings.allowMediaOverlap &&
                e.outer.hasClass("lg-can-toggle") &&
                e.outer.hasClass("lg-components-open")
                  ? e.outer.removeClass("lg-components-open")
                  : e.closeGallery()),
                e.lgOpened &&
                  e.galleryItems.length > 1 &&
                  (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                  39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
            });
          }),
          (e.prototype.arrow = function () {
            var e = this;
            this.getElementById("lg-prev").on("click.lg", function () {
              e.goToPrevSlide();
            }),
              this.getElementById("lg-next").on("click.lg", function () {
                e.goToNextSlide();
              });
          }),
          (e.prototype.arrowDisable = function (e) {
            if (!this.settings.loop && this.settings.hideControlOnEnd) {
              var t = this.getElementById("lg-prev"),
                s = this.getElementById("lg-next");
              e + 1 === this.galleryItems.length
                ? s.attr("disabled", "disabled").addClass("disabled")
                : s.removeAttr("disabled").removeClass("disabled"),
                0 === e
                  ? t.attr("disabled", "disabled").addClass("disabled")
                  : t.removeAttr("disabled").removeClass("disabled");
            }
          }),
          (e.prototype.setTranslate = function (e, t, s, i, n) {
            void 0 === i && (i = 1),
              void 0 === n && (n = 1),
              e.css(
                "transform",
                "translate3d(" +
                  t +
                  "px, " +
                  s +
                  "px, 0px) scale3d(" +
                  i +
                  ", " +
                  n +
                  ", 1)"
              );
          }),
          (e.prototype.mousewheel = function () {
            var e = this,
              t = 0;
            this.outer.on("wheel.lg", function (s) {
              if (s.deltaY && !(e.galleryItems.length < 2)) {
                s.preventDefault();
                var i = new Date().getTime();
                i - t < 1e3 ||
                  ((t = i),
                  s.deltaY > 0
                    ? e.goToNextSlide()
                    : s.deltaY < 0 && e.goToPrevSlide());
              }
            });
          }),
          (e.prototype.isSlideElement = function (e) {
            return (
              e.hasClass("lg-outer") ||
              e.hasClass("lg-item") ||
              e.hasClass("lg-img-wrap")
            );
          }),
          (e.prototype.isPosterElement = function (e) {
            var t = this.getSlideItem(this.index)
              .find(".lg-video-play-button")
              .get();
            return (
              e.hasClass("lg-video-poster") ||
              e.hasClass("lg-video-play-button") ||
              (t && t.contains(e.get()))
            );
          }),
          (e.prototype.toggleMaximize = function () {
            var e = this;
            this.getElementById("lg-maximize").on("click.lg", function () {
              e.$container.toggleClass("lg-inline"), e.refreshOnResize();
            });
          }),
          (e.prototype.invalidateItems = function () {
            for (var e = 0; e < this.items.length; e++) {
              var t = _t(this.items[e]);
              t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
            }
          }),
          (e.prototype.trapFocus = function () {
            var e = this;
            this.$container.get().focus({ preventScroll: !0 }),
              _t(window).on("keydown.lg.global" + this.lgId, function (t) {
                if (e.lgOpened && ("Tab" === t.key || 9 === t.keyCode)) {
                  var s = Zt(e.$container.get()),
                    i = s[0],
                    n = s[s.length - 1];
                  t.shiftKey
                    ? document.activeElement === i &&
                      (n.focus(), t.preventDefault())
                    : document.activeElement === n &&
                      (i.focus(), t.preventDefault());
                }
              });
          }),
          (e.prototype.manageCloseGallery = function () {
            var e = this;
            if (this.settings.closable) {
              var t = !1;
              this.getElementById("lg-close").on("click.lg", function () {
                e.closeGallery();
              }),
                this.settings.closeOnTap &&
                  (this.outer.on("mousedown.lg", function (s) {
                    var i = _t(s.target);
                    t = !!e.isSlideElement(i);
                  }),
                  this.outer.on("mousemove.lg", function () {
                    t = !1;
                  }),
                  this.outer.on("mouseup.lg", function (s) {
                    var i = _t(s.target);
                    e.isSlideElement(i) &&
                      t &&
                      (e.outer.hasClass("lg-dragging") || e.closeGallery());
                  }));
            }
          }),
          (e.prototype.closeGallery = function (e) {
            var t = this;
            if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
            this.LGel.trigger(Bt),
              this.settings.resetScrollPosition &&
                !this.settings.hideScrollbar &&
                _t(window).scrollTop(this.prevScrollTop);
            var s,
              i = this.items[this.index];
            if (this.zoomFromOrigin && i) {
              var n = this.mediaContainerPosition,
                a = n.top,
                r = n.bottom,
                o = this.galleryItems[this.index],
                l = o.__slideVideoInfo,
                d = o.poster,
                c = Xt(
                  i,
                  this.outer,
                  a + r,
                  l && d && this.settings.videoMaxSize
                );
              s = Yt(i, this.outer, a, r, c);
            }
            this.zoomFromOrigin && s
              ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                this.getSlideItem(this.index)
                  .addClass("lg-start-end-progress")
                  .css(
                    "transition-duration",
                    this.settings.startAnimationDuration + "ms"
                  )
                  .css("transform", s))
              : (this.outer.addClass("lg-hide-items"),
                this.outer.removeClass("lg-zoom-from-image")),
              this.destroyModules(),
              (this.lGalleryOn = !1),
              (this.isDummyImageRemoved = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              clearTimeout(this.hideBarTimeout),
              (this.hideBarTimeout = !1),
              _t("html").removeClass("lg-on"),
              this.outer.removeClass("lg-visible lg-components-open"),
              this.$backdrop.removeClass("in").css("opacity", 0);
            var p =
              this.zoomFromOrigin && s
                ? Math.max(
                    this.settings.startAnimationDuration,
                    this.settings.backdropDuration
                  )
                : this.settings.backdropDuration;
            return (
              this.$container.removeClass("lg-show-in"),
              setTimeout(function () {
                t.zoomFromOrigin &&
                  s &&
                  t.outer.removeClass("lg-zoom-from-image"),
                  t.$container.removeClass("lg-show"),
                  t.resetScrollBar(),
                  t.$backdrop
                    .removeAttr("style")
                    .css(
                      "transition-duration",
                      t.settings.backdropDuration + "ms"
                    ),
                  t.outer.removeClass("lg-closing " + t.settings.startClass),
                  t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                  t.$inner.empty(),
                  t.lgOpened && t.LGel.trigger(Gt, { instance: t }),
                  t.$container.get() && t.$container.get().blur(),
                  (t.lgOpened = !1);
              }, p + 100),
              p + 100
            );
          }),
          (e.prototype.initModules = function () {
            this.plugins.forEach(function (e) {
              try {
                e.init();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly initiated"
                );
              }
            });
          }),
          (e.prototype.destroyModules = function (e) {
            this.plugins.forEach(function (t) {
              try {
                e ? t.destroy() : t.closeGallery && t.closeGallery();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly destroyed"
                );
              }
            });
          }),
          (e.prototype.refresh = function (e) {
            this.settings.dynamic || this.invalidateItems(),
              (this.galleryItems = e || this.getItems()),
              this.updateControls(),
              this.openGalleryOnItemClick(),
              this.LGel.trigger(St);
          }),
          (e.prototype.updateControls = function () {
            this.addSlideVideoInfo(this.galleryItems),
              this.updateCounterTotal(),
              this.manageSingleSlideClassName();
          }),
          (e.prototype.destroyGallery = function () {
            this.destroyModules(!0),
              this.settings.dynamic || this.invalidateItems(),
              _t(window).off(".lg.global" + this.lgId),
              this.LGel.off(".lg"),
              this.$container.remove();
          }),
          (e.prototype.destroy = function () {
            var e = this.closeGallery(!0);
            return (
              e
                ? setTimeout(this.destroyGallery.bind(this), e)
                : this.destroyGallery(),
              e
            );
          }),
          e
        );
      })();
    const ss = function (e, t) {
      return new ts(e, t);
    };
    var is = s(578);
    const ns = document.querySelectorAll("[data-gallery]");
    function as(e) {
      window.scroll({ left: 0, top: e.offsetTop, behavior: "smooth" });
    }
    ns.length &&
      ns.forEach((e) => {
        ss(e, {
          plugins: [is],
          licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
          speed: 500,
          download: !1,
        });
      }),
      (function () {
        const e = document.querySelector(".icon-menu-open"),
          t = document.querySelector(".icon-menu-close"),
          s = document.documentElement;
        e &&
          t &&
          (e.addEventListener("click", function () {
            s.classList.contains("menu-open") || s.classList.add("menu-open");
            s.classList.contains("lock") || s.classList.add("lock");
          }),
          t.addEventListener("click", function () {
            s.classList.contains("menu-open") &&
              s.classList.remove("menu-open");
            s.classList.contains("lock") && s.classList.remove("lock");
          }));
      })();
    const rs = document.querySelector(".scroll-to"),
      os = document.querySelector("#about");
    rs &&
      rs.addEventListener("click", () => {
        as(os);
      });
    const ls = document.querySelector(".next-object"),
      ds = document.querySelector("#next-object");
    ls &&
      ls.addEventListener("click", () => {
        as(ds);
      }),
      (function () {
        let e = document.querySelectorAll(".ibg");
        for (var t = 0; t < e.length; t++)
          e[t].querySelector("img") &&
            (e[t].style.backgroundImage =
              "url(" + e[t].querySelector("img").getAttribute("src") + ")");
      })(),
      (function () {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)'
        );
        e &&
          e.forEach((e) => {
            e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper");
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      })(),
      window.addEventListener("load", () => {
        if (document.querySelector(".swiper")) {
          const e = document.querySelector(".shadow-cube-effect").value,
            t = document.querySelector(".shadow-offset-cube-effect").value,
            s = document.querySelector(".shadow-scale-cube-effect").value,
            i = document.querySelector(".delay-main-slide").value,
            n = document.querySelector(".speed-main-slide").value,
            a = document.querySelector(".effect-main-slide").value;
          new Swiper(".main-screen__slider", {
            effect: String(a),
            fadeEffect: { crossFade: !0 },
            autoplay: { delay: parseInt(i), disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            touchRatio: 0,
            simulateTouch: !1,
            speed: parseInt(n),
            loop: !0,
          });
          const r = document.querySelector(".delay-about-slide").value,
            o = document.querySelector(".speed-about-slide").value;
          new Swiper(".about-img-sm__slider", {
            effect: "cube",
            cubeEffect: {
              slideShadows: !0,
              shadow: parseInt(e),
              shadowOffset: parseInt(t),
              shadowScale: parseFloat(s),
            },
            autoplay: { delay: parseInt(r), disableOnInteraction: !1 },
            speed: parseInt(o),
            observer: !0,
            observeParents: !0,
            touchRatio: 0,
            simulateTouch: !1,
            loop: !0,
          });
          const l = document.querySelector(".delay-apartments-slide").value,
            d = document.querySelector(".speed-apartments-slide").value,
            c = document.querySelector(".loop-apartments-slide").value,
            p = document.querySelector(".effect-apartments-slide").value,
            u = document.querySelector(".interaction-apartments-slide").value;
          function h(...e) {
            for (const t of e)
              t.slideTo = function (t, s, i, n, a) {
                if (a) Swiper.prototype.slideTo.apply(this, arguments);
                else for (const a of e) a.slideTo(t, s, i, n, !0);
              };
          }
          h(
            new Swiper(".apartments-img-sm__slider", {
              effect: "cube",
              cubeEffect: {
                slideShadows: !0,
                shadow: parseInt(e),
                shadowOffset: parseInt(t),
                shadowScale: parseFloat(s),
              },
              autoplay: {
                delay: parseInt(l),
                disableOnInteraction: parseInt(u),
              },
              speed: parseInt(d),
              observer: !0,
              observeParents: !0,
              touchRatio: 1,
              simulateTouch: !0,
              loop: parseInt(c),
            }),
            new Swiper(".apartments-img-lg__slider", {
              effect: String(p),
              fadeEffect: { crossFade: !0 },
              autoplay: {
                delay: parseInt(l),
                disableOnInteraction: parseInt(u),
              },
              speed: parseInt(d),
              observer: !0,
              observeParents: !0,
              touchRatio: 1,
              simulateTouch: !0,
              loop: parseInt(c),
              navigation: {
                navigationDisabledClass: "swiper-navigation-disabled",
              },
            }),
            new Swiper(".apartments-text__slider", {
              effect: String(p),
              fadeEffect: { crossFade: !0 },
              autoplay: {
                delay: parseInt(l),
                disableOnInteraction: parseInt(u),
              },
              speed: parseInt(d),
              observer: !0,
              observeParents: !0,
              touchRatio: 1,
              simulateTouch: !0,
              loop: parseInt(c),
              navigation: { nextEl: ".apartments-next .button-next" },
              pagination: {
                el: ".apartments-pagination .pagination",
                type: "fraction",
                formatFractionCurrent: function (e) {
                  return ("0" + e).slice(-2);
                },
                formatFractionTotal: function (e) {
                  return ("0" + e).slice(-2);
                },
                renderFraction: function (e, t) {
                  return (
                    '<span class="' +
                    e +
                    '"></span>/<span class="' +
                    t +
                    '"></span>'
                  );
                },
              },
            })
          );
          const m = document.querySelector(".delay-full-image-slide").value,
            f = document.querySelector(".speed-full-image-slide").value,
            g = document.querySelector(".effect-full-image-slide").value;
          new Swiper(".full-screen-image__slider", {
            effect: String(g),
            fadeEffect: { crossFade: !0 },
            creativeEffect: {
              prev: { translate: [0, 0, -400] },
              next: { translate: ["100%", 0, 0] },
            },
            coverflowEffect: {
              rotate: 30,
              depth: 100,
              modifier: 1,
              rotate: 50,
              scale: 1,
              slideShadows: !0,
              stretch: 0,
              transformEl: null,
            },
            autoplay: { delay: parseInt(m), disableOnInteraction: !1 },
            speed: parseInt(f),
            observer: !0,
            observeParents: !0,
            touchRatio: 1,
            simulateTouch: !0,
            loop: !0,
            pagination: { el: ".full-screen-image .full-screen-pagination" },
          });
        }
      }),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      window.addEventListener("load", function () {
        setTimeout(function () {
          document.documentElement.classList.add("loaded");
        }, 0);
      }),
      (function (e) {
        const t = document.forms;
        if (t.length)
          for (const e of t)
            e.addEventListener("submit", function (e) {
              s(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                d.formClean(t);
              });
        async function s(t, s) {
          if (0 === (e ? d.getErrors(t) : 0)) {
            if (t.hasAttribute("data-ajax")) {
              s.preventDefault();
              const e = t.getAttribute("action")
                  ? t.getAttribute("action").trim()
                  : "#",
                n = t.getAttribute("method")
                  ? t.getAttribute("method").trim()
                  : "GET",
                a = new FormData(t);
              t.classList.add("_sending");
              const r = await fetch(e, { method: n, body: a });
              if (r.ok) {
                await r.json();
                t.classList.remove("_sending"), i(t);
              } else alert("Ошибка"), t.classList.remove("_sending");
            } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
          } else {
            s.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && o(e, !0, 1e3);
          }
        }
        function i(e) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } })
          ),
            d.formClean(e),
            r(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0);
  })();
})();
