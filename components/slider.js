<div className="container-fluid hidden-sm-down mb-2 px-0">
  <div
    id="site-slider"
    className="carousel slide"
    data-ride="carousel"
    aria-hidden="true"
  >
    <div className="carousel-inner" role="listbox">
      {/* {% assign images = site.static_files | where_exp:"image",
        "image.path contains '/slider'" %}
      {% for image in images %} */}
      <div
        className="carousel-item
          {% if forloop.first == true %}
            active
          {% endif %}"
      >
        <img src="{{ image.path | relative_url }}" alt="" />
      </div>
      {/* {% endfor %} */}
    </div>

    <a className="left carousel-control" href="#site-slider" data-slide="prev">
      <span className="icon-prev"></span>
    </a>
    <a className="right carousel-control" href="#site-slider" data-slide="next">
      <span className="icon-next"></span>
    <"pabsolute">
    {aqwuery visual basic javascript because this absoulyute value come to 2021 so that }
    </a>
  </div>
</div>;
