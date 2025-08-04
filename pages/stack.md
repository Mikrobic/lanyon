---
layout: page
permalink: /stack/
title: Стек
---

<div class="tableau-container">
  <iframe
    src="https://public.tableau.com/views/BI_15968874028130/sheet0?:embed=y&:showVizHome=no&:display_count=no&:display_static_image=no&:device=phone"
    width="100%"
    height="600px"
    frameborder="0"
    allowfullscreen
    style="min-height: 500px;">
  </iframe>
</div>

<style>
  .tableau-container {
    position: relative;
    overflow: hidden;
    padding-top: 75%; /* Соотношение 4:3 */
    margin: 1rem 0;
  }
  
  .tableau-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    .tableau-container {
      padding-top: 140%; /* Для мобильных устройств */
    }
  }
</style>