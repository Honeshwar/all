$(document).ready(function () {
  $(".election_Btn_Dropdown").html(`<li>
      <a
        
        href="/past-election-analysis"
      >
        Election Analysis
      </a>
    </li>
    <li>
      <a
        
        href="/election-map-view"
      >
        Map View
      </a>
    </li>`);

  $(".electionBtn").click(function (e) {
    e.stopPropagation();
    //console.log("hisdahgijos yo....")
    $(".election_Btn_Dropdown").toggle();
    $(document).on("click", function () {
      $(".election_Btn_Dropdown").hide();
    });

    $(`#navbarTogglerDemo03 ul li a[href="#join_our_panel"]`).on(
      "mouseenter",
      function (e) {
        // //console.log("hover")
        $(".election_Btn_Dropdown").hide();
      }
    );
  });
});
