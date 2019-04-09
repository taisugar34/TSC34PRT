// summary
  function Summary(mode, filename) {
    SetCookie('done', 0);
    SetCookie('check', 0);
    Summary2(mode);
    SetCookie('summary', mode);
//    var p = self.location.pathname.indexOf(filename);
    var p = (getpathname()).indexOf(filename);
    if (p == -1 || p == null ||
//        (!isNaN(parseInt(p)) && p + filename.length != self.location.pathname.length)) {
        (!isNaN(parseInt(p)) && p + filename.length != (getpathname()).length)) {
      SetCookie('fexpan', '');
      self.location.href = filename;
    }
      

  }

  function Summary2(mode){
    // mode is 'block' or 'none'.
    if(ua!='lay') {
      var d;
      if(ua=='dom') {
        d = document.getElementsByTagName('p');
      } else if(ua=='msdom') {
        d = document.all;
      }
      for(var i = 0; i < d.length; i++) {
        if(d[i].id.match(/^summary/)) {
          d[i].style.display=mode;
        }
      }
    }
    return false;
  }

// expand
  function shrink (bin) {
//    return(bin);

    return(bin.length + ':' + b2h(bin));
  }

  function expand(string) {
//    return(string);

    if (string == null) {return null;}
    var p = string.indexOf(':', 0);
    var l = string.substring(0, p);
    var v = string.substring(p+1, string.length);
    var s = h2b(v);
    if (l > s.length) {
      for(var i = 0; i < l - s.length; i++) {
        s = '0' + s;
      }
    } else {
      s = s.substring(s.length-l, s.length);
    }
    return s;
  }

  function reverse_string (string) {
    var a = new Array(string.length);
    for(var i = 0; i < string.length; i++) {
      a[string.length - i - 1] = string.substring(i, i+1);
    }
    var s = '';
    for(var i = 0; i < a.length; i++) {
      s += a[i];
    }
    return s;
  }

  function b2h (string) {
    var r = reverse_string(string);
    var start = 0;
    var tmp;
    var h = ''
    while (r.length >= 4) {
      h = b2h4(reverse_string(r.substring(0, 4))) + h;
      r = r.substring(4, r.length);
    }
    var j = 4 - r.length;
    for (var i = 0; i < j; i++) {
      r += '0';
    }
    h = b2h4(reverse_string(r)) + h;
    return h;
  }

  function b2h4 (string) {
    if(string == '0000') {return '0'};
    if(string == '0001') {return '1'};
    if(string == '0010') {return '2'};
    if(string == '0011') {return '3'};
    if(string == '0100') {return '4'};
    if(string == '0101') {return '5'};
    if(string == '0110') {return '6'};
    if(string == '0111') {return '7'};
    if(string == '1000') {return '8'};
    if(string == '1001') {return '9'};
    if(string == '1010') {return 'a'};
    if(string == '1011') {return 'b'};
    if(string == '1100') {return 'c'};
    if(string == '1101') {return 'd'};
    if(string == '1110') {return 'e'};
    if(string == '1111') {return 'f'};
    return ''; // return empty string to avoid error in Netscape 4.05.
  }

  function h2b (string) {
    var b = '';
    for(var i = 0; i < string.length; i++) {
      b += h2b1(string.substring(i, i+1));
    }
    return b;
  }

  function h2b1 (c) {
    if (c == '0') {return '0000'};
    if (c == '1') {return '0001'};
    if (c == '2') {return '0010'};
    if (c == '3') {return '0011'};
    if (c == '4') {return '0100'};
    if (c == '5') {return '0101'};
    if (c == '6') {return '0110'};
    if (c == '7') {return '0111'};
    if (c == '8') {return '1000'};
    if (c == '9') {return '1001'};
    if (c == 'a') {return '1010'};
    if (c == 'b') {return '1011'};
    if (c == 'c') {return '1100'};
    if (c == 'd') {return '1101'};
    if (c == 'e') {return '1110'};
    if (c == 'f') {return '1111'};
    return ''; // return empty string to avoid error in Netscape 4.05.
  }

  function keep_value (current, value) {
    var v = (value == 'none' ? 0 : 1);
    var string = GetCookie('fexpan');
    var l;
                if ( isNull( string ) ) {
      l = 0;
      string = '';
    } else {
      string = expand(string);
      l = string.length;
    }
    if (l < current) {
      for (var i = 1; i < current-l; i++) {
//        string += '1'; // changed 2002/11/5
        string += '0';
      }
      string += v;
    } else {
      string = string.substring(0, current-1) + v +
               string.substring(current, string.length);
    }
    SetCookie('fexpan', shrink(string));
  }

  function read_and_set_value () {
    var name = 'fexpan';
    var string = expand(GetCookie(name));
    if ( isNull( string ) ) {
      return;
    }

    if(ua!='lay') {
      var d;
      if(ua=='dom') {
        d = document.getElementsByTagName('p');
      } else if(ua == 'msdom') {
        d = document.all;
      }
      var a = new Array();
      for(var k = 0; k < d.length; k++) {
        if(d[k].id.match(/^contentsh/)) {
          var param = new Array(6);
          var l = 0;
          var start = 'contentsh'.length;
          var end = d[k].id.indexOf('_', start);
          while (end != -1) {
            param[l++] = d[k].id.substring(start, end);
            start = end + 1;
            end = d[k].id.indexOf('_', start);
          }
          param[l] = d[k].id.substring(start, d[k].id.length);
          if (!isNaN(param[0]) && param[0] > 0) {
            a[param[0]-1] = param;
          }
        }
      }
      for (var i = 0; i < string.length; i++) {
	if (a && a[i]) {
	        var num = a[i][0];
	        var current = 'h' + a[i][1] + '_' + a[i][2];
	        var child = 'h' + a[i][3] + '_' + a[i][4];
	        var c_flag = a[i][5];
	        var j = string.substring(i, i+1);
	//        alert(string);alert(child);alert(j);
	        if (c_flag == 1) {
	          if(ua == 'dom') {
	            if (document.getElementById(child)) {
	              if(j == 0) {
	                document.getElementById(child).style.display = 'none';
	//                change_alt_and_title('btnc' + num, 'none');
	                Fout('btnc', num, current, child);
	              } else if (j == 1) {
	                document.getElementById(child).style.display = 'block';
	//                change_alt_and_title('btnc' + num, 'block');
	                Fout('btnc', num, current, child);
	              } else {
	//                document.getElementById(child).style.display = 'block';
	//                change_alt_and_title('btnc' + num, 'block');
	// alert(child);
	                document.getElementById(child).style.display = 'none'; // changed 2002/11/5
	//                change_alt_and_title('btnc' + num, 'none');
	                Fout('btnc', num, current, child);
	              }
	            }
	          } else if(ua == 'msdom') {
	            if (document.all(child)) {
	              if(j == 0) {
		                document.all(child).style.display = 'none';
	//              change_alt_and_title('btnc' + num, 'none');
	                Fout('btnc', num, current, child);
	              } else if (j == 1) {
	                document.all(child).style.display = 'block';
	//              change_alt_and_title('btnc' + num, 'block');
	                Fout('btnc', num, current, child);
	              } else {
	//              document.all(child).style.display = 'block';
	                document.all(child).style.display = 'none';
	//              change_alt_and_title('btnc' + num, 'block');
	////            change_alt_and_title('btnc' + num, 'none');
	                Fout('btnc', num, current, child);
		}
              }
            }
          }
        }
      }
    }
  }

