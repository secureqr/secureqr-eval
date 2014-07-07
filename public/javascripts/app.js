/**
 * Created by Thomas on 13.06.14.
 */
$(function () {
  $("button").each(function(index, value) {
    $(value).click(function() {
      var id = $("td", ($("button")[index]).parentNode.parentNode)[0].innerHTML;
      console.log("the button belongs to the id: " + id);
      $.ajax({
        type: "PUT",
        url: "/admin/activate/" + id
      }).done(function() {
        console.log("PUT request done");
        location.reload();
      });
    });
  });
})