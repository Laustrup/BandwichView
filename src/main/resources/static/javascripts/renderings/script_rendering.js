renderScripts();

function renderScripts() {
    document.getElementById("script_content").innerHTML = `
<!-- Scripts -->
<script src="../static/javascripts/url.js"></script>

<script src="../static/javascripts/renderings/head_content_rendering.js"></script>
<script src="../static/javascripts/renderings/header_content_rendering.js"></script>
<script src="../static/javascripts/renderings/main_content_rendering.js"></script>
<script src="../static/javascripts/renderings/footer_content_rendering.js"></script>

<script src="../static/javascripts/logics/login.js"></script>
<script src="../static/javascripts/logics/liszt.js"></script>
<script src="../static/javascripts/logics/session/saves/saveUser.js"></script>
<script src="../static/javascripts/logics/session/gets/getUser.js"></script>
    `;
}