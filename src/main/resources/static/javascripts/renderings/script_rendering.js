renderScripts();

function renderScripts() {
    document.getElementById("script_content").innerHTML = `
<!-- Scripts -->
<script src="../static/javascripts/url.js" type="text/javascript"></script>

<script src="../static/javascripts/logics/session/saves/saveUser.js" type="text/javascript"></script>
<script src="../static/javascripts/logics/session/gets/getUser.js" type="text/javascript"></script>
<script src="../static/javascripts/logics/liszt.js" type="text/javascript"></script>
<script src="../static/javascripts/logics/login.js" type="text/javascript"></script>

<script src="../static/javascripts/renderings/head_content_rendering.js" type="text/javascript"></script>
<script src="../static/javascripts/renderings/header_content_rendering.js" type="text/javascript"></script>
<script src="../static/javascripts/renderings/footer_content_rendering.js" type="text/javascript"></script>
<script src="../static/javascripts/renderings/main_content_renderings/login_rendering.js" type="text/javascript"></script>
<script src="../static/javascripts/renderings/main_content_renderings/frontpage_content_rendering.js" type="text/javascript"></script>
<script src="../static/javascripts/renderings/main_content_renderings/chat_room_content_rendering.js" type="text/javascript"></script>
<script src="../static/javascripts/renderings/main_content_renderings/main_content_rendering.js" type="text/javascript"></script>

    `;
}