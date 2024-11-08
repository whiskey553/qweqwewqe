var Animation;
(function(o) {
  'use strict';
  if(typeof Object.create !== 'function'){
    Object.create = function(o){
      var F = function(){};
      F.prototype = o;
      return new F();
    };
  };
  var Hover = function()
  {
    function Hover(_class){
      var self = this;
      self.isArr = [];
      self.str = '<div class="comment-like-line">' + '<span data-x="0"></span>' + '<span data-x="30"></span>' + '<span data-x="60"></span>' + '<span data-x="90"></span>' + '<span data-x="120"></span>' + '<span data-x="150"></span>' + '<span data-x="180"></span>' + '<span data-x="210"></span>' + '<span data-x="240"></span>' + '<span data-x="270"></span>' + '<span data-x="300"></span>' + '<span data-x="330"></span>' + '</div>';
      self.button = document.querySelectorAll(_class);
      for (var i = 0; i < self.button.length; i++) {
        self.button[i].insertAdjacentHTML('beforeend', self.str);
        self.isArr.push(true);
        self.button[i].addEventListener("click", self.Click.bind(this), false);
        self.button[i].index = i;
        self.Setup(self.button[i]);
      }
      self.Touch();
    };
    Hover.prototype = Object.create(Object.prototype);
    Hover.prototype.constructor = Hover;
    Hover.prototype.Click = function(e)
    {
      var self = this;
      self.index = e.currentTarget.index;
      if(e.currentTarget.className == 'comment-like off' && self.isArr[self.index] == true){
        self.isArr[self.index] = false;
        self.Push(e.currentTarget);
      }else if(e.currentTarget.className == 'comment-like on' && self.isArr[self.index] == true){
        self.isArr[self.index] = false;
        self.Setup(e.currentTarget);
        self.Push(e.currentTarget);
      }
    };
    Hover.prototype.Setup = function(_target)
    {
      var self = this;
      self.target = _target;
      self.index = self.target.index;
      anime({
        targets: self.target.querySelector('.comment-like-icon .off'),
        opacity: [
          { value: 1, duration: 0, delay: 0, elasticity: 0 },
        ]
      });
      anime({
        targets: self.target.querySelector('.comment-like-icon .on'),
        opacity: [
          { value: 0, duration: 0, delay: 0, elasticity: 0 },
        ],
        scale: [
          { value: 0, duration: 0, delay: 0, elasticity: 0 },
        ],
        easing: 'easeInBack'
      });

      anime({
        targets: self.target.querySelector('.comment-like-icon .radius'),
        scale: [
          { value: 0, duration: 0, delay: 0, elasticity: 0 },
        ],
        opacity: [
          { value: 0.5, duration: 0, delay: 0, elasticity: 0 },
        ],
        complete: function(anim) {
          if(anim.completed){
            self.target.classList.add('off');
            self.target.classList.remove('on');
            self.isArr[self.index] = true;
          }
        }
      });
    };
    Hover.prototype.Push = function(_target)
    {
      var self = this;
      self.target = _target;
      self.index = self.target.index;
      self.target.querySelector('.comment-like-icon .radius').style.display = 'block';
      anime({
        targets: self.target.querySelector('.comment-like-icon .off'),
        opacity: [
          { value: 0, duration: 500, delay: 1, elasticity: 0 }
        ]
      });
      anime({
        targets: self.target.querySelector('.comment-like-icon .on'),
        opacity: [
          { value: 1, duration: 300, delay: 1, elasticity: 0 }
        ],
        scale: [
          { value: 1, duration: 300, delay: 1, elasticity: 0 }
        ],
        easing: 'easeOutBack'
      });


      anime({
        targets: self.target.querySelector('.comment-like-icon .radius'),
        scale: [
          { value: 1, duration: 300, delay: 0.5, elasticity: 0 }
        ],
        opacity: [
          { value: 0, duration: 300, delay: 0.9, elasticity: 0 }
        ],
        easing: 'easeOutQuad'
      });

      self.Line(self.target);
    };
    Hover.prototype.Line = function(_target)
    {
      var self = this;
      self.lines = _target.querySelectorAll('.comment-like-line span');

      anime({
        targets: self.lines,
        width: 6,
        opacity: 1,
        rotate: function(el) {
          return el.getAttribute('data-x');
        },
        translateX:-20,
        duration:0
      });

      anime({
        targets: self.lines,
        width: 0,
        opacity: 0,
        rotate: function(el) {
          return el.getAttribute('data-x');
        },
        translateX:-36,
        duration: 500,
        delay: 0.2,
        easing: 'easeOutQuad',
        complete: function(anim) {
          if(anim.completed){
            self.target.classList.remove('off');
            self.target.classList.add('on');
            self.target.querySelector('.comment-like-icon .radius').style.display = 'none';
            self.isArr[self.index] = true;
          }
        }
      });

    };
    Hover.prototype.Touch = function()
    {
      var self = this;
      self.touch = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      if (self.touch) {
        try {
          for (var si in document.styleSheets) {
            self.styleSheet = document.styleSheets[si];
            if (!self.styleSheet.rules) continue;

            for (var ri = self.styleSheet.rules.length - 1; ri >= 0; ri--) {
              if (!self.styleSheet.rules[ri].selectorText) continue;

              if (self.styleSheet.rules[ri].selectorText.match(':hover')) {
                self.styleSheet.deleteRule(ri);
              }
            }
          }
        } catch (ex) {}
      }
    };
    return Hover;
  }();
  o.Hover = Hover;
})(Animation || (Animation = {}));
