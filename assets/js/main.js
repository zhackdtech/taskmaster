!(function (t) {
  var e = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  t.fn.miniEventCalendar = t.fn.MEC = function (n) {
    var a = t.extend(
        {
          calendar_link: "",
          events: [],
          from_monday: !1,
          onMonthChanged: null,
        },
        n
      ),
      i = this;
    i.addClass("mini-cal").html(
      '\n\t\t<div id="calTitle">\n\t\t\t<button type="button" class="month-mover prev">\n\t\t\t\t<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t\t<div id="monthYear"></div>\n\t\t\t<button type="button" class="month-mover next">\n\t\t\t\t<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t\t<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\n\t\t\t\t</svg>\n\t\t\t</button>\n\t\t</div>\n\t\t<div>\n\t\t\t<div id="calThead"></div>\n\t\t\t<div id="calTbody"></div>\n\t\t</div>\n\t\t<div id="calTFooter">\n\t\t\t<h3 id="eventTitle">No events today.</h3>\n\t\t\t<a href="javascript:void(0);" id="calLink">ALL EVENTS</a>\n\t\t</div>\n\t'
    );
    var d = i.find("#calThead"),
      v = i.find("#calTbody"),
      o = i.find("#monthYear"),
      l = i.find("#calTFooter"),
      r = i.find("#eventTitle"),
      s = i.find("#calLink"),
      h = new Date(),
      u = h.getMonth(),
      f = h.getFullYear();

    function c(t, n, d) {
      v.html(""),
        o.text(e[t] + " " + n),
        r.text("Click day to see event"),
        s.text("All Events"),
        s.attr("href", "#"),
        (u = t),
        (f = n);
      var l = new Date(n, t),
        h = new Date(l),
        c = h.getDay();
      for (
        a.from_monday && (c = h.getDay() > 0 ? h.getDay() - 1 : 6),
          1 === l.getDate() &&
            v.append(
              (function (t) {
                if (u > 0)
                  var e = u - 1,
                    n = f;
                else if (u < 11)
                  var e = 0,
                    n = f + 1;
                else
                  var e = 11,
                    n = f - 1;
                for (
                  var a = (function (t, e) {
                      var n = new Date(e, t, 1),
                        a = [];
                      for (; n.getMonth() === t; )
                        a.push(n.getDate()), n.setDate(n.getDate() + 1);
                      return a;
                    })(e, n),
                    i = "",
                    d = t;
                  d > 0;
                  d--
                )
                  i += g(!0, a[a.length - d]);
                return i;
              })(c)
            );
        l.getMonth() === t;

      ) {
        h = new Date(l);
        var D = m(l, new Date()),
          F = null,
          w = a.events.findIndex(function (t) {
            return m(h, new Date(t.date));
          });
        -1 != w && ((F = a.events[w]), d && D && p(F)),
          v.append(g(!1, l.getDate(), D, F, d && D)),
          l.setDate(l.getDate() + 1);
        var y = 43 - i.find(".a-date").length;
        if (l.getMonth() != t) for (var x = 1; x < y; x++) v.append(g(!0, x));
      }
      a.onMonthChanged && a.onMonthChanged(t, n);
    }

    function g(t, e, n, a, i) {
      var d = "<div class='a-date blurred'><span>" + e + "</span></div>";
      if (!t) {
        var v = a && null !== a,
          o = n ? "current " : "";
        o += v && i ? "focused " : "";
        d =
          "<button type='button' class='a-date " +
          (o += v ? "event " : "") +
          "' data-event='" +
          JSON.stringify(a) +
          "'><span>" +
          e +
          "</span></button>";
      }
      return d;
    }

    function p(t) {
      t && null != t
        ? (r.text(t.title), s.text("VIEW EVENT"), s.attr("href", t.link))
        : (r.text("No events on this day."),
          s.text("ALL EVENTS"),
          s.attr("href", a.calendar_link));
    }

    function m(t, e) {
      return (
        t.getFullYear() == e.getFullYear() &&
        t.getMonth() == e.getMonth() &&
        t.getDate() == e.getDate()
      );
    }
    return (
      r.text("No events today."),
      s.text("ALL EVENTS"),
      s.attr("href", a.calendar_link),
      a.from_monday
        ? d.html(
            "<div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>"
          )
        : d.html(
            "<div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>"
          ),
      a.calendar_link.length || a.events.length || l.css("display", "none"),
      i.find(".month-mover").each(function () {
        var e = t(this);
        e.bind("click", function (t) {
          t.preventDefault(),
            e.hasClass("next")
              ? c(u < 11 ? u + 1 : 0, u < 11 ? f : f + 1)
              : c(u > 0 ? u - 1 : 11, u > 0 ? f : f - 1);
        });
      }),
      i.on("click touchstart", ".a-date", function (e) {
        e.preventDefault(),
          t(".a-date").removeClass("focused"),
          t(this).hasClass("blurred") ||
            (p(t(this).data("event")),
            t(this).focus(),
            t(this).addClass("focused"));
      }),
      c(u, f, !0),
      i
    );
  };
})(jQuery);

$(window).ready(function () {
  console.log("document is ready!");
});
$("#burger").on("click", function (e) {
  $("#sidenav").toggleClass("mobile");
  $("#burger").toggleClass("active");
  console.log("navbar expand");
  e.stopPropagation();
});
$("body,html").click(function (e) {
  $("#sidenav").removeClass("mobile");
});
document.onclick = (function (a) {
  let menu_icon_box = document.querySelector("#burger");
  let box = document.querySelector("#sidenav");
  if (!menu_icon_box.contains(a.target) && !box.contains(a.target)) {
    $("#sidebar").removeClass("mobile");
  }
})