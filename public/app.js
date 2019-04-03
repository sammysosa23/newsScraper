$('#scrape').click(function () {
  $.ajax('/scrape', {
    type: "GET",
  }).then(function () {
    location.reload();
  })
});

// RETURN HOME
$('#home').click(function () {
  window.location.href = '/'
});

// COMMENTS
$('.comments').click(function () {
  var id = $(this).data("id");
  window.location.href = '/article/' + id
});

// SUBMIT BUTTON CLICK
$('#submit').click(function (event) {
  event.preventDefault();
  var id = $(this).data("id");
  $.ajax({
    method: "POST",
    url: "/articles/" + id,
    data: {
      user: $('#user').val(),
      comment: $('#comment').val()
    }
  })
    .then(function (data) {
      location.reload();
    })
});