// preference
//  function wopen (url, name) {
//    var color = GetCookie('color');
//    if (color != null) {
//      SetCookie('color_orig', color);
//    }
//    window.open(url, name);
//    return;
//  }

// init
  function IE5OR6() {
	if (navigator.appName == "Microsoft Internet Explorer") {
		var apv = navigator.appVersion;
		if (parseInt(apv.substring(apv.indexOf("MSIE ")+"MSIE ".length)) >= 5) {
			return true;
		}
	}
	return false;
  }

  function initState (index, intacc) {

// for IE6 Bug.
    if (intacc) {
      if (index) {
          if (IE5OR6()) {
	        setTimeout("if (window.where) {SetCookie('where', window.where);}; if (window.imgmode) {SetCookie('imgmode', window.imgmode);};", 200);
          }
      } else {
	    if (IE5OR6()) {
	        setTimeout("if (window.where) {SetCookie('where', window.where);}; if (window.imgmode) {SetCookie('imgmode', window.imgmode);}; hideImages( GetCookie( imgMode ) == 'none' ? 'none' : 'block' );", 200);
	    } else {
		hideImages( GetCookie( imgMode ) == 'none' ? 'none' : 'block' );
	    }
      }
    }

   // 2007.6.13 for V1.4
   if (document.search.seek) {
	document.search.seek.focus();
   }

  }

//  window.onload=initState;
//  window.onunload=function(){SetCookie('done', 0); SetCookie('check', 0)};

  if (ua == 'lay') {
    window.onResize = location.reload;
  }
